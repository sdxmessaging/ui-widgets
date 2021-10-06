import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import { FieldType, IPropWidget, IOptionField } from "../interface/widget";
import { inputWrapperCls, wrapperCls, inputCls } from "../theme";
import { propInvalid } from "../validation";
import { numberToCurrencyStr, propToNumber, setCurrencyValue } from "./currencyInput";

export class CurrencyInputInternalLabel implements ClassComponent<IPropWidget> {

	public view({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {

		const {
			label, id, name = id, title = label, placeholder,
			max, maxlength, min, minlength, step, required,
			readonly, disabled, autofocus, autocomplete,
			pattern, inputmode, spellcheck,
			type = FieldType.text,
			instant, uiClass = {},
			options
		} = field as IOptionField;

		const currency = options && options.length ? options[0].value : "$";

		return m("fieldset.relative.flex.mb2", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				pointerEvents: 'none',
				border: 'none'
			}
		}, [
			m("label.db.top-0.left-0.z-9999.absolute", {
				title: label,
				style: {
					transform: 'translate(15px, -7px) scale(0.7)',
					opacity: 0.8,
					transformOrigin: 'top left',
					wordSpacing: '2px',
					fontSize: '1rem',
				}
			}, label),
			m(".flex.bn.h2", {
				style: {
					width: '100%',
					margin: '0px',
				},
				class: inputWrapperCls(uiClass, propInvalid(field, xform())),
			},
				m('.flex.flex-row', {
					style: {
						margin: '0 0.5rem',
						pointerEvents: 'auto',
					}
				},
					m("span.mr1.self-center", currency),
					m("input.w-100.bg-transparent.bn.outline-0", {
						id, type: FieldType.text, name, title, placeholder,
						max, maxlength, min, minlength, step, required,
						readonly, disabled, autofocus, autocomplete,
						pattern, inputmode, spellcheck,
						class: inputCls(uiClass),
						value: lodash.isUndefined(xform())
							? null
							: numberToCurrencyStr(propToNumber(xform())),
						// Update value on change or input ("instant" option)
						[instant ? "oninput" : "onchange"]: setCurrencyValue(value)
					})
				),
				m('fieldset.absolute.ba.b--light-gray',
					{
						style: {
							top: '-5px',
							right: '-2px',
							bottom: '0px',
							left: '-2px',
							padding: '0 8px',
						},
					},
					m('legend.db.pa0.w-auto', {
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
							display: 'inline-block'
						}
					}, label))
				)
			)
		]);
	}

}
