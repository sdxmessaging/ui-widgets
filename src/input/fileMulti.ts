import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream, { Stream } from "mithril/stream";

import { IFile, IFileWidget, IMithrilEvent, IModelField } from "../interface/widget";

import { guid, labelCls, removeByProperty, styleIcon } from "../utils";

export class FileMulti implements ClassComponent<IFileWidget> {

	protected acceptTypes: string = "*";
	protected multiple: boolean = true;

	protected dragging: boolean = false;

	protected fileList: Stream<IFile[]> = stream<IFile[]>([]);

	public oninit({ attrs: { value } }: CVnode<IFileWidget>) {
		// Provide member function access to value attribute
		this.fileList = value;
	}

	public view({ attrs: { field } }: CVnode<IFileWidget>): Children {
		const {
			label,
			id, name = id,
			required, readonly, disabled, autofocus,
			containerClass
		} = field;
		return m("div", [
			m("label.flex.flex-column", lodash.extend({
				for: id,
				title: label,
				class: `${disabled ? "o-60" : "pointer"} ${containerClass}`
			}, disabled ? {} : {
				ondragover: (evt: DragEvent) => this.dragStart(evt),
				ondragleave: (evt: DragEvent) => this.dragStop(evt),
				ondrop: (evt: DragEvent) => {
					this.dragStop(evt);
					if (evt.dataTransfer) {
						this.addFiles(evt.dataTransfer.files);
					}
				}
			}), [
					m("input.clip[type=file]", {
						id, name,
						multiple: this.multiple,
						accept: this.acceptTypes,
						required, readonly, disabled, autofocus,
						onchange: ({ target: { files } }: { target: HTMLFormElement }) => {
							this.addFiles(files);
						}
					}),
					m("span", {
						class: labelCls
					}, label),
					this.viewUploadWidget(field)
				]),
			this.viewFileList()
		]);
	}

	protected viewUploadWidget(_: IModelField): Children {
		return m(".pa2.ba.b--dashed.br2", {
			class: this.dragging ? "b--blue blue" : "b--light-silver dark-gray"
		}, [
				m("i.mr2", {
					class: styleIcon("fa-file-upload")
				}),
				m("span", "Add file(s)...")
			]
		);
	}

	protected viewFileList(): Children {
		return m(".flex.flex-column.mt1.nb1",
			lodash.map(this.fileList(), (file) => m("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
				m("i.mr2", {
					class: styleIcon("fa-file-download")
				}),
				file.name,
				m("i.child.fr", {
					title: `Remove ${file.name}`,
					class: styleIcon("fa-trash-alt"),
					onclick: () => this.removeFile(file.guid)
				})
			]))
		);
	}

	protected addFiles(fileList: ArrayLike<File>) {
		const newFileList = this.fileList();
		lodash.each(fileList, (file: File) => {
			newFileList.push({
				guid: guid(),
				name: file.name,
				path: "not_set",
				file: file
			});
		});
		this.fileList(newFileList);
	}

	protected removeFile(fileId: string) {
		const newFileList = this.fileList();
		removeByProperty(newFileList, { guid: fileId });
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
