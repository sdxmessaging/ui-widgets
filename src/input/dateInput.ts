import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TProp } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls, styleSm, styleLg } from "../theme";
import { getLabel, handleDateChange } from "../utils";
import { propInvalid } from "../validation";

export class DateInput implements ClassComponent<IPropWidget> {

	private day = stream<string>();
	private month = stream<string>();
	private year = stream<string>();
	private typing = stream<boolean>(false);
	private valid = stream.lift(
		(day, month, year) => {
			const newYear = parseInt(year);
			const newMonth = parseInt(month) - 1;
			const newDay = parseInt(day);
			const newDate = new Date(newYear, newMonth, newDay);
			return newDate.getFullYear() === newYear && year.length === 4
				&& newDate.getMonth() === newMonth && newDate.getDate() === newDay
				&& day.length === 2 && month.length === 2;
		},
		this.day, this.month, this.year
	);
	// Combine date parts
	private date = stream.lift(
		(day, month, year, valid) => valid ? `${year}-${month}-${day}` : "",
		this.day, this.month, this.year, this.valid
	);
	private dom!: Element;

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Split value into date parts
		(value as stream<TProp>).map((newVal) => {
			const date = new Date(String(newVal));
			if (lodash.isDate(date) && !isNaN(date.getTime()) && !this.typing()) {
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
		this.dom = dom;
	}

	public onremove() {
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
		this.day.end(true);
	}

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled,
			uiClass = {},
			options
		} = field as IOptionField;
		const locale = options && options.length ? options[0].value : "en-GB";
		const isUsLocale = locale === "en-US";
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
				oninput: () => handleDateChange(this.day, id, "dd", this.dom, this.typing, isUsLocale ? "yyyy" : "mm"),
				class: classStr, style: styleSm,

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
				oninput: () => handleDateChange(this.month, id, "mm", this.dom, this.typing, isUsLocale ? "dd" : "yyyy"),
				class: classStr, style: styleSm,
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
				oninput: () => handleDateChange(this.year, id, "yyyy", this.dom, this.typing),
				class: classStr, style: styleLg,
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
			}, isUsLocale
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
