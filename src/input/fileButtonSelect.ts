import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { getButtonContext, fileInputWrapperCls, labelCls, theme } from "../theme";
import { fileInvalid } from "../validation";

import { addFiles } from "./fileMulti";
import { getLabelText, labelIcon } from "../utils";
import { FileButtonInput } from "./fileButtonInput";

export class FileButtonSelect implements ClassComponent<IFileWidget> {

	protected readonly dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const { label = "Add File", required, uiClass = {} } = field;
		return [
			label ? m("span.db.mb1", {
				class: labelCls(uiClass, required)
			}, getLabelText(label, required)) : null,
			m("div", {
				class: `${fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))} ${getButtonContext()} ${theme.button}`,
			},
				m(FileButtonInput, {
					field,
					multiple: false,
					dragging: this.dragging,
					onSet: addFiles(value, true),
					value
				},
					m(".flex.items-center",
						labelIcon(config.uploadIcn, label)
					)
				)
			)
		];
	}
}
