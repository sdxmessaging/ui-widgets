import m, { CVnode, ClassComponent } from "mithril";
import { IList } from "../interface/list";
export declare class List<T> implements ClassComponent<IList<T>> {
    private static fragment;
    private controller;
    private scrollHandler;
    oninit({ attrs: { controller } }: CVnode<IList<T>>): void;
    view({ attrs: { component, classes, fragment } }: CVnode<IList<T>>): m.Vnode<any, any>;
}
