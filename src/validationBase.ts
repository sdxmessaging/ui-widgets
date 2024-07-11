import m, { CVnode, CVnodeDOM, Children, ClassComponent } from "mithril";
import { IPropWidget } from "./interface/widget";

export abstract class ValidationBase<T extends IPropWidget> implements ClassComponent<T>{

	private _inputElement!: HTMLInputElement;

	private _touch = false;
	private unboundTouch() {
		this._touch = true;
		this._inputElement.removeEventListener("blur", this.touch);
	}
	protected touch = this.unboundTouch.bind(this);

	private _valueValid = true;
	protected get invalid() {
		return !this._valueValid;
	}

	protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select"> = "input";

	// Validity may change due to user input or widget validation attributes
	private checkValidity() {
		if (this._touch) {
			const validity = this._inputElement.checkValidity();
			if (validity !== this._valueValid) {
				this._valueValid = validity;
				m.redraw();
			}
		}
	}

	abstract view(vnode: CVnode<T>): Children;

	public oncreate({ dom }: CVnodeDOM<T>) {
		this._inputElement = dom.querySelector(this.selector) as HTMLInputElement;
		this._inputElement.addEventListener("blur", this.touch);
		this.checkValidity();
	}

	public onupdate() {
		this.checkValidity();
	}

}
