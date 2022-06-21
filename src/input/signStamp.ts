import m, { ClassComponent, CVnode, Children } from "mithril";

import { ISignWidget } from "../interface/widget";

import { getConfig } from "../config";
import { createStamp } from "../imageUtils";

import { Button } from "../button";

export function applyStamp(heightPct: number, stampTxt: string, callback: ISignWidget["onSet"]) {
	return () => callback(createStamp(stampTxt, heightPct), { text: stampTxt, heightPct });
}

export class SignStamp implements ClassComponent<ISignWidget> {

	public view({ attrs: { heightPct, stampTxt, stampSetTxt, config, onSet } }: CVnode<ISignWidget>): Children {
		return [
			m("span.clip", {
				style: {
					fontFamily: getConfig("signFont", config)
				}
			}, stampSetTxt),
			m(".flex",
				m(Button, {
					label: stampTxt,
					classes: `flex-auto ${getConfig("stampBtnClass", config)}`,
					context: getConfig("stampBtnContext", config),
					onclick: applyStamp(heightPct, stampSetTxt, onSet)
				})
			)
		];
	}

}
