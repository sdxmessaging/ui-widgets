import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";

import { ISignWidget } from "../interface/widget";

import { config } from "../config";
import { textToImage } from "../utils";

import { Button } from "../button";

export function createStamp(sign: string, heightPct: number): string {
	const width = config.signMaxSize;
	const height = 0.01 * heightPct * width;
	return textToImage(sign, width, height, config.signFont);
}

export function applyStamp(heightPct: number, callback: ISignWidget["onSet"]) {
	return () => callback(createStamp(config.stampSetTxt, heightPct));
}

export class SignStamp implements ClassComponent<ISignWidget> {

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public onupdate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public view({ attrs: { heightPct, style, onSet } }: CVnode<ISignWidget>) {
		return m(".aspect-ratio", { style },
			m(".aspect-ratio--object", m(Button, {
				label: config.stampTxt,
				classes: "relative w-100 h-100",
				onclick: applyStamp(heightPct, onSet)
			}))
		);
	}

	// Post render update text input font based on container size
	private scaleText(container: HTMLElement) {
		const height = container.clientHeight;
		container.style.fontSize = `${0.56 * height}px`;
	}

}
