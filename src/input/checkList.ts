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
	private focusOption?: TProp = undefined;
	private keySearch = "";
	private keyTs = 0;

	private toggleSelection(option: string, value: TPropStream, multiple: boolean) {
		if (!multiple) {
			this.selected.clear();
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
			({ value }) => String(value).toLowerCase().includes(this.keySearch)
		);
		if (match) {
			this.focusOption = match.value;
		}
	}

	private keyNav(evt: KeyboardEvent, options: ReadonlyArray<IOption>, value: TPropStream, multiple: boolean) {
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
				}
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
			return lodash.find(options, { value: value() })?.label ?? placeholder;
		} else {
			return placeholder;
		}
	}

	// public oninit({ attrs: { field: { options = [] } } }: CVnode<TSelectWidget>) {
	// 	// TODO read state of value stream and write to this.selected
	// }

	public onbeforeupdate({ attrs: { value } }: CVnode<TSelectWidget>) {
		// Sync selection set with value stream
		if (value() != null) {
			const selected = new Set(String(value()).split(","));
			if (!lodash.isEqual(this.selected, selected)) {
				this.selected = selected;
			}
		}
	}

	public view({ attrs }: CVnode<TSelectWidget>) {
		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled, multiple = false,
			uiClass = {}, placeholder = "--- Select one ---",
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
				onfocus: () => this.open = active,
				onblur: () => {
					this.open = false;
					this.focusOption = undefined;
				},
				"aria-activedescendant": `${id}-${this.focusOption}`,
				onkeydown: active
					? (evt: KeyboardEvent) => this.keyNav(evt, options, val, multiple)
					: undefined
			}, [
				this.placeHolder(val, options, placeholder),
				this.open && m(".absolute.z-max.us-none", {
					class: joinClasses([
						theme.checkListOptionsWrapper,
						getConfig("selectDropUp", config) ? "bottom-0" : "top-0"
					])
				}, options.map(({ value, label = value }) => {
					const selected = this.selected.has(String(value));
					const icon = selected
						? getConfig(this.onIcon, config)
						: getConfig(this.offIcon, config);
					const focus = value === this.focusOption ? "true" : undefined;
					return m(".ui-widgets-option.cursor-default.pa2", {
						id: `${id}-${value}`,
						role: "option",
						ariaSelected: selected,
						"aria-activedescendant": focus,
						onclick: () => this.toggleSelection(String(value), val, multiple)
					}, [
						getIcon(icon, "mh1"),
						label
					]);
				}))
			])
		]);
	}
}
