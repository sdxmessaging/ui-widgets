import { terser } from "rollup-plugin-terser";

const globals = {
	"lodash": "_",
	"mithril": "m",
	"mithril/stream": "m.stream",
	"signature_pad": "SignaturePad"
};

const external = Object.keys(globals);

const banner = `/* @preserve built on: ${new Date().toJSON()} */`;

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
		banner,
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
		banner,
		name: "uiWidgets",
		dir: "umd",
		format: "umd",
		globals
	},
	context: "this",
	plugins
}];
