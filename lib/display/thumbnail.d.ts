import m, { ClassComponent, CVnode } from "mithril";
import { IThumbnailArgs } from "../interface/widget";
export declare class Thumbnail implements ClassComponent<IThumbnailArgs> {
    view({ children, attrs }: CVnode<IThumbnailArgs>): m.Vnode<any, any>;
}
