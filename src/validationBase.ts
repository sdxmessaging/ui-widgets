import m, { ClassComponent, CVnodeDOM, CVnode } from "mithril";
import { IPropWidget } from ".";
import { propInvalid } from "./validation";

export class ValidationBase implements ClassComponent<IPropWidget>{

    protected invalid = false;

    public view(vnode: CVnode<IPropWidget>) {
        vnode;
        throw new Error("Method not implemented.");
    }

    public onupdate({ dom , attrs : {field, value}} : CVnodeDOM<IPropWidget>){

        const input = dom.querySelector("input") as HTMLInputElement;
        const inputInvalid = !input.checkValidity();
        const valueInvalid = propInvalid(field, value());
        const invalid = valueInvalid || inputInvalid;
        if (invalid !== this.invalid) {
            this.invalid = invalid;
            m.redraw();
        }

    }





}