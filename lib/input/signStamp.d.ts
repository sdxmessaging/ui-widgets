import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare function applyText(callback: ISignWidget["onSet"]): () => void;
export declare class SignStamp implements ClassComponent<ISignWidget> {
    private checked;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ dom }: CVnodeDOM<ISignWidget>): void;
    view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>): m.Vnode<any, any>[];
    private scaleText;
}
