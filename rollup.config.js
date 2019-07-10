import { terser } from "rollup-plugin-terser";

export const globals = {
	"lodash": "_",
	"mithril": "m",
	"mithril/stream": "m.stream",
	"signature_pad": "SignaturePad"
};

export const external = Object.keys(globals);

// Fix warning from TypeScript derived es5 classes
export const context = "this";

const plugins = [
	terser({
		compress: false
	})
];

export default {
	input: "lib/index.js",
	external,
	output: {
		dir: "dist",
		format: "esm",
		globals
	},
	context,
	plugins
};
