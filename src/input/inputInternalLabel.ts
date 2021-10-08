import m, { Children, ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { FieldType, IPropWidget } from "../interface/widget";
import { inputWrapperCls, labelCls, wrapperCls } from "../theme";
import { propInvalid } from "../validation";

export class InputInternalLabel implements ClassComponent<IPropWidget> {
	protected selected = false;
	private wrapperHeight!: number;
	protected focusIn = () => {
		this.selected = true;
	};

	protected focusOut = () => {
		this.selected = false;
	};

	protected viewInput(vnode: CVnode<IPropWidget>): Children {
		return m('span', vnode.attrs.value());
	}

	public oncreate({ dom }: CVnodeDOM<IPropWidget>) {
		this.wrapperHeight = dom.clientHeight;
		m.redraw();
	}
	public onupdate({ dom }: CVnodeDOM<IPropWidget>) {
		if (dom.clientHeight !== this.wrapperHeight) {
			this.wrapperHeight = dom.clientHeight;
			m.redraw();
		}

	}

	public view(vnode: CVnode<IPropWidget>) {
		const { attrs: { field, value, xform = value } } = vnode;
		const {
			label, type = FieldType.text, disabled, uiClass = {}, animate = false, id, required
		} = field;
		const shrink = !animate || value() || this.selected;
		const defaultPosition = `translate(10px, ${type === FieldType.textarea ? "10px" : `calc(${this.wrapperHeight / 2}px - 0.5em)`}) scale(1)`;

		return m("fieldset.relative.flex", {
			class: type === FieldType.hidden ? "clip" : wrapperCls(uiClass, disabled),
			style: {
				marginTop: "calc(0.4em + 0.5rem)",
				marginBottom: "calc(0.4em + 0.5rem)",
			}
		}, [
			m("label.db.top-0.left-0.absolute.z-1", {
				title: label,
				class: labelCls(uiClass, required),
				style: {
					transform: shrink ? 'translate(10px, -0.4em) scale(0.7)' : defaultPosition,
					transition: `transform ${shrink ? '0.3s' : '0.4s'} ease-in-out, opacity 0.4s ease-in-out`,
					display: this.wrapperHeight ? "inherit" : "none",
					opacity: shrink ? 0.8 : 0.6,
					transformOrigin: 'top left',
					// Essential for the legend to fit the correct amount of space
					wordSpacing: '2px',
				},
				for: id
			}, label),
			m(".flex.w-100", {
				style: {
					margin: '0px',
					padding: "0.4em 10px"
				},
			},
				m('.flex.flex-row.w-100.z-1', { onfocusin: this.focusIn, onfocusout: this.focusOut }, this.viewInput(vnode)),
				m('fieldset.absolute.ba.b--light-gray.ph1',
					{
						style: {
							top: '-5px',
							right: '-2px',
							bottom: '0px',
							left: '-2px',
							border: 'solid 1px',
							pointerEvents: 'none'
						},
						class: inputWrapperCls(uiClass, propInvalid(field, xform())),

					},
					m('legend.db.pa0.w-auto', {
						style: {
							visibility: 'hidden',
							maxWidth: shrink ? '100%' : '0.01px',
							transition: "max-width 0.3s",
							height: '11px',
							fontSize: '0.7em',
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
