import uglify from "rollup-plugin-uglify";

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
	uglify.uglify({
		// Disable compression (enabled: 2% smaller, 3-4 times slower)
		compress: false
	})
];

export default {
	input: "lib/index.js",
	external,
	output: {
		name: "ui-widgets",
		dir: "dist",
		format: "umd",
		globals
	},
	context,
	plugins
};
