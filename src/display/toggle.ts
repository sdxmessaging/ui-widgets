import { IConfig, TSubset } from "../interface/config";

import { Checkbox } from "./checkbox";

export class Toggle extends Checkbox {

	protected override onIcon: keyof TSubset<IConfig, string> = "toggleOnIcn";
	protected override offIcon: keyof TSubset<IConfig, string> = "toggleOffIcn";

}
