import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import stream from "mithril/stream";
import { ISignWidget } from "../interface/widget";
export declare function applyText(text: stream<string>, heightPct: number, callback: ISignWidget["onSet"]): () => boolean;
export declare class SignType implements ClassComponent<ISignWidget> {
    private text;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ dom }: CVnodeDOM<ISignWidget>): void;
    view({ attrs: { heightPct, style, onSet, onCancel } }: CVnode<ISignWidget>): m.Vnode<any, any>[];
    private scaleText;
}
