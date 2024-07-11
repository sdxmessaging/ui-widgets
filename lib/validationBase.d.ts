import { CVnode, CVnodeDOM, Children, ClassComponent } from "mithril";
import { IPropWidget } from "./interface/widget";
export declare abstract class ValidationBase<T extends IPropWidget> implements ClassComponent<T> {
    private _inputElement;
    private _touch;
    private unboundTouch;
    protected touch: () => void;
    private _valueValid;
    protected get invalid(): boolean;
    protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select">;
    private checkValidity;
    abstract view(vnode: CVnode<T>): Children;
    oncreate({ dom, attrs: { value } }: CVnodeDOM<T>): void;
    onupdate({ attrs: { value } }: CVnodeDOM<T>): void;
}
