import terser from "@rollup/plugin-terser";

const globals = {
	"flatpickr": "flatpickr",
	"lodash": "_",
	"mithril": "m",
	"mithril/stream": "m.stream",
	"signature_pad": "SignaturePad",
	"luxon": "luxon"
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
	plugins
}];
