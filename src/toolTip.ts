import m, { ClassComponent, CVnode } from "mithril";
import { joinClasses, theme } from "./theme";
import { IToolTip, MessageDirection } from "./interface/widget";

function selectDirection(direction: MessageDirection) {
	switch (direction) {
		case MessageDirection.left:
			return {
				left: 'initial',
				top: 'initial',
				right: 'calc(100% + 0.25rem)',
				bottom: 'initial',
			};
		case MessageDirection.top:
			return {
				left: 'initial',
				top: 'initial',
				right: 'initial',
				bottom: 'calc(100% + 0.25rem)',
			};
		case MessageDirection.topRight:
			return {
				left: 'calc(100%)',
				top: 'initial',
				right: 'initial',
				bottom: 'calc(100%)',
			};
		case MessageDirection.topLeft:
			return {
				left: 'initial',
				top: 'initial',
				right: 'calc(100%)',
				bottom: 'calc(100%)',
			};
		case MessageDirection.bottom:
			return {
				left: 'initial',
				top: 'calc(100% + 0.25rem)',
				right: 'initial',
				bottom: 'initial',
			};
		case MessageDirection.bottomRight:
			return {
				left: "calc(100%)",
				top: 'calc(100%)',
				right: 'initial',
				bottom: 'initial',
			};
		case MessageDirection.bottomLeft:
			return {
				left: 'initial',
				top: 'calc(100%)',
				right: 'calc(100%)',
				bottom: 'initial',
			};
		default:
			return {
				left: 'calc(100% + 0.25rem)',
				top: 'initial',
				right: 'initial',
				bottom: 'initial',
			};
	}
}

export class ToolTip implements ClassComponent<IToolTip> {
	private show = false;
	public view({ attrs: {
		message,
		direction = MessageDirection.right,
		icon = 'fa-info'
	} }: CVnode<IToolTip>) {
		return m("div", {
			class: theme.toolTipWrapper
		}, [
			m(".flex.items-center.justify-center", {
				class: theme.toolTipIconBackground,
				onmouseenter: () => {
					this.show = true;
				},
				onmouseleave: () => {
					this.show = false;
				}
			}, [
				m(`i.fas.${icon}`, {
					class: theme.toolTipIcon,
				}),
				m("span", {
					class: joinClasses([theme.toolTipMessage, this.show ? "db" : "dn"]),
					style: selectDirection(direction)
				},
					message
				)
			])
		]);
	}

}
