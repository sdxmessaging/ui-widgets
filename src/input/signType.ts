import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { ISignWidget, TProp } from "../interface/widget";

import { signAspectRatio } from "../theme";
import { setValue } from "../utils";

import { Button } from "../button";

export function applyText(text: stream<string>, callback: ISignWidget["onSet"]) {
	return () => {
		if (text()) {
			const canvas = document.createElement("canvas");
			canvas.width = 600;
			canvas.height = 150;
			const fontSize = 0.56 * canvas.height;
			const context = canvas.getContext("2d");
			if (context) {
				context.textBaseline = "middle";
				context.font = `${fontSize}px Caveat`;
				context.fillText(text(), 8, canvas.height * 0.52);
			}
			callback(canvas.toDataURL());
		}
		return false;
	};
}

export class SignType implements ClassComponent<ISignWidget> {

	private text: stream<string> = stream("");

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		const input = dom.children[0] as HTMLInputElement;
		input.focus({ preventScroll: false });
		this.scaleText(input, dom as HTMLElement);
	}

	public onupdate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom.children[0] as HTMLInputElement, dom as HTMLElement);
	}

	public view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>) {
		return [
			m("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
				style: signAspectRatio,
				onsubmit: applyText(this.text, onSet)
			},
				m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
					oninput: setValue(this.text as stream<TProp>),
					value: this.text(),
					style: {
						"font-family": "Caveat"
					}
				})
			),
			m(".absolute.top-0.right-0.z-999", {
				style: { transform: "translateY(-100%)" }
			}, [
				m(Button, {
					icon: "fa-check",
					classes: "ma1",
					onclick: applyText(this.text, onSet)
				}),
				m(Button, {
					icon: "fa-eraser",
					classes: "ma1",
					onclick: () => this.text("")
				}),
				m(Button, {
					icon: "fa-times",
					classes: "ma1",
					onclick: onCancel
				})
			])
		];
	}

	// Post render update text input font based on container size
	private scaleText(input: HTMLInputElement, container: HTMLElement) {
		const height = container.offsetHeight;
		input.style.fontSize = `${0.56 * height}px`;
	}

}
