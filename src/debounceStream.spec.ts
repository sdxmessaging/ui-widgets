import stream from "mithril/stream";
import { DebounceStream } from "./debounceStream";

describe("DebounceStream", () => {

	it("call with last value", (done) => {
		const debounce = new DebounceStream<number>(16);
		const source = stream<number>();
		debounce.pipe(source, (value) => {
			expect(value).toBe(1);
			debounce.destroy();
			done();
		});
		source(3);
		source(2);
		source(1);
	});

});
