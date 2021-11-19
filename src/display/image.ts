import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { wrapperCls } from "../theme";

import { getDisplayLabel, imgSrc } from "../utils";
import { Thumbnail } from "./thumbnail";

export class ImageList implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { label, uiClass = {} } = field;
		return m(".pa2.flex.flex-column", {
			class: wrapperCls(uiClass),
		}, [
			getDisplayLabel(label),
			m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb",
				lodash.map(value(), ({ name, path, dataUrl }) => m(Thumbnail, {
					title: name,
					src: imgSrc(path, dataUrl)
				}))
			)
		]);
	}

}
