import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { fileInputWrapperCls, wrapperCls } from "../theme";
import { guid } from "../utils";
import { fileInvalid } from "../validation";

import { FileInput } from "./fileInput";

export function addFiles(fileList: stream<IFile[]>, replace = false) {
	return (addList: FileList | null) => {
		const newFileList = replace ? [] : fileList();
		lodash.each(addList, (file: File) => {
			newFileList.push({
				guid: guid(),
				name: file.name,
				path: "not_set",
				file: file
			});
		});
		fileList(newFileList);
	};
}

export function removeFile(fileList: stream<IFile[]>, removeGuid: string) {
	return (event: Event) => {
		event.preventDefault();
		const newFileList = fileList();
		lodash.remove(newFileList, { guid: removeGuid });
		fileList(newFileList);
	};
}

export class FileMulti implements ClassComponent<IFileWidget> {

	protected readonly dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const { disabled, uiClass = {} } = field;
		return m("div", {
			class: wrapperCls(uiClass, disabled)
		}, [
			m(FileInput, {
				field,
				dragging: this.dragging,
				onSet: addFiles(value),
				value
			},
				m(".pa2", {
					class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
				}, [
					m("i.mr2", {
						class: config.uploadIcn
					}),
					m("span", config.addFilesTxt)
				])
			),
			m(".flex.flex-column.mt1.nb1", lodash.map(value(),
				(file) => m("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
					m("i.mr2", {
						class: config.downloadIcn
					}),
					file.name,
					m("i.child.fr", {
						title: `${config.remFileTtl} ${file.name}`,
						class: config.deleteIcn,
						onclick: removeFile(value, file.guid)
					})
				]))
			)
		]);
	}

}
