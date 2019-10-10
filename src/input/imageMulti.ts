import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { btnClass, drgCls, filCls, getIcon } from "../theme";
import { dataURItoBlob, fileNameExtSplit, guid, imgSrc, resizeImage } from "../utils";

import { Thumbnail } from "../display/thumbnail";
import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function addFiles(fileList: stream<IFile[]>, maxSize: number) {
	return (addList: FileList | null) => {
		const fileType = "image/jpeg";
		const newFileList = fileList();
		return Promise.all(lodash.map(addList, (file) => {
			// Limit file dimensions
			return resizeImage(file, maxSize, fileType).then((dataURL) => {
				// Split original file name from extension
				const [fName] = fileNameExtSplit(file.name);
				const newFile = new File([dataURItoBlob(dataURL)], `${fName}.jpg`, {
					type: fileType
				});
				newFileList.push({
					guid: guid(),
					name: newFile.name,
					path: "not_set",
					file: newFile,
					dataUrl: dataURL
				});
			});
		})).then(() => {
			fileList(newFileList);
			m.redraw();
		});
	};
}

export class ImageMulti implements ClassComponent<IFileWidget> {

	protected static maxImageSize = 1280;

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const { classes = "" } = field;
		return [
			m(FileInput, {
				field,
				accept: "image/*",
				dragging: this.dragging,
				onSet: addFiles(value, ImageMulti.maxImageSize)
			},
				m(".w-100.pa1.dt.tc", {
					class: `${this.dragging() ? drgCls() : filCls()} ${classes}`
				},
					m("i.fa-2x.dtc.v-mid", {
						class: getIcon("fa-camera")
					})
				)
			),
			m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
				lodash.map(value(), (file) => m(Thumbnail, {
					src: imgSrc(file.path, file.dataUrl),
					style: { "max-height": "6rem" }
				},
					m(".pa2.absolute.top-0.right-0.child.pointer", {
						title: `Remove ${file.name}`,
						class: btnClass(),
						onclick: removeFile(value, file.guid)
					},
						m("i.fa-lg", {
							class: getIcon("fa-trash-alt")
						})
					)
				))
			)
		];
	}

}
