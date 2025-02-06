import lodash from "lodash";
import m, { Children, CVnode } from "mithril";

import { IGroupOption, IGroupOptionField, IOption, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { inputCls, joinClasses, theme } from "../theme";

import { BaseWidget } from "../baseWidget";
import { IConfig, TIcon, TSubset } from "../interface/config";
import { List } from "../list/list";
import { ListController } from "../list/listController";
import { LayoutFixed } from "./layout/layoutFixedLabel";

type TSelectWidget = IPropWidget<IGroupOptionField>;

interface IFlatGroupedOption {
	readonly value: TProp;
	readonly label?: string;
	readonly groupId: string;
	readonly isGroupHeader: boolean;
}
export class CheckListGroup extends BaseWidget<TSelectWidget> {

	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "uncheckIcn";

	private opts: IFlatGroupedOption[] = [];
	private list!: ListController<IFlatGroupedOption>;

	private selected = new Set<string>();
	private open = false;
	private openTs = 0;
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

	private focusOption: IFlatGroupedOption | null = null;

	private toggleMultiple(direction: "on" | "off", option: string, groupId: string, isGroupHeader: boolean) {
		direction === "on" ? this.selected.add(option) : this.selected.delete(option);
		isGroupHeader && this.opts.map((option) => {
			if (option.groupId === groupId) {
				direction === "on" ? this.selected.add(String(option.value)) : this.selected.delete(String(option.value));
			}
		});
	}


	private allGroupChildrenSelected(groupId: string) {
		const groupChildren = lodash.filter(this.opts, (option) => {
			return (
				option.groupId === groupId &&
				option.isGroupHeader === false
			);
		});
		const selectedGroupChildren = lodash.filter(groupChildren, (option: IFlatGroupedOption) => 
				this.selected.has(String(option.value))
		);
		return groupChildren.length === selectedGroupChildren.length;
	}


	private toggleSelection(option: string, value: TPropStream, isGroupHeader: boolean, groupId: string) {
		if (this.selected.has(option)) {
			this.toggleMultiple("off", option, groupId, isGroupHeader);
		} else {
			this.toggleMultiple("on", option, groupId, isGroupHeader);
		}

		const groupHeaderVal = lodash.find(this.opts, (option: IFlatGroupedOption) => {
			return option.isGroupHeader && option.groupId === groupId;
		})?.value;

		// if all group children are unselected - deselected group header
		if (!this.allGroupChildrenSelected(groupId)) {
			this.selected.delete(String(groupHeaderVal));
		} else {
			// if all group children are selected - select group header
			this.selected.add(String(groupHeaderVal));
		}
		
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
					this.toggleSelection(String(this.focusOptionValue), value, this.focusOption.isGroupHeader, this.focusOption.groupId);
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

	private selectedCount() {
		// ignore group headers when counting
		return lodash.chain(this.opts)
		.filter((option: IFlatGroupedOption) => !option.isGroupHeader)
		.filter((option: IFlatGroupedOption) => this.selected.has(String(option.value)))
		.value().length;
	} 

	// Placeholder, single selection, or count of selected
	private placeHolder(value: TPropStream, options: ReadonlyArray<IOption>, placeholder: string) {
		if (this.selected.size > 1) {
			return `${this.selectedCount()} Selected`;
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

	public oninit({ attrs: { field: { groups = [] }, value } }: CVnode<TSelectWidget>) {

		this.opts = lodash.flatMap<IGroupOption, IFlatGroupedOption>(groups, ({ groupLabel, groupId, options = [] }) => {
			return [
				{ value: groupId, label: groupLabel, isGroupHeader: true, groupId },
				...options.map((option) => {
					return {
						...option,
						isGroupHeader: false,
						groupId
					};
				})
			];
		});


		this.list = ListController.single(() => Promise.resolve(this.opts));
		this.list.setFilter((options) => options.filter(
			({ value, label = value }) => String(label)
				.toLowerCase()
				.includes(this.keySearch)
		));
		this.syncSelection(value);
	}

	public onbeforeupdate({ attrs: { field: { groups = [] }, value } }: CVnode<TSelectWidget>) {
		const options = lodash.flatMap<IGroupOption, IFlatGroupedOption>(groups, ({ groupLabel, groupId, options = [] }) => [
			{ value: groupId, label: groupLabel, isGroupHeader: true, groupId },
			...options.map((option) => {
				return {
					...option,
					isGroupHeader: false,
					groupId
				};
			})
		]);
		this.syncSelection(value);
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
							// TODO fix placeholder
						}, this.placeHolder(val, this.opts, placeholder))
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
		const { value, label = value, isGroupHeader = false, groupId } = opt;
		const selected = this.selected.has(String(value));
		const icon = selected
			? getConfig(this.onIcon, config)
			: getConfig(this.offIcon, config);
		const focus = value === this.focusOptionValue ? "true" : undefined;
		return m(".ui-widgets-option.cursor-default", {
			id: `${id}-${value}`,
			class: joinClasses([
				theme.checkListOption,
				isGroupHeader ? theme.checkListGroupHeaders : theme.checkListGroupChildren
			]),
			role: "option",
			ariaSelected: selected,
			"aria-activedescendant": focus,
			onclick: (evt: MouseEvent) => {
				evt.stopPropagation();
				this.toggleSelection(String(value), val, isGroupHeader, groupId);
			}
		}, [
			getIcon(icon, theme.checkListOptionIcon),
			m("span", {
				class: theme.checkListOptionLabel
			}, label)
		]);
	}

}
