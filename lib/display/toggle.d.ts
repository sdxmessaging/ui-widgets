import { IConfig, TSubset } from "../interface/config";
import { Checkbox } from "./checkbox";
export declare class Toggle extends Checkbox {
    protected readonly onIcon: keyof TSubset<IConfig, string>;
    protected readonly offIcon: keyof TSubset<IConfig, string>;
}
