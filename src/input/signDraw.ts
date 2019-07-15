import lodash from "lodash";
declare const b: TBss;
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import SignaturePad from "signature_pad";

import { TBss } from "../interface/style";
import { ISignWidget } from "../interface/widget";

import { Button } from "../button";
import { pxRatio } from "../utils";

export class SignDraw implements ClassComponent<ISignWidget> {

	private signaturePad: SignaturePad | null = null;

	private resizeHandler?: (() => void) & lodash.Cancelable;

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		const canvas = dom.children[0] as HTMLCanvasElement;
		this.signaturePad = new SignaturePad(canvas, {
			minWidth: 0.5 * pxRatio,
			maxWidth: 1.5 * pxRatio
		});
		// Create resize handler
		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth * pxRatio;
			canvas.height = canvas.offsetHeight * pxRatio;
			const ctx = canvas.getContext("2d");
			if (ctx && this.signaturePad) {
				ctx.scale(pxRatio, pxRatio);
				this.signaturePad.clear();
			}
		};
		this.resizeHandler = lodash.debounce(resizeCanvas, 250);
		window.addEventListener("resize", this.resizeHandler);
		window.addEventListener("orientationchange", this.resizeHandler);
		resizeCanvas();
	}

	public onremove() {
		if (this.resizeHandler) {
			this.resizeHandler.cancel();
			window.removeEventListener("resize", this.resizeHandler);
			window.removeEventListener("orientationchange", this.resizeHandler);
		}
	}

	public view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>) {
		return [
			m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30" + b.aspectRatio4x1,
				m("canvas.aspect-ratio--object")
			),
			m(".flex.flex-row.nl1.nr1.mb1", [
				m(Button, {
					label: "Apply",
					icon: "fa-check",
					classes: "ma1",
					onclick: () => {
						if (this.signaturePad && !this.signaturePad.isEmpty()) {
							onSet(this.signaturePad.toDataURL("image/png"));
						}
					}
				}),
				m(Button, {
					label: "Reset",
					icon: "fa-eraser",
					classes: "ma1",
					onclick: () => this.resetCanvas()
				}),
				m(Button, {
					label: "Cancel",
					icon: "fa-times",
					classes: "ma1",
					onclick: onCancel
				})
			])
		];
	}

	private resetCanvas() {
		if (this.signaturePad) {
			this.signaturePad.clear();
		}
	}

}
