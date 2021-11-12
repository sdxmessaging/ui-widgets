import m, { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import { IPropWidget } from "./interface/widget";
import { propInvalid } from "./validation";

export abstract class ValidationBase implements ClassComponent<IPropWidget>{

	protected invalid = false;
	protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select"> = "input";

	abstract view(vnode: CVnode<IPropWidget>): Children;

	public onupdate({ dom, attrs: { field, value } }: CVnodeDOM<IPropWidget>) {
		const input = dom.querySelector(this.selector);
		// Validate from custom implementation or input element
		const invalid = propInvalid(field, value()) || (input ? !input.checkValidity() : false);
		if (invalid !== this.invalid) {
			this.invalid = invalid;
			m.redraw();
		}
	}

}
