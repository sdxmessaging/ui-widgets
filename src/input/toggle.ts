import { IConfig, TSubset } from "../interface/config";

import { CheckboxInput } from "./checkbox";

export class ToggleInput extends CheckboxInput {

	protected onIcon: keyof TSubset<IConfig, string> = "toggleOnIcn";
	protected offIcon: keyof TSubset<IConfig, string> = "toggleOffIcn";

}
