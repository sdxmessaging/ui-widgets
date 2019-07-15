import lodash from "lodash";
declare const b: TBss;
import m, { Children, CVnode } from "mithril";

import { TBss } from "../interface/style";
import { IFileWidget } from "../interface/widget";

import { FileSelect } from "./fileSelect";
import { SignDraw } from "./signDraw";
import { SignType } from "./signType";

import { dataURItoBlob, getLabel, imgSrc, scaleRect, styleIcon } from "../utils";

const enum SignState {
	Select,
	Draw,
	Type
}

export class SignBuilder extends FileSelect {

	protected static maxImageSize: number = 640;

	private state: SignState = SignState.Select;

	public view({ attrs: { field } }: CVnode<IFileWidget>): Children {
		const {
			id,
			// required, readonly, disabled, autofocus,
			containerClass
		} = field;
		const fileObj = lodash.head(this.fileList());
		return m(".flex.flex-column", {
			class: containerClass
		}, [
				m(".mb1.flex.flex-row", [
					getLabel(field),
					m("span.ph2.mh2.ml-auto.dark-gray", {
						class: this.state === SignState.Draw ? b.brandingAlt.class : "dim pointer",
						onclick: () => this.state = SignState.Draw
					}, m("i.fa-fw", {
						class: styleIcon("fa-pen")
					})),
					m("span.ph2.mh2.dark-gray", {
						class: this.state === SignState.Type ? b.brandingAlt.class : "dim pointer",
						onclick: () => this.state = SignState.Type
					}, m("i.fa-fw", {
						class: styleIcon("fa-keyboard")
					}))
				]),
				this.state === SignState.Select
					? m(".aspect-ratio.dark-gray.ba.bw1.br3.b--dashed.b--black-30.pointer" + b.aspectRatio4x1, {
						onclick: () => this.state = SignState.Draw
					}, fileObj
							? m("img.aspect-ratio--object", {
								src: imgSrc(fileObj.path, fileObj.dataUrl)
							})
							: m(".aspect-ratio--object.flex.items-center.justify-center", [
								m("i.fa-2x", {
									class: styleIcon("fa-pen-nib")
								}),
								m("span.ml2", "Sign")
							])
					)
					: m(this.state === SignState.Draw ? SignDraw : SignType, {
						onSet: (dataUrl: string) => this.setDataUrl(dataUrl, id),
						onCancel: () => this.state = SignState.Select
					})
			]);
	}

	private setDataUrl(dataUrl: string, fileKey: string) {
		scaleDataUrl(dataUrl, SignBuilder.maxImageSize).then((scaledDataUrl) => {
			const newFile = new File([dataURItoBlob(scaledDataUrl)], `sign-${fileKey}.png`, {
				type: "image/png"
			});
			this.setFile({
				guid: this.getFileId(),
				name: newFile.name,
				path: "not_set",
				file: newFile,
				dataUrl: scaledDataUrl
			});
			this.state = SignState.Select;
			m.redraw();
		});
	}

}

function scaleDataUrl(dataUrl: string, maxSize: number): Promise<string> {
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
