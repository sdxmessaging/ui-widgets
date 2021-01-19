import e from"lodash";import t from"mithril";import a from"mithril/stream";import n from"signature_pad";var r={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-pen-nib",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-stamp",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};var i=r;function l(t){e.assign(r,t)}function o(){return{"max-height":i.imageDispHeight}}function s(){return{"max-height":i.thumbDispHeight}}var c={"max-width":"5.4ex"};var u={"max-width":"9ex"};var d={wrapper:"pa0 bn",label:"f6 silver",inputWrapper:"dark-gray",input:"h2 dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40"};var f=d;function p(t){e.assign(d,t)}var v={default:"bg-light-blue dark-gray"};function m(t){e.assign(v,t)}function h(e){if(e===void 0){e="default"}if(e&&e in v){return v[e]}else{return""}}function g(e,t){var a=e.wrapper,n=a===void 0?"":a,r=e.merge,i=r===void 0?true:r;return n+" "+(i?f.wrapper:"")+" "+(t?f.disabledWrapper:"")}function y(e,t){var a=e.label,n=a===void 0?"":a,r=e.merge,i=r===void 0?true:r;return n+" "+(i?f.label:"")+" "+(t?f.requiredLabel:"")}function b(e){var t=e.inputWrapper,a=t===void 0?"":t,n=e.merge,r=n===void 0?true:n;return a+" "+(r?f.inputWrapper:"")}function w(e){var t=e.input,a=t===void 0?"":t,n=e.merge,r=n===void 0?true:n;return a+" "+(r?f.input:"")}function x(e,t,a){return w(e)+" "+S(t,a)}function I(e){var t=e.input,a=t===void 0?"":t,n=e.merge,r=n===void 0?true:n;return a+" "+(r?f.textarea:"")}function k(e,t,a,n){var r=e.input,i=r===void 0?"":r,l=e.merge,o=l===void 0?true:l;return i+" "+(o?f.radio:"")+" "+(t?f.radioChecked:f.radioUnchecked)+" "+S(a,n)}function C(e){return f.fileInput+" "+(e?f.fileHover:"")}function S(e,t){return e||t?"":"pointer"}function T(e){return(e+256).toString(16).substr(1)}function P(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[T(e[0]),T(e[1]),T(e[2]),T(e[3]),"-",T(e[4]),T(e[5]),"-",T(e[6]),T(e[7]),"-",T(e[8]),T(e[9]),"-",T(e[10]),T(e[11]),T(e[12]),T(e[13]),T(e[14]),T(e[15])].join("")}function _(){return Math.max(window.devicePixelRatio,1)}function U(e,t){return t?""+e+i.requiredLblPost:e}function q(e,t){return t?t:e}function D(e){return e?t("span.mr2.truncate",{title:e,class:f.displayLabel},e):null}function F(e,a,n,r){return n?t("label.mb1.db",{title:n,for:e,class:y(a,r)},U(n,r)):null}function M(e,a,n){return[e?t("i.fa-fw",{class:(a?"mr2":"")+" "+e}):null,a,n?t("i.fa-fw",{class:(a?"ml2":"")+" "+n}):null]}function O(e){return function(t){var a=t.target.value;return e(a)}}function z(e){return function(t){var a=t.target.checked;return e(a)}}function A(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function j(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var i=new Uint8Array(r);for(var l=0;l<r;l++){i[l]=a.charCodeAt(l)}return new Blob([i],{type:n})}function L(e,t){var a=(new Date).valueOf();var n=e;n.name=t;n.lastModified=a;return e}function R(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function H(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var i=a.getUint16(r,false);r+=2;if(i===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var l=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,l);var o=a.getUint16(r,l);r+=2;for(var s=0;s<o;s++){if(a.getUint16(r+s*12,l)===274){return a.getUint16(r+s*12+8,l)}}}else if((i&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function V(e){return new Promise((function(t){var a=new FileReader;a.onload=function(){t(H(a.result))};a.readAsArrayBuffer(e)}))}function W(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function B(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return V(e).then((function(n){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var l=R(i.width,i.height,t),o=l[0],s=l[1];if(n>4){e.width=s;e.height=o}else{e.width=o;e.height=s}var c=e.getContext("2d");W(c,o,s,n);c.drawImage(i,0,0,o,s);r(e.toDataURL(a))};var l=new FileReader;l.onload=function(){return i.src=l.result};l.readAsDataURL(e)}))}))}function E(e,t,a,n){var r=document.createElement("canvas");r.width=t;r.height=a;var i=.56*r.height;var l=r.getContext("2d");l.textBaseline="middle";l.font=i+"px "+n;l.fillText(e,r.height*.05,i);return r.toDataURL()}function Y(e){var t=A(e.name),a=t[1];switch(a.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return i.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return i.videoFileIcn;case".pdf":return i.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return i.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return i.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return i.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return i.imageIcn;default:return i.fileIcn}}function N(e){return e&&e.includes("image")}var Z=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.classes,i=r===void 0?"bg-red":r,l=e.children;return t(".relative.dib",[l,n?t("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:i,style:{minWidth:"0.65rem"}},n):null])};return e}();var $=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.type,i=r===void 0?"button":r,l=a.title,o=l===void 0?n:l,s=a.icon,c=a.rightIcon,u=a.context,d=a.classes,p=d===void 0?"":d,v=a.disabled,m=a.style,g=a.onclick;return t("button.button-reset",{type:i,title:o,disabled:v,class:p+" "+(v?f.disabledWrapper:"pointer")+" "+h(u)+" "+f.button,style:m,onclick:g},M(s,n,c))};return e}();var G=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.title,i=r===void 0?n:r,l=a.icon,o=a.rightIcon,s=a.href,c=a.rel,u=a.target,d=a.download,p=a.context,v=a.classes,m=v===void 0?"":v,g=a.style;return t("a.link.flex.items-center",{href:s,rel:c,target:u,download:d,title:i,class:m+" "+h(p)+" "+f.button,style:g},M(l,n,o))};return e}();var J=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.title,i=r===void 0?n:r,l=a.icon,o=a.rightIcon,s=a.classes,c=s===void 0?"":s,u=a.disabled,d=a.style,p=a.onclick;return t(".mh2.pa2.truncate",{title:i,disabled:u,class:c+" "+(u?f.disabledWrapper:"pointer")+" "+f.navButton,style:d,onclick:p},M(l,n,o))};return e}();var K=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.title,i=r===void 0?n:r,l=a.icon,o=a.rightIcon,s=a.href,c=a.rel,u=a.target,d=a.download,p=a.classes,v=p===void 0?"":p,m=a.style;return t("a.link.mh2.pa2.truncate",{href:s,rel:c,target:u,download:d,title:i,class:v+" "+f.navButton,style:m},M(l,n,o))};return e}();var Q=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field.style,r=a.value;return t(".pa2",{style:n},t.trust(r()))};return e}();var X=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.label,l=n.uiClass,o=l===void 0?{}:l,s=n.style;return t(".pa2.flex.flex-wrap",{class:g(o),style:s},[D(i),t("span.ws-normal",{title:r(),class:f.displayValue},r())])};return e}();function ee(e,t){if(e==="email"){return{href:"mailto:"+t,class:f.displayValue}}else if(e==="tel"){return{href:"tel:"+t,class:f.displayValue}}else{return{href:t,target:"_blank",class:f.displayValue}}}var te={email:i.emailIcn,tel:i.telIcn};var ae=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var l=n.label,o=n.type,s=o===void 0?"url":o,c=n.uiClass,u=c===void 0?{}:c,d=n.style;return t(".pa2.flex.flex-wrap",{class:g(u),style:d},[D(l),t("a.link.dim.pointer.ws-normal",ee(s,r()),t("i.mr2",{class:te[s]||i.linkIcn}),r())])};return e}();var ne=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r.options,o=l===void 0?[]:l;var s=e.find(o,e.matches({value:i()||false}));return s?t("span.ml2",s.label):null};return a}();var re=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var l=n.label,o=n.uiClass,s=o===void 0?{}:o,c=n.style;return t(".pa2.flex.items-center",{class:g(s),style:c},[D(l),t("i",{class:f.displayValue+" "+i[r()?this.onIcon:this.offIcon]}),t(ne,{field:n,value:r})])};return e}();var ie=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var le=function(e){ie(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(re);function oe(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function se(e){return function(t){t.preventDefault();e(false)}}function ce(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function ue(e){return function(t){var a=t.target.files;return e(a)}}var de=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.defaultAccept,i=r===void 0?"*":r,l=n.field,o=l.label,s=l.id,c=l.name,u=c===void 0?s:c,d=l.title,f=d===void 0?o:d,p=l.required,v=l.readonly,m=l.disabled,h=l.autofocus,g=l.accept,w=g===void 0?i:g,x=l.uiClass,I=x===void 0?{}:x,k=n.multiple,C=k===void 0?true:k,T=n.dragging,P=n.onSet,_=a.children;return t("label.db",e.extend({for:s,title:f,class:S(m,v)},m||v?{}:{ondragover:oe(T),ondragleave:se(T),ondrop:ce(T,P)}),[t("input.clip[type=file].bg-transparent.bn.outline-0",{id:s,name:u,multiple:C,accept:w,required:p,autofocus:h,disabled:m||v,onchange:ue(P)}),o?t("span.db.mb1",{class:y(I,p)},U(o,p)):null,t("div",{class:b(I)},_)])};return a}();function fe(t,a){if(a===void 0){a=false}return function(n){var r=a?[]:t();e.each(n,(function(e){r.push({guid:P(),name:e.name,path:"not_set",file:e})}));t(r)}}function pe(t,a){return function(n){n.preventDefault();var r=t();e.remove(r,{guid:a});t(r)}}var ve=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var o=r.disabled,s=r.uiClass,c=s===void 0?{}:s;return t("fieldset",{class:g(c,o)},[t(de,{field:r,dragging:this.dragging,onSet:fe(l)},t(".pa2",{class:C(this.dragging())},[t("i.mr2",{class:i.uploadIcn}),t("span",i.addFilesTxt)])),t(".flex.flex-column.mt1.nb1",e.map(l(),(function(e){return t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:i.downloadIcn}),e.name,t("i.child.fr",{title:i.remFileTtl+" "+e.name,class:i.deleteIcn,onclick:pe(l,e.guid)})])})))])};return n}();var me=function(){function e(){}e.prototype.view=function(e){var a=e.children,n=e.attrs;return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n.src&&n.src!=="not_set"?t("img.contain",{src:n.src}):null,n.data&&n.data.file&&(n.src==="not_set"||!n.src)?t("div.contain.tc.br5.6rem",{class:Y(n.data)+" fa-2x",tooltip:n.data.file.type}):null,a])};return e}();var he=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.displayType,l=r===void 0?"thumbnail":r,o=n.value;return l==="thumbnail"?t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(o(),(function(e){return t(me,{src:q(e.path,e.dataUrl),data:e,style:s()},t(".absolute.top-0.right-0.child",t($,{title:"Remove "+e.name,icon:i.deleteIcn,onclick:pe(o,e.guid)})))}))):t(".pa2.flex.flex-column",e.map(o(),(function(e){return t(".flex.items-center.pa1.ba.b--black-20",[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",e?e.name:i.addFileTxt),e?t("i.pa1",{class:Y(e),title:"Click to view file in new tab",onclick:e.path!=="not_set"?function(){return window.open(e.path,"_blank")}:undefined}):null,e?t("i.pa1.pointer.dim",{title:"Remove "+e.name,class:i.cancelIcn,onclick:pe(o,e.guid)}):null])})))};return a}();var ge=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r.label,o=r.uiClass,s=o===void 0?{}:o,c=r.style;var u=e.find(r.options,{value:i()});var d=u?u.label||u.value:i();return t(".pa2.flex.flex-wrap",{class:g(s),style:c},[D(l),t("span.ws-normal",{title:d,class:f.displayValue},d)])};return a}();var ye=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var o=r.label,s=r.uiClass,c=s===void 0?{}:s,u=r.style;return t(".pa2.flex.flex-column",{class:g(c),style:u},[D(o),t(".flex.flex-column.mt1.nb1",e.map(l(),(function(e){var a=e.name,n=e.path;return t("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:f.displayValue,href:n},t("i.mr2",{class:i.downloadIcn}),a)})))])};return a}();var be=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r.label,o=r.uiClass,c=o===void 0?{}:o,u=r.style;return t(".pa2.flex.flex-column",{class:g(c),style:u},[D(l),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(i(),(function(e){var a=e.name,n=e.path,r=e.dataUrl;return t(me,{title:a,src:q(n,r),style:s()})})))])};return a}();var we=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=r.label,c=r.uiClass,u=c===void 0?{}:c,d=r.style;var p=e.head(l());return t(".pa2.flex.flex-column",{class:g(u),style:d},[D(s),p?t("img.img.h-100.mt2.contain.self-center",{title:p.name,src:q(p.path,p.dataUrl),style:o()}):t("i.mt2",{class:f.displayValue+" "+i.imageIcn})])};return a}();function xe(e){var t=0;if(e){if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(/(?=.*[A-Z].*[A-Z])/.test(e)&&/(?=.*[a-z].*[a-z].*[a-z])/.test(e)){t=t+1}if(/(?=.*[0-9].*[0-9])/.test(e)){t=t+1}if(/(?=.*[!"£%^@#$&*])/.test(e)){t=t+1}}}return t}function Ie(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}var ke=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];var Ce=function(){function a(){}a.prototype.oninit=function(e){var t=e.attrs.value;this.passwordScore=t.map((function(e){return xe(String(e))}))};a.prototype.onremove=function(){this.passwordScore.end()};a.prototype.view=function(a){var n=this;var r=a.attrs.field;var i=r.label,l=r.style;return t(".flex.flex-column",{style:l},[D(i),t(".flex.mt1",e.map(ke,(function(e){return t(".h1.w-20",{class:n.passwordScore()>=e.value?e.background:"bg-transparent"})}))),t("span.f5.truncate",Ie(this.passwordScore()))])};return a}();var Se=function(){function e(){}e.prototype.view=function(e){var a=e.attrs.field,n=a.label,r=n===void 0?"":n,i=a.title,l=i===void 0?r:i,o=a.required;return t("label.mb2",{title:l},U(r,o))};return e}();var Te=function(){function e(){}e.prototype.view=function(e){var a;var n=e.attrs,r=n.field,i=n.value,l=n.xform,o=l===void 0?i:l;var s=r.label,c=r.id,u=r.type,d=u===void 0?"text":u,f=r.name,p=f===void 0?c:f,v=r.title,m=v===void 0?s:v,h=r.placeholder,y=r.max,x=r.maxlength,I=r.min,k=r.minlength,C=r.step,S=r.required,T=r.readonly,P=r.disabled,_=r.autofocus,U=r.autocomplete,q=r.pattern,D=r.inputmode,M=r.spellcheck,z=r.instant,A=r.uiClass,j=A===void 0?{}:A;return t("fieldset",{class:d==="hidden"?"clip":g(j,P)},[F(c,j,s,S),t("div",{class:b(j)},t("input.w-100.bg-transparent.bn.outline-0",(a={id:c,type:d,name:p,title:m,placeholder:h,max:y,maxlength:x,min:I,minlength:k,step:C,required:S,readonly:T,disabled:P,autofocus:_,autocomplete:U,pattern:q,inputmode:D,spellcheck:M,class:w(j),value:o()},a[z?"oninput":"onchange"]=O(i),a)))])};return e}();var Pe=function(){function a(){}a.prototype.view=function(a){var n;var r=a.attrs,i=r.field,l=r.value,o=r.xform,s=o===void 0?l:o;var c=i,u=c.label,d=c.id,f=c.name,p=f===void 0?d:f,v=c.title,m=v===void 0?u:v,h=c.placeholder,y=c.max,x=c.maxlength,I=c.min,k=c.minlength,C=c.step,S=c.required,T=c.readonly,P=c.disabled,_=c.autofocus,U=c.autocomplete,q=c.pattern,D=c.inputmode,M=c.spellcheck,O=c.instant,z=c.uiClass,A=z===void 0?{}:z,j=c.options;var L=j&&j.length?j[0].value:"$";return t("fieldset.flex-shrink-0",{class:g(A,P)},[F(d,A,u,S),t(".flex.items-center",{class:b(A)},t("span.mr1",L),t("input.w-100.bg-transparent.bn.outline-0",(n={id:d,type:"text",name:p,title:m,placeholder:h,max:y,maxlength:x,min:I,minlength:k,step:C,required:S,readonly:T,disabled:P,autofocus:_,autocomplete:U,pattern:q,inputmode:D,spellcheck:M,class:w(A),value:e.isUndefined(s())?null:qe(_e(s()))},n[O?"oninput":"onchange"]=Fe(l),n)))])};return a}();function _e(t){return e.isString(t)?e.parseInt(t):Number(t)}function Ue(t){var a=t.replace(/[^\d.]/g,"");var n;var r=0;if(a.indexOf(".")>-1){var i=a.indexOf(".");var l=a.substring(0,i);n=e.parseInt(e.padStart(l,1,"0"));var o=a.substring(i+1,Math.min(i+3,a.length));r=e.parseInt(e.padEnd(o,2,"0"))}else{n=e.parseInt(a)||0}return n*100+r}function qe(e){var t=De(e);if(t){return t[0]+"."+t[1]}else{return t}}function De(t){if(!e.isFinite(t)){return undefined}var a=String(Math.abs(t));var n="0";var r="";if(a.length>2){var i=a.length-2;n=a.substring(0,i);r=a.substring(i)}else{r=e.padStart(a,2,"0")}return[n,r]}function Fe(e){return function(t){var a=t.target.value;return e(Ue(a))}}var Me=function(){function e(){this.month=a();this.year=a();this.date=a.lift((function(e,t){return e+"/"+t}),this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=String(e).split("/"),n=a[0],r=a[1],i=r===void 0?"":r;t.month(n);t.year(i)}));this.date.map((function(e){if(e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};e.prototype.view=function(e){var a=e.attrs.field;var n=a.label,r=a.id,i=a.name,l=i===void 0?r:i,o=a.title,s=o===void 0?n:o,u=a.required,d=a.readonly,f=a.disabled,p=a.uiClass,v=p===void 0?{}:p;var m=w(v);return t("fieldset",{class:g(v,f)},[F(r+"-mm",v,n,u),t("div",{title:s,class:b(v)},[t("div.dib.mr2",[F(r+"-mm",v,"Month"),t("input.w-100.bg-transparent.bn.outline-0",{id:r+"-mm",name:l+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:d,disabled:f,value:this.month(),class:m,style:c,onchange:O(this.month)})]),t("span.mr2","/"),t("div.dib.mr2",[F(r+"-yy",v,"Year"),t("input.w-100.bg-transparent.bn.outline-0",{id:r+"-yy",name:l+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:d,disabled:f,value:this.year(),class:m,style:c,onchange:O(this.year)})])])])};return e}();var Oe=function(){function n(){this.day=a();this.month=a();this.year=a();this.date=a.lift((function(e,t,a){return a+"-"+t+"-"+e}),this.day,this.month,this.year)}n.prototype.oninit=function(t){var a=this;var n=t.attrs.value;n.map((function(t){var n=new Date(String(t));if(e.isDate(n)&&!isNaN(n.getTime())){a.day(e.padStart(String(n.getDate()),2,"0"));a.month(e.padStart(String(1+n.getMonth()),2,"0"));a.year(String(n.getFullYear()))}}));this.date.map((function(t){var a=new Date(String(t));if(e.isDate(a)&&!isNaN(a.getTime())&&t!==n()){n(t)}}))};n.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};n.prototype.view=function(e){var a=e.attrs.field;var n=a,r=n.label,i=n.id,l=n.name,o=l===void 0?i:l,s=n.title,d=s===void 0?r:s,f=n.required,p=n.readonly,v=n.disabled,m=n.uiClass,h=m===void 0?{}:m,y=n.options;var x=y&&y.length?y[0].value:"en-GB";var I=w(h);var k=t(".dib.mr2",[F(i+"-dd",h,"Day"),t("input.w-100.bg-transparent.bn.outline-0",{id:i+"-dd",name:o+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.day(),class:I,style:c,onchange:O(this.day)})]);var C=t(".dib.mr2",[F(i+"-mm",h,"Month"),t("input.w-100.bg-transparent.bn.outline-0",{id:i+"-mm",name:o+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.month(),class:I,style:c,onchange:O(this.month)})]);var S=t(".dib.mr2",[F(i+"-yyyy",h,"Year"),t("input.w-100.bg-transparent.bn.outline-0",{id:i+"-yyyy",name:o+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.year(),class:I,style:u,onchange:O(this.year)})]);return t("fieldset",{class:g(h,v)},[F(i,h,r,f),t("div",{id:i,title:d,class:b(h)},x==="en-US"?[C,k,S]:[k,C,S])])};return n}();var ze=function(){function e(){this.showPassword=a(false)}e.prototype.view=function(e){var a;var n=this;var r=e.attrs,l=r.field,o=r.value;var s=l.label,c=l.id,u=l.name,d=u===void 0?c:u,f=l.title,p=f===void 0?s:f,v=l.placeholder,m=l.maxlength,h=l.minlength,y=l.required,x=l.readonly,I=l.disabled,k=l.autofocus,C=l.autocomplete,S=l.pattern,T=l.inputmode,P=l.instant,_=l.uiClass,U=_===void 0?{}:_;return t("fieldset",{class:g(U,I)},[F(c,U,s,y),t("div.w-100.flex.items-center",{class:b(U)},t("input.w-100.bg-transparent.bn.outline-0",(a={id:c,name:d,title:p,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:h,required:y,readonly:x,disabled:I,autofocus:k,autocomplete:C,pattern:S,inputmode:T,class:w(U),value:o(),autocorrect:"off"},a[P?"oninput":"onchange"]=O(o),a)),t("i.ml1.pa1.fa-fw.pointer.dim",{title:i.showPassTxt,class:this.showPassword()?i.hidePassIcn:i.showPassIcn,onclick:function(){return n.showPassword(!n.showPassword())}}))])};return e}();var Ae=function(){function e(){}e.prototype.view=function(e){var a;var n=e.attrs,r=n.field,i=n.value;var l=r.label,o=r.id,s=r.name,c=s===void 0?o:s,u=r.title,d=u===void 0?l:u,f=r.placeholder,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,y=r.autocomplete,w=r.spellcheck,x=r.instant,k=r.uiClass,C=k===void 0?{}:k;return t("fieldset",{class:g(C,m)},[F(o,C,l,p),t("div",{class:b(C)},t("textarea.w-100.bg-transparent.bn.outline-0[rows=3]",(a={id:o,name:c,title:d,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:y,spellcheck:w,class:I(C),value:i(),style:{resize:"vertical"}},a[x?"oninput":"onchange"]=O(i),a)))])};return e}();var je=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var l=n.label,o=l===void 0?"":l,s=n.id,c=n.name,u=c===void 0?s:c,d=n.title,f=d===void 0?o:d,p=n.required,v=n.readonly,m=n.disabled,h=n.autocomplete,y=n.uiClass,w=y===void 0?{}:y;return t("fieldset",{class:g(w,m)},t("div",{class:b(w)},[t("label.flex.items-center",{title:f,class:x(w,m,v)},t("input.clip[type=checkbox]",{id:s,name:u,checked:r(),required:p,autocomplete:h,disabled:m||v,onchange:z(r)}),t("i.mr2",{class:i[r()?this.onIcon:this.offIcon]}),U(o,p),t(ne,{field:n,value:r}))]))};return e}();var Le=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var Re=function(e){Le(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(je);var He=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r,o=l.label,s=l.id,c=l.name,u=c===void 0?s:c,d=l.required,f=l.readonly,p=l.disabled,v=l.autocomplete,m=l.options,h=l.uiClass,y=h===void 0?{}:h;return t("fieldset",{class:g(y,p)},[F(s,y,o,d),t("div",{class:b(y),onchange:O(i)},e.map(m,(function(e){var a=e.value,n=e.label,r=n===void 0?a:n,l=e.icon;var o=i()===a;return t("label.dib",{title:r,class:k(y,o,p,f)},t("input.clip[type=radio]",{name:u,value:a,checked:o,required:d,autocomplete:v,disabled:p||f}),l?t("i.fa-fw",{class:l}):r)})))])};return a}();var Ve=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r,o=l.label,s=l.id,c=l.name,u=c===void 0?s:c,d=l.title,f=d===void 0?o:d,p=l.required,v=l.readonly,m=l.disabled,h=l.autofocus,y=l.autocomplete,x=l.uiClass,I=x===void 0?{}:x,k=l.options;return t("fieldset",{class:g(I,m)},[F(s,I,o,p),t("div",{class:b(I)},t("select.w-100.bg-transparent.bn.outline-0",{id:s,name:u,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:y,class:w(I),value:i(),onchange:O(i)},e.map(k,(function(e){var a=e.value,n=e.label,r=n===void 0?a:n;return t("option",{value:a,disabled:m||v},r)}))))])};return a}();var We=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var o=e.head(l());var s=r.disabled,c=r.uiClass,u=c===void 0?{}:c;return t("fieldset",{class:g(u,s)},t(de,{field:r,multiple:false,dragging:this.dragging,onSet:fe(l,true)},t(".flex.items-center.pa1",{class:C(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",o?o.name:i.addFileTxt),o?t("i.pa1",{class:Y(o),title:"Click to view file in new tab",onclick:o.path!=="not_set"?function(){return window.open(o.path,"_blank")}:undefined}):null,o?t("i.pa1.pointer.dim",{title:"Remove "+o.name,class:i.cancelIcn,onclick:pe(l,o.guid)}):null])))};return n}();function Be(a,n,r){if(r===void 0){r=false}return function(i){var l=r?[]:a();return Promise.all(e.map(i,(function(e){return B(e,n,e.type).then((function(t){var a=L(j(t),e.name);l.push({guid:P(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){a(l);t.redraw()}))}}var Ee=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var o=r.disabled,c=r.uiClass,u=c===void 0?{}:c;return t("fieldset",{class:g(u,o)},[t(de,{field:r,defaultAccept:"image/*",dragging:this.dragging,onSet:Be(l,i.imageMaxSize)},t(".w-100.pa1.dt.tc",{class:C(this.dragging())},t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn}))),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(l(),(function(e){return t(me,{src:q(e.path,e.dataUrl),style:s()},t(".absolute.top-0.right-0.child",t($,{title:"Remove "+e.name,icon:i.deleteIcn,onclick:pe(l,e.guid)})))})))])};return n}();var Ye=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=e.head(l());var c=r.disabled,u=r.uiClass,d=u===void 0?{}:u;return t("fieldset",{class:g(d,c)},t(de,{field:r,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Be(l,i.imageMaxSize,true)},t(".pa1",{class:C(this.dragging())},t(".relative.w-100.dt.tc",s?[t("img.img.contain",{title:s.name,src:q(s.path,s.dataUrl),style:o()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+s.name,onclick:pe(l,s.guid)},t("i.pa1",{class:i.cancelIcn}))]:t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn})))))};return n}();var Ne=function(){function a(){}a.prototype.oncreate=function(t){var a=this;var r=t.dom;var i=r.children[0];var l=_();this.signaturePad=new n(i,{minWidth:.5*l,maxWidth:1.5*l});var o=function(){var e=_();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var t=i.getContext("2d");t.scale(e,e);a.resetCanvas()};this.resizeHandler=e.debounce(o,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);o()};a.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};a.prototype.view=function(e){var a=this;var n=e.attrs,r=n.style,l=n.onSet,o=n.onCancel;return[t(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:r},t("canvas.aspect-ratio--object")),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t($,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:function(){if(!a.signaturePad.isEmpty()){l(a.signaturePad.toDataURL("image/png"))}}}),t($,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return a.resetCanvas()}}),t($,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};a.prototype.resetCanvas=function(){this.signaturePad.clear()};return a}();function Ze(e,t){var a=i.signMaxSize;var n=.01*t*a;return E(e,a,n,i.signFont)}function $e(e,t){return function(){return t(Ze(i.stampSetTxt,e))}}var Ge=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.heightPct,r=a.onSet;return[t("span.clip",{style:{"font-family":i.signFont}},i.stampSetTxt),t(".flex",t($,{label:i.stampTxt,classes:"flex-auto "+i.stampBtnClass,context:i.stampBtnContext,onclick:$e(n,r)}))]};return e}();function Je(e,t,a){return function(){if(e()){a(Ze(e(),t))}return false}}var Ke=function(){function e(){this.text=a("")}e.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var a=this;var n=e.attrs,r=n.heightPct,l=n.style,o=n.onSet,s=n.onCancel;return[t("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:l,onsubmit:Je(this.text,r,o)},t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:O(this.text),value:this.text(),style:{"font-family":i.signFont}})),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t($,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:Je(this.text,r,o)}),t($,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return a.text("")}}),t($,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function Qe(e,t){return new Promise((function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=R(n.width,n.height,t),i=r[0],l=r[1];e.width=i;e.height=l;var o=e.getContext("2d");o.drawImage(n,0,0,i,l);a(e.toDataURL())};n.src=e}))}function Xe(e,a,n){return function(r){return Qe(r,n).then((function(n){var r=L(j(n),"sign-"+a+".png");e([{guid:P(),name:r.name,path:"not_set",file:r,dataUrl:n}]);t.redraw()}))}}var et=function(){function a(){}a.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(){return t.component=undefined}))};a.prototype.view=function(a){var n=this;var r=a.attrs,l=r.field,o=r.value;var s=l,c=s.label,u=s.id,d=s.readonly,p=s.disabled,v=s.uiClass,m=v===void 0?{}:v,h=s.options,y=h===void 0?i.signOpts:h,w=s.heightPct,x=w===void 0?i.signHeightPct:w;var I={paddingBottom:x+"%"};var k=e.head(o());var C=e(y).map((function(e){var t=e.value;if(t==="draw"){return{component:Ne,icon:i.drawIcn,label:i.signDrawTxt}}else if(t==="type"){return{component:Ke,icon:i.typeIcn,label:i.signTypeTxt}}else if(t==="stamp"){return{component:Ge,icon:i.stampIcn,label:i.signStampTxt}}return null})).compact().value();if(C.length===1&&!k){this.component=C[0].component}return t("fieldset.relative",{class:g(m,p)},[F(u,m,c),t("div",{class:b(m)},d||p?t(".aspect-ratio",{id:u,style:I},k?t(".aspect-ratio--object",t("img.img.w-100.absolute",{src:q(k.path,k.dataUrl)})):null):this.component?t(this.component,{heightPct:x,style:I,onSet:Xe(o,u,i.signMaxSize),onCancel:function(){return n.component=undefined}}):t(".aspect-ratio.pointer",{id:u,class:f.fileInput,style:I},k?t(".aspect-ratio--object.hide-child.dim",{onclick:function(){return o([])}},[t("img.img.w-100.absolute",{src:q(k.path,k.dataUrl)}),t(".pa3.absolute.top-0.right-0.child",t("i.fa-2x",{class:i.resetIcn}))]):t(".aspect-ratio--object.flex.items-stretch.justify-center",e.map(C,(function(e){var a=e.component,r=e.icon,i=e.label;return t(".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return n.component=a}},t("i.fa-2x.ma1",{class:r}),t("span.ma1",i))})))))])};return a}();function tt(a,n){return function(r){var l=n?[]:a();return Promise.all(e.map(r,(function(e){if(N(e.type)){return B(e,i.imageMaxSize,e.type).then((function(t){var a=L(j(t),e.name);l.push({guid:P(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}else{l.push({guid:P(),name:e.name,path:"not_set",file:e});return Promise.resolve()}}))).then((function(){a(l);t.redraw()}))}}var at=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=e.head(l());var c=r.disabled,u=r.uiClass,d=u===void 0?{}:u;return t("fieldset",{class:g(d,c)},t(de,{field:r,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:tt(l,true)},t(".flex.items-center.pa1",{class:C(this.dragging())},s?s.dataUrl?[t(".relative.w-100.dt.tc",t("img.img.contain",{title:s.name,src:q(s.path,s.dataUrl),style:o()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+s.name,onclick:pe(l,s.guid)},t("i.pa1",{class:i.cancelIcn})))]:[t("i.pa1",{class:Y(s),title:"Click to view file in new tab",onclick:s.path!=="not_set"?function(){return window.open(s.path,"_blank")}:undefined}),t("span.ma1.flex-auto",s.name),t("i.pa1.pointer.dim",{title:"Remove "+s.name,class:i.cancelIcn,onclick:pe(l,s.guid)})]:[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)])))};return n}();var nt=function(){function e(){this.dragging=a(false)}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value,l=a.displayType,o=l===void 0?"thumbnail":l,s=a.showDisplay,c=s===void 0?true:s;var u=n.disabled,d=n.uiClass,f=d===void 0?{}:d;return t("fieldset",{class:g(f,u)},[t(de,{field:n,defaultAccept:"*",dragging:this.dragging,onSet:tt(r,false)},t(".flex.items-center.pa1.dt",{class:C(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)])),c?t(he,{displayType:o,value:r}):null])};return e}();export{Z as Badge,Te as BaseInput,X as BaseText,$ as Button,G as ButtonLink,Me as CardDateInput,re as Checkbox,je as CheckboxInput,Pe as CurrencyInput,Oe as DateInput,he as DisplayTypeComponent,ye as FileList,ve as FileMulti,We as FileSelect,be as ImageList,Ee as ImageMulti,we as ImagePreview,Ye as ImageSelect,Se as Label,ae as Link,nt as MultiOmniFileInput,J as NavButton,K as NavLink,at as OmniFileInput,ze as PasswordInput,Ce as PasswordStrength,He as RadioInput,Ve as SelectInput,ge as SelectText,et as SignBuilder,Ae as TextareaInput,le as Toggle,Re as ToggleInput,Q as Trusted,Ue as currencyStrToNumber,A as fileNameExtSplit,P as guid,te as iconMap,ee as linkAttrs,qe as numberToCurrencyStr,De as numberToCurrencyTuple,m as updateButtonContext,p as updateClasses,l as updateConfig};
