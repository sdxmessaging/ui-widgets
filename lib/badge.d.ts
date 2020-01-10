import m, { ClassComponent, CVnode } from "mithril";
interface IBadge {
    readonly label?: string;
    readonly classes?: string;
}
export declare class Badge implements ClassComponent<IBadge> {
    view({ attrs: { label, classes }, children }: CVnode<IBadge>): m.Vnode<any, any>;
}
export {};
