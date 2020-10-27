import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, getIcon } from "../theme";
import { guid } from "../utils";

import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function setFile(fileList: stream<IFile[]>) {
	return (setList: FileList | null) => {
		const file = lodash.head(setList);
		if (!file) {
			return;
		}
		fileList([{
			guid: guid(),
			name: file.name,
			path: "not_set",
			file: file
		}]);
	};
}

export class FileSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		return m(FileInput,
			{
				field,
				multiple: false,
				dragging: this.dragging,
				onSet: setFile(value)
			},
			m(".flex.items-center.pa1.ba.b--black-20", {
				class: this.dragging() ? drgCls() : filCls(),
			}, [
				m("i.pa1", {
					class: getIcon(config.uploadIcn)
				}),
				m("span.ma1.flex-auto", file ? file.name : config.addFileTxt),
				file ? m("i.pa1.pointer.dim", {
					title: `Remove ${file.name}`,
					class: getIcon(config.cancelIcn),
					onclick: removeFile(value, file.guid)

					// onclick: (event: Event) => {
					// 	event.preventDefault();
					// 	value([]);
					// }
				}) : null
			])
		);
	}

}
