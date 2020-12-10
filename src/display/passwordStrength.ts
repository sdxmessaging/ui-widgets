import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getDisplayLabel } from "../utils";

export function scorePassword(value: string) {
	let totalScore = 0;
	if (value) {
		// Min req for password is 8 characters
		if (value.length >= 8) {
			totalScore = 1;
			// Extra points for longer password
			if (value.length >= 24) {
				totalScore = totalScore + 1;
			}
			// Check does string have 2 upper case and 3 lower case
			if (/(?=.*[A-Z].*[A-Z])/.test(value) && /(?=.*[a-z].*[a-z].*[a-z])/.test(value)) {
				totalScore = totalScore + 1;
			}
			// Ensure string has 2 digits
			if (/(?=.*[0-9].*[0-9])/.test(value)) {
				totalScore = totalScore + 1;
			}
			// Ensure string has one special character
			if (/(?=.*[!"£%^@#$&*])/.test(value)) {
				totalScore = totalScore + 1;
			}
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
		const { label, classes = "", style } = field;
		return m(".flex.flex-column", {
			class: classes,
			style
		}, [
			getDisplayLabel(label),
			m(".flex.mt1", lodash.map(passwordStrength, (val) => m(".h1.w-20", {
				class: this.passwordScore() >= val.value ? val.background : "bg-transparent"
			}))),
			m("span.f5.truncate", passwordStrengthStr(this.passwordScore()))
		]);
	}
}
