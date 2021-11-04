import { IConfig, TSubset } from "../interface/config";

import { CheckboxInput } from "./checkbox";

export class ToggleInput extends CheckboxInput {

	protected override readonly onIcon: keyof TSubset<IConfig, string> = "toggleOnIcn";
	protected override readonly offIcon: keyof TSubset<IConfig, string> = "toggleOffIcn";

}
