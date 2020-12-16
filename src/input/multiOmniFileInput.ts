import m, { Children, ClassComponent, CVnode } from "mithril";
import { FileInput } from "./fileInput";
import stream from "mithril/stream";
import { DisplayType, IFileWidget } from "../interface/widget";
import { drgCls, filCls, getIcon } from "../theme";
import { config } from "../config";
import { addOmniFiles } from "./omniFileInput";
import { DisplayTypeComponent } from "../display/displayTypeComponent";

export class MultiOmniFileInput implements ClassComponent<IFileWidget> {
    protected dragging: stream<boolean> = stream<boolean>(false);

    public view({ attrs: { field, value, displayType = DisplayType.thumbnail, showDisplay } }: CVnode<IFileWidget>): Children {
        const { uiClass = {} } = field;
        const { wrapper, inputWrapper } = uiClass;
        return m(
            "fieldset.pa0.bn",
            {
                class: wrapper,
            },
            [
                m("div", {
                    class: inputWrapper,
                }, 
                    m(FileInput,
                        {
                            field,
                            defaultAccept: "*",
                            dragging: this.dragging,
                            onSet: addOmniFiles(value, false),
                        },
                        m(".flex.items-center.pa1.ba.b--black-20.dt.relative", {
                            class: this.dragging() ? drgCls() : filCls(),
                        },
                            m("i.pa1", {
                                class: getIcon(config.uploadIcn)
                            }),
                            m("span.ma1.flex-auto", config.addFileTxt),
                        )
                    ),
                    showDisplay ?
                        m(DisplayTypeComponent, {
                            displayType: displayType,
                            value: value
                        }) : null,
                )
            ]
        );
    }
}
