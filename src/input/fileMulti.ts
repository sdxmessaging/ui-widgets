import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream, { Stream } from "mithril/stream";

import { IDataFile, IFileWidget, IMithrilEvent, IModelField } from "../interface/widget";

import { guid, removeByProperty } from "../utils";

export class FileMulti implements ClassComponent<IFileWidget> {

	protected acceptTypes: string = "*";
	protected multiple: boolean = true;

	protected dragging: boolean = false;

	protected fileList: Stream<IDataFile[]> = stream<IDataFile[]>([]);

	public oninit({ attrs: { value } }: CVnode<IFileWidget>) {
		// Provide member function access to value attribute
		this.fileList = value;
	}

	public view({ attrs: { field } }: CVnode<IFileWidget>): Children {
		const { prop, label, containerClass, required, disabled } = field;
		return m("div", [
			m("label.flex.flex-column", lodash.extend({
				for: prop,
				title: label,
				class: `${disabled ? "o-60" : "pointer"} ${containerClass}`
			}, disabled ? {} : {
				ondragover: (evt: DragEvent) => this.dragStart(evt),
				ondragleave: (evt: DragEvent) => this.dragStop(evt),
				ondrop: (evt: DragEvent) => {
					this.dragStop(evt);
					if (evt.dataTransfer) {
						this.addFiles(evt.dataTransfer.files, prop);
					}
				}
			}), [
					m("input.clip", {
						id: prop,
						name: prop,
						type: "file",
						multiple: this.multiple,
						accept: this.acceptTypes,
						required,
						disabled,
						onchange: ({ target: { files } }: { target: HTMLFormElement }) => {
							this.addFiles(files, prop);
						}
					}),
					m("span.mb1.silver", label),
					this.viewUploadWidget(field)
				]),
			this.viewFileList()
		]);
	}

	protected viewUploadWidget(_: IModelField): Children {
		return m(".pa2.ba.b--dashed.br2", {
			class: this.dragging ? "b--blue blue" : "b--light-silver dark-gray"
		}, [
				m("i.fal.fa-file-upload.mr2"),
				m("span", "Add file(s)...")
			]
		);
	}

	protected viewFileList(): Children {
		return m(".flex.flex-column.mt1.nb1",
			lodash.map(this.fileList(), (file) => m("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
				m("i.fal.fa-file-download.mr2"),
				file.name,
				m("i.fal.fa-file-minus.child.fr", {
					title: `Remove ${file.name}`,
					onclick: () => this.removeFile(file._id)
				})
			]))
		);
	}

	protected addFiles(fileList: ArrayLike<File>, fileKey: string) {
		const newFileList = this.fileList();
		lodash.each(fileList, (file: File) => {
			newFileList.push({
				file: file,
				_id: guid(),
				prop: fileKey,
				name: file.name,
				size: file.size,
				type: file.type,
				lastModified: file.lastModified
			});
		});
		this.fileList(newFileList);
	}

	protected removeFile(fileId: string) {
		const newFileList = this.fileList();
		removeByProperty(newFileList, { _id: fileId });
		this.fileList(newFileList);
	}

	protected dragStart(evt: DragEvent) {
		evt.preventDefault();
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = "copy";
		}
		// Prevent excessive redraws if dragging state is already set
		if (this.dragging) {
			((evt as Event) as IMithrilEvent).redraw = false;
		}
		this.dragging = true;
	}

	protected dragStop(evt: DragEvent) {
		evt.preventDefault();
		this.dragging = false;
	}

}
