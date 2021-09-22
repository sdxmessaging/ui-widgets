/* @preserve built on: 2021-09-21T14:17:23.190Z */
import lodash from 'lodash';
import m from 'mithril';
import stream from 'mithril/stream';
import SignaturePad from 'signature_pad';

const confMap = {
    imageMaxSize: 1280,
    imageDispHeight: "16rem",
    thumbDispHeight: "6rem",
    addFileTxt: "Upload...",
    addFilesTxt: "Add file(s)...",
    remFileTtl: "Remove",
    openFileTxt: "Open file",
    showPassTxt: "Show Password",
    requiredLblPost: "",
    signOpts: [{
            label: "", value: "draw" /* Draw */
        }, {
            label: "", value: "type" /* Type */
        }, {
            label: "", value: "stamp" /* Stamp */
        }],
    signMaxSize: 640,
    signHeightPct: 25,
    signFont: "sans-serif",
    signDrawTxt: "Draw",
    signTypeTxt: "Type",
    signStampTxt: "Accept",
    stampTxt: "Accept",
    stampBtnClass: "",
    stampBtnContext: "default",
    stampSetTxt: "Accepted",
    applyTtl: "Apply",
    resetTtl: "Reset",
    cancelTtl: "Cancel",
    drawIcn: "fas fa-signature",
    typeIcn: "fas fa-keyboard",
    stampIcn: "fas fa-check",
    applyIcn: "fas fa-check",
    resetIcn: "fas fa-eraser",
    cancelIcn: "fas fa-times",
    checkIcn: "far fa-check-square",
    uncheckIcn: "far fa-square",
    toggleOnIcn: "fas fa-toggle-on",
    toggleOffIcn: "fas fa-toggle-off",
    showPassIcn: "fas fa-eye",
    hidePassIcn: "fas fa-eye-slash",
    uploadIcn: "fas fa-file-upload",
    downloadIcn: "fas fa-file-download",
    deleteIcn: "fas fa-trash-alt",
    cameraIcn: "fas fa-camera",
    imageIcn: "fas fa-image",
    emailIcn: "fas fa-envelope",
    telIcn: "fas fa-phone",
    linkIcn: "fas fa-link",
    wordDocIcn: "fas fa-file-word",
    videoFileIcn: "fas fa-file-video",
    pdfFileIcn: "fas fa-file-pdf",
    musicFileIcn: "fas fa-file-audio",
    excelFileIcn: "fas fa-file-excel",
    fileIcn: "fas fa-file",
    codeFileIcn: "fas fa-file-code"
};
const config = confMap;
function updateConfig(newConfig) {
    lodash.assign(confMap, newConfig);
}

// Class/Theme helpers
function imgMaxSize() {
    return { "max-height": config.imageDispHeight };
}
function thumbMaxSize() {
    return { "max-height": config.thumbDispHeight };
}
const styleSm = { "max-width": "5.4ex" };
const styleLg = { "max-width": "9ex" };
// ui-widgets 1.4 theme map
const classMapState = {
    wrapper: "pa0 bn",
    label: "f6 silver",
    inputWrapper: "dark-gray",
    input: "h2 dark-gray fw2",
    button: "pa2 bn br2",
    navButton: "dark-gray",
    textarea: "dark-gray fw2",
    radio: "dark-gray pa2 br2",
    radioChecked: "bg-light-blue",
    radioUnchecked: "o-60",
    fileInput: "dark-gray ba bw1 br3 b--dashed b--black-30",
    fileHover: "blue b--blue",
    displayLabel: "silver",
    displayValue: "dark-gray",
    requiredLabel: "",
    disabledWrapper: "o-40",
    invalidInputWrapper: ""
};
const theme = classMapState;
function updateClasses(newConfig) {
    lodash.assign(classMapState, newConfig);
}
// Button context helpers
const btnMap = {
    default: "bg-light-blue dark-gray"
};
function updateButtonContext(newButtonContext) {
    lodash.assign(btnMap, newButtonContext);
}
function getButtonContext(key = "default") {
    if (key && key in btnMap) {
        return btnMap[key];
    }
    else {
        return "";
    }
}
// Class string helpers
function wrapperCls({ wrapper = "", merge = true }, disabled) {
    return `${wrapper} ${merge ? theme.wrapper : ""} ${disabled ? theme.disabledWrapper : ""}`;
}
function labelCls({ label = "", merge = true }, required) {
    return `${label} ${merge ? theme.label : ""} ${required ? theme.requiredLabel : ""}`;
}
function inputWrapperCls({ inputWrapper = "", merge = true }, invalid) {
    return `${inputWrapper} ${merge ? theme.inputWrapper : ""} ${invalid ? theme.invalidInputWrapper : ""}`;
}
function inputCls({ input = "", merge = true }) {
    return `${input} ${merge ? theme.input : ""}`;
}
function checkInputCls(uiClass, disabled, readonly) {
    return `${inputCls(uiClass)} ${pointerCls(disabled, readonly)}`;
}
function textareaCls({ input = "", merge = true }) {
    return `${input} ${merge ? theme.textarea : ""}`;
}
function radioInputCls({ input = "", merge = true }, checked, disabled, readonly) {
    return `${input} ${merge ? theme.radio : ""} ${checked ? theme.radioChecked : theme.radioUnchecked} ${pointerCls(disabled, readonly)}`;
}
function fileInputCls(dragging) {
    return `${theme.fileInput} ${dragging ? theme.fileHover : ""}`;
}
function pointerCls(disabled, readonly) {
    return disabled || readonly ? "" : "pointer";
}

// Create "v4-like" (no fixed version id) uuid (based on node-uuid)
function toHex(inp) {
    // Add to 0x100 to pad small numbers with leading 0
    return (inp + 0x100).toString(16).substr(1);
}
function guid() {
    const bytes = new Uint8Array(16);
    const crypto = window.crypto;
    crypto.getRandomValues(bytes);
    return ([
        toHex(bytes[0]), toHex(bytes[1]),
        toHex(bytes[2]), toHex(bytes[3]), "-",
        toHex(bytes[4]), toHex(bytes[5]), "-",
        toHex(bytes[6]), toHex(bytes[7]), "-",
        toHex(bytes[8]), toHex(bytes[9]), "-",
        toHex(bytes[10]), toHex(bytes[11]),
        toHex(bytes[12]), toHex(bytes[13]),
        toHex(bytes[14]), toHex(bytes[15])
    ]).join("");
}
function pxRatio() {
    return Math.max(window.devicePixelRatio, 1);
}
function getLabelText(label, required) {
    return required ? `${label}${config.requiredLblPost}` : label;
}
function imgSrc(path, dataUrl) {
    return dataUrl ? dataUrl : path;
}
// Used by display widgets
function getDisplayLabel(label) {
    return label ? m("span.mr2.truncate", {
        title: label,
        class: theme.displayLabel
    }, label) : null;
}
// Used by input widgets
function getLabel(id, uiClass, label, required) {
    return label ? m("label.mb1.db", {
        title: label,
        for: id,
        class: labelCls(uiClass, required),
    }, getLabelText(label, required)) : null;
}
function labelIcon(leftIcon, label, rightIcon) {
    return [
        leftIcon ? m("i.fa-fw", {
            class: `${label ? "mr2" : ""} ${leftIcon}`
        }) : null,
        label,
        rightIcon ? m("i.fa-fw", {
            class: `${label ? "ml2" : ""} ${rightIcon}`
        }) : null
    ];
}
// Input widget TProp update helpers
function setValue(val) {
    return function ({ target: { value } }) {
        val(value);
    };
}
function setCheck(chk) {
    return function ({ target: { checked } }) {
        chk(checked);
    };
}
/**
 * Split given file name from extension
 */
