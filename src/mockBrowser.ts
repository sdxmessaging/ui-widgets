interface ITestGlobal extends NodeJS.Global {
	window: Window;
	document: Document;
}

// tslint:disable-next-line no-var-requires
(global as ITestGlobal).window = require("mithril/test-utils/browserMock")();
(global as ITestGlobal).document = (global as ITestGlobal).window.document;
