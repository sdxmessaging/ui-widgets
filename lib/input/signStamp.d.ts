import { ClassComponent, CVnode, CVnodeDOM, Children } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare function applyStamp(canvas: HTMLCanvasElement, checked: boolean): void;
export declare class SignStamp implements ClassComponent<ISignWidget> {
    private applied;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ dom }: CVnodeDOM<ISignWidget>): void;
    view({ attrs: { onSet } }: CVnode<ISignWidget>): Children;
    private scaleText;
}
