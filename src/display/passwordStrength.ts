import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getDisplayLabel } from "../utils";

function countMatches(input: string, pattern: RegExp) {
	return (input.match(pattern) || []).length;
}

export function scorePassword(value: string) {
	let totalScore = 0;
	// Min req for password is 8 characters
	if (value.length >= 8) {
		totalScore = 1;
		// Extra points for longer password
		if (value.length >= 24) {
			totalScore = totalScore + 1;
		}
		// At least 2 upper and 3 lower case characters
		if (countMatches(value, /[A-Z]/g) > 1 && countMatches(value, /[a-z]/g) > 2) {
			totalScore = totalScore + 1;
		}
		// At least 2 digits
		if (countMatches(value, /\d/g) > 1) {
			totalScore = totalScore + 1;
		}
		// At least one special character
		if (countMatches(value, /[!"£%^@#$&*]/g) > 0) {
			totalScore = totalScore + 1;
		}
	}
	return totalScore;
}

export function passwordStrengthStr(value: number) {
	switch (value) {
		case 0: {
			return "Invalid";
		}
		case 1: {
			return "Very Weak";
		}
		case 2: {
			return "Weak";
		}
		case 3: {
			return "Average";
		}
		case 4: {
			return "Strong";
		}
		case 5: {
			return "Very Strong";
		}
	}
	return "";
}

const passwordStrength = [{
	value: 1,
	background: "bg-dark-red"
}, {
	value: 2,
	background: "bg-orange"
}, {
	value: 3,
	background: "bg-yellow"
}, {
	value: 4,
	background: "bg-light-green"
}, {
	value: 5,
	background: "bg-green"
}];

export class PasswordStrength implements ClassComponent<IPropWidget> {

	private passwordScore!: stream<number>;

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		this.passwordScore = (value as stream<TProp>)
			.map((newPass) => scorePassword(String(newPass)));
	}

	public onremove() {
		this.passwordScore.end();
	}

	public view({ attrs: { field } }: CVnode<IPropWidget>) {
		const { label } = field;
		return m(".flex.flex-column", [
			getDisplayLabel(label),
			m(".flex.mt1", lodash.map(passwordStrength, (val) => m(".h1.w-20", {
				class: this.passwordScore() >= val.value ? val.background : "bg-transparent"
			}))),
			m("span.f5.truncate", passwordStrengthStr(this.passwordScore()))
		]);
	}
}
