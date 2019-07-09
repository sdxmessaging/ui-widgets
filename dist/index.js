import lodash from 'lodash';
import m from 'mithril';
import stream from 'mithril/stream';
import SignaturePad from 'signature_pad';

var inputBorder = "border-box bn";
var inputText = "fw2 dark-gray";
var pxRatio = Math.max(window.devicePixelRatio || 1, 1);
// Used by display widgets
// TODO Consolidate with getLabel
function getDisplayLabel(_a, className) {
    var label = _a.label;
    return m("span.mr2.silver.truncate", {
        title: label,
        class: className
    }, label);
}
function getLabel(_a) {
    var id = _a.id, label = _a.label, required = _a.required;
    return m("label.mb1.silver", {
        title: label,
        for: id
    }, getLabelText(label, required));
}
function getLabelText(label, required) {
    return required ? label + "*" : label;
}
function imgSrc(path, dataUrl) {
    return dataUrl ? dataUrl : path;
}
function guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        // tslint:disable-next-line
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function pickByProperty(list, prop) {
    return lodash.find(list, lodash.matches(prop));
}
/**
 * Mutates input list, returns array of removed items
 */
function removeByProperty(list, prop) {
    return lodash.remove(list, lodash.matches(prop));
}
/**
 * Split given file name from extension
 */
function fileNameExtSplit(fileName) {
    var extIdx = fileName.lastIndexOf(".");
    return [fileName.substr(0, extIdx), fileName.substr(extIdx)];
}
function dataURItoBlob(dataURI) {
    var dataUriList = dataURI.split(",");
    var bytes = dataUriList[0].indexOf("base64") >= 0 ?
        atob(dataUriList[1]) :
        unescape(dataUriList[1]);
    var mimeType = dataUriList[0].split(":")[1].split(";")[0];
    var bytesTotal = bytes.length;
    var byteArray = new Uint8Array(bytesTotal);
    for (var idx = 0; idx < bytesTotal; idx++) {
        byteArray[idx] = bytes.charCodeAt(idx);
    }
    return new Blob([byteArray], { type: mimeType });
}
/**
 * Scale given width and height values if either exceed the giving limit
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
function resizeImage(file, maxSize, type) {
    return new Promise(function (resolve, reject) {
        if (!file.type.match(/image.*/)) {
            reject(new Error("File most be an image"));
            return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (!(evt && evt.target)) {
                return;
            }
            var result = evt.target.result;
            var image = new Image();
            image.onload = function () {
                var canvas = document.createElement("canvas");
                var _a = scaleRect(image.width, image.height, maxSize), width = _a[0], height = _a[1];
                var orientation = getOrientation(result);
                // Orientations after 4 are rotated 90 degrees
                if (orientation > 4) {
                    canvas.width = height;
                    canvas.height = width;
                }
                else {
                    canvas.width = width;
                    canvas.height = height;
                }
                var context = canvas.getContext("2d");
                if (context) {
                    rotateContext(context, width, height, orientation);
                    context.drawImage(image, 0, 0, width, height);
                }
                resolve(canvas.toDataURL(type));
            };
            var imageBlob = new Blob([result]);
            image.src = window.URL.createObjectURL(imageBlob);
        };
        reader.readAsArrayBuffer(file);
    });
}
function getOrientation(buffer) {
    // Image exif data in first 64k of file
    var viewLen = Math.min(buffer.byteLength, 64 * 1024);
    var view = new DataView(buffer, 0, viewLen);
    if (view.getUint16(0, false) !== 0xFFD8) {
        return -2;
    }
    var length = view.byteLength;
    var offset = 2;
    while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
            if (view.getUint32(offset += 2, false) !== 0x45786966) {
                return -1;
            }
            var little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            var tags = view.getUint16(offset, little);
            offset += 2;
            for (var i = 0; i < tags; i++) {
                if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                    return view.getUint16(offset + (i * 12) + 8, little);
                }
            }
            // tslint:disable-next-line:no-bitwise
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

var Button = /** @class */ (function () {
    function Button() {
    }
    Button.prototype.view = function (_a) {
        var _b = _a.attrs, label = _b.label, _c = _b.type, type = _c === void 0 ? "button" : _c, icon = _b.icon, classes = _b.classes, disabled = _b.disabled, style = _b.style, onclick = _b.onclick;
        return m("button.button-reset.pa2.bn.br2" + b.bgBranding.brandingAlt, {
            type: type,
            class: "" + (disabled ? "o-60 " : "") + classes,
            disabled: disabled,
            style: style,
            onclick: onclick,
        }, icon ? m("i.fal.fa-fw.mr2", {
            class: icon
        }) : null, label);
    };
    return Button;
}());

