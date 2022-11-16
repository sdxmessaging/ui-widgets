import { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import stream from "mithril/stream";
import { IPropWidget } from "./interface/widget";

export abstract class ValidationBase<T extends IPropWidget> implements ClassComponent<T>{

	// Default stream for use pre-oncreate
	private valueValid = stream<boolean>();
	// Stream must be active and explicitly stating validation failed
	protected get invalid() {
		return this.valueValid() === false;
	}
	protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select"> = "input";

	abstract view(vnode: CVnode<T>): Children;

	public oncreate({ dom, attrs: { value, xform = value } }: CVnodeDOM<T>) {
		const input = dom.querySelector(this.selector);
		this.valueValid = xform.map((newValue) => {
			if (input) {
				// Set input value, stream may change from outside of widget
				input.value = String(newValue);
				return input.checkValidity();
			}
			return true;
		});
	}

	public onremove() {
		this.valueValid.end(true);
	}

}
