import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { ISignWidget } from "../interface/widget";

import { config } from "../config";
import { setValue } from "../utils";

import { Button } from "../button";

import { createStamp } from "./signStamp";

export function applyText(text: stream<string>, heightPct: number, callback: ISignWidget["onSet"]) {
	return () => {
		if (text()) {
			callback(createStamp(text(), heightPct));
		}
		return false;
	};
}

export class SignType implements ClassComponent<ISignWidget> {

	private text: stream<string> = stream("");

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		const input = dom.children[0] as HTMLInputElement;
		input.focus({ preventScroll: false });
		this.scaleText(dom as HTMLElement);
	}

	public onupdate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public view({ attrs: { heightPct, style, onSet, onCancel } }: CVnode<ISignWidget>) {
		return [
			m("fieldset.bn.pa0", {
			}, 
				m("div", {
				
				}, 
					m("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
						style,
						onsubmit: applyText(this.text, heightPct, onSet)
					},
						m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
							oninput: setValue(this.text),
							value: this.text(),
							style: {
								"font-family": config.signFont
							}
						})
					),
					m(".absolute.top-0.right-0.z-999", {
						style: { transform: "translateY(-100%)" }
					}, [
						m(Button, {
							title: config.applyTtl,
							icon: config.applyIcn,
							classes: "ma1",
							onclick: applyText(this.text, heightPct, onSet)
						}),
						m(Button, {
							title: config.resetTtl,
							icon: config.resetIcn,
							classes: "ma1",
							onclick: () => this.text("")
						}),
						m(Button, {
							title: config.cancelTtl,
							icon: config.cancelIcn,
							classes: "ma1",
							onclick: onCancel
						})
					])
				)
			)
		];
	}

	// Post render update text input font based on container size
	private scaleText(container: HTMLElement) {
		const height = container.clientHeight;
		container.style.fontSize = `${0.56 * height}px`;
	}

}
