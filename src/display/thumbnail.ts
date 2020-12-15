import m, { Attributes, ClassComponent, CVnode } from "mithril";
import { getIcon } from "../theme";
import { getFileTypeIcon, isImage } from "../utils";

export class Thumbnail implements ClassComponent<Attributes> {

	public view({ children, attrs }: CVnode<Attributes>) {
		return m(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child", [
			isImage(attrs.file.file.type) ? 
			m("img.contain", attrs) :  
			m("div.contain.tc.br5.6rem", {
				class: `${getIcon(getFileTypeIcon(attrs.file.file))} fa-2x`,
				tooltip: attrs.file.file.type
			}),
			children
		]);
	}
}
