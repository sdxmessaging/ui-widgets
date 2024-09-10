import m, { ClassComponent, CVnode } from "mithril";
import { IPropLayoutWidget, LayoutType, TProp } from "../../interface/widget";
export declare class FloatLabel implements ClassComponent<IPropLayoutWidget> {
    protected shouldFloat(layout: LayoutType, value: TProp, focus: boolean, readonly?: boolean): boolean;
    protected labelTranslateY(): string;
    private labelContent;
    view({ attrs, children }: CVnode<IPropLayoutWidget>): m.Vnode<any, any>;
}
