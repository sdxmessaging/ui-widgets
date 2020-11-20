import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, getIcon } from "../theme";

import { FileInput } from "./fileInput";
import { addFiles, removeFile } from "./fileMulti";
import { checkConfigForIcon } from "../utils";

export class FileSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		return m(FileInput, {
			field,
			multiple: false,
			dragging: this.dragging,
			onSet: addFiles(value, true)
		},
			m(".flex.items-center.pa1.ba.b--black-20", {
				class: this.dragging() ? drgCls() : filCls(),
			}, [
				m("i.pa1", {
					class: getIcon(config.uploadIcn)
				}),
				m("span.ma1.flex-auto", file ? file.name : config.addFileTxt),
				file ? m("i.pa1", {
					class: getIcon(checkConfigForIcon(file)),
					title: "Click to view file in new tab",
					onclick: file.path !== "not_set"
						? () => window.open(file.path, "_blank")
						: undefined
				}) : null,
				file ? m("i.pa1.pointer.dim", {
					title: `Remove ${file.name}`,
					class: getIcon(config.cancelIcn),
					onclick: removeFile(value, file.guid)
				}) : null,
			])
		);
	}
}
