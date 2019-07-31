import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream, { Stream } from "mithril/stream";

import { ISignWidget, TProp } from "../interface/widget";

import { Button } from "../button";
import { pxRatio, setValue, signAspectRatio } from "../utils";

export class SignType implements ClassComponent<ISignWidget> {

	private text: Stream<string> = stream("");
	private fontSize: Stream<string> = stream("12px");

	private resizeHandler?: (() => void) & lodash.Cancelable;

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		const input = dom.children[0] as HTMLInputElement;
		input.focus({ preventScroll: false });
		// Create resize handler
		const resizeText = () => {
			const height: number = (dom as HTMLElement).offsetHeight;
			this.fontSize(`${0.28 * height * pxRatio}px`);
			m.redraw();
		};
		this.resizeHandler = lodash.debounce(resizeText, 125);
		window.addEventListener("resize", this.resizeHandler);
		window.addEventListener("orientationchange", this.resizeHandler);
		resizeText();
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
			m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
				style: signAspectRatio
			},
				m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
					onkeypress: ({ keyCode }: { keyCode: number }) => {
						// Prevent enter key from bubbling
						if (keyCode === 13 && this.text()) {
							onSet(renderText(this.text()));
							return false;
						}
						return true;
					},
					oninput: setValue(this.text as Stream<TProp>),
					value: this.text(),
					style: {
						"font-size": this.fontSize(),
						"font-family": "Caveat",
					}
				})
			),
			m(".pa2.bg-white.br2.absolute.right-0", [
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
			]),
		];
	}

}

export function renderText(text: string) {
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
