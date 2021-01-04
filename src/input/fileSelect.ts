import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { theme } from "../theme";

import { FileInput } from "./fileInput";
import { addFiles, removeFile } from "./fileMulti";
import { getFileTypeIcon } from "../utils";

export class FileSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { uiClass = {} } = field;
		const { wrapper = "" } = uiClass;
		return m("fieldset.pa0.bn", {
			class: `${wrapper} ${theme.wrapper}`
		},
			m(FileInput, {
				field,
				multiple: false,
				dragging: this.dragging,
				onSet: addFiles(value, true)
			},
				m(".flex.items-center.pa1.ba.b--black-20", {
					class: `${theme.fileInput} ${this.dragging() ? theme.fileHover : ""}`
				}, [
					m("i.pa1", {
						class: config.uploadIcn
					}),
					m("span.ma1.flex-auto", file ? file.name : config.addFileTxt),
					file ? m("i.pa1", {
						class: getFileTypeIcon(file),
						title: "Click to view file in new tab",
						onclick: file.path !== "not_set"
							? () => window.open(file.path, "_blank")
							: undefined
					}) : null,
					file ? m("i.pa1.pointer.dim", {
						title: `Remove ${file.name}`,
						class: config.cancelIcn,
						onclick: removeFile(value, file.guid)
					}) : null,
				])
			)
		);
	}
}
