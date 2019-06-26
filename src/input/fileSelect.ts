import lodash from "lodash";
import m from "mithril";

import { IFile, IModelField } from "../interface/widget";

import { guid } from "../utils";
import { FileMulti } from "./fileMulti";

export class FileSelect extends FileMulti {

	protected multiple: boolean = false;

	protected viewUploadWidget(_: IModelField) {
		const fileObj = lodash.head(this.fileList());
		return m(".pa2.ba.b--dashed.br2", {
			class: this.dragging ? "b--blue blue" : "b--light-silver dark-gray"
		}, [
				m("i.fal.fa-file-upload.mr2"),
				m("span", fileObj ? fileObj.name : "Upload...")
			]
		);
	}

	protected viewFileList() {
		return null;
	}

	protected addFiles(fileList: ArrayLike<File>) {
		const file = lodash.head(fileList);
		if (!file) {
			return;
		}
		this.setFile({
			_id: this.getFileId(),
			name: file.name,
			path: "not_set",
			file: file
		});
	}

	// Generate or re-use the set file _id
	protected getFileId(): string {
		const fileObj = lodash.head(this.fileList());
		return fileObj ? fileObj._id : guid();
	}

	// Replace any instance file(s) with a single IDataFile
	protected setFile(fileObj: IFile) {
		this.fileList([fileObj]);
	}

}
