import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { ISignWidget } from "../interface/widget";

import { getIcon, signAspectRatio } from "../theme";

import { Button } from "../button";

export function applyStamp(callback: ISignWidget["onSet"]) {
	return () => {
		const canvas = document.createElement("canvas");
		canvas.width = 600;
		canvas.height = 150;
		const fontSize = 0.56 * canvas.height;
		const context = canvas.getContext("2d") as CanvasRenderingContext2D;
		context.textBaseline = "middle";
		context.font = `200 ${fontSize}px sans-serif`;
		context.fillText("Accepted", 8, canvas.height * 0.52);
		callback(canvas.toDataURL());
	};
}

export class SignStamp implements ClassComponent<ISignWidget> {

	private checked: stream<boolean> = stream<boolean>(false);

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public onupdate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>) {
		return [
			m("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
				style: signAspectRatio,
				onsubmit: applyStamp(onSet)
			},
				m(".flex.items-center.aspect-ratio--object.pa2.pointer", {
					onclick: () => this.checked(!this.checked())
				}, [
					m("i.mr2", {
						class: getIcon(this.checked() ? "fa-fw fa-check" : "fa-fw fa-times")
					}),
					m("span", "I Accept")
				])
			),
			m(".absolute.top-0.right-0.z-999", {
				style: { transform: "translateY(-100%)" }
			}, [
				m(Button, {
					title: "Apply",
					icon: "fa-check",
					classes: "ma1",
					disabled: !this.checked(),
					onclick: applyStamp(onSet)
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

	// Post render update text input font based on container size
	private scaleText(container: HTMLElement) {
		const height = container.offsetHeight;
		container.style.fontSize = `${0.56 * height}px`;
	}

}
