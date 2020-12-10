(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril/stream"),require("mithril"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril/stream","mithril","signature_pad"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiWidgets={},e._,e.m.stream,e.m,e.SignaturePad))})(this,(function(e,t,a,n,r){"use strict";function l(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var i=l(t);var o=l(a);var s=l(n);var u=l(r);var c={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",toggleOnIcn:"fa fa-toggle-on",toggleOffIcn:"fa fa-toggle-off",showPassIcn:"fa fa-eye",hidePassIcn:"fa fa-eye-slash",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link",wordDocIcn:"fa-file-word",videoFileIcn:"fa-file-video",pdfFileIcn:"fa-file-pdf",musicFileIcn:"fa-file-audio",excelFileIcn:"fa-file-excel",fileIcn:"fa-file",codeFileIcn:"fa-file-code"};var d=c;function f(e){i["default"].assign(c,e)}function p(){return{"max-height":d.imageDispHeight}}function v(){return{"max-height":d.thumbDispHeight}}var m={"max-width":"5.4ex"};var h={"max-width":"9ex"};var g={icon:o["default"]("fas"),lblCol:o["default"]("silver"),lblFnt:o["default"]("f6"),dspFnt:o["default"]("truncate"),dspBrd:o["default"]("bb b--black-20"),inpHgt:o["default"]("h2"),inpCol:o["default"]("dark-gray"),inpFnt:o["default"]("fw2"),inpBrd:o["default"]("bn"),actCol:o["default"]("dark-gray"),actBg:o["default"]("bg-light-blue"),filBrd:o["default"]("ba bw1 br3 b--dashed"),filBrdCol:o["default"]("b--black-30"),drgCol:o["default"]("blue"),drgBrdCol:o["default"]("b--blue"),btnBg:o["default"]("bg-light-blue"),btnCol:o["default"]("dark-gray"),btnFnt:o["default"](""),btnPad:o["default"]("pa2"),btnBrd:o["default"]("bn br2")};function b(e){return e.join(" ")}function y(e,t){if(t===void 0){t=[]}return o["default"].merge(i["default"].concat(i["default"].map(e,(function(e){return g[e]})),t)).map(b)}var w=y(["lblCol","dspFnt"]);var x=y(["lblCol","lblFnt"]);var I=y(["inpCol","inpFnt"]);var k=y(["inpBrd"],[I]);var S=y(["inpHgt"],[k]);var T=y(["actCol","actBg"]);var C=y(["filBrd","filBrdCol"],[I]);var P=y(["inpFnt","filBrd","drgCol","drgBrdCol"]);var F=y(["btnBg","btnCol","btnFnt","btnPad","btnBrd"]);var B=y(["btnCol","btnFnt"]);function q(e){i["default"].forEach(e,(function(e,t){if(e&&t in g){g[t](e)}}))}function _(e){return g.icon()+" "+e}var D={};function M(e){i["default"].assign(D,e)}function U(e){if(e&&e in D){return D[e]}else{return F()}}function O(e){return(e+256).toString(16).substr(1)}function j(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[O(e[0]),O(e[1]),O(e[2]),O(e[3]),"-",O(e[4]),O(e[5]),"-",O(e[6]),O(e[7]),"-",O(e[8]),O(e[9]),"-",O(e[10]),O(e[11]),O(e[12]),O(e[13]),O(e[14]),O(e[15])].join("")}function z(){return Math.max(window.devicePixelRatio,1)}function A(e,t){return t?e+"*":e}function L(e,t){return t?t:e}function H(e){return e?s["default"]("span.mr2.truncate",{title:e,class:w()},e):null}function R(e,t,a){return t?s["default"]("label.mb1.db",{title:t,for:e,class:x()},A(t,a)):null}function E(e,t,a){return[e?s["default"]("i.fa-fw",{class:(t?"mr2":"")+" "+_(e)}):null,t,a?s["default"]("i.fa-fw",{class:(t?"ml2":"")+" "+_(a)}):null]}function Y(e,t){return e?"o-60":t?"":"pointer"}function N(e){return function(t){var a=t.target.value;return e(a)}}function W(e){return function(t){var a=t.target.checked;return e(a)}}function V(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function Z(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var l=new Uint8Array(r);for(var i=0;i<r;i++){l[i]=a.charCodeAt(i)}return new Blob([l],{type:n})}function $(e,t){var a=(new Date).valueOf();var n=e;n.name=t;n.lastModified=a;return e}function G(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function J(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var l=a.getUint16(r,false);r+=2;if(l===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var i=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,i);var o=a.getUint16(r,i);r+=2;for(var s=0;s<o;s++){if(a.getUint16(r+s*12,i)===274){return a.getUint16(r+s*12+8,i)}}}else if((l&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function K(e){return new Promise((function(t){var a=new FileReader;a.onload=function(){t(J(a.result))};a.readAsArrayBuffer(e)}))}function Q(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function X(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return K(e).then((function(n){return new Promise((function(r){var l=new Image;l.onload=function(){var e=document.createElement("canvas");var i=G(l.width,l.height,t),o=i[0],s=i[1];if(n>4){e.width=s;e.height=o}else{e.width=o;e.height=s}var u=e.getContext("2d");Q(u,o,s,n);u.drawImage(l,0,0,o,s);r(e.toDataURL(a))};var i=new FileReader;i.onload=function(){return l.src=i.result};i.readAsDataURL(e)}))}))}function ee(e,t,a,n){var r=document.createElement("canvas");r.width=t;r.height=a;var l=.56*r.height;var i=r.getContext("2d");i.textBaseline="middle";i.font=l+"px "+n;i.fillText(e,r.height*.05,l);return r.toDataURL()}function te(e){var t=V(e.name),a=t[1];switch(a.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return d.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return d.videoFileIcn;case".pdf":{return d.pdfFileIcn}case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return d.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return d.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return d.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return d.imageIcn;default:return d.fileIcn}}var ae=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.classes,r=n===void 0?"bg-red":n,l=e.children;return s["default"](".relative.dib",[l,a?s["default"]("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:r,style:{minWidth:"0.65rem"}},a):null])};return e}();var ne=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.type,r=n===void 0?"button":n,l=t.title,i=l===void 0?a:l,o=t.icon,u=t.rightIcon,c=t.context,d=t.classes,f=d===void 0?"":d,p=t.disabled,v=t.style,m=t.onclick;return s["default"]("button.button-reset",{type:r,title:i,disabled:p,class:f+" "+Y(p)+" "+U(c),style:v,onclick:m},E(o,a,u))};return e}();var re=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,l=t.icon,i=t.rightIcon,o=t.href,u=t.rel,c=t.target,d=t.download,f=t.context,p=t.classes,v=p===void 0?"":p,m=t.style;return s["default"]("a.link",{href:o,rel:u,target:c,download:d,title:r,class:v+" "+U(f),style:m},E(l,a,i))};return e}();var le=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,l=t.icon,i=t.rightIcon,o=t.classes,u=o===void 0?"":o,c=t.disabled,d=t.style,f=t.onclick;return s["default"](".mh2.pa2.truncate",{title:r,disabled:c,class:u+" "+Y(c)+" "+B(),style:d,onclick:f},E(l,a,i))};return e}();var ie=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,l=t.icon,i=t.rightIcon,o=t.href,u=t.rel,c=t.target,d=t.download,f=t.classes,p=f===void 0?"":f,v=t.style;return s["default"]("a.link.mh2.pa2.truncate",{href:o,rel:u,target:c,download:d,title:r,class:p+" "+B(),style:v},E(l,a,i))};return e}();var oe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=a.classes,r=a.style,l=t.value;return s["default"](".pa2",{class:n,style:r},s["default"].trust(l()))};return e}();var se=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=a.classes,i=l===void 0?"":l,o=a.style;return s["default"](".pa2.flex.flex-wrap",{class:i+" "+g.dspBrd(),style:o},[H(r),s["default"]("span.ws-normal",{title:n(),class:I()},n())])};return e}();function ue(e,t){if(e==="email"){return{href:"mailto:"+t,class:I()}}else if(e==="tel"){return{href:"tel:"+t,class:I()}}else{return{href:t,target:"_blank",class:I()}}}var ce={email:d.emailIcn,tel:d.telIcn};var de=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=a.type,i=l===void 0?"url":l,o=a.classes,u=o===void 0?"":o,c=a.style;return s["default"](".pa2.flex.flex-wrap",{class:u+" "+g.dspBrd(),style:c},[H(r),s["default"]("a.link.dim.pointer.ws-normal",ue(i,n()),s["default"]("i.mr2",{class:_(ce[i]||d.linkIcn)}),n())])};return e}();var fe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.options,l=r===void 0?[]:r;var o=i["default"].find(l,i["default"].matches({value:n()||false}));return o?s["default"]("span.ml2",o.label):null};return e}();var pe=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=a.classes,i=l===void 0?"":l,o=a.style;return s["default"](".pa2.flex.items-center",{class:i+" "+g.dspBrd()+" "+w(),style:o},[H(r),s["default"]("i",{class:g.inpCol()+" "+_(d[n()?this.onIcon:this.offIcon])}),s["default"](fe,{field:a,value:n})])};return e}();var ve=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var me=function(e){ve(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(pe);var he=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=a.classes,o=l===void 0?"":l,u=a.style;var c=i["default"].find(a.options,{value:n()});var d=c?c.label||c.value:n();return s["default"](".pa2.flex.flex-wrap",{class:o+" "+g.dspBrd(),style:u},[H(r),s["default"]("span.ws-normal",{title:d,class:I()},d)])};return e}();var ge=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=a.classes,o=l===void 0?"":l,u=a.style;return s["default"](".pa2.flex.flex-column",{class:o+" "+g.dspBrd(),style:u},[H(r),s["default"](".flex.flex-column.mt1.nb1",i["default"].map(n(),(function(e){var t=e.name,a=e.path;return s["default"](".ba.b--black-20",{class:I()},[s["default"]("a.pa2.mv1.link.b--black-20.dim.dib.pointer[target=_blank]",s["default"]("i.mr2",{href:a,class:_(d.downloadIcn)}),t)])})))])};return e}();var be=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return s["default"](".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[s["default"]("img.contain",a),t])};return e}();var ye=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=a.classes,o=l===void 0?"":l,u=a.style;return s["default"](".pa2.flex.flex-column",{class:o+" "+g.dspBrd(),style:u},[H(r),s["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(n(),(function(e){var t=e.name,a=e.path,n=e.dataUrl;return s["default"](be,{title:t,src:L(a,n),style:v()})})))])};return e}();var we=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=a.classes,o=l===void 0?"":l,u=a.style;var c=i["default"].head(n());return s["default"](".pa2.flex.flex-column",{class:o+" "+g.dspBrd(),style:u},[H(r),c?s["default"]("img.img.h-100.mt2.contain.self-center",{title:c.name,src:L(c.path,c.dataUrl),style:p()}):s["default"]("i.mt2",{class:g.inpCol()+" "+_(d.imageIcn)})])};return e}();function xe(e){var t=0;if(e){if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(/(?=.*[A-Z].*[A-Z])/.test(e)&&/(?=.*[a-z].*[a-z].*[a-z])/.test(e)){console.log("has 2 upper case:",t);t=t+1}if(/(?=.*[0-9].*[0-9])/.test(e)){t=t+1}if(/(?=.*[!"£%^@#$&*])/.test(e)){t=t+1}}}return t}function Ie(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}var ke=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];var Se=function(){function e(){}e.prototype.oninit=function(e){var t=e.attrs.value;this.passwordScore=t.map((function(e){return xe(String(e))}))};e.prototype.onremove=function(){this.passwordScore.end()};e.prototype.view=function(e){var t=this;var a=e.attrs.field;var n=a.label,r=a.classes,l=r===void 0?"":r,o=a.style;return s["default"](".flex.flex-column",{class:l,style:o},[H(n),s["default"](".flex.mt1",i["default"].map(ke,(function(e){return s["default"](".h1.w-20",{class:t.passwordScore()>=e.value?e.background:"bg-transparent"})}))),s["default"]("span.f5.truncate",Ie(this.passwordScore()))])};return e}();var Te=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,n=a===void 0?"":a,r=t.title,l=r===void 0?n:r,i=t.required;return s["default"]("label.mb2",{title:l},A(n,i))};return e}();var Ce=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value,l=a.xform,i=l===void 0?r:l;var o=n.label,u=n.id,c=n.type,d=c===void 0?"text":c,f=n.name,p=f===void 0?u:f,v=n.title,m=v===void 0?o:v,h=n.placeholder,g=n.max,b=n.maxlength,y=n.min,w=n.minlength,x=n.step,I=n.required,k=n.readonly,T=n.disabled,C=n.autofocus,P=n.autocomplete,F=n.pattern,B=n.inputmode,q=n.spellcheck,_=n.instant,D=n.containerClass,M=n.classes,U=M===void 0?"":M;return[s["default"]("fieldset.bn",{class:D},s["default"]("div",{class:U+" "+Y(T,true)+" "+S()},R(u,o,I),s["default"]("input.w-100.bg-transparent.bn.outline-0",(t={id:u,type:d,name:p,title:m,placeholder:h,max:g,maxlength:b,min:y,minlength:w,step:x,required:I,readonly:k,disabled:T,autofocus:C,autocomplete:P,pattern:F,inputmode:B,spellcheck:q,value:i()},t[_?"oninput":"onchange"]=N(r),t))))]};return e}();var Pe=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value,l=a.xform,o=l===void 0?r:l;var u=n,c=u.label,d=u.id,f=u.name,p=f===void 0?d:f,v=u.title,m=v===void 0?c:v,h=u.placeholder,g=u.max,b=u.maxlength,y=u.min,w=u.minlength,x=u.step,k=u.required,T=u.readonly,C=u.disabled,P=u.autofocus,F=u.autocomplete,B=u.pattern,q=u.inputmode,_=u.spellcheck,D=u.instant,M=u.containerClass,U=u.classes,O=U===void 0?"":U,j=u.options;var z=j&&j.length?j[0].value:"$";console.log(z,M);return[s["default"]("fieldset.pa0.bn",{class:S(),style:{"flex-shrink":0}},[s["default"]("div",{class:O+" "+Y(C,true)+" "+I()},R(d,c,k),s["default"]("div.flex.items-center",{},s["default"]("span.mr1",z),s["default"]("input.w-100.bg-transparent.bn.outline-0",(t={id:d,type:"text",name:p,title:m,placeholder:h,max:g,maxlength:b,min:y,minlength:w,step:x,required:k,readonly:T,disabled:C,autofocus:P,autocomplete:F,pattern:B,inputmode:q,spellcheck:_,value:i["default"].isUndefined(o())?null:qe(Fe(o()))},t[D?"oninput":"onchange"]=De(r),t))))])]};return e}();function Fe(e){return i["default"].isString(e)?i["default"].parseInt(e):Number(e)}function Be(e){var t=e.replace(/[^\d.]/g,"");var a;var n=0;if(t.indexOf(".")>-1){var r=t.indexOf(".");var l=t.substring(0,r);a=i["default"].parseInt(i["default"].padStart(l,1,"0"));var o=t.substring(r+1,Math.min(r+3,t.length));n=i["default"].parseInt(i["default"].padEnd(o,2,"0"))}else{a=i["default"].parseInt(t)||0}return a*100+n}function qe(e){var t=_e(e);if(t){return t[0]+"."+t[1]}else{return t}}function _e(e){if(!i["default"].isFinite(e)){return undefined}var t=String(Math.abs(e));var a="0";var n="";if(t.length>2){var r=t.length-2;a=t.substring(0,r);n=t.substring(r)}else{n=i["default"].padStart(t,2,"0")}return[a,n]}function De(e){return function(t){var a=t.target.value;return e(Be(a))}}var Me=function(){function e(){this.month=o["default"]();this.year=o["default"]();this.date=o["default"].lift((function(e,t){return e+"/"+t}),this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=String(e).split("/"),n=a[0],r=a[1],l=r===void 0?"":r;t.month(n);t.year(l)}));this.date.map((function(e){if(e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t.label,n=t.id,r=t.name,l=r===void 0?n:r,i=t.title,o=i===void 0?a:i,u=t.required,c=t.readonly,d=t.disabled,f=t.containerClass,p=t.classes,v=p===void 0?"":p;var h=v+" "+Y(d,true)+" "+S();return[s["default"]("fieldset.bn",{class:f},R(n,a,u),s["default"]("div.w-100",{id:n,title:o},[s["default"]("div.dib.mr2",[R(n+"-mm","Month"),s["default"]("input.w-100.bg-transparent.bn.outline-0",{id:n+"-mm",name:l+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:c,disabled:d,value:this.month(),class:h,style:m,onchange:N(this.month)})]),s["default"]("span.mr2",{class:I()},"/"),s["default"]("div.dib.mr2",[R(n+"-yy","Year"),s["default"]("input.w-100.bg-transparent.bn.outline-0",{id:n+"-yy",name:l+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:c,disabled:d,value:this.year(),class:h,style:m,onchange:N(this.year)})])]))]};return e}();var Ue=function(){function e(){this.day=o["default"]();this.month=o["default"]();this.year=o["default"]();this.date=o["default"].lift((function(e,t,a){return a+"-"+t+"-"+e}),this.day,this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=new Date(String(e));if(i["default"].isDate(a)&&!isNaN(a.getTime())){t.day(i["default"].padStart(String(a.getDate()),2,"0"));t.month(i["default"].padStart(String(1+a.getMonth()),2,"0"));t.year(String(a.getFullYear()))}}));this.date.map((function(e){var t=new Date(String(e));if(i["default"].isDate(t)&&!isNaN(t.getTime())&&e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t,n=a.label,r=a.id,l=a.name,i=l===void 0?r:l,o=a.title,u=o===void 0?n:o,c=a.required,d=a.readonly,f=a.disabled,p=a.containerClass,v=a.classes,g=v===void 0?"":v,b=a.options;var y=b&&b.length?b[0].value:"en-GB";var w=g+" "+Y(f,true)+" "+S();var x=s["default"](".dib.mr2",[R(r+"-dd","Day"),s["default"]("input.w-100.bg-transparent.bn.outline-0",{id:r+"-dd",name:i+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.day(),class:w,style:m,onchange:N(this.day)})]);var I=s["default"](".dib.mr2",[R(r+"-mm","Month"),s["default"]("input.w-100.bg-transparent.bn.outline-0",{id:r+"-mm",name:i+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.month(),class:w,style:m,onchange:N(this.month)})]);var k=s["default"](".dib.mr2",[R(r+"-yyyy","Year"),s["default"]("input.w-100.bg-transparent.bn.outline-0",{id:r+"-yyyy",name:i+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.year(),class:w,style:h,onchange:N(this.year)})]);return[s["default"]("fieldset.bn",{class:p},R(r,n,c),s["default"]("div.w-100",{id:r,title:u,class:p},y==="en-US"?[I,x,k]:[x,I,k]))]};return e}();var Oe=function(){function e(){this.showPassword=o["default"](false)}e.prototype.view=function(e){var t;var a=this;var n=e.attrs,r=n.field,l=n.value;var i=r.label,o=r.id,u=r.name,c=u===void 0?o:u,f=r.title,p=f===void 0?i:f,v=r.placeholder,m=r.maxlength,h=r.minlength,g=r.required,b=r.readonly,y=r.disabled,w=r.autofocus,x=r.autocomplete,k=r.instant,T=r.containerClass,C=r.classes,P=C===void 0?"":C;return[s["default"]("fieldset.bn",{class:T},R(o,i,g),s["default"]("div.w-100.flex.items-center.flex-auto bg-white",{class:P+" "+Y(y,true)+" "+I()+" "+S()+" "},s["default"]("input.w-100.bg-transparent.bn.outline-0",(t={id:o,name:c,title:p,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:h,required:g,readonly:b,disabled:y,autofocus:w,autocomplete:x,value:l(),autocorrect:"off"},t[k?"oninput":"onchange"]=N(l),t)),s["default"]("i.ml1.pa1.fa-fw.pointer.dim",{title:d.showPassTxt,class:_(this.showPassword()?d.hidePassIcn:d.showPassIcn),onclick:function(){return a.showPassword(!a.showPassword())}})))]};return e}();var je=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value;var l=n.label,i=n.id,o=n.name,u=o===void 0?i:o,c=n.title,d=c===void 0?l:c,f=n.placeholder,p=n.required,v=n.readonly,m=n.disabled,h=n.autofocus,g=n.autocomplete,b=n.spellcheck,y=n.instant,w=n.containerClass,x=n.classes,I=x===void 0?"":x;return[s["default"]("fieldset.bn",{class:w},R(i,l,p),s["default"]("div",{class:I+" "+Y(m,true)+" "+k()},s["default"]("textarea.w-100[rows=3]",(t={id:i,name:u,title:d,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,spellcheck:b,value:r(),style:{resize:"vertical"}},t[y?"oninput":"onchange"]=N(r),t))))]};return e}();var ze=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,l=r===void 0?"":r,i=a.id,o=a.name,u=o===void 0?i:o,c=a.title,f=c===void 0?l:c,p=a.required,v=a.readonly,m=a.disabled,h=a.autocomplete,g=a.containerClass,b=g===void 0?"":g,y=a.classes,w=y===void 0?"":y;return s["default"]("fieldset.bn",{class:I()+" "+b},s["default"]("div",{class:I()+" "+b},s["default"]("label.flex.items-center",{title:f,class:w+" "+Y(m,v)},s["default"]("input.clip[type=checkbox].bg-transparent",{id:i,name:u,checked:n(),required:p,autocomplete:h,disabled:m||v,onchange:W(n)}),A(l,p),s["default"]("i.ml2",{class:_(d[n()?this.onIcon:this.offIcon])}),s["default"](fe,{field:a,value:n}))))};return e}();var Ae=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var Le=function(e){Ae(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(ze);var He=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a,l=r.label,o=r.id,u=r.name,c=u===void 0?o:u,d=r.required,f=r.readonly,p=r.disabled,v=r.autocomplete,m=r.containerClass,h=m===void 0?"flex-wrap":m,b=r.classes,y=b===void 0?"":b,w=r.options;return[s["default"]("fieldset.bn",{class:h},R(o,l,d),s["default"]("div.flex",{class:I()+" "+h,onchange:N(n)},i["default"].map(w,(function(e){var t=e.value,a=e.label,r=a===void 0?t:a,l=e.icon;var i=n()===t;return s["default"]("label.flex.items-center",{title:r,class:y+" "+Y(p,f)+" "+(i?T():"dim")+" "+g.btnBrd()},s["default"]("input.clip[type=radio].bg-transparent.bn.outline-0",{name:c,value:t,checked:i,required:d,autocomplete:v,disabled:p||f}),l?s["default"]("i.fa-fw",{class:_(l)}):r)}))))]};return e}();var Re=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a,l=r.label,o=r.id,u=r.name,c=u===void 0?o:u,d=r.title,f=d===void 0?l:d,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,g=r.autocomplete,b=r.containerClass,y=r.classes,w=y===void 0?"":y,x=r.options;return[s["default"]("fieldset.bn",{class:b},R(o,l,p),s["default"]("div.w-100",{class:w+" "+Y(m,v)+" "+S()},s["default"]("select.w-100.bg-transparent.bn.outline-0",{id:o,name:c,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,value:n(),onchange:N(n)},i["default"].map(x,(function(e){var t=e.value,a=e.label,n=a===void 0?t:a;return s["default"]("option",{value:t,disabled:m||v},n)})))))]};return e}();function Ee(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function Ye(e){return function(t){t.preventDefault();e(false)}}function Ne(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function We(e){return function(t){var a=t.target.files;return e(a)}}var Ve=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.defaultAccept,n=a===void 0?"*":a,r=t.field,l=r.label,o=r.id,u=r.name,c=u===void 0?o:u,d=r.title,f=d===void 0?l:d,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,g=r.accept,b=g===void 0?n:g,y=r.containerClass,w=y===void 0?"":y,I=t.multiple,k=I===void 0?true:I,S=t.dragging,T=t.onSet,C=e.children;console.log(w);console.log(Y(m,v));return s["default"]("fieldset.bn",{},s["default"]("div",{class:Y(m,v)+" "+w},s["default"]("label.db",i["default"].extend({for:o,title:f},m||v?{}:{ondragover:Ee(S),ondragleave:Ye(S),ondrop:Ne(S,T)}),[s["default"]("input.clip[type=file].bg-transparent.bn.outline-0",{id:o,name:c,multiple:k,accept:b,required:p,autofocus:h,disabled:m||v,onchange:We(T)}),l?s["default"]("span.db.mb1",{class:x()},A(l,p)):null,C])))};return e}();function Ze(e,t){if(t===void 0){t=false}return function(a){var n=t?[]:e();i["default"].each(a,(function(e){n.push({guid:j(),name:e.name,path:"not_set",file:e})}));e(n)}}function $e(e,t){return function(a){a.preventDefault();var n=e();i["default"].remove(n,{guid:t});e(n)}}var Ge=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;return[s["default"]("fieldset.bn",{},s["default"]("div",{},s["default"](Ve,{field:a,dragging:this.dragging,onSet:Ze(n)},s["default"](".pa2",{class:this.dragging()?P():C()},[s["default"]("i.mr2",{class:_(d.uploadIcn)}),s["default"]("span",d.addFilesTxt)])),s["default"](".flex.flex-column.mt1.nb1",i["default"].map(n(),(function(e){return s["default"]("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[s["default"]("i.mr2",{class:_(d.downloadIcn)}),e.name,s["default"]("i.child.fr",{title:d.remFileTtl+" "+e.name,class:_(d.deleteIcn),onclick:$e(n,e.guid)})])})))))]};return e}();var Je=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=i["default"].head(n());return s["default"]("fieldset.bn",{},s["default"]("div",{},s["default"](Ve,{field:a,multiple:false,dragging:this.dragging,onSet:Ze(n,true)},s["default"](".flex.items-center.pa1.ba.b--black-20",{class:this.dragging()?P():C()},[s["default"]("i.pa1",{class:_(d.uploadIcn)}),s["default"]("span.ma1.flex-auto",r?r.name:d.addFileTxt),r?s["default"]("i.pa1",{class:_(te(r)),title:"Click to view file in new tab",onclick:r.path!=="not_set"?function(){return window.open(r.path,"_blank")}:undefined}):null,r?s["default"]("i.pa1.pointer.dim",{title:"Remove "+r.name,class:_(d.cancelIcn),onclick:$e(n,r.guid)}):null]))))};return e}();function Ke(e,t,a){if(a===void 0){a=false}return function(n){var r=a?[]:e();return Promise.all(i["default"].map(n,(function(e){return X(e,t,e.type).then((function(t){var a=$(Z(t),e.name);r.push({guid:j(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){e(r);s["default"].redraw()}))}}var Qe=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.classes,l=r===void 0?"":r;return[s["default"]("fieldset.bn",{},s["default"]("div",{},s["default"](Ve,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:Ke(n,d.imageMaxSize)},s["default"](".w-100.pa1.dt.tc",{class:l+" "+(this.dragging()?P():C())},s["default"]("i.fa-2x.dtc.v-mid",{class:_(d.cameraIcn)}))),s["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(n(),(function(e){return s["default"](be,{src:L(e.path,e.dataUrl),style:v()},s["default"](".absolute.top-0.right-0.child",s["default"](ne,{title:"Remove "+e.name,icon:d.deleteIcn,onclick:$e(n,e.guid)})))})))))]};return e}();var Xe=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=i["default"].head(n());var l=a.classes,o=l===void 0?"":l;var u="";return s["default"]("fieldset.bn",{class:""+u},s["default"]("div",{class:""+o},s["default"](Ve,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Ke(n,d.imageMaxSize,true)},s["default"](".relative.w-100.pa1.contain.dt.tc",{class:o+" "+(this.dragging()?P():C())},r?[s["default"]("img.img.contain",{title:r.name,src:L(r.path,r.dataUrl),style:p()}),s["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+r.name,onclick:$e(n,r.guid)},s["default"]("i.pa1",{class:_(d.cancelIcn)}))]:s["default"]("i.fa-2x.dtc.v-mid",{class:_(d.cameraIcn)})))))};return e}();var et=function(){function e(){}e.prototype.oncreate=function(e){var t=this;var a=e.dom;var n=a.children[0];var r=z();this.signaturePad=new u["default"](n,{minWidth:.5*r,maxWidth:1.5*r});var l=function(){var e=z();n.width=n.offsetWidth*e;n.height=n.offsetHeight*e;var a=n.getContext("2d");a.scale(e,e);t.resetCanvas()};this.resizeHandler=i["default"].debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};e.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.style,r=a.onSet,l=a.onCancel;return[s["default"]("fieldset.bn",{},s["default"]("div",{},s["default"](".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:n},s["default"]("canvas.aspect-ratio--object")),s["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[s["default"](ne,{title:d.applyTtl,icon:d.applyIcn,classes:"ma1",onclick:function(){if(!t.signaturePad.isEmpty()){r(t.signaturePad.toDataURL("image/png"))}}}),s["default"](ne,{title:d.resetTtl,icon:d.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),s["default"](ne,{title:d.cancelTtl,icon:d.cancelIcn,classes:"ma1",onclick:l})])))]};e.prototype.resetCanvas=function(){this.signaturePad.clear()};return e}();function tt(e,t){var a=d.signMaxSize;var n=.01*t*a;return ee(e,a,n,d.signFont)}function at(e,t){return function(){return t(tt(d.stampSetTxt,e))}}var nt=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.heightPct,n=t.onSet;return[s["default"]("fieldset.bn",{},s["default"]("div",{},s["default"]("span.clip",{style:{"font-family":d.signFont}},d.stampSetTxt),s["default"](ne,{label:d.stampTxt,classes:"w-100",onclick:at(a,n)})))]};return e}();function rt(e,t,a){return function(){if(e()){a(tt(e(),t))}return false}}var lt=function(){function e(){this.text=o["default"]("")}e.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.heightPct,r=a.style,l=a.onSet,i=a.onCancel;return[s["default"]("fieldset.bn",{},s["default"]("div",{},s["default"]("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:r,onsubmit:rt(this.text,n,l)},s["default"]("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:N(this.text),value:this.text(),style:{"font-family":d.signFont}})),s["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[s["default"](ne,{title:d.applyTtl,icon:d.applyIcn,classes:"ma1",onclick:rt(this.text,n,l)}),s["default"](ne,{title:d.resetTtl,icon:d.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),s["default"](ne,{title:d.cancelTtl,icon:d.cancelIcn,classes:"ma1",onclick:i})])))]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function it(e,t){return new Promise((function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=G(n.width,n.height,t),l=r[0],i=r[1];e.width=l;e.height=i;var o=e.getContext("2d");o.drawImage(n,0,0,l,i);a(e.toDataURL())};n.src=e}))}function ot(e,t,a){return function(n){return it(n,a).then((function(a){var n=$(Z(a),"sign-"+t+".png");e([{guid:j(),name:n.name,path:"not_set",file:n,dataUrl:a}]);s["default"].redraw()}))}}var st=function(){function e(){}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(){return t.component=undefined}))};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.field,r=a.value;var l=n,o=l.label,u=l.id,c=l.readonly,f=l.disabled,p=l.classes,v=p===void 0?"":p,m=l.containerClass,h=l.options,g=h===void 0?d.signOpts:h,b=l.heightPct,y=b===void 0?d.signHeightPct:b;var w={paddingBottom:y+"%"};var x=i["default"].head(r());var I=i["default"](g).map((function(e){var t=e.value;if(t==="draw"){return{component:et,icon:_(d.drawIcn),label:d.signDrawTxt}}else if(t==="type"){return{component:lt,icon:_(d.typeIcn),label:d.signTypeTxt}}else if(t==="stamp"){return{component:nt,icon:_(d.stampIcn),label:d.signStampTxt}}return null})).compact().value();if(I.length===1&&!x){this.component=I[0].component}return s["default"]("fieldset.bn",{class:m},s["default"]("div.relative",{class:""+v},[R(u,o),c||f?s["default"](".aspect-ratio",{id:u,class:v,style:w},x?s["default"](".aspect-ratio--object",s["default"]("img.img.w-100.absolute",{src:L(x.path,x.dataUrl)})):null):this.component?s["default"](this.component,{heightPct:y,style:w,onSet:ot(r,u,d.signMaxSize),onCancel:function(){return t.component=undefined}}):s["default"](".aspect-ratio.pointer",{id:u,class:v+" "+C(),style:w},x?s["default"](".aspect-ratio--object.hide-child.dim",{onclick:function(){return r([])}},[s["default"]("img.img.w-100.absolute",{src:L(x.path,x.dataUrl)}),s["default"](".pa3.absolute.top-0.right-0.child",s["default"]("i.fa-2x",{class:_(d.resetIcn)}))]):s["default"](".aspect-ratio--object.flex.items-stretch.justify-center",i["default"].map(I,(function(e){var a=e.component,n=e.icon,r=e.label;return s["default"](".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return t.component=a}},s["default"]("i.fa-2x.ma1",{class:n}),s["default"]("span.ma1",r))}))))]))};return e}();e.Badge=ae;e.BaseInput=Ce;e.BaseText=se;e.Button=ne;e.ButtonLink=re;e.CardDateInput=Me;e.Checkbox=pe;e.CheckboxInput=ze;e.CurrencyInput=Pe;e.DateInput=Ue;e.FileList=ge;e.FileMulti=Ge;e.FileSelect=Je;e.ImageList=ye;e.ImageMulti=Qe;e.ImagePreview=we;e.ImageSelect=Xe;e.Label=Te;e.Link=de;e.NavButton=le;e.NavLink=ie;e.PasswordInput=Oe;e.PasswordStrength=Se;e.RadioInput=He;e.SelectInput=Re;e.SelectText=he;e.SignBuilder=st;e.TextareaInput=je;e.Toggle=me;e.ToggleInput=Le;e.Trusted=oe;e.currencyStrToNumber=Be;e.fileNameExtSplit=V;e.getIcon=_;e.guid=j;e.iconMap=ce;e.linkAttrs=ue;e.numberToCurrencyStr=qe;e.numberToCurrencyTuple=_e;e.updateButtonContext=M;e.updateConfig=f;e.updateTheme=q;Object.defineProperty(e,"__esModule",{value:true})}));
