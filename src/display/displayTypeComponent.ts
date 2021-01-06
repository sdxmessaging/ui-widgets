import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";

import { DisplayType, IDisplayWidget } from "../interface/widget";

import { config } from "../config";
import { thumbMaxSize } from "../theme";
import { imgSrc, getFileTypeIcon } from "../utils";

import { removeFile } from "../input/fileMulti";
import { Button } from "../button";
import { Thumbnail } from "./thumbnail";

export class DisplayTypeComponent implements ClassComponent<IDisplayWidget> {

	view({ attrs: { displayType = DisplayType.thumbnail, value } }: CVnode<IDisplayWidget>): Children {
		return displayType === DisplayType.thumbnail ? m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
			lodash.map(value(), (file) => m(Thumbnail, {
				src: imgSrc(file.path, file.dataUrl),
				data: file,
				style: thumbMaxSize(),
			},
				m(".absolute.top-0.right-0.child",
					m(Button, {
						title: `Remove ${file.name}`,
						icon: config.deleteIcn,
						onclick: removeFile(value, file.guid)
					})
				)
			)),
		) : m(".pa2.flex.flex-column",
			lodash.map(value(), (data) => m(".flex.items-center.pa1.ba.b--black-20", [
				m("i.pa1", {
					class: config.uploadIcn
				}),
				m("span.ma1.flex-auto", data ? data.name : config.addFileTxt),
				data ? m("i.pa1", {
					class: getFileTypeIcon(data),
					title: "Click to view file in new tab",
					onclick: data.path !== "not_set"
						? () => window.open(data.path, "_blank")
						: undefined
				}) : null,
				data ? m("i.pa1.pointer.dim", {
					title: `Remove ${data.name}`,
					class: config.cancelIcn,
					onclick: removeFile(value, data.guid)
				}) : null
			]))
		);
	}
}
