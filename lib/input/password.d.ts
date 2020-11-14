import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class PasswordInput implements ClassComponent<IPropWidget> {
    private showPassword;
    view({ attrs: { field, value } }: CVnode<IPropWidget>): (m.Vnode<any, any> | null)[];
}
