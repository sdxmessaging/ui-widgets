import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { getButtonContext, fileInputWrapperCls, theme } from "../theme";
import { fileInvalid } from "../validation";

import { addFiles } from "./fileMulti";
import { getLabel, labelIcon } from "../utils";
import { FileButtonInput } from "./fileButtonInput";

export class FileButtonSelect implements ClassComponent<IFileWidget> {

	protected readonly dragging: stream<boolean> = stream<boolean>(false);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
		const { id, label = {text: "Add File", icon: config.uploadIcn}, required, uiClass = {} } = field;
		return [
			getLabel(id, uiClass, label, required),
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
						(typeof label === 'string') ? labelIcon({text: label, icon: config.uploadIcn}) : labelIcon(label)
					)
				)
			)
		];
	}
}
