import m, { ClassComponent, CVnode } from "mithril";
import { IFile } from "../interface/widget";

import { config } from "../config";
import { getFileTypeIcon } from "../utils";

export class FileOpen implements ClassComponent<IFile> {
	public view({ attrs }: CVnode<IFile>) {
		return m("i.pa1", {
			class: getFileTypeIcon(attrs),
			title: config.openFileTxt,
			onclick: attrs.path !== "not_set"
				? () => window.open(attrs.path, "_blank")
				: undefined
		});
	}
}
