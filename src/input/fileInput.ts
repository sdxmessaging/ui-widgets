import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IMithrilEvent, TField } from "../interface/widget";
import { lblCls } from "../theme";
import { getEnabledClass, getLabelText } from "../utils";

export interface IFileInput {
	readonly field: TField;
	readonly accept?: string;
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
		field: {
			label, id, name = id, title = label,
			required, readonly, disabled, autofocus,
			containerClass = ""
		},
		accept = "*", multiple = true,
		dragging,
		onSet
	}, children }: CVnode<IFileInput>) {
		return m("label", lodash.extend({
			for: id,
			title: label,
			class: `${getEnabledClass(disabled, readonly)} ${containerClass}`
		}, disabled || readonly ? {} : {
			ondragover: dragStart(dragging),
			ondragleave: dragStop(dragging),
			ondrop: drop(dragging, onSet)
		}), [
			m("input.clip[type=file]", {
				id, name, multiple, accept,
				required, autofocus,
				disabled: disabled || readonly,
				onchange: change(onSet)
			}),
			label ? m("span.db.mb1", {
				title,
				class: lblCls()
			}, getLabelText(label, required)) : null,
			children
		]);
	}
}
