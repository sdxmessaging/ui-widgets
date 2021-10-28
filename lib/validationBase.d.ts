import { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import { IPropWidget } from "./interface/widget";
export declare abstract class ValidationBase implements ClassComponent<IPropWidget> {
    protected invalid: boolean;
    protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select">;
    abstract view(vnode: CVnode<IPropWidget>): Children;
    onupdate({ dom, attrs: { field, value } }: CVnodeDOM<IPropWidget>): void;
}
