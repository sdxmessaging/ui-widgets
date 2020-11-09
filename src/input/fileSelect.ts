import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, getIcon } from "../theme";

import { FileInput } from "./fileInput";
import { addFiles, removeFile } from "./fileMulti";

export class FileSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		return m(FileInput, {
			field,
			multiple: false,
			dragging: this.dragging,
			onSet: addFiles(value, true)
		},
			m(".flex.items-center.pa1.ba.b--black-20", {
				class: this.dragging() ? drgCls() : filCls(),
			}, [
				m("i.pa1", {
					class: getIcon(config.uploadIcn)
				}),
				m("span.ma1.flex-auto", file ? file.name : config.addFileTxt),
				file ? m("i.pa1", {
					class: getIcon(this.checkConfigForIcon(file)),
					title: "Click to view file in new tab",
					onclick: file.path !== "not_set"
						? () => window.open(file.path, "_blank")
						: undefined
				}) : null,
				file ? m("i.pa1.pointer.dim", {
					title: `Remove ${file.name}`,
					class: getIcon(config.cancelIcn),
					onclick: removeFile(value, file.guid)
				}) : null,
			])
		);
	}

	// Should I move these functions to a separate config type of file ?
	checkConfigForIcon(file?: IFile) {
		let icon = '';
		if (file) {
			const extension = this.fileExtension(file).toLowerCase();
			switch (extension) {
				case 'doc':
				case 'docx':
				case 'dot':
				case 'wbk':
				case 'docm':
				case 'dotx':
				case 'dotm':
				case 'docb':
				case 'txt':
					{
						icon = config.wordDocIcn;
						break;
					}
				case 'webm':
				case 'mkv':
				case 'flv':
				case 'vob':
				case 'ogv':
				case 'drc':
				case 'gifv':
				case 'mng':
				case 'avi':
				case 'mts':
				case 'm2ts':
				case 'mov':
				case 'qt':
				case 'wmv':
				case 'yuv':
				case 'rm':
				case 'rmvb':
				case 'viv':
				case 'asf':
				case 'amv':
				case 'mp4':
				case 'm4p':
				case 'm4v':
				case 'mpg':
				case 'mp2':
				case 'mpeg':
				case 'mpe':
				case 'mpv':
				case 'm2v':
				case 'svi':
				case '3gp':
				case 'mxf':
				case 'roq':
				case 'nsv':
				case 'f4v':
				case 'f4p':
				case 'f4a':
				case 'f4b':
					{
						icon = config.videoFileIcn;
						break;
					}
				case 'pdf': {
					icon = config.pdfFileIcn;
					break;
				}
				case 'pcm':
				case 'wav':
				case 'aiff':
				case 'mp3':
				case 'aac':
				case 'ogg':
				case 'wma':
				case 'flac':
				case 'alac':
					{
						icon = config.musicFileIcn;
						break;
					}

				case 'xls':
				case 'xlt':
				case 'xlm':
				case 'xlsx':
				case 'xlsm':
				case 'xltx':
				case 'xltm':
				case 'xlsb':
				case 'xla':
				case 'xlam':
				case 'xll':
				case 'xlw':
					{
						icon = config.excelFileIcn;
						break;
					}
				case 'html':
				case 'js':
				case 'css':
				case 'scss':
				case 'java':
					{
						icon = config.codeFileIcn;
						break;
					}
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'tiff':
				case 'gif':
				case 'svg':
				case 'webp': {
					icon = config.imageIcn;
					break;
				}
				default: {
					icon = config.fileIcn;
					break;
				}
			}
		}
		return icon;
	}

	fileExtension(file: IFile) {
		const fileItem = file.name.split(".");
		const fileIndex = fileItem.length - 1;
		const fileExtension = fileItem[fileIndex];
		return fileExtension;
	}
}
