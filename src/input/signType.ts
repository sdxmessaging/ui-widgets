declare const b: TBss;
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream, { Stream } from "mithril/stream";

import { TBss } from "../interface/style";
import { ISignWidget } from "../interface/widget";

import { Button } from "../button";
import { pxRatio } from "../utils";

export class SignType implements ClassComponent<ISignWidget> {

	private text: Stream<string> = stream("");

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		const input = dom.children[0] as HTMLInputElement;
		input.focus({ preventScroll: false });
	}

	public view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>) {
		const fontSize = 60 * pxRatio;
		const screenMin = 480 * pxRatio;
		return [
			m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30" + b.aspectRatio4x1,
				m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
					// Prevent enter key from bubbling
					onkeypress: ({ keyCode }: { keyCode: number }) => {
						if (keyCode === 13 && this.text()) {
							onSet(renderText(this.text()));
							return false;
						}
						return true;
					},
					oninput: ({ target: { value } }: { target: HTMLInputElement }) => this.text(value),
					value: this.text(),
					style: {
						"font-size": `calc(${fontSize}px + (${fontSize} / ${screenMin} * (100vw - ${screenMin}px)))`,
						"font-family": "Caveat",
					}
				})
			),
			m(".flex.flex-row.nl1.nr1.mb1", [
				m(Button, {
					label: "Apply",
					icon: "fa-check",
					classes: "ma1",
					onclick: () => {
						if (this.text()) {
							onSet(renderText(this.text()));
						}
					}
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

}

function renderText(text: string) {
	const canvas = document.createElement("canvas");
	const fontSize = 90 * pxRatio;
	canvas.width = 600 * pxRatio;
	canvas.height = 150 * pxRatio;
	const context = canvas.getContext("2d");
	if (context) {
		context.textBaseline = "middle";
		context.font = `${fontSize}px Caveat`;
		context.fillText(text, 6 * pxRatio, canvas.height * 0.52);
	}
	return canvas.toDataURL();
}
