import { terser } from "rollup-plugin-terser";

export const globals = {
	"lodash": "_",
	"mithril": "m",
	"mithril/stream": "m.stream",
	"signature_pad": "SignaturePad"
};

export const external = Object.keys(globals);

const plugins = [];
if (process.env.MINIFY) {
	plugins.push(terser({
		compress: false
	}));
}

export default [{
	input: "lib/index.js",
	external,
	output: {
		dir: "dist",
		format: "esm",
		globals
	},
	context: "this",
	plugins
}, {
	input: "lib/index.js",
	external,
	output: {
		name: "uiWidgets",
		dir: "umd",
		format: "umd",
		globals
	},
	context: "this",
	plugins
}];
