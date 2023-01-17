import m, { ClassComponent, CVnode } from "mithril";
import { joinClasses, theme } from "./theme";
import { IToolTip as ITooltip, MessageDirection } from "./interface/widget";
import { config } from "./config";

function selectDirection(direction: MessageDirection) {
	switch (direction) {
		case MessageDirection.left:
			return {
				left: "initial",
				top: "initial",
				right: "calc(100% + 0.25rem)",
				bottom: "initial",
			};
		case MessageDirection.top:
			return {
				left: "initial",
				top: "initial",
				right: "initial",
				bottom: "calc(100% + 0.25rem)",
			};
		case MessageDirection.topRight:
			return {
				left: "calc(100%)",
				top: "initial",
				right: "initial",
				bottom: "calc(100%)",
			};
		case MessageDirection.topLeft:
			return {
				left: "initial",
				top: "initial",
				right: "calc(100%)",
				bottom: "calc(100%)",
			};
		case MessageDirection.bottom:
			return {
				left: "initial",
				top: "calc(100% + 0.25rem)",
				right: "initial",
				bottom: "initial",
			};
		case MessageDirection.bottomRight:
			return {
				left: "calc(100%)",
				top: "calc(100%)",
				right: "initial",
				bottom: "initial",
			};
		case MessageDirection.bottomLeft:
			return {
				left: "initial",
				top: "calc(100%)",
				right: "calc(100%)",
				bottom: "initial",
			};
		default:
			return {
				left: "calc(100% + 0.25rem)",
				top: "initial",
				right: "initial",
				bottom: "initial",
			};
	}
}

export class Tooltip implements ClassComponent<ITooltip> {

	private show = false;

	public view({ attrs: {
		message,
		direction = MessageDirection.right,
		icon = config.tooltipIcon
	} }: CVnode<ITooltip>) {
		return m("div", {
			class: theme.tooltipWrapper
		}, [
			m(".flex.items-center.justify-center", {
				class: theme.tooltipIconBackground,
				onmouseenter: () => this.show = true,
				onmouseleave: () => this.show = false
			}, [
				m("i", {
					class: joinClasses([icon, theme.tooltipIcon]),
				}),
				m("span", {
					class: joinClasses([theme.tooltipMessage, this.show ? "db" : "dn"]),
					style: selectDirection(direction)
				},
				[
					message.map((item) => m('div.mv2', item))
				]
				)
			])
		]);
	}

}
