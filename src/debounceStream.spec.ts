import { DebounceStream } from "./debounceStream";

describe("DebounceStream", () => {

	it("call with last value", (done) => {
		const debounce = new DebounceStream<number>(16);
		debounce.stream.map((value) => {
			expect(value).toBe(1);
			debounce.destroy();
			done();
		});

		debounce.method(3);
		debounce.method(2);
		debounce.method(1);
	});

});
