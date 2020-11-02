import { IConfig, TSubset } from "../interface/config";

import { Checkbox } from "./checkbox";

export class Toggle extends Checkbox {

	protected onIcon: keyof TSubset<IConfig, string> = "toggleOnIcn";
	protected offIcon: keyof TSubset<IConfig, string> = "toggleOffIcn";

}
