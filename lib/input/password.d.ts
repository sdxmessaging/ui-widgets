import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget } from "../interface/widget";
export declare class PasswordInput implements ClassComponent<IPropWidget> {
    private showPassword;
    private passwordStrength;
    view({ attrs: { field, value } }: CVnode<IPropWidget>): (m.Vnode<any, any> | null)[];
    returnPasswordStrengthString(value: number): string;
    returnPasswordStrengthList(): {
        value: number;
        background: string;
    }[];
    checkPasswordStrength(value: any): number;
}
