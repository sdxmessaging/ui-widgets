import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { ISignWidget } from "../interface/widget";

import { classMap, signAspectRatio } from "../theme";
import { pxRatio } from "../utils";

import { Button } from "../button";

export function applyStamp(canvas: HTMLCanvasElement, checked: boolean) {
	const styles = window.getComputedStyle(canvas);
	const ratio = pxRatio();
	canvas.width = canvas.clientWidth * ratio;
	canvas.height = canvas.clientHeight * ratio;
	const fontSize = 0.56 * canvas.height;
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.textBaseline = "middle";
	context.font = `${styles["fontWeight"]} ${fontSize}px ${styles["fontFamily"]}`;
	// checked ? fa-check-square : fa-square
	context.fillText(checked ? "\uf14a" : "\uf0c8", canvas.height * 0.25, canvas.height * 0.52);
	context.font = `200 ${fontSize}px sans-serif`;
	context.fillText(checked ? "Accepted" : "Accept", canvas.height, fontSize);
}

export class SignStamp implements ClassComponent<ISignWidget> {

	private checked: stream<boolean> = stream<boolean>(false);
	private canvas?: HTMLCanvasElement;

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		this.canvas = dom.children[0] as HTMLCanvasElement;
		applyStamp(this.canvas, this.checked());
	}

	public onupdate() {
		if (this.canvas) {
			applyStamp(this.canvas, this.checked());
		}
	}

	public view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>) {
		return [
			m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
				style: signAspectRatio
			},
				m("canvas.aspect-ratio--object.pointer", {
					class: classMap.icon(),
					onclick: () => this.checked(!this.checked())
				})
			),
			m(".absolute.top-0.right-0.z-999", {
				style: { transform: "translateY(-100%)" }
			}, [
				m(Button, {
					title: "Apply",
					icon: "fa-check",
					classes: "ma1",
					disabled: !this.checked(),
					onclick: () => {
						if (this.canvas) {
							onSet(this.canvas.toDataURL())
						}
					}
				}),
				// m(Button, {
				// 	title: "Reset",
				// 	icon: "fa-eraser",
				// 	classes: "ma1",
				// 	onclick: () => this.checked(false)
				// }),
				m(Button, {
					title: "Cancel",
					icon: "fa-times",
					classes: "ma1",
					onclick: onCancel
				})
			])
		];
	}

}
