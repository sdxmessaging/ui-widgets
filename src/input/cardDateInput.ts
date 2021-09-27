import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TProp } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls, styleSm } from "../theme";

import { getLabel, handleDateChange, setCustomValidityMessage, updateNewValue } from "../utils";
import { propInvalid } from "../validation";

export class CardDateInput implements ClassComponent<IPropWidget> {

	private month = stream<string>();
	private year = stream<string>();
	private valid = stream.lift(
		(month, year) => {
			// month is set between 1-12 elsewhere
			return year.length === 2 && month.length === 2;
		},
		this.month, this.year
	);
	// Combine date parts
	private date = stream.lift(
		(month, year, valid) => valid ? `${month}/${year}` : "",
		this.month, this.year, this.valid
	);

	private dom!: Element;
	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Split value into date parts
		(value as stream<TProp>).map((newVal) => {
			const [month, year = ""] = String(newVal).split("/");
			month.length === 2 && this.month(month);
			year.length === 2 && this.year(year);
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
	}

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled,
			uiClass = {}
		} = field;
		const classStr = inputCls(uiClass);
		// Assemble date input (en-GB or en-US layouts)
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(`${id}-mm`, uiClass, label, required),
			m("div", {
				title,
				class: inputWrapperCls(uiClass, propInvalid(field, value()))
			}, [
				m("div.dib.mr2", [
					getLabel(`${id}-mm`, uiClass, "Month"),
					m("input.w-100.bg-transparent.bn.outline-0", {
						id: `${id}-mm`, name: `${name}-mm`,
						type: FieldType.text, placeholder: "MM",
						minlength: "2", maxlength: "2",
						pattern: "[0-9]*", inputmode: "numeric",
						required, readonly, disabled,
						value: this.month(),
						class: classStr, style: styleSm,
						oninput: () => handleDateChange(this.month, id, "mm", this.dom, "yy")
					})
				]),
				m("span.mr2", "/"),
				m("div.dib.mr2", [
					getLabel(`${id}-yy`, uiClass, "Year"),
					m("input.w-100.bg-transparent.bn.outline-0", {
						id: `${id}-yy`, name: `${name}-yy`,
						type: FieldType.text, placeholder: "YY",
						minlength: "2", maxlength: "2",
						pattern: "[0-9]*", inputmode: "numeric",
						required, readonly, disabled,
						value: this.year(),
						class: classStr, style: styleSm,
						oninput: () => handleDateChange(this.year, id, "yy", this.dom)
					})
				])
			])
		]);
	}

}
