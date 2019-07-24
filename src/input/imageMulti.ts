import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream, { Stream } from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { Thumbnail } from "../display/thumbnail";
import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

import { dataURItoBlob, fileNameExtSplit, getIcon, guid, imgSrc, resizeImage } from "../utils";

export class ImageMulti implements ClassComponent<IFileWidget> {

	protected static maxImageSize: number = 1280;

	protected dragging: Stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {

		const { classes } = field;

		return m("div", [
			m(FileInput, {
				field,
				accept: "image/*",
				dragging: this.dragging,
				onSet: (setList: FileList | null) => addFiles(value, setList, ImageMulti.maxImageSize)
			},
				m(".w-100.pa1.ba.bw1.b--dashed.br3.dt.tc", {
					class: `${classes} ${this.dragging() ? "b--blue blue" : "b--light-silver dark-gray"}`
				},
					m("i.fa-2x.dtc.v-mid", {
						class: getIcon("fa-camera")
					})
				)
			),
			m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
				lodash.map(value(), (file) => m(Thumbnail, {
					src: imgSrc(file.path, file.dataUrl),
					class: "dim",
					style: { "max-height": "6rem" }
				},
					m(".pa2.bg-white.ba.b--light-silver.br2.absolute.top-0.right-0.child.pointer", {
						title: `Remove ${file.name}`,
						onclick: removeFile(value, file.guid)
					},
						m("i.fa-lg", {
							class: getIcon("fa-trash-alt")
						})
					)
				))
			)
		]);
	}

}

// Stream helpers
export function addFiles(fileList: Stream<IFile[]>, addList: FileList | null, maxSize: number) {
	const fileType = "image/jpeg";
	const newFileList = fileList();
	Promise.all(lodash.map(addList, (file) => {
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
}
