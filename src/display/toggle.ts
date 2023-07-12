import { IConfig, TIcon, TSubset } from "../interface/config";

import { Checkbox } from "./checkbox";

export class Toggle extends Checkbox {

	protected override readonly onIcon: keyof TSubset<IConfig, TIcon> = "toggleOnIcn";
	protected override readonly offIcon: keyof TSubset<IConfig, TIcon> = "toggleOffIcn";

}
