import m, { Attributes, ClassComponent, CVnode } from "mithril";

export class Thumbnail implements ClassComponent<Attributes> {

	public view({ children, attrs }: CVnode<Attributes>) {
		return m(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child", [
			m("img.contain", attrs),
			children
		]);
	}

}
