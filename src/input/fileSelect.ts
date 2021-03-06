import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { fileInputCls, inputWrapperCls, wrapperCls } from "../theme";

import { fileInvalid } from "../validation";

import { FileOpen } from "../display/fileOpen";
import { FileInput } from "./fileInput";
import { addFiles, removeFile } from "./fileMulti";

export class FileSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { disabled, uiClass = {} } = field;
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		},
			m(FileInput, {
				field,
				multiple: false,
				dragging: this.dragging,
				onSet: addFiles(value, true)
			},
				m("div", {
					class: inputWrapperCls(uiClass, fileInvalid(field, value()))
				},
					m(".flex.items-center.pa1", {
						class: fileInputCls(this.dragging())
					}, [
						m("i.pa1", {
							class: config.uploadIcn
						}),
						m("span.ma1.flex-auto", file ? file.name : config.addFileTxt),
						file ? m(FileOpen, file) : null,
						file ? m("i.pa1.pointer.dim", {
							title: `Remove ${file.name}`,
							class: config.cancelIcn,
							onclick: removeFile(value, file.guid)
						}) : null
					])
				)
			)
		);
	}
}