function fileNameExtSplit(fileName) {
    const extIdx = fileName.lastIndexOf(".");
    if (extIdx === -1) {
        return [fileName, ""];
    }
    else {
        return [fileName.substr(0, extIdx), fileName.substr(extIdx)];
    }
}
function dataURItoBlob(dataURI) {
    const dataUriList = dataURI.split(",");
    const bytes = dataUriList[0].indexOf("base64") >= 0 ?
        atob(dataUriList[1]) :
        unescape(dataUriList[1]);
    const mimeType = dataUriList[0].split(":")[1].split(";")[0];
    const bytesTotal = bytes.length;
    const byteArray = new Uint8Array(bytesTotal);
    for (let idx = 0; idx < bytesTotal; idx++) {
        byteArray[idx] = bytes.charCodeAt(idx);
    }
    return new Blob([byteArray], { type: mimeType });
}
/**
 * Convert a Blob into a "File-like" object without using the File constructor
 * Mutates input blob
 */
function fileConstructor(blob, fileName) {
    const lastModified = new Date().valueOf();
    const mutableBlob = blob;
    mutableBlob.name = fileName;
    mutableBlob.lastModified = lastModified;
    return blob;
}
function dataUrlToFile(dataUrl, name, metadata) {
    const newFile = fileConstructor(dataURItoBlob(dataUrl), name);
    return {
        guid: guid(),
        name: newFile.name,
        path: "not_set",
        file: newFile,
        dataUrl: dataUrl,
        metadata
    };
}
// // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
// // specs compliant (as of March 2018 only Chrome)
// export function toFileList(fileList: IFile[]) {
// 	const transfer = new ClipboardEvent("").clipboardData || new DataTransfer();
// 	lodash.forEach(fileList, ({ file }) => {
// 		if (file) {
// 			transfer.items.add(file);
// 		}
// 	});
// 	return transfer.files;
// }
function getFileTypeIcon(file) {
    const [, extension] = fileNameExtSplit(file.name);
    switch (extension.toLowerCase()) {
        case '.doc':
        case '.docx':
        case '.dot':
        case '.wbk':
        case '.docm':
        case '.dotx':
        case '.dotm':
        case '.docb':
        case '.txt':
            return config.wordDocIcn;
        case '.webm':
        case '.mkv':
        case '.flv':
        case '.vob':
        case '.ogv':
        case '.drc':
        case '.gifv':
        case '.mng':
        case '.avi':
        case '.mts':
        case '.m2ts':
        case '.mov':
        case '.qt':
        case '.wmv':
        case '.yuv':
        case '.rm':
        case '.rmvb':
        case '.viv':
        case '.asf':
        case '.amv':
        case '.mp4':
        case '.m4p':
        case '.m4v':
        case '.mpg':
        case '.mp2':
        case '.mpeg':
        case '.mpe':
        case '.mpv':
        case '.m2v':
        case '.svi':
        case '.3gp':
        case '.mxf':
        case '.roq':
        case '.nsv':
        case '.f4v':
        case '.f4p':
        case '.f4a':
        case '.f4b':
            return config.videoFileIcn;
        case '.pdf':
            return config.pdfFileIcn;
        case '.pcm':
        case '.wav':
        case '.aiff':
        case '.mp3':
        case '.aac':
        case '.ogg':
        case '.wma':
        case '.flac':
        case '.alac':
            return config.musicFileIcn;
        case '.xls':
        case '.xlt':
        case '.xlm':
        case '.xlsx':
        case '.xlsm':
        case '.xltx':
        case '.xltm':
        case '.xlsb':
        case '.xla':
        case '.xlam':
        case '.xll':
        case '.xlw':
            return config.excelFileIcn;
        case '.html':
        case '.js':
        case '.css':
        case '.scss':
        case '.java':
            return config.codeFileIcn;
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.tiff':
        case '.gif':
        case '.svg':
        case '.webp':
            return config.imageIcn;
        default:
            return config.fileIcn;
    }
}
function isImage(fileType) {
    // Change to regex starts with "image/"
    return fileType && fileType.includes('image');
}

function getOrientation(buffer) {
    // Image exif data in first 64k of file
    const viewLen = Math.min(buffer.byteLength, 64 * 1024);
    const view = new DataView(buffer, 0, viewLen);
    if (view.getUint16(0, false) !== 0xFFD8) {
        return -2;
    }
    const length = view.byteLength;
    let offset = 2;
    while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
            offset += 2;
            if (view.getUint32(offset, false) !== 0x45786966) {
                return -1;
            }
            offset += 6;
            const little = view.getUint16(offset, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
                if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                    return view.getUint16(offset + (i * 12) + 8, little);
                }
            }
        }
        else if ((marker & 0xFF00) !== 0xFF00) {
            break;
        }
        else {
            offset += view.getUint16(offset, false);
        }
    }
    return -1;
}
function readArrayBuffer(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsArrayBuffer(file);
    });
}
function readOrientation(file) {
    return readArrayBuffer(file).then(getOrientation);
}
function rotateContext(ctx, width, height, orientation) {
    if (!orientation || orientation > 8) {
        return;
    }
    switch (orientation) {
        case 2:
            // Horizontal flip
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            return;
        case 3:
            // 180 rotate anticlockwise
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            return;
        case 4:
            // Vertical flip
            ctx.translate(0, height);
            ctx.scale(1, -1);
            return;
        case 5:
            // Vertical flip + 90 rotate clockwise
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            return;
        case 6:
            // 90 rotate clockwise
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(0, -height);
            return;
        case 7:
            // Horizontal flip + 90 rotate clockwise
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(width, -height);
            ctx.scale(-1, 1);
            return;
        case 8:
            // 90 rotate anticlockwise
            ctx.rotate(-0.5 * Math.PI);
            ctx.translate(-width, 0);
            return;
    }
}
/**
 * Scale given width and height values if either exceed the giving limit
 * Returns integer values, rounding errors can significantly distort small rectangles
 */
function scaleRect(width, height, limit) {
    if (width > height) {
        if (width > limit) {
            return [limit, Math.round(height * limit / width)];
        }
    }
    else if (height > limit) {
        return [Math.round(width * limit / height), limit];
    }
    return [width, height];
}
/**
 * Shrink an image if width/height exceeds a given maximum
 * @param file Image file to resize
 * @param maxSize Maximum dimension size in pixels
 * @param type Image MIME type to return
 */
function resizeImage(file, maxSize, type) {
    if (!file.type.match(/image.*/)) {
        return Promise.reject(new Error("File must be an image"));
    }
    return readOrientation(file)
        .then((orientation) => new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const [width, height] = scaleRect(image.width, image.height, maxSize);
            // Orientations after 4 are rotated 90 degrees
            if (orientation > 4) {
                canvas.width = height;
                canvas.height = width;
            }
            else {
                canvas.width = width;
                canvas.height = height;
            }
            const context = canvas.getContext("2d");
            rotateContext(context, width, height, orientation);
            context.drawImage(image, 0, 0, width, height);
            resolve(canvas.toDataURL(type));
        };
        const reader = new FileReader();
        reader.onload = () => image.src = reader.result;
        reader.readAsDataURL(file);
    }));
}
function scaleDataUrl(dataUrl, maxSize) {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const [width, height] = scaleRect(image.width, image.height, maxSize);
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, width, height);
            resolve(canvas.toDataURL());
        };
        image.src = dataUrl;
    });
}
// Create dataURL image from given text
function textToImage(text, width, height, font) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const fontSize = 0.56 * canvas.height;
    const context = canvas.getContext("2d");
    context.textBaseline = "middle";
    context.font = `${fontSize}px ${font}`;
    context.fillText(text, canvas.height * 0.05, fontSize);
    return canvas.toDataURL();
}
function createStamp(sign, heightPct) {
    const width = config.signMaxSize;
    // Signatures assumed wider than their height
    const height = 0.01 * heightPct * width;
    return textToImage(sign, width, height, config.signFont);
}

