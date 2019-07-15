import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare class SignType implements ClassComponent<ISignWidget> {
    private text;
    private fontSize;
    private resizeHandler?;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onremove(): void;
    view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>): m.Vnode<any, any>[];
}
