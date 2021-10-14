import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TField, TProp, TPropStream } from "../interface/widget";

import { DateWidth, inputCls } from "../theme";
import { autoRetreat, focusLastInput, handleDateChange, TDateInputType, updateDom } from "../utils";

import { LayoutFixed } from "./layout/layoutFixedLabel";

type TDateType = 'day' | 'month' | 'year';

function dateInputIds(type: TDateType) {
	switch (type) {
		case 'day': return 'dd';
		case 'month': return 'mm';
		case 'year': return 'yyyy';
	}
}
export class DateInput implements ClassComponent<IPropWidget> {
	private day = stream<string>("");
	private month = stream<string>("");
	private year = stream<string>("");
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

	private dom = stream<Element>();
	private focusedInput = stream<TDateInputType>('dd');
	private dateParts!: Intl.DateTimeFormatPart[];
	private locale = stream<string | undefined>(undefined);

	private findNextInput(type: TDateType) {
		const index = this.dateInputAdvanceOrder.indexOf(type);
		return index !== this.dateInputAdvanceOrder.length ? dateInputIds(this.dateInputAdvanceOrder[
			this.dateInputAdvanceOrder.indexOf(type) + 1
		] as TDateType) as TDateInputType : undefined;
	}
	private findPrevInput(type: TDateType) {
		const index = this.dateInputAdvanceOrder.indexOf(type);
		return index !== 0 ? dateInputIds(this.dateInputAdvanceOrder[
			this.dateInputAdvanceOrder.indexOf(type) - 1
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
		updateDom(dom, this.dom, this.valid);
	}


	public onbeforeupdate({ attrs: { field } }: CVnode<IPropWidget>) {
		this.setLocale(field);
	}

	public onupdate({ dom }: CVnodeDOM<IPropWidget>) {
		if (this.dom() !== dom) {
			updateDom(dom, this.dom, this.valid);
		}
	}

	public onremove() {
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
		this.day.end(true);
	}

	public view({ attrs }: CVnode<IPropWidget>) {
		const {
			id, name = id,
			required, readonly, disabled,
			uiClass = {},
		} = attrs.field as IOptionField;
		const classStr = inputCls(uiClass);

		return m(LayoutFixed, attrs,
			m('.flex', { onclick: () => focusLastInput(this.dom(), id, this.focusedInput()) },
				this.dateParts.map(({ type, value }) => {
					if (type === 'literal') {
						return m('span', { style: { padding: '0px', marginRight: '2px' } }, value);
					}
					else if (type === "day") {
						return m("span", m("input.w-100.bg-transparent.bn.outline-0.pa0", {
							id: `${id}-dd`, name: `${name}-dd`,
							type: FieldType.text, placeholder: "DD",
							minlength: "2", maxlength: "2",
							pattern: "[0-9]*", inputmode: "numeric",
							required, readonly, disabled,
							value: this.day(),
							class: classStr,
							onfocus: () => this.focusedInput('dd'),
							onkeydown: (e: KeyboardEvent) => autoRetreat(id, this.findPrevInput('day'), this.day(), this.dom(), e),
							oninput: (e: InputEvent) => {
								handleDateChange(this.day, id, "dd", this.dom(), e, this.findNextInput('day'));
								this.updateInputs(attrs.value);
							},
							style: {
								maxWidth: DateWidth.dd,
								textAlign: this.day() && this.day().length === 2 ? "center" : "left",
								padding: '0px'
							}
						}));
					}
					else if (type === 'month') {
						return m("span", m("input.w-100.bg-transparent.bn.outline-0.pa0", {
							id: `${id}-mm`, name: `${name}-mm`,
							type: FieldType.text, placeholder: "MM",
							minlength: "2", maxlength: "2",
							pattern: "[0-9]*", inputmode: "numeric",
							required, readonly, disabled,
							value: this.month(),
							class: classStr,
							onkeydown: (e: KeyboardEvent) => autoRetreat(id, this.findPrevInput('month'), this.month(), this.dom(), e),
							oninput: (e: InputEvent) => {
								handleDateChange(this.month, id, "mm", this.dom(), e, this.findNextInput('month'));
								this.updateInputs(attrs.value);
							},
							onfocus: () => this.focusedInput('mm'),
							style: {
								maxWidth: DateWidth.mm,
								textAlign: this.month() && this.month().length === 2 ? "center" : "left",
								padding: '0px'
							}
						}));
					}
					else if (type === 'year') {
						return m("span", m("input.w-100.bg-transparent.bn.outline-0.pa0", {
							id: `${id}-yyyy`, name: `${name}-yyyy`,
							type: FieldType.text, placeholder: "YYYY",
							minlength: "4", maxlength: "4",
							pattern: "[0-9]*", inputmode: "numeric",
							required, readonly, disabled,
							value: this.year(),
							class: classStr,
							onfocus: () => this.focusedInput('yyyy'),
							onkeydown: (e: KeyboardEvent) => autoRetreat(id, this.findPrevInput('year'), this.year(), this.dom(), e),
							oninput: (e: InputEvent) => {
								handleDateChange(this.year, id, "yyyy", this.dom(), e, this.findNextInput('year'));
								this.updateInputs(attrs.value);
							},
							style: {
								maxWidth: DateWidth.yyyy,
								textAlign: this.year() && this.year().length === 4 ? "center" : "left",
								padding: '0px'
							}
						}));
					}
					return null;
				})));
	}
}
