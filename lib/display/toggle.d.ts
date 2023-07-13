import { IConfig, TIcon, TSubset } from "../interface/config";
import { Checkbox } from "./checkbox";
export declare class Toggle extends Checkbox {
    protected readonly onIcon: keyof TSubset<IConfig, TIcon>;
    protected readonly offIcon: keyof TSubset<IConfig, TIcon>;
}
