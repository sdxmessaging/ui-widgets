import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";
import { ISignWidget } from "../interface/widget";
export declare class SignType implements ClassComponent<ISignWidget> {
    private text;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ dom }: CVnodeDOM<ISignWidget>): void;
    view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>): m.Vnode<any, any>[];
    private scaleText;
}
export declare function applyText(text: stream<string>, callback: ISignWidget["onSet"]): () => boolean;
export declare function renderText(text: string): string;
