import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { DisplayType, IDisplayWidget } from "../interface/widget";

import { getConfig, getIcon } from "../config";
import { imgSrc } from "../utils";

import { removeFile } from "../input/fileMulti";
import { Button } from "../button";
import { Thumbnail } from "./thumbnail";
import { FileOpen } from "./fileOpen";

export class DisplayTypeComponent implements ClassComponent<IDisplayWidget> {

	public view({ attrs: {
		displayType = DisplayType.thumbnail, value, readonlyOrDisabled, config
	} }: CVnode<IDisplayWidget>) {
		return displayType === DisplayType.thumbnail ? m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb",
			lodash.map(value(), (file) => m(Thumbnail, {
				src: imgSrc(file.path, file.dataUrl),
				data: file
			},
				!readonlyOrDisabled && m(".absolute.top-0.right-0.child",
					m(Button, {
						title: `Remove ${file.name}`,
						icon: getConfig("deleteIcn", config),
						onclick: removeFile(value, file.guid),
						tabindex: -1
					})
				)
			)),
		) : m(".pa2.flex.flex-column",
			lodash.map(value(), (file) => m(".flex.items-center.pa1.ba.b--black-20", [
				getIcon(getConfig("uploadIcn", config), "pa1"),
				m("span.ma1.flex-auto", {
					title: file.name
				}, file.name),
				m(FileOpen, file),
				!readonlyOrDisabled && m("i.pa1.pointer.dim", {
					title: `Remove ${file.name}`,
					class: getConfig("cancelIcn", config),
					onclick: removeFile(value, file.guid)
				})
			]))
		);
	}
}
