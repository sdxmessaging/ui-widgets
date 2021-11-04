import { IConfig, TSubset } from "../interface/config";

import { Checkbox } from "./checkbox";

export class Toggle extends Checkbox {

	protected override readonly onIcon: keyof TSubset<IConfig, string> = "toggleOnIcn";
	protected override readonly offIcon: keyof TSubset<IConfig, string> = "toggleOffIcn";

}
