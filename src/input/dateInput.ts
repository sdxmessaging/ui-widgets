import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IOptionField, IPropWidget, TField, TProp } from "../interface/widget";

import { DateWidth, inputCls } from "../theme";
import { autoRetreat, dateInputIds, focusLastInput, handleDateChange, TDateInputType, TDateType, updateDom, validateDate } from "../utils";
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

	private dateInputAdvanceOrder!: ReadonlyArray<Intl.DateTimeFormatPartTypes>;

	private readonly dom = stream<Element>();
	private readonly focusedInput = stream<TDateInputType | undefined>(undefined);
	private dateParts!: ReadonlyArray<IDateParts>;
	private readonly locale = stream<string | undefined>(undefined);

	private buildDate() {
		this.date(`${this.year()}-${this.month()}-${this.day()}`);
		this.valid(validateDate(this.year(), this.month(), this.day()));
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
		this.valid(!attrs.field.required);
		this.setLocale(attrs.field);
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
					onkeydown: (e: KeyboardEvent) => autoRetreat(id, this.findPrevInput('day'), this.day(), this.dom(), e),
					oninput: (e: InputEvent) => {
						handleDateChange(this.day, id, "dd", this.dom(), e, this.findNextInput('day'));
						this.buildDate();
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
					onkeydown: (e: KeyboardEvent) => autoRetreat(id, this.findPrevInput('month'), this.month(), this.dom(), e),
					oninput: (e: InputEvent) => {
						handleDateChange(this.month, id, "mm", this.dom(), e, this.findNextInput('month'));
						this.buildDate();
					},
					onfocus: lodash.partial(this.focusedInput, 'mm'),
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
					onkeydown: (e: KeyboardEvent) => autoRetreat(id, this.findPrevInput('year'), this.year(), this.dom(), e),
					oninput: (e: InputEvent) => {
						handleDateChange(this.year, id, "yyyy", this.dom(), e, this.findNextInput('year'));
						this.buildDate();
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
