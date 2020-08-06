import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare class SignDraw implements ClassComponent<ISignWidget> {
    private signaturePad;
    private resizeHandler;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onremove(): void;
    view({ attrs: { style, onSet, onCancel } }: CVnode<ISignWidget>): m.Vnode<any, any>[];
    private resetCanvas;
}
