interface ITestGlobal extends NodeJS.Global {
	window: Window;
	document: Document;
	requestAnimationFrame(callback: any): any;
}

// tslint:disable-next-line no-var-requires
(global as ITestGlobal).window = require("mithril/test-utils/browserMock")();
(global as ITestGlobal).document = (global as ITestGlobal).window.document;
// setImmediate is a "good enough" replacement for mithril usage
(global as ITestGlobal).requestAnimationFrame = setImmediate;