class Badge {
    view({ attrs: { label, classes = "bg-red" }, children }) {
        return m(".relative.dib", [
            children,
            label ? m("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80", {
                class: classes,
                style: {
                    minWidth: "0.65rem"
                }
            }, label) : null
        ]);
    }
}

class Button {
    view({ attrs: { label, type = "button", title = label, icon, rightIcon, context, classes = "", disabled, style, onclick } }) {
        return m("button.button-reset", {
            type, title, disabled,
            class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${getButtonContext(context)} ${theme.button}`,
            style,
            onclick
        }, labelIcon(icon, label, rightIcon));
    }
}

class ButtonLink {
    view({ attrs: { label, title = label, icon, rightIcon, href, rel, target, download, context, classes = "", style } }) {
        return m("a.link.flex.items-center", {
            href, rel, target, download, title,
            class: `${classes} ${getButtonContext(context)} ${theme.button}`, style
        }, labelIcon(icon, label, rightIcon));
    }
}

class NavButton {
    view({ attrs: { label, title = label, icon, rightIcon, classes = "", disabled, style, onclick } }) {
        return m(".mh2.pa2.truncate", {
            title, disabled,
            class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${theme.navButton}`,
            style,
            onclick
        }, labelIcon(icon, label, rightIcon));
    }
}

class NavLink {
    view({ attrs: { label, title = label, icon, rightIcon, href, rel, target, download, classes = "", style } }) {
        return m("a.link.mh2.pa2.truncate", {
            href, rel, target, download, title,
            class: `${classes} ${theme.navButton}`, style
        }, labelIcon(icon, label, rightIcon));
    }
}

class Trusted {
    view({ attrs: { field: { style }, value } }) {
        return m(".pa2", {
            style
        }, m.trust(value()));
    }
}

class BaseText {
    view({ attrs: { field, value } }) {
        const { label, uiClass = {}, style } = field;
        return m(".pa2.flex.flex-wrap", {
            class: wrapperCls(uiClass),
            style
        }, [
            getDisplayLabel(label),
            m("span.ws-normal", {
                title: value(),
                class: theme.displayValue
            }, value())
        ]);
    }
}

class DateText {
    formatter(val) {
        return val ? new Date(String(val)).toLocaleDateString() : val;
    }
    oninit({ attrs: { value } }) {
        this.formatted = value.map(this.formatter);
    }
    onremove() {
        this.formatted.end(true);
    }
    view({ attrs: { field } }) {
        return m(BaseText, {
            field,
            value: this.formatted
        });
    }
}

function linkAttrs(fieldType, value) {
    if (fieldType === "email") {
        return {
            href: `mailto:${value}`,
            class: theme.displayValue
        };
    }
    else if (fieldType === "tel") {
        return {
            href: `tel:${value}`,
            class: theme.displayValue
        };
    }
    else {
        // Assume standard urls
        return {
            href: value,
            target: "_blank",
            class: theme.displayValue
        };
    }
}
const iconMap = {
    email: config.emailIcn,
    tel: config.telIcn
};
class Link {
    view({ attrs: { field, value } }) {
        const { label, type = "url" /* url */, uiClass = {}, style } = field;
        return m(".pa2.flex.flex-wrap", {
            class: wrapperCls(uiClass),
            style
        }, [
            getDisplayLabel(label),
            m("a.link.dim.pointer.ws-normal", linkAttrs(type, value()), m("i.mr2", {
                class: iconMap[type] || config.linkIcn
            }), value())
        ]);
    }
}

class CheckLabel {
    view({ attrs: { field, value } }) {
        const { options = [] } = field;
        const valLabel = lodash.find(options, 
        // Empty value stream to be handled as false
        lodash.matches({ value: value() || false }));
        return valLabel ? m("span.ml2", valLabel.label) : null;
    }
}

class Checkbox {
    constructor() {
        this.onIcon = "checkIcn";
        this.offIcon = "uncheckIcn";
    }
    view({ attrs: { field, value } }) {
        const { label, uiClass = {}, style } = field;
        return m(".pa2.flex.items-center", {
            class: wrapperCls(uiClass),
            style
        }, [
            getDisplayLabel(label),
            m("i", {
                class: `${theme.displayValue} ${config[value() ? this.onIcon : this.offIcon]}`
            }),
            m(CheckLabel, { field, value })
        ]);
    }
}

class Toggle extends Checkbox {
    constructor() {
        super(...arguments);
        this.onIcon = "toggleOnIcn";
        this.offIcon = "toggleOffIcn";
    }
}

// TODO Expand validation for field input masks, min/max, minlength/maxlength etc.
function propInvalid(field, value) {
    if (field.required) {
        return !value;
    }
    return false;
}
function fileInvalid(field, value) {
    if (field.required) {
        return value.length < 1;
    }
    return false;
}

function dragStart(state) {
    return (evt) => {
        evt.preventDefault();
        if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = "copy";
        }
        // Prevent excessive redraws if dragging state is already set
        if (state()) {
            evt.redraw = false;
        }
        state(true);
    };
}
function dragStop(state) {
    return (evt) => {
        evt.preventDefault();
        state(false);
    };
}
function drop(state, setFiles) {
    return (evt) => {
        evt.preventDefault();
        state(false);
        if (evt.dataTransfer) {
            setFiles(evt.dataTransfer.files);
        }
    };
}
function change(setFiles) {
    return ({ target: { files } }) => setFiles(files);
}
class FileInput {
    oncreate({ dom, attrs: { value } }) {
        value.map((list) => {
            if (list.length === 0) {
                dom.firstChild.value = "";
            }
        });
    }
    view({ attrs: { field, defaultAccept = "*", multiple = true, dragging, onSet }, children }) {
        const { label, id, name = id, title = label, required, readonly, disabled, autofocus, accept = defaultAccept, uiClass = {} } = field;
        return m("label.db", lodash.extend({
            "for": id,
            "title": title,
            "class": pointerCls(disabled, readonly),
            "data-input-id": id
        }, disabled || readonly ? {} : {
            ondragover: dragStart(dragging),
            ondragleave: dragStop(dragging),
            ondrop: drop(dragging, onSet)
        }), [
            m("input.clip[type=file].bg-transparent.bn.outline-0", {
                id, name, multiple, accept,
                required, autofocus,
                disabled: disabled || readonly,
                onchange: change(onSet)
            }),
            label ? m("span.db.mb1", {
                class: labelCls(uiClass, required)
            }, getLabelText(label, required)) : null,
            children
        ]);
    }
}

