import stream from "mithril/stream";
import lodash from "lodash";
export declare class DebounceStream<T> {
    readonly method: lodash.DebouncedFunc<(value: T) => void>;
    readonly stream: stream<T>;
    /** Wrap a mithril stream with lodash debounce, calls to method will update stream after a delay */
    constructor(wait: number, options?: lodash.DebounceSettings);
    pipe(source: stream<T>, handler: (value: T) => void): this;
    destroy(): void;
}
