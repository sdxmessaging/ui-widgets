import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getIcon, inpCls } from "../theme";
import { config } from "../config";
import { getEnabledClass, getLabel, setValue } from "../utils";

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

export class PasswordInput implements ClassComponent<IPropWidget> {

	private showPassword: stream<TProp> = stream<TProp>(false);
	private passwordStrength!: stream<number>;

	public oninit({ attrs: { value } }: CVnode<IPropWidget>) {
		this.passwordStrength = (value as stream<TProp>)
			.map((newPass) => scorePassword(String(newPass)));
	}

	public onremove() {
		this.passwordStrength.end();
	}

	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			maxlength, minlength, required,
			readonly, disabled, autofocus, autocomplete,
			instant, containerClass, classes = "", displayPasswordStrength
		} = field;
		return [
			getLabel(id, label, required),
			m(".w-100.flex.items-center", {
				class: containerClass
			},
				m("input.input-reset.border-box.flex-auto.bg-transparent.bn", {
					id, name, title, placeholder,
					type: this.showPassword() ? "text" : "password",
					maxlength, minlength, required,
					readonly, disabled, autofocus, autocomplete,
					value: value(),
					class: `${getEnabledClass(disabled, true)} ${inpCls()} ${classes}`,
					// Safari quirk
					autocorrect: "off",
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value)
				}),
				m("i.ml1.pa1.fa-fw.pointer.dim", {
					title: config.showPassTxt,
					class: getIcon(this.showPassword() ? config.hidePassIcn : config.showPassIcn),
					onclick: () => this.showPassword(!this.showPassword())
				}),
			),

			displayPasswordStrength ? [
				m(".w-100.dib", lodash.map(passwordStrength, (val) => m("div.h1.w-20.dib", {
					class: this.passwordStrength() >= val.value ? val.background : "bg-grey"
				}))),
				m(".w-100.f5", passwordStrengthStr(this.passwordStrength()))
			] : null
		];
	}

}
