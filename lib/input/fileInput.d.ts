import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";
import { IFile, IMithrilEvent, TField } from "../interface/widget";
export interface IFileInput {
    readonly field: TField;
    readonly value: stream<IFile[]>;
    readonly defaultAccept?: string;
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
    protected readonly showLabel: boolean;
    oncreate({ dom, attrs: { value } }: CVnodeDOM<IFileInput>): void;
    view({ attrs: { field, defaultAccept, multiple, dragging, onSet }, children }: CVnode<IFileInput>): m.Vnode<any, any>;
}
