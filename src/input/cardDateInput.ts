import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TProp, TPropStream } from "../interface/widget";

import { DateWidth, inputCls } from "../theme";
import { handleDateChange, setCustomValidityMessage } from "../utils";

import { LayoutFixed } from "./layout/layoutFixedLabel";

export class CardDateInput implements ClassComponent<IPropWidget> {

	private month = stream<string>();
	private year = stream<string>();

	// Combine date parts
	private date = stream<string>();
	private valid = this.date.map(Boolean);

	private dom!: Element;

	private buildDate() {
		this.date(`${this.month()}/${this.year()}`);
	}

	private updateInputs(valueStream: TPropStream) {
		if (this.month() && this.month().length === 2 && this.year() && this.year().length === 2) {
			this.buildDate();
			valueStream(this.date());
		}
		else {
			this.date('');
			valueStream('');
		}
	}

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		// Split value into date parts
		(value as stream<TProp>).map((newVal) => {
			const [month, year = ""] = String(newVal).split("/");
			if (month.length === 2 && year.length === 2) {
				this.month(month);
				this.year(year);
				this.buildDate();
			}
			else if (!newVal && this.date()) {
				this.month('');
				this.year('');
				this.date('');
			}
		});
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
	}

	public view({ attrs }: CVnode<IPropWidget>) {
		const { field } = attrs;
		const {
			id, name = id,
			required, readonly, disabled,
			uiClass = {}
		} = field;
		const classStr = inputCls(uiClass);
		return m(LayoutFixed, attrs, [
			m("div.dib", [
				m("input.w-100.bg-transparent.bn.outline-0", {
					id: `${id}-mm`, name: `${name}-mm`,
					type: FieldType.text, placeholder: "MM",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.month(),
					class: classStr, style: {
						maxWidth: DateWidth.mm,
						textAlign: this.month() && this.month().length === 2 ? "center" : "left"
					},
					oninput: (e: InputEvent) => {
						handleDateChange(this.month, id, "mm", this.dom, e, "yy");
						this.updateInputs(attrs.value);
					}
				})
			]),
			m("span", "/"),
			m("div.dib", [
				m("input.w-100.bg-transparent.bn.outline-0", {
					id: `${id}-yy`, name: `${name}-yy`,
					type: FieldType.text, placeholder: "YY",
					minlength: "2", maxlength: "2",
					pattern: "[0-9]*", inputmode: "numeric",
					required, readonly, disabled,
					value: this.year(),
					class: classStr, style: {
						maxWidth: DateWidth.yy,
						textAlign: this.year() && this.year().length === 2 ? "center" : "left"
					},
					oninput: (e: InputEvent) => {
						handleDateChange(this.year, id, "yy", this.dom, e);
						this.updateInputs(attrs.value);
					}
				})
			])
		]);
	}

}
