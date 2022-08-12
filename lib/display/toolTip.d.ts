import m, { ClassComponent, CVnode } from "mithril";
import { IToolTip } from "../interface/widget";
export declare class ToolTip implements ClassComponent<IToolTip> {
    private show;
    view({ attrs: { message, direction, icon } }: CVnode<IToolTip>): m.Vnode<any, any>;
}
