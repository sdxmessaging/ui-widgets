import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { getConfig } from "../config";
import { fileInputWrapperCls, wrapperCls } from "../theme";
import { dataURItoBlob, fileConstructor, guid, imgSrc } from "../utils";
import { resizeImage } from "../imageUtils";
import { fileInvalid } from "../validation";

import { Button } from "../button";
import { Thumbnail } from "../display/thumbnail";
import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function addImages(fileList: stream<IFile[]>, maxSize: number, replace = false) {
	return (addList: FileList | null) => {
		const newFileList = replace ? [] : fileList();
		return Promise.all(lodash.map(addList, (file) => {
			// Limit file dimensions
			return resizeImage(file, maxSize, file.type).then((dataURL) => {
				const newFile = fileConstructor(dataURItoBlob(dataURL), file.name);
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

	protected readonly dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const { disabled, uiClass = {}, config, readonly } = field;
		return m("div", {
			class: wrapperCls(uiClass, disabled)
		}, [
			m(FileInput, {
				field,
				defaultAccept: "image/*",
				dragging: this.dragging,
				onSet: addImages(value, getConfig("imageMaxSize", config)),
				value
			},
				m(".w-100.pa1.dt.tc", {
					class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
				},
					m("i.fa-2x.dtc.v-mid", {
						class: getConfig("cameraIcn", config)
					})
				)
			),
			m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb",
				lodash.map(value(), (file) => m(Thumbnail, {
					src: imgSrc(file.path, file.dataUrl)
				},
					!(readonly || disabled) && m(".absolute.top-0.right-0.child",
						m(Button, {
							title: `Remove ${file.name}`,
							icon: getConfig("deleteIcn", config),
							onclick: removeFile(value, file.guid)
						})
					)
				))
			)
		]);
	}

}