var Trusted = /** @class */ (function () {
    function Trusted() {
    }
    Trusted.prototype.view = function (_a) {
        var _b = _a.attrs, _c = _b.field, classes = _c.classes, style = _c.style, value = _b.value;
        return m(".pa2", {
            class: classes,
            style: style
        }, m.trust(value()));
    };
    return Trusted;
}());

var BaseText = /** @class */ (function () {
    function BaseText() {
    }
    BaseText.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var classes = field.classes, style = field.style;
        return m(".pa2.flex.flex-wrap.bb.b--black-20", {
            class: classes,
            style: style
        }, [
            getDisplayLabel(field),
            m("span.ws-normal", {
                title: value()
            }, value())
        ]);
    };
    return BaseText;
}());

function linkAttrs(fieldType, value) {
    if (fieldType === "email") {
        return {
            href: "mailto:" + value
        };
    }
    else if (fieldType === "tel") {
        return {
            href: "tel:" + value
        };
    }
    else {
        // Assume standard urls
        return {
            href: value,
            target: "_blank"
        };
    }
}
var iconMap = {
    email: "fa-envelope",
    tel: "fa-phone"
};
var Link = /** @class */ (function () {
    function Link() {
    }
    Link.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var classes = field.classes, style = field.style;
        return m(".pa2.flex.flex-wrap.bb.b--black-20", {
            class: classes,
            style: style
        }, [
            getDisplayLabel(field),
            value ?
                m("a.link.dark-gray.dim.pointer.ws-normal", linkAttrs(field.type, value()), m("i.fal.mr2", {
                    class: iconMap[field.type]
                }), value())
                : null
        ]);
    };
    return Link;
}());

var Checkbox = /** @class */ (function () {
    function Checkbox() {
    }
    Checkbox.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var classes = field.classes, style = field.style;
        return m(".pa2.flex.flex-wrap.bb.b--black-20", {
            class: classes,
            style: style
        }, [
            getDisplayLabel(field),
            m("i.fal.self-end", {
                class: value() ? "fa-check" : "fa-times"
            })
        ]);
    };
    return Checkbox;
}());

var SelectText = /** @class */ (function () {
    function SelectText() {
    }
    SelectText.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var classes = field.classes, style = field.style;
        // Get label for selected options (falling back to the value)
        var option = pickByProperty(field.options, { value: value() });
        var label = option ? option.label : value();
        return m(".pa2.flex.flex-wrap.bb.b--black-20", {
            class: classes,
            style: style
        }, [
            getDisplayLabel(field),
            m("span.ws-normal", {
                title: label
            }, label)
        ]);
    };
    return SelectText;
}());

var FileList = /** @class */ (function () {
    function FileList() {
    }
    FileList.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var classes = field.classes, style = field.style;
        return m(".pa2.flex.flex-column.bb.b--black-20", {
            class: classes,
            style: style
        }, [
            getDisplayLabel(field, "mb1"),
            m(".flex.flex-column.mt1.nb1", lodash.map(value(), function (_a) {
                var name = _a.name, path = _a.path;
                return m("a.pa2.mv1.link.ba.b--black-20.dark-gray.dim.pointer[target=_blank]", {
                    href: path
                }, [
                    m("i.fal.fa-file-download.mr2"),
                    name
                ]);
            }))
        ]);
    };
    return FileList;
}());

var Thumbnail = /** @class */ (function () {
    function Thumbnail() {
    }
    Thumbnail.prototype.view = function (_a) {
        var children = _a.children, attrs = _a.attrs;
        return m(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child", [
            m("img.contain", attrs),
            children
        ]);
    };
    return Thumbnail;
}());

var ImageList = /** @class */ (function () {
    function ImageList() {
    }
    ImageList.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var classes = field.classes, style = field.style;
        return m(".pa2.flex.flex-column.bb.b--black-20", {
            class: classes,
            style: style
        }, [
            getDisplayLabel(field, "mb2"),
            m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1", lodash.map(value(), function (_a) {
                var name = _a.name, path = _a.path;
                return m(Thumbnail, {
                    title: name,
                    src: path,
                    style: { "max-height": "6rem" }
                });
            }))
        ]);
    };
    return ImageList;
}());

