import m, { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import { IPropWidget } from "./interface/widget";

export abstract class ValidationBase<T extends IPropWidget> implements ClassComponent<T>{

	private _inputElement!: HTMLInputElement;
	private _valueValid = true;
	protected get invalid() {
		return !this._valueValid;
	}
	protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select"> = "input";

	// Validity may change due to user input or widget validation attributes
	private checkValidity() {
		const valid = this._inputElement.checkValidity();
		if (valid !== this._valueValid) {
			this._valueValid = valid;
			m.redraw();
		}
	}

	abstract view(vnode: CVnode<T>): Children;

	public oncreate({ dom }: CVnodeDOM<T>) {
		this._inputElement = dom.querySelector(this.selector) as HTMLInputElement;
		this.checkValidity();
	}

	public onupdate() {
		this.checkValidity();
	}

}
