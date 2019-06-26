import lodash from "lodash";
import m from "mithril";

import { IModelField } from "../interface/widget";

import { Thumbnail } from "../display/thumbnail";
import { FileMulti } from "./fileMulti";

import { dataURItoBlob, fileNameExtSplit, guid, resizeImage } from "../utils";

export class ImageMulti extends FileMulti {

	protected static maxImageSize: number = 1280;

	protected acceptTypes: string = "image/*";

	protected viewUploadWidget({ classes = "h3" }: IModelField) {
		return m(".w-100.pa1.ba.bw1.b--dashed.br3.dt.tc", {
			class: `${classes} ${this.dragging ? "b--blue blue" : "b--light-silver dark-gray"}`
		},
			m("i.fal.fa-camera.fa-2x.dtc.v-mid")
		);
	}

	protected viewFileList() {
		return m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
			lodash.map(this.fileList(), (file) => m(Thumbnail, {
				src: file.dataUrl,
				class: "dim",
				style: { "max-height": "6rem" }
			},
				m(".pa2.bg-white.ba.b--light-silver.br2.absolute.top-0.right-0.child.pointer", {
					title: `Remove ${file.name}`,
					onclick: () => this.removeFile(file._id)
				},
					m("i.fal.fa-file-minus.fa-lg")
				)
			))
		);
	}

	protected addFiles(fileList: ArrayLike<File>) {
		const fileType = "image/jpeg";
		const newFileList = this.fileList();
		Promise.all(lodash.map(fileList, (file) => {
			// Limit file dimensions
			return resizeImage(file, ImageMulti.maxImageSize, fileType).then((dataURL) => {
				// Split original file name from extension
				const [fName] = fileNameExtSplit(file.name);
				const newFile = new File([dataURItoBlob(dataURL)], `${fName}.jpg`, {
					type: fileType
				});
				newFileList.push({
					_id: guid(),
					name: newFile.name,
					path: "not_set",
					file: newFile,
					dataUrl: dataURL
				});
			});
		})).then(() => {
			this.fileList(newFileList);
			m.redraw();
		});
	}

}
