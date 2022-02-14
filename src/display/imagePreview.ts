import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { getConfig } from "../config";
import { theme, wrapperCls } from "../theme";
import { getDisplayLabel, imgSrc } from "../utils";

export class ImagePreview implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { label, uiClass = {}, config } = field;
		const file = lodash.head(value());
		return m(".pa2.flex.flex-column", {
			class: wrapperCls(uiClass)
		}, [
			getDisplayLabel(label),
			file ? m("img.img.h-100.max-h-img.mt2.contain.self-center", {
				title: file.name,
				src: imgSrc(file.path, file.dataUrl)
			}) : m("i.mt2", {
				class: `${theme.displayValue} ${getConfig("imageIcn", config)}`
			})
		]);
	}

}
