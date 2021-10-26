import { ClassComponent, CVnodeDOM, CVnode } from "mithril";
import { IPropWidget } from ".";
export declare class ValidationBase implements ClassComponent<IPropWidget> {
    protected invalid: boolean;
    view(vnode: CVnode<IPropWidget>): void;
    onupdate({ dom, attrs: { field, value } }: CVnodeDOM<IPropWidget>): void;
}
