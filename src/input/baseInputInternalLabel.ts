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
		const { label, id, type = FieldType.text, name = id, title = label, disabled, instant, uiClass = {}, shrink } = field;
		const floatLabel = shrink || value() || this.selected;
		return m("fieldset.relative.flex", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				pointerEvents: 'none',
				height: '4rem',
			}
		}, [
			m("label.db.top-0.left-0.z-9999.absolute", {
				title: label,
				style: {
					transform: floatLabel ? 'translate(16px, 0px) scale(0.8)' : 'translate(14px, 15px) scale(1)',
					transition: `transform ${floatLabel ? '0.3s' : '0.4s'} ease-in-out, opacity 0.4s ease-in-out`,
					opacity: floatLabel ? 0.8 : 0.6,
					transformOrigin: 'top left',
					wordSpacing: '2px',
				}
			}, label),
			m(".flex", {
				style: {
					width: '100%',
				}
			},
				m("input.w-100.bg-transparent.bn.outline-0.static.h-100.z-999", {
					...field,
					name,
					title,
					onfocus: this.focusIn,
					onblur: this.focusOut,
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value),
					style: {
						pointerEvents: 'auto',
						margin: '0 1rem',
					},
				}),
				m('fieldset.absolute',
					{
						style: {
							top: '-6px',
							right: '-3px',
							bottom: '-1px',
							left: '-3px',
							padding: '0 8px',
						},
						class: inputWrapperCls(uiClass, propInvalid(field, xform())),
					},
					m('legend.db.pa0.w-auto', {
						style: {
							visibility: 'hidden',
							maxWidth: floatLabel ? '100%' : '0.01px',
							height: '11px',
							fontSize: '0.8em',
							transition: `max-width ${floatLabel ? '0.4s' : '0.3s'} ease-in-out`,
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
