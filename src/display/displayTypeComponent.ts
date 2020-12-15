import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import { config } from "../config";
import { Button } from "../button";
import { removeFile } from "../input/fileMulti";
import {  DisplayType, IDisplayWidget } from "../interface/widget";
import { getIcon, thumbMaxSize } from "../theme";
import { imgSrc, getFileTypeIcon } from "../utils";
import { Thumbnail } from "./thumbnail";
import stream from "mithril/stream";


export class DisplayTypeComponent implements ClassComponent<IDisplayWidget> {

	protected dragging: stream<boolean> = stream<boolean>(false);

    view({ attrs: { displayType, value } }: CVnode<IDisplayWidget>): Children {
        return displayType === DisplayType.thumbnail ? m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
            lodash.map(value(), (file) => {
                return m(
                    Thumbnail,
                    {
                        src: imgSrc(file.path, file.dataUrl),
                        file: file,
                        style: thumbMaxSize(),
                    },
                    m(
                        ".absolute.top-0.right-0.child",
                        m(Button, {
                            title: `Remove ${file.name}`,
                            icon: config.deleteIcn,
                            onclick: removeFile(value, file.guid),
                        })
                    )
                )
            }),
        ) : displayType === DisplayType.list ? 
        m(".pa2.flex.flex-column", 
            lodash.map(value(), (file) => {
                console.log(file);
                return 	m(".flex.items-center.pa1.ba.b--black-20", {}, [
					m("i.pa1", {
						class: getIcon(config.uploadIcn)
					}),
					m("span.ma1.flex-auto", file ? file.name : config.addFileTxt),
					file ? m("i.pa1", {
						class: getIcon(getFileTypeIcon(file)),
						title: "Click to view file in new tab",
						onclick: file.path !== "not_set"
							? () => window.open(file.path, "_blank")
							: undefined
					}) : null,
					file ? m("i.pa1.pointer.dim", {
						title: `Remove ${file.name}`,
						class: getIcon(config.cancelIcn),
						onclick: removeFile(value, file.guid)
					}) : null,
				])
                }),
            ) : null                

    }
}