import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IMithrilEvent, IOptionField, IPropWidget, TProp } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls, styleSm, styleLg } from "../theme";
import { getLabel, setValue } from "../utils";
import { propInvalid } from "../validation";

export class DateInput implements ClassComponent<IPropWidget> {

	private day = stream<string>();
	private month = stream<string>();
	private year = stream<string>();
	private valid = stream.lift(
		(day, month, year) => {
			const newYear = parseInt(year);
			const newMonth = parseInt(month) - 1;
			const newDay = parseInt(day);
			const newDate = new Date(newYear, newMonth, newDay);
			return newDate.getFullYear() === newYear
				&& newDate.getMonth() === newMonth && newDate.getDate() === newDay;
		},
		this.day, this.month, this.year
	);
	// Combine date parts
	private date = stream.lift(
		(day, month, year, valid) => valid ? `${year}-${month}-${day}` : "",
		this.day, this.month, this.year, this.valid
	);

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Split value into date parts
		(value as stream<TProp>).map((newVal) => {
			const date = new Date(String(newVal));
			if (lodash.isDate(date) && !isNaN(date.getTime())) {
				this.day(lodash.padStart(String(date.getDate()), 2, "0"));
				this.month(lodash.padStart(String(1 + date.getMonth()), 2, "0"));
				this.year(String(date.getFullYear()));
			}
		});
		// Update value when date changes
		this.date.map((newDate) => {
			// Prevent recursive setting between streams
			if (newDate !== value()) {
				value(newDate);
			}
		});
	}

	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		const input = dom.querySelector("input") as HTMLInputElement;
		this.valid.map((valid) => {
			const validityMessage = valid ? "" : "Invalid Date";
			input.setCustomValidity(validityMessage);
		});
	}

	public onremove() {
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
		this.day.end(true);
	}

	private autoAdvance(event: KeyboardEvent & IMithrilEvent, id: string, selfType: string,
		targetType?: string) {

		const self = document.querySelector(`#${id}-${selfType}`) as HTMLInputElement;
		const maxLength = parseInt(self.getAttribute("maxlength") as string);
		const length = self.value.length;
		if (length === maxLength && targetType) {
			const next = document.querySelector(`#${id}-${targetType}`) as HTMLInputElement;
			next.focus();
		}
		else {
			event.redraw = false;
		}

	}

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled,
			uiClass = {},
			options
		} = field as IOptionField;
		const locale = options && options.length ? options[0].value : "en-GB";
		const classStr = inputCls(uiClass);
		// Create DD-MM-YYYY inputs
		const dayInput = m(".dib.mr2", [
			getLabel(`${id}-dd`, uiClass, "Day"),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id: `${id}-dd`, name: `${name}-dd`,
				type: FieldType.text, placeholder: "DD",
				minlength: "2", maxlength: "2",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.day(),
				oninput: (event: KeyboardEvent & IMithrilEvent) => this.autoAdvance(event, id, "dd", "mm"),
				class: classStr, style: styleSm,
				onchange: setValue(this.day)
			})
		]);
		const monthInput = m(".dib.mr2", [
			getLabel(`${id}-mm`, uiClass, "Month"),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id: `${id}-mm`, name: `${name}-mm`,
				type: FieldType.text, placeholder: "MM",
				minlength: "2", maxlength: "2",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.month(),
				oninput: (event: KeyboardEvent & IMithrilEvent) => this.autoAdvance(event, id, "mm", "yyyy"),
				class: classStr, style: styleSm,
				onchange: setValue(this.month)
			})
		]);
		const yearInput = m(".dib.mr2", [
			getLabel(`${id}-yyyy`, uiClass, "Year"),
			m("input.w-100.bg-transparent.bn.outline-0", {
				id: `${id}-yyyy`, name: `${name}-yyyy`,
				type: FieldType.text, placeholder: "YYYY",
				minlength: "4", maxlength: "4",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.year(),
				oninput: (event: KeyboardEvent & IMithrilEvent) => this.autoAdvance(event, id, "yyyy"),
				class: classStr, style: styleLg,
				onchange: setValue(this.year)
			})
		]);
		// Assemble date input (en-GB or en-US layouts)
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, label, required),
			m("div", {
				id, title,
				class: inputWrapperCls(uiClass, propInvalid(field, value()) || !this.valid()),
			}, locale === "en-US"
				? [
					monthInput,
					dayInput,
					yearInput
				] : [
					dayInput,
					monthInput,
					yearInput
				])
		]);
	}

}
