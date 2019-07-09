import { globals, external, context } from "./rollup.config";

export default {
	input: "lib/example.js",
	external,
	output: {
		dir: "dist",
		format: "iife",
		globals
	},
	context
};
