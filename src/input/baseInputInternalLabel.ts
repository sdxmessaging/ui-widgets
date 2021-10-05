import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { FieldType, IPropWidget, TPropStream } from "../interface/widget";

import { inputWrapperCls, wrapperCls } from "../theme";
import { setValue } from "../utils";
import { propInvalid } from "../validation";

export class BaseInputInternalLabel implements ClassComponent<IPropWidget> {
	private selected = stream(false);
	private value!: TPropStream;
	private inputEl!: HTMLInputElement;
	private floatLabel = false;

	private focusIn = () => {
		this.selected(true);
	};

	private focusOut = () => {
		if (!this.value()) {
			this.selected(false);
		}
	};

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		this.value = value;
		this.selected.map(m.redraw);
	}

	public onupdate({ attrs: { field: { shrink } } }: CVnode<IPropWidget>) {
		this.floatLabel = shrink || this.selected();
		m.redraw();
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
		return m(".relative.flex", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				pointerEvents: 'none',
				height: '4rem'
			}
		}, [
			m("label.db.top-0.left-0.z-9999.absolute", {
				title: label,
				style: {
					transform: this.floatLabel ? 'translate(16px, -4px) scale(0.8)' : 'translate(14px, 15px) scale(1)',
					transition: `transform ${this.floatLabel ? '0.3s' : '0.4s'} ease-in-out, opacity 0.4s ease-in-out`,
					opacity: this.floatLabel ? 0.8 : 0.6,
					transformOrigin: 'top left',
					wordSpacing: '2px',
				}
			}, label),
			m(".flex", {
				style: {
					width: '100%',
					marginLeft: '2px',
					marginRight: '2px',
				}
			},
				m("input.w-100.bg-transparent.bn.outline-0.static.h-100.z-999", {
					...field,
					name,
					title,
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value),
					style: {
						// padding: '20px 14px 6px 14px',
						pointerEvents: 'auto',
						margin: '0 1rem',
					},
				}),
				m('fieldset.absolute',
					{
						style: {
							inset: '-11px 0 0',
							padding: '0 8px',
							top: '0',
							left: '0',
							marginInlineStart: '2px',
						},
						class: inputWrapperCls(uiClass, propInvalid(field, xform())),
					},
					m('legend.db.pa0.w-auto', {
						style: {
							visibility: 'hidden',
							maxWidth: this.floatLabel ? '100%' : '0.01px',
							height: '11px',
							fontSize: '0.8em',
							transition: `max-width ${this.floatLabel ? '0.4s' : '0.3s'} ease-in-out`,
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
