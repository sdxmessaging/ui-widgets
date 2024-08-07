import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { IConfig } from "../interface/config";
import { FieldType, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { getConfig } from "../config";
import { appendZeroToDayMonth, dateInputIds, focusLastInput, handleDateChange, handleRetreatOrLiteralAdvance, resetInvalidValueStream, TDateInputType, TDateType, validateDate } from "../dateUtils";
import { inputCls } from "../theme";
import { setIfDifferent } from "../utils";

import { LayoutFixed } from "./layout/layoutFixedLabel";
import { HiddenDateInput } from "./hiddenDateInput";
import { DatePicker, getYmd } from "./datePicker";

interface IDateParts {
	readonly type: TDateType | "literal",
	readonly value: string;
}

export class DateInput implements ClassComponent<IPropWidget> {

	private readonly dom = stream<Element>();
	private readonly valid = stream();
	private readonly focusedInput = stream<TDateInputType | undefined>(undefined);

	private dateParts!: ReadonlyArray<IDateParts>;
	private readonly locale = stream<string | undefined>(undefined);
	private readonly literalKey = stream<string>('/');
	private dateInputAdvanceOrder!: ReadonlyArray<Intl.DateTimeFormatPartTypes>;

	private readonly day = stream<string>("");
	private readonly month = stream<string>("");
	private readonly year = stream<string>("");
	private readonly date = stream<string>();
	private valueChange!: stream<void>;

	private buildDate(valueStream: TPropStream, required = false) {
		this.date(`${this.year()}-${this.month()}-${this.day()}`);
		const valid = validateDate(this.year(), this.month(), this.day(), required, this.dom());
		// important! reset value when value stream is invalid
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

	private setLocale(config?: Partial<IConfig>) {
		const locale = getConfig("dateLocale", config);
		if (locale !== this.locale()) {
			this.locale(locale);
		}
	}

	private createDateInputs({ type, value }: IDateParts, {
		attrs: {
			field: {
				id, name = id,
				required, readonly, disabled, tabindex,
				uiClass = {},
			},
			value: streamValue
		} }: CVnode<IPropWidget>) {

		const classStr = inputCls(uiClass);

		switch (type) {
			case ('literal'): return m('span.pa0.mr-2px', value);
			case ('day'): return m("span", m("input.w-100.mw-dd.pa0.bg-transparent.bn.outline-0.tc", {
				id: `${id}-dd`, name: `${name}-dd`,
				type: FieldType.text, placeholder: "DD",
				minlength: "2", maxlength: "2",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled, tabindex,
				value: this.day(),
				'aria-label': `${name}: Day`,
				class: `${classStr} maxw-dd p-0px`,
				onfocus: lodash.partial(this.focusedInput, 'dd'),
				onkeydown: (e: KeyboardEvent) => {
					handleRetreatOrLiteralAdvance(id, 'dd',
						this.day(), this.dom(),
						e, this.literalKey(), {
						next: this.findNextInput('day'),
						prev: this.findPrevInput('day')
					});
				},
				oninput: () => {
					handleDateChange(this.day, id, "dd", this.dom(), this.findNextInput('day'));
					this.buildDate(streamValue, required);
				},
				onblur: () => {
					appendZeroToDayMonth(this.day);
					this.buildDate(streamValue, required);
				}
			}));
			case ('month'): return m("span", m("input.w-100.mw-mm.pa0.bg-transparent.bn.outline-0.tc", {
				id: `${id}-mm`, name: `${name}-mm`,
				type: FieldType.text, placeholder: "MM",
				minlength: "2", maxlength: "2",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled, tabindex,
				value: this.month(),
				'aria-label': `${name}: Month`,
				class: `${classStr} maxw-mm p-0px`,
				onkeydown: (e: KeyboardEvent) => {
					handleRetreatOrLiteralAdvance(id, 'mm',
						this.month(), this.dom(),
						e, this.literalKey(), {
						next: this.findNextInput('month'),
						prev: this.findPrevInput('month')
					});
				},
				oninput: () => {
					handleDateChange(this.month, id, "mm", this.dom(), this.findNextInput('month'));
					this.buildDate(streamValue, required);
				},
				onfocus: lodash.partial(this.focusedInput, 'mm'),
				onblur: () => {
					appendZeroToDayMonth(this.month);
					this.buildDate(streamValue, required);
				}
			}));
			case ('year'): return m("span", m("input.w-100.mw-yyyy.pa0.bg-transparent.bn.outline-0.tc", {
				id: `${id}-yyyy`, name: `${name}-yyyy`,
				type: FieldType.text, placeholder: "YYYY",
				minlength: "4", maxlength: "4",
				pattern: "[0-9]*", inputmode: "numeric",
				required, readonly, disabled, tabindex,
				value: this.year(),
				'aria-label': `${name}: Year`,
				class: `${classStr} maxw-yyyy p-0px`,
				onfocus: lodash.partial(this.focusedInput, 'yyyy'),
				onkeydown: (e: KeyboardEvent) => {
					handleRetreatOrLiteralAdvance(id, 'yyyy',
						this.year(), this.dom(),
						e, this.literalKey(), {
						next: this.findNextInput('year'),
						prev: this.findPrevInput('year')
					});
				},
				oninput: () => {
					handleDateChange(this.year, id, "yyyy", this.dom(), this.findNextInput('year'));
					this.buildDate(streamValue, required);
				}
			}));
		}
	}

	private resetDateParts() {
		this.day("");
		this.month("");
		this.year("");
	}

	public oninit({ attrs: { value, field: { required, config } } }: CVnode<IPropWidget>) {
		this.valid(!required);
		// Split value into date parts
		this.valueChange = (value as stream<TProp>).map((newVal) => {
			// only handle value when the main value stream is changed
			if (newVal) {
				const date = new Date(String(newVal));
				// multiple data-binding reset date stream (important, reset local date stream when value is present)
				this.date('');
				if (isNaN(date.valueOf())) {
					this.resetDateParts();
				} else {
					// set individual date inputs based on value stream (not date stream)
					const [year, month, day] = getYmd(date);
					this.day(day);
					this.month(month);
					this.year(year);
				}
			} else if (!this.date()) {
				this.resetDateParts();
			}
			// validate when value comes in from other date inputs
			this.valid(
				validateDate(this.year(), this.month(), this.day(), Boolean(required), this.dom())
			);
		});

		this.locale.map((newVal) => {
			this.setDateInputs(newVal);
		});
		this.setLocale(config);
	}

	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		setIfDifferent(this.dom, dom);
	}

	public onbeforeupdate({ attrs: { field: { required, config } } }: CVnode<IPropWidget>) {
		this.setLocale(config);
		this.valid(
			validateDate(this.year(), this.month(), this.day(), Boolean(required), this.dom())
		);
	}

	public onupdate({ dom }: CVnodeDOM<IPropWidget>) {
		setIfDifferent(this.dom, dom);
	}

	public onremove() {
		this.valueChange.end(true);
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
		this.day.end(true);
		this.locale.end(true);
	}

	public view(vnode: CVnode<IPropWidget>) {
		const { attrs: { field, value } } = vnode;
		const { id, disabled, readonly } = field;

		return m(LayoutFixed, {
			value: value, field,
			invalid: !this.valid()
		}, m(".flex.items-center", [
			m(".flex-auto.ph-2px.pv-1px", {
				onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
			},
				this.dateParts.map(
					(datePart) => this.createDateInputs(datePart, vnode)
				),
				m(HiddenDateInput, vnode.attrs)
			),
			!(disabled || readonly) && m(DatePicker, { field, value })
		]));
	}
}
