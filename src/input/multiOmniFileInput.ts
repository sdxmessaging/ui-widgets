import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { fileInputCls, inputWrapperCls, wrapperCls } from "../theme";
import { fileInvalid } from "../validation";

import { DisplayTypeComponent } from "../display/displayTypeComponent";
import { addOmniFiles } from "./omniFileInput";
import { FileInput } from "./fileInput";

export class MultiOmniFileInput implements ClassComponent<IFileWidget> {
	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: {
		field, value, displayType, showDisplay = true
	} }: CVnode<IFileWidget>): Children {
		const { disabled, uiClass = {} } = field;
		return m("div", {
			class: wrapperCls(uiClass, disabled)
		}, [
			m(FileInput, {
				field,
				defaultAccept: "*",
				dragging: this.dragging,
				onSet: addOmniFiles(value, false),
				value
			},
				m("div", {
					class: inputWrapperCls(uiClass, fileInvalid(field, value()))
				},
					m(".flex.items-center.pa1.dt", {
						class: fileInputCls(this.dragging())
					}, [
						m("i.pa1", {
							class: config.uploadIcn
						}),
						m("span.ma1.flex-auto", config.addFileTxt)
					])
				)
			),
			showDisplay ? m(DisplayTypeComponent, {
				displayType,
				value
			}) : null
		]);
	}
}
