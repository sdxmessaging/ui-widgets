import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";

import { IFileWidget } from "../interface/widget";

import { config } from "../config";
import { theme, imgMaxSize } from "../theme";
import { getDisplayLabel, imgSrc } from "../utils";

export class ImagePreview implements ClassComponent<IFileWidget> {

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const { label, uiClass = {}, style } = field;
		const { wrapper = "" } = uiClass;
		const file = lodash.head(value());
		return m(".pa2.flex.flex-column", {
			class: `${wrapper} ${theme.wrapper}`,
			style
		}, [
			getDisplayLabel(label),
			file ? m("img.img.h-100.mt2.contain.self-center", {
				title: file.name,
				src: imgSrc(file.path, file.dataUrl),
				style: imgMaxSize()
			}) : m("i.mt2", {
				class: `${theme.displayValue} ${config.imageIcn}`
			})
		]);
	}

}
