import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { ISignWidget } from "../interface/widget";

import { config } from "../config";
import { classMap, signAspectRatio } from "../theme";
import { pxRatio } from "../utils";

export function applyStamp(canvas: HTMLCanvasElement, checked: boolean) {
	const ratio = pxRatio();
	canvas.width = canvas.clientWidth * ratio;
	canvas.height = canvas.clientHeight * ratio;
	const fontSize = 0.56 * canvas.height;
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.textBaseline = "middle";
	context.font = `200 ${fontSize}px sans-serif`;
	context.fillText(checked ? config.stampSetTxt : config.stampTxt, canvas.height * 0.05, fontSize);
}

export class SignStamp implements ClassComponent<ISignWidget> {

	private applied: stream<boolean> = stream<boolean>(false);
	private canvas?: HTMLCanvasElement;

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		this.canvas = dom.children[0] as HTMLCanvasElement;
		applyStamp(this.canvas, this.applied());
	}

	public onupdate({ attrs: { onSet } }: CVnode<ISignWidget>) {
		if (this.canvas) {
			applyStamp(this.canvas, this.applied());
			if (this.applied()) {
				onSet(this.canvas.toDataURL());
			}
		}
	}

	public view() {
		return [
			m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
				style: signAspectRatio
			},
				m("canvas.aspect-ratio--object.pointer", {
					class: classMap.icon(),
					onclick: () => this.applied(!this.applied())
				})
			)
		];
	}

}
