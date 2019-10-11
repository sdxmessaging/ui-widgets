import lodash from "lodash";
import m, { ClassComponent, ComponentTypes, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget, ISignWidget } from "../interface/widget";

import { filCls, getIcon, signAspectRatio } from "../theme";
import { dataURItoBlob, getLabel, guid, imgSrc, scaleRect } from "../utils";

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
			const newFile = new File([dataURItoBlob(scaledDataUrl)], `sign-${id}.png`, {
				type: "image/png"
			});
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

	protected static maxImageSize = 640;

	private component?: ComponentTypes<ISignWidget>;

	public oninit({ attrs: { value } }: CVnode<IFileWidget>) {
		// Reset component on file change
		value.map(() => this.component = undefined);
	}

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const {
			id,
			readonly, disabled,
			classes = "", containerClass
		} = field;
		const fileObj = lodash.head(value());
		return m(".relative", {
			class: containerClass
		}, [
			getLabel(field),
			// Use signature creation component (if set)
			this.component
				? m(this.component, {
					onSet: setFile(value, id, SignBuilder.maxImageSize),
					onCancel: () => this.component = undefined
				})
				: readonly || disabled
					// Display component in "readonly" mode
					? m(".aspect-ratio", {
						id,
						class: classes,
						style: signAspectRatio
					},
						fileObj
							// Current signature
							? m(".aspect-ratio--object",
								m("img.img.w-100.absolute", {
									src: imgSrc(fileObj.path, fileObj.dataUrl)
								}),
							)
							: null
					)
					// Display signature picker
					: m(".aspect-ratio.pointer", {
						id,
						class: `${filCls()} ${classes}`,
						style: signAspectRatio
					},
						fileObj
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
										class: getIcon("fa-eraser")
									})
								)
							])
							// Signature creation options
							: m(".aspect-ratio--object.flex.items-stretch.justify-center", [
								// TODO Provide means to enable/disable each option
								m(".flex-auto.flex.flex-column.justify-center.tc.dim", {
									onclick: () => this.component = SignDraw
								},
									m("i.fa-2x", {
										class: getIcon("fa-pen-nib")
									}),
									m("span.mt2", "Sign")
								),
								m(".flex-auto.flex.flex-column.justify-center.tc.dim", {
									onclick: () => this.component = SignType
								},
									m("i.fa-2x", {
										class: getIcon("fa-keyboard")
									}),
									m("span.mt2", "Type")
								),
								m(".flex-auto.flex.flex-column.justify-center.tc.dim", {
									onclick: () => this.component = SignStamp
								},
									m("i.fa-2x", {
										class: getIcon("fa-stamp")
									}),
									m("span.mt2", "Agree")
								)
							])
					)
		]);
	}

}
