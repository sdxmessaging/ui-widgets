import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TProp } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls, styleSm } from "../theme";

import { getLabel, handleDateChange } from "../utils";
import { propInvalid } from "../validation";

export class CardDateInput implements ClassComponent<IPropWidget> {

	private month = stream<string>();
	private year = stream<string>();
	private typing = stream<boolean>(false);
	private valid = stream.lift(
		(month, year) => {
			const newYear = parseInt(year);
			const newMonth = parseInt(month) - 1;

			const newDate = new Date(newYear, newMonth);
			return year.length === 2 && newDate.getMonth() === newMonth && month.length === 2;
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
			if (!this.typing()) {
				const [month, year = ""] = String(newVal).split("/");
				this.month(month);
				this.year(year);
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
						oninput: () => handleDateChange(this.month, id, "mm", this.dom, this.typing, "yy")
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
						oninput: () => handleDateChange(this.year, id, "yy", this.dom, this.typing)
					})
				])
			])
		]);
	}

}
