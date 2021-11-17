import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { DateWidth, inputCls } from "../theme";
import { appendZeroToDayMonth, focusLastInput, handleDateChange, handleRetreatOrLiteralAdvance, resetInvalidValueStream, TDateInputType, updateDom, validateCardDate } from "../dateUtils";
import { HiddenDateInput } from "./hiddenDateInput";

import { LayoutFixed } from "./layout/layoutFixedLabel";

export class CardDateInput implements ClassComponent<IPropWidget> {

	private readonly month = stream<string>("");
	private readonly year = stream<string>("");
	// Combine date parts
	private readonly date = stream<string>("");
	private readonly valid = stream(true);
	private readonly dom = stream<Element>();
	private readonly focusedInput = stream<TDateInputType>('mm');


	private buildDate(required: boolean, valueStream: TPropStream) {
		this.date(`${this.month()}/${this.year()}`);
		const valid = validateCardDate(this.year(), this.month(), required, this.dom());
		resetInvalidValueStream(valid, this.date(), this.year(), this.month(), "", valueStream);
	}

	public oninit({ attrs: { value, field } }: CVnode<IPropWidget>) {
		this.valid(!field.required);
		// Split value into date parts
		(value as stream<TProp>).map((newVal) => {
			// only handle value when the main value stream is changed
			if (newVal) {
				this.date('');
				const [month, year] = String(newVal).split("/");
				// set individual date inputs based on value stream (not date stream)
				this.month(month);
				this.year(year);
			}
			// only reset the non-edited date fields
			else if (!this.date()) {
				this.month('');
				this.year('');
			}
			this.valid(validateCardDate(this.year(), this.month(), Boolean(field.required), this.dom()));
		});
	}

	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		updateDom(dom, this.dom);
	}

	public onupdate({ dom }: CVnodeDOM<IPropWidget>) {
		updateDom(dom, this.dom);
	}

	public onremove() {
		this.date.end(true);
		this.year.end(true);
		this.month.end(true);
	}


	public view({ attrs }: CVnode<IPropWidget>) {
		const { field, value } = attrs;
		const {
			id, name = id,
			required, readonly, disabled,
			uiClass = {}
		} = field;
		const classStr = inputCls(uiClass);
		return m(LayoutFixed, { value, field, invalid: !this.valid() }, m('.flex', {
			onclick: () => focusLastInput(this.dom(), id, this.focusedInput()),
			// padding to behave similar to HTML native input paddings
			style: { padding: '1px 2px' },
		},
			m("span", [
				m("input.w-100.bg-transparent.bn.outline-0.tc", {
					id: `${id}-mm`, name: `${name}-mm`,
					type: FieldType.text, placeholder: "MM",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.month(),
					class: classStr, style: {
						maxWidth: DateWidth.mm,
						padding: '0px'
					},
					onfocus: lodash.partial(this.focusedInput, 'mm'),
					oninput: () => {
						handleDateChange(this.month, id, "mm", this.dom(), "yy");
						this.buildDate(Boolean(field.required), attrs.value);
					},
					onkeydown: (e: KeyboardEvent) => {
						handleRetreatOrLiteralAdvance(
							id, 'mm', this.month(), this.dom(),
							e, '/', 'yy', undefined
						);
					},
					onblur: () => {
						appendZeroToDayMonth(this.month);
						this.buildDate(Boolean(field.required), attrs.value);
					}
				})
			]),
			m("span", { style: { padding: '0px', marginRight: '2px' } }, "/"),
			m("span", [
				m("input.w-100.bg-transparent.bn.outline-0.tc", {
					id: `${id}-yy`, name: `${name}-yy`,
					type: FieldType.text, placeholder: "YY",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.year(),
					class: classStr, style: {
						maxWidth: DateWidth.yy,
						padding: '0px'
					},
					onfocus: lodash.partial(this.focusedInput, 'yy'),
					onkeydown: (e: KeyboardEvent) => {
						handleRetreatOrLiteralAdvance(
							id, 'yy', this.year(), this.dom(),
							e, '/', undefined, 'mm'
						);
					},
					oninput: () => {
						handleDateChange(this.year, id, "yy", this.dom());
						this.buildDate(Boolean(field.required), attrs.value);
					}
				}),
				m(HiddenDateInput, attrs)
			])),
		);
	}

}
