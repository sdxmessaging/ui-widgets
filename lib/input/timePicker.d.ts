import m, { CVnode, CVnodeDOM, ClassComponent } from "mithril";
import stream from "mithril/stream";
import { IConfig } from "../interface/config";
interface ITimePicker {
    readonly hour: stream<string>;
    readonly min: stream<string>;
    readonly step?: number;
    readonly config?: Partial<IConfig>;
    onClose(): void;
}
export declare class TimePicker implements ClassComponent<ITimePicker> {
    private dom;
    private clickListener;
    oncreate({ dom, attrs: { onClose: close } }: CVnodeDOM<ITimePicker>): void;
    onremove(): void;
    view({ attrs: { hour, min, step, config } }: CVnode<ITimePicker>): m.Vnode<any, any>;
}
export {};
