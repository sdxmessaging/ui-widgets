import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TProp } from "../interface/widget";

import { inpCls, lblCls } from "../theme";
import { getEnabledClass, getLabel, setValue } from "../utils";

export class DateInput implements ClassComponent<IPropWidget> {

	private day = stream<string>();
	private month = stream<string>();
	private year = stream<string>();
	// Combine date parts
	private date = stream.lift(
		(day, month, year) => `${year}-${month}-${day}`,
		this.day, this.month, this.year
	);

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Split value into date parts
		value.map((newVal) => {
			const date = new Date(String(newVal));
			if (lodash.isDate(date) && !isNaN(date.getTime())) {
				this.day(lodash.padStart(String(date.getDate()), 2, "0"));
				this.month(lodash.padStart(String(1 + date.getMonth()), 2, "0"));
				this.year(String(date.getFullYear()));
			}
		});
		// Update value when date changes
		this.date.map((newDate) => {
			const date = new Date(String(newDate));
			// Prevent recursive setting between streams
			if (lodash.isDate(date) && !isNaN(date.getTime()) && newDate !== value()) {
				value(newDate);
			}
		});
	}

	public onremove() {
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
		this.day.end(true);
	}

	public view({ attrs: { field } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled,
			containerClass, classes = "",
			options
		} = field as IOptionField;
		const locale = options && options.length ? options[0].value : "en-GB"
		const classStr = `${getEnabledClass(disabled, true)} ${inpCls()} ${classes}`;
		const styleSm = { "max-width": "5.4ex" };
		const styleLg = { "max-width": "9ex" };
		// Create DD-MM-YYYY inputs
		const dayInput = m(".dib.mr2", [
			m("label.db.mb1", {
				for: `${id}-dd`,
				class: lblCls()
			}, "Day"),
			m("input.input-reset.border-box", {
				id: `${id}-dd`, name: `${name}-dd`,
				type: FieldType.text, placeholder: "DD",
				minlength: "2", maxlength: "2",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.day(),
				class: classStr, style: styleSm,
				onchange: setValue(this.day as stream<TProp>)
			})
		]);
		const monthInput = m(".dib.mr2", [
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
		]);
		const yearInput = m(".dib.mr2", [
			m("label.db.mb1", {
				for: `${id}-yyyy`,
				class: lblCls()
			}, "Year"),
			m("input.input-reset.border-box", {
				id: `${id}-yyyy`, name: `${name}-yyyy`,
				type: FieldType.text, placeholder: "YYYY",
				minlength: "4", maxlength: "4",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled,
				value: this.year(),
				class: classStr, style: styleLg,
				onchange: setValue(this.year as stream<TProp>)
			})
		]);
		// Assemble date input (en-GB or en-US layouts)
		return [
			getLabel(field),
			m(".w-100", {
				id, title,
				class: containerClass
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
		];
	}

}
