import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { DisplayType, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { theme } from "../theme";

import { DisplayTypeComponent } from "../display/displayTypeComponent";
import { addOmniFiles } from "./omniFileInput";
import { FileInput } from "./fileInput";

export class MultiOmniFileInput implements ClassComponent<IFileWidget> {
	protected dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: {
		field, value, displayType = DisplayType.thumbnail, showDisplay = true
	} }: CVnode<IFileWidget>): Children {
		const { uiClass = {} } = field;
		const { wrapper = "" } = uiClass;
		return m("fieldset.pa0.bn", {
			class: `${wrapper} ${theme.wrapper}`
		}, [
			m(FileInput, {
				field,
				defaultAccept: "*",
				dragging: this.dragging,
				onSet: addOmniFiles(value, false),
			},
				m(".flex.items-center.pa1.ba.b--black-20.dt.relative", {
					class: `${theme.fileInput} ${this.dragging() ? theme.fileHover : ""}`
				}, [
					m("i.pa1", {
						class: config.uploadIcn
					}),
					m("span.ma1.flex-auto", config.addFileTxt)
				])
			),
			showDisplay ? m(DisplayTypeComponent, {
				displayType: displayType,
				value: value
			}) : null
		]);
	}
}
