import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare function createStamp(sign: string, heightPct: number): string;
export declare function applyStamp(heightPct: number, callback: ISignWidget["onSet"]): () => void;
export declare class SignStamp implements ClassComponent<ISignWidget> {
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ dom }: CVnodeDOM<ISignWidget>): void;
    view({ attrs: { heightPct, style, onSet } }: CVnode<ISignWidget>): m.Vnode<any, any>;
    private scaleText;
}
