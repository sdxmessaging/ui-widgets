import stream from "mithril/stream";
import lodash from "lodash";

export class DebounceStream<T> {

	public readonly method: lodash.DebouncedFunc<(value: T) => void>;
	public readonly stream = stream<T>();

	/** Wrap a mithril stream with lodash debounce, calls to method will update stream after a delay */
	public constructor(wait: number, options?: lodash.DebounceSettings) {
		this.method = lodash.debounce((value: T) => this.stream(value), wait, options);
	}

	public pipe(source: stream<T>, handler: (value: T) => void) {
		source.map(this.method);
		this.stream.map(handler);
		return this;
	}

	public destroy() {
		this.method.cancel();
		this.stream.end(true);
	}
}
