const o = require("ospec");

import m from "mithril";
import stream from "mithril/stream";

import { FieldType, IFile } from "../interface/widget";

import { MultiOmniFileInput } from "./multiOmniFileInput";

o.spec("OmniFileInput", () => {

	o("empty", () => {
		const root = window.document.createElement("div");
		const value = stream<IFile[]>([]);
		m.mount(root, {
			view: () => m(MultiOmniFileInput, {
				field: {
					id: "test",
					label: "test",
					type: FieldType.file
				},
				value
			})
		});
		o(root.childNodes.length).equals(1);
    })

    o("regular set file", () => {
        const root = window.document.createElement("div");
        const value = stream<IFile[]>([{
			guid: "test",
			name: "Test",
			path: "/test/path"
        }]);        
        m.mount(root, {
            view: () => m(MultiOmniFileInput, {
                field: {
                    id: "test",
                    label: "test",
                    type: FieldType.file
                },
                value
            })
        })
        o(root.childNodes.length).equals(1);
    })

})