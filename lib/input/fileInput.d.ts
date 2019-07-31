import m, { ClassComponent, CVnode } from "mithril";
import { Stream } from "mithril/stream";
import { IMithrilEvent, TField } from "../interface/widget";
export interface IFileInput {
    readonly field: TField;
    readonly accept?: string;
    readonly multiple?: boolean;
    readonly dragging: Stream<boolean>;
    onSet(setList: FileList | null): void;
}
export declare class FileInput implements ClassComponent<IFileInput> {
    view({ attrs: { field: { label, id, name, required, readonly, disabled, autofocus, containerClass }, accept, multiple, dragging, onSet }, children }: CVnode<IFileInput>): m.Vnode<any, any>;
}
export declare function dragStart(state: Stream<boolean>): (evt: DragEvent & IMithrilEvent) => void;
export declare function dragStop(state: Stream<boolean>): (evt: DragEvent) => void;
export declare function drop(state: Stream<boolean>, setFiles: (setList: FileList | null) => void): (evt: DragEvent) => void;
export declare function change(setFiles: (setList: FileList | null) => void): ({ target: { files } }: {
    target: HTMLInputElement;
}) => void;
