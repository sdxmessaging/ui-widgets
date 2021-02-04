import m from "mithril";
import stream from "mithril/stream";

import { Trusted } from "./trusted";

describe("Trusted", () => {

	test("text", () => {
		const root = window.document.createElement("div");
		const value = stream<string>("<h1>Title</h1><p>Content</p>");
		m.mount(root, {
			view: () => m(Trusted, {
				field: {
					id: "test"
				},
				value
			})
		});
		expect(root.childNodes.length).toBe(1);
		const content = root.childNodes[0].childNodes;
		// 2 trusted elements
		expect(content.length).toBe(2);
	});

});
