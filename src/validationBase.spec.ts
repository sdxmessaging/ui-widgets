import { Children, CVnodeDOM } from "mithril";
import { IPropWidget } from "./interface/widget";
import { ValidationBase } from "./validationBase";
import { Label } from "./input/label"
import stream from "mithril/stream";

// Talk to michael about testing this.
class ValidationTest extends ValidationBase {

    public get getInvalid(): boolean {
        return this.invalid;
    }

    view(): Children {
        throw new Error("Method not implemented.");
    }

}


test("onupdate-propInvalid", () => {
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
