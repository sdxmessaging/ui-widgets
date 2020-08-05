import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TProp } from "../interface/widget";

import { inpCls, lblCls, styleSm } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

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
		value.map((newVal) => {
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
			containerClass, classes = ""
		} = field;
		const classStr = `${getEnabledClass(disabled, true)} ${inpCls()} ${classes}`;
		// Assemble date input (en-GB or en-US layouts)
		return [
			getLabel(field),
			m(".w-100", {
				id, title,
				class: containerClass
			}, [
				m(".dib.mr2", [
					m("label.db.mb1", {
						for: `${id}-mm`,
						class: lblCls()
					}, "Month"),
					m("input.input-reset.border-box", {
						id: `${id}-mm`, name: `${name}-mm`,
						type: FieldType.text, placeholder: "MM",
						minlength: "2", maxlength: "2",
						pattern: "[0-9]*", inputmode: "numeric",
						required, readonly, disabled,
						value: this.month(),
						class: classStr, style: styleSm,
						onchange: setValue(this.month as stream<TProp>)
					})
				]),
				m(".dib.mr2", [
					m("label.db.mb1", {
						for: `${id}-yyyy`,
						class: lblCls()
					}, "Year"),
					m("input.input-reset.border-box", {
						id: `${id}-yyyy`, name: `${name}-yyyy`,
						type: FieldType.text, placeholder: "YY",
						minlength: "4", maxlength: "4",
						pattern: "[0-9]*", inputmode: "numeric",
						required, readonly, disabled,
						value: this.year(),
						class: classStr, style: styleSm,
						onchange: setValue(this.year as stream<TProp>)
					})
				])
			])
		];
	}

}
