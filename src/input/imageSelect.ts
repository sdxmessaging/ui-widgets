import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { fileInputCls, imgMaxSize, inputWrapperCls, wrapperCls } from "../theme";
import { imgSrc } from "../utils";
import { fileInvalid } from "../validation";

import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";
import { addImages } from "./imageMulti";

export class ImageSelect implements ClassComponent<IFileWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const file = lodash.head(value());
		const { disabled, uiClass = {} } = field;
		return m("fieldset", {
			class: wrapperCls(uiClass, disabled)
		},
			m(FileInput, {
				field,
				defaultAccept: "image/*",
				multiple: false,
				dragging: this.dragging,
				onSet: addImages(value, config.imageMaxSize, true),
				value
			},
				m("div", {
					class: inputWrapperCls(uiClass, fileInvalid(field, value()))
				},
					m(".pa1", {
						class: fileInputCls(this.dragging())
					},
						m(".relative.w-100.dt.tc", file ? [
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
				)
			)
		);
	}
}
