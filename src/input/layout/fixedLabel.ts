import { FloatLabel } from "./floatLabel";

export class FixedLabel extends FloatLabel {

	protected override shouldFloat() {
		return true;
	}

}
