import lodash from "lodash";
import m, { ClassComponent, ComponentTypes, CVnode } from "mithril";
import stream from "mithril/stream";

import { TStyle } from "../interface/theme";
import { IFile, IFileWidget, ISignField, ISignWidget, SignTypes, TPropMap } from "../interface/widget";

import { getConfig } from "../config";
import { theme, wrapperCls } from "../theme";
import { getLabel, imgSrc, dataUrlToFile, clickOnEnter } from "../utils";
import { scaleDataUrl } from "../imageUtils";

import { SignDraw } from "./signDraw";
import { SignType } from "./signType";
import { SignStamp } from "./signStamp";

// Map SignTypes enum values to widgets
const componentMap: Readonly<Record<SignTypes, ComponentTypes<ISignWidget>>> = {
	[SignTypes.Draw]: SignDraw,
	[SignTypes.Type]: SignType,
	[SignTypes.Stamp]: SignStamp
};

export function setFile(fileList: stream<IFile[]>, id: string, maxSize: number) {
	return (setDataUrl: string, metadata?: TPropMap) => {
		return scaleDataUrl(setDataUrl, maxSize).then((scaledDataUrl) => {
			fileList([dataUrlToFile(scaledDataUrl, `sign-${id}.png`, metadata)]);
			m.redraw();
		});
	};
}

export class SignBuilder implements ClassComponent<IFileWidget> {

	private signType?: SignTypes;
	private valUpdate!: stream<void>;

	public oninit({ attrs: { value } }: CVnode<IFileWidget>) {
		// Unset signature component on file change
		this.valUpdate = value.map(() => this.setSignType());
	}

	public onremove() {
		this.valUpdate.end();
	}

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const {
			label: lbl, id,
			readonly, disabled,
			uiClass = {}, config,
			options = getConfig("signOpts", config),
			heightPct = getConfig("signHeightPct", config),
			stampTxt = getConfig("stampTxt", config),
			stampSetTxt = getConfig("stampSetTxt", config)
		} = field as ISignField;
		const style: TStyle = {
			paddingBottom: `${heightPct}%`
		};
		const fileObj = lodash.head(value());
		// Convert options into widget descriptions
		const opts = lodash(options).map(({ value: type }) => {
			if (type === SignTypes.Draw) {
				return {
					type,
					icon: getConfig("drawIcn", config),
					label: getConfig("signDrawTxt", config)
				};
			} else if (type === SignTypes.Type) {
				return {
					type,
					icon: getConfig("typeIcn", config),
					label: getConfig("signTypeTxt", config)
				};
			} else if (type === SignTypes.Stamp) {
				return {
					type,
					icon: getConfig("stampIcn", config),
					label: getConfig("signStampTxt", config)
				};
			}
			return null;
		}).compact().value();
		// Auto-select widget if there is only one option and no file
		if (opts.length === 1 && !fileObj) {
			this.setSignType(opts[0].type);
		}
		return m("div.relative", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, lbl),
			readonly || disabled
				// Display component in "readonly" mode
				? m(".aspect-ratio", {
					id,
					style
				},
					// Current signature
					fileObj ? m(".aspect-ratio--object", {
						class: "pe-none"
					},
						m("img.img.w-100.absolute", {
							src: imgSrc(fileObj.path, fileObj.dataUrl)
						}),
					) : null
				)
				// Use signature creation component (if set)
				: this.signType
					? m(componentMap[this.signType], {
						heightPct,
						stampTxt,
						stampSetTxt,
						style,
						onSet: setFile(value, id, getConfig("signMaxSize", config)),
						onCancel: lodash.bind(this.setSignType, this, undefined)
					})

					// Display signature preview/creator
					: m(".aspect-ratio.pointer", {
						id,
						class: theme.fileInputWrapper,
						style
					}, fileObj
						// Current signature
						? m(".aspect-ratio--object.dim", {
							onclick: lodash.bind(value, this, [])
						}, [
							m("img.img.w-100.absolute", {
								src: imgSrc(fileObj.path, fileObj.dataUrl)
							}),
							// Remove signature button
							m(".pa3.absolute.top-0.right-0.child",
								m("i.fa-2x", {
									class: getConfig("resetIcn", config),
									tabindex: 0,
									onkeydown: clickOnEnter
								})
							)
						])
						// Signature creation options
						: m(".aspect-ratio--object.flex",
							lodash.map(opts, ({ type, icon, label }) => m(".flex-auto.flex.items-center.justify-center.dim", {
								title: label,
								tabindex: 0,
								onkeydown: clickOnEnter,
								onclick: lodash.bind(this.setSignType, this, type)
							},
								m("i.fa-2x.ma1", {
									class: icon,
								}),
								m("span.ma1.dn.db-ns.truncate", label)
							))
						)
					)
		]);
	}

	// Set/unset signature creation component
	private setSignType(type?: SignTypes) {
		this.signType = type;
	}
}
