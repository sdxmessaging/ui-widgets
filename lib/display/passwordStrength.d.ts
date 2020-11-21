import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare function scorePassword(value: string): number;
export declare function passwordStrengthStr(value: number): "" | "Invalid" | "Very Weak" | "Weak" | "Average" | "Strong" | "Very Strong";
export declare class PasswordStrength implements ClassComponent<IPropWidget> {
    private passwordScore;
    oninit({ attrs: { value } }: CVnode<IPropWidget>): void;
    onremove(): void;
    view({ attrs: { field } }: CVnode<IPropWidget>): m.Vnode<any, any>;
}
