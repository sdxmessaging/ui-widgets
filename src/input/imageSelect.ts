import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { theme, imgMaxSize } from "../theme";
import { imgSrc } from "../utils";

import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";
import { addImages } from "./imageMulti";

export class ImageSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { uiClass = {} } = field;
		const { wrapper } = uiClass;

		return m("fieldset", {
			class: `${wrapper} ${theme.wrapper}`
		},
			m(FileInput, {
				field,
				defaultAccept: "image/*",
				multiple: false,
				dragging: this.dragging,
				onSet: addImages(value, config.imageMaxSize, true)
			},
				m(".relative.w-100.pa1.dt.tc", {
					class: `${theme.fileInput} ${this.dragging() ? theme.fileHover : ""}`
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
						class: config.cancelIcn
					}))
				] : m("i.fa-2x.dtc.v-mid", {
					class: config.cameraIcn
				}))
			)
		);
	}
}
