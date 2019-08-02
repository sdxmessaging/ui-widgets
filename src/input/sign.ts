import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { SignDraw } from "./signDraw";
import { SignType } from "./signType";

import { dataURItoBlob, getIcon, getLabel, guid, imgSrc, scaleRect, signAspectRatio } from "../utils";

export const enum SignState {
	Select,
	Draw,
	Type
}

export class SignBuilder implements ClassComponent<IFileWidget> {

	protected static maxImageSize: number = 640;

	private state: stream<SignState> = stream<SignState>(SignState.Select);

	public view({ attrs: { field, value } }: CVnode<IFileWidget>) {
		const {
			id,
			// required, readonly, disabled, autofocus,
			containerClass
		} = field;
		const fileObj = lodash.head(value());
		return m(".relative", {
			class: containerClass
		}, [
				getLabel(field),
				this.state() === SignState.Select
					? m(".aspect-ratio.dark-gray.ba.bw1.br3.b--dashed.b--black-30.pointer", {
						style: signAspectRatio
					}, fileObj
							// Current signature
							? m(".aspect-ratio--object.hide-child.dim", {
								onclick: () => value([])
							}, [
									m("img.img", {
										src: imgSrc(fileObj.path, fileObj.dataUrl)
									}),
									// Remove signature button
									m(".pa3.absolute.top-0.right-0.child",
										m("i.fa-2x", {
											class: getIcon("fa-eraser")
										})
									)
								])
							// Draw/Type buttons
							: m(".aspect-ratio--object.flex.items-stretch.justify-center", [
								m(".flex-auto.flex.items-center.justify-center.tc.dim", {
									onclick: () => this.state(SignState.Draw)
								},
									m("i.fa-2x", {
										class: getIcon("fa-pen-nib")
									}),
									m("span.ml2", "Sign")
								),
								m(".flex-auto.flex.items-center.justify-center.tc.dim", {
									onclick: () => this.state(SignState.Type)
								},
									m("i.fa-2x", {
										class: getIcon("fa-keyboard")
									}),
									m("span.ml2", "Type")
								)
							])
					)
					: m(this.state() === SignState.Draw ? SignDraw : SignType, {
						onSet: setFile(value, this.state, id, SignBuilder.maxImageSize),
						onCancel: () => this.state(SignState.Select)
					})
			]);
	}

}

export function setFile(fileList: stream<IFile[]>, state: stream<SignState>, id: string, maxSize: number) {
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
			state(SignState.Select);
			m.redraw();
		});
	};
}

export function scaleDataUrl(dataUrl: string, maxSize: number): Promise<string> {
	return new Promise((resolve) => {
		const image = new Image();
		image.onload = () => {
			const canvas = document.createElement("canvas");
			const [width, height] = scaleRect(image.width, image.height, maxSize);
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext("2d");
			if (context) {
				context.drawImage(image, 0, 0, width, height);
			}
			resolve(canvas.toDataURL());
		};
		image.src = dataUrl;
	});
}
