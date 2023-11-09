import m, { CVnode, ClassComponent } from "mithril";
import { IConfig } from "../interface/config";
import { TPropStream } from "../interface/widget";
interface ITimeScroller {
    readonly value: TPropStream;
    readonly min: number;
    readonly max: number;
    readonly step?: number;
    readonly config?: Partial<IConfig>;
}
export declare class TimeScroller implements ClassComponent<ITimeScroller> {
    private static formatValue;
    private static applyStep;
    view({ attrs: { value, step, min, max, config } }: CVnode<ITimeScroller>): m.Vnode<any, any>;
}
export {};
