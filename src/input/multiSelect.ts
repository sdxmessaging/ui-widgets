import lodash from "lodash";
import m, { CVnode } from "mithril";

import { IOption, IOptionField, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { inputCls, theme } from "../theme";

import { ValidationBase } from "../validationBase";
import { LayoutFixed } from "./layout/layoutFixedLabel";
import { IConfig, TIcon, TSubset } from "../interface/config";
import { getConfig, getIcon } from "../config";

type TSelectWidget = IPropWidget<IOptionField>;
export class MultiSelect extends ValidationBase<TSelectWidget> {

	protected override readonly selector = "input";
	protected readonly onIcon: keyof TSubset<IConfig, TIcon> = "checkIcn";
	protected readonly offIcon: keyof TSubset<IConfig, TIcon> = "uncheckIcn";

	private selected = new Set<string>();
	private open = false;
	private focusOption?: TProp = undefined;
	private keySearch = "";
	private keyTs = 0;

	private toggleSelection(option: string, value: TPropStream) {
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

	private keyNav(evt: KeyboardEvent, options: ReadonlyArray<IOption>, value: TPropStream) {
		switch (evt.key) {
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
			case " ":
			case "Enter": {
				evt.preventDefault();
				this.toggleSelection(String(this.focusOption), value);
				break;
			}
			default:
				if (evt.key.length === 1) {
					evt.preventDefault();
					this.findFocus(options, evt.key.toLowerCase());
				}
		}
	}

	// public oninit({ attrs: { field: { options = [] } } }: CVnode<TSelectWidget>) {
	// 	// TODO read state of value stream and write to this.selected
	// }

	public view({ attrs }: CVnode<TSelectWidget>) {
		const { field, value: val } = attrs;
		const {
			label: lbl, id, name = id, title = lbl,
			uiClass = {}, placeholder = "--- Select one ---",
			options = [], config
		} = field;
		// Placeholder, single selection, or count of selected
		// TODO Get label from option that matches single selected value
		const placeVal = this.selected.size === 1
			? Array.from(this.selected)[0]
			: placeholder;
		const inputCaption = this.selected.size > 1
			? `${this.selected.size} Selected`
			: placeVal;

		return m(LayoutFixed, {
			field,
			value: val,
			invalid: this.invalid
		}, [
			// Hidden input
			m("input.clip[type=text]", {
				name, value: val(),
				tabindex: -1,
				ariaHidden: "true"
			}),
			// Select "input"
			m(".relative.cursor-default", {
				id, title,
				// ariaLabelledby: id,
				tabindex: 0,
				role: "listbox",
				class: inputCls(uiClass),
				onfocus: () => this.open = true,
				onblur: () => {
					this.open = false;
					this.focusOption = undefined;
				},
				"aria-activedescendant": `${id}-${this.focusOption}`,
				onkeydown: (evt: KeyboardEvent) => this.keyNav(evt, options, val)
			}, [
				inputCaption,
				this.open && m(".absolute.z-max.overflow-y-auto.mh-h5.top-2", {
					class: theme.drowDownWrapper
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
						onclick: () => this.toggleSelection(String(value), val)
					}, [
						getIcon(icon, "mh1"),
						label
					]);
				}))
			])
		]);
	}
}
