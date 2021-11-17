import { Children, CVnodeDOM } from "mithril";
import { IPropWidget } from "./interface/widget";
import { ValidationBase } from "./validationBase";
import { Label } from "./input/label";
import stream from "mithril/stream";

// Talk to michael about testing this.
class ValidationTest extends ValidationBase {

    public get getInvalid(): boolean {
        return this.invalid;
    }

    public set setInvalid(invalid : boolean) {
        this.invalid = invalid;
    }

    view(): Children {
        throw new Error("Method not implemented.");
    }

}


describe("onupdate", () => {
    test( "remains invalid", () => {
        const vbase = new ValidationTest();
        vbase.setInvalid = true;
        const root : Element = window.document.createElement("label");
        const attrs = {value: stream<string>("hello"), field: {id: "test", maxlength: 2}};
        const label = new Label();
        const cv : CVnodeDOM<IPropWidget> = {
            dom: root, attrs: attrs,
            tag: "", state: label
        };
        expect(vbase.getInvalid).toBe(true);
        vbase.onupdate(cv);
        expect(vbase.getInvalid).toBe(true);
    });
    test( "remains valid", () => {
        const vbase = new ValidationTest();
        vbase.setInvalid = false;
        const root : Element = window.document.createElement("label");
        const attrs = {value: stream<string>("hello"), field: {id: "test", maxlength: 10}};
        const label = new Label();
        const cv : CVnodeDOM<IPropWidget> = {
            dom: root, attrs: attrs,
            tag: "", state: label
        };
        expect(vbase.getInvalid).toBe(false);
        vbase.onupdate(cv);
        expect(vbase.getInvalid).toBe(false);
    });
    test( "becomes valid", () => {
        const vbase = new ValidationTest();
        vbase.setInvalid = true;
        const root : Element = window.document.createElement("label");
        const attrs = {value: stream<string>("hello"), field: {id: "test", maxlength: 10}};
        const label = new Label();
        const cv : CVnodeDOM<IPropWidget> = {
            dom: root, attrs: attrs,
            tag: "", state: label
        };
        expect(vbase.getInvalid).toBe(true);
        vbase.onupdate(cv);
        expect(vbase.getInvalid).toBe(false);
    });
    test("become invalid", ()=> {
        const vbase = new ValidationTest();
        const root : Element = window.document.createElement("label");
        const attrs = {value: stream<string>("hello"), field: {id: "test", maxlength: 2}};
        const label = new Label();
        const cv : CVnodeDOM<IPropWidget> = {
            dom: root, attrs: attrs,
            tag: "", state: label
        };
        expect(vbase.getInvalid).toBe(false);
        vbase.onupdate(cv);
        expect(vbase.getInvalid).toBe(true);
    });
});
