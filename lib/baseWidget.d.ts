import { CVnode, CVnodeDOM, Children, ClassComponent } from "mithril";
import { IPropWidget, TPropStream } from "./interface/widget";
export declare abstract class BaseWidget<T extends IPropWidget> implements ClassComponent<T> {
    private _inputElement;
    private _focus;
    private _touch;
    private _valid;
    private unboundTouch;
    /**
     * Mark the widget as "touched",
     * automatically occurs when user focus leaves the widget
     * or when the widget stream is updated to a non-null value
     */
    protected touch: () => void;
    private unboundFocus;
    private boundFocus;
    /** Widget currently in focus */
    protected get inFocus(): boolean;
    /** Widget fails validation */
    protected get invalid(): boolean;
    protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select">;
    private checkValidity;
    /**
     * Update value and emit change event,
     * useful for widgets that use a hidden input to for validation
     * */
    protected changeInput(value: TPropStream): void;
    abstract view(vnode: CVnode<T>): Children;
    oncreate({ dom, attrs: { value } }: CVnodeDOM<T>): void;
    onupdate({ attrs: { value } }: CVnodeDOM<T>): void;
    onbeforeremove({ dom }: CVnodeDOM<T>): void;
}
