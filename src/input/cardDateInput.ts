import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { inputCls } from "../theme";
import { appendZeroToDayMonth, focusLastInput, handleDateChange, handleRetreatOrLiteralAdvance, resetInvalidValueStream, TDateInputType, validateCardDate } from "../dateUtils";
import { setIfDifferent } from "../utils";

import { LayoutFixed } from "./layout/layoutFixedLabel";
import { HiddenDateInput } from "./hiddenDateInput";

export class CardDateInput implements ClassComponent<IPropWidget> {

	private readonly dom = stream<Element>();
	private readonly valid = stream();
	private readonly focusedInput = stream<TDateInputType>('mm');

	private readonly month = stream<string>("");
	private readonly year = stream<string>("");
	private readonly date = stream<string>("");

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
		setIfDifferent(this.dom, dom);
	}

	public onupdate({ dom }: CVnodeDOM<IPropWidget>) {
		setIfDifferent(this.dom, dom);
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
			required, readonly, disabled, tabindex,
			uiClass = {}
		} = field;
		const classStr = inputCls(uiClass);
		return m(LayoutFixed, { value, field, invalid: !this.valid() }, m('.flex.ph-2px.pv-1px', {
			onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
		},
			m("span", [
				m("input.w-100.mw-mm.pa0.bg-transparent.bn.outline-0.tc", {
					id: `${id}-mm`, name: `${name}-mm`,
					type: FieldType.text, placeholder: "MM",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled, tabindex,
					'aria-label': `${name}: Month`,
					value: this.month(),
					class: classStr,
					onfocus: lodash.partial(this.focusedInput, 'mm'),
					oninput: () => {
						handleDateChange(this.month, id, "mm", this.dom(), "yy");
						this.buildDate(Boolean(field.required), attrs.value);
					},
					onkeydown: (e: KeyboardEvent) => {
						handleRetreatOrLiteralAdvance(id, 'mm',
							this.month(), this.dom(),
							e, '/', { next: 'yy' }
						);
					},
					onblur: () => {
						appendZeroToDayMonth(this.month);
						this.buildDate(Boolean(field.required), attrs.value);
					}
				})
			]),
			m("span.pa0.mr-2px", "/"),
			m("span", [
				m("input.w-100.mw-yy.pa0.bg-transparent.bn.outline-0.tc", {
					id: `${id}-yy`, name: `${name}-yy`,
					type: FieldType.text, placeholder: "YY",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled, tabindex,
					'aria-label': `${name}: Year`,
					value: this.year(),
					class: classStr,
					onfocus: lodash.partial(this.focusedInput, 'yy'),
					onkeydown: (e: KeyboardEvent) => {
						handleRetreatOrLiteralAdvance(id, 'yy',
							this.year(), this.dom(),
							e, '/', { prev: 'mm' }
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
