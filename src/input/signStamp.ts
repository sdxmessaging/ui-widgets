import m, { ClassComponent, CVnode, CVnodeDOM, Children } from "mithril";
// import stream from "mithril/stream";

import { ISignWidget } from "../interface/widget";

import { config } from "../config";
import { signAspectRatio } from "../theme";
// import { pxRatio } from "../utils";

import { Button } from "../button";

export function applyStamp(canvas: HTMLCanvasElement) {
	// const ratio = pxRatio();
	// canvas.width = canvas.clientWidth * ratio;
	// canvas.height = canvas.clientHeight * ratio;
	const fontSize = 0.56 * canvas.height;
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.textBaseline = "middle";
	context.font = `${fontSize}px Caveat`;
	context.fillText(config.stampSetTxt, canvas.height * 0.05, fontSize);
}

export class SignStamp implements ClassComponent<ISignWidget> {

	// private applied: stream<boolean> = stream<boolean>(false);
	// private canvas?: HTMLCanvasElement;

	// public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
	// 	this.canvas = dom.children[0] as HTMLCanvasElement;
	// 	applyStamp(this.canvas, this.applied());
	// }

	// public onupdate({ attrs: { onSet } }: CVnode<ISignWidget>) {
	// 	// if (this.canvas) {
	// 	// 	applyStamp(this.canvas, this.applied());
	// 	// 	if (this.applied()) {
	// 	// 		onSet(this.canvas.toDataURL());
	// 	// 	}
	// 	// }
	// }

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public onupdate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public view({ attrs: { onSet } }: CVnode<ISignWidget>): Children {
		return m(".aspect-ratio", {
			style: signAspectRatio,
		}, m(Button, {
			label: config.stampTxt,
			classes: "aspect-ratio--object",
			onclick: () => {
				const canvas = window.document.createElement("canvas");
				canvas.width = 640;
				canvas.height = 160;
				applyStamp(canvas);
				onSet(canvas.toDataURL());
			}
		}));
		// return [
		// 	m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
		// 		style: signAspectRatio
		// 	},
		// 		m("canvas.aspect-ratio--object.pointer", {
		// 			class: classMap.icon(),
		// 			onclick: () => this.applied(!this.applied())
		// 		})
		// 	)
		// ];
	}

	// Post render update text input font based on container size
	private scaleText(container: HTMLElement) {
		const height = container.clientHeight;
		container.style.fontSize = `${0.56 * height}px`;
	}

}
