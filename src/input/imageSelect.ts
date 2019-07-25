import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream, { Stream } from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { FileInput } from "./fileInput";

import { dataURItoBlob, fileNameExtSplit, getIcon, guid, imgSrc, resizeImage } from "../utils";

export class ImageSelect implements ClassComponent<IFileWidget> {

	protected static maxImageSize: number = 1280;

	protected dragging: Stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const fileObj = lodash.head(value());
		const { classes } = field;
		return m("div", [
			m(FileInput, {
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
						? m("img.img.h5", {
							src: imgSrc(fileObj.path, fileObj.dataUrl)
						})
						: m("i.fa-2x.dtc.v-mid", {
							class: getIcon("fa-camera")
						})
				)
			)
		]);
	}

}

export function setFile(fileList: Stream<IFile[]>, maxSize: number) {
	return (setList: FileList | null) => {
		const file = lodash.head(setList);
		if (!file) {
			return;
		}
		const fileObj = lodash.head(fileList());
		// Limit file dimensions
		const fileType = "image/jpeg";
		resizeImage(file, maxSize, fileType).then((dataURL) => {
			// Split original file name from extension
			const [fName] = fileNameExtSplit(file.name);
			const newFile = new File([dataURItoBlob(dataURL)], `${fName}.jpg`, {
				type: fileType
			});
			fileList([{
				// Re-use file identifier
				guid: fileObj ? fileObj.guid : guid(),
				name: newFile.name,
				path: "not_set",
				file: newFile,
				dataUrl: dataURL
			}]);
			m.redraw();
		});
	};
}
