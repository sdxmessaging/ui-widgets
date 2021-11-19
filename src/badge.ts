import m, { ClassComponent, CVnode } from "mithril";

interface IBadge {
	readonly label?: string;
	readonly classes?: string;
}

export class Badge implements ClassComponent<IBadge> {

	public view({ attrs: { label, classes = "bg-red" }, children }: CVnode<IBadge>) {
		return m(".relative.dib", [
			children,
			label ? m("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80", {
				class: `${classes} minw-65rem`
			}, label) : null
		]);
	}

}
