import m, { ClassComponent, CVnode } from "mithril";
import { IFileWidget } from "../interface/widget";
export declare class SignBuilder implements ClassComponent<IFileWidget> {
    protected static maxImageSize: number;
    private state;
    view({ attrs: { field, value } }: CVnode<IFileWidget>): m.Vnode<any, any>;
}
