import { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import { IPropWidget } from "./interface/widget";
export declare abstract class ValidationBase<T extends IPropWidget> implements ClassComponent<T> {
    private _inputElement;
    private _valueValid;
    protected get invalid(): boolean;
    protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select">;
    private checkValidity;
    abstract view(vnode: CVnode<T>): Children;
    oncreate({ dom }: CVnodeDOM<T>): void;
    onupdate(): void;
}
