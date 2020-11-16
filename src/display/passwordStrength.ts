import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getDisplayLabel } from "../utils";

export function scorePassword(value: string) {
	let totalScore = 0;
	if (value) {
		if (value.length >= 8) {
			totalScore = totalScore + 1;
		}
		if (value.length >= 24) {
			totalScore = totalScore + 1;
		}
		if (/\d/.test(value)) {
			totalScore = totalScore + 1;
		}
		if (/^(?=.*[!@#$%^&*])$/.test(value)) {
			totalScore = totalScore + 1;
		}
	}
	return totalScore;
}

export function passwordStrengthStr(value: number) {
	switch (value) {
		case 0: {
			return "Very Weak";
		}
		case 1: {
			return "Weak";
		}
		case 2: {
			return "Average";
		}
		case 3: {
			return "Strong";
		}
		case 4: {
			return "Very Strong";
		}
	}
	return "";
}

const passwordStrength = [{
	value: 0,
	background: "bg-dark-red"
}, {
	value: 1,
	background: "bg-orange"
}, {
	value: 2,
	background: "bg-yellow"
}, {
	value: 3,
	background: "bg-light-green"
}, {
	value: 4,
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
