import m, { ClassComponent, CVnode, Children } from "mithril";

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

	public view({ attrs: { heightPct, onSet } }: CVnode<ISignWidget>): Children {
		return [
			m("span.clip", { style: { "font-family": config.signFont } }, config.stampSetTxt),
			m(".flex",
				m(Button, {
					label: config.stampTxt,
					classes: `flex-auto ${config.stampBtnClass}`,
					context: config.stampBtnContext,
					onclick: applyStamp(heightPct, onSet)
				})
			)
		];
	}

}
