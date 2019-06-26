import lodash from "lodash";
declare const b: TBss;
import m from "mithril";

import { TBss } from "../interface/style";
import { IModelField } from "../interface/widget";

import { dataURItoBlob, fileNameExtSplit, resizeImage } from "../utils";
import { FileSelect } from "./fileSelect";

export class ImageSelect extends FileSelect {

	protected static maxImageSize: number = 1280;

	protected multiple: boolean = false;
	protected acceptTypes: string = "image/*";

	protected viewUploadWidget({ classes = "h5" }: IModelField) {
		const fileObj = lodash.head(this.fileList());
		return m(".w-100.pa1.contain.ba.bw1.b--dashed.br3.dt.tc", {
			class: `${classes} ${this.dragging ? "b--blue blue" : "b--light-silver dark-gray"}`
		},
			fileObj ? m("img.img" + b.imgHeight, {
				src: fileObj.dataUrl
			}) : m("i.fal.fa-camera.fa-2x.dtc.v-mid")
		);
	}

	protected addFiles(fileList: ArrayLike<File>) {
		const file = lodash.head(fileList);
		if (!file) {
			return;
		}
		// Limit file dimensions
		const fileType = "image/jpeg";
		resizeImage(file, ImageSelect.maxImageSize, fileType).then((dataURL) => {
			// Split original file name from extension
			const [fName] = fileNameExtSplit(file.name);
			const newFile = new File([dataURItoBlob(dataURL)], `${fName}.jpg`, {
				type: fileType
			});
			this.setFile({
				guid: this.getFileId(),
				name: newFile.name,
				path: "not_set",
				file: newFile,
				dataUrl: dataURL
			});
			m.redraw();
		});
	}

}
