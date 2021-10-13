import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TField, TProp, TPropStream } from "../interface/widget";

import { DateWidth, inputCls } from "../theme";
import { handleDateChange, setCustomValidityMessage, TDateInputType } from "../utils";

import { layoutFixed } from "./layout/layoutFixedLabel";

type TDateType = 'day' | 'month' | 'year';

function dateInputIds(type: TDateType) {
	switch (type) {
		case 'day': return 'dd';
		case 'month': return 'mm';
		case 'year': return 'yyyy';
		default: return undefined;
	}
}

export class DateInput implements ClassComponent<IPropWidget> {
	private day = stream<string>();
	private month = stream<string>();
	private year = stream<string>();

	private date = stream<string>();
	private valid = this.date.map(Boolean);
	private buildDate() {
		this.date(`${this.year()}-${this.month()}-${this.day()}`);
	}

	private updateInputs(valueStream: TPropStream) {
		const newYear = parseInt(this.year());
		const newMonth = parseInt(this.month()) - 1;
		const newDay = parseInt(this.day());
		const newDate = new Date(newYear, newMonth, newDay);
		if (newDate.getFullYear() === newYear && this.year().length === 4
			&& newDate.getMonth() === newMonth && newDate.getDate() === newDay
			&& this.day().length === 2 && this.month().length === 2) {
			this.buildDate();
			valueStream(this.date());
		}
		else {
			this.date('');
			valueStream('');
		}
	}

	private dateInputAdvanceOrder!: Intl.DateTimeFormatPartTypes[];

	private dom!: Element;
	private dateParts!: Intl.DateTimeFormatPart[];
	private locale = stream<string | undefined>(undefined);

	private findNextInput(type: TDateType) {
		const index = this.dateInputAdvanceOrder.indexOf(type);
		return index !== this.dateInputAdvanceOrder.length ? dateInputIds(this.dateInputAdvanceOrder[
			this.dateInputAdvanceOrder.indexOf(type) + 1
		] as TDateType) as TDateInputType : undefined;
	}

	private setDateInputs(locale: string | undefined) {
		const dateParts = new Intl.DateTimeFormat(locale).formatToParts();
		this.dateParts = dateParts;

		this.dateInputAdvanceOrder = lodash(this.dateParts).map((({ type }) => {
			return type;
		})).filter((type) => {
			return type !== "literal";
		}).value();
	}

	private setLocale(field: TField) {
		const { options } = field as IOptionField;
		const locale = options && options.length ? options[0].value as string : undefined;
		if (locale !== this.locale()) {
			this.locale(locale);
		}
	}

	public oninit({ attrs }: CVnode<IPropWidget>) {
		// Split value into date parts
		(attrs.value as stream<TProp>).map((newVal) => {
			const date = new Date(String(newVal));
			if (lodash.isDate(date) && !isNaN(date.getTime())) {
				const day = lodash.padStart(String(date.getDate()), 2, "0");
				const month = lodash.padStart(String(1 + date.getMonth()), 2, "0");
				const year = String(date.getFullYear());
				this.day(day);
				this.month(month);
				this.year(year);
				this.buildDate();
			}
			else if (!newVal && this.date()) {
				this.day('');
				this.month('');
				this.year('');
				this.date('');
			}
		});

		this.locale.map((newVal) => {
			this.setDateInputs(newVal);
		});
		this.setLocale(attrs.field);
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

	public onbeforeupdate({ attrs: { field } }: CVnode<IPropWidget>) {
		this.setLocale(field);
	}

	public view({ attrs }: CVnode<IPropWidget>) {
		const {
			id, name = id,
			required, readonly, disabled,
			uiClass = {},
		} = attrs.field as IOptionField;
		const classStr = inputCls(uiClass);

		return m(layoutFixed, attrs, this.dateParts.map(({ type, value }) => {
			if (type === 'literal') {
				return m('span.self-center', value);
			}
			else if (type === "day") {
				return m(".dib", m("input.w-100.bg-transparent.bn.outline-0", {
					id: `${id}-dd`, name: `${name}-dd`,
					type: FieldType.text, placeholder: "DD",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.day(),
					oninput: () => {
						handleDateChange(this.day, id, "dd", this.dom, this.findNextInput('day'));
						this.updateInputs(attrs.value);
					},
					class: classStr,
					style: {
						maxWidth: DateWidth.dd,
						textAlign: this.day() && this.day().length === 2 ? "center" : "left"
					}
				}));
			}
			else if (type === 'month') {
				return m(".dib", m("input.w-100.bg-transparent.bn.outline-0", {
					id: `${id}-mm`, name: `${name}-mm`,
					type: FieldType.text, placeholder: "MM",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.month(),
					oninput: () => {
						handleDateChange(this.month, id, "mm", this.dom, this.findNextInput('month'));
						this.updateInputs(attrs.value);
					},
					class: classStr,
					style: {
						maxWidth: DateWidth.mm,
						textAlign: this.month() && this.month().length === 2 ? "center" : "left"
					}
				}));
			}
			else if (type === 'year') {
				return m(".dib", m("input.w-100.bg-transparent.bn.outline-0", {
					id: `${id}-yyyy`, name: `${name}-yyyy`,
					type: FieldType.text, placeholder: "YYYY",
					minlength: "4", maxlength: "4",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.year(),
					oninput: () => {
						handleDateChange(this.year, id, "yyyy", this.dom, this.findNextInput('year'));
						this.updateInputs(attrs.value);
					},
					class: classStr,
					style: {
						maxWidth: DateWidth.yyyy
					}
				}));
			}
			return null;
		}));
	}
}
