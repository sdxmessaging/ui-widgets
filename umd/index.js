(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril"),require("mithril/stream"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril","mithril/stream","signature_pad"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiWidgets={},e._,e.m,e.m.stream,e.SignaturePad))})(this,(function(e,t,a,n,i){"use strict";function r(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var l=r(t);var u=r(a);var o=r(n);var s=r(i);var c={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-pen-nib",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-stamp",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};var d=c;function f(e){l["default"].assign(c,e)}function p(){return{"max-height":d.imageDispHeight}}function v(){return{"max-height":d.thumbDispHeight}}var m={"max-width":"5.4ex"};var h={"max-width":"9ex"};var g={wrapper:"pa0 bn",label:"f6 silver",inputWrapper:"dark-gray",input:"h2 dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray"};var y=g;function b(e){l["default"].assign(g,e)}var w={default:"bg-light-blue dark-gray"};function x(e){l["default"].assign(w,e)}function I(e){if(e===void 0){e="default"}if(e&&e in w){return w[e]}else{return""}}function k(e){var t=e.wrapper,a=t===void 0?"":t,n=e.merge,i=n===void 0?true:n;return i?a+" "+y.wrapper:a}function T(e){var t=e.label,a=t===void 0?"":t,n=e.merge,i=n===void 0?true:n;return i?a+" "+y.label:a}function S(e){var t=e.inputWrapper,a=t===void 0?"":t,n=e.merge,i=n===void 0?true:n;return i?a+" "+y.inputWrapper:a}function C(e,t,a){var n=e.input,i=n===void 0?"":n,r=e.merge,l=r===void 0?true:r;return i+" "+q(t,a)+" "+(l?y.input:"")}function P(e,t,a){var n=e.input,i=n===void 0?"":n,r=e.merge,l=r===void 0?true:r;return i+" "+q(t,a)+" "+(l?y.textarea:"")}function _(e,t,a,n){var i=e.input,r=i===void 0?"":i,l=e.merge,u=l===void 0?true:l;return r+" "+q(a,n)+" "+(t?y.radioChecked:"")+" "+(u?y.radio:"")}function F(e){return y.fileInput+" "+(e?y.fileHover:"")}function q(e,t){return e?"o-60":t?"":"pointer"}function D(e){return(e+256).toString(16).substr(1)}function U(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[D(e[0]),D(e[1]),D(e[2]),D(e[3]),"-",D(e[4]),D(e[5]),"-",D(e[6]),D(e[7]),"-",D(e[8]),D(e[9]),"-",D(e[10]),D(e[11]),D(e[12]),D(e[13]),D(e[14]),D(e[15])].join("")}function M(){return Math.max(window.devicePixelRatio,1)}function O(e,t){return t?e+"*":e}function j(e,t){return t?t:e}function z(e){return e?u["default"]("span.mr2.truncate",{title:e,class:y.displayLabel},e):null}function A(e,t,a,n){return a?u["default"]("label.mb1.db",{title:a,for:e,class:T(t)},O(a,n)):null}function L(e,t,a){return[e?u["default"]("i.fa-fw",{class:(t?"mr2":"")+" "+e}):null,t,a?u["default"]("i.fa-fw",{class:(t?"ml2":"")+" "+a}):null]}function R(e){return function(t){var a=t.target.value;return e(a)}}function B(e){return function(t){var a=t.target.checked;return e(a)}}function H(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function V(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var i=a.length;var r=new Uint8Array(i);for(var l=0;l<i;l++){r[l]=a.charCodeAt(l)}return new Blob([r],{type:n})}function E(e,t){var a=(new Date).valueOf();var n=e;n.name=t;n.lastModified=a;return e}function Y(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function N(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var i=2;while(i<n){var r=a.getUint16(i,false);i+=2;if(r===65505){if(a.getUint32(i+=2,false)!==1165519206){return-1}var l=a.getUint16(i+=6,false)===18761;i+=a.getUint32(i+4,l);var u=a.getUint16(i,l);i+=2;for(var o=0;o<u;o++){if(a.getUint16(i+o*12,l)===274){return a.getUint16(i+o*12+8,l)}}}else if((r&65280)!==65280){break}else{i+=a.getUint16(i,false)}}return-1}function W(e){return new Promise((function(t){var a=new FileReader;a.onload=function(){t(N(a.result))};a.readAsArrayBuffer(e)}))}function Z(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function $(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return W(e).then((function(n){return new Promise((function(i){var r=new Image;r.onload=function(){var e=document.createElement("canvas");var l=Y(r.width,r.height,t),u=l[0],o=l[1];if(n>4){e.width=o;e.height=u}else{e.width=u;e.height=o}var s=e.getContext("2d");Z(s,u,o,n);s.drawImage(r,0,0,u,o);i(e.toDataURL(a))};var l=new FileReader;l.onload=function(){return r.src=l.result};l.readAsDataURL(e)}))}))}function G(e,t,a,n){var i=document.createElement("canvas");i.width=t;i.height=a;var r=.56*i.height;var l=i.getContext("2d");l.textBaseline="middle";l.font=r+"px "+n;l.fillText(e,i.height*.05,r);return i.toDataURL()}function J(e){var t=H(e.name),a=t[1];switch(a.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return d.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return d.videoFileIcn;case".pdf":{return d.pdfFileIcn}case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return d.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return d.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return d.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return d.imageIcn;default:return d.fileIcn}}function K(e){return e&&e.includes("image")}var Q=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.classes,i=n===void 0?"bg-red":n,r=e.children;return u["default"](".relative.dib",[r,a?u["default"]("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:i,style:{minWidth:"0.65rem"}},a):null])};return e}();var X=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.type,i=n===void 0?"button":n,r=t.title,l=r===void 0?a:r,o=t.icon,s=t.rightIcon,c=t.context,d=t.classes,f=d===void 0?"":d,p=t.disabled,v=t.style,m=t.onclick;return u["default"]("button.button-reset",{type:i,title:l,disabled:p,class:f+" "+q(p)+" "+I(c)+" "+y.button,style:v,onclick:m},L(o,a,s))};return e}();var ee=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,i=n===void 0?a:n,r=t.icon,l=t.rightIcon,o=t.href,s=t.rel,c=t.target,d=t.download,f=t.context,p=t.classes,v=p===void 0?"":p,m=t.style;return u["default"]("a.link.flex.items-center",{href:o,rel:s,target:c,download:d,title:i,class:v+" "+I(f)+" "+y.button,style:m},L(r,a,l))};return e}();var te=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,i=n===void 0?a:n,r=t.icon,l=t.rightIcon,o=t.classes,s=o===void 0?"":o,c=t.disabled,d=t.style,f=t.onclick;return u["default"](".mh2.pa2.truncate",{title:i,disabled:c,class:s+" "+q(c)+" "+y.navButton,style:d,onclick:f},L(r,a,l))};return e}();var ae=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,i=n===void 0?a:n,r=t.icon,l=t.rightIcon,o=t.href,s=t.rel,c=t.target,d=t.download,f=t.classes,p=f===void 0?"":f,v=t.style;return u["default"]("a.link.mh2.pa2.truncate",{href:o,rel:s,target:c,download:d,title:i,class:p+" "+y.navButton,style:v},L(r,a,l))};return e}();var ne=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field.style,n=t.value;return u["default"](".pa2",{style:a},u["default"].trust(n()))};return e}();var ie=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=a.uiClass,l=r===void 0?{}:r,o=a.style;return u["default"](".pa2.flex.flex-wrap",{class:k(l),style:o},[z(i),u["default"]("span.ws-normal",{title:n(),class:y.displayValue},n())])};return e}();function re(e,t){if(e==="email"){return{href:"mailto:"+t,class:y.displayValue}}else if(e==="tel"){return{href:"tel:"+t,class:y.displayValue}}else{return{href:t,target:"_blank",class:y.displayValue}}}var le={email:d.emailIcn,tel:d.telIcn};var ue=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=a.type,l=r===void 0?"url":r,o=a.uiClass,s=o===void 0?{}:o,c=a.style;return u["default"](".pa2.flex.flex-wrap",{class:k(s),style:c},[z(i),u["default"]("a.link.dim.pointer.ws-normal",re(l,n()),u["default"]("i.mr2",{class:le[l]||d.linkIcn}),n())])};return e}();var oe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.options,r=i===void 0?[]:i;var o=l["default"].find(r,l["default"].matches({value:n()||false}));return o?u["default"]("span.ml2",o.label):null};return e}();var se=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=a.uiClass,l=r===void 0?{}:r,o=a.style;return u["default"](".pa2.flex.items-center",{class:k(l),style:o},[z(i),u["default"]("i",{class:y.displayValue+" "+d[n()?this.onIcon:this.offIcon]}),u["default"](oe,{field:a,value:n})])};return e}();var ce=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var de=function(e){ce(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(se);function fe(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function pe(e){return function(t){t.preventDefault();e(false)}}function ve(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function me(e){return function(t){var a=t.target.files;return e(a)}}var he=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.defaultAccept,n=a===void 0?"*":a,i=t.field,r=i.label,o=i.id,s=i.name,c=s===void 0?o:s,d=i.title,f=d===void 0?r:d,p=i.required,v=i.readonly,m=i.disabled,h=i.autofocus,g=i.accept,y=g===void 0?n:g,b=i.uiClass,w=b===void 0?{}:b,x=t.multiple,I=x===void 0?true:x,k=t.dragging,C=t.onSet,P=e.children;return u["default"]("label.db.pointer",l["default"].extend({for:o,title:f,class:q(m,v)},m||v?{}:{ondragover:fe(k),ondragleave:pe(k),ondrop:ve(k,C)}),[u["default"]("input.clip[type=file].bg-transparent.bn.outline-0",{id:o,name:c,multiple:I,accept:y,required:p,autofocus:h,disabled:m||v,onchange:me(C)}),r?u["default"]("span.db.mb1",{class:T(w)},O(r,p)):null,u["default"]("div",{class:S(w)},P)])};return e}();function ge(e,t){if(t===void 0){t=false}return function(a){var n=t?[]:e();l["default"].each(a,(function(e){n.push({guid:U(),name:e.name,path:"not_set",file:e})}));e(n)}}function ye(e,t){return function(a){a.preventDefault();var n=e();l["default"].remove(n,{guid:t});e(n)}}var be=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.uiClass,r=i===void 0?{}:i;return u["default"]("fieldset",{class:k(r)},[u["default"](he,{field:a,dragging:this.dragging,onSet:ge(n)},u["default"](".pa2",{class:F(this.dragging())},[u["default"]("i.mr2",{class:d.uploadIcn}),u["default"]("span",d.addFilesTxt)])),u["default"](".flex.flex-column.mt1.nb1",l["default"].map(n(),(function(e){return u["default"]("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[u["default"]("i.mr2",{class:d.downloadIcn}),e.name,u["default"]("i.child.fr",{title:d.remFileTtl+" "+e.name,class:d.deleteIcn,onclick:ye(n,e.guid)})])})))])};return e}();var we=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return u["default"](".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[a.src&&a.src!=="not_set"?u["default"]("img.contain",{src:a.src}):null,a.data&&a.data.file&&(a.src==="not_set"||!a.src)?u["default"]("div.contain.tc.br5.6rem",{class:J(a.data)+" fa-2x",tooltip:a.data.file.type}):null,t])};return e}();var xe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.displayType,n=a===void 0?"thumbnail":a,i=t.value;return n==="thumbnail"?u["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",l["default"].map(i(),(function(e){return u["default"](we,{src:j(e.path,e.dataUrl),data:e,style:v()},u["default"](".absolute.top-0.right-0.child",u["default"](X,{title:"Remove "+e.name,icon:d.deleteIcn,onclick:ye(i,e.guid)})))}))):u["default"](".pa2.flex.flex-column",l["default"].map(i(),(function(e){return u["default"](".flex.items-center.pa1.ba.b--black-20",[u["default"]("i.pa1",{class:d.uploadIcn}),u["default"]("span.ma1.flex-auto",e?e.name:d.addFileTxt),e?u["default"]("i.pa1",{class:J(e),title:"Click to view file in new tab",onclick:e.path!=="not_set"?function(){return window.open(e.path,"_blank")}:undefined}):null,e?u["default"]("i.pa1.pointer.dim",{title:"Remove "+e.name,class:d.cancelIcn,onclick:ye(i,e.guid)}):null])})))};return e}();var Ie=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=a.uiClass,o=r===void 0?{}:r,s=a.style;var c=l["default"].find(a.options,{value:n()});var d=c?c.label||c.value:n();return u["default"](".pa2.flex.flex-wrap",{class:k(o),style:s},[z(i),u["default"]("span.ws-normal",{title:d,class:y.displayValue},d)])};return e}();var ke=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=a.uiClass,o=r===void 0?{}:r,s=a.style;return u["default"](".pa2.flex.flex-column",{class:k(o),style:s},[z(i),u["default"](".flex.flex-column.mt1.nb1",l["default"].map(n(),(function(e){var t=e.name,a=e.path;return u["default"](".ba.b--black-20",{class:y.displayValue},[u["default"]("a.pa2.mv1.link.b--black-20.dim.dib.pointer[target=_blank]",u["default"]("i.mr2",{href:a,class:d.downloadIcn}),t)])})))])};return e}();var Te=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=a.uiClass,o=r===void 0?{}:r,s=a.style;return u["default"](".pa2.flex.flex-column",{class:k(o),style:s},[z(i),u["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",l["default"].map(n(),(function(e){var t=e.name,a=e.path,n=e.dataUrl;return u["default"](we,{title:t,src:j(a,n),style:v()})})))])};return e}();var Se=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=a.uiClass,o=r===void 0?{}:r,s=a.style;var c=l["default"].head(n());return u["default"](".pa2.flex.flex-column",{class:k(o),style:s},[z(i),c?u["default"]("img.img.h-100.mt2.contain.self-center",{title:c.name,src:j(c.path,c.dataUrl),style:p()}):u["default"]("i.mt2",{class:y.displayValue+" "+d.imageIcn})])};return e}();function Ce(e){var t=0;if(e){if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(/(?=.*[A-Z].*[A-Z])/.test(e)&&/(?=.*[a-z].*[a-z].*[a-z])/.test(e)){t=t+1}if(/(?=.*[0-9].*[0-9])/.test(e)){t=t+1}if(/(?=.*[!"£%^@#$&*])/.test(e)){t=t+1}}}return t}function Pe(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}var _e=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];var Fe=function(){function e(){}e.prototype.oninit=function(e){var t=e.attrs.value;this.passwordScore=t.map((function(e){return Ce(String(e))}))};e.prototype.onremove=function(){this.passwordScore.end()};e.prototype.view=function(e){var t=this;var a=e.attrs.field;var n=a.label,i=a.style;return u["default"](".flex.flex-column",{style:i},[z(n),u["default"](".flex.mt1",l["default"].map(_e,(function(e){return u["default"](".h1.w-20",{class:t.passwordScore()>=e.value?e.background:"bg-transparent"})}))),u["default"]("span.f5.truncate",Pe(this.passwordScore()))])};return e}();var qe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,n=a===void 0?"":a,i=t.title,r=i===void 0?n:i,l=t.required;return u["default"]("label.mb2",{title:r},O(n,l))};return e}();var De=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,i=a.value,r=a.xform,l=r===void 0?i:r;var o=n.label,s=n.id,c=n.type,d=c===void 0?"text":c,f=n.name,p=f===void 0?s:f,v=n.title,m=v===void 0?o:v,h=n.placeholder,g=n.max,y=n.maxlength,b=n.min,w=n.minlength,x=n.step,I=n.required,T=n.readonly,P=n.disabled,_=n.autofocus,F=n.autocomplete,q=n.pattern,D=n.inputmode,U=n.spellcheck,M=n.instant,O=n.uiClass,j=O===void 0?{}:O;return u["default"]("fieldset",{class:d==="hidden"?"clip":k(j)},[A(s,j,o,I),u["default"]("div",{class:S(j)},u["default"]("input.w-100.bg-transparent.bn.outline-0",(t={id:s,type:d,name:p,title:m,placeholder:h,max:g,maxlength:y,min:b,minlength:w,step:x,required:I,readonly:T,disabled:P,autofocus:_,autocomplete:F,pattern:q,inputmode:D,spellcheck:U,class:C(j,P,true),value:l()},t[M?"oninput":"onchange"]=R(i),t)))])};return e}();var Ue=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,i=a.value,r=a.xform,o=r===void 0?i:r;var s=n,c=s.label,d=s.id,f=s.name,p=f===void 0?d:f,v=s.title,m=v===void 0?c:v,h=s.placeholder,g=s.max,y=s.maxlength,b=s.min,w=s.minlength,x=s.step,I=s.required,T=s.readonly,P=s.disabled,_=s.autofocus,F=s.autocomplete,q=s.pattern,D=s.inputmode,U=s.spellcheck,M=s.instant,O=s.uiClass,j=O===void 0?{}:O,z=s.options;var L=z&&z.length?z[0].value:"$";return u["default"]("fieldset.flex-shrink-0",{class:k(j)},[A(d,j,c,I),u["default"](".flex.items-center",{class:S(j)},u["default"]("span.mr1",L),u["default"]("input.w-100.bg-transparent.bn.outline-0",(t={id:d,type:"text",name:p,title:m,placeholder:h,max:g,maxlength:y,min:b,minlength:w,step:x,required:I,readonly:T,disabled:P,autofocus:_,autocomplete:F,pattern:q,inputmode:D,spellcheck:U,class:C(j,P,true),value:l["default"].isUndefined(o())?null:je(Me(o()))},t[M?"oninput":"onchange"]=Ae(i),t)))])};return e}();function Me(e){return l["default"].isString(e)?l["default"].parseInt(e):Number(e)}function Oe(e){var t=e.replace(/[^\d.]/g,"");var a;var n=0;if(t.indexOf(".")>-1){var i=t.indexOf(".");var r=t.substring(0,i);a=l["default"].parseInt(l["default"].padStart(r,1,"0"));var u=t.substring(i+1,Math.min(i+3,t.length));n=l["default"].parseInt(l["default"].padEnd(u,2,"0"))}else{a=l["default"].parseInt(t)||0}return a*100+n}function je(e){var t=ze(e);if(t){return t[0]+"."+t[1]}else{return t}}function ze(e){if(!l["default"].isFinite(e)){return undefined}var t=String(Math.abs(e));var a="0";var n="";if(t.length>2){var i=t.length-2;a=t.substring(0,i);n=t.substring(i)}else{n=l["default"].padStart(t,2,"0")}return[a,n]}function Ae(e){return function(t){var a=t.target.value;return e(Oe(a))}}var Le=function(){function e(){this.month=o["default"]();this.year=o["default"]();this.date=o["default"].lift((function(e,t){return e+"/"+t}),this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=String(e).split("/"),n=a[0],i=a[1],r=i===void 0?"":i;t.month(n);t.year(r)}));this.date.map((function(e){if(e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t.label,n=t.id,i=t.name,r=i===void 0?n:i,l=t.title,o=l===void 0?a:l,s=t.required,c=t.readonly,d=t.disabled,f=t.uiClass,p=f===void 0?{}:f;var v=C(p,d,true);return u["default"]("fieldset",{class:k(p)},[A(n+"-mm",p,a,s),u["default"]("div",{title:o,class:S(p)},[u["default"]("div.dib.mr2",[A(n+"-mm",p,"Month"),u["default"]("input.w-100.bg-transparent.bn.outline-0",{id:n+"-mm",name:r+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:s,readonly:c,disabled:d,value:this.month(),class:v,style:m,onchange:R(this.month)})]),u["default"]("span.mr2","/"),u["default"]("div.dib.mr2",[A(n+"-yy",p,"Year"),u["default"]("input.w-100.bg-transparent.bn.outline-0",{id:n+"-yy",name:r+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:s,readonly:c,disabled:d,value:this.year(),class:v,style:m,onchange:R(this.year)})])])])};return e}();var Re=function(){function e(){this.day=o["default"]();this.month=o["default"]();this.year=o["default"]();this.date=o["default"].lift((function(e,t,a){return a+"-"+t+"-"+e}),this.day,this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=new Date(String(e));if(l["default"].isDate(a)&&!isNaN(a.getTime())){t.day(l["default"].padStart(String(a.getDate()),2,"0"));t.month(l["default"].padStart(String(1+a.getMonth()),2,"0"));t.year(String(a.getFullYear()))}}));this.date.map((function(e){var t=new Date(String(e));if(l["default"].isDate(t)&&!isNaN(t.getTime())&&e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t,n=a.label,i=a.id,r=a.name,l=r===void 0?i:r,o=a.title,s=o===void 0?n:o,c=a.required,d=a.readonly,f=a.disabled,p=a.uiClass,v=p===void 0?{}:p,g=a.options;var y=g&&g.length?g[0].value:"en-GB";var b=C(v,f,true);var w=u["default"](".dib.mr2",[A(i+"-dd",v,"Day"),u["default"]("input.w-100.bg-transparent.bn.outline-0",{id:i+"-dd",name:l+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.day(),class:b,style:m,onchange:R(this.day)})]);var x=u["default"](".dib.mr2",[A(i+"-mm",v,"Month"),u["default"]("input.w-100.bg-transparent.bn.outline-0",{id:i+"-mm",name:l+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.month(),class:b,style:m,onchange:R(this.month)})]);var I=u["default"](".dib.mr2",[A(i+"-yyyy",v,"Year"),u["default"]("input.w-100.bg-transparent.bn.outline-0",{id:i+"-yyyy",name:l+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.year(),class:b,style:h,onchange:R(this.year)})]);return u["default"]("fieldset",{class:k(v)},[A(i,v,n,c),u["default"]("div",{id:i,title:s,class:S(v)},y==="en-US"?[x,w,I]:[w,x,I])])};return e}();var Be=function(){function e(){this.showPassword=o["default"](false)}e.prototype.view=function(e){var t;var a=this;var n=e.attrs,i=n.field,r=n.value;var l=i.label,o=i.id,s=i.name,c=s===void 0?o:s,f=i.title,p=f===void 0?l:f,v=i.placeholder,m=i.maxlength,h=i.minlength,g=i.required,y=i.readonly,b=i.disabled,w=i.autofocus,x=i.autocomplete,I=i.instant,T=i.uiClass,P=T===void 0?{}:T;return u["default"]("fieldset",{class:k(P)},[A(o,P,l,g),u["default"]("div.w-100.flex.items-center",{class:S(P)},u["default"]("input.w-100.bg-transparent.bn.outline-0",(t={id:o,name:c,title:p,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:h,required:g,readonly:y,disabled:b,autofocus:w,autocomplete:x,class:C(P,b,true),value:r(),autocorrect:"off"},t[I?"oninput":"onchange"]=R(r),t)),u["default"]("i.ml1.pa1.fa-fw.pointer.dim",{title:d.showPassTxt,class:this.showPassword()?d.hidePassIcn:d.showPassIcn,onclick:function(){return a.showPassword(!a.showPassword())}}))])};return e}();var He=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,i=a.value;var r=n.label,l=n.id,o=n.name,s=o===void 0?l:o,c=n.title,d=c===void 0?r:c,f=n.placeholder,p=n.required,v=n.readonly,m=n.disabled,h=n.autofocus,g=n.autocomplete,y=n.spellcheck,b=n.instant,w=n.uiClass,x=w===void 0?{}:w;return u["default"]("fieldset",{class:k(x)},[A(l,x,r,p),u["default"]("div",{class:S(x)},u["default"]("textarea.w-100.bg-transparent.bn.outline-0[rows=3]",(t={id:l,name:s,title:d,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,spellcheck:y,class:P(x,m,true),value:i(),style:{resize:"vertical"}},t[b?"oninput":"onchange"]=R(i),t)))])};return e}();var Ve=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.label,r=i===void 0?"":i,l=a.id,o=a.name,s=o===void 0?l:o,c=a.title,f=c===void 0?r:c,p=a.required,v=a.readonly,m=a.disabled,h=a.autocomplete,g=a.uiClass,y=g===void 0?{}:g;return u["default"]("fieldset",{class:k(y)},u["default"]("div",{class:S(y)},[u["default"]("label.flex.items-center",{title:f,class:C(y,m,v)},u["default"]("input.clip[type=checkbox]",{id:l,name:s,checked:n(),required:p,autocomplete:h,disabled:m||v,onchange:B(n)}),O(r,p),u["default"]("i.ml2",{class:d[n()?this.onIcon:this.offIcon]}),u["default"](oe,{field:a,value:n}))]))};return e}();var Ee=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var Ye=function(e){Ee(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(Ve);var Ne=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a,r=i.label,o=i.id,s=i.name,c=s===void 0?o:s,d=i.required,f=i.readonly,p=i.disabled,v=i.autocomplete,m=i.options,h=i.uiClass,g=h===void 0?{}:h;return u["default"]("fieldset",{class:k(g)},[A(o,g,r,d),u["default"]("div",{class:S(g),onchange:R(n)},l["default"].map(m,(function(e){var t=e.value,a=e.label,i=a===void 0?t:a,r=e.icon;var l=n()===t;return u["default"]("label.dib",{title:i,class:_(g,l,p,f)},u["default"]("input.clip[type=radio]",{name:c,value:t,checked:l,required:d,autocomplete:v,disabled:p||f}),r?u["default"]("i.fa-fw",{class:r}):i)})))])};return e}();var We=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a,r=i.label,o=i.id,s=i.name,c=s===void 0?o:s,d=i.title,f=d===void 0?r:d,p=i.required,v=i.readonly,m=i.disabled,h=i.autofocus,g=i.autocomplete,y=i.uiClass,b=y===void 0?{}:y,w=i.options;return u["default"]("fieldset",{class:k(b)},[A(o,b,r,p),u["default"]("div",{class:S(b)},u["default"]("select.w-100.bg-transparent.bn.outline-0",{id:o,name:c,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,class:C(b,m,true),value:n(),onchange:R(n)},l["default"].map(w,(function(e){var t=e.value,a=e.label,n=a===void 0?t:a;return u["default"]("option",{value:t,disabled:m||v},n)}))))])};return e}();var Ze=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=l["default"].head(n());var r=a.uiClass,o=r===void 0?{}:r;return u["default"]("fieldset",{class:k(o)},u["default"](he,{field:a,multiple:false,dragging:this.dragging,onSet:ge(n,true)},u["default"](".flex.items-center.pa1",{class:F(this.dragging())},[u["default"]("i.pa1",{class:d.uploadIcn}),u["default"]("span.ma1.flex-auto",i?i.name:d.addFileTxt),i?u["default"]("i.pa1",{class:J(i),title:"Click to view file in new tab",onclick:i.path!=="not_set"?function(){return window.open(i.path,"_blank")}:undefined}):null,i?u["default"]("i.pa1.pointer.dim",{title:"Remove "+i.name,class:d.cancelIcn,onclick:ye(n,i.guid)}):null])))};return e}();function $e(e,t,a){if(a===void 0){a=false}return function(n){var i=a?[]:e();return Promise.all(l["default"].map(n,(function(e){return $(e,t,e.type).then((function(t){var a=E(V(t),e.name);i.push({guid:U(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){e(i);u["default"].redraw()}))}}var Ge=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=a.uiClass,r=i===void 0?{}:i;return u["default"]("fieldset",{class:k(r)},[u["default"](he,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:$e(n,d.imageMaxSize)},u["default"](".w-100.pa1.dt.tc",{class:F(this.dragging())},u["default"]("i.fa-2x.dtc.v-mid",{class:d.cameraIcn}))),u["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",l["default"].map(n(),(function(e){return u["default"](we,{src:j(e.path,e.dataUrl),style:v()},u["default"](".absolute.top-0.right-0.child",u["default"](X,{title:"Remove "+e.name,icon:d.deleteIcn,onclick:ye(n,e.guid)})))})))])};return e}();var Je=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=l["default"].head(n());var r=a.uiClass,o=r===void 0?{}:r;return u["default"]("fieldset",{class:k(o)},u["default"](he,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:$e(n,d.imageMaxSize,true)},u["default"](".relative.w-100.pa1.dt.tc",{class:F(this.dragging())},i?[u["default"]("img.img.contain",{title:i.name,src:j(i.path,i.dataUrl),style:p()}),u["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+i.name,onclick:ye(n,i.guid)},u["default"]("i.pa1",{class:d.cancelIcn}))]:u["default"]("i.fa-2x.dtc.v-mid",{class:d.cameraIcn}))))};return e}();var Ke=function(){function e(){}e.prototype.oncreate=function(e){var t=this;var a=e.dom;var n=a.children[0];var i=M();this.signaturePad=new s["default"](n,{minWidth:.5*i,maxWidth:1.5*i});var r=function(){var e=M();n.width=n.offsetWidth*e;n.height=n.offsetHeight*e;var a=n.getContext("2d");a.scale(e,e);t.resetCanvas()};this.resizeHandler=l["default"].debounce(r,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);r()};e.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.style,i=a.onSet,r=a.onCancel;return[u["default"](".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:n},u["default"]("canvas.aspect-ratio--object")),u["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[u["default"](X,{title:d.applyTtl,icon:d.applyIcn,classes:"ma1",onclick:function(){if(!t.signaturePad.isEmpty()){i(t.signaturePad.toDataURL("image/png"))}}}),u["default"](X,{title:d.resetTtl,icon:d.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),u["default"](X,{title:d.cancelTtl,icon:d.cancelIcn,classes:"ma1",onclick:r})])]};e.prototype.resetCanvas=function(){this.signaturePad.clear()};return e}();function Qe(e,t){var a=d.signMaxSize;var n=.01*t*a;return G(e,a,n,d.signFont)}function Xe(e,t){return function(){return t(Qe(d.stampSetTxt,e))}}var et=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.heightPct,n=t.onSet;return[u["default"]("span.clip",{style:{"font-family":d.signFont}},d.stampSetTxt),u["default"](X,{label:d.stampTxt,classes:"w-100",onclick:Xe(a,n)})]};return e}();function tt(e,t,a){return function(){if(e()){a(Qe(e(),t))}return false}}var at=function(){function e(){this.text=o["default"]("")}e.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.heightPct,i=a.style,r=a.onSet,l=a.onCancel;return[u["default"]("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:i,onsubmit:tt(this.text,n,r)},u["default"]("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:R(this.text),value:this.text(),style:{"font-family":d.signFont}})),u["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[u["default"](X,{title:d.applyTtl,icon:d.applyIcn,classes:"ma1",onclick:tt(this.text,n,r)}),u["default"](X,{title:d.resetTtl,icon:d.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),u["default"](X,{title:d.cancelTtl,icon:d.cancelIcn,classes:"ma1",onclick:l})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function nt(e,t){return new Promise((function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var i=Y(n.width,n.height,t),r=i[0],l=i[1];e.width=r;e.height=l;var u=e.getContext("2d");u.drawImage(n,0,0,r,l);a(e.toDataURL())};n.src=e}))}function it(e,t,a){return function(n){return nt(n,a).then((function(a){var n=E(V(a),"sign-"+t+".png");e([{guid:U(),name:n.name,path:"not_set",file:n,dataUrl:a}]);u["default"].redraw()}))}}var rt=function(){function e(){}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(){return t.component=undefined}))};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.field,i=a.value;var r=n,o=r.label,s=r.id,c=r.readonly,f=r.disabled,p=r.uiClass,v=p===void 0?{}:p,m=r.options,h=m===void 0?d.signOpts:m,g=r.heightPct,b=g===void 0?d.signHeightPct:g;var w={paddingBottom:b+"%"};var x=l["default"].head(i());var I=l["default"](h).map((function(e){var t=e.value;if(t==="draw"){return{component:Ke,icon:d.drawIcn,label:d.signDrawTxt}}else if(t==="type"){return{component:at,icon:d.typeIcn,label:d.signTypeTxt}}else if(t==="stamp"){return{component:et,icon:d.stampIcn,label:d.signStampTxt}}return null})).compact().value();if(I.length===1&&!x){this.component=I[0].component}return u["default"]("fieldset.relative",{class:k(v)},[A(s,v,o),u["default"]("div",{class:S(v)},c||f?u["default"](".aspect-ratio",{id:s,style:w},x?u["default"](".aspect-ratio--object",u["default"]("img.img.w-100.absolute",{src:j(x.path,x.dataUrl)})):null):this.component?u["default"](this.component,{heightPct:b,style:w,onSet:it(i,s,d.signMaxSize),onCancel:function(){return t.component=undefined}}):u["default"](".aspect-ratio.pointer",{id:s,class:y.fileInput,style:w},x?u["default"](".aspect-ratio--object.hide-child.dim",{onclick:function(){return i([])}},[u["default"]("img.img.w-100.absolute",{src:j(x.path,x.dataUrl)}),u["default"](".pa3.absolute.top-0.right-0.child",u["default"]("i.fa-2x",{class:d.resetIcn}))]):u["default"](".aspect-ratio--object.flex.items-stretch.justify-center",l["default"].map(I,(function(e){var a=e.component,n=e.icon,i=e.label;return u["default"](".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return t.component=a}},u["default"]("i.fa-2x.ma1",{class:n}),u["default"]("span.ma1",i))})))))])};return e}();function lt(e,t){return function(a){var n=t?[]:e();if(a&&a.length){return Promise.all(l["default"].map(a,(function(e){if(K(e.type)){return $(e,d.imageMaxSize,e.type).then((function(t){var a=E(V(t),e.name);n.push({guid:U(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}else{n.push({guid:U(),name:e.name,path:"not_set",file:e});return Promise.resolve()}}))).then((function(){e(n);u["default"].redraw()}))}else{return Promise.reject("No file selected to upload")}}}var ut=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var i=l["default"].head(n());var r=a.uiClass,o=r===void 0?{}:r;return u["default"]("fieldset",{class:k(o)},u["default"](he,{field:a,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:lt(n,true)},u["default"](".flex.items-center.pa1.dt",{class:F(this.dragging())},(i===null||i===void 0?void 0:i.dataUrl)?[u["default"](".w-100.tc",{},u["default"]("img.img.contain",{title:i.name,src:j(i.path,i.dataUrl),style:p()}),u["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+i.name,onclick:ye(n,i.guid)},u["default"]("i.pa1",{class:d.cancelIcn})))]:!(i===null||i===void 0?void 0:i.dataUrl)?[u["default"]("i.pa1",{class:d.uploadIcn}),u["default"]("span.ma1.flex-auto",i?i.name:d.addFileTxt),i?u["default"]("i.pa1",{class:J(i),title:"Click to view file in new tab",onclick:i.path!=="not_set"?function(){return window.open(i.path,"_blank")}:undefined}):null,i?u["default"]("i.pa1.pointer.dim",{title:"Remove "+i.name,class:d.cancelIcn,onclick:ye(n,i.guid)}):null]:null)))};return e}();var ot=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value,i=t.displayType,r=i===void 0?"thumbnail":i,l=t.showDisplay,o=l===void 0?true:l;var s=a.uiClass,c=s===void 0?{}:s;return u["default"]("fieldset",{class:k(c)},[u["default"](he,{field:a,defaultAccept:"*",dragging:this.dragging,onSet:lt(n,false)},u["default"](".flex.items-center.pa1.dt",{class:F(this.dragging())},[u["default"]("i.pa1",{class:d.uploadIcn}),u["default"]("span.ma1.flex-auto",d.addFileTxt)])),o?u["default"](xe,{displayType:r,value:n}):null])};return e}();e.Badge=Q;e.BaseInput=De;e.BaseText=ie;e.Button=X;e.ButtonLink=ee;e.CardDateInput=Le;e.Checkbox=se;e.CheckboxInput=Ve;e.CurrencyInput=Ue;e.DateInput=Re;e.DisplayTypeComponent=xe;e.FileList=ke;e.FileMulti=be;e.FileSelect=Ze;e.ImageList=Te;e.ImageMulti=Ge;e.ImagePreview=Se;e.ImageSelect=Je;e.Label=qe;e.Link=ue;e.MultiOmniFileInput=ot;e.NavButton=te;e.NavLink=ae;e.OmniFileInput=ut;e.PasswordInput=Be;e.PasswordStrength=Fe;e.RadioInput=Ne;e.SelectInput=We;e.SelectText=Ie;e.SignBuilder=rt;e.TextareaInput=He;e.Toggle=de;e.ToggleInput=Ye;e.Trusted=ne;e.currencyStrToNumber=Oe;e.fileNameExtSplit=H;e.guid=U;e.iconMap=le;e.linkAttrs=re;e.numberToCurrencyStr=je;e.numberToCurrencyTuple=ze;e.updateButtonContext=x;e.updateClasses=b;e.updateConfig=f;Object.defineProperty(e,"__esModule",{value:true})}));
