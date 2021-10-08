import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TProp } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls } from "../theme";
import { getLabel, handleDateChange, setCustomValidityMessage, updateNewValue } from "../utils";
import { propInvalid } from "../validation";

import { ViewInputOverride } from "./viewInputOverride";

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
			if (lodash.isDate(date) && !isNaN(date.getTime())) {
				this.day(lodash.padStart(String(date.getDate()), 2, "0"));
				this.month(lodash.padStart(String(1 + date.getMonth()), 2, "0"));
				this.year(String(date.getFullYear()));
			}
		});
		// Update value when date changes
		updateNewValue(this.date, value);
	}

	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		const input = dom.querySelector("input") as HTMLInputElement;
		setCustomValidityMessage(input, this.valid, "Invalid Date");
		this.dom = dom;
	}

	public onremove() {
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
		this.day.end(true);
	}

	public view({ attrs }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled,
			uiClass = {}, floatLabel,
			options
		} = attrs.field as IOptionField;
		const { value } = attrs;
		const locale = options && options.length ? options[0].value : "en-GB";
		const isUsLocale = locale === "en-US";
		const classStr = inputCls(uiClass);
		// Create DD-MM-YYYY inputs
		const dayInput = m(".dib", [
			m("input.w-100.bg-transparent.bn.outline-0", {
				id: `${id}-dd`, name: `${name}-dd`,
				type: FieldType.text, placeholder: "DD",
				minlength: "2", maxlength: "2",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.day(),
				oninput: () => handleDateChange(this.day, id, "dd", this.dom, isUsLocale ? "yyyy" : "mm"),
				class: classStr,
				style: {
					maxWidth: '3ex',
					textAlign: this.day() && this.day().length === 2 ? "center" : "left"
				}
			})
		]);
		const monthInput = m(".dib", [
			m("input.w-100.bg-transparent.bn.outline-0", {
				id: `${id}-mm`, name: `${name}-mm`,
				type: FieldType.text, placeholder: "MM",
				minlength: "2", maxlength: "2",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.month(),
				oninput: () => handleDateChange(this.month, id, "mm", this.dom, isUsLocale ? "dd" : "yyyy"),
				class: classStr,
				style: {
					maxWidth: "3.5ex",
					textAlign: this.month() && this.month().length === 2 ? "center" : "left"
				}
			})
		]);
		const yearInput = m(".dib", [
			m("input.w-100.bg-transparent.bn.outline-0", {
				id: `${id}-yyyy`, name: `${name}-yyyy`,
				type: FieldType.text, placeholder: "YYYY",
				minlength: "4", maxlength: "4",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.year(),
				oninput: () => handleDateChange(this.year, id, "yyyy", this.dom),
				class: classStr,
				// style: styleLg,
				style: {
					maxWidth: '5ch',
				}
			})
		]);
		const slash = m('span.self-center', '/');
		// Assemble date input (en-GB or en-US layouts)
		const dateInput = isUsLocale ? [monthInput, slash, dayInput, slash, yearInput]
			: [dayInput, slash, monthInput, slash, yearInput];

		return !floatLabel
			? m("fieldset", {
				class: wrapperCls(uiClass, disabled)
			}, [
				getLabel(id, uiClass, label, required),
				m("div", {
					id, title,
					class: inputWrapperCls(uiClass, propInvalid(attrs.field, value()) || !this.valid()),
				}, dateInput)
			])
			: m(ViewInputOverride, { ...attrs, children: dateInput });

	}

}
