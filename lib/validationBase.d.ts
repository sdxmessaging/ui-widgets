import { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import { IPropWidget } from "./interface/widget";
export declare abstract class ValidationBase<T extends IPropWidget> implements ClassComponent<T> {
    private checkValue;
    private valueValid;
    protected get invalid(): boolean;
    protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select">;
    abstract view(vnode: CVnode<T>): Children;
    oncreate({ dom, attrs: { value, xform } }: CVnodeDOM<T>): void;
    onremove(): void;
}
