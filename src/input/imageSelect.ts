import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { FileInput } from "./fileInput";

import { dataURItoBlob, fileNameExtSplit, getIcon, guid, imgMaxSize, imgSrc, resizeImage } from "../utils";

export class ImageSelect implements ClassComponent<IFileWidget> {

	protected static maxImageSize: number = 1280;

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const fileObj = lodash.head(value());
		const { classes = "" } = field;
		return m(FileInput, {
			field,
			accept: "image/*",
			multiple: false,
			dragging: this.dragging,
			onSet: setFile(value, ImageSelect.maxImageSize)
		},
			m(".w-100.pa1.contain.ba.bw1.b--dashed.br3.dt.tc", {
				class: `${classes} ${this.dragging() ? "b--blue blue" : "b--light-silver dark-gray"}`
			},
				fileObj
					? m("img.img.contain", {
						title: fileObj.name,
						src: imgSrc(fileObj.path, fileObj.dataUrl),
						style: imgMaxSize
					})
					: m("i.fa-2x.dtc.v-mid", {
						class: getIcon("fa-camera")
					})
			)
		);
	}

}

export function setFile(fileList: stream<IFile[]>, maxSize: number) {
	return (setList: FileList | null) => {
		const file = lodash.head(setList);
		if (!file) {
			return Promise.resolve();
		}
		// Limit file dimensions
		const fileType = "image/jpeg";
		return resizeImage(file, maxSize, fileType).then((dataURL) => {
			// Split original file name from extension
			const [fName] = fileNameExtSplit(file.name);
			const newFile = new File([dataURItoBlob(dataURL)], `${fName}.jpg`, {
				type: fileType
			});
			fileList([{
				guid: guid(),
				name: newFile.name,
				path: "not_set",
				file: newFile,
				dataUrl: dataURL
			}]);
			m.redraw();
		});
	};
}
