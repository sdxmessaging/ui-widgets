import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TPropStream } from "../interface/widget";

import { inputCls, inputWrapperCls, wrapperCls } from "../theme";
import { setValue } from "../utils";
import { propInvalid } from "../validation";

export class BaseInputInternalLabel implements ClassComponent<IPropWidget> {
	private selected = stream(false);
	private value!: TPropStream;
	private inputEl!: HTMLInputElement;

	private focusIn = () => {
		this.selected(true);
	};

	private focusOut = () => {
		if (!this.value()) {
			this.selected(false);
		}
	};

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		this.selected.map(m.redraw);
		this.value = value;
	}

	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		this.inputEl = dom.querySelector('input') as HTMLInputElement;
		this.inputEl.addEventListener('focusin', this.focusIn);
		this.inputEl.addEventListener('focusout', this.focusOut);
	}

	public onremove() {
		this.inputEl.removeEventListener('focusin', this.focusIn);
		this.inputEl.removeEventListener('focusout', this.focusOut);
	}

	public view({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {
		const { label, id, type = FieldType.text, name = id, title = label, disabled, instant, uiClass = {} } = field;
		return m(".relative", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				pointerEvents: 'none'
			}
		}, [
			m("label.absolute.db.top-0.left-0.z-9999", {
				title: label,
				style: {
					transform: this.selected() ? 'translate(18px, -17px) scale(0.8)' : 'translate(14px, 16px) scale(1)',
					transition: `transform ${this.selected() ? '0.3s' : '0.4s'} ease-in-out, opacity 0.4s ease-in-out`,
					opacity: this.selected() ? 1 : 0.6,
					transformOrigin: 'top left',
					wordSpacing: '2px',
				}
			}, label),
			m("div",
				m("input.w-100.bg-transparent.bn.outline-0.static.h-100", {
					...field,
					name,
					title,
					class: inputCls(uiClass),
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value),
					style: {
						padding: '16.5px 14px',
						pointerEvents: 'auto'
					},

				}),
				m('fieldset.absolute',
					{
						class: inputWrapperCls(uiClass, propInvalid(field, xform())),
						style: {
							top: '-5px',
							inset: '-11px 0 0',
							padding: '0 8px'
						}
					},
					m('legend.db.pa0.w-auto', {
						style: {
							visibility: 'hidden',
							maxWidth: this.selected() ? '100%' : '0.01px',
							height: '11px',
							fontSize: '0.8em',
							transition: `max-width ${this.selected() ? '0.4s' : '0.3s'} ease-in-out`
						}
					}, m('span', {
						style: {
							paddingLeft: '5px',
							paddingRight: '5px',
							display: 'inline-block'
						}
					}, label))
				)
			)
		]);
	}

}
