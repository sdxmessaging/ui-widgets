import { IConfig, TSubset } from "../interface/config";
import { CheckboxInput } from "./checkbox";
export declare class ToggleInput extends CheckboxInput {
    protected readonly onIcon: keyof TSubset<IConfig, string>;
    protected readonly offIcon: keyof TSubset<IConfig, string>;
}
