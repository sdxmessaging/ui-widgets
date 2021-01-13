import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { fileInputCls, wrapperCls, imgMaxSize } from "../theme";
import { isImage, dataURItoBlob, fileConstructor, guid, imgSrc, resizeImage, getFileTypeIcon } from "../utils";

import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function addOmniFiles(fileList: stream<IFile[]>, replace: boolean) {
	return (addList: FileList | null) => {
		const newFileList = replace ? [] : fileList();
		return Promise.all(lodash.map(addList, (file) => {
			if (isImage(file.type)) {
				return resizeImage(file, config.imageMaxSize, file.type).then((dataURL) => {
					const newFile = fileConstructor(dataURItoBlob(dataURL), file.name);
					newFileList.push({
						guid: guid(),
						name: newFile.name,
						path: "not_set",
						file: newFile,
						dataUrl: dataURL
					});
				});
			} else {
				newFileList.push({
					guid: guid(),
					name: file.name,
					path: "not_set",
					file: file,
				});
				return Promise.resolve();
			}
		})).then(() => {
			fileList(newFileList);
			m.redraw();
		});
	};
}

export class OmniFileInput implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { disabled, uiClass = {} } = field;
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		},
			m(FileInput, {
				field,
				defaultAccept: "*",
				multiple: false,
				dragging: this.dragging,
				onSet: addOmniFiles(value, true)
			},
				m(".flex.items-center.pa1", {
					class: fileInputCls(this.dragging())
				}, file ? file.dataUrl
					? [
						// Image preview
						m(".relative.w-100.dt.tc",
							m("img.img.contain", {
								title: file.name,
								src: imgSrc(file.path, file.dataUrl),
								style: imgMaxSize()
							}),
							m(".absolute.top-0.right-0.pa1.pointer.dim", {
								title: `Remove ${file.name}`,
								onclick: removeFile(value, file.guid)
							}, m("i.pa1", {
								class: config.cancelIcn
							}))
						)
					] : [
						// Non-image details
						m("i.pa1", {
							class: getFileTypeIcon(file),
							title: "Click to view file in new tab",
							onclick: file.path !== "not_set"
								? () => window.open(file.path, "_blank")
								: undefined
						}),
						m("span.ma1.flex-auto", file.name),
						m("i.pa1.pointer.dim", {
							title: `Remove ${file.name}`,
							class: config.cancelIcn,
							onclick: removeFile(value, file.guid)
						})
					]
					: [
						// File upload
						m("i.pa1", {
							class: config.uploadIcn
						}),
						m("span.ma1.flex-auto", config.addFileTxt)
					]
				)
			)
		);
	}
}