var ImagePreview = /** @class */ (function () {
    function ImagePreview() {
    }
    ImagePreview.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var classes = field.classes, style = field.style;
        var file = lodash.head(value());
        return m(".pa2.flex.flex-column.bb.b--black-20", {
            class: classes,
            style: style
        }, [
            getDisplayLabel(field, "mb1"),
            file ? m("img.img.contain.self-center" + b.imgHeight, {
                title: file.name,
                src: file.path
            }) : m("i.fal.fa-image")
        ]);
    };
    return ImagePreview;
}());

var Label = /** @class */ (function () {
    function Label() {
    }
    Label.prototype.view = function (_a) {
        var _b = _a.attrs.field, label = _b.label, required = _b.required;
        return m("label.mb2", getLabelText(label, required));
    };
    return Label;
}());

var BaseInput = /** @class */ (function () {
    function BaseInput() {
    }
    BaseInput.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, val = _b.value;
        var id = field.id, type = field.type, placeholder = field.placeholder, containerClass = field.containerClass, _c = field.classes, classes = _c === void 0 ? "" : _c, required = field.required, disabled = field.disabled;
        return [
            getLabel(field),
            m(".w-100", {
                class: containerClass
            }, m("input.input-reset.w-100.pa2" + b.inputHeight, {
                id: id,
                name: id,
                value: val(),
                class: "" + (disabled ? "o-60 " : "") + classes + " " + inputBorder + " " + inputText,
                type: type,
                placeholder: placeholder,
                required: required,
                disabled: disabled,
                // Update value on type
                onchange: function (_a) {
                    var value = _a.target.value;
                    return val(value);
                }
            }))
        ];
    };
    return BaseInput;
}());

var TextareaInput = /** @class */ (function () {
    function TextareaInput() {
    }
    TextareaInput.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, val = _b.value;
        var id = field.id, placeholder = field.placeholder, classes = field.classes, containerClass = field.containerClass, required = field.required, disabled = field.disabled;
        return [
            getLabel(field),
            m("div", {
                class: containerClass
            }, m("textarea.w-100.pa2[rows=3]", {
                id: id,
                name: id,
                value: val(),
                class: "" + (disabled ? "o-60 " : "") + classes + " " + inputBorder + " " + inputText,
                placeholder: placeholder,
                style: { resize: "vertical" },
                required: required,
                disabled: disabled,
                // Update value on type
                onchange: function (_a) {
                    var value = _a.target.value;
                    return val(value);
                }
            }))
        ];
    };
    return TextareaInput;
}());

var CheckboxInput = /** @class */ (function () {
    function CheckboxInput() {
    }
    CheckboxInput.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, value = _b.value;
        var id = field.id, label = field.label, classes = field.classes, containerClass = field.containerClass, required = field.required, disabled = field.disabled;
        return m("div.pa2", {
            class: containerClass
        }, m(".flex.flex-wrap", {
            class: inputText,
        }, m("label.flex.items-center.dark-gray", {
            class: "" + (disabled ? "o-60 " : "") + classes
        }, m("input.mr1[type=checkbox]", {
            id: id,
            name: id,
            checked: value(),
            required: required,
            disabled: disabled,
            // Update value on check
            onchange: function (_a) {
                var checked = _a.target.checked;
                return value(checked);
            },
        }), getLabelText(label, required))));
    };
    return CheckboxInput;
}());

var RadioInput = /** @class */ (function () {
    function RadioInput() {
    }
    RadioInput.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, val = _b.value;
        var radioField = field;
        var id = radioField.id, options = radioField.options, classes = radioField.classes, containerClass = radioField.containerClass, disabled = radioField.disabled;
        return [
            getLabel(radioField),
            m("div", {
                class: containerClass
            }, m(".flex.flex-wrap", {
                class: inputText,
                onchange: function (_a) {
                    var value = _a.target.value;
                    return val(value);
                }
            }, lodash.map(options, function (_a) {
                var label = _a.label, value = _a.value;
                return m("label.flex.items-center.ma2", {
                    class: disabled ? "o-60" : "pointer"
                }, m("input.mr1[type=radio]", {
                    name: id,
                    value: value,
                    checked: val() === value,
                    class: classes,
                    disabled: disabled
                }), label);
            })))
        ];
    };
    return RadioInput;
}());

