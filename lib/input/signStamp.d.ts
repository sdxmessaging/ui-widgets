import { ClassComponent, CVnode, Children } from "mithril";
import { ISignWidget } from "../interface/widget";
export declare function createStamp(sign: string, heightPct: number): string;
export declare function applyStamp(heightPct: number, stampTxt: string, callback: ISignWidget["onSet"]): () => void;
export declare class SignStamp implements ClassComponent<ISignWidget> {
    view({ attrs: { heightPct, stampTxt, stampSetTxt, onSet } }: CVnode<ISignWidget>): Children;
}
