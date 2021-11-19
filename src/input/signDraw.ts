import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import SignaturePad from "signature_pad";

import { ISignWidget } from "../interface/widget";

import { config } from "../config";
import { pxRatio } from "../utils";

import { Button } from "../button";

export class SignDraw implements ClassComponent<ISignWidget> {

	private signaturePad!: SignaturePad;

	private resizeHandler!: lodash.DebouncedFunc<() => void>;

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
		this.resizeHandler.cancel();
		window.removeEventListener("resize", this.resizeHandler);
		window.removeEventListener("orientationchange", this.resizeHandler);
	}

	public view({ attrs: { style, onSet, onCancel } }: CVnode<ISignWidget>) {
		return [
			m(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30", { style },
				m("canvas.aspect-ratio--object")
			),
			m(".absolute.top-0.right-0.z-999.translate-up-100", [
				m(Button, {
					title: config.applyTtl,
					icon: config.applyIcn,
					classes: "ma1",
					onclick: () => {
						if (!this.signaturePad.isEmpty()) {
							onSet(this.signaturePad.toDataURL("image/png"));
						}
					}
				}),
				m(Button, {
					title: config.resetTtl,
					icon: config.resetIcn,
					classes: "ma1",
					onclick: () => this.resetCanvas()
				}),
				m(Button, {
					title: config.cancelTtl,
					icon: config.cancelIcn,
					classes: "ma1",
					onclick: onCancel
				})
			]),
		];
	}

	private resetCanvas() {
		this.signaturePad.clear();
	}

}