var SelectInput = /** @class */ (function () {
    function SelectInput() {
    }
    SelectInput.prototype.view = function (_a) {
        var _b = _a.attrs, field = _b.field, val = _b.value;
        var _c = field, id = _c.id, options = _c.options, containerClass = _c.containerClass, _d = _c.classes, classes = _d === void 0 ? "" : _d, required = _c.required, disabled = _c.disabled;
        return [
            getLabel(field),
            m("div", {
                class: containerClass
            }, m("select.input-reset.w-100.pa2" + b.inputHeight, {
                id: id,
                name: id,
                value: val(),
                class: "" + (disabled ? "o-60 " : "") + classes + " " + inputBorder + " " + inputText,
                required: required,
                disabled: disabled,
                // Update value on selection
                onchange: function (_a) {
                    var value = _a.target.value;
                    return val(value);
                }
            }, lodash.map(options, function (opt) { return m("option", {
                value: opt.value
            }, opt.label); })))
        ];
    };
    return SelectInput;
}());

var FileMulti = /** @class */ (function () {
    function FileMulti() {
        this.acceptTypes = "*";
        this.multiple = true;
        this.dragging = false;
        this.fileList = stream([]);
    }
    FileMulti.prototype.oninit = function (_a) {
        var value = _a.attrs.value;
        // Provide member function access to value attribute
        this.fileList = value;
    };
    FileMulti.prototype.view = function (_a) {
        var _this = this;
        var field = _a.attrs.field;
        var id = field.id, label = field.label, containerClass = field.containerClass, required = field.required, disabled = field.disabled;
        return m("div", [
            m("label.flex.flex-column", lodash.extend({
                for: id,
                title: label,
                class: (disabled ? "o-60" : "pointer") + " " + containerClass
            }, disabled ? {} : {
                ondragover: function (evt) { return _this.dragStart(evt); },
                ondragleave: function (evt) { return _this.dragStop(evt); },
                ondrop: function (evt) {
                    _this.dragStop(evt);
                    if (evt.dataTransfer) {
                        _this.addFiles(evt.dataTransfer.files);
                    }
                }
            }), [
                m("input.clip", {
                    id: id,
                    name: id,
                    type: "file",
                    multiple: this.multiple,
                    accept: this.acceptTypes,
                    required: required,
                    disabled: disabled,
                    onchange: function (_a) {
                        var files = _a.target.files;
                        _this.addFiles(files);
                    }
                }),
                m("span.mb1.silver", label),
                this.viewUploadWidget(field)
            ]),
            this.viewFileList()
        ]);
    };
    FileMulti.prototype.viewUploadWidget = function (_) {
        return m(".pa2.ba.b--dashed.br2", {
            class: this.dragging ? "b--blue blue" : "b--light-silver dark-gray"
        }, [
            m("i.fal.fa-file-upload.mr2"),
            m("span", "Add file(s)...")
        ]);
    };
    FileMulti.prototype.viewFileList = function () {
        var _this = this;
        return m(".flex.flex-column.mt1.nb1", lodash.map(this.fileList(), function (file) { return m("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer", [
            m("i.fal.fa-file-download.mr2"),
            file.name,
            m("i.fal.fa-file-minus.child.fr", {
                title: "Remove " + file.name,
                onclick: function () { return _this.removeFile(file.guid); }
            })
        ]); }));
    };
    FileMulti.prototype.addFiles = function (fileList) {
        var newFileList = this.fileList();
        lodash.each(fileList, function (file) {
            newFileList.push({
                guid: guid(),
                name: file.name,
                path: "not_set",
                file: file
            });
        });
        this.fileList(newFileList);
    };
    FileMulti.prototype.removeFile = function (fileId) {
        var newFileList = this.fileList();
        removeByProperty(newFileList, { guid: fileId });
        this.fileList(newFileList);
    };
    FileMulti.prototype.dragStart = function (evt) {
        evt.preventDefault();
        if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = "copy";
        }
        // Prevent excessive redraws if dragging state is already set
        if (this.dragging) {
            evt.redraw = false;
        }
        this.dragging = true;
    };
    FileMulti.prototype.dragStop = function (evt) {
        evt.preventDefault();
        this.dragging = false;
    };
    return FileMulti;
}());

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FileSelect = /** @class */ (function (_super) {
    __extends(FileSelect, _super);
    function FileSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.multiple = false;
        return _this;
    }
    FileSelect.prototype.viewUploadWidget = function (_) {
        var fileObj = lodash.head(this.fileList());
        return m(".pa2.ba.b--dashed.br2", {
            class: this.dragging ? "b--blue blue" : "b--light-silver dark-gray"
        }, [
            m("i.fal.fa-file-upload.mr2"),
            m("span", fileObj ? fileObj.name : "Upload...")
        ]);
    };
    FileSelect.prototype.viewFileList = function () {
        return null;
    };
    FileSelect.prototype.addFiles = function (fileList) {
        var file = lodash.head(fileList);
        if (!file) {
            return;
        }
        this.setFile({
            guid: this.getFileId(),
            name: file.name,
            path: "not_set",
            file: file
        });
    };
    // Generate or re-use the set file _id
    FileSelect.prototype.getFileId = function () {
        var fileObj = lodash.head(this.fileList());
        return fileObj ? fileObj.guid : guid();
    };
    // Replace any instance file(s) with a single IDataFile
    FileSelect.prototype.setFile = function (fileObj) {
        this.fileList([fileObj]);
    };
    return FileSelect;
}(FileMulti));

