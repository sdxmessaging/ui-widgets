import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

import { inputWrapperCls, textareaCls, wrapperCls } from "../theme";
import { getLabel, setValue } from "../utils";
import { propInvalid } from "../validation";

export class TextareaInput implements ClassComponent<IPropWidget> {


	private selected = false;

	private focusIn = () => {
		this.selected = true;
	};

	private focusOut = () => {
		this.selected = false;
	};

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			required, readonly, disabled, autofocus, autocomplete, spellcheck,
			instant, uiClass = {}, floatLabel, shrink
		} = field;
		const shrunk = shrink || value() || this.selected;

		return m("fieldset", {
			class: `${wrapperCls(uiClass, disabled)} ${floatLabel ? 'relative flex mt2' : ''} `
		}, [
			!floatLabel && getLabel(id, uiClass, label, required),
			floatLabel && m("label.db.top-0.left-0.absolute", {
				title: label,
				style: {
					transform: shrunk ? 'translate(15px, -7px) scale(0.7)' : 'translate(10px, 9px) scale(1)',
					transition: `transform ${shrunk ? '0.3s' : '0.4s'} ease-in-out, opacity 0.4s ease-in-out`,
					opacity: shrunk ? 0.8 : 0.6,
					transformOrigin: 'top left',
					// wordSpacing: '2px',
					fontSize: '1rem',
				}
			}, label),
			m(".flex", {
				class: `${inputWrapperCls(uiClass, propInvalid(field, value()))} ${floatLabel ? 'w-100 pa2' : ''}`,
				style: {
					margin: '0px'
				}
			}, m("textarea.w-100.bg-transparent.bn.outline-0.h-100", {
				id, name, title,
				placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
				class: `${textareaCls(uiClass)} ${floatLabel ? 'z-999' : ''}`,
				value: value(),
				style: { resize: "none" },
				onfocus: this.focusIn,
				onblur: this.focusOut,
				// Update value on change or input ("instant" option)
				[instant ? "oninput" : "onchange"]: setValue(value)
			}),
				floatLabel && m('fieldset.absolute.ba.b--light-gray.ma0',
					{
						style: {
							inset: '0',
							top: '-5px',
							padding: '0 8px',
						},
					},
					m('legend.db.pa0', {
						style: {
							visibility: 'hidden',
							maxWidth: '100%',
							height: '11px',
							fontSize: '0.7rem',
						}
					}, m('span', {
						style: {
							paddingLeft: '5px',
							paddingRight: '5px',
						}
					}, label))
				)
			)
		]);
	}

}
