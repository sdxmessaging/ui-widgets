import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";
import { IMithrilEvent, TField } from "../interface/widget";
export interface IFileInput {
    readonly field: TField;
    readonly accept?: string;
    readonly multiple?: boolean;
    readonly dragging: stream<boolean>;
    onSet(setList: FileList | null): void;
}
export declare function dragStart(state: stream<boolean>): (evt: DragEvent & IMithrilEvent) => void;
export declare function dragStop(state: stream<boolean>): (evt: DragEvent) => void;
export declare function drop(state: stream<boolean>, setFiles: (setList: FileList | null) => void): (evt: DragEvent) => void;
export declare function change(setFiles: (setList: FileList | null) => void): ({ target: { files } }: {
    target: HTMLInputElement;
}) => void;
export declare class FileInput implements ClassComponent<IFileInput> {
    view({ attrs: { field: { label, id, name, title, required, readonly, disabled, autofocus, containerClass }, accept, multiple, dragging, onSet }, children }: CVnode<IFileInput>): m.Vnode<any, any>;
}
