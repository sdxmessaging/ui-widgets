import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream, { Stream } from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { FileInput } from "./fileInput";

import { getIcon, guid, removeByProperty } from "../utils";

export class FileMulti implements ClassComponent<IFileWidget> {

	protected dragging: Stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {

		return m("div", [
			m(FileInput, {
				field,
				dragging: this.dragging,
				onSet: (setList: FileList | null) => addFiles(value, setList)
			},
				m(".pa2.ba.b--dashed.br2", {
					class: this.dragging() ? "b--blue blue" : "b--light-silver dark-gray"
				}, [
						m("i.mr2", {
							class: getIcon("fa-file-upload")
						}),
						m("span", "Add file(s)...")
					]
				)
			),
			m(".flex.flex-column.mt1.nb1",
				lodash.map(value(), (file) => m("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
					m("i.mr2", {
						class: getIcon("fa-file-download")
					}),
					file.name,
					m("i.child.fr", {
						title: `Remove ${file.name}`,
						class: getIcon("fa-trash-alt"),
						onclick: removeFile(value, file.guid)
					})
				]))
			)
		]);
	}

}

export function removeFile(fileList: Stream<IFile[]>, removeGuid: string) {
	return () => {
		const newFileList = fileList();
		removeByProperty(newFileList, { guid: removeGuid });
		fileList(newFileList);
	};
}

// Stream helpers
export function addFiles(fileList: Stream<IFile[]>, addList: FileList | null) {
	const newFileList = fileList();
	lodash.each(addList, (file: File) => {
		newFileList.push({
			guid: guid(),
			name: file.name,
			path: "not_set",
			file: file
		});
	});
	fileList(newFileList);
}
