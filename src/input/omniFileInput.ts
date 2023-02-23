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

	public view({ attrs }: CVnode<IFileWidget>): Children {
		const { field, value } = attrs;
		const { disabled, uiClass = {} } = field;
		return m("div", {
			class: wrapperCls(uiClass, disabled)
		},
			m(FileInput, {
				field,
				value,
				multiple: false,
				dragging: this.dragging,
				onSet: addOmniFiles(value, true),
			},
				m(".flex.items-center.pa1", {
					class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
				}, this.innerComponent(attrs))
			)
		);
	}

	private innerComponent({ field: { disabled, config, readonly }, value }: IFileWidget) {
		const file = lodash.head(value());
		if (file) {
			if (file.dataUrl) {
				// Image preview
				return m(".relative.w-100.dt.tc",
					m("img.img.contain.max-h-img", {
						title: file.name,
						src: imgSrc(file.path, file.dataUrl)
					}),
					!(readonly || disabled) && m(".absolute.top-0.right-0.pa1.pointer.dim", {
						title: `Remove ${file.name}`,
						onclick: removeFile(value, file.guid)
					}, m("i.pa1", {
						class: getConfig("cancelIcn", config)
					}))
				);
			} else {
				// Non-image details
				return [
					m(FileOpen, file),
					m("span.ma1.flex-auto", {
						title: file.name,
					}, file.name),
					!(readonly || disabled) && m("i.pa1.pointer.dim", {
						title: `Remove ${file.name}`,
						class: getConfig("cancelIcn", config),
						onclick: removeFile(value, file.guid),
						onkeydown: clickOnEnter,
						tabindex: 0
					})
				];
			}
		} else {
			// File upload
			return [
				m("i.pa1", {
					class: getConfig("uploadIcn", config)
				}),
				m("span.ma1", getConfig("addFileTxt", config))
			];
		}
	}
}
