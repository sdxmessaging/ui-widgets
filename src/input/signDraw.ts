import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import SignaturePad from "signature_pad";

import { ISignWidget } from "../interface/widget";

import { signAspectRatio } from "../theme";
import { pxRatio } from "../utils";

import { Button } from "../button";

export class SignDraw implements ClassComponent<ISignWidget> {

	private signaturePad: SignaturePad | null = null;

	private resizeHandler?: (() => void) & lodash.Cancelable;

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		const canvas = dom.children[0] as HTMLCanvasElement;
		const initialRatio = pxRatio();
		this.signaturePad = new SignaturePad(canvas, {
			minWidth: 0.5 * initialRatio,
			maxWidth: 1.5 * initialRatio
		});
		// Create resize handler
		const resizeCanvas = () => {
			const resizeRatio = pxRatio();
			canvas.width = canvas.offsetWidth * resizeRatio;
			canvas.height = canvas.offsetHeight * resizeRatio;
			const context = canvas.getContext("2d") as CanvasRenderingContext2D;
			context.scale(resizeRatio, resizeRatio);
			this.resetCanvas();
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
			m(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30", {
				style: signAspectRatio
			},
				m("canvas.aspect-ratio--object")
			),
			m(".absolute.top-0.right-0.z-999", {
				style: { transform: "translateY(-100%)" }
			}, [
				m(Button, {
					title: "Apply",
					icon: "fa-check",
					classes: "ma1",
					onclick: () => {
						if (this.signaturePad && !this.signaturePad.isEmpty()) {
							onSet(this.signaturePad.toDataURL("image/png"));
						}
					}
				}),
				m(Button, {
					title: "Reset",
					icon: "fa-eraser",
					classes: "ma1",
					onclick: () => this.resetCanvas()
				}),
				m(Button, {
					title: "Cancel",
					icon: "fa-times",
					classes: "ma1",
					onclick: onCancel
				})
			]),
		];
	}

	private resetCanvas() {
		if (this.signaturePad) {
			this.signaturePad.clear();
		}
	}

}
