import m, { ClassComponent, CVnode } from "mithril";
import { FieldType, IPropWidget } from "../interface/widget";
import { inputWrapperCls, wrapperCls } from "../theme";
import { propInvalid } from "../validation";

export class InputInternalLabel implements ClassComponent<IPropWidget> {
	protected selected = false;

	protected focusIn = () => {
		this.selected = true;
	};

	protected focusOut = () => {
		this.selected = false;
	};

	protected viewInput(vnode: CVnode<IPropWidget>) {
		return m('span', vnode.attrs.value());
	}

	public view(vnode: CVnode<IPropWidget>) {
		const { attrs: { field, value, xform = value } } = vnode;
		const {
			label, type = FieldType.text, disabled, uiClass = {}, shrink
		} = field;
		const floatLabel = shrink || value() || this.selected;
		return m("fieldset.relative.flex.mt2", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
		}, [
			m("label.db.top-0.left-0.absolute", {
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
			m(".flex.w-100.pa2", {
				style: {
					margin: '0px',
				},
				class: inputWrapperCls(uiClass, propInvalid(field, xform())),
			},
				m('.flex.flex-row.w-100', {
					style: {
						pointerEvents: 'auto',
					}
				}, this.viewInput(vnode)),
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
