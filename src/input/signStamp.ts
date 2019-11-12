import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";

import { ISignWidget } from "../interface/widget";

import { config } from "../config";
import { signAspectRatio } from "../theme";
import { textToImage } from "../utils";

import { Button } from "../button";

export function applyStamp(callback: ISignWidget["onSet"]) {
	return () => {
		const width = config.signMaxSize;
		const height = 0.25 * width;
		callback(textToImage(config.stampSetTxt, width, height, "Caveat"));
	};
}

export class SignStamp implements ClassComponent<ISignWidget> {

	public oncreate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public onupdate({ dom }: CVnodeDOM<ISignWidget>) {
		this.scaleText(dom as HTMLElement);
	}

	public view({ attrs: { onSet } }: CVnode<ISignWidget>) {
		return m(".aspect-ratio", {
			style: signAspectRatio,
		}, m(Button, {
			label: config.stampTxt,
			classes: "aspect-ratio--object",
			onclick: applyStamp(onSet)
		}));
	}

	// Post render update text input font based on container size
	private scaleText(container: HTMLElement) {
		const height = container.clientHeight;
		container.style.fontSize = `${0.56 * height}px`;
	}

}
