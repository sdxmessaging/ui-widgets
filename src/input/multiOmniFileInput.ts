import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { getConfig } from "../config";
import { fileInputWrapperCls, wrapperCls } from "../theme";
import { fileInvalid } from "../validation";

import { DisplayTypeComponent } from "../display/displayTypeComponent";
import { addOmniFiles } from "./omniFileInput";
import { FileInput } from "./fileInput";

export class MultiOmniFileInput implements ClassComponent<IFileWidget> {
	protected readonly dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: {
		field, value, displayType, showDisplay = true
	} }: CVnode<IFileWidget>): Children {
		const { disabled, uiClass = {}, config, readonly } = field;
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
				m(".flex.items-center.pa1.dt", {
					class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
				}, [
					m("i.pa1", {
						class: getConfig("uploadIcn", config)
					}),
					m("span.ma1.flex-auto", getConfig("addFileTxt", config))
				])
			),
			showDisplay ? m(DisplayTypeComponent, {
				displayType,
				value,
				readonlyOrDisabled: disabled || readonly
			}) : null
		]);
	}
}
