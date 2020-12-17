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

    view({ attrs: { displayType = DisplayType.thumbnail, value } }: CVnode<IDisplayWidget>): Children {
        return displayType === DisplayType.thumbnail ? m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",
            lodash.map(value(), (data) => {
                return m(
                    Thumbnail,
                    {
                        src: imgSrc(data.path, data.dataUrl),
                        data: data,
                        style: thumbMaxSize(),
                    },
                    m(
                        ".absolute.top-0.right-0.child",
                        m(Button, {
                            title: `Remove ${data.name}`,
                            icon: config.deleteIcn,
                            onclick: removeFile(value, data.guid),
                        })
                    )
                )
            }),
        ) : displayType === DisplayType.list ? 
        m(".pa2.flex.flex-column", 
            lodash.map(value(), (data) => {
                return 	m(".flex.items-center.pa1.ba.b--black-20", {}, [
					m("i.pa1", {
						class: getIcon(config.uploadIcn)
					}),
					m("span.ma1.flex-auto", data ? data.name : config.addFileTxt),
					data ? m("i.pa1", {
						class: getIcon(getFileTypeIcon(data)),
						title: "Click to view file in new tab",
						onclick: data.path !== "not_set"
							? () => window.open(data.path, "_blank")
							: undefined
					}) : null,
					data ? m("i.pa1.pointer.dim", {
						title: `Remove ${data.name}`,
						class: getIcon(config.cancelIcn),
						onclick: removeFile(value, data.guid)
					}) : null,
				])
                }),
            ) : null                

    }
}