function addFiles(fileList, replace = false) {
    return (addList) => {
        const newFileList = replace ? [] : fileList();
        lodash.each(addList, (file) => {
            newFileList.push({
                guid: guid(),
                name: file.name,
                path: "not_set",
                file: file
            });
        });
        fileList(newFileList);
    };
}
function removeFile(fileList, removeGuid) {
    return (event) => {
        event.preventDefault();
        const newFileList = fileList();
        lodash.remove(newFileList, { guid: removeGuid });
        fileList(newFileList);
    };
}
class FileMulti {
    constructor() {
        this.dragging = stream(false);
    }
    view({ attrs: { field, value } }) {
        const { disabled, uiClass = {} } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            m(FileInput, {
                field,
                dragging: this.dragging,
                onSet: addFiles(value),
                value
            }, m("div", {
                class: inputWrapperCls(uiClass, fileInvalid(field, value()))
            }, m(".pa2", {
                class: fileInputCls(this.dragging())
            }, [
                m("i.mr2", {
                    class: config.uploadIcn
                }),
                m("span", config.addFilesTxt)
            ]))),
            m(".flex.flex-column.mt1.nb1", lodash.map(value(), (file) => m("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
                m("i.mr2", {
                    class: config.downloadIcn
                }),
                file.name,
                m("i.child.fr", {
                    title: `${config.remFileTtl} ${file.name}`,
                    class: config.deleteIcn,
                    onclick: removeFile(value, file.guid)
                })
            ])))
        ]);
    }
}

class Thumbnail {
    view({ children, attrs }) {
        return m(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child", [
            attrs.src && attrs.src !== "not_set" ? m("img.contain", { src: attrs.src }) : null,
            attrs.data && attrs.data.file && (attrs.src === "not_set" || !attrs.src) ? (m("div.contain.tc.br5.6rem", {
                class: `${getFileTypeIcon(attrs.data)} fa-2x`,
                tooltip: attrs.data.file.type
            })) : null,
            children
        ]);
    }
}

class FileOpen {
    view({ attrs }) {
        return m("i.pa1", {
            class: getFileTypeIcon(attrs),
            title: config.openFileTxt,
            onclick: attrs.path !== "not_set"
                ? () => window.open(attrs.path, "_blank")
                : undefined
        });
    }
}

class DisplayTypeComponent {
    view({ attrs: { displayType = "thumbnail" /* thumbnail */, value } }) {
        return displayType === "thumbnail" /* thumbnail */ ? m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1", lodash.map(value(), (file) => m(Thumbnail, {
            src: imgSrc(file.path, file.dataUrl),
            data: file,
            style: thumbMaxSize(),
        }, m(".absolute.top-0.right-0.child", m(Button, {
            title: `Remove ${file.name}`,
            icon: config.deleteIcn,
            onclick: removeFile(value, file.guid)
        }))))) : m(".pa2.flex.flex-column", lodash.map(value(), (file) => m(".flex.items-center.pa1.ba.b--black-20", [
            m("i.pa1", {
                class: config.uploadIcn
            }),
            m("span.ma1.flex-auto", {
                title: file.name
            }, file.name),
            m(FileOpen, file),
            m("i.pa1.pointer.dim", {
                title: `Remove ${file.name}`,
                class: config.cancelIcn,
                onclick: removeFile(value, file.guid)
            })
        ])));
    }
}

class SelectText {
    view({ attrs: { field, value } }) {
        const { label: lbl, uiClass = {}, style } = field;
        // Get label for selected options (falling back to the value)
        const option = lodash.find(field.options, { value: value() });
        const label = option ? option.label || option.value : value();
        return m(".pa2.flex.flex-wrap", {
            class: wrapperCls(uiClass),
            style
        }, [
            getDisplayLabel(lbl),
            m("span.ws-normal", {
                title: label,
                class: theme.displayValue
            }, label)
        ]);
    }
}

class FileList {
    view({ attrs: { field, value } }) {
        const { label, uiClass = {}, style } = field;
        return m(".pa2.flex.flex-column", {
            class: wrapperCls(uiClass),
            style
        }, [
            getDisplayLabel(label),
            m(".flex.flex-column.mt1.nb1", lodash.map(value(), ({ name, path }) => {
                return m("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]", {
                    class: theme.displayValue,
                    href: path
                }, m("i.mr2", {
                    class: config.downloadIcn
                }), name);
            }))
        ]);
    }
}

class ImageList {
    view({ attrs: { field, value } }) {
        const { label, uiClass = {}, style } = field;
        return m(".pa2.flex.flex-column", {
            class: wrapperCls(uiClass),
            style
        }, [
            getDisplayLabel(label),
            m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1", lodash.map(value(), ({ name, path, dataUrl }) => m(Thumbnail, {
                title: name,
                src: imgSrc(path, dataUrl),
                style: thumbMaxSize()
            })))
        ]);
    }
}

class ImagePreview {
    view({ attrs: { field, value } }) {
        const { label, uiClass = {}, style } = field;
        const file = lodash.head(value());
        return m(".pa2.flex.flex-column", {
            class: wrapperCls(uiClass),
            style
        }, [
            getDisplayLabel(label),
            file ? m("img.img.h-100.mt2.contain.self-center", {
                title: file.name,
                src: imgSrc(file.path, file.dataUrl),
                style: imgMaxSize()
            }) : m("i.mt2", {
                class: `${theme.displayValue} ${config.imageIcn}`
            })
        ]);
    }
}

function scorePassword(value) {
    let totalScore = 0;
    // Min req for password is 8 characters
    if (value.length >= 8) {
        totalScore = 1;
        // Extra points for longer password
        if (value.length >= 24) {
            totalScore = totalScore + 1;
        }
        // Check does string have 2 upper case and 3 lower case
        if (/(?=.*[A-Z].*[A-Z])/.test(value) && /(?=.*[a-z].*[a-z].*[a-z])/.test(value)) {
            totalScore = totalScore + 1;
        }
        // Ensure string has 2 digits
        if (/(?=.*[0-9].*[0-9])/.test(value)) {
            totalScore = totalScore + 1;
        }
        // Ensure string has one special character
        if (/(?=.*[!"£%^@#$&*])/.test(value)) {
            totalScore = totalScore + 1;
        }
    }
    return totalScore;
}
function passwordStrengthStr(value) {
    switch (value) {
        case 0: {
            return "Invalid";
        }
        case 1: {
            return "Very Weak";
        }
        case 2: {
            return "Weak";
        }
        case 3: {
            return "Average";
        }
        case 4: {
            return "Strong";
        }
        case 5: {
            return "Very Strong";
        }
    }
    return "";
}
const passwordStrength = [{
        value: 1,
        background: "bg-dark-red"
    }, {
        value: 2,
        background: "bg-orange"
    }, {
        value: 3,
        background: "bg-yellow"
    }, {
        value: 4,
        background: "bg-light-green"
    }, {
        value: 5,
        background: "bg-green"
    }];
class PasswordStrength {
    oninit({ attrs: { value } }) {
        this.passwordScore = value
            .map((newPass) => scorePassword(String(newPass)));
    }
    onremove() {
        this.passwordScore.end();
    }
    view({ attrs: { field } }) {
        const { label, style } = field;
        return m(".flex.flex-column", {
            style
        }, [
            getDisplayLabel(label),
            m(".flex.mt1", lodash.map(passwordStrength, (val) => m(".h1.w-20", {
                class: this.passwordScore() >= val.value ? val.background : "bg-transparent"
            }))),
            m("span.f5.truncate", passwordStrengthStr(this.passwordScore()))
        ]);
    }
}

class Label {
    view({ attrs: { field: { label = "", title = label, required } } }) {
        return m("label.mb2", { title }, getLabelText(label, required));
    }
}

class BaseInput {
    view({ attrs: { field, value, xform = value } }) {
        const { label, id, type = "text" /* text */, name = id, title = label, placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, pattern, inputmode, spellcheck, instant, uiClass = {} } = field;
        return m("fieldset", {
            class: type === "hidden" /* hidden */ ? "clip" : wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, label, required),
            m("div", {
                class: inputWrapperCls(uiClass, propInvalid(field, xform()))
            }, m("input.w-100.bg-transparent.bn.outline-0", {
                id, type, name, title, placeholder,
                max, maxlength, min, minlength, step, required,
                readonly, disabled, autofocus, autocomplete,
                pattern, inputmode, spellcheck,
                class: inputCls(uiClass),
                value: xform(),
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setValue(value)
            }))
        ]);
    }
}

class CurrencyInput {
    view({ attrs: { field, value, xform = value } }) {
        const { label, id, name = id, title = label, placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, pattern, inputmode, spellcheck, instant, uiClass = {}, options } = field;
        const currency = options && options.length ? options[0].value : "$";
        return m("fieldset.flex-shrink-0", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, label, required),
            m(".flex.items-center", {
                class: inputWrapperCls(uiClass, propInvalid(field, xform()))
            }, m("span.mr1", currency), m("input.w-100.bg-transparent.bn.outline-0", {
                id, type: "text" /* text */, name, title, placeholder,
                max, maxlength, min, minlength, step, required,
                readonly, disabled, autofocus, autocomplete,
                pattern, inputmode, spellcheck,
                class: inputCls(uiClass),
                value: lodash.isUndefined(xform())
                    ? null
                    : numberToCurrencyStr(propToNumber(xform())),
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setCurrencyValue(value)
            }))
        ]);
    }
}
function propToNumber(value) {
    return lodash.isString(value) ? lodash.parseInt(value) : Number(value);
}
/**
 * Parse a currency string into a number
 * @param currencyStr Value to convert e.g. "123.45"
 * @return parsed value as smallest monetary unit e.g. 12345
 */
