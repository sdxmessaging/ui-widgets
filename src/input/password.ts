import lodash from "lodash";
import m, { ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IPropWidget, TProp } from "../interface/widget";

import { getIcon, inpCls, lblCls } from "../theme";
import { config } from "../config";
import { getEnabledClass, getLabel, setValue } from "../utils";

import { CheckboxInput } from "./checkbox";

export class PasswordInput implements ClassComponent<IPropWidget>  {

	private showPassword: stream<TProp> = stream<TProp>(false);
	private passwordStrength: stream<TProp> = stream<TProp>(false);
	public view({ attrs: { field, value } }: CVnode<IPropWidget>) {
		const {
			label, id, name = id, title = label, placeholder,
			maxlength, minlength, required,
			readonly, disabled, autofocus, autocomplete,
			instant, containerClass, classes = "", displayPasswordStrength
		} = field;
		console.log(displayPasswordStrength);
		return [
			m(".flex.justify-between", [
				getLabel(id, label, required),
				m(CheckboxInput, {
					field: {
						id: "showpass",
						label: config.showPassTxt,
						type: "checkbox",
						readonly, disabled,
						containerClass: `mb1 ${lblCls()}`
					},
					value: this.showPassword
				},
				)
			]),
			m(".w-100.mb10.relative", {
				class: containerClass
			}, 
				m("input.input-reset.border-box.w-100", {
					id, name, title, placeholder,
					type: this.showPassword() ? "text" : "password",
					maxlength, minlength, required,
					readonly, disabled, autofocus, autocomplete,
					value: value(),
					class: `${getEnabledClass(disabled, true)} ${inpCls()} ${classes}`,
					// Safari quirk
					autocorrect: "off",
					// Update value on change or input ("instant" option)
					[instant ? "oninput" : "onchange"]: setValue(value),
					onkeyup: this.checkPasswordStrength(value)
				}),
				m("i.pa1.absolute.bottom-0.right-0.pointer.dim", {
					class: getIcon(this.showPassword() ? config.hidePassIcn : config.showPassIcn),
					onclick: () => {
						this.showPassword(!this.showPassword());
					}
				}),
			),
			
			(displayPasswordStrength ? 
				m(".w-100.dib", lodash.map(this.returnPasswordStrengthList(), (val) => {
					console.log(val);
					return m(`div.h1.w-20.dib.${this.checkPasswordStrength(value) >= val.value ? val.background : "bg-grey"}`, "")
				}))	: null),
	
				(displayPasswordStrength ? 
					m(".w-100.f5", this.returnPasswordStrengthString(this.checkPasswordStrength(value)))
				: null)

		];
	}

	returnPasswordStrengthString(value: number) {
		let passwordStrength = "";
		switch(value) {
			case 0: {
				passwordStrength = "Very Weak";
				break;
			}
			case 1: {
				passwordStrength = "Weak";
				break;
			}
			case 2: {
				passwordStrength = "Average";
				break;
			}
			case 3: {
				passwordStrength = "Strong";
				break;
			}
			case 4: {
				passwordStrength = "Very Strong";
				break;
			}
		}
		return passwordStrength;
	}

	returnPasswordStrengthList() {
		return [
			{
				value: 0,
				background: "bg-dark-red"
			}, 
			{
				value: 1,
				background: "bg-orange"

			}, 
			{
				value: 2,
				background: "bg-yellow"

			}, 
			{
				value: 3,
				background: "bg-light-green"
			}, 
			{
				value: 4,
				background: "bg-green"
			}, 
			
		]
	}

	checkPasswordStrength(value: any) {
		let totalScore = 0;
		if(value()) {
			if (value().length >= 8) {
				totalScore = totalScore + 1;
			} 
			if (value().length >= 24) {
				totalScore = totalScore + 1;
			}
			if (/\d/.test(value())) {
				totalScore = totalScore + 1;
			}
			if (/^(?=.*[!@#$%^&*])$/) {
				totalScore = totalScore + 1;
			}
		}
		this.passwordStrength(totalScore)
		return totalScore;
	}

}
