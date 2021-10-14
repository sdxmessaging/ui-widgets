import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export class HiddenDateInput implements ClassComponent<IPropWidget> {
	public view({ attrs }: CVnode<IPropWidget>) {
		const { id } = attrs.field;
		return m('input', {
			style: { display: 'none' },
			id
		});
	}
}
