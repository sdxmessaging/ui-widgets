/* @preserve built on: 2022-08-16T09:08:02.892Z */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('mithril'), require('mithril/stream'), require('luxon'), require('signature_pad')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'mithril', 'mithril/stream', 'luxon', 'signature_pad'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uiWidgets = {}, global._, global.m, global.m.stream, global.luxon, global.SignaturePad));
})(this, (function (exports, lodash, m, stream, luxon, SignaturePad) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var lodash__default = /*#__PURE__*/_interopDefaultLegacy(lodash);
    var m__default = /*#__PURE__*/_interopDefaultLegacy(m);
    var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);
    var SignaturePad__default = /*#__PURE__*/_interopDefaultLegacy(SignaturePad);

    const confMap = {
        layoutType: "default" /* default */,
        imageMaxSize: 1280,
        addFileTxt: "Upload...",
        addFilesTxt: "Add file(s)...",
        remFileTtl: "Remove",
        openFileTxt: "Open file",
        showPassTxt: "Show Password",
        requiredLblPost: "",
        dateOpts: [],
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
        radioOnIcn: "fas fa-dot-circle",
        // Font awesome 6
        // radioOnIcn: "fas fa-circle-dot",
        radioOffIcn: "fas fa-circle",
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
        codeFileIcn: "fas fa-file-code",
        currencyFormat: "default",
        toggleFormat: "default"
    };
    const config = confMap;
    function updateConfig(newConfig) {
        lodash__default["default"].assign(confMap, newConfig);
    }
    function getConfig(key, override) {
        return override && key in override
            ? override[key]
            : config[key];
    }

    // ui-widgets 1.4 theme map
    const classMapState = {
        wrapper: "",
        label: "silver",
        inputWrapper: "ba br2 b--silver pa2 ma0 dark-gray",
        input: "dark-gray fw2",
        button: "pa2 bn br2",
        navButton: "dark-gray",
        textarea: "dark-gray fw2",
        fileInputWrapper: "ba bw1 br3 b--black-30 b--dashed dark-gray",
        fileHover: "blue b--blue",
        displayLabel: "silver",
        displayValue: "dark-gray",
        requiredLabel: "",
        disabledWrapper: "o-40",
        invalidInputWrapper: "ba b--red",
        altLabel: "ml1 o-70",
        floatLabelPlaceholder: "",
        invalidCheckboxWrapper: "red",
        toolTipWrapper: "db relative ma2",
        toolTipIconBackground: "bg-black h2 w2 relative br-100 ",
        toolTipIcon: "white f6",
        toolTipMessage: "white bg-black w4 f6 pa2 absolute br2 z-max",
    };
    const theme = classMapState;
    function updateClasses(newConfig) {
        lodash__default["default"].assign(classMapState, newConfig);
    }
    // Button context helpers
    const btnMap = {
        default: "bg-light-blue dark-gray"
    };
    function updateButtonContext(newButtonContext) {
        lodash__default["default"].assign(btnMap, newButtonContext);
    }
    function getButtonContext(key = "default") {
        if (key && key in btnMap) {
            return btnMap[key];
        }
        else {
            return "";
        }
    }
    function joinClasses(list) {
        return lodash__default["default"].compact(list).join(" ");
    }
    // Class string helpers
    function wrapperCls({ wrapper = "", merge = true }, disabled) {
        return joinClasses([
            wrapper,
            merge ? theme.wrapper : "",
            disabled ? theme.disabledWrapper : ""
        ]);
    }
    function labelCls({ label = "", merge = true }, required) {
        return joinClasses([
            label,
            merge ? theme.label : "",
            required ? theme.requiredLabel : ""
        ]);
    }
    function floatLabelPlaceholderCls(uiClass, floatTop, required) {
        return joinClasses([
            labelCls(uiClass, required),
            floatTop ? "f-07em cursor-default" : `${theme.floatLabelPlaceholder} cursor-text`
        ]);
    }
    function inputWrapperCls({ inputWrapper = "", invalidInputWrapper = "", merge = true }, invalid) {
        return joinClasses([
            inputWrapper,
            merge ? theme.inputWrapper : "",
            invalid ? invalidInputWrapper : "",
            invalid && merge ? theme.invalidInputWrapper : "",
        ]);
    }
    function inputCls({ input = "", merge = true }) {
        return joinClasses([
            input, merge ? theme.input : ""
        ]);
    }
    function checkInputCls(uiClass, disabled, readonly) {
        return joinClasses([
            inputCls(uiClass), pointerCls(disabled, readonly)
        ]);
    }
    function textareaCls({ input = "", merge = true }) {
        return joinClasses([
            input, merge ? theme.textarea : ""
        ]);
    }
    function fileHoverCls(dragging) {
        return dragging ? theme.fileHover : "";
    }
    function fileInputWrapperCls({ inputWrapper = "", merge = true }, dragging, invalid) {
        return joinClasses([
            inputWrapper,
            merge ? theme.fileInputWrapper : "",
            invalid ? theme.invalidInputWrapper : "",
            fileHoverCls(dragging)
        ]);
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
        const text = typeof label === "string" ? label : label.text;
        return required ? `${text}${config.requiredLblPost}` : text;
    }
    function getAltLabel({ alt }) {
        return alt ? m__default["default"]("span", { class: theme.altLabel }, alt) : null;
    }
    function imgSrc(path, dataUrl) {
        return dataUrl ? dataUrl : path;
    }
    function enrichLabel(label, selector, attributes, required) {
        return m__default["default"](selector, attributes, [
            label.icon ? m__default["default"]("i", { class: label.icon }) : null,
            m__default["default"]("span", getLabelText(label, required)),
            getAltLabel(label),
            label.rightIcon ? m__default["default"]("i", { class: label.rightIcon }) : null,
            label.href ? m__default["default"]("a.link.dim.pointer.ws-normal.mh1", { onclick: label.onclick }, [
                m__default["default"]("i", { class: config.linkIcn }),
                label.href
            ]) : null
        ]);
    }
    // Used by display widgets
    function getDisplayLabel(label) {
        if (label) {
            if (typeof label === 'string') {
                return m__default["default"]("span.mr2.truncate", {
                    title: label,
                    class: theme.displayLabel
                }, label);
            }
            else {
                return enrichLabel(label, "span.mr2.truncate", {
                    title: label.text,
                    class: theme.displayLabel
                });
            }
        }
        return null;
    }
    // Used by input widgets
    function getLabel(id, uiClass, label, required) {
        if (label) {
            if (typeof label === 'string') {
                return m__default["default"]("label.mb1.db", {
                    title: label,
                    for: id,
                    class: labelCls(uiClass, required),
                }, getLabelText(label, required));
            }
            else {
                return enrichLabel(label, "label.mb1.db", {
                    title: label.text,
                    for: id,
                    class: labelCls(uiClass, required),
                }, required);
            }
        }
        return null;
    }
    function labelIcon(label) {
        return [
            label.icon && m__default["default"]("i.fa-fw", {
                class: label.icon
            }),
            label.text && m__default["default"]("span", label.text),
            label.rightIcon && m__default["default"]("i.fa-fw", {
                class: label.rightIcon
            })
        ];
    }
    // Input widget TProp update helpers
    function setValue(val) {
        return function ({ target: { value } }) {
            val(value);
        };
    }
    function setCheck(val, checkValue) {
        return checkValue != null
            ? function ({ target: { checked } }) {
                val(checked ? checkValue : false);
            }
            : function ({ target: { checked } }) {
                val(checked);
            };
    }
    function setIfDifferent(inStream, val) {
        if (inStream() !== val) {
            inStream(val);
        }
    }
    /* Event handler helper, select all text in a given input target */
    function selectTarget({ target }) {
        target.select();
    }
    function clickOnEnter({ key }) {
        if (key === "Enter" && document.activeElement) {
            document.activeElement.click();
        }
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
        const [header, content] = dataURI.split(",");
        const bytes = header.indexOf("base64") >= 0 ?
            atob(content) :
            unescape(content);
        const attributes = header
            .substring(header.indexOf("data:") + 5)
            .split(";");
        const mimeType = attributes[0];
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
        return new File([blob], fileName, { type: blob.type });
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
        // Ensure file starts with jpeg marker
        if (view.getUint16(0, false) !== 65496 /* jpeg */) {
            return -2;
        }
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
            const marker = view.getUint16(offset, false);
            offset += 2;
            // Exif and orientation data found in APP1 section
            if (marker === 65505 /* app1 */) {
                offset += 2;
                // Ensure APP1 section contains EXIF info
                if (view.getUint32(offset, false) !== 1165519206 /* exif */) {
                    return -1;
                }
                // Get TIFF header from exif info
                offset += 6;
                // TIFF header endianness
                const little = view.getUint16(offset, false) === 18761 /* tiff */;
                // Get number of tags
                offset += view.getUint32(offset + 4, little);
                const tags = view.getUint16(offset, little);
                offset += 2;
                // Traverse tags until orientation tag is found
                for (let i = 0; i < tags; i++) {
                    if (view.getUint16(offset + (i * 12), little) === 274 /* orientation */) {
                        return view.getUint16(offset + (i * 12) + 8, little);
                    }
                }
            }
            else if ((marker & 65280 /* unknown */) !== 65280 /* unknown */) {
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
    function createStamp(sign, heightPct, config) {
        const width = getConfig("signMaxSize", config);
        // Signatures assumed wider than their height
        const height = 0.01 * heightPct * width;
        return textToImage(sign, width, height, getConfig("signFont", config));
    }

    class Badge {
        view({ attrs: { label, classes = "bg-red" }, children }) {
            return m__default["default"](".relative.dib", [
                children,
                label ? m__default["default"]("span.absolute.minw-65rem.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80", {
                    class: classes
                }, label) : null
            ]);
        }
    }

    class Button {
        view({ attrs: { label = "", type = "button", title = label, icon, rightIcon, context, classes = "", style, disabled, onclick, tabindex } }) {
            return m__default["default"]("button.button-reset", {
                type, title, disabled,
                class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${getButtonContext(context)} ${theme.button}`,
                style, tabindex,
                onclick
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    class ButtonLink {
        view({ attrs: { label = "", title = label, icon, rightIcon, href, rel, target, download, context, classes = "", style } }) {
            return m__default["default"]("a.link.flex.items-center", {
                href, rel, target, download, title,
                class: `${classes} ${getButtonContext(context)} ${theme.button}`,
                style
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    class NavButton {
        view({ attrs: { label = "", title = label, icon, rightIcon, classes = "", style, disabled, onclick } }) {
            return m__default["default"](".mh2.pa2.truncate", {
                title, disabled,
                class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${theme.navButton}`,
                style,
                onclick
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    class NavLink {
        view({ attrs: { label = "", title = label, icon, rightIcon, href, rel, target, download, classes = "", style } }) {
            return m__default["default"]("a.link.mh2.pa2.truncate", {
                href, rel, target, download, title,
                class: `${classes} ${theme.navButton}`,
                style
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    function selectDirection(direction) {
        switch (direction) {
            case "left" /* left */:
                return {
                    left: 'initial',
                    top: 'initial',
                    right: 'calc(100% + 0.25rem)',
                    bottom: 'initial',
                };
            case "top" /* top */:
                return {
                    left: 'initial',
                    top: 'initial',
                    right: 'initial',
                    bottom: 'calc(100% + 0.25rem)',
                };
            case "topRight" /* topRight */:
                return {
                    left: 'calc(100%)',
                    top: 'initial',
                    right: 'initial',
                    bottom: 'calc(100%)',
                };
            case "topLeft" /* topLeft */:
                return {
                    left: 'initial',
                    top: 'initial',
                    right: 'calc(100%)',
                    bottom: 'calc(100%)',
                };
            case "bottom" /* bottom */:
                return {
                    left: 'initial',
                    top: 'calc(100% + 0.25rem)',
                    right: 'initial',
                    bottom: 'initial',
                };
            case "bottomRight" /* bottomRight */:
                return {
                    left: "calc(100%)",
                    top: 'calc(100%)',
                    right: 'initial',
                    bottom: 'initial',
                };
            case "bottomLeft" /* bottomLeft */:
                return {
                    left: 'initial',
                    top: 'calc(100%)',
                    right: 'calc(100%)',
                    bottom: 'initial',
                };
            default:
                return {
                    left: 'calc(100% + 0.25rem)',
                    top: 'initial',
                    right: 'initial',
                    bottom: 'initial',
                };
        }
    }
    class ToolTip {
        constructor() {
            this.show = false;
        }
        view({ attrs: { message, direction = "right" /* right */, icon = 'fa-info' } }) {
            return m__default["default"]("div", {
                class: theme.toolTipWrapper
            }, [
                m__default["default"](".flex.items-center.justify-center", {
                    class: theme.toolTipIconBackground,
                    onmouseenter: () => {
                        this.show = true;
                    },
                    onmouseleave: () => {
                        this.show = false;
                    }
                }, [
                    m__default["default"](`i.fas.${icon}`, {
                        class: theme.toolTipIcon,
                    }),
                    m__default["default"]("span", {
                        class: joinClasses([theme.toolTipMessage, this.show ? "db" : "dn"]),
                        style: selectDirection(direction)
                    }, message)
                ])
            ]);
        }
    }

    class Trusted {
        view({ attrs: { value } }) {
            return m__default["default"](".pa2", {}, m__default["default"].trust(value()));
        }
    }

    class BaseText {
        view({ attrs: { field, value } }) {
            const { label, uiClass = {} } = field;
            return m__default["default"](".pa2.flex.flex-wrap", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m__default["default"]("span.ws-normal", {
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
            return m__default["default"](BaseText, {
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
    /** @deprecated Use `linkIcon` method */
    const iconMap = {
        email: config.emailIcn,
        tel: config.telIcn
    };
    function linkIcon(type, override) {
        if (type === "email" /* email */) {
            return getConfig("emailIcn", override);
        }
        else if (type === "tel" /* tel */) {
            return getConfig("telIcn", override);
        }
        else {
            return getConfig("linkIcn", override);
        }
    }
    class Link {
        view({ attrs: { field, value } }) {
            const { label, type = "url" /* url */, uiClass = {}, config } = field;
            return m__default["default"](".pa2.flex.flex-wrap", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m__default["default"]("a.link.dim.pointer.ws-normal", linkAttrs(type, value()), m__default["default"]("i.mr2", {
                    class: linkIcon(type, config)
                }), value())
            ]);
        }
    }

    class CheckLabel {
        view({ attrs: { value, doubleLabel, options, left } }) {
            const valLabel = lodash__default["default"].find(options, 
            // Empty value stream to be handled as false
            lodash__default["default"].matches({ value: (!doubleLabel ? value : !left) || false }));
            const truthy = (Boolean(value) && !left) || (!value && left) || !doubleLabel;
            return valLabel && valLabel.label
                ? m__default["default"]("span", {
                    class: joinClasses([left ? "mr2" : "ml2", truthy ? "" : "o-40"])
                }, valLabel.label)
                : null;
        }
    }

    class Checkbox {
        constructor() {
            this.onIcon = "checkIcn";
            this.offIcon = "uncheckIcn";
        }
        view({ attrs: { field, value } }) {
            const { label, options, uiClass = {}, config } = field;
            return m__default["default"](".pa2.flex.items-center", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m__default["default"]("i", {
                    class: `${theme.displayValue} ${getConfig(value() ? this.onIcon : this.offIcon, config)}`
                }),
                m__default["default"](CheckLabel, { value: value(), doubleLabel: false, options, left: false })
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

    // TODO Expand validation for field input masks, min/max, minlength/maxlength etc
    function propInvalid(field, value) {
        if ((!field.required && !value) || field.disabled) {
            return false;
        }
        if (field.required && !value) {
            return true;
        }
        if (field.pattern != null) {
            if (patternInvalid(field.pattern, String(value)))
                return true;
        }
        if (rangeInvalid(field, value))
            return true;
        return false;
    }
    function rangeInvalid(field, value) {
        let overMax = false;
        let underMin = false;
        if (field.min != null) {
            underMin = Number.parseInt(String(value)) < field.min;
        }
        if (field.max != null) {
            overMax = Number.parseInt(String(value)) > field.max;
        }
        if (field.minlength != null) {
            underMin = String(value).length < field.minlength;
        }
        if (field.maxlength != null) {
            overMax = String(value).length > field.maxlength;
        }
        return underMin || overMax;
    }
    function patternInvalid(pattern, value) {
        return !(new RegExp(pattern)).test(value);
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
        constructor() {
            this.showLabel = true;
        }
        oncreate({ dom, attrs: { value } }) {
            value.map((list) => {
                if (list.length === 0) {
                    dom.firstChild.value = "";
                }
            });
        }
        view({ attrs: { field, defaultAccept = "*", multiple = true, dragging, onSet }, children }) {
            const { label, id, name = id, title = label, required, readonly, disabled, autofocus, tabindex = "0", accept = defaultAccept, uiClass = {} } = field;
            const labelInner = this.showLabel && label ? getLabel(id, uiClass, label, required) : null;
            return m__default["default"]("label.db", lodash__default["default"].extend({
                "for": id,
                "title": title,
                "aria-labelled-by": id,
                "class": pointerCls(disabled, readonly),
                "data-input-id": id,
                tabindex,
                onkeydown: (e) => {
                    var _a;
                    if (e.key === " ") {
                        ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.firstElementChild).click();
                    }
                }
            }, disabled || readonly ? {} : {
                ondragover: dragStart(dragging),
                ondragleave: dragStop(dragging),
                ondrop: drop(dragging, onSet)
            }), [
                m__default["default"]("input.clip[type=file].bg-transparent.bn.outline-0", {
                    id, name, multiple, accept,
                    required, autofocus,
                    disabled: disabled || readonly,
                    tabindex: -1,
                    onchange: change(onSet),
                }),
                labelInner,
                children
            ]);
        }
    }

    function addFiles(fileList, replace = false) {
        return (addList) => {
            const newFileList = replace ? [] : fileList();
            lodash__default["default"].each(addList, (file) => {
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
            lodash__default["default"].remove(newFileList, { guid: removeGuid });
            fileList(newFileList);
        };
    }
    class FileMulti {
        constructor() {
            this.dragging = stream__default["default"](false);
        }
        view({ attrs: { field, value } }) {
            const { disabled, uiClass = {}, config, readonly } = field;
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled)
            }, [
                m__default["default"](FileInput, {
                    field,
                    dragging: this.dragging,
                    onSet: addFiles(value),
                    value
                }, m__default["default"](".pa2", {
                    class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
                }, [
                    m__default["default"]("i.mr2", {
                        class: getConfig("uploadIcn", config)
                    }),
                    m__default["default"]("span", getConfig("addFilesTxt", config))
                ])),
                m__default["default"](".flex.flex-column.mt1.nb1", lodash__default["default"].map(value(), (file) => m__default["default"]("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
                    m__default["default"]("i.mr2", {
                        class: getConfig("downloadIcn", config)
                    }),
                    file.name,
                    !(readonly || disabled) && m__default["default"]("i.child.fr", {
                        title: `${getConfig("remFileTtl", config)} ${file.name}`,
                        class: getConfig("deleteIcn", config),
                        onclick: removeFile(value, file.guid)
                    })
                ])))
            ]);
        }
    }

    class Thumbnail {
        view({ children, attrs }) {
            return m__default["default"](".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child", {
                tabindex: 0,
                // Click contained button if present
                onkeydown: ({ key }) => {
                    var _a;
                    if (key === "Enter" && document.activeElement) {
                        (_a = document.activeElement.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
                    }
                }
            }, [
                attrs.src && attrs.src !== "not_set" ? m__default["default"]("img.contain", { src: attrs.src }) : null,
                attrs.data && attrs.data.file && (attrs.src === "not_set" || !attrs.src) ? (m__default["default"]("div.contain.tc.br5.6rem", {
                    class: `${getFileTypeIcon(attrs.data)} fa-2x`,
                    tooltip: attrs.data.file.type
                })) : null,
                children
            ]);
        }
    }

    class FileOpen {
        view({ attrs }) {
            return m__default["default"]("i.pa1", {
                class: getFileTypeIcon(attrs),
                title: config.openFileTxt,
                onclick: attrs.path !== "not_set"
                    ? () => window.open(attrs.path, "_blank")
                    : undefined
            });
        }
    }

    class DisplayTypeComponent {
        view({ attrs: { displayType = "thumbnail" /* thumbnail */, value, readonlyOrDisabled, config } }) {
            return displayType === "thumbnail" /* thumbnail */ ? m__default["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb", lodash__default["default"].map(value(), (file) => m__default["default"](Thumbnail, {
                src: imgSrc(file.path, file.dataUrl),
                data: file
            }, !readonlyOrDisabled && m__default["default"](".absolute.top-0.right-0.child", m__default["default"](Button, {
                title: `Remove ${file.name}`,
                icon: getConfig("deleteIcn", config),
                onclick: removeFile(value, file.guid),
                tabindex: -1
            }))))) : m__default["default"](".pa2.flex.flex-column", lodash__default["default"].map(value(), (file) => m__default["default"](".flex.items-center.pa1.ba.b--black-20", [
                m__default["default"]("i.pa1", {
                    class: getConfig("uploadIcn", config)
                }),
                m__default["default"]("span.ma1.flex-auto", {
                    title: file.name
                }, file.name),
                m__default["default"](FileOpen, file),
                !readonlyOrDisabled && m__default["default"]("i.pa1.pointer.dim", {
                    title: `Remove ${file.name}`,
                    class: getConfig("cancelIcn", config),
                    onclick: removeFile(value, file.guid)
                })
            ])));
        }
    }

    class SelectText {
        view({ attrs: { field, value } }) {
            const { label: lbl, uiClass = {} } = field;
            // Get label for selected options (falling back to the value)
            const option = lodash__default["default"].find(field.options, { value: value() });
            const label = option ? option.label || option.value : value();
            return m__default["default"](".pa2.flex.flex-wrap", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(lbl),
                m__default["default"]("span.ws-normal", {
                    title: label,
                    class: theme.displayValue
                }, label)
            ]);
        }
    }

    class FileList {
        view({ attrs: { field, value } }) {
            const { label, uiClass = {}, config } = field;
            return m__default["default"](".pa2.flex.flex-column", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m__default["default"](".flex.flex-column.mt1.nb1", lodash__default["default"].map(value(), ({ name, path }) => {
                    return m__default["default"]("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]", {
                        class: theme.displayValue,
                        href: path
                    }, m__default["default"]("i.mr2", {
                        class: getConfig("downloadIcn", config)
                    }), name);
                }))
            ]);
        }
    }

    class ImageList {
        view({ attrs: { field, value } }) {
            const { label, uiClass = {} } = field;
            return m__default["default"](".pa2.flex.flex-column", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m__default["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb", lodash__default["default"].map(value(), ({ name, path, dataUrl }) => m__default["default"](Thumbnail, {
                    title: name,
                    src: imgSrc(path, dataUrl)
                })))
            ]);
        }
    }

    class ImagePreview {
        view({ attrs: { field, value } }) {
            const { label, uiClass = {}, config } = field;
            const file = lodash__default["default"].head(value());
            return m__default["default"](".pa2.flex.flex-column", {
                class: wrapperCls(uiClass)
            }, [
                getDisplayLabel(label),
                file ? m__default["default"]("img.img.h-100.max-h-img.mt2.contain.self-center", {
                    title: file.name,
                    src: imgSrc(file.path, file.dataUrl)
                }) : m__default["default"]("i.mt2", {
                    class: `${theme.displayValue} ${getConfig("imageIcn", config)}`
                })
            ]);
        }
    }

    function countMatches(input, pattern) {
        return (input.match(pattern) || []).length;
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
            // At least 2 upper and 3 lower case characters
            if (countMatches(value, /[A-Z]/g) > 1 && countMatches(value, /[a-z]/g) > 2) {
                totalScore = totalScore + 1;
            }
            // At least 2 digits
            if (countMatches(value, /[\d]/g) > 1) {
                totalScore = totalScore + 1;
            }
            // At least one special character
            if (countMatches(value, /[!"£%^@#$&*]/g) > 0) {
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
            const { label } = field;
            return m__default["default"](".flex.flex-column", [
                getDisplayLabel(label),
                m__default["default"](".flex.mt1", lodash__default["default"].map(passwordStrength, (val) => m__default["default"](".h1.w-20", {
                    class: this.passwordScore() >= val.value ? val.background : "bg-transparent"
                }))),
                m__default["default"]("span.f5.truncate", passwordStrengthStr(this.passwordScore()))
            ]);
        }
    }

    class Label {
        view({ attrs: { field: { label = "", id, required, uiClass = {} } } }) {
            return m__default["default"]("div", { class: wrapperCls(uiClass) }, getLabel(id, uiClass, label, required));
        }
    }

    class ValidationBase {
        constructor() {
            this.invalid = false;
            this.selector = "input";
        }
        onupdate({ dom, attrs: { field, value } }) {
            const input = dom.querySelector(this.selector);
            // Validate from custom implementation or input element
            const invalid = propInvalid(field, value()) || (input ? !input.checkValidity() : false);
            if (invalid !== this.invalid) {
                this.invalid = invalid;
                m__default["default"].redraw();
            }
        }
    }

    class Basic {
        view({ attrs, children }) {
            const { field, invalid } = attrs;
            const { label, id, type = "text" /* text */, required, disabled, uiClass = {} } = field;
            // Wrapper
            return m__default["default"]("div", {
                class: type === "hidden" /* hidden */ ? "clip" : wrapperCls(uiClass, disabled)
            }, [
                // Basic label
                getLabel(id, uiClass, label, required),
                // Input wrapper
                m__default["default"]("fieldset.bn", {
                    class: inputWrapperCls(uiClass, invalid)
                }, 
                // Input
                children)
            ]);
        }
    }

    class FloatLabel {
        constructor() {
            this.focus = false;
            this.focusIn = () => {
                this.focus = true;
            };
            this.focusOut = () => {
                this.focus = false;
            };
            this.wrapperHeight = 0;
        }
        oncreate({ dom }) {
            this.inputWrapper = dom.firstElementChild;
            this.calcHeight();
        }
        onupdate() {
            this.calcHeight();
        }
        calcHeight() {
            if (this.inputWrapper.clientHeight !== this.wrapperHeight) {
                this.wrapperHeight = this.inputWrapper.clientHeight;
                m__default["default"].redraw();
            }
        }
        // Float label if element has a value set or is in focus
        shouldFloat(layout, value, readonly = false) {
            return layout === "floatAlways" /* floatAlways */ || this.focus || Boolean(value) || readonly;
        }
        labelTranslateY() {
            return `calc(${this.wrapperHeight * 0.5}px - 1.5ex)`;
        }
        labelContent(label, required) {
            return typeof label === "string"
                ? getLabelText(label, required)
                : [getLabelText(label, required), getAltLabel(label)];
        }
        view({ attrs, children }) {
            const { field, invalid, value, xform = value } = attrs;
            const { label, id, type = "text" /* text */, placeholder, required, disabled, readonly, uiClass = {}, config, layout = getConfig("layoutType", config) } = field;
            // Placeholder or value count as value content
            const floatTop = this.shouldFloat(layout, placeholder || xform(), readonly);
            // Wrapper (padding for shrunk label overflow)
            return m__default["default"]("div", {
                class: `${type === "hidden" /* hidden */ ? "clip" : wrapperCls(uiClass, disabled)} ${label ? "pt2" : ""}`,
                onfocusin: this.focusIn,
                onfocusout: this.focusOut
            }, 
            // Input wrapper
            m__default["default"]("fieldset.relative.pa0.ma0.flex.w-100", {
                class: inputWrapperCls(uiClass, invalid)
            }, [
                label && this.wrapperHeight ? [
                    // Break fieldset border, make space for label to float into
                    m__default["default"]("legend.db.hidden.h-05ch.transition-mw", {
                        class: `${labelCls(uiClass, required)} ${floatTop ? "mw-100" : "mw-001px"}`,
                    }, m__default["default"]("span.f-07em", this.labelContent(label, required))),
                    // Floating label
                    m__default["default"](".absolute.top-0.transition-transform", {
                        style: {
                            // Input wrapper legend or center
                            transform: `translateY(${floatTop ? "-1ch" : this.labelTranslateY()})`
                        }
                    }, m__default["default"]("label.db.transition-f", {
                        for: id, title: typeof label === "string" ? label : label.text,
                        class: floatLabelPlaceholderCls(uiClass, floatTop, required)
                    }, this.labelContent(label, required)))
                ] : null,
                // Input
                children
            ]));
        }
    }

    class Layout {
        constructor() {
            this.layout = FloatLabel;
        }
        view({ attrs, children }) {
            const { field: { config, layout = getConfig("layoutType", config) } } = attrs;
            return m__default["default"](layout === "default" /* default */ ? Basic : this.layout, attrs, children);
        }
    }

    class FixedLabel extends FloatLabel {
        shouldFloat() {
            return true;
        }
    }

    class LayoutFixed extends Layout {
        constructor() {
            super(...arguments);
            this.layout = FixedLabel;
        }
    }

    // Types that don't support animated floating labels
    const fixedLabelTypes = new Set([
        "date" /* date */,
        "datetime-local" /* dateTimeLocal */,
        "color" /* color */,
        "range" /* range */
    ]);
    class BaseInput extends ValidationBase {
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, type = "text" /* text */, name = id, title = label, placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, spellcheck, instant, uiClass = {} } = field;
            const layoutComp = fixedLabelTypes.has(type) ? LayoutFixed : Layout;
            return m__default["default"](layoutComp, {
                field,
                value,
                xform,
                invalid: this.invalid
            }, m__default["default"]("input.w-100.bg-transparent.bn.outline-0", {
                id, type, name, title, placeholder,
                max, maxlength, min, minlength, step, required,
                readonly, disabled, autofocus, autocomplete, tabindex,
                pattern, inputmode, spellcheck,
                class: inputCls(uiClass),
                value: xform(),
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setValue(value)
            }));
        }
    }

    class CurrencyInput {
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, name = id, title = label, placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, spellcheck, instant, uiClass = {}, config, options } = field;
            const currency = options && options.length ? options[0].value : "$";
            const currencyFormat = getConfig("currencyFormat", config);
            return m__default["default"](LayoutFixed, {
                field,
                value,
                invalid: propInvalid(field, value())
            }, m__default["default"]('.flex.flex-row.w-100', m__default["default"]("span.mr1.self-center", {
                class: inputCls(uiClass)
            }, currency), m__default["default"]("input.w-100.bg-transparent.bn.outline-0", {
                id, type: "text" /* text */, name, title, placeholder,
                max, maxlength, min, minlength, step, required,
                readonly, disabled, autofocus, autocomplete, tabindex,
                pattern, inputmode, spellcheck,
                class: inputCls(uiClass),
                onfocus: selectTarget,
                value: lodash__default["default"].isUndefined(xform())
                    ? null
                    : formatCurrency(propToNumber(xform()), currencyFormat),
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setCurrencyValue(value)
            })));
        }
    }
    function formatCurrency(unitTotal, currencyFormat) {
        const currencyStr = numberToCurrencyStr(unitTotal);
        if (currencyFormat === "accounting" && unitTotal < 0) {
            return `(${currencyStr})`;
        }
        else {
            return currencyStr;
        }
    }
    function propToNumber(value) {
        return lodash__default["default"].isString(value) ? lodash__default["default"].parseInt(value) : Number(value);
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
            left = lodash__default["default"].parseInt(lodash__default["default"].padStart(leftStr, 1, "0"));
            // Only accept first 2 figures after decimal
            const rightStr = inputStr.substring(decimalPos + 1, Math.min(decimalPos + 3, inputStr.length));
            // Ensure right component has 2 characters
            right = lodash__default["default"].parseInt(lodash__default["default"].padEnd(rightStr, 2, "0"));
        }
        else {
            left = lodash__default["default"].parseInt(inputStr) || 0;
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
        if (!lodash__default["default"].isFinite(unitTotal)) {
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
            small = lodash__default["default"].padStart(valStr, 2, "0");
        }
        return [large, small];
    }
    // Currency TProp update helper
    function setCurrencyValue(val) {
        return ({ target: { value } }) => val(currencyStrToNumber(value));
    }

    class PercentageInput {
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, name = id, title = label, placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, spellcheck, instant, uiClass = {}, } = field;
            return m__default["default"](LayoutFixed, {
                field,
                value,
                invalid: propInvalid(field, value())
            }, m__default["default"]('.flex.flex-row.w-100', [
                m__default["default"]("input.w-100.bg-transparent.bn.outline-0", {
                    id, type: "text" /* text */, name, title, placeholder,
                    max, maxlength, min, minlength, step, required,
                    readonly, disabled, autofocus, autocomplete, tabindex,
                    pattern, inputmode, spellcheck,
                    class: inputCls(uiClass),
                    onfocus: selectTarget,
                    value: xform(),
                    // Update value on change or input ("instant" option)
                    [instant ? "oninput" : "onchange"]: setValue(value)
                }),
                m__default["default"]("span.mr1.self-center", {
                    class: inputCls(uiClass)
                }, "%")
            ]));
        }
    }

    // All individual inputs have a fixed suffix for date types
    function dateInputIds(type) {
        switch (type) {
            case 'day': return 'dd';
            case 'month': return 'mm';
            case 'year': return 'yyyy';
        }
    }
    // Clicking on the label calls this function to "remember" the last focused input
    function focusLastInput(dom, id, focusedId) {
        const lastFocused = dom.querySelector(`#${id}-${focusedId}`);
        lastFocused.focus();
    }
    // For showing custom validity message at the right place/input
    function getInvalidInput(message) {
        const formattedMessage = message ? message.toLocaleLowerCase() : "";
        if (formattedMessage.includes('month')) {
            return 'mm';
        }
        else if (formattedMessage.includes('day')) {
            return "dd";
        }
        else if (formattedMessage.includes('year')) {
            return 'yy';
        }
        else {
            return null;
        }
    }
    function focusAndSelectNextInput(dom, id, targetType) {
        const nextInput = dom.querySelector(`#${id}-${targetType}`);
        nextInput.focus();
        nextInput.select();
    }
    function getElementMaxLength(element) {
        return parseInt(element.getAttribute("maxlength"));
    }
    function handleRetreatOrLiteralAdvance(id, selfType, streamValue, dom, event, literalKey, { next, prev }) {
        const self = dom.querySelector(`#${id}-${selfType}`);
        const maxLength = getElementMaxLength(self);
        if ((event.key === 'Backspace' || event.key === 'Delete') && streamValue.length === 0 && prev) {
            focusAndSelectNextInput(dom, id, prev);
            // prevent event from passing to the previous field & deleting characters right away
            event.preventDefault();
        }
        else if (literalKey.charCodeAt(0) === event.key.charCodeAt(0)
            && next && streamValue.length !== 0 && streamValue.length < maxLength) {
            focusAndSelectNextInput(dom, id, next);
            // prevent event from passing to the next field & advancing right away
            event.preventDefault();
        }
    }
    // for multi date binding purpose, to reset value stream when date stream is invalid
    function resetInvalidValueStream(valid, date, year, month, day, valueStream) {
        if (validDateInputLengths(year, month, day) && valid) {
            valueStream(date);
        }
        else {
            valueStream("");
        }
    }
    function appendZeroToDayMonth(valueStream) {
        const value = String(valueStream());
        if (value.length === 1 && value !== '0') {
            valueStream(`0${value}`);
        }
    }
    function validDateInputLengths(year, month, day) {
        // Expect 4 digit year for full date, 2 digit for "card date" (no day component)
        const yearLength = !day ? 2 : 4;
        return year.length === yearLength && month.length === 2 && (!day || day.length === 2);
    }
    // get input type for the message from Luxon error explanation
    function getDateFromExplanation(errMsg) {
        if (errMsg.includes('month')) {
            return 'month';
        }
        else if (errMsg.includes('day')) {
            return 'day';
        }
        // edge case
        return "date";
    }
    function getDateValidityMessage(validation, year, dateEmpty) {
        if (validation.invalidExplanation) {
            if (dateEmpty) {
                return "";
            }
            else {
                // Get the wrong input type from the luxon invalidation explanation
                return `Please check the ${getDateFromExplanation(validation.invalidExplanation)}.`;
            }
        }
        else if (!validation.year || Number(year) < 1900) {
            return "Year must be greater than 1900.";
        }
        // If valid
        return "";
    }
    function getCardDateValidityMessage(year, month, valid) {
        if (!valid) {
            if (!month && !year) {
                // Default broswer validation message
                return "";
            }
            else if (month.length !== 2 || Number(month) > 12) {
                return `Please check the month.`;
            }
            else if (year.length !== 2) {
                return `Please check the year.`;
            }
        }
        // unset validation message if valid
        return "";
    }
    // Loop through all 2-3 date inputs and only set custom validity for the wrong one
    function setAllValidityMessage(message, dom) {
        if (dom) {
            const inputId = getInvalidInput(message);
            dom.querySelectorAll('input').forEach((item) => {
                if (inputId && item.id.substr(-2) === inputId && message) {
                    item.setCustomValidity(message);
                }
                else {
                    item.setCustomValidity("");
                }
            });
        }
    }
    function validateCardDate(year, month, required, dom) {
        const valid = (month.length === 2 && year.length === 2
            && Number(month) <= 12 && Number(month) > 0) || (!year && !month && !required);
        setAllValidityMessage(getCardDateValidityMessage(year, month, valid), dom);
        return valid;
    }
    function validateDate(year, month, day, required, dom) {
        const validation = luxon.DateTime.fromObject({
            year: Number(year),
            month: Number(month),
            day: Number(day)
        });
        const dateEmpty = !year && !month && !day;
        setAllValidityMessage(getDateValidityMessage(validation, year, dateEmpty), dom);
        return (validation.isValid && Number(year) >= 1900) || (dateEmpty && !required);
    }
    function handleDateChange(streamType, id, selfType, dom, targetType) {
        const self = dom.querySelector(`#${id}-${selfType}`);
        const prevValue = streamType() || "";
        const value = self.value;
        const isNumeric = /^\d*$/.test(value);
        if ((isNumeric || value === "") && value.length <= 4) {
            streamType(value);
        }
        else {
            // preserve current/previous value when rules are broken
            streamType(prevValue);
        }
        if (String(streamType()).length === getElementMaxLength(self) && targetType) {
            focusAndSelectNextInput(dom, id, targetType);
        }
    }

    class HiddenDateInput {
        view({ attrs }) {
            const { id } = attrs.field;
            return m__default["default"]('input.dn', { id });
        }
    }

    class CardDateInput {
        constructor() {
            this.dom = stream__default["default"]();
            this.valid = stream__default["default"]();
            this.focusedInput = stream__default["default"]('mm');
            this.month = stream__default["default"]("");
            this.year = stream__default["default"]("");
            this.date = stream__default["default"]("");
        }
        buildDate(required, valueStream) {
            this.date(`${this.month()}/${this.year()}`);
            const valid = validateCardDate(this.year(), this.month(), required, this.dom());
            resetInvalidValueStream(valid, this.date(), this.year(), this.month(), "", valueStream);
        }
        oninit({ attrs: { value, field } }) {
            this.valid(!field.required);
            // Split value into date parts
            value.map((newVal) => {
                // only handle value when the main value stream is changed
                if (newVal) {
                    this.date('');
                    const [month, year] = String(newVal).split("/");
                    // set individual date inputs based on value stream (not date stream)
                    this.month(month);
                    this.year(year);
                }
                // only reset the non-edited date fields
                else if (!this.date()) {
                    this.month('');
                    this.year('');
                }
                this.valid(validateCardDate(this.year(), this.month(), Boolean(field.required), this.dom()));
            });
        }
        oncreate({ dom }) {
            setIfDifferent(this.dom, dom);
        }
        onupdate({ dom }) {
            setIfDifferent(this.dom, dom);
        }
        onremove() {
            this.date.end(true);
            this.year.end(true);
            this.month.end(true);
        }
        view({ attrs }) {
            const { field, value } = attrs;
            const { id, name = id, required, readonly, disabled, tabindex, uiClass = {} } = field;
            const classStr = inputCls(uiClass);
            return m__default["default"](LayoutFixed, { value, field, invalid: !this.valid() }, m__default["default"]('.flex.ph-2px.pv-1px', {
                onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
            }, m__default["default"]("span", [
                m__default["default"]("input.w-100.mw-mm.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-mm`, name: `${name}-mm`,
                    type: "text" /* text */, placeholder: "MM",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    'aria-label': `${name}: Month`,
                    value: this.month(),
                    class: classStr,
                    onfocus: lodash__default["default"].partial(this.focusedInput, 'mm'),
                    oninput: () => {
                        handleDateChange(this.month, id, "mm", this.dom(), "yy");
                        this.buildDate(Boolean(field.required), attrs.value);
                    },
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, 'mm', this.month(), this.dom(), e, '/', { next: 'yy' });
                    },
                    onblur: () => {
                        appendZeroToDayMonth(this.month);
                        this.buildDate(Boolean(field.required), attrs.value);
                    }
                })
            ]), m__default["default"]("span.pa0.mr-2px", "/"), m__default["default"]("span", [
                m__default["default"]("input.w-100.mw-yy.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-yy`, name: `${name}-yy`,
                    type: "text" /* text */, placeholder: "YY",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    'aria-label': `${name}: Year`,
                    value: this.year(),
                    class: classStr,
                    onfocus: lodash__default["default"].partial(this.focusedInput, 'yy'),
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, 'yy', this.year(), this.dom(), e, '/', { prev: 'mm' });
                    },
                    oninput: () => {
                        handleDateChange(this.year, id, "yy", this.dom());
                        this.buildDate(Boolean(field.required), attrs.value);
                    }
                }),
                m__default["default"](HiddenDateInput, attrs)
            ])));
        }
    }

    class DateInput {
        constructor() {
            this.dom = stream__default["default"]();
            this.valid = stream__default["default"]();
            this.focusedInput = stream__default["default"](undefined);
            this.locale = stream__default["default"](undefined);
            this.literalKey = stream__default["default"]('/');
            this.day = stream__default["default"]("");
            this.month = stream__default["default"]("");
            this.year = stream__default["default"]("");
            this.date = stream__default["default"]();
        }
        buildDate(valueStream, required = false) {
            this.date(`${this.year()}-${this.month()}-${this.day()}`);
            const valid = validateDate(this.year(), this.month(), this.day(), required, this.dom());
            // important! reset value when value stream is invalid
            resetInvalidValueStream(valid, this.date(), this.year(), this.month(), this.day(), valueStream);
        }
        // Casting as TDateInputType because undefined will not ever be returned due to oninput not firing if input's full
        findNextInput(type) {
            const index = this.dateInputAdvanceOrder.indexOf(type);
            return (index !== this.dateInputAdvanceOrder.length && dateInputIds(this.dateInputAdvanceOrder[this.dateInputAdvanceOrder.indexOf(type) + 1]));
        }
        findPrevInput(type) {
            const index = this.dateInputAdvanceOrder.indexOf(type);
            return (index !== 0 && dateInputIds(this.dateInputAdvanceOrder[this.dateInputAdvanceOrder.indexOf(type) - 1]));
        }
        setDateInputs(locale) {
            const dateParts = new Intl.DateTimeFormat(locale).formatToParts();
            this.dateParts = dateParts;
            const dateType = dateParts[0].type;
            this.literalKey(dateParts[1].value);
            const firstInputId = dateInputIds(dateType);
            this.focusedInput(firstInputId);
            this.dateInputAdvanceOrder = lodash__default["default"](this.dateParts).map((({ type }) => {
                return type;
            })).filter((type) => {
                return type !== "literal";
            }).value();
        }
        setLocale(field) {
            const { config, options = getConfig("dateOpts", config) } = field;
            const locale = options.length ? options[0].value : undefined;
            if (locale !== this.locale()) {
                this.locale(locale);
            }
        }
        createDateInputs({ type, value }, { attrs: { field: { id, name = id, required, readonly, disabled, tabindex, uiClass = {}, }, value: streamValue } }) {
            const classStr = inputCls(uiClass);
            switch (type) {
                case ('literal'): return m__default["default"]('span.pa0.mr-2px', value);
                case ('day'): return m__default["default"]("span", m__default["default"]("input.w-100.mw-dd.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-dd`, name: `${name}-dd`,
                    type: "text" /* text */, placeholder: "DD",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    value: this.day(),
                    'aria-label': `${name}: Day`,
                    class: `${classStr} maxw-dd p-0px`,
                    onfocus: lodash__default["default"].partial(this.focusedInput, 'dd'),
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, 'dd', this.day(), this.dom(), e, this.literalKey(), {
                            next: this.findNextInput('day'),
                            prev: this.findPrevInput('day')
                        });
                    },
                    oninput: () => {
                        handleDateChange(this.day, id, "dd", this.dom(), this.findNextInput('day'));
                        this.buildDate(streamValue, required);
                    },
                    onblur: () => {
                        appendZeroToDayMonth(this.day);
                        this.buildDate(streamValue, required);
                    }
                }));
                case ('month'): return m__default["default"]("span", m__default["default"]("input.w-100.mw-mm.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-mm`, name: `${name}-mm`,
                    type: "text" /* text */, placeholder: "MM",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    value: this.month(),
                    'aria-label': `${name}: Month`,
                    class: `${classStr} maxw-mm p-0px`,
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, 'mm', this.month(), this.dom(), e, this.literalKey(), {
                            next: this.findNextInput('month'),
                            prev: this.findPrevInput('month')
                        });
                    },
                    oninput: () => {
                        handleDateChange(this.month, id, "mm", this.dom(), this.findNextInput('month'));
                        this.buildDate(streamValue, required);
                    },
                    onfocus: lodash__default["default"].partial(this.focusedInput, 'mm'),
                    onblur: () => {
                        appendZeroToDayMonth(this.month);
                        this.buildDate(streamValue, required);
                    }
                }));
                case ('year'): return m__default["default"]("span", m__default["default"]("input.w-100.mw-yyyy.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-yyyy`, name: `${name}-yyyy`,
                    type: "text" /* text */, placeholder: "YYYY",
                    minlength: "4", maxlength: "4",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    value: this.year(),
                    'aria-label': `${name}: Year`,
                    class: `${classStr} maxw-yyyy p-0px`,
                    onfocus: lodash__default["default"].partial(this.focusedInput, 'yyyy'),
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, 'yyyy', this.year(), this.dom(), e, this.literalKey(), {
                            next: this.findNextInput('year'),
                            prev: this.findPrevInput('year')
                        });
                    },
                    oninput: () => {
                        handleDateChange(this.year, id, "yyyy", this.dom(), this.findNextInput('year'));
                        this.buildDate(streamValue, required);
                    }
                }));
            }
        }
        oninit({ attrs: { value, field } }) {
            this.valid(!field.required);
            // Split value into date parts
            value.map((newVal) => {
                // only handle value when the main value stream is changed
                if (newVal) {
                    const date = new Date(String(newVal));
                    // multiple data-binding reset date stream (important, reset local date stream when value is present)
                    this.date('');
                    // set individual date inputs based on value stream (not date stream)
                    const day = lodash__default["default"].padStart(String(date.getDate()), 2, "0");
                    const month = lodash__default["default"].padStart(String(1 + date.getMonth()), 2, "0");
                    const year = String(date.getFullYear());
                    this.day(day);
                    this.month(month);
                    this.year(year);
                }
                // only reset the non-edited date fields (important for resetting field display value)
                else if (!this.date()) {
                    this.day("");
                    this.month("");
                    this.year("");
                }
                // validate when value comes in from other date inputs
                this.valid(validateDate(this.year(), this.month(), this.day(), Boolean(field.required), this.dom()));
            });
            this.locale.map((newVal) => {
                this.setDateInputs(newVal);
            });
            this.setLocale(field);
        }
        oncreate({ dom }) {
            setIfDifferent(this.dom, dom);
        }
        onbeforeupdate({ attrs: { field } }) {
            this.setLocale(field);
            this.valid(validateDate(this.year(), this.month(), this.day(), Boolean(field.required), this.dom()));
        }
        onupdate({ dom }) {
            setIfDifferent(this.dom, dom);
        }
        onremove() {
            this.date.end(true);
            this.year.end(true);
            this.month.end(true);
            this.day.end(true);
        }
        view(vnode) {
            const { attrs: { field, value } } = vnode;
            const { id } = field;
            return m__default["default"](LayoutFixed, {
                value: value, field,
                invalid: !this.valid()
            }, m__default["default"]('.flex.ph-2px.pv-1px', {
                onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
            }, this.dateParts.map((datePart) => {
                return this.createDateInputs(datePart, vnode);
            }), m__default["default"](HiddenDateInput, vnode.attrs)));
        }
    }

    class PasswordInput {
        constructor() {
            this.showPassword = stream__default["default"](false);
        }
        view({ attrs }) {
            const { field, value } = attrs;
            const { label, id, name = id, title = label, placeholder, maxlength, minlength, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, instant, uiClass = {}, config } = field;
            return m__default["default"](Layout, {
                field,
                value,
                invalid: propInvalid(field, value())
            }, m__default["default"]('.flex.flex-row.w-100', [
                m__default["default"]("input.w-100.bg-transparent.bn.outline-0", {
                    id, name, title, placeholder,
                    type: this.showPassword() ? "text" : "password",
                    maxlength, minlength, required,
                    readonly, disabled, autofocus, autocomplete, tabindex,
                    pattern, inputmode,
                    class: inputCls(uiClass),
                    value: value(),
                    // Safari quirk
                    autocorrect: "off",
                    // Update value on change or input ("instant" option)
                    [instant ? "oninput" : "onchange"]: setValue(value)
                }),
                m__default["default"]("i.ml1.pa1.fa-fw.pointer.dim", {
                    title: getConfig("showPassTxt", config),
                    class: getConfig(this.showPassword() ? "hidePassIcn" : "showPassIcn", config),
                    onclick: () => this.showPassword(!this.showPassword()),
                    tabindex: 0,
                    onkeydown: clickOnEnter
                })
            ]));
        }
    }

    class TopLabel extends FloatLabel {
        labelTranslateY() {
            return "0.5ex";
        }
    }

    class LayoutTop extends Layout {
        constructor() {
            super(...arguments);
            this.layout = TopLabel;
        }
    }

    class TextareaInput extends ValidationBase {
        constructor() {
            super(...arguments);
            this.selector = "textarea";
        }
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, name = id, title = label, placeholder, required, readonly, disabled, autofocus, autocomplete, tabindex, spellcheck, instant, uiClass = {} } = attrs.field;
            return m__default["default"](LayoutTop, { field, value, xform, invalid: this.invalid }, m__default["default"]("textarea.w-100.bg-transparent.bn.outline-0.h-100.resize-none", {
                id, name, title,
                placeholder, required, readonly, disabled, autofocus, autocomplete, tabindex, spellcheck,
                class: textareaCls(uiClass),
                value: value(),
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setValue(value)
            }));
        }
    }

    class CheckboxInput {
        constructor() {
            this.onIcon = "checkIcn";
            this.offIcon = "uncheckIcn";
        }
        view({ attrs: { field, value: val } }) {
            const { label = "", id, name = id, value, title = label, required, readonly, disabled, autocomplete, tabindex = "0", options, uiClass = {}, config } = field;
            const doubleLabel = getConfig("toggleFormat", config) === "double";
            const invalidCheckboxWrapper = theme.invalidCheckboxWrapper;
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled),
            }, m__default["default"]("fieldset.w-100.bn", {
                class: inputWrapperCls(uiClass)
            }, [
                m__default["default"]("input.clip[type=checkbox]", {
                    id, name, value,
                    checked: val(),
                    required, autocomplete,
                    disabled: disabled || readonly,
                    tabindex: -1,
                    'aria-hidden': "true",
                    onchange: setCheck(val, value)
                }),
                m__default["default"]("label.flex.items-center", {
                    class: joinClasses([
                        checkInputCls(uiClass, disabled, readonly),
                        required && !val() ? invalidCheckboxWrapper : ""
                    ]),
                    for: id,
                    title,
                    "data-input-id": id,
                    "aria-label": label,
                    tabindex,
                    onkeydown: (e) => {
                        if (e.key === " ") {
                            val(!val());
                        }
                    }
                }, [
                    doubleLabel && m__default["default"](CheckLabel, { value: val(), doubleLabel, options, left: true }),
                    m__default["default"]("i", {
                        class: joinClasses([
                            // doubleLabel will always set the "on" icon
                            getConfig(val() || doubleLabel ? this.onIcon : this.offIcon, config),
                            // doubleLabel will mirror the icon if value is falsy
                            // TODO Rename to "flip-h" with Font Awesome 6
                            !val() && doubleLabel ? "fa-flip-horizontal" : ""
                        ])
                    }),
                    label && !doubleLabel && m__default["default"]("span.ml2", getLabelText(label, required)),
                    m__default["default"](CheckLabel, { value: val(), doubleLabel, options, left: false })
                ])
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
        view({ attrs }) {
            const { field, value: val } = attrs;
            const { label, id, name, value, title = label, required, readonly, disabled, autocomplete, tabindex = "0", labelSide = "right", uiClass = {}, config } = field;
            const checked = val() === value;
            const pointerClass = pointerCls(disabled);
            const inputLabel = label && m__default["default"]("span.mh1", {
                class: `${pointerClass} ${labelCls(uiClass)}`
            }, getLabelText(label));
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled),
            }, m__default["default"]("fieldset.w-100.bn", {
                class: inputWrapperCls(uiClass)
            }, [
                m__default["default"]("input.clip[type=radio]", {
                    id, name, value,
                    checked, required, autocomplete,
                    disabled,
                    tabindex: -1,
                    'aria-hidden': "true",
                    onchange: setValue(val)
                }),
                m__default["default"]("label.flex.items-center", {
                    class: checkInputCls(uiClass, disabled, readonly),
                    for: id,
                    title,
                    "data-input-id": id,
                    "aria-label": label,
                    tabindex,
                    onkeydown: (e) => {
                        var _a;
                        if (e.key === " ") {
                            ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.firstElementChild).click();
                        }
                    }
                }, [
                    labelSide === "left" && m__default["default"]("span.mr2", inputLabel),
                    m__default["default"]("i", {
                        class: getConfig(checked ? "radioOnIcn" : "radioOffIcn", config)
                    }),
                    labelSide === "right" && m__default["default"]("span.ml2", inputLabel)
                ])
            ]));
        }
    }

    class SelectInput {
        view({ attrs }) {
            const { field, value: val } = attrs;
            const { label: lbl, id, name = id, title = lbl, required, readonly, disabled, autofocus, autocomplete, tabindex, uiClass = {}, placeholder = "--- Select one ---", options } = field;
            return m__default["default"](LayoutFixed, {
                field,
                value: val,
                invalid: propInvalid(field, val())
            }, [
                lbl
                    ? null
                    : m__default["default"]("legend.screenreader", {
                        id: `${id}-legend`
                    }, "Select one"),
                m__default["default"]("select.w-100.bg-transparent.bn.outline-0", {
                    id, name, title,
                    required, readonly, disabled, autofocus, autocomplete, tabindex,
                    class: inputCls(uiClass),
                    value: val() ? val() : "",
                    onchange: setValue(val),
                    'aria-labelledby': `${id}-legend`
                }, m__default["default"]('option', {
                    disabled: true,
                    value: ""
                }, placeholder), lodash__default["default"].map(options, ({ value, label = value }) => m__default["default"]("option", {
                    value,
                    disabled: disabled || readonly,
                }, label)))
            ]);
        }
    }

    class FileSelect {
        constructor() {
            this.dragging = stream__default["default"](false);
        }
        view({ attrs: { field, value, displayType } }) {
            const file = lodash__default["default"].head(value());
            const { disabled, uiClass = {}, config, readonly } = field;
            const innerText = displayType === "none" /* none */ || !file
                ? getConfig("addFileTxt", config)
                : file.name;
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled)
            }, m__default["default"](FileInput, {
                field,
                multiple: false,
                dragging: this.dragging,
                onSet: addFiles(value, true),
                value
            }, m__default["default"](".flex.items-center.pa1", {
                class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
            }, [
                m__default["default"]("i.pa1", {
                    class: getConfig("uploadIcn", config)
                }),
                m__default["default"]("span.ma1.flex-auto", innerText),
                file && displayType !== "none" /* none */ ? [
                    m__default["default"](FileOpen, file),
                    !(readonly || disabled) && m__default["default"]("i.pa1.pointer.dim", {
                        title: `Remove ${file.name}`,
                        class: getConfig("cancelIcn", config),
                        onclick: removeFile(value, file.guid)
                    })
                ] : null
            ])));
        }
    }

    function addImages(fileList, maxSize, replace = false) {
        return (addList) => {
            const newFileList = replace ? [] : fileList();
            return Promise.all(lodash__default["default"].map(addList, (file) => {
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
                m__default["default"].redraw();
            });
        };
    }
    class ImageMulti {
        constructor() {
            this.dragging = stream__default["default"](false);
        }
        view({ attrs: { field, value } }) {
            const { disabled, uiClass = {}, config, readonly } = field;
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled)
            }, [
                m__default["default"](FileInput, {
                    field,
                    defaultAccept: "image/*",
                    dragging: this.dragging,
                    onSet: addImages(value, getConfig("imageMaxSize", config)),
                    value
                }, m__default["default"](".w-100.pa1.dt.tc", {
                    class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
                }, m__default["default"]("i.fa-2x.dtc.v-mid", {
                    class: getConfig("cameraIcn", config)
                }))),
                m__default["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb", lodash__default["default"].map(value(), (file) => m__default["default"](Thumbnail, {
                    src: imgSrc(file.path, file.dataUrl)
                }, !(readonly || disabled) && m__default["default"](".absolute.top-0.right-0.child", m__default["default"](Button, {
                    title: `Remove ${file.name}`,
                    icon: getConfig("deleteIcn", config),
                    onclick: removeFile(value, file.guid)
                })))))
            ]);
        }
    }

    class ImageSelect {
        constructor() {
            this.dragging = stream__default["default"](false);
        }
        view({ attrs: { field, value } }) {
            const file = lodash__default["default"].head(value());
            const { disabled, uiClass = {}, config, readonly } = field;
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled)
            }, m__default["default"](FileInput, {
                field,
                defaultAccept: "image/*",
                multiple: false,
                dragging: this.dragging,
                onSet: addImages(value, getConfig("imageMaxSize", config), true),
                value
            }, m__default["default"](".pa1", {
                class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
            }, m__default["default"](".relative.w-100.dt.tc", file ? [
                m__default["default"]("img.img.contain.max-h-img", {
                    title: file.name,
                    src: imgSrc(file.path, file.dataUrl)
                }),
                !(readonly || disabled) && m__default["default"](".absolute.top-0.right-0.pa1.pointer.dim", {
                    title: `Remove ${file.name}`,
                    onclick: removeFile(value, file.guid)
                }, m__default["default"]("i.pa1", {
                    class: getConfig("cancelIcn", config)
                }))
            ] : m__default["default"]("i.fa-2x.dtc.v-mid", {
                class: getConfig("cameraIcn", config)
            })))));
        }
    }

    class SignDraw {
        oncreate({ dom }) {
            const canvas = dom.children[0];
            const initialRatio = pxRatio();
            this.signaturePad = new SignaturePad__default["default"](canvas, {
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
            this.resizeHandler = lodash__default["default"].debounce(resizeCanvas, 250);
            window.addEventListener("resize", this.resizeHandler);
            window.addEventListener("orientationchange", this.resizeHandler);
            resizeCanvas();
        }
        onremove() {
            this.resizeHandler.cancel();
            window.removeEventListener("resize", this.resizeHandler);
            window.removeEventListener("orientationchange", this.resizeHandler);
        }
        view({ attrs: { style, config, onSet, onCancel } }) {
            return [
                m__default["default"](".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30", { style }, m__default["default"]("canvas.aspect-ratio--object")),
                m__default["default"](".absolute.top-0.right-0.z-999.translate-up-100", [
                    m__default["default"](Button, {
                        title: getConfig("applyTtl", config),
                        icon: getConfig("applyIcn", config),
                        classes: "ma1",
                        onclick: () => {
                            if (!this.signaturePad.isEmpty()) {
                                onSet(this.signaturePad.toDataURL("image/png"));
                            }
                        }
                    }),
                    m__default["default"](Button, {
                        title: getConfig("resetTtl", config),
                        icon: getConfig("resetIcn", config),
                        classes: "ma1",
                        onclick: () => this.resetCanvas()
                    }),
                    m__default["default"](Button, {
                        title: getConfig("cancelTtl", config),
                        icon: getConfig("cancelIcn", config),
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

    class SignType {
        constructor() {
            this.text = stream__default["default"]("");
        }
        oncreate({ dom }) {
            const input = dom.children[0];
            input.focus({ preventScroll: false });
            this.scaleText(dom);
        }
        onupdate({ dom }) {
            this.scaleText(dom);
        }
        view({ attrs: { heightPct, style, config, onSet, onCancel } }) {
            const setText = lodash__default["default"].flow([
                // Create stamp base64 string
                lodash__default["default"].partial(createStamp, this.text(), heightPct, config),
                // Submit stamp and metadata to onSet
                lodash__default["default"].partialRight(onSet, { text: this.text(), heightPct }),
                // Prevent form submit page navigating page
                lodash__default["default"].stubFalse
            ]);
            return [
                m__default["default"]("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
                    style,
                    onsubmit: setText
                }, m__default["default"]("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
                    oninput: setValue(this.text),
                    style: {
                        fontFamily: getConfig("signFont", config)
                    },
                    value: this.text()
                })),
                m__default["default"](".absolute.top-0.right-0.z-999.translate-up-100", [
                    m__default["default"](Button, {
                        title: getConfig("applyTtl", config),
                        icon: getConfig("applyIcn", config),
                        classes: "ma1",
                        onclick: setText
                    }),
                    m__default["default"](Button, {
                        title: getConfig("resetTtl", config),
                        icon: getConfig("resetIcn", config),
                        classes: "ma1",
                        onclick: () => this.text("")
                    }),
                    m__default["default"](Button, {
                        title: getConfig("cancelTtl", config),
                        icon: getConfig("cancelIcn", config),
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

    class SignStamp {
        view({ attrs: { heightPct, stampTxt, stampSetTxt, config, onSet } }) {
            return [
                m__default["default"]("span.clip", {
                    style: {
                        fontFamily: getConfig("signFont", config)
                    }
                }, stampSetTxt),
                m__default["default"](".flex", m__default["default"](Button, {
                    label: stampTxt,
                    classes: `flex-auto ${getConfig("stampBtnClass", config)}`,
                    context: getConfig("stampBtnContext", config),
                    // onclick: applyStamp(heightPct, stampSetTxt, onSet)
                    onclick: lodash__default["default"].flow([
                        // Create stamp base64 string
                        lodash__default["default"].partial(createStamp, stampSetTxt, heightPct, config),
                        // Submit stamp and metadata to onSet
                        lodash__default["default"].partialRight(onSet, { text: stampSetTxt, heightPct })
                    ])
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
                m__default["default"].redraw();
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
            const { label: lbl, id, readonly, disabled, tabindex = "0", uiClass = {}, config, options = getConfig("signOpts", config), heightPct = getConfig("signHeightPct", config), stampTxt = getConfig("stampTxt", config), stampSetTxt = getConfig("stampSetTxt", config) } = field;
            const style = {
                paddingBottom: `${heightPct}%`
            };
            const fileObj = lodash__default["default"].head(value());
            // Convert options into widget descriptions
            const opts = lodash__default["default"](options).map(({ value: type }) => {
                if (type === "draw" /* Draw */) {
                    return {
                        type,
                        icon: getConfig("drawIcn", config),
                        label: getConfig("signDrawTxt", config)
                    };
                }
                else if (type === "type" /* Type */) {
                    return {
                        type,
                        icon: getConfig("typeIcn", config),
                        label: getConfig("signTypeTxt", config)
                    };
                }
                else if (type === "stamp" /* Stamp */) {
                    return {
                        type,
                        icon: getConfig("stampIcn", config),
                        label: getConfig("signStampTxt", config)
                    };
                }
                return null;
            }).compact().value();
            // Auto-select widget if there is only one option and no file
            if (opts.length === 1 && !fileObj) {
                this.setSignType(opts[0].type);
            }
            return m__default["default"]("div.relative", {
                class: wrapperCls(uiClass, disabled)
            }, [
                getLabel(id, uiClass, lbl),
                readonly || disabled
                    // Display component in "readonly" mode
                    ? m__default["default"](".aspect-ratio", {
                        id,
                        style
                    }, 
                    // Current signature
                    fileObj ? m__default["default"](".aspect-ratio--object", {
                        class: "pe-none"
                    }, m__default["default"]("img.img.w-100.absolute", {
                        src: imgSrc(fileObj.path, fileObj.dataUrl)
                    })) : null)
                    // Use signature creation component (if set)
                    : this.signType
                        ? m__default["default"](componentMap[this.signType], {
                            heightPct,
                            stampTxt,
                            stampSetTxt,
                            style,
                            config,
                            onSet: setFile(value, id, getConfig("signMaxSize", config)),
                            onCancel: lodash__default["default"].bind(this.setSignType, this, undefined)
                        })
                        // Display signature preview/creator
                        : m__default["default"](".aspect-ratio.pointer", {
                            id,
                            class: theme.fileInputWrapper,
                            style
                        }, fileObj
                            // Current signature
                            ? m__default["default"](".aspect-ratio--object.dim", {
                                onclick: lodash__default["default"].bind(value, this, [])
                            }, [
                                m__default["default"]("img.img.w-100.absolute", {
                                    src: imgSrc(fileObj.path, fileObj.dataUrl)
                                }),
                                // Remove signature button
                                m__default["default"](".absolute.top-1.right-1", m__default["default"]("i.fa-2x", {
                                    class: getConfig("resetIcn", config),
                                    tabindex: 0,
                                    onkeydown: clickOnEnter
                                }))
                            ])
                            // Signature creation options
                            : m__default["default"](".aspect-ratio--object.flex", lodash__default["default"].map(opts, ({ type, icon, label }) => m__default["default"](".flex-auto.flex.items-center.justify-center.dim", {
                                title: label,
                                tabindex,
                                onkeydown: clickOnEnter,
                                onclick: lodash__default["default"].bind(this.setSignType, this, type)
                            }, m__default["default"]("i.fa-2x.ma1", {
                                class: icon,
                            }), m__default["default"]("span.ma1.dn.db-ns.truncate", label)))))
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
            return Promise.all(lodash__default["default"].map(addList, (file) => {
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
                m__default["default"].redraw();
            });
        };
    }
    class OmniFileInput {
        constructor() {
            this.dragging = stream__default["default"](false);
        }
        view({ attrs: { field, value } }) {
            const file = lodash__default["default"].head(value());
            const { disabled, uiClass = {}, config, readonly } = field;
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled)
            }, m__default["default"](FileInput, {
                field,
                defaultAccept: "*",
                multiple: false,
                dragging: this.dragging,
                onSet: addOmniFiles(value, true),
                value
            }, m__default["default"](".flex.items-center.pa1", {
                class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
            }, file ? file.dataUrl
                ? [
                    // Image preview
                    m__default["default"](".relative.w-100.dt.tc", m__default["default"]("img.img.contain.max-h-img", {
                        title: file.name,
                        src: imgSrc(file.path, file.dataUrl)
                    }), !(readonly || disabled) && m__default["default"](".absolute.top-0.right-0.pa1.pointer.dim", {
                        title: `Remove ${file.name}`,
                        onclick: removeFile(value, file.guid)
                    }, m__default["default"]("i.pa1", {
                        class: getConfig("cancelIcn", config)
                    })))
                ] : [
                // Non-image details
                m__default["default"](FileOpen, file),
                m__default["default"]("span.ma1.flex-auto", {
                    title: file.name,
                }, file.name),
                !(readonly || disabled) && m__default["default"]("i.pa1.pointer.dim", {
                    title: `Remove ${file.name}`,
                    class: getConfig("cancelIcn", config),
                    onclick: removeFile(value, file.guid),
                    onkeydown: clickOnEnter,
                    tabindex: 0
                })
            ]
                : [
                    // File upload
                    m__default["default"]("i.pa1", {
                        class: getConfig("uploadIcn", config)
                    }),
                    m__default["default"]("span.ma1", getConfig("addFileTxt", config))
                ])));
        }
    }

    class MultiOmniFileInput {
        constructor() {
            this.dragging = stream__default["default"](false);
        }
        view({ attrs: { field, value, displayType, showDisplay = true } }) {
            const { disabled, uiClass = {}, config, readonly } = field;
            return m__default["default"]("div", {
                class: wrapperCls(uiClass, disabled)
            }, [
                m__default["default"](FileInput, {
                    field,
                    defaultAccept: "*",
                    dragging: this.dragging,
                    onSet: addOmniFiles(value, false),
                    value
                }, m__default["default"](".flex.items-center.pa1.dt", {
                    class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
                }, [
                    m__default["default"]("i.pa1", {
                        class: getConfig("uploadIcn", config)
                    }),
                    m__default["default"]("span.ma1.flex-auto", getConfig("addFileTxt", config))
                ])),
                showDisplay ? m__default["default"](DisplayTypeComponent, {
                    displayType,
                    value,
                    readonlyOrDisabled: disabled || readonly,
                    config
                }) : null
            ]);
        }
    }

    class FileButtonInput extends FileInput {
        constructor() {
            super(...arguments);
            this.showLabel = false;
        }
    }

    class FileButtonSelect {
        constructor() {
            this.dragging = stream__default["default"](false);
        }
        view({ attrs: { field, value } }) {
            const { id, required, uiClass = {}, config, label = { text: "Add File", icon: getConfig("uploadIcn", config) }, } = field;
            return [
                getLabel(id, uiClass, label, required),
                m__default["default"]("div", {
                    class: `${fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))} ${getButtonContext()} ${theme.button}`,
                }, m__default["default"](FileButtonInput, {
                    field,
                    multiple: false,
                    dragging: this.dragging,
                    onSet: addFiles(value, true),
                    value
                }, m__default["default"](".flex.items-center", (typeof label === 'string')
                    ? labelIcon({
                        text: label,
                        icon: getConfig("uploadIcn", config)
                    })
                    : labelIcon(label))))
            ];
        }
    }

    exports.Badge = Badge;
    exports.BaseInput = BaseInput;
    exports.BaseText = BaseText;
    exports.Button = Button;
    exports.ButtonLink = ButtonLink;
    exports.CardDateInput = CardDateInput;
    exports.Checkbox = Checkbox;
    exports.CheckboxInput = CheckboxInput;
    exports.CurrencyInput = CurrencyInput;
    exports.DateInput = DateInput;
    exports.DateText = DateText;
    exports.DisplayTypeComponent = DisplayTypeComponent;
    exports.FileButtonSelect = FileButtonSelect;
    exports.FileList = FileList;
    exports.FileMulti = FileMulti;
    exports.FileSelect = FileSelect;
    exports.ImageList = ImageList;
    exports.ImageMulti = ImageMulti;
    exports.ImagePreview = ImagePreview;
    exports.ImageSelect = ImageSelect;
    exports.Label = Label;
    exports.Link = Link;
    exports.MultiOmniFileInput = MultiOmniFileInput;
    exports.NavButton = NavButton;
    exports.NavLink = NavLink;
    exports.OmniFileInput = OmniFileInput;
    exports.PasswordInput = PasswordInput;
    exports.PasswordStrength = PasswordStrength;
    exports.PercentageInput = PercentageInput;
    exports.RadioInput = RadioInput;
    exports.SelectInput = SelectInput;
    exports.SelectText = SelectText;
    exports.SignBuilder = SignBuilder;
    exports.TextareaInput = TextareaInput;
    exports.Toggle = Toggle;
    exports.ToggleInput = ToggleInput;
    exports.ToolTip = ToolTip;
    exports.Trusted = Trusted;
    exports.createStamp = createStamp;
    exports.currencyStrToNumber = currencyStrToNumber;
    exports.dataURItoBlob = dataURItoBlob;
    exports.dataUrlToFile = dataUrlToFile;
    exports.fileConstructor = fileConstructor;
    exports.fileNameExtSplit = fileNameExtSplit;
    exports.getOrientation = getOrientation;
    exports.guid = guid;
    exports.iconMap = iconMap;
    exports.joinClasses = joinClasses;
    exports.linkAttrs = linkAttrs;
    exports.linkIcon = linkIcon;
    exports.numberToCurrencyStr = numberToCurrencyStr;
    exports.numberToCurrencyTuple = numberToCurrencyTuple;
    exports.pxRatio = pxRatio;
    exports.readArrayBuffer = readArrayBuffer;
    exports.readOrientation = readOrientation;
    exports.resizeImage = resizeImage;
    exports.scaleDataUrl = scaleDataUrl;
    exports.scaleRect = scaleRect;
    exports.textToImage = textToImage;
    exports.theme = theme;
    exports.updateButtonContext = updateButtonContext;
    exports.updateClasses = updateClasses;
    exports.updateConfig = updateConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
