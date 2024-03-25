import { PageController } from "./pageController";

interface ITestData {
	readonly id: number;
}

function generate(offset: number, limit: number): Promise<ITestData[]> {
	return Promise.resolve(Array.from({ length: limit }, (_, idx) => ({
		id: offset + idx
	})));
}

describe("PageController", () => {

	test("single", (done) => {
		const ctrl = PageController.single(() => generate(0, 128));
		// Minor delay for loading method
		setTimeout(() => {
			// 2 pages of 100 rows
			expect(ctrl.canPageBackward).toBe(false);
			expect(ctrl.canPageForward).toBe(true);
			expect(ctrl.pageCount).toBe(1);
			// Advance to next page
			ctrl.pageRelative(1);
			expect(ctrl.canPageBackward).toBe(true);
			expect(ctrl.canPageForward).toBe(false);
			done();
		}, 16);
	});

});
