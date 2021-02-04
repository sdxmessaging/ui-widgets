import { config, updateConfig } from "./config";

describe("Config", () => {

	test("updateConfig", () => {
		updateConfig({
			imageMaxSize: 640
		});
		expect(config.imageMaxSize).toBe(640);
	});

});
