import lodash from "lodash";
import m, { CVnode } from "mithril";

import { IOption, IOptionField, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { inputCls, joinClasses, theme } from "../theme";

import { IConfig, TIcon, TSubset } from "../interface/config";
import { ValidationBase } from "../validationBase";
import { LayoutFixed } from "./layout/layoutFixedLabel";

type TSelectWidget = IPropWidget<IOptionField>;
export class CheckList extends ValidationBase<TSelectWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "uncheckIcn";

	private selected = new Set<string>();
	private open = false;
	private _focusOption: TProp | null = null;
	private get focusOption() {
		return this._focusOption;
	}
	private set focusOption(value: TProp | null) {
		this.open = value != null;
		this._focusOption = value;
	}
	private keySearch = "";
	private keyTs = 0;

	private toggleSelection(option: string, value: TPropStream, multiple?: boolean) {
		if (!multiple) {
			this.selected.clear();
			this.focusOption = null;
		}
		if (this.selected.has(option)) {
			this.selected.delete(option);
		} else {
			this.selected.add(option);
		}
		value(Array.from(this.selected).join(","));
	}

	private moveFocus(options: ReadonlyArray<IOption>, delta: 1 | -1) {
		const idx = lodash.findIndex(options, ({ value }) => value === this.focusOption);
		const clampIdx = lodash.clamp(idx + delta, 0, options.length - 1);
		this.focusOption = options[clampIdx].value;
	}

	private findFocus(options: ReadonlyArray<IOption>, character: string) {
		// Chain key presses within 333ms
		const evtTs = Date.now();
		if (evtTs - this.keyTs > 333) {
			this.keySearch = "";
			this.keyTs = evtTs;
		}
		this.keySearch += character;
		const match = lodash.find(options,
			({ value, label = value }) => String(label).toLowerCase().includes(this.keySearch)
		);
		if (match) {
			this.focusOption = match.value;
		}
	}

	private keyNav(evt: KeyboardEvent, options: ReadonlyArray<IOption>, value: TPropStream, multiple?: boolean) {
		// Don't handle any key presses with modifiers
		if (evt.altKey || evt.ctrlKey || evt.metaKey) {
			return;
		}
		switch (evt.key) {
			// Navigate
			case "ArrowDown": {
				evt.preventDefault();
				this.moveFocus(options, 1);
				break;
			}
			case "ArrowUp": {
				evt.preventDefault();
				this.moveFocus(options, -1);
				break;
			}
			// Toggle
			case " ":
			case "Enter": {
				evt.preventDefault();
				if (this.focusOption != null) {
					this.toggleSelection(String(this.focusOption), value, multiple);
				} else {
					this.open = true;
				}
				break;
			}
			// Close
			case "Escape": {
				evt.preventDefault();
				this.focusOption = null;
				break;
			}
			// Search
			default:
				if (evt.key.length === 1) {
					evt.preventDefault();
					this.findFocus(options, evt.key.toLowerCase());
				}
		}
	}

	// Placeholder, single selection, or count of selected
	private placeHolder(value: TPropStream, options: ReadonlyArray<IOption>, placeholder: string) {
		if (this.selected.size > 1) {
			return `${this.selected.size} Selected`;
		} else if (this.selected.size === 1) {
			const matchVal = value();
			return lodash.find(options,
				(opt) => String(opt.value) === matchVal
			)?.label ?? placeholder;
		} else {
			return placeholder;
		}
	}

	/** Sync selection set with value stream */
	private syncSelection(value: TPropStream) {
		if (value() != null) {
			const valStr = String(value());
			const values = valStr === "" ? [] : valStr.split(",");
			const selected = new Set(values);
			if (!lodash.isEqual(this.selected, selected)) {
				this.selected = selected;
			}
		}
	}

	public oninit({ attrs: { value } }: CVnode<TSelectWidget>) {
		this.syncSelection(value);
	}

	public onbeforeupdate({ attrs: { value } }: CVnode<TSelectWidget>) {
		this.syncSelection(value);
	}

	public view({ attrs }: CVnode<TSelectWidget>) {
		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, multiple,
			uiClass = {}, placeholder = "Select",
			options = [], config
		} = field;
		const active = !(disabled || readonly);

		return m(LayoutFixed, {
			field,
			value: val,
			invalid: this.invalid
		}, [
			// Hidden input
			m("input.clip[type=text]", {
				name, value: val(),
				required,
				tabindex: -1,
				ariaHidden: "true"
			}),
			// Select "input"
			m(".relative.cursor-default", {
				id, title,
				disabled: !active,
				tabindex: 0,
				role: "listbox",
				class: inputCls(uiClass),
				onclick: () => this.open = active,
				onfocus: () => this.open = active,
				onblur: () => this.focusOption = null,
				"aria-activedescendant": `${id}-${this.focusOption}`,
				onkeydown: active
					? (evt: KeyboardEvent) => this.keyNav(evt, options, val, multiple)
					: undefined
			}, [
				m(".flex", [
					m(".flex-auto.ph-2px.pv-1px",
						this.placeHolder(val, options, placeholder)
					),
					getIcon(getConfig("checkListIcn", config), "ph-2px pv-1px")
				]),
				this.open && m(".absolute.z-max.us-none", {
					class: joinClasses([
						theme.checkListOptionsWrapper,
						getConfig("checkListDropUp", config) ? "bottom-0" : "mt3"
					])
				}, multiple
					? options.map((opt) => this.multiSelectionRow(val, id, opt, config))
					: options.map((opt) => this.singleSelectionRow(val, id, opt))
				)
			])
		]);

	}

	private singleSelectionRow(val: TPropStream, id: string, opt: IOption) {
		const { value, label = value } = opt;
		const selected = this.selected.has(String(value));
		const focus = value === this.focusOption ? "true" : undefined;
		return m(".ui-widgets-option.cursor-default", {
			id: `${id}-${value}`,
			class: joinClasses([
				theme.checkListOption,
				selected ? theme.checkListOptionSingleSelected : null
			]),
			role: "option",
			ariaSelected: selected,
			"aria-activedescendant": focus,
			onclick: (evt: MouseEvent) => {
				evt.stopPropagation();
				this.toggleSelection(String(value), val);
			}
		}, label);
	}

	private multiSelectionRow(val: TPropStream, id: string, opt: IOption, config?: Partial<IConfig>) {
		const { value, label = value } = opt;
		const selected = this.selected.has(String(value));
		const icon = selected
			? getConfig(this.onIcon, config)
			: getConfig(this.offIcon, config);
		const focus = value === this.focusOption ? "true" : undefined;
		return m(".ui-widgets-option.cursor-default", {
			id: `${id}-${value}`,
			class: joinClasses([
				theme.checkListOption,
				selected ? theme.checkListOptionMultiSelected : null
			]),
			role: "option",
			ariaSelected: selected,
			"aria-activedescendant": focus,
			onclick: (evt: MouseEvent) => {
				evt.stopPropagation();
				this.toggleSelection(String(value), val, true);
			}
		}, [
			getIcon(icon, "mh1"),
			m("span.mh1", label)
		]);
	}

}
