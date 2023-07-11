import m, { Child, ClassComponent, CVnode } from "mithril";
import { getConfig, getIcon } from "../../config";
import { IConfig, TIcon } from "../../interface/config";

interface ISelectionInner {
	readonly selected: boolean;
	readonly label?: Child;
	readonly onIcon: TIcon;
	readonly offIcon: TIcon;
	readonly config?: Partial<IConfig>;
}

export class SelectionInner implements ClassComponent<ISelectionInner> {

	public view({ attrs: { selected, label, onIcon, offIcon, config } }: CVnode<ISelectionInner>) {
		return m(".flex.items-center.h-100",
			getConfig("selectionLayout", config).map((element) => {
				switch (element) {
					case "label": return label;
					case "icon": return getIcon(selected ? onIcon : offIcon, "mh1");
					case "on": return m("span.mh1", {
						class: getConfig(selected ? "selectionOnActive" : "selectionOnInactive", config)
					}, getConfig("selectionOnLabel", config));
					case "off": return m("span.mh1", {
						class: getConfig(selected ? "selectionOffInactive" : "selectionOffActive", config)
					}, getConfig("selectionOffLabel", config));
				}
			})
		);
	}

}
