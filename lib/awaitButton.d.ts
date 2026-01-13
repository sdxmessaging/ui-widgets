import m, { CVnode, ClassComponent } from "mithril";
import { IButton, IMithrilEvent } from "./interface/widget";
interface IAwaitButton extends IButton {
    onclick(evt: IMithrilEvent): Promise<unknown>;
}
export declare class AwaitButton implements ClassComponent<IAwaitButton> {
    private _awaiting;
    view({ attrs }: CVnode<IAwaitButton>): m.Vnode<IButton, unknown>;
}
export {};
