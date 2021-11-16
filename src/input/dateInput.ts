import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TField, TProp, TPropStream } from "../interface/widget";

import { DateWidth, inputCls } from "../theme";
import { appendZeroToDayMonth, dateInputIds, focusLastInput, handleDateChange, handleRetreatOrLiteralAdvance, resetInvalidValueStream, TDateInputType, TDateType, updateDom, validateDate } from "../utils";
import { HiddenDateInput } from "./hiddenDateInput";

import { LayoutFixed } from "./layout/layoutFixedLabel";

interface IDateParts {
	readonly type: TDateType | "literal",
	readonly value: string
}
export class DateInput implements ClassComponent<IPropWidget> {

	private readonly day = stream<string>("");
	private readonly month = stream<string>("");
	private readonly year = stream<string>("");
	private readonly date = stream<string>();
	// private readonly valid = this.date.map(Boolean);
	private readonly valid = stream(true);
	private readonly literalKey = stream<string>('/');

	private dateInputAdvanceOrder!: ReadonlyArray<Intl.DateTimeFormatPartTypes>;

	private readonly dom = stream<Element>();
	private readonly focusedInput = stream<TDateInputType | undefined>(undefined);
	private dateParts!: ReadonlyArray<IDateParts>;
	private readonly locale = stream<string | undefined>(undefined);

	private buildDate(required: boolean, valueStream: TPropStream) {
		this.date(`${this.year()}-${this.month()}-${this.day()}`);
		const valid = validateDate(this.year(), this.month(), this.day(), required);
		this.valid(valid);
		resetInvalidValueStream(valid, this.date(), this.year(), this.month(), this.day(), valueStream);
	}

	// Casting as TDateInputType because undefined will not ever be returned due to oninput not firing if input's full
	private findNextInput(type: TDateType) {
		const index = this.dateInputAdvanceOrder.indexOf(type);
		return (index !== this.dateInputAdvanceOrder.length && dateInputIds(this.dateInputAdvanceOrder[
			this.dateInputAdvanceOrder.indexOf(type) + 1
		] as TDateType)) as TDateInputType;
	}
	private findPrevInput(type: TDateType) {
		const index = this.dateInputAdvanceOrder.indexOf(type);
		return (index !== 0 && dateInputIds(this.dateInputAdvanceOrder[
			this.dateInputAdvanceOrder.indexOf(type) - 1
		] as TDateType)) as TDateInputType;
	}

	private setDateInputs(locale: string | undefined) {
		const dateParts = new Intl.DateTimeFormat(locale).formatToParts();
		// TODO map literals to ascii code for keyboard event
		this.dateParts = dateParts as IDateParts[];
		const dateType = dateParts[0].type as TDateType;
		this.literalKey(dateParts[1].value);
		const firstInputId = dateInputIds(dateType) as TDateInputType;
		this.focusedInput(firstInputId);

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

	public oninit({ attrs: { value, field } }: CVnode<IPropWidget>) {
		// Split value into date parts
		(value as stream<TProp>).map((newVal) => {
			// only handle value when the main value stream is changed
			if (newVal) {
				const date = new Date(String(newVal));
				// multiple data-binding reset date stream
				this.date('');
				// set individual date inputs based on value stream (not date stream)
				const day = lodash.padStart(String(date.getDate()), 2, "0");
				const month = lodash.padStart(String(1 + date.getMonth()), 2, "0");
				const year = String(date.getFullYear());
				this.day(day);
				this.month(month);
				this.year(year);
			}
			// only reset the non-edited date fields
			else if (!this.date()) {
				this.day("");
				this.month("");
				this.year("");
			}
		});

		this.locale.map((newVal) => {
			this.setDateInputs(newVal);
		});
		this.valid(!field.required);
		this.setLocale(field);
	}

	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		updateDom(dom, this.dom, this.valid);
	}


	public onbeforeupdate({ attrs: { field } }: CVnode<IPropWidget>) {
		this.setLocale(field);
	}

	public onupdate({ dom }: CVnodeDOM<IPropWidget>) {
		updateDom(dom, this.dom, this.valid);
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
		const { field } = attrs;
		const createDateInputs = ({ type, value }: IDateParts) => {
			switch (type) {
				case ('literal'): return m('span', { style: { padding: '0px', marginRight: '2px' } }, value);
				case ('day'): return m("span", m("input.w-100.bg-transparent.bn.outline-0.tc", {
					id: `${id}-dd`, name: `${name}-dd`,
					type: FieldType.text, placeholder: "DD",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.day(),
					class: classStr,
					onfocus: lodash.partial(this.focusedInput, 'dd'),
					onkeydown: (e: KeyboardEvent) => {
						handleRetreatOrLiteralAdvance(
							id, this.day(), this.dom(),
							e, this.literalKey(), this.findNextInput('day'), this.findPrevInput('day')
						);
					},
					oninput: () => {
						handleDateChange(this.day, id, "dd", this.dom(), this.findNextInput('day'));
						this.buildDate(Boolean(required), attrs.value);
					},
					onblur: () => {
						appendZeroToDayMonth(this.day);
						this.buildDate(Boolean(required), attrs.value);
					},
					style: {
						maxWidth: DateWidth.dd,
						padding: '0px'
					}
				}));
				case ('month'): return m("span", m("input.w-100.bg-transparent.bn.outline-0.tc", {
					id: `${id}-mm`, name: `${name}-mm`,
					type: FieldType.text, placeholder: "MM",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.month(),
					class: classStr,
					onkeydown: (e: KeyboardEvent) => {
						handleRetreatOrLiteralAdvance(
							id, this.month(), this.dom(),
							e, this.literalKey(), this.findNextInput('month'), this.findPrevInput('month')
						);
					},
					oninput: () => {
						handleDateChange(this.month, id, "mm", this.dom(), this.findNextInput('month'));
						this.buildDate(Boolean(required), attrs.value);
					},
					onfocus: lodash.partial(this.focusedInput, 'mm'),
					onblur: () => {
						appendZeroToDayMonth(this.month);
						this.buildDate(Boolean(required), attrs.value);
					},
					style: {
						maxWidth: DateWidth.mm,
						padding: '0px'
					}
				}));
				case ('year'): return m("span", m("input.w-100.bg-transparent.bn.outline-0.tc", {
					id: `${id}-yyyy`, name: `${name}-yyyy`,
					type: FieldType.text, placeholder: "YYYY",
					minlength: "4", maxlength: "4",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.year(),
					class: classStr,
					onfocus: lodash.partial(this.focusedInput, 'yyyy'),
					onkeydown: (e: KeyboardEvent) => {
						handleRetreatOrLiteralAdvance(
							id, this.year(), this.dom(),
							e, this.literalKey(), this.findNextInput('year'), this.findPrevInput('year')
						);
					},
					oninput: () => {
						handleDateChange(this.year, id, "yyyy", this.dom(), this.findNextInput('year'));
						this.buildDate(Boolean(required), attrs.value);
					},
					style: {
						maxWidth: DateWidth.yyyy,
						padding: '0px'
					}
				}));
			}
		};

		return m(LayoutFixed, {
			value: attrs.value, field,
			invalid: (!this.valid() && Boolean(required)) || (!this.valid())
		},
			m('.flex', {
				onclick: () => focusLastInput(this.dom(), id, this.focusedInput()),
				// padding to behave similar to HTML native input paddings
				style: {
					padding: '1px 2px',
				}
			},
				this.dateParts.map((datePart) => {
					return createDateInputs(datePart);
				}),
				m(HiddenDateInput, attrs)
			)
		);
	}
}
