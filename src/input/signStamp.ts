import m, { ClassComponent, CVnode, Children } from "mithril";
import lodash from "lodash";

import { ISignWidget } from "../interface/widget";

import { getConfig } from "../config";
import { createStamp } from "../imageUtils";

import { Button } from "../button";

export class SignStamp implements ClassComponent<ISignWidget> {

	public view({ attrs: { heightPct, stampTxt, stampSetTxt, config, onSet } }: CVnode<ISignWidget>): Children {
		return [
			m("span.clip", {
				style: {
					fontFamily: getConfig("signFont", config)
				}
			}, stampSetTxt),
			m(".flex", m(Button, {
				label: stampTxt,
				classes: `flex-auto ${getConfig("stampBtnClass", config)}`,
				context: getConfig("stampBtnContext", config),
				// onclick: applyStamp(heightPct, stampSetTxt, onSet)
				onclick: lodash.flow([
					// Create stamp base64 string
					lodash.partial(createStamp, stampSetTxt, heightPct, config),
					// Submit stamp and metadata to onSet
					lodash.partialRight(onSet, { text: stampSetTxt, heightPct })
				])
			}))
		];
	}

}
