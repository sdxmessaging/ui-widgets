import { IConfig, TSubset } from "../interface/config";

import { CheckboxInput } from "./checkbox";

export class ToggleInput extends CheckboxInput {

	protected override onIcon: keyof TSubset<IConfig, string> = "toggleOnIcn";
	protected override offIcon: keyof TSubset<IConfig, string> = "toggleOffIcn";

}
