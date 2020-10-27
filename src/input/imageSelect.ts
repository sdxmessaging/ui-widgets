import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, getIcon, imgMaxSize } from "../theme";
import { dataURItoBlob, fileConstructor, guid, imgSrc, resizeImage } from "../utils";

import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function setFile(fileList: stream<IFile[]>, maxSize: number) {
	return (setList: FileList | null) => {
		const file = lodash.head(setList);
		if (!file) {
			return Promise.resolve();
		}
		// Limit file dimensions
		return resizeImage(file, maxSize, file.type).then((dataURL) => {
			const newFile = fileConstructor(dataURItoBlob(dataURL), file.name);
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

export class ImageSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { classes = "" } = field;
		return m(FileInput, {
			field,
			defaultAccept: "image/*",
			multiple: false,
			dragging: this.dragging,
			onSet: setFile(value, config.imageMaxSize)
		},
			m(".relative.w-100.pa1.contain.dt.tc", {
				class: `${this.dragging() ? drgCls() : filCls()} ${classes}`
			}, file ? [
				m("img.img.contain", {
					title: file.name,
					src: imgSrc(file.path, file.dataUrl),
					style: imgMaxSize()
				}),
				m(".absolute.top-0.right-0.pa1.pointer.dim", {
					title: `Remove ${file.name}`,
					onclick: removeFile(value, file.guid)
				}, m("i.pa1", {
					class: getIcon(config.cancelIcn)
				}))
			] : m("i.fa-2x.dtc.v-mid", {
				class: getIcon(config.cameraIcn)
			}))
		);
	}

}
