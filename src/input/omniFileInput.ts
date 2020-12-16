import lodash from "lodash";
import m, { Children, ClassComponent, CVnode } from "mithril";
import stream from "mithril/stream";

import { IFile, IFileWidget } from "../interface/widget";

import { config } from "../config";
import { drgCls, filCls, imgMaxSize, getIcon } from "../theme";
import { isImage, dataURItoBlob, fileConstructor, guid, imgSrc, resizeImage, getFileTypeIcon } from "../utils";

import { FileInput } from "./fileInput";
import { removeFile } from "./fileMulti";

export function addOmniFiles(fileList: stream<IFile[]>, replace: boolean) {
    return (addList: FileList | null) => {
        const newFileList = replace ? [] : fileList();
        if (addList && addList.length) {
            return Promise.all(lodash.map(addList, (file) => {
                if (isImage(file.type)) {
                    return resizeImage(file, config.imageMaxSize, file.type).then((dataURL) => {
                        const newFile = fileConstructor(dataURItoBlob(dataURL), file.name);
                        newFileList.push({
                            guid: guid(),
                            name: newFile.name,
                            path: "not_set",
                            file: newFile,
                            dataUrl: dataURL
                        });
                    });
                } else {
                    newFileList.push({
                        guid: guid(),
                        name: file.name,
                        path: "not_set",
                        file: file,
                    });
                    return Promise.resolve();
                }
            })).then(() => {
                fileList(newFileList);
                m.redraw();
            });
        } else {
            return Promise.reject("No file selected to upload");
        }
    }
}

export class OmniFileInput implements ClassComponent<IFileWidget> {

    protected dragging: stream<boolean> = stream<boolean>(false);

    public view({ attrs: { field, value } }: CVnode<IFileWidget>): Children {
        const file = lodash.head(value());
        const { uiClass = {} } = field;
        const { wrapper, inputWrapper } = uiClass;

        return m("fieldset.pa0.bn", {
            class: wrapper
        }, [
            m("div", {
                class: inputWrapper
            },
                m(FileInput, {
                    field,
                    defaultAccept: "*",
                    multiple: false,
                    dragging: this.dragging,
                    onSet: addOmniFiles(value, true)
                },
                    m(".flex.items-center.pa1.ba.b--black-20.dt.relative", {
                        class: this.dragging() ? drgCls() : filCls()
                    }, file?.dataUrl ? [
                        m('.w-100.tc', {},
                            m("img.img.contain", {
                                title: file.name,
                                src: imgSrc(file.path, file.dataUrl),
                                style: imgMaxSize()
                            }),
                            m(".absolute.top-0.right-0.pa1.pointer.dim", {
                                title: `Remove ${file.name}`,
                                onclick: removeFile(value, file.guid)
                            }, m("i.pa1", {
                                class: getIcon(config.cancelIcn)
                            }))
                        )
                    ] : !file?.dataUrl ? [
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
                    ] : m("i.fa-2x.dtc.v-mid", {
                        class: getIcon(config.uploadIcn)
                    }))
                )
            )
        ]);
    }
}
