import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IMithrilEvent, TField } from "../interface/widget";
import { labelCls, pointerCls } from "../theme";
import { getLabelText } from "../utils";

export interface IFileInput {
	readonly field: TField;
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
	return ({ target: { files } }: { target: HTMLInputElement }) => setFiles(files);
}

export class FileInput implements ClassComponent<IFileInput> {
	public view({ attrs: {
		field, defaultAccept = "*", multiple = true,
		dragging,
		onSet
	}, children }: CVnode<IFileInput>) {
		const {
			label, id, name = id, title = label,
			required, readonly, disabled, autofocus,
			accept = defaultAccept,
			uiClass = {}
		} = field;
		return m("label.db", lodash.extend({
			"for": id,
			"title": title,
			"class": pointerCls(disabled, readonly),
			"data-input-id": id
		}, disabled || readonly ? {} : {
			ondragover: dragStart(dragging),
			ondragleave: dragStop(dragging),
			ondrop: drop(dragging, onSet)
		}), [
			m("input.clip[type=file].bg-transparent.bn.outline-0", {
				id, name, multiple, accept,
				required, autofocus,
				disabled: disabled || readonly,
				onchange: change(onSet)
			}),
			label ? m("span.db.mb1", {
				class: labelCls(uiClass, required)
			}, getLabelText(label, required)) : null,
			children
		]);
	}
}
