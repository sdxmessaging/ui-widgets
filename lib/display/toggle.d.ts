import { IConfig, TSubset } from "../interface/config";
import { Checkbox } from "./checkbox";
export declare class Toggle extends Checkbox {
    protected onIcon: keyof TSubset<IConfig, string>;
    protected offIcon: keyof TSubset<IConfig, string>;
}
