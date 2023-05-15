import m, { CVnode, CVnodeDOM, ClassComponent } from "mithril";
import { IListPage } from "../interface/list";
export declare class ListPage<T> implements ClassComponent<IListPage<T>> {
    private container;
    oncreate({ dom }: CVnodeDOM<IListPage<T>>): void;
    onbeforeupdate({ attrs: { visible } }: CVnode<IListPage<T>>, { attrs: { visible: previous } }: CVnode<IListPage<T>>): boolean;
    view({ attrs: { items, idx, visible, component } }: CVnode<IListPage<T>>): m.Vnode<any, any>;
}