function currencyStrToNumber(currencyStr) {
    // Remove everything but digits and the decimal point
    const inputStr = currencyStr.replace(/[^\d.]/g, "");
    let left;
    let right = 0;
    // split number at decimal point
    if (inputStr.indexOf(".") > -1) {
        const decimalPos = inputStr.indexOf(".");
        const leftStr = inputStr.substring(0, decimalPos);
        // Ensure left component has at least 1 character
        left = lodash.parseInt(lodash.padStart(leftStr, 1, "0"));
        // Only accept first 2 figures after decimal
        const rightStr = inputStr.substring(decimalPos + 1, Math.min(decimalPos + 3, inputStr.length));
        // Ensure right component has 2 characters
        right = lodash.parseInt(lodash.padEnd(rightStr, 2, "0"));
    }
    else {
        left = lodash.parseInt(inputStr) || 0;
    }
    return left * 100 + right;
}
/**
 * Convert a number into a currency string
 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
 * @return currency string if finite number e.g. "123.45" or undefined
 */
function numberToCurrencyStr(unitTotal) {
    const numPair = numberToCurrencyTuple(unitTotal);
    if (numPair) {
        return `${numPair[0]}.${numPair[1]}`;
    }
    else {
        return numPair;
    }
}
/**
 * Convert a number into a currency string pair
 * @param unitTotal total in smallest monetary unit to convert e.g. 12345
 * @return currency string pair if finite number e.g. ["123", "45"] or undefined
 */
function numberToCurrencyTuple(unitTotal) {
    if (!lodash.isFinite(unitTotal)) {
        return undefined;
    }
    const valStr = String(Math.abs(unitTotal));
    let large = "0";
    let small = "";
    if (valStr.length > 2) {
        const decimalPos = valStr.length - 2;
        large = valStr.substring(0, decimalPos);
        small = valStr.substring(decimalPos);
    }
    else {
        small = lodash.padStart(valStr, 2, "0");
    }
    return [large, small];
}
// Currency TProp update helper
function setCurrencyValue(val) {
    return ({ target: { value } }) => val(currencyStrToNumber(value));
}

class CardDateInput {
    constructor() {
        this.month = stream();
        this.year = stream();
        // Combine date parts
        this.date = stream.lift((month, year) => `${month}/${year}`, this.month, this.year);
    }
    oninit({ attrs: { value } }) {
        // Split value into date parts
        value.map((newVal) => {
            const [month, year = ""] = String(newVal).split("/");
            this.month(month);
            this.year(year);
        });
        // Update value when date changes
        this.date.map((newDate) => {
            // Prevent recursive setting between streams
            if (newDate !== value()) {
                value(newDate);
            }
        });
    }
    onremove() {
        this.date.end(true);
        this.year.end(true);
        this.month.end(true);
    }
    view({ attrs: { field, value } }) {
        const { label, id, name = id, title = label, required, readonly, disabled, uiClass = {}, } = field;
        const classStr = inputCls(uiClass);
        // Assemble date input (en-GB or en-US layouts)
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(`${id}-mm`, uiClass, label, required),
            m("div", {
                title,
                class: inputWrapperCls(uiClass, propInvalid(field, value()))
            }, [
                m("div.dib.mr2", [
                    getLabel(`${id}-mm`, uiClass, "Month"),
                    m("input.w-100.bg-transparent.bn.outline-0", {
                        id: `${id}-mm`, name: `${name}-mm`,
                        type: "text" /* text */, placeholder: "MM",
                        minlength: "2", maxlength: "2",
                        pattern: "[0-9]*", inputmode: "numeric",
                        required, readonly, disabled,
                        value: this.month(),
                        class: classStr, style: styleSm,
                        onchange: setValue(this.month)
                    })
                ]),
                m("span.mr2", "/"),
                m("div.dib.mr2", [
                    getLabel(`${id}-yy`, uiClass, "Year"),
                    m("input.w-100.bg-transparent.bn.outline-0", {
                        id: `${id}-yy`, name: `${name}-yy`,
                        type: "text" /* text */, placeholder: "YY",
                        minlength: "4", maxlength: "4",
                        pattern: "[0-9]*", inputmode: "numeric",
                        required, readonly, disabled,
                        value: this.year(),
                        class: classStr, style: styleSm,
                        onchange: setValue(this.year)
                    })
                ])
            ])
        ]);
    }
}

