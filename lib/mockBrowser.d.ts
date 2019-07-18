/// <reference types="node" />
interface ITestGlobal extends NodeJS.Global {
    window: Window;
    document: Document;
}
