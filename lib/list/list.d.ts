import m, { CVnode, ClassComponent } from "mithril";
import { IList } from "../interface/list";
export declare class List<T> implements ClassComponent<IList<T>> {
    private controller;
    private scrollHandler;
    oninit({ attrs: { controller } }: CVnode<IList<T>>): void;
    view({ attrs: { classes, component } }: CVnode<IList<T>>): m.Vnode<any, any>;
}