class DateInput {
    constructor() {
        this.day = stream();
        this.month = stream();
        this.year = stream();
        this.valid = stream.lift((day, month, year) => {
            const newYear = parseInt(year);
            const newMonth = parseInt(month) - 1;
            const newDay = parseInt(day);
            const newDate = new Date(newYear, newMonth, newDay);
            return newDate.getFullYear() === newYear && year.length === 4
                && newDate.getMonth() === newMonth && newDate.getDate() === newDay;
        }, this.day, this.month, this.year);
        // Combine date parts
        this.date = stream.lift((day, month, year, valid) => valid ? `${year}-${month}-${day}` : "", this.day, this.month, this.year, this.valid);
    }
    oninit({ attrs: { value } }) {
        // Split value into date parts
        value.map((newVal) => {
            const date = new Date(String(newVal));
            if (lodash.isDate(date) && !isNaN(date.getTime())) {
                this.day(lodash.padStart(String(date.getDate()), 2, "0"));
                this.month(lodash.padStart(String(1 + date.getMonth()), 2, "0"));
                this.year(String(date.getFullYear()));
            }
        });
        // Update value when date changes
        this.date.map((newDate) => {
            // Prevent recursive setting between streams
            if (newDate !== value()) {
                value(newDate);
            }
        });
    }
    oncreate({ dom }) {
        const input = dom.querySelector("input");
        this.valid.map((valid) => {
            const validityMessage = valid ? "" : "Invalid Date";
            input.setCustomValidity(validityMessage);
        });
    }
    onremove() {
        this.date.end(true);
        this.year.end(true);
        this.month.end(true);
        this.day.end(true);
    }
    autoAdvance(event, id, selfType, targetType) {
        const self = document.querySelector(`#${id}-${selfType}`);
        const maxLength = parseInt(self.getAttribute("maxlength"));
        const length = self.value.length;
        if (length === maxLength && targetType) {
            const next = document.querySelector(`#${id}-${targetType}`);
            next.focus();
        }
        else {
            event.redraw = false;
        }
    }
    view({ attrs: { field, value } }) {
        const { label, id, name = id, title = label, required, readonly, disabled, uiClass = {}, options } = field;
        const locale = options && options.length ? options[0].value : "en-GB";
        const isUsLocale = locale === "en-US";
        const classStr = inputCls(uiClass);
        // Create DD-MM-YYYY inputs
        const dayInput = m(".dib.mr2", [
            getLabel(`${id}-dd`, uiClass, "Day"),
            m("input.w-100.bg-transparent.bn.outline-0", {
                id: `${id}-dd`, name: `${name}-dd`,
                type: "text" /* text */, placeholder: "DD",
                minlength: "2", maxlength: "2",
                pattern: "[0-9]*", inputmode: "numeric",
                required, readonly, disabled,
                value: this.day(),
                oninput: (event) => this.autoAdvance(event, id, "dd", isUsLocale ? "yyyy" : "mm"),
                class: classStr, style: styleSm,
                onchange: setValue(this.day)
            })
        ]);
        const monthInput = m(".dib.mr2", [
            getLabel(`${id}-mm`, uiClass, "Month"),
            m("input.w-100.bg-transparent.bn.outline-0", {
                id: `${id}-mm`, name: `${name}-mm`,
                type: "text" /* text */, placeholder: "MM",
                minlength: "2", maxlength: "2",
                pattern: "[0-9]*", inputmode: "numeric",
                required, readonly, disabled,
                value: this.month(),
                oninput: (event) => this.autoAdvance(event, id, "mm", isUsLocale ? "dd" : "yyyy"),
                class: classStr, style: styleSm,
                onchange: setValue(this.month)
            })
        ]);
        const yearInput = m(".dib.mr2", [
            getLabel(`${id}-yyyy`, uiClass, "Year"),
            m("input.w-100.bg-transparent.bn.outline-0", {
                id: `${id}-yyyy`, name: `${name}-yyyy`,
                type: "text" /* text */, placeholder: "YYYY",
                minlength: "4", maxlength: "4",
                pattern: "[0-9]*", inputmode: "numeric",
                required, readonly, disabled,
                value: this.year(),
                oninput: (event) => this.autoAdvance(event, id, "yyyy"),
                class: classStr, style: styleLg,
                onchange: setValue(this.year)
            })
        ]);
        // Assemble date input (en-GB or en-US layouts)
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, label, required),
            m("div", {
                id, title,
                class: inputWrapperCls(uiClass, propInvalid(field, value()) || !this.valid()),
            }, isUsLocale
                ? [
                    monthInput,
                    dayInput,
                    yearInput
                ] : [
                dayInput,
                monthInput,
                yearInput
            ])
        ]);
    }
}

class PasswordInput {
    constructor() {
        this.showPassword = stream(false);
    }
    view({ attrs: { field, value } }) {
        const { label, id, name = id, title = label, placeholder, maxlength, minlength, required, readonly, disabled, autofocus, autocomplete, pattern, inputmode, instant, uiClass = {}, } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, label, required),
            m("div.w-100.flex.items-center", {
                class: inputWrapperCls(uiClass, propInvalid(field, value()))
            }, m("input.w-100.bg-transparent.bn.outline-0", {
                id, name, title, placeholder,
                type: this.showPassword() ? "text" : "password",
                maxlength, minlength, required,
                readonly, disabled, autofocus, autocomplete,
                pattern, inputmode,
                class: inputCls(uiClass),
                value: value(),
                // Safari quirk
                autocorrect: "off",
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setValue(value)
            }), m("i.ml1.pa1.fa-fw.pointer.dim", {
                title: config.showPassTxt,
                class: this.showPassword() ? config.hidePassIcn : config.showPassIcn,
                onclick: () => this.showPassword(!this.showPassword())
            }))
        ]);
    }
}

class TextareaInput {
    view({ attrs: { field, value } }) {
        const { label, id, name = id, title = label, placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck, instant, uiClass = {}, } = field;
        return m("fieldset.flex.flex-column.h-100.w-100", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, label, required),
            m(".h-100", {
                class: inputWrapperCls(uiClass, propInvalid(field, value()))
            }, m("textarea.w-100.bg-transparent.bn.outline-0.h-100", {
                id, name, title,
                placeholder, required, readonly, disabled, autofocus, autocomplete, spellcheck,
                class: textareaCls(uiClass),
                value: value(),
                style: { resize: "none" },
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setValue(value)
            }))
        ]);
    }
}

class CheckboxInput {
    constructor() {
        this.onIcon = "checkIcn";
        this.offIcon = "uncheckIcn";
    }
    view({ attrs: { field, value } }) {
        const { label = "", id, name = id, title = label, required, readonly, disabled, autocomplete, uiClass = {} } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled),
        }, m("div", {
            class: inputWrapperCls(uiClass)
        }, [
            m("label.flex.items-center", {
                "title": title,
                "class": checkInputCls(uiClass, disabled, readonly),
                "data-input-id": id
            }, m("input.clip[type=checkbox]", {
                id, name,
                checked: value(),
                required, autocomplete,
                disabled: disabled || readonly,
                onchange: setCheck(value),
            }), m("i.mr2", {
                class: config[value() ? this.onIcon : this.offIcon]
            }), getLabelText(label, required), m(CheckLabel, { field, value }))
        ]));
    }
}

class ToggleInput extends CheckboxInput {
    constructor() {
        super(...arguments);
        this.onIcon = "toggleOnIcn";
        this.offIcon = "toggleOffIcn";
    }
}

class RadioInput {
    view({ attrs: { field, value: val } }) {
        const { label: lbl, id, name = id, required, readonly, disabled, autocomplete, options, uiClass = {} } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, lbl, required),
            m("div", {
                class: inputWrapperCls(uiClass, propInvalid(field, val())),
                onchange: setValue(val)
            }, lodash.map(options, ({ value, label = value, icon }) => {
                const checked = val() === value;
                // No requirement for label "for" attribute
                return m("label.dib", {
                    "title": label,
                    "class": radioInputCls(uiClass, checked, disabled, readonly),
                    "data-input-id": id
                }, m("input.clip[type=radio]", {
                    name, value, checked,
                    required, autocomplete,
                    disabled: disabled || readonly
                }), icon ? m("i.fa-fw", {
                    class: icon
                }) : label);
            }))
        ]);
    }
}

class SelectInput {
    view({ attrs: { field, value: val } }) {
        const { label: lbl, id, name = id, title = lbl, required, readonly, disabled, autofocus, autocomplete, uiClass = {}, options } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, lbl, required),
            m("div", {
                class: inputWrapperCls(uiClass, propInvalid(field, val()))
            }, m("select.w-100.bg-transparent.bn.outline-0", {
                id, name, title,
                required, readonly, disabled, autofocus, autocomplete,
                class: inputCls(uiClass),
                value: val(),
                onchange: setValue(val)
            }, lodash.map(options, ({ value, label = value }) => m("option", {
                value,
                disabled: disabled || readonly
            }, label))))
        ]);
    }
}

