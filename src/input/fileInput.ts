import lodash from "lodash";
import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";

import { IFile, IMithrilEvent, TField } from "../interface/widget";
import { pointerCls } from "../theme";
import { getLabel } from "../utils";

export interface IFileInput {
	readonly field: TField;
	readonly value: stream<IFile[]>;
	readonly defaultAccept?: string;
	readonly multiple?: boolean;
	readonly dragging: stream<boolean>;
	onSet(setList: FileList | null): void;
}

export function dragStart(state: stream<boolean>) {
	return (evt: DragEvent & IMithrilEvent) => {
		evt.preventDefault();
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = "copy";
		}
		// Prevent excessive redraws if dragging state is already set
		if (state()) {
			evt.redraw = false;
		}
		state(true);
	};
}

export function dragStop(state: stream<boolean>) {
	return (evt: DragEvent) => {
		evt.preventDefault();
		state(false);
	};
}

export function drop(state: stream<boolean>, setFiles: (setList: FileList | null) => void) {
	return (evt: DragEvent) => {
		evt.preventDefault();
		state(false);
		if (evt.dataTransfer) {
			setFiles(evt.dataTransfer.files);
		}
	};
}

export function change(setFiles: (setList: FileList | null) => void) {
	return ({ target: { files } }: { target: HTMLInputElement; }) => setFiles(files);
}

export class FileInput implements ClassComponent<IFileInput> {

	protected readonly showLabel: boolean = true;

	public oncreate({ dom, attrs: { value } }: CVnodeDOM<IFileInput>) {
		value.map((list) => {
			if (list.length === 0) {
				(dom.firstChild as HTMLInputElement).value = "";
			}
		});
	}

	public view({ attrs: {
		field, defaultAccept = "*", multiple = true,
		dragging,
		onSet
	}, children }: CVnode<IFileInput>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled, autofocus, tabindex = "0",
			accept = defaultAccept,
			uiClass = {}
		} = field;
		const labelInner = this.showLabel && label ? getLabel(id, uiClass, label, required) : null;
		return m("label.db", lodash.extend({
			"for": id,
			"title": title,
			"aria-labelled-by": id,
			"class": pointerCls(disabled, readonly),
			"data-input-id": id,
			tabindex,
			onkeydown: (e: KeyboardEvent) => {
				if (e.key === " ") {
					(document.activeElement?.firstElementChild as HTMLElement).click();
				}
			}
		}, disabled || readonly ? {} : {
			ondragover: dragStart(dragging),
			ondragleave: dragStop(dragging),
			ondrop: drop(dragging, onSet)
		}), [
			m("input.clip[type=file].bg-transparent.bn.outline-0", {
				id, name, multiple, accept,
				required, autofocus,
				disabled: disabled || readonly,
				tabindex: -1,
				onchange: change(onSet),
			}),
			labelInner,
			children
		]);
	}
}
