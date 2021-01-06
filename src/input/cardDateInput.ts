import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls, styleSm } from "../theme";

import { getLabel, setValue } from "../utils";

export class CardDateInput implements ClassComponent<IPropWidget> {

	private month = stream<string>();
	private year = stream<string>();
	// Combine date parts
	private date = stream.lift(
		(month, year) => `${month}/${year}`,
		this.month, this.year
	);

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Split value into date parts
		(value as stream<unknown>).map((newVal) => {
			const [month, year = ""] = String(newVal).split("/");
			this.month(month);
			this.year(year);
		});
		// Update value when date changes
		this.date.map((newDate) => {
			// Prevent recursive setting between streams
			if (newDate !== value()) {
				value(newDate);
			}
		});
	}

	public onremove() {
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
	}

	public view({ attrs: { field } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled,
			uiClass = {},
		} = field;
		const classStr = inputCls(uiClass, disabled, true);
		// Assemble date input (en-GB or en-US layouts)
		return m("fieldset", {
			class: wrapperCls(uiClass)
		}, [
			getLabel(`${id}-mm`, uiClass, label, required),
			m("div", {
				title,
				class: inputWrapperCls(uiClass)
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
						onchange: setValue(this.month)
					})
				]),
				m("span.mr2", "/"),
				m("div.dib.mr2", [
					getLabel(`${id}-yy`, uiClass, "Year"),
					m("input.w-100.bg-transparent.bn.outline-0", {
						id: `${id}-yy`, name: `${name}-yy`,
						type: FieldType.text, placeholder: "YY",
						minlength: "4", maxlength: "4",
						pattern: "[0-9]*", inputmode: "numeric",
						required, readonly, disabled,
						value: this.year(),
						class: classStr, style: styleSm,
						onchange: setValue(this.year)
					})
				])
			])
		]);
	}

}