class FileSelect {
    constructor() {
        this.dragging = stream(false);
    }
    view({ attrs: { field, value, displayType } }) {
        const file = lodash.head(value());
        const { disabled, uiClass = {} } = field;
        const innerText = displayType === "none" /* none */ || !file
            ? config.addFileTxt
            : file.name;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, m(FileInput, {
            field,
            multiple: false,
            dragging: this.dragging,
            onSet: addFiles(value, true),
            value
        }, m("div", {
            class: inputWrapperCls(uiClass, fileInvalid(field, value()))
        }, m(".flex.items-center.pa1", {
            class: fileInputCls(this.dragging())
        }, [
            m("i.pa1", {
                class: config.uploadIcn
            }),
            m("span.ma1.flex-auto", innerText),
            file && displayType !== "none" /* none */ ? [
                m(FileOpen, file),
                m("i.pa1.pointer.dim", {
                    title: `Remove ${file.name}`,
                    class: config.cancelIcn,
                    onclick: removeFile(value, file.guid)
                })
            ] : null
        ]))));
    }
}

function addImages(fileList, maxSize, replace = false) {
    return (addList) => {
        const newFileList = replace ? [] : fileList();
        return Promise.all(lodash.map(addList, (file) => {
            // Limit file dimensions
            return resizeImage(file, maxSize, file.type).then((dataURL) => {
                const newFile = fileConstructor(dataURItoBlob(dataURL), file.name);
                newFileList.push({
                    guid: guid(),
                    name: newFile.name,
                    path: "not_set",
                    file: newFile,
                    dataUrl: dataURL
                });
            });
        })).then(() => {
            fileList(newFileList);
            m.redraw();
        });
    };
}
class ImageMulti {
    constructor() {
        this.dragging = stream(false);
    }
    view({ attrs: { field, value } }) {
        const { disabled, uiClass = {} } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            m(FileInput, {
                field,
                defaultAccept: "image/*",
                dragging: this.dragging,
                onSet: addImages(value, config.imageMaxSize),
                value
            }, m("div", {
                class: inputWrapperCls(uiClass, fileInvalid(field, value()))
            }, m(".w-100.pa1.dt.tc", {
                class: fileInputCls(this.dragging())
            }, m("i.fa-2x.dtc.v-mid", {
                class: config.cameraIcn
            })))),
            m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1", lodash.map(value(), (file) => m(Thumbnail, {
                src: imgSrc(file.path, file.dataUrl),
                style: thumbMaxSize()
            }, m(".absolute.top-0.right-0.child", m(Button, {
                title: `Remove ${file.name}`,
                icon: config.deleteIcn,
                onclick: removeFile(value, file.guid)
            })))))
        ]);
    }
}

class ImageSelect {
    constructor() {
        this.dragging = stream(false);
    }
    view({ attrs: { field, value } }) {
        const file = lodash.head(value());
        const { disabled, uiClass = {} } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, m(FileInput, {
            field,
            defaultAccept: "image/*",
            multiple: false,
            dragging: this.dragging,
            onSet: addImages(value, config.imageMaxSize, true),
            value
        }, m("div", {
            class: inputWrapperCls(uiClass, fileInvalid(field, value()))
        }, m(".pa1", {
            class: fileInputCls(this.dragging())
        }, m(".relative.w-100.dt.tc", file ? [
            m("img.img.contain", {
                title: file.name,
                src: imgSrc(file.path, file.dataUrl),
                style: imgMaxSize()
            }),
            m(".absolute.top-0.right-0.pa1.pointer.dim", {
                title: `Remove ${file.name}`,
                onclick: removeFile(value, file.guid)
            }, m("i.pa1", {
                class: config.cancelIcn
            }))
        ] : m("i.fa-2x.dtc.v-mid", {
            class: config.cameraIcn
        }))))));
    }
}

class SignDraw {
    oncreate({ dom }) {
        const canvas = dom.children[0];
        const initialRatio = pxRatio();
        this.signaturePad = new SignaturePad(canvas, {
            minWidth: 0.5 * initialRatio,
            maxWidth: 1.5 * initialRatio
        });
        // Create resize handler
        const resizeCanvas = () => {
            const resizeRatio = pxRatio();
            canvas.width = canvas.offsetWidth * resizeRatio;
            canvas.height = canvas.offsetHeight * resizeRatio;
            const context = canvas.getContext("2d");
            context.scale(resizeRatio, resizeRatio);
            this.resetCanvas();
        };
        this.resizeHandler = lodash.debounce(resizeCanvas, 250);
        window.addEventListener("resize", this.resizeHandler);
        window.addEventListener("orientationchange", this.resizeHandler);
        resizeCanvas();
    }
    onremove() {
        this.resizeHandler.cancel();
        window.removeEventListener("resize", this.resizeHandler);
        window.removeEventListener("orientationchange", this.resizeHandler);
    }
    view({ attrs: { style, onSet, onCancel } }) {
        return [
            m(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30", { style }, m("canvas.aspect-ratio--object")),
            m(".absolute.top-0.right-0.z-999", {
                style: { transform: "translateY(-100%)" }
            }, [
                m(Button, {
                    title: config.applyTtl,
                    icon: config.applyIcn,
                    classes: "ma1",
                    onclick: () => {
                        if (!this.signaturePad.isEmpty()) {
                            onSet(this.signaturePad.toDataURL("image/png"));
                        }
                    }
                }),
                m(Button, {
                    title: config.resetTtl,
                    icon: config.resetIcn,
                    classes: "ma1",
                    onclick: () => this.resetCanvas()
                }),
                m(Button, {
                    title: config.cancelTtl,
                    icon: config.cancelIcn,
                    classes: "ma1",
                    onclick: onCancel
                })
            ]),
        ];
    }
    resetCanvas() {
        this.signaturePad.clear();
    }
}

function applyText(text, heightPct, callback) {
    return () => {
        if (text()) {
            callback(createStamp(text(), heightPct), { text: text(), heightPct });
        }
        return false;
    };
}
class SignType {
    constructor() {
        this.text = stream("");
    }
    oncreate({ dom }) {
        const input = dom.children[0];
        input.focus({ preventScroll: false });
        this.scaleText(dom);
    }
    onupdate({ dom }) {
        this.scaleText(dom);
    }
    view({ attrs: { heightPct, style, onSet, onCancel } }) {
        return [
            m("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
                style,
                onsubmit: applyText(this.text, heightPct, onSet)
            }, m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
                oninput: setValue(this.text),
                value: this.text(),
                style: {
                    "font-family": config.signFont
                }
            })),
            m(".absolute.top-0.right-0.z-999", {
                style: { transform: "translateY(-100%)" }
            }, [
                m(Button, {
                    title: config.applyTtl,
                    icon: config.applyIcn,
                    classes: "ma1",
                    onclick: applyText(this.text, heightPct, onSet)
                }),
                m(Button, {
                    title: config.resetTtl,
                    icon: config.resetIcn,
                    classes: "ma1",
                    onclick: () => this.text("")
                }),
                m(Button, {
                    title: config.cancelTtl,
                    icon: config.cancelIcn,
                    classes: "ma1",
                    onclick: onCancel
                })
            ])
        ];
    }
    // Post render update text input font based on container size
    scaleText(container) {
        const height = container.clientHeight;
        container.style.fontSize = `${0.56 * height}px`;
    }
}

function applyStamp(heightPct, stampTxt, callback) {
    return () => callback(createStamp(stampTxt, heightPct), { text: stampTxt, heightPct });
}
class SignStamp {
    view({ attrs: { heightPct, stampTxt, stampSetTxt, onSet } }) {
        return [
            m("span.clip", { style: { "font-family": config.signFont } }, stampSetTxt),
            m(".flex", m(Button, {
                label: stampTxt,
                classes: `flex-auto ${config.stampBtnClass}`,
                context: config.stampBtnContext,
                onclick: applyStamp(heightPct, stampSetTxt, onSet)
            }))
        ];
    }
}

