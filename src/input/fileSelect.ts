import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream, { Stream } from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { FileInput } from "./fileInput";

import { getIcon, guid } from "../utils";

export class FileSelect implements ClassComponent<IFileWidget> {

	protected dragging: Stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const fileObj = lodash.head(value());
		return m(FileInput, {
			field,
			multiple: false,
			dragging: this.dragging,
			onSet: setFile(value)
		},
			m(".pa2.ba.b--dashed.br2", {
				class: this.dragging() ? "b--blue blue" : "b--light-silver dark-gray"
			}, [
					m("i.mr2", {
						class: getIcon("fa-file-upload")
					}),
					m("span", fileObj ? fileObj.name : "Upload...")
				]
			)
		);
	}

}

export function setFile(fileList: Stream<IFile[]>) {
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
