import lodash from "lodash";
import m, { Children, CVnode } from "mithril";

import { IGroupOption, IGroupOptionField, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { inputCls, joinClasses, theme } from "../theme";

import { BaseWidget } from "../baseWidget";
import { IConfig, TIcon, TSubset } from "../interface/config";
import { List } from "../list/list";
import { ListController } from "../list/listController";
import { LayoutFixed } from "./layout/layoutFixedLabel";

interface IFlatGroupedOption {
	readonly groupId: string;
	readonly value: TProp;
	readonly label?: string;
	readonly header?: boolean;
}

type TSelectWidget = IPropWidget<IGroupOptionField>;
export class CheckListGroup extends BaseWidget<TSelectWidget> {

	private static flattenOpts(groups: IGroupOption[]): IFlatGroupedOption[] {
		return lodash.flatMap<IGroupOption, IFlatGroupedOption>(groups,
			({ groupLabel, groupId, options = [] }) => [
				{ groupId, value: groupId, label: groupLabel, header: true },
				...options.map((option) => ({ groupId, ...option }))
			]
		);
	}

	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "uncheckIcn";

	private opts: IFlatGroupedOption[] = [];
	private list!: ListController<IFlatGroupedOption>;

	private selected = new Set<string>();
	private open = false;
	private openTs = 0;
	private focusOption: IFlatGroupedOption | null = null;
	private _focusOptionValue: TProp | null = null;
	private get focusOptionValue() {
		return this._focusOptionValue;
	}
	private set focusOptionValue(value: TProp | null) {
		this.open = value != null;
		this._focusOptionValue = value;
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

	private allGroupChildrenSelected(groupId: string) {
		const groupChildren = this.opts.filter(
			(option) => option.groupId === groupId && option.header !== true
		);
		const selectedChildren = groupChildren.filter(
			(option) => this.selected.has(String(option.value))
		);
		return groupChildren.length === selectedChildren.length;
	}

	private toggleSelection(groupOption: IFlatGroupedOption, value: TPropStream) {
		const { value: optVal, groupId, header = false } = groupOption;
		const option = String(optVal);

		// Toggle selected option
		const deselect = this.selected.has(option);
		if (deselect) {
			this.selected.delete(option);
		} else {
			this.selected.add(option);
		}
		// Toggle selected group
		if (header) {
			this.opts.forEach((option) => {
				if (option.groupId === groupId) {
					if (deselect) {
						this.selected.delete(String(option.value));
					} else {
						this.selected.add(String(option.value));
					}
				}
			});
		}

		const groupHeaderVal = lodash.find(this.opts, (option) =>
			option.header === true && option.groupId === groupId
		)?.value;

		// if all group children are unselected - deselected group header
		if (!this.allGroupChildrenSelected(groupId)) {
			this.selected.delete(String(groupHeaderVal));
		} else {
			// if all group children are selected - select group header
			this.selected.add(String(groupHeaderVal));
		}

		// TODO don't include group headers in selection
		value(Array.from(this.selected).join(","));
	}

	private moveFocus(delta: 1 | -1) {
		const options = this.list.filteredData;
		const idx = lodash.findIndex(options, ({ value }) => value === this.focusOptionValue);
		const clampIdx = lodash.clamp(idx + delta, 0, options.length - 1);
		this.focusOptionValue = options[clampIdx].value;
		this.focusOption = options[clampIdx];
	}

	private applyFilter(search: string) {
		this.keySearch = search;
		this.list.applyFilter();
	}

	private keyNav(evt: KeyboardEvent, value: TPropStream) {
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
				if (this.focusOptionValue != null && this.focusOption != null) {
					this.toggleSelection(this.focusOption, value);
				} else {
					this.toggleOpen();
				}
				break;
			}
			// Close
			case "Escape": {
				evt.preventDefault();
				this.focusOptionValue = null;
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
	private placeHolder(placeholder: string) {
		// Count selected, ignoring group headers
		const selected = this.opts.filter(
			({ value, header }) => header !== true && this.selected.has(String(value))
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

	public oninit({ attrs: { field: { groups = [] }, value } }: CVnode<TSelectWidget>) {
		this.opts = CheckListGroup.flattenOpts(groups);
		this.list = ListController.single(() => Promise.resolve(this.opts));
		this.list.setFilter((options) => options.filter(
			({ value, label = value }) => String(label)
				.toLowerCase()
				.includes(this.keySearch)
		));
		this.syncSelection(value);
	}

	public onbeforeupdate({ attrs: { field: { groups = [] }, value } }: CVnode<TSelectWidget>) {
		this.syncSelection(value);
		const options = CheckListGroup.flattenOpts(groups);
		// React to changes in options list length
		if (options.length !== this.opts.length) {
			this.opts = options;
			this.list.reload();
		}
	}

	public view({ attrs }: CVnode<TSelectWidget>): Children {
		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			required, readonly, disabled,
			uiClass = {}, placeholder = "Select",
			config
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
			// Select "input"
			m(".relative.cursor-default", {
				id, title,
				disabled: !active,
				tabindex: active ? 0 : -1,
				role: "listbox",
				class: inputCls(uiClass),
				onclick: () => active ? this.toggleOpen() : undefined,
				onfocusin: () => active ? this.toggleOpen() : undefined,
				onfocusout: () => this.focusOptionValue = null,
				"aria-activedescendant": `${id}-${this.focusOptionValue}`,
				onkeydown: active
					? (evt: KeyboardEvent) => this.keyNav(evt, val)
					: undefined
			}, [
				m(".flex.items-center", [
					m(".flex-auto.ph-2px.pv-1px", this.keySearch
						// Search term
						? m("span", this.keySearch)
						// Selected option(s) or placeholder text
						: m("span", {
							class: this.selected.size ? undefined : theme.floatLabelPlaceholder
						}, this.placeHolder(placeholder))
					),
					getIcon(getConfig("checkListIcn", config), joinClasses([
						"ph-2px pv-1px transition-transform",
						this.open ? "rotate-180" : null
					]))
				]),
				this.open && m(List<IFlatGroupedOption>, {
					controller: this.list,
					classes: joinClasses([
						"absolute z-max us-none",
						theme.checkListOptionsWrapper,
						getConfig("checkListDropUp", config) ? "bottom-0" : "mt3"
					]),
					component: { view: ({ attrs }) => this.multiSelectionRow(val, id, attrs) }
				})
			])
		]);

	}

	private multiSelectionRow(val: TPropStream, id: string, opt: IFlatGroupedOption, config?: Partial<IConfig>) {
		const { value, label = value, header } = opt;
		const selected = this.selected.has(String(value));
		const icon = selected
			? getConfig(this.onIcon, config)
			: getConfig(this.offIcon, config);
		const focus = value === this.focusOptionValue ? "true" : undefined;
		return m(".ui-widgets-option.cursor-default", {
			id: `${id}-${value}`,
			class: joinClasses([
				theme.checkListOption,
				header ? theme.checkListGroupHeaders : theme.checkListGroupChildren
			]),
			role: "option",
			ariaSelected: selected,
			"aria-activedescendant": focus,
			onclick: (evt: MouseEvent) => {
				evt.stopPropagation();
				this.toggleSelection(opt, val);
			}
		}, [
			getIcon(icon, theme.checkListOptionIcon),
			m("span", {
				class: theme.checkListOptionLabel
			}, label)
		]);
	}

}
