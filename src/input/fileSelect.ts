import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, getIcon } from "../theme";

import { FileInput } from "./fileInput";
import { addFiles, removeFile } from "./fileMulti";

export class FileSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		return m(FileInput,
			{
				field,
				multiple: false,
				dragging: this.dragging,
				defaultAccept: "image/*",
				onSet: addFiles(value, true)

			},
			m(".flex.items-center.pa1.ba.b--black-20", {
				class: this.dragging() ? drgCls() : filCls(),
			}, [
				m("i.pa1", {
					class: getIcon(config.uploadIcn)
				}),
				m("span.ma1.flex-auto", file ? file.name : config.addFileTxt),
				this.checkConfigForIcon(file) ? m("i.pa1", {
					class: getIcon(this.checkConfigForIcon(file)),
					title: 'Click to view file in new tab',
					onclick: () => { 
						if (file && file.name) { 
							window.open(file.path, '_blank') 
						}
					}
				}) : null,

				file ? m("i.pa1.pointer.dim", {
					title: `Remove ${file.name}`,
					class: getIcon(config.cancelIcn),
					onclick: removeFile(value, file.guid)
				}) : null,
			]),
		)	
	}

	// Should I move these functions to a separate config type of file ?
	checkConfigForIcon(file: any) {
		let icon = '';
		if (file) { 
			const extension = this.returnFileExtension(file).toLowerCase();
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
					icon = config.wordDocIcn
					break;
				};

				case 'mp3': 
				case 'mp4': 
				case 'mov': 
				case 'avi': 
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
	
				default : {
					icon = config.fileIcn;
					break;
				}
			}
		} 
		return icon;
	}
	returnFileExtension(file: any) {
		const fileItem = file.name.split(".");
		const fileIndex = fileItem.length - 1;
		const fileExtension = fileItem[fileIndex];
		return fileExtension
	}	
}
