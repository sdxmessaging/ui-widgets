import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, getIcon, thumbMaxSize } from "../theme";
import { dataURItoBlob, guid, imgSrc, resizeImage } from "../utils";

import { Button } from "../button";
import { Thumbnail } from "../display/thumbnail";
import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function addFiles(fileList: stream<IFile[]>, maxSize: number) {
	return (addList: FileList | null) => {
		const newFileList = fileList();
		return Promise.all(lodash.map(addList, (file) => {
			// Limit file dimensions
			return resizeImage(file, maxSize, file.type).then((dataURL) => {
				const newFile = new File([dataURItoBlob(dataURL)], file.name, {
					type: file.type
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

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const { classes = "" } = field;
		return [
			m(FileInput, {
				field,
				defaultAccept: "image/*",
				dragging: this.dragging,
				onSet: addFiles(value, config.imageMaxSize)
			},
				m(".w-100.pa1.dt.tc", {
					class: `${this.dragging() ? drgCls() : filCls()} ${classes}`
				},
					m("i.fa-2x.dtc.v-mid", {
						class: getIcon(config.cameraIcn)
					})
				)
			),
			m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
				lodash.map(value(), (file) => m(Thumbnail, {
					src: imgSrc(file.path, file.dataUrl),
					style: thumbMaxSize()
				},
					m(".absolute.top-0.right-0.child",
						m(Button, {
							title: `Remove ${file.name}`,
							icon: config.deleteIcn,
							onclick: removeFile(value, file.guid)
						})
					)
				))
			)
		];
	}

}
