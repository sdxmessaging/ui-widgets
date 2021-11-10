import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { DisplayType, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { fileInputWrapperCls, wrapperCls } from "../theme";

// import { fileInvalid } from "../validation";

import { FileOpen } from "../display/fileOpen";
import { FileInput } from "./fileInput";
import { addFiles, removeFile } from "./fileMulti";
import { fileInvalid } from "../validation";

export class FileSelect implements ClassComponent<IFileWidget> {

	protected readonly dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value, displayType } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { disabled, uiClass = {} } = field;
		const innerText = displayType === DisplayType.none || !file
			? config.addFileTxt
			: file.name;
		return m("div", {
			class: wrapperCls(uiClass, disabled)
		},
			m(FileInput, {
				field,
				multiple: false,
				dragging: this.dragging,
				onSet: addFiles(value, true),
				value
			},
					m(".flex.items-center.pa1", {
						class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
					}, [
						m("i.pa1", {
							class: config.uploadIcn
						}),
						m("span.ma1.flex-auto", innerText),
						file && displayType !== DisplayType.none ? [
							m(FileOpen, file),
							m("i.pa1.pointer.dim", {
								title: `Remove ${file.name}`,
								class: config.cancelIcn,
								onclick: removeFile(value, file.guid)
							})
						] : null
					])
			)
		);
	}
}
