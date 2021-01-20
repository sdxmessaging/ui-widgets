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

	private component?: ComponentTypes<ISignWidget>;

	public oninit({ attrs: { value } }: CVnode<IFileWidget>) {
		// Reset component on file change
		value.map(() => this.component = undefined);
	}

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const {
			label: lbl, id,
			readonly, disabled,
			uiClass = {},
			options = config.signOpts,
			heightPct = config.signHeightPct
		} = field as ISignField;
		const style: TStyle = {
			paddingBottom: `${heightPct}%`
		};
		const fileObj = lodash.head(value());
		// Convert options into widget descriptions
		const opts = lodash(options).map(({ value: type }) => {
			if (type === SignTypes.Draw) {
				return {
					component: SignDraw,
					icon: config.drawIcn,
					label: config.signDrawTxt
				};
			} else if (type === SignTypes.Type) {
				return {
					component: SignType,
					icon: config.typeIcn,
					label: config.signTypeTxt
				};
			} else if (type === SignTypes.Stamp) {
				return {
					component: SignStamp,
					icon: config.stampIcn,
					label: config.signStampTxt
				};
			}
			return null;
		}).compact().value();
		// Auto-select widget if there is only one option and no file
		if (opts.length === 1 && !fileObj) {
			this.component = opts[0].component;
		}
		return m("fieldset.relative", {
			class: wrapperCls(uiClass, disabled)
		}, [
			getLabel(id, uiClass, lbl),
			m("div", {
				class: inputWrapperCls(uiClass, fileInvalid(field, value()))
			}, readonly || disabled
				// Display component in "readonly" mode
				? m(".aspect-ratio", {
					id,
					style
				},
					// Current signature
					fileObj ? m(".aspect-ratio--object",
						m("img.img.w-100.absolute", {
							src: imgSrc(fileObj.path, fileObj.dataUrl)
						}),
					) : null
				)
				// Use signature creation component (if set)
				: this.component
					? m(this.component, {
						heightPct,
						style,
						onSet: setFile(value, id, config.signMaxSize),
						onCancel: () => this.component = undefined
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
						: m(".aspect-ratio--object.flex.items-stretch.justify-center",
							lodash.map(opts, ({ component, icon, label }) => m(".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim", {
								onclick: () => this.component = component
							},
								m("i.fa-2x.ma1", {
									class: icon
								}),
								m("span.ma1", label)
							))
						)
					)
			)
		]);
	}
}
