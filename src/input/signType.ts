import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { ISignWidget } from "../interface/widget";

import { getConfig } from "../config";
import { setValue } from "../utils";
import { createStamp } from "../imageUtils";

import { Button } from "../button";

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

	public view({ attrs: { heightPct, style, config, onSet, onCancel } }: CVnode<ISignWidget>) {
		const setText = lodash.flow([
			// Create stamp base64 string
			lodash.partial(createStamp, this.text(), heightPct, config),
			// Submit stamp and metadata to onSet
			lodash.partialRight(onSet, { text: this.text(), heightPct }),
			// Prevent form submit page navigating page
			lodash.stubFalse
		]);
		return [
			m("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
				style,
				onsubmit: setText
			},
				m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
					oninput: setValue(this.text),
					style: {
						fontFamily: getConfig("signFont", config)
					},
					value: this.text()
				})
			),
			m(".absolute.top-0.right-0.z-999.translate-up-100", [
				m(Button, {
					title: getConfig("applyTtl", config),
					icon: getConfig("applyIcn", config),
					classes: "ma1",
					onclick: setText
				}),
				m(Button, {
					title: getConfig("resetTtl", config),
					icon: getConfig("resetIcn", config),
					classes: "ma1",
					onclick: () => this.text("")
				}),
				m(Button, {
					title: getConfig("cancelTtl", config),
					icon: getConfig("cancelIcn", config),
					classes: "ma1",
					onclick: onCancel
				})
			])
		];
	}

	// Post render update text input font based on container size
	private scaleText(container: HTMLElement) {
		const height = container.clientHeight;
		container.style.fontSize = `${0.56 * height}px`;
	}

}
