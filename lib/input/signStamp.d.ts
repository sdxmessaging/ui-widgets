import { ClassComponent, CVnode, Children } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare class SignStamp implements ClassComponent<ISignWidget> {
    view({ attrs: { heightPct, stampTxt, stampSetTxt, config, onSet } }: CVnode<ISignWidget>): Children;
}