var __extends$1 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ImageMulti = /** @class */ (function (_super) {
    __extends$1(ImageMulti, _super);
    function ImageMulti() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.acceptTypes = "image/*";
        return _this;
    }
    ImageMulti.prototype.viewUploadWidget = function (_a) {
        var _b = _a.classes, classes = _b === void 0 ? "h3" : _b;
        return m(".w-100.pa1.ba.bw1.b--dashed.br3.dt.tc", {
            class: classes + " " + (this.dragging ? "b--blue blue" : "b--light-silver dark-gray")
        }, m("i.fal.fa-camera.fa-2x.dtc.v-mid"));
    };
    ImageMulti.prototype.viewFileList = function () {
        var _this = this;
        return m(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1", lodash.map(this.fileList(), function (file) { return m(Thumbnail, {
            src: imgSrc(file.path, file.dataUrl),
            class: "dim",
            style: { "max-height": "6rem" }
        }, m(".pa2.bg-white.ba.b--light-silver.br2.absolute.top-0.right-0.child.pointer", {
            title: "Remove " + file.name,
            onclick: function () { return _this.removeFile(file.guid); }
        }, m("i.fal.fa-file-minus.fa-lg"))); }));
    };
    ImageMulti.prototype.addFiles = function (fileList) {
        var _this = this;
        var fileType = "image/jpeg";
        var newFileList = this.fileList();
        Promise.all(lodash.map(fileList, function (file) {
            // Limit file dimensions
            return resizeImage(file, ImageMulti.maxImageSize, fileType).then(function (dataURL) {
                // Split original file name from extension
                var fName = fileNameExtSplit(file.name)[0];
                var newFile = new File([dataURItoBlob(dataURL)], fName + ".jpg", {
                    type: fileType
                });
                newFileList.push({
                    guid: guid(),
                    name: newFile.name,
                    path: "not_set",
                    file: newFile,
                    dataUrl: dataURL
                });
            });
        })).then(function () {
            _this.fileList(newFileList);
            m.redraw();
        });
    };
    ImageMulti.maxImageSize = 1280;
    return ImageMulti;
}(FileMulti));

var __extends$2 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ImageSelect = /** @class */ (function (_super) {
    __extends$2(ImageSelect, _super);
    function ImageSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.multiple = false;
        _this.acceptTypes = "image/*";
        return _this;
    }
    ImageSelect.prototype.viewUploadWidget = function (_a) {
        var _b = _a.classes, classes = _b === void 0 ? "h5" : _b;
        var file = lodash.head(this.fileList());
        return m(".w-100.pa1.contain.ba.bw1.b--dashed.br3.dt.tc", {
            class: classes + " " + (this.dragging ? "b--blue blue" : "b--light-silver dark-gray")
        }, file ? m("img.img" + b.imgHeight, {
            src: imgSrc(file.path, file.dataUrl)
        }) : m("i.fal.fa-camera.fa-2x.dtc.v-mid"));
    };
    ImageSelect.prototype.addFiles = function (fileList) {
        var _this = this;
        var file = lodash.head(fileList);
        if (!file) {
            return;
        }
        // Limit file dimensions
        var fileType = "image/jpeg";
        resizeImage(file, ImageSelect.maxImageSize, fileType).then(function (dataURL) {
            // Split original file name from extension
            var fName = fileNameExtSplit(file.name)[0];
            var newFile = new File([dataURItoBlob(dataURL)], fName + ".jpg", {
                type: fileType
            });
            _this.setFile({
                guid: _this.getFileId(),
                name: newFile.name,
                path: "not_set",
                file: newFile,
                dataUrl: dataURL
            });
            m.redraw();
        });
    };
    ImageSelect.maxImageSize = 1280;
    return ImageSelect;
}(FileSelect));

