import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare function applyStamp(canvas: HTMLCanvasElement, checked: boolean): void;
export declare class SignStamp implements ClassComponent<ISignWidget> {
    private applied;
    private canvas?;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ attrs: { onSet } }: CVnode<ISignWidget>): void;
    view(): m.Vnode<any, any>[];
}
