import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, getIcon } from "../theme";
import { guid } from "../utils";

import { FileInput } from "./fileInput";

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
		const fileObj = lodash.head(value());
		return m(FileInput, 
			{
				field,
				multiple: false,
				dragging: this.dragging,
				onSet: setFile(value)
			},
			m(".ba.b--black-20.pa2", {
				class: this.dragging() ? drgCls() : filCls(),
			}, [
				m("i.mr2", {
						class: getIcon(config.uploadIcn)
					}),
				m("span", fileObj ? fileObj.name : config.addFileTxt),	
				(fileObj ?
				m(".fr.dark-red.pointer.dim.dib.pt1.mr2", {
					class: getIcon(config.cancelIcn),
					onclick: (event: Event) => {value([]); event.preventDefault()}
				})
				: null)
				]
			),
		);
	}

}
