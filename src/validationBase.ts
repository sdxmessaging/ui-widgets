import m, { ClassComponent, CVnodeDOM, CVnode, Children } from "mithril";
import { IPropWidget } from "./interface/widget";
import { propInvalid } from "./validation";

export abstract class ValidationBase implements ClassComponent<IPropWidget>{

	protected invalid = false;

	abstract view(vnode: CVnode<IPropWidget>): Children;

	public onupdate({ dom, attrs: { field, value } }: CVnodeDOM<IPropWidget>) {
		const input = dom.querySelector("input") as HTMLInputElement;
		// Validate from custom implementation or input element
		const invalid = propInvalid(field, value()) || !input.checkValidity();
		if (invalid !== this.invalid) {
			this.invalid = invalid;
			m.redraw();
		}
	}

}
