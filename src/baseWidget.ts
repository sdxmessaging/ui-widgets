import m, { CVnode, CVnodeDOM, Children, ClassComponent } from "mithril";
import { IPropWidget } from "./interface/widget";

export abstract class BaseWidget<T extends IPropWidget> implements ClassComponent<T> {

	private _inputElement!: HTMLInputElement;

	private _focus = false;
	// TODO Default to false once agreement on validation state showing
	private _touch = true;
	private _valid = true;

	private unboundTouch() {
		this._touch = true;
		this._focus = false;
		m.redraw();
	}
	/**
	 * Mark the widget as "touched",
	 * automatically occurs when user focus leaves the widget
	 * or when the widget stream is updated to a non-null value
	 */
	protected touch = this.unboundTouch.bind(this);

	private unboundFocus() {
		this._focus = true;
		m.redraw();
	}
	private boundFocus = this.unboundFocus.bind(this);

	/** Widget currently in focus */
	protected get inFocus() {
		return this._focus;
	}

	/** Widget fails validation */
	protected get invalid() {
		return !this._valid;
	}

	protected readonly selector: keyof Pick<HTMLElementTagNameMap, "input" | "textarea" | "select"> = "input";

	// Validity may change due to user input or widget validation attributes
	private checkValidity() {
		if (this._touch) {
			const validity = this._inputElement.checkValidity();
			if (validity !== this._valid) {
				this._valid = validity;
				m.redraw();
			}
		}
	}

	abstract view(vnode: CVnode<T>): Children;

	public oncreate({ dom, attrs: { value } }: CVnodeDOM<T>) {
		dom.addEventListener("focusin", this.boundFocus);
		dom.addEventListener("focusout", this.touch);
		this._inputElement = dom.querySelector(this.selector) as HTMLInputElement;
		// Pre-populated value stream indicates this input has already been touched and should be validated as normal
		if (value() != null) {
			this._touch = true;
		}
		this.checkValidity();
	}

	public onupdate({ attrs: { value } }: CVnodeDOM<T>) {
		// Any stream change is considered user input
		if (value() != null && this._touch === false) {
			this.touch();
		}
		this.checkValidity();
	}

	public onbeforeremove({ dom }: CVnodeDOM<T>) {
		dom.removeEventListener("focusin", this.boundFocus);
		dom.removeEventListener("focusout", this.touch);
	}

}
