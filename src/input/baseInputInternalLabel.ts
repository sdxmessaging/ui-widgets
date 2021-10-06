import m, { ClassComponent, CVnode } from "mithril";
import { FieldType, IPropWidget } from "../interface/widget";
import { inputWrapperCls, wrapperCls } from "../theme";
import { setValue } from "../utils";
import { propInvalid } from "../validation";
// import { propInvalid } from "../validation";

export class BaseInputInternalLabel implements ClassComponent<IPropWidget> {
	private selected = false;

	private focusIn = () => {
		this.selected = true;
	};

	private focusOut = () => {
		this.selected = false;
	};

	public view({ attrs: { field, value, xform = value } }: CVnode<IPropWidget>) {
		const {
			label, id, type = FieldType.text, name = id,
			title = label, disabled, instant, uiClass = {}, shrink
		} = field;
		const floatLabel = shrink || value() || this.selected;
		return m("fieldset.relative.flex.mv2", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				pointerEvents: 'none',
				border: 'none'
			}
		}, [
			m("label.db.top-0.left-0.z-9999.absolute", {
				title: label,
				style: {
					transform: floatLabel ? 'translate(15px, -7px) scale(0.7)' : 'translate(10px, 9px) scale(1)',
					transition: `transform ${floatLabel ? '0.3s' : '0.4s'} ease-in-out, opacity 0.4s ease-in-out`,
					opacity: floatLabel ? 0.8 : 0.6,
					transformOrigin: 'top left',
					// Essential for the legend to fit the correct amount of space
					wordSpacing: '2px',
					fontSize: '1rem',
				}
			}, label),
			m(".flex.w-100.h2", {
				style: {
					margin: '0px',
				},
				class: inputWrapperCls(uiClass, propInvalid(field, xform())),
			},

				m("input.w-100.bg-transparent.bn.outline-0.h-100", {
					...field,
					name,
					title,
					onfocus: this.focusIn,
					onblur: this.focusOut,
					style: { pointerEvents: 'auto' },
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value),
				}),

				m('fieldset.absolute.ba.b--light-gray.ma0',
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
							maxWidth: floatLabel ? '100%' : '0.01px',
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
