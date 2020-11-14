import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import { IPropWidget, TProp } from "../interface/widget";
import stream from "mithril/stream";
import { getDisplayLabel } from "../utils";

function scorePassword(value: string) {
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

function passwordStrengthStr(value: number) {
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
    public view({attrs: { field } }: CVnode<IPropWidget>) {
        const { label } = field;
        return [
            getDisplayLabel(label),
            m(".w-100.dib", lodash.map(passwordStrength, (val) => m("div.h1.w-20.dib", {
                    class: this.passwordScore() >= val.value ? val.background : "bg-grey"
                }))),
                m(".w-100.f5", passwordStrengthStr(this.passwordScore()))
            ]

    }
}