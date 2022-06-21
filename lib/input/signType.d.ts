import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare class SignType implements ClassComponent<ISignWidget> {
    private text;
    oncreate({ dom }: CVnodeDOM<ISignWidget>): void;
    onupdate({ dom }: CVnodeDOM<ISignWidget>): void;
    view({ attrs: { heightPct, style, config, onSet, onCancel } }: CVnode<ISignWidget>): m.Vnode<any, any>[];
    private scaleText;
}
