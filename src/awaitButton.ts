import m, { CVnode, ClassComponent } from "mithril";
import { Button } from "./button";
import { IButton, IMithrilEvent } from "./interface/widget";

interface IAwaitButton extends IButton {
	onclick(evt: IMithrilEvent): Promise<unknown>;
}

export class AwaitButton implements ClassComponent<IAwaitButton> {

	private _awaiting = false;

	public view({ attrs }: CVnode<IAwaitButton>) {
		const { disabled, onclick } = attrs;
		return m(Button, {
			...attrs,
			disabled: this._awaiting || disabled,
			onclick: (evt: IMithrilEvent) => {
				this._awaiting = true;
				onclick(evt).finally(() => {
					this._awaiting = false;
					m.redraw();
				});
			}
		});
	}

}
