/* @preserve built on: 2025-02-05T15:03:14.260Z */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('mithril'), require('mithril/stream'), require('luxon'), require('flatpickr'), require('signature_pad')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'mithril', 'mithril/stream', 'luxon', 'flatpickr', 'signature_pad'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uiWidgets = {}, global._, global.m, global.m.stream, global.luxon, global.flatpickr, global.SignaturePad));
})(this, (function (exports, lodash, m, stream, luxon, flatpickr, SignaturePad) { 'use strict';

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
        requiredInputWrapper: "",
        readonlyInputWrapper: "",
        disabledWrapper: "o-40",
        disabledInputWrapper: "",
        invalidInputWrapper: "ba b--red",
        focusInputWrapper: "",
        altLabel: "ml1 o-70",
        floatLabelPlaceholder: "",
        invalidCheckboxWrapper: "red",
        tooltipWrapper: "dib relative mh2",
        tooltipIconBackground: "bg-black h2 w2 relative br-100 ",
        tooltipIcon: "white f6",
        tooltipMessage: "white bg-black w5 f6 pa2 absolute br2 z-max",
        redNumber: "red fw2",
        checkListOptionsWrapper: "ba br2 b--silver pa2 dark-gray bg-canvas w-100 max-h-img overflow-y-auto shadow-4",
        checkListOption: "pa2 hover-bg-light-gray",
        checkListOptionLabel: "mh1",
        checkListOptionIcon: "mh1",
        checkListOptionSingleSelected: "bg-light-blue fw6",
        checkListOptionMultiSelected: "fw6",
        timeInputScrollerWrapper: "ba br2 b--silver pa2 dark-gray bg-canvas top-2 shadow-4",
        timeInputScrollerNumber: "pv1 mv2 w-100 mw-dd tc f6 fw6 bg-light-gray"
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
    function joinClasses(list) {
        return lodash.compact(list).join(" ");
    }
    // Merge incoming uiClass with theme class
    function mergeClasses(key, uiClass = {}) {
        if (key in uiClass) {
            // Merge by default unless expliictly disabled
            return uiClass.merge === false ? [uiClass[key]] : [uiClass[key], theme[key]];
        }
        else {
            return [theme[key]];
        }
    }
    function wrapperCls(uiClass, disabled) {
        return joinClasses([
            ...mergeClasses("wrapper", uiClass),
            disabled ? theme.disabledWrapper : ""
        ]);
    }
    function labelCls(uiClass, required) {
        return joinClasses([
            ...mergeClasses("label", uiClass),
            required ? theme.requiredLabel : ""
        ]);
    }
    function floatLabelPlaceholderCls({ required, uiClass }, floatTop) {
        return joinClasses([
            labelCls(uiClass, required),
            floatTop ? "f-07em cursor-default" : `${theme.floatLabelPlaceholder} cursor-text`
        ]);
    }
    function inputWrapperCls({ required, readonly, disabled, uiClass }, invalid, focus) {
        return joinClasses([
            ...mergeClasses("inputWrapper", uiClass),
            ...(invalid ? mergeClasses("invalidInputWrapper", uiClass) : []),
            required ? theme.requiredInputWrapper : null,
            readonly ? theme.readonlyInputWrapper : null,
            disabled ? theme.disabledInputWrapper : null,
            focus ? theme.focusInputWrapper : null
        ]);
    }
    function inputCls(uiClass) {
        return joinClasses(mergeClasses("input", uiClass));
    }
    function checkInputCls({ readonly, disabled, uiClass }) {
        return joinClasses([
            inputCls(uiClass),
            pointerCls(disabled, readonly)
        ]);
    }
    function textareaCls({ input, merge = true }) {
        return joinClasses([
            input, merge ? theme.textarea : null
        ]);
    }
    function fileInputWrapperCls({ inputWrapper, merge = true }, dragging, invalid) {
        return joinClasses([
            inputWrapper,
            merge ? theme.fileInputWrapper : null,
            invalid ? theme.invalidInputWrapper : null,
            dragging ? theme.fileHover : ""
        ]);
    }
    function pointerCls(disabled, readonly) {
        return disabled || readonly ? undefined : "pointer";
    }

    const confMap = {
        layoutType: "default" /* LayoutType.default */,
        tooltipIcon: "fas fa-info",
        imageMaxSize: 1280,
        addFileTxt: "Upload...",
        addFilesTxt: "Add file(s)...",
        remFileTtl: "Remove",
        openFileTxt: "Open file",
        showPassTxt: "Show Password",
        requiredLblPost: "",
        optionalLblPost: "",
        dateLocale: "default",
        datePickerIcn: "fas fa-calendar",
        timePickerIcn: "fas fa-clock",
        timeScrollerUpIcn: "fas fa-chevron-up",
        timeScrollerDownIcn: "fas fa-chevron-down",
        checkListIcn: "fas fa-chevron-down",
        checkListDropUp: false,
        signOpts: ["draw" /* SignTypes.Draw */, "type" /* SignTypes.Type */, "stamp" /* SignTypes.Stamp */],
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
        // Currency, Percentage
        badgePosition: "left",
        currencySymbol: "$",
        negativeStyle: "default",
        // Check, toggle, radio all use common "selection" config options
        selectionLayout: ["icon", "label"],
        selectionOnLabel: "",
        selectionOffLabel: "",
        selectionOnActive: "",
        selectionOffActive: "",
        selectionOnInactive: "dn",
        selectionOffInactive: "dn",
        checkIcn: "far fa-check-square",
        uncheckIcn: "far fa-square",
        toggleOnWrapper: "br-pill bg-light-blue",
        toggleOffWrapper: "br-pill bg-silver",
        toggleOnIcn: "br-100 bg-white",
        toggleOffIcn: "br-100 bg-white",
        radioOnIcn: "fas fa-circle-dot",
        radioOffIcn: "fas fa-circle",
        showPassIcn: "fas fa-fw fa-eye",
        hidePassIcn: "fas fa-fw fa-eye-slash",
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
    function getConfig(key, override) {
        return override && key in override
            ? override[key]
            : config[key];
    }
    const functionMap = {};
    function registerFunction(name, func) {
        if (name in functionMap) {
            throw new Error(`Function ${name} already registered.`);
        }
        functionMap[name] = func;
    }
    function getFunction(name) {
        if (!(name in functionMap)) {
            throw new Error(`Function ${name} not registered.`);
        }
        return functionMap[name];
    }
    function getIcon(icon, classes) {
        if (typeof icon === "string") {
            return m("i", { class: joinClasses([classes, icon]) });
        }
        else {
            return getFunction(icon.name)(icon.data, classes);
        }
    }

    // Create "v4-like" (no fixed version id) uuid (based on node-uuid)
    function toHex(inp) {
        // Add to 0x100 to pad small numbers with leading 0
        return (inp + 0x100).toString(16).substring(1);
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
    function titleFromLabel(label) {
        return label && (typeof label === "string" ? label : label.text);
    }
    function getLabelText(label, required) {
        const text = typeof label === "string" ? label : label.text;
        const post = required ? config.requiredLblPost : config.optionalLblPost;
        return post ? text + post : text;
    }
    function getAltLabel({ alt }) {
        return alt ? m("span", { class: theme.altLabel }, alt) : null;
    }
    function imgSrc(path, dataUrl) {
        return dataUrl ? dataUrl : path;
    }
    function enrichLabel(label, selector, attributes, required) {
        return m(selector, attributes, [
            label.icon ? getIcon(label.icon, "") : null,
            m("span", getLabelText(label, required)),
            getAltLabel(label),
            label.rightIcon ? getIcon(label.rightIcon, "") : null,
            label.href ? m("a.link.dim.pointer.ws-normal.mh1", { onclick: label.onclick }, [
                m("i", { class: config.linkIcn }),
                label.href
            ]) : null
        ]);
    }
    // Used by display widgets
    function getDisplayLabel(label, labelCls = "mr2 truncate") {
        if (label) {
            if (typeof label === "string") {
                return m("span", {
                    title: label,
                    class: joinClasses([labelCls, theme.displayLabel])
                }, label);
            }
            else {
                return enrichLabel(label, "span", {
                    title: label.text,
                    class: joinClasses([labelCls, theme.displayLabel])
                });
            }
        }
        return null;
    }
    // Used by input widgets
    function getLabel(id, uiClass, label, required) {
        if (label) {
            if (typeof label === 'string') {
                return m("label.mb1.db", {
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
            label.icon && getIcon(label.icon, "fa-fw"),
            label.text && m("span", label.text),
            label.rightIcon && getIcon(label.rightIcon, "fa-fw")
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
            return [fileName.substring(0, extIdx), fileName.substring(extIdx)];
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
        if (view.getUint16(0, false) !== 65496 /* img.jpeg */) {
            return -2;
        }
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
            const marker = view.getUint16(offset, false);
            offset += 2;
            // Exif and orientation data found in APP1 section
            if (marker === 65505 /* img.app1 */) {
                offset += 2;
                // Ensure APP1 section contains EXIF info
                if (view.getUint32(offset, false) !== 1165519206 /* img.exif */) {
                    return -1;
                }
                // Get TIFF header from exif info
                offset += 6;
                // TIFF header endianness
                const little = view.getUint16(offset, false) === 18761 /* img.tiff */;
                // Get number of tags
                offset += view.getUint32(offset + 4, little);
                const tags = view.getUint16(offset, little);
                offset += 2;
                // Traverse tags until orientation tag is found
                for (let i = 0; i < tags; i++) {
                    if (view.getUint16(offset + (i * 12), little) === 274 /* img.orientation */) {
                        return view.getUint16(offset + (i * 12) + 8, little);
                    }
                }
            }
            else if ((marker & 65280 /* img.unknown */) !== 65280 /* img.unknown */) {
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

    /**
     * ui-widgets currency conversion utils,
     * use with integer values of smallest currency units
     */
    class Currency {
        /**
         * Format a number into a currency string
         * @param unitTotal total in smallest monetary unit to convert e.g. 12345
         * @param negativeParens whether to format negative numbers with parentheses
         * @param invert interpret postive/negative `unitTotal` as the opposite
         * @return currency string if finite number e.g. "1,234,567.89", "-1.23", "(4.56)", or undefined
         */
        static format(unitTotal, negativeParens = false, invert = false) {
            const currencyStr = this.numtoStr(unitTotal, true);
            const negative = invert ? unitTotal > 0 : unitTotal < 0;
            if (currencyStr && negative) {
                // Valid negative currency
                return negativeParens ? `(${currencyStr})` : `-${currencyStr}`;
            }
            else {
                // Positive, zero, or invalid currency
                return currencyStr;
            }
        }
        /**
         * Parse a currency string into a number
         * @param currencyStr Value to convert e.g. "123.45"
         * @return parsed value as smallest monetary unit e.g. 12345
         */
        static strToNum(currencyStr) {
            // Remove everything but digits and the decimal point, and keep minus sign
            const inputStr = currencyStr
                .replace("(-", "-")
                .replace("(", "-")
                .replace(")", "")
                .replace(/[^\d.-]/g, "");
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
            return left < 0
                ? left * 100 - right
                : left * 100 + right;
        }
        /**
         * Convert a number into a currency string
         * @param unitTotal total in smallest monetary unit to convert e.g. 12345
         * @param format whether to format the large number with commas
         * @return currency string if finite number e.g. "123.45" or undefined
         */
        static numtoStr(unitTotal, format) {
            const tuple = this.numToTuple(unitTotal);
            if (tuple) {
                const large = format ? this.formatter.format(tuple[0]) : tuple[0];
                const small = lodash.padStart(String(tuple[1]), 2, "0");
                return `${large}.${small}`;
            }
            else {
                return undefined;
            }
        }
        /**
         * Convert a number into a currency string pair
         * @param unitTotal total in smallest monetary unit to convert e.g. 12345
         * @return currency string pair if finite number e.g. ["123", "45"] or undefined
         */
        static numToTuple(unitTotal) {
            if (!lodash.isFinite(unitTotal)) {
                return undefined;
            }
            const value = Math.abs(unitTotal);
            let large = 0;
            let small;
            if (value > 99) {
                // Ensure integer result
                large = Math.trunc(value / 100);
                small = value % 100;
            }
            else {
                small = value;
            }
            return [large, small];
        }
    }
    Currency.formatter = new Intl.NumberFormat();

    class Badge {
        view({ attrs: { label, classes = "bg-red" }, children }) {
            return m(".relative.dib", [
                children,
                label ? m("span.absolute.minw-65rem.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80", {
                    class: classes
                }, label) : null
            ]);
        }
    }

    class Button {
        view({ attrs: { label = "", type = "button", title = label, icon, rightIcon, context, classes = "", style, disabled, onclick, tabindex } }) {
            return m("button.button-reset", {
                type, title, disabled,
                class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${getButtonContext(context)} ${theme.button}`,
                style, tabindex,
                onclick
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    class ButtonLink {
        view({ attrs: { label = "", title = label, icon, rightIcon, href, rel, target, download, context, classes = "", style } }) {
            return m("a.link.flex.items-center", {
                href, rel, target, download, title,
                class: `${classes} ${getButtonContext(context)} ${theme.button}`,
                style
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    class NavButton {
        view({ attrs: { label = "", title = label, icon, rightIcon, classes = "", style, disabled, onclick } }) {
            return m(".mh2.pa2.truncate", {
                title, disabled,
                class: `${classes} ${disabled ? theme.disabledWrapper : "pointer"} ${theme.navButton}`,
                style,
                onclick
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    class NavLink {
        view({ attrs: { label = "", title = label, icon, rightIcon, href, rel, target, download, classes = "", style } }) {
            return m("a.link.mh2.pa2.truncate", {
                href, rel, target, download, title,
                class: `${classes} ${theme.navButton}`,
                style
            }, labelIcon({ text: label, icon, rightIcon }));
        }
    }

    function selectDirection(direction) {
        switch (direction) {
            case "left" /* MessageDirection.left */:
                return {
                    left: "initial",
                    top: "initial",
                    right: "calc(100% + 0.25rem)",
                    bottom: "initial",
                };
            case "top" /* MessageDirection.top */:
                return {
                    left: "initial",
                    top: "initial",
                    right: "initial",
                    bottom: "calc(100% + 0.25rem)",
                };
            case "topRight" /* MessageDirection.topRight */:
                return {
                    left: "calc(100%)",
                    top: "initial",
                    right: "initial",
                    bottom: "calc(100%)",
                };
            case "topLeft" /* MessageDirection.topLeft */:
                return {
                    left: "initial",
                    top: "initial",
                    right: "calc(100%)",
                    bottom: "calc(100%)",
                };
            case "bottom" /* MessageDirection.bottom */:
                return {
                    left: "initial",
                    top: "calc(100% + 0.25rem)",
                    right: "initial",
                    bottom: "initial",
                };
            case "bottomRight" /* MessageDirection.bottomRight */:
                return {
                    left: "calc(100%)",
                    top: "calc(100%)",
                    right: "initial",
                    bottom: "initial",
                };
            case "bottomLeft" /* MessageDirection.bottomLeft */:
                return {
                    left: "initial",
                    top: "calc(100%)",
                    right: "calc(100%)",
                    bottom: "initial",
                };
            default:
                return {
                    left: "calc(100% + 0.25rem)",
                    top: "initial",
                    right: "initial",
                    bottom: "initial",
                };
        }
    }
    class Tooltip {
        constructor() {
            this.show = false;
        }
        view({ attrs: { message, direction = "right" /* MessageDirection.right */, icon = config.tooltipIcon } }) {
            return m("div", {
                class: theme.tooltipWrapper
            }, [
                m(".flex.items-center.justify-center", {
                    class: theme.tooltipIconBackground,
                    onmouseenter: () => this.show = true,
                    onmouseleave: () => this.show = false
                }, [
                    m("i", {
                        class: joinClasses([icon, theme.tooltipIcon]),
                    }),
                    this.show && m("div", {
                        class: theme.tooltipMessage,
                        style: selectDirection(direction)
                    }, message.map((item) => m('p.mv2', item)))
                ])
            ]);
        }
    }

    class Trusted {
        view({ attrs: { value } }) {
            return m(".pa2", {}, m.trust(value()));
        }
    }

    class BaseText {
        view({ attrs: { field, value } }) {
            const { label, uiClass = {} } = field;
            return m(".pa2.flex.flex-wrap", {
                class: wrapperCls(uiClass),
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
    /** @deprecated Use `linkIcon` method */
    const iconMap = {
        email: config.emailIcn,
        tel: config.telIcn
    };
    function linkIcon(type, override) {
        if (type === "email" /* FieldType.email */) {
            return getConfig("emailIcn", override);
        }
        else if (type === "tel" /* FieldType.tel */) {
            return getConfig("telIcn", override);
        }
        else {
            return getConfig("linkIcn", override);
        }
    }
    class Link {
        view({ attrs: { field, value } }) {
            const { label, type = "url" /* FieldType.url */, uiClass = {}, config } = field;
            return m(".pa2.flex.flex-wrap", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m("a.link.dim.pointer.ws-normal", linkAttrs(type, value()), m("i.mr2", {
                    class: linkIcon(type, config)
                }), value())
            ]);
        }
    }

    class SelectionInner {
        view({ attrs: { selected, label, onIcon, offIcon, config } }) {
            return m(".flex.items-center.h-100", getConfig("selectionLayout", config).map((element) => {
                switch (element) {
                    case "label": return label;
                    case "icon": return getIcon(selected ? onIcon : offIcon, "mh1");
                    case "on": return m("span.mh1", {
                        class: getConfig(selected ? "selectionOnActive" : "selectionOnInactive", config)
                    }, getConfig("selectionOnLabel", config));
                    case "off": return m("span.mh1", {
                        class: getConfig(selected ? "selectionOffInactive" : "selectionOffActive", config)
                    }, getConfig("selectionOffLabel", config));
                }
            }));
        }
    }

    class Checkbox {
        constructor() {
            this.onIcon = "checkIcn";
            this.offIcon = "uncheckIcn";
        }
        view({ attrs: { field, value } }) {
            const { label, uiClass = {}, config } = field;
            return m(".pa2", {
                class: wrapperCls(uiClass),
            }, m(SelectionInner, {
                selected: Boolean(value()),
                label: getDisplayLabel(label, "mh1 truncate"),
                onIcon: getConfig(this.onIcon, config),
                offIcon: getConfig(this.offIcon, config),
                config
            }));
        }
    }

    class Toggle extends Checkbox {
        constructor() {
            super(...arguments);
            this.onIcon = "toggleOnIcn";
            this.offIcon = "toggleOffIcn";
        }
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
            const { label, id, name = id, title = titleFromLabel(label), required, readonly, disabled, autofocus, tabindex = "0", accept = defaultAccept, uiClass = {} } = field;
            const labelInner = this.showLabel && label ? getLabel(id, uiClass, label, required) : null;
            return m("label.db", Object.assign({ for: id, title: title, class: pointerCls(disabled, readonly), tabindex, "aria-labelled-by": id, "data-input-id": id, onkeydown: (e) => {
                    var _a;
                    if (e.key === " ") {
                        ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.firstElementChild).click();
                    }
                } }, (disabled || readonly ? {} : {
                ondragover: dragStart(dragging),
                ondragleave: dragStop(dragging),
                ondrop: drop(dragging, onSet)
            })), [
                m("input.clip[type=file].bg-transparent.bn.outline-0", {
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
            const { disabled, uiClass = {}, config, readonly } = field;
            return m("div", {
                class: wrapperCls(uiClass, disabled)
            }, [
                m(FileInput, {
                    field,
                    dragging: this.dragging,
                    onSet: addFiles(value),
                    value
                }, m(".pa2", {
                    class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
                }, [
                    getIcon(getConfig("uploadIcn", config), "db mr2"),
                    m("span", getConfig("addFilesTxt", config))
                ])),
                m(".flex.flex-column.mt1.nb1", lodash.map(value(), (file) => m("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
                    getIcon(getConfig("downloadIcn", config), "db mr2"),
                    file.name,
                    !(readonly || disabled) && m("i.child.fr", {
                        title: `${getConfig("remFileTtl", config)} ${file.name}`,
                        onclick: removeFile(value, file.guid)
                    }, getIcon(getConfig("deleteIcn", config), "db"))
                ])))
            ]);
        }
    }

    class Thumbnail {
        view({ children, attrs }) {
            return m(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child", {
                tabindex: 0,
                // Click contained button if present
                onkeydown: ({ key }) => {
                    var _a;
                    if (key === "Enter" && document.activeElement) {
                        (_a = document.activeElement.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
                    }
                }
            }, [
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
        view({ attrs: { displayType = "thumbnail" /* DisplayType.thumbnail */, value, readonlyOrDisabled, config } }) {
            return displayType === "thumbnail" /* DisplayType.thumbnail */ ? m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb", lodash.map(value(), (file) => m(Thumbnail, {
                src: imgSrc(file.path, file.dataUrl),
                data: file
            }, !readonlyOrDisabled && m(".absolute.top-0.right-0.child", m(Button, {
                title: `Remove ${file.name}`,
                icon: getConfig("deleteIcn", config),
                onclick: removeFile(value, file.guid),
                tabindex: -1
            }))))) : m(".pa2.flex.flex-column", lodash.map(value(), (file) => m(".flex.items-center.pa1.ba.b--black-20", [
                getIcon(getConfig("uploadIcn", config), "pa1"),
                m("span.ma1.flex-auto", {
                    title: file.name
                }, file.name),
                m(FileOpen, file),
                !readonlyOrDisabled && m("i.pa1.pointer.dim", {
                    title: `Remove ${file.name}`,
                    class: getConfig("cancelIcn", config),
                    onclick: removeFile(value, file.guid)
                })
            ])));
        }
    }

    class SelectText {
        view({ attrs: { field, value } }) {
            const { label: lbl, options, uiClass = {} } = field;
            // Get label for selected options (falling back to the value)
            const option = lodash.find(options, { value: value() });
            const label = option ? option.label || option.value : value();
            return m(".pa2.flex.flex-wrap", {
                class: wrapperCls(uiClass),
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
            const { label, uiClass = {}, config } = field;
            return m(".pa2.flex.flex-column", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m(".flex.flex-column.mt1.nb1", lodash.map(value(), ({ name, path }) => {
                    return m("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]", {
                        class: theme.displayValue,
                        href: path
                    }, [
                        getIcon(getConfig("downloadIcn", config), "db mr2"),
                        name
                    ]);
                }))
            ]);
        }
    }

    class ImageList {
        view({ attrs: { field, value } }) {
            const { label, uiClass = {} } = field;
            return m(".pa2.flex.flex-column", {
                class: wrapperCls(uiClass),
            }, [
                getDisplayLabel(label),
                m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb", lodash.map(value(), ({ name, path, dataUrl }) => m(Thumbnail, {
                    title: name,
                    src: imgSrc(path, dataUrl)
                })))
            ]);
        }
    }

    class ImagePreview {
        view({ attrs: { field, value } }) {
            const { label, uiClass = {}, config } = field;
            const file = lodash.head(value());
            return m(".pa2.flex.flex-column", {
                class: wrapperCls(uiClass)
            }, [
                getDisplayLabel(label),
                file ? m("img.img.h-100.max-h-img.mt2.contain.self-center", {
                    title: file.name,
                    src: imgSrc(file.path, file.dataUrl)
                }) : m("i.mt2", {
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
            if (countMatches(value, /\d/g) > 1) {
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
            return m(".flex.flex-column", [
                getDisplayLabel(label),
                m(".flex.mt1", lodash.map(passwordStrength, (val) => m(".h1.w-20", {
                    class: this.passwordScore() >= val.value ? val.background : "bg-transparent"
                }))),
                m("span.f5.truncate", passwordStrengthStr(this.passwordScore()))
            ]);
        }
    }

    class Label {
        view({ attrs: { field: { label = "", id, required, uiClass = {} } } }) {
            return m("div", { class: wrapperCls(uiClass) }, getLabel(id, uiClass, label, required));
        }
    }

    class BaseWidget {
        constructor() {
            this._focus = false;
            // TODO Default to false once agreement on validation state showing
            this._touch = true;
            this._valid = true;
            /**
             * Mark the widget as "touched",
             * automatically occurs when user focus leaves the widget
             * or when the widget stream is updated to a non-null value
             */
            this.touch = this.unboundTouch.bind(this);
            this.boundFocus = this.unboundFocus.bind(this);
            this.selector = "input";
        }
        unboundTouch() {
            this._touch = true;
            this._focus = false;
            m.redraw();
        }
        unboundFocus() {
            this._focus = true;
            m.redraw();
        }
        /** Widget currently in focus */
        get inFocus() {
            return this._focus;
        }
        /** Widget fails validation */
        get invalid() {
            return !this._valid;
        }
        // Validity may change due to user input or widget validation attributes
        checkValidity() {
            if (this._touch) {
                const validity = this._inputElement.checkValidity();
                if (validity !== this._valid) {
                    this._valid = validity;
                    m.redraw();
                }
            }
        }
        oncreate({ dom, attrs: { value } }) {
            dom.addEventListener("focusin", this.boundFocus);
            dom.addEventListener("focusout", this.touch);
            this._inputElement = dom.querySelector(this.selector);
            // Pre-populated value stream indicates this input has already been touched and should be validated as normal
            if (value() != null) {
                this._touch = true;
            }
            this.checkValidity();
        }
        onupdate({ attrs: { value } }) {
            // Any stream change is considered user input
            if (value() != null && this._touch === false) {
                this.touch();
            }
            this.checkValidity();
        }
        onbeforeremove({ dom }) {
            dom.removeEventListener("focusin", this.boundFocus);
            dom.removeEventListener("focusout", this.touch);
        }
    }

    class Basic {
        view({ attrs, children }) {
            const { field, invalid, focus } = attrs;
            const { label, id, type = "text" /* FieldType.text */, required, disabled, uiClass = {} } = field;
            // Wrapper
            return m("div", {
                class: type === "hidden" /* FieldType.hidden */ ? "clip" : wrapperCls(uiClass, disabled)
            }, [
                // Basic label
                getLabel(id, uiClass, label, required),
                // Input wrapper
                m("fieldset", {
                    class: inputWrapperCls(field, invalid, focus)
                }, 
                // Input
                children)
            ]);
        }
    }

    class FloatLabel {
        // Float label if element has a value set or is in focus
        shouldFloat(layout, value, focus, readonly = false) {
            return layout === "floatAlways" /* LayoutType.floatAlways */ || focus || Boolean(value) || readonly;
        }
        labelTranslateY() {
            // 50% down + legend height(0.5ch with 0.7em child text) - 1.5 * "x" height
            return "calc(50% + 0.175ch - 1.5ex)";
        }
        labelContent(label, required) {
            return typeof label === "string"
                ? getLabelText(label, required)
                : [getLabelText(label, required), getAltLabel(label)];
        }
        view({ attrs, children }) {
            const { field, value, xform = value, invalid, focus } = attrs;
            const { label, id, type = "text" /* FieldType.text */, placeholder, required, disabled, readonly, uiClass = {}, config, layout = getConfig("layoutType", config) } = field;
            // Placeholder or value count as value content
            const floatTop = this.shouldFloat(layout, placeholder || (xform() != null && String(xform())), focus, readonly);
            // Wrapper (padding for shrunk label overflow)
            return m("div", {
                class: joinClasses([
                    type === "hidden" /* FieldType.hidden */ ? "clip" : wrapperCls(uiClass, disabled),
                    label ? "pt2" : null
                ])
            }, 
            // Input wrapper
            m("fieldset.relative.pa0.ma0.w-100", {
                class: inputWrapperCls(field, invalid, focus)
            }, [
                label ? [
                    // Break fieldset border, make space for label to float into
                    m("legend.db.hidden.h-05ch.transition-mw", {
                        class: `${labelCls(uiClass, required)} ${floatTop ? "mw-100" : "mw-001px"}`,
                    }, m("span.f-07em", this.labelContent(label, required))),
                    // Floating label container, fill fieldset inner region
                    m(".absolute.h-100.top-0.transition-transform.pe-none", {
                        style: {
                            // Input wrapper legend or center of fieldset
                            transform: `translateY(${floatTop ? "-1ch" : this.labelTranslateY()})`
                        }
                    }, m("label.db.transition-f", {
                        for: id, title: typeof label === "string" ? label : label.text,
                        class: floatLabelPlaceholderCls(field, floatTop)
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
            return m(layout === "default" /* LayoutType.default */ ? Basic : this.layout, attrs, children);
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
        "date" /* FieldType.date */,
        "datetime-local" /* FieldType.dateTimeLocal */,
        "time" /* FieldType.time */,
        "color" /* FieldType.color */,
        "range" /* FieldType.range */
    ]);
    class BaseInput extends BaseWidget {
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, type = "text" /* FieldType.text */, name = id, title = titleFromLabel(label), placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, spellcheck, instant, uiClass = {} } = field;
            const layoutComp = fixedLabelTypes.has(type) ? LayoutFixed : Layout;
            return m(layoutComp, {
                field,
                value,
                xform,
                invalid: this.invalid,
                focus: this.inFocus
            }, m("input.w-100.bg-transparent.bn.outline-0", {
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

    class CurrencyInput extends BaseWidget {
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, name = id, title = titleFromLabel(label), placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, spellcheck, uiClass = {}, config } = field;
            const symbol = getConfig("currencySymbol", config);
            const negativeStyle = getConfig("negativeStyle", config);
            const badgePosition = getConfig("badgePosition", config);
            const unitTotal = propToNumber(xform());
            const inputClass = inputCls(uiClass);
            // Handle negative currency values
            const negative = unitTotal < 0;
            const redNegative = negativeStyle === "red";
            const redNumber = redNegative || negativeStyle === "redParentheses";
            const negativeParens = negativeStyle === "parentheses" || negativeStyle === "redParentheses";
            return m(LayoutFixed, {
                field,
                value,
                invalid: this.invalid,
                focus: this.inFocus
            }, m(".flex.w-100", [
                m("span.self-center", {
                    class: joinClasses([
                        badgePosition === "left" ? "order-0 mr1" : "order-last ml1",
                        inputClass
                    ])
                }, symbol),
                m("input.absolute.pa0.w1.o-0.pe-none[type=number]", {
                    name, value: unitTotal,
                    max, maxlength, min, minlength, step, required, readonly, disabled,
                    tabindex: -1,
                    ariaHidden: "true"
                }),
                m("input.w-100.bg-transparent.bn.outline-0", {
                    id, type: "text" /* FieldType.text */,
                    name: `${name}-currency`, title, placeholder,
                    required, readonly, disabled, autofocus, autocomplete, tabindex,
                    pattern, inputmode, spellcheck,
                    class: joinClasses([
                        badgePosition === "right" ? "tr" : "",
                        redNumber && negative ? theme.redNumber : null,
                        inputClass
                    ]),
                    onfocus: selectTarget,
                    onblur: this.touch,
                    value: lodash.isUndefined(xform())
                        ? null
                        // "Flip" negative "red" numbers, remove the minus sign
                        : Currency.format(unitTotal, negativeParens, redNegative && negative),
                    onchange: setCurrencyValue(value)
                })
            ]));
        }
    }
    function propToNumber(value) {
        return lodash.isString(value) ? lodash.parseInt(value) : Number(value);
    }
    // Currency TProp update helper
    function setCurrencyValue(val) {
        return ({ target: { value } }) => val(Currency.strToNum(value));
    }
    /**
     * @deprecated Use Currency.format instead
     */
    function formatCurrency(unitTotal, negativeStyle, invert = false) {
        const currencyStr = numberToCurrencyStr(unitTotal);
        const invertNegative = invert ? unitTotal > 0 : unitTotal < 0;
        if (invertNegative) {
            if (negativeStyle.toLowerCase().includes("parentheses")) {
                return `(${currencyStr})`;
            }
            else if (negativeStyle !== "red") {
                return `-${currencyStr}`;
            }
        }
        return currencyStr;
    }
    /**
     * @deprecated Use Currency.strToNum instead
     * Parse a currency string into a number
     * @param currencyStr Value to convert e.g. "123.45"
     * @return parsed value as smallest monetary unit e.g. 12345
     */
    function currencyStrToNumber(currencyStr) {
        return Currency.strToNum(currencyStr);
    }
    /**
     * @deprecated Use Currency.numtoStr instead
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
     * @deprecated Use Currency.numToTuple instead
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

    class PercentageInput extends BaseWidget {
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, name = id, title = titleFromLabel(label), placeholder, max, maxlength, min, minlength, step, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, spellcheck, instant, uiClass = {}, config } = field;
            const badgePosition = getConfig("badgePosition", config);
            return m(LayoutFixed, {
                field,
                value,
                invalid: this.invalid,
                focus: this.inFocus
            }, m('.flex.flex-row.w-100', [
                m("span.self-center", {
                    class: joinClasses([
                        badgePosition === "left" ? "order-0 mr1" : "order-last ml1",
                        inputCls(uiClass)
                    ])
                }, "%"),
                m("input.w-100.bg-transparent.bn.outline-0", {
                    id, type: "number" /* FieldType.number */, name, title, placeholder,
                    max, maxlength, min, minlength, step, required,
                    readonly, disabled, autofocus, autocomplete, tabindex,
                    pattern, inputmode, spellcheck,
                    class: joinClasses([
                        badgePosition === "right" ? "tr" : "",
                        inputCls(uiClass)
                    ]),
                    onfocus: selectTarget,
                    value: xform(),
                    // Update value on change or input ("instant" option)
                    [instant ? "oninput" : "onchange"]: setValue(value)
                })
            ]));
        }
    }

    // All individual inputs have a fixed suffix for date types
    function dateInputIds(type) {
        switch (type) {
            case "day": return "dd";
            case "month": return "mm";
            case "year": return "yyyy";
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
        if (formattedMessage.includes("month")) {
            return "mm";
        }
        else if (formattedMessage.includes("day")) {
            return "dd";
        }
        else if (formattedMessage.includes("year")) {
            return "yy";
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
        if ((event.key === "Backspace" || event.key === "Delete") && streamValue.length === 0 && prev) {
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
        if (value.length === 1 && value !== "0") {
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
        if (errMsg.includes("month")) {
            return "month";
        }
        else if (errMsg.includes("day")) {
            return "day";
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
            dom.querySelectorAll("input").forEach((item) => {
                if (inputId && item.id.substring(item.id.length - 2) === inputId && message) {
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
    function validateDate(year, month, day, field, dom) {
        const validation = luxon.DateTime.fromObject({
            year: Number(year),
            month: Number(month),
            day: Number(day)
        });
        const dateEmpty = !year && !month && !day;
        setAllValidityMessage(getDateValidityMessage(validation, year, dateEmpty), dom);
        const boundsValid = Number(year) >= 1900;
        const minValid = field.min ? validation >= luxon.DateTime.fromISO(String(field.min)) : true;
        const maxValid = field.max ? validation <= luxon.DateTime.fromISO(String(field.max)) : true;
        return (validation.isValid && minValid && maxValid && boundsValid) || (dateEmpty && !field.required);
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

    class CardDateInput {
        constructor() {
            this.dom = stream();
            this.valid = stream();
            this.focusedInput = stream('mm');
            this.month = stream("");
            this.year = stream("");
            this.date = stream("");
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
            return m(LayoutFixed, {
                field,
                value,
                invalid: !this.valid(),
                focus: false
            }, m(".flex.items-center", m(".relative.flex-auto.ph-2px.pv-1px", {
                onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
            }, [
                // Hidden input for form validation and submission
                m("input.absolute.pa0.w1.o-0.pe-none[type=text]", {
                    id, value: value(),
                    required, readonly, disabled,
                    tabindex: -1,
                    ariaHidden: "true"
                }),
                // Year (2 digit)
                m("input.w-100.mw-mm.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-mm`, name: `${name}-mm`,
                    type: "text" /* FieldType.text */, placeholder: "MM",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    'aria-label': `${name}: Month`,
                    value: this.month(),
                    class: classStr,
                    onfocus: lodash.partial(this.focusedInput, 'mm'),
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
                }),
                m(".di.mr-2px", "/"),
                // Month
                m("input.w-100.mw-yy.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-yy`, name: `${name}-yy`,
                    type: "text" /* FieldType.text */, placeholder: "YY",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    'aria-label': `${name}: Year`,
                    value: this.year(),
                    class: classStr,
                    onfocus: lodash.partial(this.focusedInput, 'yy'),
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, 'yy', this.year(), this.dom(), e, '/', { prev: 'mm' });
                    },
                    oninput: () => {
                        handleDateChange(this.year, id, "yy", this.dom());
                        this.buildDate(Boolean(field.required), attrs.value);
                    }
                })
            ])));
        }
    }

    function getYmd(date) {
        return [
            String(date.getFullYear()),
            lodash.padStart(String(1 + date.getMonth()), 2, "0"),
            lodash.padStart(String(date.getDate()), 2, "0"),
        ];
    }
    class DatePicker {
        oncreate({ dom, attrs: { field: { max, min }, value } }) {
            // Position picker relative to parent & left/right screen half
            const container = dom.parentElement;
            const { left, right } = container.getBoundingClientRect();
            this.flatpickr = flatpickr(dom, {
                positionElement: container,
                position: left + right < window.innerWidth ? "below left" : "below right",
                disableMobile: true,
                minDate: min,
                maxDate: max,
                onChange: ([newDate]) => {
                    if (newDate) {
                        value(getYmd(newDate).join("-"));
                        m.redraw();
                    }
                }
            });
            // Sync value change with flatpickr
            this.valueChange = value.map((newVal) => {
                const date = new Date(String(newVal));
                if (isNaN(date.valueOf())) {
                    this.flatpickr.clear();
                }
                else {
                    this.flatpickr.setDate(date, false);
                }
            });
        }
        // Consider updating min/max attrs in onupdate event
        onremove() {
            this.flatpickr.destroy();
            this.valueChange.end(true);
        }
        view({ attrs: { field: { config } } }) {
            return getIcon(getConfig("datePickerIcn", config), "ph-2px pv-1px");
        }
    }

    class DateInput {
        constructor() {
            this.dom = stream();
            this.valid = stream();
            this.focusedInput = stream(undefined);
            this.locale = stream(undefined);
            this.literalKey = stream("/");
            this.day = stream("");
            this.month = stream("");
            this.year = stream("");
            this.date = stream();
        }
        buildDate(valueStream, field) {
            this.date(`${this.year()}-${this.month()}-${this.day()}`);
            const valid = validateDate(this.year(), this.month(), this.day(), field, this.dom());
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
            this.dateInputAdvanceOrder = lodash(this.dateParts)
                .map((({ type }) => type))
                .filter((type) => type !== "literal")
                .value();
        }
        setLocale(config) {
            const locale = getConfig("dateLocale", config);
            if (locale !== this.locale()) {
                this.locale(locale);
            }
        }
        createDateInputs({ type, value }, { attrs: { field, value: streamValue } }) {
            const { id, name = id, required, readonly, disabled, tabindex, uiClass = {}, } = field;
            const classStr = inputCls(uiClass);
            switch (type) {
                case ("literal"): return m(".di.mr-2px.tl", value);
                case ("day"): return m("input.w-100.mw-dd.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-dd`, name: `${name}-dd`,
                    type: "text" /* FieldType.text */, placeholder: "DD",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    value: this.day(),
                    "aria-label": `${name}: Day`,
                    class: `${classStr} maxw-dd p-0px`,
                    onfocus: lodash.partial(this.focusedInput, "dd"),
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, "dd", this.day(), this.dom(), e, this.literalKey(), {
                            next: this.findNextInput("day"),
                            prev: this.findPrevInput("day")
                        });
                    },
                    oninput: () => {
                        handleDateChange(this.day, id, "dd", this.dom(), this.findNextInput("day"));
                        this.buildDate(streamValue, field);
                    },
                    onblur: () => {
                        appendZeroToDayMonth(this.day);
                        this.buildDate(streamValue, field);
                    }
                });
                case ("month"): return m("input.w-100.mw-mm.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-mm`, name: `${name}-mm`,
                    type: "text" /* FieldType.text */, placeholder: "MM",
                    minlength: "2", maxlength: "2",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    value: this.month(),
                    "aria-label": `${name}: Month`,
                    class: `${classStr} maxw-mm p-0px`,
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, "mm", this.month(), this.dom(), e, this.literalKey(), {
                            next: this.findNextInput("month"),
                            prev: this.findPrevInput("month")
                        });
                    },
                    oninput: () => {
                        handleDateChange(this.month, id, "mm", this.dom(), this.findNextInput("month"));
                        this.buildDate(streamValue, field);
                    },
                    onfocus: lodash.partial(this.focusedInput, "mm"),
                    onblur: () => {
                        appendZeroToDayMonth(this.month);
                        this.buildDate(streamValue, field);
                    }
                });
                case ("year"): return m("input.w-100.mw-yyyy.pa0.bg-transparent.bn.outline-0.tc", {
                    id: `${id}-yyyy`, name: `${name}-yyyy`,
                    type: "text" /* FieldType.text */, placeholder: "YYYY",
                    minlength: "4", maxlength: "4",
                    pattern: "[0-9]*", inputmode: "numeric",
                    required, readonly, disabled, tabindex,
                    value: this.year(),
                    "aria-label": `${name}: Year`,
                    class: `${classStr} maxw-yyyy p-0px`,
                    onfocus: lodash.partial(this.focusedInput, "yyyy"),
                    onkeydown: (e) => {
                        handleRetreatOrLiteralAdvance(id, "yyyy", this.year(), this.dom(), e, this.literalKey(), {
                            next: this.findNextInput("year"),
                            prev: this.findPrevInput("year")
                        });
                    },
                    oninput: () => {
                        handleDateChange(this.year, id, "yyyy", this.dom(), this.findNextInput("year"));
                        this.buildDate(streamValue, field);
                    }
                });
            }
        }
        resetDateParts() {
            this.day("");
            this.month("");
            this.year("");
        }
        oninit({ attrs: { value, field } }) {
            const { required, config } = field;
            this.valid(!required);
            // Split value into date parts
            this.valueChange = value.map((newVal) => {
                // only handle value when the main value stream is changed
                if (newVal) {
                    const date = new Date(String(newVal));
                    // multiple data-binding reset date stream (important, reset local date stream when value is present)
                    this.date("");
                    if (isNaN(date.valueOf())) {
                        this.resetDateParts();
                    }
                    else {
                        // set individual date inputs based on value stream (not date stream)
                        const [year, month, day] = getYmd(date);
                        this.day(day);
                        this.month(month);
                        this.year(year);
                    }
                }
                else if (!this.date()) {
                    this.resetDateParts();
                }
                // validate when value comes in from other date inputs
                this.valid(validateDate(this.year(), this.month(), this.day(), field, this.dom()));
            });
            this.locale.map((newVal) => this.setDateInputs(newVal));
            this.setLocale(config);
        }
        oncreate({ dom }) {
            setIfDifferent(this.dom, dom);
        }
        onbeforeupdate({ attrs: { field } }) {
            this.setLocale(field.config);
            this.valid(validateDate(this.year(), this.month(), this.day(), field, this.dom()));
        }
        onupdate({ dom }) {
            setIfDifferent(this.dom, dom);
        }
        onremove() {
            this.valueChange.end(true);
            this.date.end(true);
            this.year.end(true);
            this.month.end(true);
            this.day.end(true);
            this.locale.end(true);
        }
        view(vnode) {
            const { attrs: { field, value } } = vnode;
            const { id, name = id, required, readonly, disabled, min, max } = field;
            return m(LayoutFixed, {
                field,
                value,
                invalid: !this.valid(),
                focus: false
            }, m(".flex.items-center", [
                m(".relative.flex-auto.ph-2px.pv-1px", {
                    onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
                }, 
                // Hidden input for form validation and submission
                m("input.absolute.pa0.w1.o-0.pe-none[type=date]", {
                    id, name, value: value(),
                    required, readonly, disabled,
                    min, max,
                    tabindex: -1,
                    ariaHidden: "true"
                }), 
                // Date components
                this.dateParts.map((datePart) => this.createDateInputs(datePart, vnode))),
                !(disabled || readonly) && m(DatePicker, { field, value })
            ]));
        }
    }

    class TimeScroller {
        static formatValue(value) {
            const val = value();
            return val != null
                ? val.padStart(2, "0").slice(0, 2)
                : "-";
        }
        static applyStep(value, step, min, max) {
            const numVal = Number(TimeScroller.formatValue(value));
            const safeVal = isNaN(numVal) ? min : numVal;
            // Apply step if within bounds
            const stepVal = safeVal + step;
            const newVal = (stepVal < min || stepVal > max) ? safeVal : stepVal;
            value(newVal.toString());
        }
        view({ attrs: { value, step = 1, min, max, config } }) {
            return m(".flex.flex-column.items-center", [
                m(".pointer", {
                    onclick: () => TimeScroller.applyStep(value, step, min, max)
                }, getIcon(getConfig("timeScrollerUpIcn", config), "")),
                m("span.mv2.w-100.mw-dd.tc.f6.fw6", {
                    class: theme.timeInputScrollerNumber
                }, TimeScroller.formatValue(value)),
                m(".pointer", {
                    onclick: () => TimeScroller.applyStep(value, -step, min, max)
                }, getIcon(getConfig("timeScrollerDownIcn", config), ""))
            ]);
        }
    }

    class TimePicker {
        oncreate({ dom, attrs: { onClose: close } }) {
            this.dom = dom;
            this.clickListener = (evt) => {
                if (evt.target && !this.dom.contains(evt.target)) {
                    close();
                    m.redraw();
                }
            };
            document.addEventListener("click", this.clickListener);
        }
        onremove() {
            document.removeEventListener("click", this.clickListener);
        }
        view({ attrs: { hour, min, step, config } }) {
            return m(".flex.items-center.absolute.z-max.us-none", {
                class: theme.timeInputScrollerWrapper
            }, [
                m(TimeScroller, {
                    value: hour,
                    min: 0, max: 23,
                    config
                }),
                m("span.ph2.f6", ":"),
                m(TimeScroller, {
                    value: min,
                    min: 0, max: 59,
                    step,
                    config
                })
            ]);
        }
    }

    function cleanTime(value) {
        return value.replace(/[^0-9]/g, "").slice(0, 2);
    }
    function padZero(value) {
        return value.padStart(2, "0");
    }
    class TimeInput extends BaseWidget {
        constructor() {
            super(...arguments);
            this.showPicker = false;
            this.focus = 0 /* Focus.None */;
            // Hour/Minute input, clamped to 0-2 chars, padded with leading 0
            this.hour = stream();
            this.cleanHour = this.hour.map(cleanTime);
            this.padHour = this.cleanHour.map(padZero);
            this.min = stream();
            this.cleanMin = this.min.map(cleanTime);
            this.padMin = this.cleanMin.map(padZero);
            // Combined hour/minute stream
            this.time = stream.lift((hour, min) => hour && min ? `${hour}:${min}` : "", this.padHour, this.padMin);
        }
        /** Update hour/minute streams from value stream if changed */
        syncTime(value) {
            const inVal = value();
            if (inVal !== this.time()) {
                const [hour, min = ""] = String(inVal).split(":");
                this.hour(hour);
                this.min(min);
            }
        }
        oninit({ attrs: { value } }) {
            // Write valid time to value stream
            this.time.map((time) => value(time));
            this.syncTime(value);
        }
        onbeforeupdate({ attrs: { value } }) {
            this.syncTime(value);
        }
        onremove() {
            this.time.end(true);
            this.min.end(true);
            this.hour.end(true);
        }
        view({ attrs }) {
            const { field, value } = attrs;
            const { id, name = id, step, required, readonly, disabled, uiClass = {}, config } = field;
            const classStr = inputCls(uiClass);
            return m(LayoutFixed, {
                field,
                value,
                invalid: this.invalid,
                focus: this.inFocus
            }, m(".flex.items-center", [
                m(".relative.flex-auto.ph-2px.pv-1px", {
                // onclick: () => focusLastInput(this.dom(), id, this.focusedInput())
                }, [
                    // Hidden input
                    m("input.absolute.pa0.w1.o-0.pe-none[type=text]", {
                        name, value: value(),
                        required, readonly, disabled,
                        tabindex: -1,
                        ariaHidden: "true"
                    }),
                    // Time Input parts
                    m("input.di.w-100.mw-tt.pa0.bg-transparent.bn.outline-0.tc", {
                        id: `${id}-hh`, name: `${name}-hh`,
                        type: "number" /* FieldType.number */, placeholder: "--",
                        min: 0, max: 23,
                        required, readonly, disabled,
                        'aria-label': `${name}: Hour`,
                        value: this.focus === 1 /* Focus.Hour */ ? this.cleanHour() : this.padHour(),
                        class: classStr,
                        oninput: setValue(this.hour),
                        onfocus: () => this.focus = 1 /* Focus.Hour */,
                        onblur: () => {
                            this.focus = 0 /* Focus.None */;
                            this.touch();
                        }
                    }),
                    m(".di.mr-2px", ":"),
                    m("input.di.w-100.mw-tt.pa0.bg-transparent.bn.outline-0.tc", {
                        id: `${id}-mm`, name: `${name}-mm`,
                        type: "number" /* FieldType.number */, placeholder: "--",
                        min: 0, max: 59, step,
                        required, readonly, disabled,
                        'aria-label': `${name}: Minute`,
                        value: this.focus === 2 /* Focus.Minute */ ? this.cleanMin() : this.padMin(),
                        class: classStr,
                        oninput: setValue(this.min),
                        onfocus: () => this.focus = 2 /* Focus.Minute */,
                        onblur: () => this.focus = 0 /* Focus.None */
                    }),
                    // Floating time picker
                    this.showPicker && m(TimePicker, {
                        hour: this.hour,
                        min: this.min,
                        step: step === "any" ? 1 : step,
                        config,
                        onClose: () => this.showPicker = false
                    })
                ]),
                !(disabled || readonly) && m(".pointer", {
                    // TimePicker onClose event will handle hiding the picker
                    onclick: () => this.showPicker = true
                }, getIcon(getConfig("timePickerIcn", config), "ph-2px pv-1px"))
            ]));
        }
    }

    class PasswordInput extends BaseWidget {
        constructor() {
            super(...arguments);
            this.showPassword = stream(false);
        }
        view({ attrs }) {
            const { field, value } = attrs;
            const { label, id, name = id, title = titleFromLabel(label), placeholder, maxlength, minlength, required, readonly, disabled, autofocus, autocomplete, tabindex, pattern, inputmode, instant, uiClass = {}, config } = field;
            return m(Layout, {
                field,
                value,
                invalid: this.invalid,
                focus: this.inFocus
            }, m('.flex.flex-row.w-100', [
                m("input.w-100.bg-transparent.bn.outline-0", {
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
                // Show/hide password toggle
                m(".ml1.pointer.dim", {
                    title: getConfig("showPassTxt", config),
                    onclick: () => this.showPassword(!this.showPassword()),
                    tabindex: 0,
                    onkeydown: clickOnEnter
                }, getIcon(getConfig(this.showPassword() ? "hidePassIcn" : "showPassIcn", config), "db pa1"))
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

    class TextareaInput extends BaseWidget {
        constructor() {
            super(...arguments);
            this.selector = "textarea";
        }
        view({ attrs }) {
            const { field, value, xform = value } = attrs;
            const { label, id, name = id, title = titleFromLabel(label), placeholder, required, readonly, disabled, autofocus, autocomplete, minlength, maxlength, tabindex, spellcheck, rows, cols, wrap, instant, uiClass = {} } = attrs.field;
            return m(LayoutTop, {
                field,
                value,
                xform,
                invalid: this.invalid,
                focus: this.inFocus
            }, m("textarea.w-100.bg-transparent.bn.outline-0.h-100.resize-none", {
                id, name, title,
                placeholder, required, readonly, disabled, autofocus, autocomplete,
                minlength, maxlength, tabindex, spellcheck, rows, cols, wrap,
                class: textareaCls(uiClass),
                value: value(),
                // Update value on change or input ("instant" option)
                [instant ? "oninput" : "onchange"]: setValue(value)
            }));
        }
    }

    class CheckboxInput extends BaseWidget {
        constructor() {
            super(...arguments);
            this.onIcon = "checkIcn";
            this.offIcon = "uncheckIcn";
        }
        view({ attrs: { field, value: val } }) {
            const { label, id, name = id, value, title = titleFromLabel(label), required, readonly, disabled, autocomplete, tabindex = "0", uiClass = {}, config } = field;
            return m("div", {
                class: wrapperCls(uiClass, disabled),
            }, m("fieldset.w-100.bn", {
                class: inputWrapperCls(field)
            }, [
                m("input.clip[type=checkbox]", {
                    id, name, value,
                    checked: val(),
                    required, autocomplete,
                    disabled: disabled || readonly,
                    tabindex: -1,
                    'aria-hidden': "true",
                    onchange: setCheck(val, value)
                }),
                m("label.db", {
                    class: joinClasses([
                        checkInputCls(field),
                        this.invalid ? theme.invalidCheckboxWrapper : ""
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
                }, m(SelectionInner, {
                    selected: Boolean(val()),
                    label: label ? m("span.mh1", getLabelText(label, required)) : null,
                    onIcon: getConfig(this.onIcon, config),
                    offIcon: getConfig(this.offIcon, config),
                    config
                }))
            ]));
        }
    }

    class ToggleInput extends BaseWidget {
        constructor() {
            super(...arguments);
            this.onIcon = "toggleOnIcn";
            this.offIcon = "toggleOffIcn";
        }
        toggle(field, val, children) {
            const checked = Boolean(val());
            const { label, id, name = id, value, title = titleFromLabel(label), required, readonly, disabled, autocomplete, tabindex = "0", config } = field;
            return [
                m("input.clip[type=checkbox]", {
                    id, name, value,
                    checked: val(),
                    required, autocomplete,
                    disabled: disabled || readonly,
                    tabindex: -1,
                    'aria-hidden': "true",
                    onchange: setCheck(val, value)
                }),
                m("label.db.flex.justify-content.items-center", {
                    class: joinClasses([
                        checkInputCls(field),
                        this.invalid ? theme.invalidCheckboxWrapper : ""
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
                    m(".toggle-outer.relative.dib.transition-bg", {
                        class: checked
                            ? getConfig("toggleOnWrapper", config)
                            : getConfig("toggleOffWrapper", config)
                    }, getIcon(getConfig(checked ? this.onIcon : this.offIcon, config), joinClasses([
                        "toggle-inner absolute tc transition-transform",
                        checked ? "toggle-on" : null
                    ]))),
                    children
                ])
            ];
        }
        view({ attrs: { field, value: val } }) {
            const { label, required, disabled, uiClass, layout } = field;
            return layout
                // Toggle in widget layout
                ? m(Layout, {
                    field,
                    value: val,
                    invalid: this.invalid,
                    focus: false
                }, this.toggle(field, val, null))
                // Toggle with inline label
                : m("div", {
                    class: wrapperCls(uiClass, disabled),
                }, m("fieldset.w-100.bn", {
                    class: inputWrapperCls(field)
                }, this.toggle(field, val, [
                    label ? m("span.mh1", getLabelText(label, required)) : null
                ])));
        }
    }

    class RadioInput extends BaseWidget {
        view({ attrs }) {
            const { field, value: val } = attrs;
            const { label, id, name, value, title = titleFromLabel(label), required, readonly, disabled, autocomplete, tabindex = "0", uiClass = {}, config } = field;
            const checked = val() === value;
            return m("div", {
                class: wrapperCls(uiClass, disabled),
            }, m("fieldset.w-100.bn", {
                class: inputWrapperCls(field)
            }, [
                m("input.clip[type=radio]", {
                    id, name, value,
                    checked, required, autocomplete,
                    disabled: disabled || readonly,
                    tabindex: -1,
                    'aria-hidden': "true",
                    onchange: setValue(val)
                }),
                m("label.db", {
                    class: checkInputCls(field),
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
                }, m(SelectionInner, {
                    selected: checked,
                    label: label ? m("span.mh1", getLabelText(label, required)) : null,
                    onIcon: getConfig("radioOnIcn", config),
                    offIcon: getConfig("radioOffIcn", config),
                    config
                }))
            ]));
        }
    }

    class SelectInput extends BaseWidget {
        constructor() {
            super(...arguments);
            this.selector = "select";
        }
        view({ attrs }) {
            const { field, value: val } = attrs;
            const { label: lbl, id, name = id, title = lbl, required, readonly, disabled, multiple, autofocus, autocomplete, tabindex, uiClass = {}, placeholder = "Select", options = [] } = field;
            const value = val();
            return m(LayoutFixed, {
                field,
                value: val,
                invalid: this.invalid,
                focus: this.inFocus
            }, [
                lbl ? null : m("legend.screenreader", {
                    id: `${id}-legend`
                }, "Select"),
                m("select.w-100.bg-transparent.bn.outline-0", {
                    id, name, title,
                    required, multiple, autofocus, autocomplete, tabindex,
                    disabled: disabled || readonly,
                    class: joinClasses([
                        inputCls(uiClass),
                        value ? "" : theme.floatLabelPlaceholder
                    ]),
                    value: value !== null && value !== void 0 ? value : "",
                    onchange: setValue(val),
                    'aria-labelledby': `${id}-legend`
                }, [
                    lodash.some(options, ({ value }) => !value)
                        ? null
                        : m("option", {
                            value: "",
                            disabled: true
                        }, placeholder),
                    lodash.map(options, ({ value, label = value }) => m("option", {
                        value,
                        disabled: !value || disabled || readonly,
                    }, label))
                ])
            ]);
        }
    }

    class ListPage {
        oncreate({ dom }) {
            this.container = dom;
        }
        onbeforeupdate({ attrs: { visible } }, { attrs: { visible: previous } }) {
            if (visible === previous) {
                // Let visible determine view
                return visible;
            }
            else {
                this.container.style.height = visible ? "auto"
                    : this.container.getBoundingClientRect().height + "px";
                // Always allow view (render visible rows or remove hidden rows)
                return true;
            }
        }
        view({ attrs: { items, idx, visible, component, fragment } }) {
            return m("div", {
                "data-idx": idx
            }, visible ? items.map((item) => m.fragment(fragment(item), [
                m(component, item)
            ])) : null);
        }
    }

    class List {
        constructor() {
            this.scrollHandler = lodash.throttle((target) => {
                const scrollPct = (target.scrollTop / target.scrollHeight) || 0;
                this.controller.updateScroll(scrollPct);
            }, 50, { leading: false });
        }
        static fragment() { return {}; }
        oninit({ attrs: { controller } }) {
            this.controller = controller;
        }
        view({ attrs: { component, classes = "overflow-y-auto", fragment = List.fragment } }) {
            return m("div", {
                class: classes,
                onscroll: (event) => {
                    event.redraw = false;
                    this.scrollHandler(event.target);
                }
            }, this.controller.render(({ items, idx, visible }) => m((ListPage), {
                items, idx, visible, component, fragment
            })));
        }
    }

    class ListController {
        /** Clamp value to a range, min takes priority over max */
        static clampRange(min, value, max) {
            return Math.max(min, Math.min(value, max));
        }
        /** Factory for a ListController that loads all data at once */
        static single(load) {
            const ctrl = new ListController(() => load().then((rowData) => {
                ctrl.updateDataStore(rowData);
                // Sort and filter immediately
                ctrl.applySort();
                m.redraw();
            }));
            return ctrl;
        }
        /** Factory for a ListController that loads data in pages */
        static paging(load) {
            const loadSize = ListController.BLOCK_SIZE * 4;
            const ctrl = new ListController((offset) => load(offset, loadSize + 1).then((rowData) => {
                if (rowData.length > loadSize) {
                    ctrl.updateDataStore(rowData.slice(0, loadSize), true);
                }
                else {
                    ctrl.updateDataStore(rowData);
                }
                m.redraw();
            }));
            return ctrl;
        }
        get data() {
            return this.dataStore;
        }
        get sortedData() {
            return this.sortedDataStore;
        }
        get filteredData() {
            return this.filteredDataStore;
        }
        /** Number of blocks that can be made from filtered data */
        get availableBlocks() {
            return Math.ceil(this.filteredDataStore.length / ListController.BLOCK_SIZE);
        }
        get loading() {
            return this.isLoading;
        }
        setSort(sortFn) {
            this.sortFn = sortFn;
        }
        applySort() {
            this.sortedDataStore = this.sortFn(this.dataStore);
            this.applyFilter();
        }
        setFilter(filterFn) {
            this.filterFn = filterFn;
        }
        applyFilter() {
            this.filteredDataStore = this.filterFn(this.sortedDataStore);
            this.invalidate();
            this.updateBlockRange();
        }
        reload() {
            this.bufferReload = this.loading;
            if (!this.bufferReload) {
                this.dataStore.splice(0, this.dataStore.length);
                this.invalidate();
                this.load();
            }
        }
        /** Update visible page range, trigger redraw if range has changed */
        updateScroll(percentage) {
            if (this.dataStore.length > 0) {
                this.scrollPct = percentage;
                this.updateBlockRange();
            }
        }
        updateDataStore(data, hasMore = false) {
            this.loadMore = hasMore;
            this.dataStore.push(...data);
            this.updateBlockRange();
        }
        render(callback) {
            return this.blockStore.map((items, idx) => callback({
                items,
                idx,
                visible: idx >= this.startBlock && idx < this.endBlock
            }));
        }
        debug() {
            return {
                data: this.data.length,
                filtered: this.filteredData.length,
                blocks: this.blockStore.length,
                start: this.startBlock,
                end: this.endBlock
            };
        }
        constructor(dataLoader) {
            this.dataLoader = dataLoader;
            // All data, unsorted and unfiltered
            this.dataStore = [];
            this.sortFn = lodash.identity;
            this.sortedDataStore = this.dataStore;
            this.filterFn = lodash.identity;
            this.filteredDataStore = this.sortedDataStore;
            // Data split into "blocks"
            this.blockStore = [];
            this.scrollPct = 0;
            this.startBlock = -1;
            this.endBlock = -1;
            this.loadMore = false;
            this.isLoading = false;
            this.bufferReload = false;
            this.load();
        }
        invalidate() {
            this.startBlock = -1;
            this.endBlock = -1;
            this.blockStore.splice(0, this.blockStore.length);
        }
        load() {
            if (!this.loading) {
                this.isLoading = true;
                m.redraw();
                this.dataLoader(this.data.length)
                    .catch(console.error)
                    .then(() => {
                    this.isLoading = false;
                    if (this.bufferReload) {
                        this.reload();
                    }
                });
            }
        }
        updateBlockRange() {
            const startBlock = ListController.clampRange(0, 
            // Bias to help different block sizes and scrolling up
            Math.floor(this.scrollPct * this.blockStore.length) - 1, 
            // Limit to last block - block range
            this.availableBlocks - ListController.BLOCK_RANGE);
            if (startBlock !== this.startBlock) {
                this.startBlock = startBlock;
                this.endBlock = startBlock + ListController.BLOCK_RANGE;
                this.ensureBlockStore();
                m.redraw();
            }
        }
        /** Ensure blockStore contains rows for the current block range, load more rows if required */
        ensureBlockStore() {
            // Create more blocks if required
            let bufferStart = this.blockStore.length * ListController.BLOCK_SIZE;
            // Limit block creation to available data
            const bufferEnd = Math.min(this.endBlock, this.availableBlocks) * ListController.BLOCK_SIZE;
            while (bufferStart < bufferEnd) {
                const end = bufferStart + ListController.BLOCK_SIZE;
                this.blockStore.push(this.filteredDataStore.slice(bufferStart, end));
                bufferStart = end;
            }
            // Load more blocks if required and next block will run out of buffer
            if (this.loadMore && bufferEnd >= this.dataStore.length) {
                this.load();
            }
        }
    }
    /** Number of items in each "block" */
    ListController.BLOCK_SIZE = 25;
    /** Number of "blocks" to render */
    ListController.BLOCK_RANGE = 3;

    class CheckList extends BaseWidget {
        constructor() {
            super(...arguments);
            this.onIcon = "checkIcn";
            this.offIcon = "uncheckIcn";
            this.opts = [];
            this.selected = new Set();
            this.open = false;
            this.openTs = 0;
            this._focusOption = null;
            this.keySearch = "";
        }
        get focusOption() {
            return this._focusOption;
        }
        set focusOption(value) {
            this.open = value != null;
            this._focusOption = value;
            if (!this.open) {
                this.applyFilter("");
            }
        }
        toggleOpen() {
            const ts = Date.now();
            if (ts - this.openTs > 333) {
                this.open = !this.open;
                this.openTs = ts;
            }
        }
        toggleSelection(option, value, multiple) {
            if (!multiple) {
                this.selected.clear();
                this.focusOption = null;
            }
            if (this.selected.has(option)) {
                this.selected.delete(option);
            }
            else {
                this.selected.add(option);
            }
            value(Array.from(this.selected).join(","));
        }
        moveFocus(delta) {
            const options = this.list.filteredData;
            const idx = lodash.findIndex(options, ({ value }) => value === this.focusOption);
            const clampIdx = lodash.clamp(idx + delta, 0, options.length - 1);
            this.focusOption = options[clampIdx].value;
        }
        applyFilter(search) {
            this.keySearch = search;
            this.list.applyFilter();
        }
        keyNav(evt, value, multiple) {
            // Don't handle any key presses with modifiers
            if (evt.altKey || evt.ctrlKey || evt.metaKey) {
                return;
            }
            switch (evt.key) {
                // Navigate
                case "ArrowDown": {
                    evt.preventDefault();
                    this.moveFocus(1);
                    break;
                }
                case "ArrowUp": {
                    evt.preventDefault();
                    this.moveFocus(-1);
                    break;
                }
                // Toggle
                case " ":
                case "Enter": {
                    evt.preventDefault();
                    if (this.focusOption != null) {
                        this.toggleSelection(String(this.focusOption), value, multiple);
                    }
                    else {
                        this.toggleOpen();
                    }
                    break;
                }
                // Close
                case "Escape": {
                    evt.preventDefault();
                    this.focusOption = null;
                    break;
                }
                // Clear search
                case "Delete": {
                    evt.preventDefault();
                    this.applyFilter("");
                    break;
                }
                case "Backspace": {
                    evt.preventDefault();
                    this.applyFilter(this.keySearch.slice(0, -1));
                    break;
                }
                // Search
                default:
                    if (evt.key.length === 1) {
                        evt.preventDefault();
                        this.applyFilter(this.keySearch + evt.key.toLowerCase());
                    }
            }
        }
        // Placeholder, single selection, or count of selected
        placeHolder(value, options, placeholder) {
            var _a, _b;
            if (this.selected.size > 1) {
                return `${this.selected.size} Selected`;
            }
            else if (this.selected.size === 1) {
                const matchVal = value();
                return (_b = (_a = lodash.find(options, (opt) => String(opt.value) === matchVal)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : placeholder;
            }
            else {
                return placeholder;
            }
        }
        /** Sync selection set with value stream */
        syncSelection(value) {
            if (value() != null) {
                const valStr = String(value());
                const values = valStr === "" ? [] : valStr.split(",");
                const selected = new Set(values);
                if (!lodash.isEqual(this.selected, selected)) {
                    this.selected = selected;
                }
            }
        }
        oninit({ attrs: { field: { options = [] }, value } }) {
            this.opts = options;
            this.list = ListController.single(() => Promise.resolve(this.opts));
            this.list.setFilter((options) => options.filter(({ value, label = value }) => String(label)
                .toLowerCase()
                .includes(this.keySearch)));
            this.syncSelection(value);
        }
        onbeforeupdate({ attrs: { field: { options = [] }, value } }) {
            this.syncSelection(value);
            // React to changes in options list length
            if (options.length !== this.opts.length) {
                this.opts = options;
                this.list.reload();
            }
        }
        view({ attrs }) {
            const { field, value: val } = attrs;
            const { label: lbl, id, name = id, title = lbl, required, readonly, disabled, multiple, uiClass = {}, placeholder = "Select", options = [], config } = field;
            const active = !(disabled || readonly);
            return m(LayoutFixed, {
                field,
                value: val,
                invalid: this.invalid,
                focus: this.inFocus
            }, [
                // Hidden input
                m("input.clip[type=text]", {
                    name, value: val(),
                    required,
                    tabindex: -1,
                    ariaHidden: "true"
                }),
                // Select "input"
                m(".relative.cursor-default", {
                    id, title,
                    disabled: !active,
                    tabindex: active ? 0 : -1,
                    role: "listbox",
                    class: inputCls(uiClass),
                    onclick: () => active ? this.toggleOpen() : undefined,
                    onfocusin: () => active ? this.toggleOpen() : undefined,
                    onfocusout: () => this.focusOption = null,
                    "aria-activedescendant": `${id}-${this.focusOption}`,
                    onkeydown: active
                        ? (evt) => this.keyNav(evt, val, multiple)
                        : undefined
                }, [
                    m(".flex.items-center", [
                        m(".flex-auto.ph-2px.pv-1px", this.keySearch
                            // Search term
                            ? m("span", this.keySearch)
                            // Selected option(s) or placeholder text
                            : m("span", {
                                class: this.selected.size ? undefined : theme.floatLabelPlaceholder
                            }, this.placeHolder(val, options, placeholder))),
                        getIcon(getConfig("checkListIcn", config), joinClasses([
                            "ph-2px pv-1px transition-transform",
                            this.open ? "rotate-180" : null
                        ]))
                    ]),
                    this.open && m((List), {
                        controller: this.list,
                        classes: joinClasses([
                            "absolute z-max us-none",
                            theme.checkListOptionsWrapper,
                            getConfig("checkListDropUp", config) ? "bottom-0" : "mt3"
                        ]),
                        component: multiple
                            ? { view: ({ attrs }) => this.multiSelectionRow(val, id, attrs, config) }
                            : { view: ({ attrs }) => this.singleSelectionRow(val, id, attrs) }
                    })
                ])
            ]);
        }
        singleSelectionRow(val, id, opt) {
            const { value, label = value } = opt;
            const selected = this.selected.has(String(value));
            const focus = value === this.focusOption ? "true" : undefined;
            return m(".ui-widgets-option.cursor-default", {
                id: `${id}-${value}`,
                class: joinClasses([
                    theme.checkListOption,
                    selected ? theme.checkListOptionSingleSelected : null
                ]),
                role: "option",
                ariaSelected: selected,
                "aria-activedescendant": focus,
                onclick: (evt) => {
                    evt.stopPropagation();
                    this.toggleSelection(String(value), val);
                }
            }, m("span", {
                class: theme.checkListOptionLabel
            }, label));
        }
        multiSelectionRow(val, id, opt, config) {
            const { value, label = value } = opt;
            const selected = this.selected.has(String(value));
            const icon = selected
                ? getConfig(this.onIcon, config)
                : getConfig(this.offIcon, config);
            const focus = value === this.focusOption ? "true" : undefined;
            return m(".ui-widgets-option.cursor-default", {
                id: `${id}-${value}`,
                class: joinClasses([
                    theme.checkListOption,
                    selected ? theme.checkListOptionMultiSelected : null
                ]),
                role: "option",
                ariaSelected: selected,
                "aria-activedescendant": focus,
                onclick: (evt) => {
                    evt.stopPropagation();
                    this.toggleSelection(String(value), val, true);
                }
            }, [
                getIcon(icon, theme.checkListOptionIcon),
                m("span", {
                    class: theme.checkListOptionLabel
                }, label)
            ]);
        }
    }

    class CheckboxGroup extends BaseWidget {
        constructor() {
            super(...arguments);
            this.onIcon = "checkIcn";
            this.offIcon = "uncheckIcn";
            this.opts = [];
            this.selected = new Set();
            this.open = false;
            this.openTs = 0;
            this._focusOption = null;
            this.keySearch = "";
        }
        get focusOption() {
            return this._focusOption;
        }
        set focusOption(value) {
            this.open = value != null;
            this._focusOption = value;
            if (!this.open) {
                this.applyFilter("");
            }
        }
        toggleOpen() {
            const ts = Date.now();
            if (ts - this.openTs > 333) {
                this.open = !this.open;
                this.openTs = ts;
            }
        }
        toggleSelection(option, value, multiple) {
            if (!multiple) {
                this.selected.clear();
                this.focusOption = null;
            }
            if (this.selected.has(option)) {
                this.selected.delete(option);
            }
            else {
                this.selected.add(option);
            }
            value(Array.from(this.selected).join(","));
        }
        moveFocus(delta) {
            const options = this.list.filteredData;
            const idx = lodash.findIndex(options, ({ value }) => value === this.focusOption);
            const clampIdx = lodash.clamp(idx + delta, 0, options.length - 1);
            this.focusOption = options[clampIdx].value;
        }
        applyFilter(search) {
            this.keySearch = search;
            this.list.applyFilter();
        }
        keyNav(evt, value, multiple) {
            // Don't handle any key presses with modifiers
            if (evt.altKey || evt.ctrlKey || evt.metaKey) {
                return;
            }
            switch (evt.key) {
                // Navigate
                case "ArrowDown": {
                    evt.preventDefault();
                    this.moveFocus(1);
                    break;
                }
                case "ArrowUp": {
                    evt.preventDefault();
                    this.moveFocus(-1);
                    break;
                }
                // Toggle
                case " ":
                case "Enter": {
                    evt.preventDefault();
                    if (this.focusOption != null) {
                        this.toggleSelection(String(this.focusOption), value, multiple);
                    }
                    else {
                        this.toggleOpen();
                    }
                    break;
                }
                // Close
                case "Escape": {
                    evt.preventDefault();
                    this.focusOption = null;
                    break;
                }
                // Clear search
                case "Delete": {
                    evt.preventDefault();
                    this.applyFilter("");
                    break;
                }
                case "Backspace": {
                    evt.preventDefault();
                    this.applyFilter(this.keySearch.slice(0, -1));
                    break;
                }
                // Search
                default:
                    if (evt.key.length === 1) {
                        evt.preventDefault();
                        this.applyFilter(this.keySearch + evt.key.toLowerCase());
                    }
            }
        }
        // Placeholder, single selection, or count of selected
        placeHolder(value, options, placeholder) {
            var _a, _b;
            if (this.selected.size > 1) {
                return `${this.selected.size} Selected`;
            }
            else if (this.selected.size === 1) {
                const matchVal = value();
                return (_b = (_a = lodash.find(options, (opt) => String(opt.value) === matchVal)) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : placeholder;
            }
            else {
                return placeholder;
            }
        }
        /** Sync selection set with value stream */
        syncSelection(value) {
            if (value() != null) {
                const valStr = String(value());
                const values = valStr === "" ? [] : valStr.split(",");
                const selected = new Set(values);
                if (!lodash.isEqual(this.selected, selected)) {
                    this.selected = selected;
                }
            }
        }
        oninit({ attrs: { field: { groups = [] }, value } }) {
            this.opts = lodash.flatMap(groups, ({ group, options = [] }) => [
                { value: group, label: group, isGroup: true },
                ...options
            ]);
            console.log('1111', this.opts);
            this.list = ListController.single(() => Promise.resolve(this.opts));
            this.list.setFilter((options) => options.filter(({ value, label = value }) => String(label)
                .toLowerCase()
                .includes(this.keySearch)));
            this.syncSelection(value);
        }
        onbeforeupdate({ attrs: { field: { groups = [] }, value } }) {
            const options = lodash.flatMap(groups, ({ group, options = [] }) => [
                { value: group, label: group, isGroup: true },
                ...options
            ]);
            this.syncSelection(value);
            // React to changes in options list length
            if (options.length !== this.opts.length) {
                this.opts = options;
                this.list.reload();
            }
        }
        view({ attrs }) {
            const { field, value: val } = attrs;
            const { label: lbl, id, name = id, title = lbl, required, readonly, disabled, multiple, uiClass = {}, placeholder = "Select", config } = field;
            const active = !(disabled || readonly);
            return m(LayoutFixed, {
                field,
                value: val,
                invalid: this.invalid,
                focus: this.inFocus
            }, [
                // Hidden input
                m("input.clip[type=text]", {
                    name, value: val(),
                    required,
                    tabindex: -1,
                    ariaHidden: "true"
                }),
                // Select "input"
                m(".relative.cursor-default", {
                    id, title,
                    disabled: !active,
                    tabindex: active ? 0 : -1,
                    role: "listbox",
                    class: inputCls(uiClass),
                    onclick: () => active ? this.toggleOpen() : undefined,
                    onfocusin: () => active ? this.toggleOpen() : undefined,
                    onfocusout: () => this.focusOption = null,
                    "aria-activedescendant": `${id}-${this.focusOption}`,
                    onkeydown: active
                        ? (evt) => this.keyNav(evt, val, multiple)
                        : undefined
                }, [
                    m(".flex.items-center", [
                        m(".flex-auto.ph-2px.pv-1px", this.keySearch
                            // Search term
                            ? m("span", this.keySearch)
                            // Selected option(s) or placeholder text
                            : m("span", {
                                class: this.selected.size ? undefined : theme.floatLabelPlaceholder
                                // TODO fix placeholder
                            }, this.placeHolder(val, [], placeholder))),
                        getIcon(getConfig("checkListIcn", config), joinClasses([
                            "ph-2px pv-1px transition-transform",
                            this.open ? "rotate-180" : null
                        ]))
                    ]),
                    this.open && m((List), {
                        controller: this.list,
                        classes: joinClasses([
                            "absolute z-max us-none",
                            theme.checkListOptionsWrapper,
                            getConfig("checkListDropUp", config) ? "bottom-0" : "mt3"
                        ]),
                        component: { view: ({ attrs }) => this.multiSelectionRow(val, id, attrs) }
                    })
                ])
            ]);
        }
        // private singleSelectionRow(val: TPropStream, id: string, opt: IOption) {
        // 	const { value, label = value } = opt;
        // 	const selected = this.selected.has(String(value));
        // 	const focus = value === this.focusOption ? "true" : undefined;
        // 	return m(".ui-widgets-option.cursor-default", {
        // 		id: `${id}-${value}`,
        // 		class: joinClasses([
        // 			theme.checkListOption,
        // 			selected ? theme.checkListOptionSingleSelected : null
        // 		]),
        // 		role: "option",
        // 		ariaSelected: selected,
        // 		"aria-activedescendant": focus,
        // 		onclick: (evt: MouseEvent) => {
        // 			evt.stopPropagation();
        // 			this.toggleSelection(String(value), val);
        // 		}
        // 	},
        // 		m("span", {
        // 			class: theme.checkListOptionLabel
        // 		}, label)
        // 	);
        // }
        // private groupSelectionRow(val: TPropStream, id: string, opt: IOption) {
        // 	return m('div', [
        // 		m('div', options.map((opt) => this.singleSelectionRow(val, id, opt)))
        // 	]);
        // }
        multiSelectionRow(val, id, opt, config) {
            const { value, label = value, isGroup = false } = opt;
            const selected = this.selected.has(String(value));
            const icon = selected
                ? getConfig(this.onIcon, config)
                : getConfig(this.offIcon, config);
            const focus = value === this.focusOption ? "true" : undefined;
            return m(".ui-widgets-option.cursor-default", {
                id: `${id}-${value}`,
                class: joinClasses([
                    theme.checkListOption,
                    selected ? theme.checkListOptionMultiSelected : null,
                    !isGroup && "ml4"
                ]),
                role: "option",
                ariaSelected: selected,
                "aria-activedescendant": focus,
                onclick: (evt) => {
                    evt.stopPropagation();
                    this.toggleSelection(String(value), val, true);
                }
            }, [
                getIcon(icon, theme.checkListOptionIcon),
                m("span", {
                    class: theme.checkListOptionLabel
                }, label)
            ]);
        }
    }

    class FileSelect {
        constructor() {
            this.dragging = stream(false);
        }
        view({ attrs: { field, value, displayType } }) {
            const file = lodash.head(value());
            const { disabled, uiClass = {}, config, readonly } = field;
            const innerText = displayType === "none" /* DisplayType.none */ || !file
                ? getConfig("addFileTxt", config)
                : file.name;
            return m("div", {
                class: wrapperCls(uiClass, disabled)
            }, m(FileInput, {
                field,
                multiple: false,
                dragging: this.dragging,
                onSet: addFiles(value, true),
                value
            }, m(".flex.items-center.pa1", {
                class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
            }, [
                getIcon(getConfig("uploadIcn", config), "pa1"),
                m("span.ma1.flex-auto", innerText),
                file && displayType !== "none" /* DisplayType.none */ ? [
                    m(FileOpen, file),
                    !(readonly || disabled) && m("i.pa1.pointer.dim", {
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
            const { disabled, uiClass = {}, config, readonly } = field;
            return m("div", {
                class: wrapperCls(uiClass, disabled)
            }, [
                m(FileInput, {
                    field,
                    defaultAccept: "image/*",
                    dragging: this.dragging,
                    onSet: addImages(value, getConfig("imageMaxSize", config)),
                    value
                }, m(".w-100.pa1.dt.tc", {
                    class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
                }, m("i.fa-2x.dtc.v-mid", {
                    class: getConfig("cameraIcn", config)
                }))),
                m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1.max-h-thumb", lodash.map(value(), (file) => m(Thumbnail, {
                    src: imgSrc(file.path, file.dataUrl)
                }, !(readonly || disabled) && m(".absolute.top-0.right-0.child", m(Button, {
                    title: `Remove ${file.name}`,
                    icon: getConfig("deleteIcn", config),
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
            const { disabled, uiClass = {}, config, readonly } = field;
            return m("div", {
                class: wrapperCls(uiClass, disabled)
            }, m(FileInput, {
                field,
                defaultAccept: "image/*",
                multiple: false,
                dragging: this.dragging,
                onSet: addImages(value, getConfig("imageMaxSize", config), true),
                value
            }, m(".pa1", {
                class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
            }, m(".relative.w-100.dt.tc", file ? [
                m("img.img.contain.max-h-img", {
                    title: file.name,
                    src: imgSrc(file.path, file.dataUrl)
                }),
                !(readonly || disabled) && m(".absolute.top-0.right-0.pa1.pointer.dim", {
                    title: `Remove ${file.name}`,
                    onclick: removeFile(value, file.guid)
                }, m("i.pa1", {
                    class: getConfig("cancelIcn", config)
                }))
            ] : m("i.fa-2x.dtc.v-mid", {
                class: getConfig("cameraIcn", config)
            })))));
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
        view({ attrs: { style, config, onSet, onCancel } }) {
            return [
                m(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30", { style }, m("canvas.aspect-ratio--object")),
                m(".absolute.top-0.right-0.z-999.translate-up-100", [
                    m(Button, {
                        title: getConfig("applyTtl", config),
                        icon: getConfig("applyIcn", config),
                        classes: "ma1",
                        onclick: () => {
                            if (!this.signaturePad.isEmpty()) {
                                onSet(this.signaturePad.toDataURL("image/png"));
                            }
                        }
                    }),
                    m(Button, {
                        title: getConfig("resetTtl", config),
                        icon: getConfig("resetIcn", config),
                        classes: "ma1",
                        onclick: () => this.resetCanvas()
                    }),
                    m(Button, {
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
        view({ attrs: { heightPct, style, config, onSet, onCancel } }) {
            const setText = lodash.flow([
                // Create stamp base64 string
                lodash.partial(createStamp, this.text(), heightPct, config),
                // Submit stamp and metadata to onSet
                lodash.partialRight(onSet, { text: this.text(), heightPct }),
                // Prevent form submit page navigating page
                lodash.stubFalse
            ]);
            return [
                m("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30", {
                    style,
                    onsubmit: setText
                }, m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
                    oninput: setValue(this.text),
                    style: {
                        fontFamily: getConfig("signFont", config)
                    },
                    value: this.text()
                })),
                m(".absolute.top-0.right-0.z-999.translate-up-100", [
                    m(Button, {
                        title: getConfig("applyTtl", config),
                        icon: getConfig("applyIcn", config),
                        classes: "ma1",
                        onclick: setText
                    }),
                    m(Button, {
                        title: getConfig("resetTtl", config),
                        icon: getConfig("resetIcn", config),
                        classes: "ma1",
                        onclick: () => this.text("")
                    }),
                    m(Button, {
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
                m("span.clip", {
                    style: {
                        fontFamily: getConfig("signFont", config)
                    }
                }, stampSetTxt),
                m(".flex", m(Button, {
                    label: stampTxt,
                    classes: `flex-auto ${getConfig("stampBtnClass", config)}`,
                    context: getConfig("stampBtnContext", config),
                    // onclick: applyStamp(heightPct, stampSetTxt, onSet)
                    onclick: lodash.flow([
                        // Create stamp base64 string
                        lodash.partial(createStamp, stampSetTxt, heightPct, config),
                        // Submit stamp and metadata to onSet
                        lodash.partialRight(onSet, { text: stampSetTxt, heightPct })
                    ])
                }))
            ];
        }
    }

    // Map SignTypes enum values to widgets
    const componentMap = {
        ["draw" /* SignTypes.Draw */]: SignDraw,
        ["type" /* SignTypes.Type */]: SignType,
        ["stamp" /* SignTypes.Stamp */]: SignStamp
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
            const { label: lbl, id, readonly, disabled, tabindex = "0", uiClass = {}, config, options, heightPct = getConfig("signHeightPct", config), stampTxt = getConfig("stampTxt", config), stampSetTxt = getConfig("stampSetTxt", config) } = field;
            const style = {
                paddingBottom: `${heightPct}%`
            };
            const fileObj = lodash.head(value());
            const signTypes = options
                // Legacy support for signature types in options list
                ? lodash(options)
                    .map(({ value }) => String(value) in componentMap ? value : null)
                    .compact()
                    .value()
                : getConfig("signOpts", config);
            // Convert options into widget descriptions
            const opts = lodash.map(signTypes, (type) => {
                switch (type) {
                    case "draw" /* SignTypes.Draw */: return {
                        type,
                        icon: getConfig("drawIcn", config),
                        label: getConfig("signDrawTxt", config)
                    };
                    case "type" /* SignTypes.Type */: return {
                        type,
                        icon: getConfig("typeIcn", config),
                        label: getConfig("signTypeTxt", config)
                    };
                    case "stamp" /* SignTypes.Stamp */: return {
                        type,
                        icon: getConfig("stampIcn", config),
                        label: getConfig("signStampTxt", config)
                    };
                }
            });
            // Auto-select widget if there is only one option and no file
            if (opts.length === 1 && !fileObj) {
                this.setSignType(opts[0].type);
            }
            return m("div.relative", {
                class: wrapperCls(uiClass, disabled)
            }, [
                getLabel(id, uiClass, lbl),
                readonly || disabled
                    // Display component in "readonly" mode
                    ? m(".aspect-ratio", {
                        id,
                        style
                    }, 
                    // Current signature
                    fileObj ? m(".aspect-ratio--object", {
                        class: "pe-none"
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
                            config,
                            onSet: setFile(value, id, getConfig("signMaxSize", config)),
                            onCancel: lodash.bind(this.setSignType, this, undefined)
                        })
                        // Display signature preview/creator
                        : m(".aspect-ratio.pointer", {
                            id,
                            class: theme.fileInputWrapper,
                            style
                        }, fileObj
                            // Current signature
                            ? m(".aspect-ratio--object.dim", {
                                onclick: lodash.bind(value, this, [])
                            }, [
                                m("img.img.w-100.absolute", {
                                    src: imgSrc(fileObj.path, fileObj.dataUrl)
                                }),
                                // Remove signature button
                                m(".absolute.top-1.right-1", m("i.fa-2x", {
                                    class: getConfig("resetIcn", config),
                                    tabindex: 0,
                                    onkeydown: clickOnEnter
                                }))
                            ])
                            // Signature creation options
                            : m(".aspect-ratio--object.flex", lodash.map(opts, ({ type, icon, label }) => m(".flex-auto.flex.items-center.justify-center.dim", {
                                title: label,
                                tabindex,
                                onkeydown: clickOnEnter,
                                onclick: lodash.bind(this.setSignType, this, type)
                            }, getIcon(icon, "fa-2x ma1"), m("span.ma1.dn.db-ns.truncate", label)))))
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
        view({ attrs }) {
            const { field, value } = attrs;
            const { disabled, uiClass = {} } = field;
            return m("div", {
                class: wrapperCls(uiClass, disabled)
            }, m(FileInput, {
                field,
                value,
                multiple: false,
                dragging: this.dragging,
                onSet: addOmniFiles(value, true),
            }, m(".flex.items-center.pa1", {
                class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
            }, this.innerComponent(attrs))));
        }
        innerComponent({ field: { disabled, config, readonly }, value }) {
            const file = lodash.head(value());
            if (file) {
                if (file.dataUrl) {
                    // Image preview
                    return m(".relative.w-100.dt.tc", m("img.img.contain.max-h-img", {
                        title: file.name,
                        src: imgSrc(file.path, file.dataUrl)
                    }), !(readonly || disabled) && m(".absolute.top-0.right-0.pa1.pointer.dim", {
                        title: `Remove ${file.name}`,
                        onclick: removeFile(value, file.guid)
                    }, m("i.pa1", {
                        class: getConfig("cancelIcn", config)
                    })));
                }
                else {
                    // Non-image details
                    return [
                        m(FileOpen, file),
                        m("span.ma1.flex-auto", {
                            title: file.name,
                        }, file.name),
                        !(readonly || disabled) && m("i.pa1.pointer.dim", {
                            title: `Remove ${file.name}`,
                            class: getConfig("cancelIcn", config),
                            onclick: removeFile(value, file.guid),
                            onkeydown: clickOnEnter,
                            tabindex: 0
                        })
                    ];
                }
            }
            else {
                // File upload
                return [
                    getIcon(getConfig("uploadIcn", config), "pa1"),
                    m("span.ma1", getConfig("addFileTxt", config))
                ];
            }
        }
    }

    class MultiOmniFileInput {
        constructor() {
            this.dragging = stream(false);
        }
        view({ attrs: { field, value, displayType, showDisplay = true } }) {
            const { disabled, uiClass = {}, config, readonly } = field;
            return m("div", {
                class: wrapperCls(uiClass, disabled)
            }, [
                m(FileInput, {
                    field,
                    value,
                    dragging: this.dragging,
                    onSet: addOmniFiles(value, false),
                }, m(".flex.items-center.pa1.dt", {
                    class: fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))
                }, [
                    getIcon(getConfig("uploadIcn", config), "pa1"),
                    m("span.ma1.flex-auto", getConfig("addFileTxt", config))
                ])),
                showDisplay ? m(DisplayTypeComponent, {
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
            this.dragging = stream(false);
        }
        view({ attrs: { field, value } }) {
            const { id, required, uiClass = {}, config, label = { text: "Add File", icon: getConfig("uploadIcn", config) }, } = field;
            return [
                getLabel(id, uiClass, label, required),
                m("div", {
                    class: `${fileInputWrapperCls(uiClass, this.dragging(), fileInvalid(field, value()))} ${getButtonContext()} ${theme.button}`,
                }, m(FileButtonInput, {
                    field,
                    multiple: false,
                    dragging: this.dragging,
                    onSet: addFiles(value, true),
                    value
                }, m(".flex.items-center", (typeof label === 'string')
                    ? labelIcon({
                        text: label,
                        icon: getConfig("uploadIcn", config)
                    })
                    : labelIcon(label))))
            ];
        }
    }

    class PageController extends ListController {
        constructor() {
            super(...arguments);
            this.pageStride = PageController.PAGE_STRIDE;
            /** Zero-indexed page number */
            this.page = 0;
        }
        static single(load) {
            const ctrl = new PageController(() => load().then((rowData) => {
                ctrl.updateDataStore(rowData);
                // Sort and filter immediately
                ctrl.applySort();
                m.redraw();
            }));
            return ctrl;
        }
        /** Factory for a ListController that loads data in pages */
        static paging(load) {
            const loadSize = ListController.BLOCK_SIZE * 4;
            const ctrl = new PageController((offset) => load(offset, loadSize + 1).then((rowData) => {
                if (rowData.length > loadSize) {
                    ctrl.updateDataStore(rowData.slice(0, loadSize), true);
                }
                else {
                    ctrl.updateDataStore(rowData);
                }
                m.redraw();
            }));
            return ctrl;
        }
        /** Update the number of "blocks" to render in a single page */
        set blockStride(value) {
            this.pageStride = value;
            this.updatePage(0);
        }
        /** Zero-indexed page update */
        updatePage(page) {
            // Clamp page and start block from page
            this.page = ListController.clampRange(0, page, this.lastPage);
            this.startBlock = this.page * this.pageStride;
            // Could consider clamping end block, but it's not necessary
            this.endBlock = this.startBlock + this.pageStride;
            this.ensureBlockStore();
            m.redraw();
        }
        /** 1-indexed page number */
        get currentPage() {
            return this.page + 1;
        }
        /** Number of pages to fit loaded list items */
        get lastPage() {
            return Math.ceil(this.availableBlocks / this.pageStride);
        }
        get canPageForward() {
            return !this.loading && this.currentPage < this.lastPage;
        }
        get canPageBackward() {
            return !this.loading && this.page > 0;
        }
        get rowsPerPage() {
            return this.pageStride * ListController.BLOCK_SIZE;
        }
        /** Set page */
        setPage(page) {
            this.updatePage(page - 1);
        }
        /** Change page relative to current page */
        pageRelative(offset) {
            this.updatePage(this.page + offset);
        }
        render(callback) {
            return this.blockStore.slice(this.startBlock, this.endBlock).map((items, idx) => callback({
                items,
                idx,
                visible: true
            }));
        }
        debug() {
            return Object.assign(Object.assign({}, super.debug()), { blockStride: this.pageStride, page: this.page });
        }
        /** Initialise page & ensure page range is available in blockStore */
        updateBlockRange() {
            if (this.startBlock === -1) {
                this.updatePage(0);
            }
            if (this.endBlock >= this.blockStore.length) {
                this.ensureBlockStore();
            }
        }
    }
    /** Default size of a "page" in "blocks" */
    PageController.PAGE_STRIDE = 4;

    exports.Badge = Badge;
    exports.BaseInput = BaseInput;
    exports.BaseText = BaseText;
    exports.Button = Button;
    exports.ButtonLink = ButtonLink;
    exports.CardDateInput = CardDateInput;
    exports.CheckList = CheckList;
    exports.Checkbox = Checkbox;
    exports.CheckboxGroup = CheckboxGroup;
    exports.CheckboxInput = CheckboxInput;
    exports.Currency = Currency;
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
    exports.List = List;
    exports.ListController = ListController;
    exports.MultiOmniFileInput = MultiOmniFileInput;
    exports.NavButton = NavButton;
    exports.NavLink = NavLink;
    exports.OmniFileInput = OmniFileInput;
    exports.PageController = PageController;
    exports.PasswordInput = PasswordInput;
    exports.PasswordStrength = PasswordStrength;
    exports.PercentageInput = PercentageInput;
    exports.RadioInput = RadioInput;
    exports.SelectInput = SelectInput;
    exports.SelectText = SelectText;
    exports.SignBuilder = SignBuilder;
    exports.TextareaInput = TextareaInput;
    exports.TimeInput = TimeInput;
    exports.Toggle = Toggle;
    exports.ToggleInput = ToggleInput;
    exports.Tooltip = Tooltip;
    exports.Trusted = Trusted;
    exports.createStamp = createStamp;
    exports.currencyStrToNumber = currencyStrToNumber;
    exports.dataURItoBlob = dataURItoBlob;
    exports.dataUrlToFile = dataUrlToFile;
    exports.fileConstructor = fileConstructor;
    exports.fileNameExtSplit = fileNameExtSplit;
    exports.formatCurrency = formatCurrency;
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
    exports.registerFunction = registerFunction;
    exports.resizeImage = resizeImage;
    exports.scaleDataUrl = scaleDataUrl;
    exports.scaleRect = scaleRect;
    exports.textToImage = textToImage;
    exports.theme = theme;
    exports.updateButtonContext = updateButtonContext;
    exports.updateClasses = updateClasses;
    exports.updateConfig = updateConfig;

}));
