import m, { ClassComponent, CVnode, CVnodeDOM } from "mithril";
import { IPropLayoutWidget, LayoutType, TProp } from "../../interface/widget";
export declare class FloatLabel implements ClassComponent<IPropLayoutWidget> {
    private focus;
    private focusIn;
    private focusOut;
    private inputWrapper;
    private wrapperHeight;
    oncreate({ dom }: CVnodeDOM<IPropLayoutWidget>): void;
    onupdate(): void;
    private calcHeight;
    protected shouldFloat(layout: LayoutType, value: TProp, readonly?: boolean): boolean;
    protected labelTranslateY(): string;
    private labelContent;
    view({ attrs, children }: CVnode<IPropLayoutWidget>): m.Vnode<any, any>;
}
