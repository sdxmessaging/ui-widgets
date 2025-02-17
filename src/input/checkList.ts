import lodash from "lodash";
import m, { CVnode } from "mithril";

import { IOption, IOptionField, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { inputCls, joinClasses, theme } from "../theme";

import { BaseWidget } from "../baseWidget";
import { IConfig, TIcon, TSubset } from "../interface/config";
import { List } from "../list/list";
import { ListController } from "../list/listController";
import { LayoutFixed } from "./layout/layoutFixedLabel";

type TSelectWidget = IPropWidget<IOptionField>;
export class CheckList extends BaseWidget<TSelectWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "uncheckIcn";

	private opts: IOption[] = [];
	private list!: ListController<IOption>;

	private selected = new Set<string>();
	private open = false;
	private openTs = 0;
	private _focusOption: TProp | null = null;
	private get focusOption() {
		return this._focusOption;
	}
	private set focusOption(value: TProp | null) {
		this.open = value != null;
		this._focusOption = value;
		if (!this.open) {
			this.applyFilter("");
		}
	}
	private keySearch = "";

	private toggleOpen() {
		const ts = Date.now();
		if (ts - this.openTs > 333) {
			this.open = !this.open;
			this.openTs = ts;
		}
	}

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
		this.changeInput(value);
	}

	private moveFocus(delta: 1 | -1) {
		const options = this.list.filteredData;
		const idx = lodash.findIndex(options, ({ value }) => value === this.focusOption);
		const clampIdx = lodash.clamp(idx + delta, 0, options.length - 1);
		this.focusOption = options[clampIdx].value;
	}

	private applyFilter(search: string) {
		this.keySearch = search;
		this.list.applyFilter();
	}

	private keyNav(evt: KeyboardEvent, value: TPropStream, multiple?: boolean) {
		// Don't handle any key presses with modifiers
		if (evt.altKey || evt.ctrlKey || evt.metaKey) {
			return;
		}
		switch (evt.key) {
			// Navigate
			case "ArrowDown": {
				evt.preventDefault();
				this.moveFocus(1);
				break;
			}
			case "ArrowUp": {
				evt.preventDefault();
				this.moveFocus(-1);
				break;
			}
			// Toggle
			case " ":
			case "Enter": {
				evt.preventDefault();
				if (this.focusOption != null) {
					this.toggleSelection(String(this.focusOption), value, multiple);
				} else {
					this.toggleOpen();
				}
				break;
			}
			// Close
			case "Escape": {
				evt.preventDefault();
				this.focusOption = null;
				break;
			}
			// Clear search
			case "Delete": {
				evt.preventDefault();
				this.applyFilter("");
				break;
			}
			case "Backspace": {
				evt.preventDefault();
				this.applyFilter(this.keySearch.slice(0, - 1));
				break;
			}
			// Search
			default:
				if (evt.key.length === 1) {
					evt.preventDefault();
					this.applyFilter(this.keySearch + evt.key.toLowerCase());
				}
		}
	}

	// Placeholder, single selection, or count of selected
	private placeHolder(options: ReadonlyArray<IOption>, placeholder: string) {
		// Count selected options
		const selected = options.filter(
			({ value }) => this.selected.has(String(value))
		);
		if (selected.length > 1) {
			return `${selected.length} Selected`;
		} else if (selected.length === 1) {
			return selected[0].label ?? placeholder;
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

	public oninit({ attrs: { field: { options = [] }, value } }: CVnode<TSelectWidget>) {
		this.opts = options;
		this.list = ListController.single(() => Promise.resolve(this.opts));
		this.list.setFilter((options) => options.filter(
			({ value, label = value }) => String(label)
				.toLowerCase()
				.includes(this.keySearch)
		));
		this.syncSelection(value);
	}

	public onbeforeupdate({ attrs: { field: { options = [] }, value } }: CVnode<TSelectWidget>) {
		this.syncSelection(value);
		// React to changes in options list length
		if (options.length !== this.opts.length) {
			this.opts = options;
			this.list.reload();
		}
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
			invalid: this.invalid,
			focus: this.inFocus
		}, [
			// Hidden input
			m("input.clip[type=text]", {
				name, value: val(),
				required,
				tabindex: -1,
				ariaHidden: "true"
			}),
			m(".relative.cursor-default", {
				id, title,
				disabled: !active,
				tabindex: active ? 0 : -1,
				role: "listbox",
				onclick: () => active ? this.toggleOpen() : undefined,
				onfocusin: () => active ? this.toggleOpen() : undefined,
				onfocusout: () => this.focusOption = null,
				"aria-activedescendant": `${id}-${this.focusOption}`,
				onkeydown: active
					? (evt: KeyboardEvent) => this.keyNav(evt, val, multiple)
					: undefined
			}, [
				// Select "input"
				m(".flex.items-center.ph-2px.pv-1px", {
					class: inputCls(uiClass)
				}, [
					this.keySearch
						? m(".flex-auto", this.keySearch)
						: m(".flex-auto", {
							class: this.selected.size ? undefined : theme.floatLabelPlaceholder
						}, this.placeHolder(options, placeholder)),
					getIcon(getConfig("checkListIcn", config), joinClasses([
						"transition-transform",
						this.open ? "rotate-180" : null
					]))
				]),
				this.open && m(List<IOption>, {
					controller: this.list,
					classes: joinClasses([
						"absolute z-max us-none",
						theme.checkListOptionsWrapper,
						getConfig("checkListDropUp", config) ? "bottom-0" : "mt3"
					]),
					component: multiple
						? { view: ({ attrs }) => this.multiSelectionRow(val, id, attrs, config) }
						: { view: ({ attrs }) => this.singleSelectionRow(val, id, attrs) }
				})
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
		},
			m("span", {
				class: theme.checkListOptionLabel
			}, label)
		);
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
			getIcon(icon, theme.checkListOptionIcon),
			m("span", {
				class: theme.checkListOptionLabel
			}, label)
		]);
	}

}
