import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropWidget, LayoutType, TProp } from "../../interface/widget";
export declare class FloatLabel implements ClassComponent<IPropWidget> {
    private focus;
    private focusIn;
    private focusOut;
    private inputWrapper;
    private wrapperHeight;
    oncreate({ dom }: CVnodeDOM<IPropWidget>): void;
    onupdate(): void;
    private calcHeight;
    protected shouldFloat(layout: LayoutType, value: TProp): string | number | boolean;
    protected labelTranslateY(): string;
    view({ attrs, children }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