var SignDraw = /** @class */ (function () {
    function SignDraw() {
        this.signaturePad = null;
    }
    SignDraw.prototype.oncreate = function (_a) {
        var _this = this;
        var dom = _a.dom;
        var canvas = dom.children[0];
        this.signaturePad = new SignaturePad(canvas, {
            minWidth: 0.5 * pxRatio,
            maxWidth: 1.5 * pxRatio
        });
        // Create resize handler with access to member variables
        this.resizeCanvas = lodash.debounce(function () {
            canvas.width = canvas.offsetWidth * pxRatio;
            canvas.height = canvas.offsetHeight * pxRatio;
            var ctx = canvas.getContext("2d");
            if (ctx && _this.signaturePad) {
                ctx.scale(pxRatio, pxRatio);
                _this.signaturePad.clear();
            }
        }, 250);
        window.addEventListener("resize", this.resizeCanvas);
        window.addEventListener("orientationchange", this.resizeCanvas);
        this.resizeCanvas();
    };
    SignDraw.prototype.onremove = function () {
        window.removeEventListener("resize", this.resizeCanvas);
        window.removeEventListener("orientationchange", this.resizeCanvas);
    };
    SignDraw.prototype.view = function (_a) {
        var _this = this;
        var _b = _a.attrs, onSet = _b.onSet, onCancel = _b.onCancel;
        return [
            m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30" + b.aspectRatio4x1, m("canvas.aspect-ratio--object")),
            m(".flex.flex-row.nl1.nr1.mb1", [
                m(Button, {
                    label: "Apply",
                    icon: "fa-check",
                    classes: "ma1",
                    onclick: function () {
                        if (_this.signaturePad && !_this.signaturePad.isEmpty()) {
                            onSet(_this.signaturePad.toDataURL("image/png"));
                        }
                    }
                }),
                m(Button, {
                    label: "Reset",
                    icon: "fa-eraser",
                    classes: "ma1",
                    onclick: function () { return _this.resetCanvas(); }
                }),
                m(Button, {
                    label: "Cancel",
                    icon: "fa-times",
                    classes: "ma1",
                    onclick: onCancel
                })
            ])
        ];
    };
    SignDraw.prototype.resetCanvas = function () {
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
    };
    SignDraw.prototype.resizeCanvas = function () {
        lodash.noop();
    };
    return SignDraw;
}());

var SignType = /** @class */ (function () {
    function SignType() {
        this.text = stream("");
    }
    SignType.prototype.oncreate = function (_a) {
        var dom = _a.dom;
        var input = dom.children[0];
        input.focus({ preventScroll: false });
    };
    SignType.prototype.view = function (_a) {
        var _this = this;
        var _b = _a.attrs, onSet = _b.onSet, onCancel = _b.onCancel;
        var fontSize = 60 * pxRatio;
        var screenMin = 480 * pxRatio;
        return [
            m(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30" + b.aspectRatio4x1, m("input.aspect-ratio--object.pa2.ba.bw0[type=text]", {
                // Prevent enter key from bubbling
                onkeypress: function (_a) {
                    var keyCode = _a.keyCode;
                    if (keyCode === 13 && _this.text()) {
                        onSet(renderText(_this.text()));
                        return false;
                    }
                    return true;
                },
                oninput: function (_a) {
                    var value = _a.target.value;
                    return _this.text(value);
                },
                value: this.text(),
                style: {
                    "font-size": "calc(" + fontSize + "px + (" + fontSize + " / " + screenMin + " * (100vw - " + screenMin + "px)))",
                    "font-family": "Caveat",
                }
            })),
            m(".flex.flex-row.nl1.nr1.mb1", [
                m(Button, {
                    label: "Apply",
                    icon: "fa-check",
                    classes: "ma1",
                    onclick: function () {
                        if (_this.text()) {
                            onSet(renderText(_this.text()));
                        }
                    }
                }),
                m(Button, {
                    label: "Reset",
                    icon: "fa-eraser",
                    classes: "ma1",
                    onclick: function () { return _this.text(""); }
                }),
                m(Button, {
                    label: "Cancel",
                    icon: "fa-times",
                    classes: "ma1",
                    onclick: onCancel
                })
            ])
        ];
    };
    return SignType;
}());
function renderText(text) {
    var canvas = document.createElement("canvas");
    var fontSize = 90 * pxRatio;
    canvas.width = 600 * pxRatio;
    canvas.height = 150 * pxRatio;
    var context = canvas.getContext("2d");
    if (context) {
        context.textBaseline = "middle";
        context.font = fontSize + "px Caveat";
        context.fillText(text, 6 * pxRatio, canvas.height * 0.52);
    }
    return canvas.toDataURL();
}

