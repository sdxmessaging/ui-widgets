import { ClassComponent, CVnode, CVnodeDOM, Children } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare function applyStamp(canvas: HTMLCanvasElement): void;
export declare class SignStamp implements ClassComponent<ISignWidget> {
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ dom }: CVnodeDOM<ISignWidget>): void;
    view({ attrs: { onSet } }: CVnode<ISignWidget>): Children;
    private scaleText;
}