// Map SignTypes enum values to widgets
const componentMap = {
    ["draw" /* Draw */]: SignDraw,
    ["type" /* Type */]: SignType,
    ["stamp" /* Stamp */]: SignStamp
};
function setFile(fileList, id, maxSize) {
    return (setDataUrl, metadata) => {
        return scaleDataUrl(setDataUrl, maxSize).then((scaledDataUrl) => {
            fileList([dataUrlToFile(scaledDataUrl, `sign-${id}.png`, metadata)]);
            m.redraw();
        });
    };
}
class SignBuilder {
    oninit({ attrs: { value } }) {
        // Unset signature component on file change
        this.valUpdate = value.map(() => this.setSignType());
    }
    onremove() {
        this.valUpdate.end();
    }
    view({ attrs: { field, value } }) {
        const { label: lbl, id, readonly, disabled, uiClass = {}, options = config.signOpts, heightPct = config.signHeightPct, stampTxt = config.stampTxt, stampSetTxt = config.stampSetTxt } = field;
        const style = {
            paddingBottom: `${heightPct}%`
        };
        const fileObj = lodash.head(value());
        // Convert options into widget descriptions
        const opts = lodash(options).map(({ value: type }) => {
            if (type === "draw" /* Draw */) {
                return {
                    type,
                    icon: config.drawIcn,
                    label: config.signDrawTxt
                };
            }
            else if (type === "type" /* Type */) {
                return {
                    type,
                    icon: config.typeIcn,
                    label: config.signTypeTxt
                };
            }
            else if (type === "stamp" /* Stamp */) {
                return {
                    type,
                    icon: config.stampIcn,
                    label: config.signStampTxt
                };
            }
            return null;
        }).compact().value();
        // Auto-select widget if there is only one option and no file
        if (opts.length === 1 && !fileObj) {
            this.setSignType(opts[0].type);
        }
        return m("fieldset.relative", {
            class: wrapperCls(uiClass, disabled)
        }, [
            getLabel(id, uiClass, lbl),
            m("div", {
                class: this.signType !== "stamp" /* Stamp */
                    ? inputWrapperCls(uiClass, fileInvalid(field, value()))
                    : undefined
            }, readonly || disabled
                // Display component in "readonly" mode
                ? m(".aspect-ratio", {
                    id,
                    style
                }, 
                // Current signature
                fileObj ? m(".aspect-ratio--object", {
                    style: { "pointer-events": "none" }
                }, m("img.img.w-100.absolute", {
                    src: imgSrc(fileObj.path, fileObj.dataUrl)
                })) : null)
                // Use signature creation component (if set)
                : this.signType
                    ? m(componentMap[this.signType], {
                        heightPct,
                        stampTxt,
                        stampSetTxt,
                        style,
                        onSet: setFile(value, id, config.signMaxSize),
                        onCancel: lodash.bind(this.setSignType, this, undefined)
                    })
                    // Display signature preview/creator
                    : m(".aspect-ratio.pointer", {
                        id,
                        class: theme.fileInput,
                        style
                    }, fileObj
                        // Current signature
                        ? m(".aspect-ratio--object.hide-child.dim", {
                            onclick: lodash.bind(value, this, [])
                        }, [
                            m("img.img.w-100.absolute", {
                                src: imgSrc(fileObj.path, fileObj.dataUrl)
                            }),
                            // Remove signature button
                            m(".pa3.absolute.top-0.right-0.child", m("i.fa-2x", {
                                class: config.resetIcn
                            }))
                        ])
                        // Signature creation options
                        : m(".aspect-ratio--object.flex", lodash.map(opts, ({ type, icon, label }) => m(".flex-auto.flex.items-center.justify-center.dim", {
                            title: label,
                            onclick: lodash.bind(this.setSignType, this, type)
                        }, m("i.fa-2x.ma1", {
                            class: icon,
                        }), m("span.ma1.dn.db-ns.truncate", label))))))
        ]);
    }
    // Set/unset signature creation component
    setSignType(type) {
        this.signType = type;
    }
}

function addOmniFiles(fileList, replace) {
    return (addList) => {
        const newFileList = replace ? [] : fileList();
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
            }
            else {
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
    };
}
class OmniFileInput {
    constructor() {
        this.dragging = stream(false);
    }
    view({ attrs: { field, value } }) {
        const file = lodash.head(value());
        const { disabled, uiClass = {} } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, m(FileInput, {
            field,
            defaultAccept: "*",
            multiple: false,
            dragging: this.dragging,
            onSet: addOmniFiles(value, true),
            value
        }, m("div", {
            class: inputWrapperCls(uiClass, fileInvalid(field, value()))
        }, m(".flex.items-center.pa1", {
            class: fileInputCls(this.dragging())
        }, file ? file.dataUrl
            ? [
                // Image preview
                m(".relative.w-100.dt.tc", m("img.img.contain", {
                    title: file.name,
                    src: imgSrc(file.path, file.dataUrl),
                    style: imgMaxSize()
                }), m(".absolute.top-0.right-0.pa1.pointer.dim", {
                    title: `Remove ${file.name}`,
                    onclick: removeFile(value, file.guid)
                }, m("i.pa1", {
                    class: config.cancelIcn
                })))
            ] : [
            // Non-image details
            m(FileOpen, file),
            m("span.ma1.flex-auto", {
                title: file.name,
            }, file.name),
            m("i.pa1.pointer.dim", {
                title: `Remove ${file.name}`,
                class: config.cancelIcn,
                onclick: removeFile(value, file.guid)
            })
        ] : [
            // File upload
            m("i.pa1", {
                class: config.uploadIcn
            }),
            m("span.ma1.flex-auto", config.addFileTxt)
        ]))));
    }
}

class MultiOmniFileInput {
    constructor() {
        this.dragging = stream(false);
    }
    view({ attrs: { field, value, displayType, showDisplay = true } }) {
        const { disabled, uiClass = {} } = field;
        return m("fieldset", {
            class: wrapperCls(uiClass, disabled)
        }, [
            m(FileInput, {
                field,
                defaultAccept: "*",
                dragging: this.dragging,
                onSet: addOmniFiles(value, false),
                value
            }, m("div", {
                class: inputWrapperCls(uiClass, fileInvalid(field, value()))
            }, m(".flex.items-center.pa1.dt", {
                class: fileInputCls(this.dragging())
            }, [
                m("i.pa1", {
                    class: config.uploadIcn
                }),
                m("span.ma1.flex-auto", config.addFileTxt)
            ]))),
            showDisplay ? m(DisplayTypeComponent, {
                displayType,
                value
            }) : null
        ]);
    }
}

export { Badge, BaseInput, BaseText, Button, ButtonLink, CardDateInput, Checkbox, CheckboxInput, CurrencyInput, DateInput, DateText, DisplayTypeComponent, FileList, FileMulti, FileSelect, ImageList, ImageMulti, ImagePreview, ImageSelect, Label, Link, MultiOmniFileInput, NavButton, NavLink, OmniFileInput, PasswordInput, PasswordStrength, RadioInput, SelectInput, SelectText, SignBuilder, TextareaInput, Toggle, ToggleInput, Trusted, createStamp, currencyStrToNumber, dataURItoBlob, dataUrlToFile, fileConstructor, fileNameExtSplit, getOrientation, guid, iconMap, linkAttrs, numberToCurrencyStr, numberToCurrencyTuple, pxRatio, readArrayBuffer, readOrientation, resizeImage, scaleDataUrl, scaleRect, textToImage, updateButtonContext, updateClasses, updateConfig };
