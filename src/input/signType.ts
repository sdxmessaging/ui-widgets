import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { ISignWidget, TProp } from "../interface/widget";

import { Button } from "../button";
import { setValue, signAspectRatio } from "../utils";

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
			m(".pa2.bg-white.br2.absolute.right-0", [
				m(Button, {
					label: "Apply",
					icon: "fa-check",
					classes: "ma1",
					onclick: applyText(this.text, onSet)
				}),
				m(Button, {
					label: "Reset",
					icon: "fa-eraser",
					classes: "ma1",
					onclick: () => this.text("")
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

	// Post render update text input font based on container size
	private scaleText(input: HTMLInputElement, container: HTMLElement) {
		const height = container.offsetHeight;
		input.style.fontSize = `${0.56 * height}px`;
	}

}

export function applyText(text: stream<string>, callback: ISignWidget["onSet"]) {
	return () => {
		if (text()) {
			callback(renderText(text()));
		}
		return false;
	};
}

export function renderText(text: string) {
	const canvas = document.createElement("canvas");
	canvas.width = 600;
	canvas.height = 150;
	const fontSize = 0.56 * canvas.height;
	const context = canvas.getContext("2d");
	if (context) {
		context.textBaseline = "middle";
		context.font = `${fontSize}px Caveat`;
		context.fillText(text, 8, canvas.height * 0.52);
	}
	return canvas.toDataURL();
}
