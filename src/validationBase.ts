import { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import stream from "mithril/stream";
import { IPropWidget } from "./interface/widget";

export abstract class ValidationBase<T extends IPropWidget> implements ClassComponent<T>{

	private checkValue?: stream<void>;
	private valueValid = true;
	protected get invalid() {
		return !this.valueValid;
	}
	protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select"> = "input";

	abstract view(vnode: CVnode<T>): Children;

	public oncreate({ dom, attrs: { value, xform = value } }: CVnodeDOM<T>) {
		const input = dom.querySelector(this.selector);
		if (input) {
			this.checkValue = xform.map((newValue) => {
				// Set input value, stream may change from outside of widget
				input.value = String(newValue);
				this.valueValid = input.checkValidity();
			});
			this.valueValid = input.checkValidity();
		}
	}

	public onremove() {
		this.checkValue?.end(true);
	}

}
