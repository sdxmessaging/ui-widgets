const o = require("ospec");

import { config, updateConfig } from "./config";

o.spec("Config", () => {

	o("updateConfig", () => {
		updateConfig({
			imageMaxSize: 640
		});
		o(config.imageMaxSize).equals(640);
	});

});
