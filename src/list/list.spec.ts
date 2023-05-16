import m, { Component, Vnode } from "mithril";

import { List } from "./list";
import { ListController } from "./listController";

interface ITestData {
	readonly id: number;
}

describe("List", () => {

	const testData: ITestData[] = Array.from({ length: 200 }, (_, idx) => ({
		id: idx
	}));
	const controller = ListController.single(() => Promise.resolve(testData));
	const component: Component<ITestData> = {
		view: ({ attrs: { id } }: Vnode<ITestData>) => m("div", id)
	};

	test("create and scroll", (done) => {
		const root = window.document.createElement("div");
		m.mount(root, {
			view: () => m(List<ITestData>, {
				classes: "h1",
				controller,
				component
			})
		});
		expect(root.childNodes.length).toBe(1);
		const container = root.firstChild as HTMLElement;
		expect(container).toBeDefined();
		// 3 initial pages
		expect(container.childNodes.length).toBe(3);
		// Test debounced scroll handler
		const scrollEvent = new Event("scroll");
		Object.defineProperty(scrollEvent, "target", {
			get: () => container
		});
		container.dispatchEvent(scrollEvent);
		setTimeout(() => {
			// Force scroll to bottom of visible area, should fetch in 2 more pages
			controller.updateScroll(1);
			m.redraw.sync();
			// 1 hidden and 4 active pages
			expect(container.childNodes.length).toBe(5);
			done();
		}, 66);
	});

});
