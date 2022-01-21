import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { DisplayType, IDisplayWidget } from "../interface/widget";

import { config } from "../config";
import { imgSrc } from "../utils";

import { removeFile } from "../input/fileMulti";
import { Button } from "../button";
import { Thumbnail } from "./thumbnail";
import { FileOpen } from "./fileOpen";

export class DisplayTypeComponent implements ClassComponent<IDisplayWidget> {

	public view({ attrs: { displayType = DisplayType.thumbnail, value } }: CVnode<IDisplayWidget>) {
		return displayType === DisplayType.thumbnail ? m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb",
			lodash.map(value(), (file) => m(Thumbnail, {
				src: imgSrc(file.path, file.dataUrl),
				data: file
			},
				m(".absolute.top-0.right-0.child",
					m(Button, {
						title: `Remove ${file.name}`,
						icon: config.deleteIcn,
						onclick: removeFile(value, file.guid),
						tabindex: -1
					})
				)
			)),
		) : m(".pa2.flex.flex-column",
			lodash.map(value(), (file) => m(".flex.items-center.pa1.ba.b--black-20", [
				m("i.pa1", {
					class: config.uploadIcn
				}),
				m("span.ma1.flex-auto", {
					title: file.name
				}, file.name),
				m(FileOpen, file),
				m("i.pa1.pointer.dim", {
					title: `Remove ${file.name}`,
					class: config.cancelIcn,
					onclick: removeFile(value, file.guid)
				})
			]))
		);
	}
}
