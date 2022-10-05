import m, { ClassComponent, CVnode } from "mithril";
import { IToolTip as ITooltip } from "./interface/widget";
export declare class Tooltip implements ClassComponent<ITooltip> {
    private show;
    view({ attrs: { message, direction, icon } }: CVnode<ITooltip>): m.Vnode<any, any>;
}
