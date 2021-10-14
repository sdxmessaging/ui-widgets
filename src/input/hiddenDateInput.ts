// import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IPropWidget } from "../interface/widget";

// import { focusLastInput } from "../utils";

export class HiddenDateInput implements ClassComponent<IPropWidget> {
	public view({ attrs }: CVnode<IPropWidget>) {
		const { id } = attrs.field;
		return m('input', {
			style: { display: 'none' },
			id
		});
	}
}
