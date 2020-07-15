import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class DateInput implements ClassComponent<IPropWidget> {
    private day;
    private month;
    private year;
    private date;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    onremove(): void;
    view({ attrs: { field } }: CVnode<IPropWidget>): (m.Vnode<any, any> | null)[];
}
