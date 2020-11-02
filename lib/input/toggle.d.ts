import { IConfig, TSubset } from "../interface/config";
import { CheckboxInput } from "./checkbox";
export declare class ToggleInput extends CheckboxInput {
    protected onIcon: keyof TSubset<IConfig, string>;
    protected offIcon: keyof TSubset<IConfig, string>;
}
