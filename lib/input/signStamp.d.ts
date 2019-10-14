import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare function applyStamp(canvas: HTMLCanvasElement, checked: boolean): void;
export declare class SignStamp implements ClassComponent<ISignWidget> {
    private checked;
    private canvas?;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate(): void;
    view({ attrs: { onSet, onCancel } }: CVnode<ISignWidget>): m.Vnode<any, any>[];
}
