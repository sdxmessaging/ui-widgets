import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config as configMap, getConfig } from "../config";
import { fileInputWrapperCls, wrapperCls } from "../theme";
import { isImage, dataURItoBlob, fileConstructor, guid, imgSrc, clickOnEnter } from "../utils";
import { resizeImage } from "../imageUtils";
import { fileInvalid } from "../validation";

import { FileOpen } from "../display/fileOpen";
import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function addOmniFiles(fileList: stream<IFile[]>, replace: boolean) {
	return (addList: FileList | null) => {
		const newFileList = replace ? [] : fileList();
		return Promise.all(lodash.map(addList, (file) => {
			if (isImage(file.type)) {
				return resizeImage(file, configMap.imageMaxSize, file.type).then((dataURL) => {
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

	protected readonly dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { disabled, uiClass = {}, config } = field;
		return m("div", {
			class: wrapperCls(uiClass, disabled)
		},
			m(FileInput, {
				field,
				defaultAccept: "*",
				multiple: false,
				dragging: this.dragging,
				onSet: addOmniFiles(value, true),
				value
			},
				m(".flex.items-center.pa1", {
					class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
				}, file ? file.dataUrl
					? [
						// Image preview
						m(".relative.w-100.dt.tc",
							m("img.img.contain.max-h-img", {
								title: file.name,
								src: imgSrc(file.path, file.dataUrl)
							}),
							m(".absolute.top-0.right-0.pa1.pointer.dim", {
								title: `Remove ${file.name}`,
								onclick: removeFile(value, file.guid)
							}, m("i.pa1", {
								class: getConfig("cancelIcn", config)
							}))
						)
					] : [
						// Non-image details
						m(FileOpen, file),
						m("span.ma1.flex-auto", {
							title: file.name,
						}, file.name),
						m("i.pa1.pointer.dim", {
							title: `Remove ${file.name}`,
							class: getConfig("cancelIcn", config),
							onclick: removeFile(value, file.guid),
							onkeydown: clickOnEnter,
							tabindex: 0
						})
					]
					: [
						// File upload
						m("i.pa1", {
							class: getConfig("uploadIcn", config)
						}),
						m("span.ma1", getConfig("addFileTxt", config))
					]
				)
			)
		);
	}
}
