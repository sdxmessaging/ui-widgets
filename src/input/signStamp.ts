import m, { ClassComponent, CVnode, Children } from "mithril";

import { ISignWidget } from "../interface/widget";

import { config } from "../config";
import { createStamp } from "../imageUtils";

import { Button } from "../button";

export function applyStamp(heightPct: number, stampTxt: string, callback: ISignWidget["onSet"]) {
	return () => callback(createStamp(stampTxt, heightPct), { text: stampTxt, heightPct });
}

export class SignStamp implements ClassComponent<ISignWidget> {

	public view({ attrs: { heightPct, stampTxt, stampSetTxt, onSet } }: CVnode<ISignWidget>): Children {
		return [
			m("span.clip", { style: { "font-family": config.signFont } }, stampSetTxt),
			m(".flex",
				m(Button, {
					label: stampTxt,
					classes: `flex-auto ${config.stampBtnClass}`,
					context: config.stampBtnContext,
					onclick: applyStamp(heightPct, stampSetTxt, onSet)
				})
			)
		];
	}

}