var __extends$3 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SignBuilder = /** @class */ (function (_super) {
    __extends$3(SignBuilder, _super);
    function SignBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = 0 /* Select */;
        return _this;
    }
    SignBuilder.prototype.view = function (_a) {
        var _this = this;
        var field = _a.attrs.field;
        var containerClass = field.containerClass;
        var fileObj = lodash.head(this.fileList());
        return m(".flex.flex-column", {
            class: containerClass
        }, [
            m(".mb1.flex.flex-row", [
                getLabel(field),
                m("span.ph2.mh2.ml-auto.dark-gray", {
                    class: this.state === 1 /* Draw */ ? b.brandingAlt.class : "dim pointer",
                    onclick: function () { return _this.state = 1 /* Draw */; }
                }, m("i.fal.fa-fw.fa-pen")),
                m("span.ph2.mh2.dark-gray", {
                    class: this.state === 2 /* Type */ ? b.brandingAlt.class : "dim pointer",
                    onclick: function () { return _this.state = 2 /* Type */; }
                }, m("i.fal.fa-fw.fa-keyboard"))
            ]),
            this.state === 0 /* Select */
                ? m(".aspect-ratio.dark-gray.ba.bw1.br3.b--dashed.b--black-30.pointer" + b.aspectRatio4x1, {
                    onclick: function () { return _this.state = 1 /* Draw */; }
                }, fileObj
                    ? m("img.aspect-ratio--object", {
                        src: imgSrc(fileObj.path, fileObj.dataUrl)
                    })
                    : m(".aspect-ratio--object.flex.items-center.justify-center", [
                        m("i.fal.fa-pen-nib.fa-2x"),
                        m("span.ml2", "Sign")
                    ]))
                : m(this.state === 1 /* Draw */ ? SignDraw : SignType, {
                    onSet: function (dataUrl) { return _this.setDataUrl(dataUrl, field.id); },
                    onCancel: function () { return _this.state = 0 /* Select */; }
                })
        ]);
    };
    SignBuilder.prototype.setDataUrl = function (dataUrl, fileKey) {
        var _this = this;
        scaleDataUrl(dataUrl, SignBuilder.maxImageSize).then(function (scaledDataUrl) {
            var newFile = new File([dataURItoBlob(scaledDataUrl)], "sign-" + fileKey + ".png", {
                type: "image/png"
            });
            _this.setFile({
                guid: _this.getFileId(),
                name: newFile.name,
                path: "not_set",
                file: newFile,
                dataUrl: scaledDataUrl
            });
            _this.state = 0 /* Select */;
            m.redraw();
        });
    };
    SignBuilder.maxImageSize = 640;
    return SignBuilder;
}(FileSelect));
function scaleDataUrl(dataUrl, maxSize) {
    return new Promise(function (resolve) {
        var image = new Image();
        image.onload = function () {
            var canvas = document.createElement("canvas");
            var _a = scaleRect(image.width, image.height, maxSize), width = _a[0], height = _a[1];
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext("2d");
            if (context) {
                context.drawImage(image, 0, 0, width, height);
            }
            resolve(canvas.toDataURL());
        };
        image.src = dataUrl;
    });
}

export { BaseInput, BaseText, Button, Checkbox, CheckboxInput, FileList, FileMulti, FileSelect, ImageList, ImageMulti, ImagePreview, ImageSelect, Label, Link, RadioInput, SelectInput, SelectText, SignBuilder, TextareaInput, Trusted, dataURItoBlob, fileNameExtSplit, getDisplayLabel, getLabel, getLabelText, guid, iconMap, imgSrc, inputBorder, inputText, linkAttrs, pickByProperty, pxRatio, removeByProperty, resizeImage, scaleRect };
