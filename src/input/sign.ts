import lodash from "lodash";
import m, { ClassComponent, ComponentTypes, CVnode } from "mithril";
import stream from "mithril/stream";

import { TStyle } from "../interface/theme";
import { IFile, IFileWidget, ISignField, ISignWidget, SignTypes } from "../interface/widget";

import { config } from "../config";
import { theme, inputWrapperCls, wrapperCls } from "../theme";
import { dataURItoBlob, fileConstructor, getLabel, guid, imgSrc, scaleRect } from "../utils";
import { fileInvalid } from "../validation";

import { SignDraw } from "./signDraw";
import { SignType } from "./signType";
import { SignStamp } from "./signStamp";

// Map SignTypes enum values to widgets
const componentMap: Readonly<Record<SignTypes, ComponentTypes<ISignWidget>>> = {
	[SignTypes.Draw]: SignDraw,
	[SignTypes.Type]: SignType,
	[SignTypes.Stamp]: SignStamp
};

function scaleDataUrl(dataUrl: string, maxSize: number): Promise<string> {
	return new Promise((resolve) => {
		const image = new Image();
		image.onload = () => {
			const canvas = document.createElement("canvas");
			const [width, height] = scaleRect(image.width, image.height, maxSize);
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext("2d") as CanvasRenderingContext2D;
			context.drawImage(image, 0, 0, width, height);
			resolve(canvas.toDataURL());
		};
		image.src = dataUrl;
	});
}

export function setFile(fileList: stream<IFile[]>, id: string, maxSize: number) {
	return (setDataUrl: string) => {
		return scaleDataUrl(setDataUrl, maxSize).then((scaledDataUrl) => {
			const newFile = fileConstructor(dataURItoBlob(scaledDataUrl), `sign-${id}.png`);
			fileList([{
				guid: guid(),
				name: newFile.name,
				path: "not_set",
				file: newFile,
				dataUrl: scaledDataUrl
			}]);
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
			uiClass = {},
			options = config.signOpts,
			heightPct = config.signHeightPct,
			stampTxt = config.stampTxt,
			stampSetTxt = config.stampSetTxt
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
					icon: config.drawIcn,
					label: config.signDrawTxt
				};
			} else if (type === SignTypes.Type) {
				return {
					type,
					icon: config.typeIcn,
					label: config.signTypeTxt
				};
			} else if (type === SignTypes.Stamp) {
				return {
					type,
					icon: config.stampIcn,
					label: config.signStampTxt
				};
			}
			return null;
		}).compact().value();
		// Auto-select widget if there is only one option and no file
		if (opts.length === 1 && !fileObj) {
			this.setSignType(opts[0].type);
		}
		return m("fieldset.relative", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, lbl),
			m("div", {
				class: this.signType !== SignTypes.Stamp
					? inputWrapperCls(uiClass, fileInvalid(field, value()))
					: undefined
			}, readonly || disabled
				// Display component in "readonly" mode
				? m(".aspect-ratio", {
					id,
					style
				},
					// Current signature
					fileObj ? m(".aspect-ratio--object", {
						style: { "pointer-events": "none" }
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
						onSet: setFile(value, id, config.signMaxSize),
						onCancel: () => this.setSignType()
					})

					// Display signature preview/creator
					: m(".aspect-ratio.pointer", {
						id,
						class: theme.fileInput,
						style
					}, fileObj
						// Current signature
						? m(".aspect-ratio--object.hide-child.dim", {
							onclick: () => value([])
						}, [
							m("img.img.w-100.absolute", {
								src: imgSrc(fileObj.path, fileObj.dataUrl)
							}),
							// Remove signature button
							m(".pa3.absolute.top-0.right-0.child",
								m("i.fa-2x", {
									class: config.resetIcn
								})
							)
						])
						// Signature creation options
						: m(".aspect-ratio--object.flex",
							lodash.map(opts, ({ type, icon, label }) => m(".flex-auto.flex.items-center.justify-center.dim", {
								title: label,
								onclick: () => this.setSignType(type)
							},
								m("i.fa-2x.ma1", {
									class: icon,
								}),
								m("span.ma1.dn.db-ns.truncate", label)
							))
						)
					)
			)
		]);
	}

	// Set/unset signature creation component
	private setSignType(type?: SignTypes) {
		this.signType = type;
	}
}
