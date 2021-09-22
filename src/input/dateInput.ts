import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TPropStream } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls, styleSm, styleLg } from "../theme";
import { getLabel } from "../utils";
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
			return newDate.getFullYear() === newYear && year.length === 4
				&& newDate.getMonth() === newMonth && newDate.getDate() === newDay;
		},
		this.day, this.month, this.year
	);
	// Combine date parts
	private date = stream.lift(
		(day, month, year, valid) => valid ? `${year}-${month}-${day}` : "",
		this.day, this.month, this.year, this.valid,
	);
	private dom!: Element;

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Split value into date parts
		// (value as stream<TProp>).map((newVal) => {
		// 	const date = new Date(String(newVal));
		// 	if (lodash.isDate(date) && !isNaN(date.getTime())) {
		// 		this.day(lodash.padStart(String(date.getDate()), 2, "0"));
		// 		this.month(lodash.padStart(String(1 + date.getMonth()), 2, "0"));
		// 		this.year(String(date.getFullYear()));
		// 	}
		// });
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

	private autoAdvance(id: string, self: HTMLInputElement, targetType: string | undefined, streamValue: string) {
		const maxLength = parseInt(self.getAttribute("maxlength") as string);
		if (streamValue.length === maxLength && targetType) {
			const next = this.dom.querySelector(`#${id}-${targetType}`) as HTMLInputElement;
			next.focus();
		}
	}

	private getBooleans(type: string, firstCharValue: number, secondCharValue: number): ReadonlyArray<boolean> {
		switch (type) {
			case "dd": return [
				isNaN(firstCharValue) || firstCharValue <= 3,
				(isNaN(secondCharValue) || ((firstCharValue === 3 && secondCharValue <= 1))
					|| firstCharValue < 3) && !(firstCharValue === 0 && secondCharValue === 0)
			];
			case "mm": return [
				// month from 01 to 12
				isNaN(firstCharValue) || firstCharValue <= 1,
				(isNaN(secondCharValue) || ((firstCharValue === 1 && secondCharValue <= 2))
					|| firstCharValue < 1) && !(firstCharValue === 0 && secondCharValue === 0)
			];
			case "yyyy": return [
				// year has to start from 1 or above
				isNaN(firstCharValue) || (firstCharValue >= 1 && firstCharValue < 3),
				// min 1900
				isNaN(secondCharValue) || ((firstCharValue === 1 && secondCharValue === 9)) || (firstCharValue === 2)
			];
			default: return [false, false];
		}
	}


	private handleDateChange(streamType: TPropStream, id: string,
		selfType: string, targetType?: string) {

		const self = this.dom.querySelector(`#${id}-${selfType}`) as HTMLInputElement;
		const prevValue = streamType() ? streamType() : "";
		const value = self.value;
		const isPureInteger = /^\d*$/.test(value);
		const firstCharValue = parseInt(value.charAt(0));
		const secondCharValue = parseInt(value.charAt(1));

		const valid = this.getBooleans(selfType, firstCharValue, secondCharValue);
		const startingValid = valid[0];
		const endingValid = valid[1];

		if ((isPureInteger || value === "") && startingValid && endingValid) {
			streamType(value);
		}
		else {
			streamType(prevValue);
		}

		this.autoAdvance(id, self, targetType, streamType() as string);
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
				oninput: () => this.handleDateChange(this.day, id, "dd", isUsLocale ? "yyyy" : "mm"),
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
				oninput: () => this.handleDateChange(this.month, id, "mm", isUsLocale ? "dd" : "yyyy"),
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
				oninput: () => this.handleDateChange(this.year, id, "yyyy"),
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
