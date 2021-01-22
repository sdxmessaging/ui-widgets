import e from"lodash";import t from"mithril";import a from"mithril/stream";import n from"signature_pad";var r={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",openFileTxt:"Open file",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-pen-nib",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-stamp",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};var i=r;function l(t){e.assign(r,t)}function s(){return{"max-height":i.imageDispHeight}}function o(){return{"max-height":i.thumbDispHeight}}var c={"max-width":"5.4ex"};var u={"max-width":"9ex"};var d={wrapper:"pa0 bn",label:"f6 silver",inputWrapper:"dark-gray",input:"h2 dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40",invalidInputWrapper:""};var f=d;function p(t){e.assign(d,t)}var v={default:"bg-light-blue dark-gray"};function m(t){e.assign(v,t)}function h(e){if(e===void 0){e="default"}if(e&&e in v){return v[e]}else{return""}}function g(e,t){var a=e.wrapper,n=a===void 0?"":a,r=e.merge,i=r===void 0?true:r;return n+" "+(i?f.wrapper:"")+" "+(t?f.disabledWrapper:"")}function y(e,t){var a=e.label,n=a===void 0?"":a,r=e.merge,i=r===void 0?true:r;return n+" "+(i?f.label:"")+" "+(t?f.requiredLabel:"")}function b(e,t){var a=e.inputWrapper,n=a===void 0?"":a,r=e.merge,i=r===void 0?true:r;return n+" "+(i?f.inputWrapper:"")+" "+(t?f.invalidInputWrapper:"")}function w(e){var t=e.input,a=t===void 0?"":t,n=e.merge,r=n===void 0?true:n;return a+" "+(r?f.input:"")}function x(e,t,a){return w(e)+" "+S(t,a)}function I(e){var t=e.input,a=t===void 0?"":t,n=e.merge,r=n===void 0?true:n;return a+" "+(r?f.textarea:"")}function k(e,t,a,n){var r=e.input,i=r===void 0?"":r,l=e.merge,s=l===void 0?true:l;return i+" "+(s?f.radio:"")+" "+(t?f.radioChecked:f.radioUnchecked)+" "+S(a,n)}function T(e){return f.fileInput+" "+(e?f.fileHover:"")}function S(e,t){return e||t?"":"pointer"}function C(e){return(e+256).toString(16).substr(1)}function P(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[C(e[0]),C(e[1]),C(e[2]),C(e[3]),"-",C(e[4]),C(e[5]),"-",C(e[6]),C(e[7]),"-",C(e[8]),C(e[9]),"-",C(e[10]),C(e[11]),C(e[12]),C(e[13]),C(e[14]),C(e[15])].join("")}function q(){return Math.max(window.devicePixelRatio,1)}function U(e,t){return t?""+e+i.requiredLblPost:e}function _(e,t){return t?t:e}function D(e){return e?t("span.mr2.truncate",{title:e,class:f.displayLabel},e):null}function F(e,a,n,r){return n?t("label.mb1.db",{title:n,for:e,class:y(a,r)},U(n,r)):null}function M(e,a,n){return[e?t("i.fa-fw",{class:(a?"mr2":"")+" "+e}):null,a,n?t("i.fa-fw",{class:(a?"ml2":"")+" "+n}):null]}function O(e){return function(t){var a=t.target.value;return e(a)}}function z(e){return function(t){var a=t.target.checked;return e(a)}}function A(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function j(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var i=new Uint8Array(r);for(var l=0;l<r;l++){i[l]=a.charCodeAt(l)}return new Blob([i],{type:n})}function L(e,t){var a=(new Date).valueOf();var n=e;n.name=t;n.lastModified=a;return e}function R(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function H(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var i=a.getUint16(r,false);r+=2;if(i===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var l=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,l);var s=a.getUint16(r,l);r+=2;for(var o=0;o<s;o++){if(a.getUint16(r+o*12,l)===274){return a.getUint16(r+o*12+8,l)}}}else if((i&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function W(e){return new Promise((function(t){var a=new FileReader;a.onload=function(){t(H(a.result))};a.readAsArrayBuffer(e)}))}function V(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function B(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return W(e).then((function(n){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var l=R(i.width,i.height,t),s=l[0],o=l[1];if(n>4){e.width=o;e.height=s}else{e.width=s;e.height=o}var c=e.getContext("2d");V(c,s,o,n);c.drawImage(i,0,0,s,o);r(e.toDataURL(a))};var l=new FileReader;l.onload=function(){return i.src=l.result};l.readAsDataURL(e)}))}))}function E(e,t,a,n){var r=document.createElement("canvas");r.width=t;r.height=a;var i=.56*r.height;var l=r.getContext("2d");l.textBaseline="middle";l.font=i+"px "+n;l.fillText(e,r.height*.05,i);return r.toDataURL()}function Y(e){var t=A(e.name),a=t[1];switch(a.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return i.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return i.videoFileIcn;case".pdf":return i.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return i.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return i.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return i.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return i.imageIcn;default:return i.fileIcn}}function N(e){return e&&e.includes("image")}var Z=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.classes,i=r===void 0?"bg-red":r,l=e.children;return t(".relative.dib",[l,n?t("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:i,style:{minWidth:"0.65rem"}},n):null])};return e}();var $=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.type,i=r===void 0?"button":r,l=a.title,s=l===void 0?n:l,o=a.icon,c=a.rightIcon,u=a.context,d=a.classes,p=d===void 0?"":d,v=a.disabled,m=a.style,g=a.onclick;return t("button.button-reset",{type:i,title:s,disabled:v,class:p+" "+(v?f.disabledWrapper:"pointer")+" "+h(u)+" "+f.button,style:m,onclick:g},M(o,n,c))};return e}();var G=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.title,i=r===void 0?n:r,l=a.icon,s=a.rightIcon,o=a.href,c=a.rel,u=a.target,d=a.download,p=a.context,v=a.classes,m=v===void 0?"":v,g=a.style;return t("a.link.flex.items-center",{href:o,rel:c,target:u,download:d,title:i,class:m+" "+h(p)+" "+f.button,style:g},M(l,n,s))};return e}();var J=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.title,i=r===void 0?n:r,l=a.icon,s=a.rightIcon,o=a.classes,c=o===void 0?"":o,u=a.disabled,d=a.style,p=a.onclick;return t(".mh2.pa2.truncate",{title:i,disabled:u,class:c+" "+(u?f.disabledWrapper:"pointer")+" "+f.navButton,style:d,onclick:p},M(l,n,s))};return e}();var K=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.title,i=r===void 0?n:r,l=a.icon,s=a.rightIcon,o=a.href,c=a.rel,u=a.target,d=a.download,p=a.classes,v=p===void 0?"":p,m=a.style;return t("a.link.mh2.pa2.truncate",{href:o,rel:c,target:u,download:d,title:i,class:v+" "+f.navButton,style:m},M(l,n,s))};return e}();var Q=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field.style,r=a.value;return t(".pa2",{style:n},t.trust(r()))};return e}();var X=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.label,l=n.uiClass,s=l===void 0?{}:l,o=n.style;return t(".pa2.flex.flex-wrap",{class:g(s),style:o},[D(i),t("span.ws-normal",{title:r(),class:f.displayValue},r())])};return e}();function ee(e,t){if(e==="email"){return{href:"mailto:"+t,class:f.displayValue}}else if(e==="tel"){return{href:"tel:"+t,class:f.displayValue}}else{return{href:t,target:"_blank",class:f.displayValue}}}var te={email:i.emailIcn,tel:i.telIcn};var ae=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var l=n.label,s=n.type,o=s===void 0?"url":s,c=n.uiClass,u=c===void 0?{}:c,d=n.style;return t(".pa2.flex.flex-wrap",{class:g(u),style:d},[D(l),t("a.link.dim.pointer.ws-normal",ee(o,r()),t("i.mr2",{class:te[o]||i.linkIcn}),r())])};return e}();var ne=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r.options,s=l===void 0?[]:l;var o=e.find(s,e.matches({value:i()||false}));return o?t("span.ml2",o.label):null};return a}();var re=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var l=n.label,s=n.uiClass,o=s===void 0?{}:s,c=n.style;return t(".pa2.flex.items-center",{class:g(o),style:c},[D(l),t("i",{class:f.displayValue+" "+i[r()?this.onIcon:this.offIcon]}),t(ne,{field:n,value:r})])};return e}();var ie=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var le=function(e){ie(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(re);function se(e,t){if(e.required){return!t}return false}function oe(e,t){if(e.required){return t.length<1}return false}function ce(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function ue(e){return function(t){t.preventDefault();e(false)}}function de(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function fe(e){return function(t){var a=t.target.files;return e(a)}}var pe=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.defaultAccept,l=i===void 0?"*":i,s=n.multiple,o=s===void 0?true:s,c=n.dragging,u=n.onSet,d=a.children;var f=r.label,p=r.id,v=r.name,m=v===void 0?p:v,h=r.title,g=h===void 0?f:h,b=r.required,w=r.readonly,x=r.disabled,I=r.autofocus,k=r.accept,T=k===void 0?l:k,C=r.uiClass,P=C===void 0?{}:C;return t("label.db",e.extend({for:p,title:g,class:S(x,w)},x||w?{}:{ondragover:ce(c),ondragleave:ue(c),ondrop:de(c,u)}),[t("input.clip[type=file].bg-transparent.bn.outline-0",{id:p,name:m,multiple:o,accept:T,required:b,autofocus:I,disabled:x||w,onchange:fe(u)}),f?t("span.db.mb1",{class:y(P,b)},U(f,b)):null,d])};return a}();function ve(t,a){if(a===void 0){a=false}return function(n){var r=a?[]:t();e.each(n,(function(e){r.push({guid:P(),name:e.name,path:"not_set",file:e})}));t(r)}}function me(t,a){return function(n){n.preventDefault();var r=t();e.remove(r,{guid:a});t(r)}}var he=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=r.disabled,o=r.uiClass,c=o===void 0?{}:o;return t("fieldset",{class:g(c,s)},[t(pe,{field:r,dragging:this.dragging,onSet:ve(l)},t("div",{class:b(c,oe(r,l()))},t(".pa2",{class:T(this.dragging())},[t("i.mr2",{class:i.uploadIcn}),t("span",i.addFilesTxt)]))),t(".flex.flex-column.mt1.nb1",e.map(l(),(function(e){return t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:i.downloadIcn}),e.name,t("i.child.fr",{title:i.remFileTtl+" "+e.name,class:i.deleteIcn,onclick:me(l,e.guid)})])})))])};return n}();var ge=function(){function e(){}e.prototype.view=function(e){var a=e.children,n=e.attrs;return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n.src&&n.src!=="not_set"?t("img.contain",{src:n.src}):null,n.data&&n.data.file&&(n.src==="not_set"||!n.src)?t("div.contain.tc.br5.6rem",{class:Y(n.data)+" fa-2x",tooltip:n.data.file.type}):null,a])};return e}();var ye=function(){function e(){}e.prototype.view=function(e){var a=e.attrs;return t("i.pa1",{class:Y(a),title:i.openFileTxt,onclick:a.path!=="not_set"?function(){return window.open(a.path,"_blank")}:undefined})};return e}();var be=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.displayType,l=r===void 0?"thumbnail":r,s=n.value;return l==="thumbnail"?t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),(function(e){return t(ge,{src:_(e.path,e.dataUrl),data:e,style:o()},t(".absolute.top-0.right-0.child",t($,{title:"Remove "+e.name,icon:i.deleteIcn,onclick:me(s,e.guid)})))}))):t(".pa2.flex.flex-column",e.map(s(),(function(e){return t(".flex.items-center.pa1.ba.b--black-20",[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",e.name),t(ye,e),t("i.pa1.pointer.dim",{title:"Remove "+e.name,class:i.cancelIcn,onclick:me(s,e.guid)})])})))};return a}();var we=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r.label,s=r.uiClass,o=s===void 0?{}:s,c=r.style;var u=e.find(r.options,{value:i()});var d=u?u.label||u.value:i();return t(".pa2.flex.flex-wrap",{class:g(o),style:c},[D(l),t("span.ws-normal",{title:d,class:f.displayValue},d)])};return a}();var xe=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=r.label,o=r.uiClass,c=o===void 0?{}:o,u=r.style;return t(".pa2.flex.flex-column",{class:g(c),style:u},[D(s),t(".flex.flex-column.mt1.nb1",e.map(l(),(function(e){var a=e.name,n=e.path;return t("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:f.displayValue,href:n},t("i.mr2",{class:i.downloadIcn}),a)})))])};return a}();var Ie=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r.label,s=r.uiClass,c=s===void 0?{}:s,u=r.style;return t(".pa2.flex.flex-column",{class:g(c),style:u},[D(l),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(i(),(function(e){var a=e.name,n=e.path,r=e.dataUrl;return t(ge,{title:a,src:_(n,r),style:o()})})))])};return a}();var ke=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var o=r.label,c=r.uiClass,u=c===void 0?{}:c,d=r.style;var p=e.head(l());return t(".pa2.flex.flex-column",{class:g(u),style:d},[D(o),p?t("img.img.h-100.mt2.contain.self-center",{title:p.name,src:_(p.path,p.dataUrl),style:s()}):t("i.mt2",{class:f.displayValue+" "+i.imageIcn})])};return a}();function Te(e){var t=0;if(e){if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(/(?=.*[A-Z].*[A-Z])/.test(e)&&/(?=.*[a-z].*[a-z].*[a-z])/.test(e)){t=t+1}if(/(?=.*[0-9].*[0-9])/.test(e)){t=t+1}if(/(?=.*[!"£%^@#$&*])/.test(e)){t=t+1}}}return t}function Se(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}var Ce=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];var Pe=function(){function a(){}a.prototype.oninit=function(e){var t=e.attrs.value;this.passwordScore=t.map((function(e){return Te(String(e))}))};a.prototype.onremove=function(){this.passwordScore.end()};a.prototype.view=function(a){var n=this;var r=a.attrs.field;var i=r.label,l=r.style;return t(".flex.flex-column",{style:l},[D(i),t(".flex.mt1",e.map(Ce,(function(e){return t(".h1.w-20",{class:n.passwordScore()>=e.value?e.background:"bg-transparent"})}))),t("span.f5.truncate",Se(this.passwordScore()))])};return a}();var qe=function(){function e(){}e.prototype.view=function(e){var a=e.attrs.field,n=a.label,r=n===void 0?"":n,i=a.title,l=i===void 0?r:i,s=a.required;return t("label.mb2",{title:l},U(r,s))};return e}();var Ue=function(){function e(){}e.prototype.view=function(e){var a;var n=e.attrs,r=n.field,i=n.value,l=n.xform,s=l===void 0?i:l;var o=r.label,c=r.id,u=r.type,d=u===void 0?"text":u,f=r.name,p=f===void 0?c:f,v=r.title,m=v===void 0?o:v,h=r.placeholder,y=r.max,x=r.maxlength,I=r.min,k=r.minlength,T=r.step,S=r.required,C=r.readonly,P=r.disabled,q=r.autofocus,U=r.autocomplete,_=r.pattern,D=r.inputmode,M=r.spellcheck,z=r.instant,A=r.uiClass,j=A===void 0?{}:A;return t("fieldset",{class:d==="hidden"?"clip":g(j,P)},[F(c,j,o,S),t("div",{class:b(j,se(r,s()))},t("input.w-100.bg-transparent.bn.outline-0",(a={id:c,type:d,name:p,title:m,placeholder:h,max:y,maxlength:x,min:I,minlength:k,step:T,required:S,readonly:C,disabled:P,autofocus:q,autocomplete:U,pattern:_,inputmode:D,spellcheck:M,class:w(j),value:s()},a[z?"oninput":"onchange"]=O(i),a)))])};return e}();var _e=function(){function a(){}a.prototype.view=function(a){var n;var r=a.attrs,i=r.field,l=r.value,s=r.xform,o=s===void 0?l:s;var c=i,u=c.label,d=c.id,f=c.name,p=f===void 0?d:f,v=c.title,m=v===void 0?u:v,h=c.placeholder,y=c.max,x=c.maxlength,I=c.min,k=c.minlength,T=c.step,S=c.required,C=c.readonly,P=c.disabled,q=c.autofocus,U=c.autocomplete,_=c.pattern,D=c.inputmode,M=c.spellcheck,O=c.instant,z=c.uiClass,A=z===void 0?{}:z,j=c.options;var L=j&&j.length?j[0].value:"$";return t("fieldset.flex-shrink-0",{class:g(A,P)},[F(d,A,u,S),t(".flex.items-center",{class:b(A,se(i,o()))},t("span.mr1",L),t("input.w-100.bg-transparent.bn.outline-0",(n={id:d,type:"text",name:p,title:m,placeholder:h,max:y,maxlength:x,min:I,minlength:k,step:T,required:S,readonly:C,disabled:P,autofocus:q,autocomplete:U,pattern:_,inputmode:D,spellcheck:M,class:w(A),value:e.isUndefined(o())?null:Me(De(o()))},n[O?"oninput":"onchange"]=ze(l),n)))])};return a}();function De(t){return e.isString(t)?e.parseInt(t):Number(t)}function Fe(t){var a=t.replace(/[^\d.]/g,"");var n;var r=0;if(a.indexOf(".")>-1){var i=a.indexOf(".");var l=a.substring(0,i);n=e.parseInt(e.padStart(l,1,"0"));var s=a.substring(i+1,Math.min(i+3,a.length));r=e.parseInt(e.padEnd(s,2,"0"))}else{n=e.parseInt(a)||0}return n*100+r}function Me(e){var t=Oe(e);if(t){return t[0]+"."+t[1]}else{return t}}function Oe(t){if(!e.isFinite(t)){return undefined}var a=String(Math.abs(t));var n="0";var r="";if(a.length>2){var i=a.length-2;n=a.substring(0,i);r=a.substring(i)}else{r=e.padStart(a,2,"0")}return[n,r]}function ze(e){return function(t){var a=t.target.value;return e(Fe(a))}}var Ae=function(){function e(){this.month=a();this.year=a();this.date=a.lift((function(e,t){return e+"/"+t}),this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=String(e).split("/"),n=a[0],r=a[1],i=r===void 0?"":r;t.month(n);t.year(i)}));this.date.map((function(e){if(e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.label,l=n.id,s=n.name,o=s===void 0?l:s,u=n.title,d=u===void 0?i:u,f=n.required,p=n.readonly,v=n.disabled,m=n.uiClass,h=m===void 0?{}:m;var y=w(h);return t("fieldset",{class:g(h,v)},[F(l+"-mm",h,i,f),t("div",{title:d,class:b(h,se(n,r()))},[t("div.dib.mr2",[F(l+"-mm",h,"Month"),t("input.w-100.bg-transparent.bn.outline-0",{id:l+"-mm",name:o+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.month(),class:y,style:c,onchange:O(this.month)})]),t("span.mr2","/"),t("div.dib.mr2",[F(l+"-yy",h,"Year"),t("input.w-100.bg-transparent.bn.outline-0",{id:l+"-yy",name:o+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.year(),class:y,style:c,onchange:O(this.year)})])])])};return e}();var je=function(){function n(){this.day=a();this.month=a();this.year=a();this.date=a.lift((function(e,t,a){return a+"-"+t+"-"+e}),this.day,this.month,this.year)}n.prototype.oninit=function(t){var a=this;var n=t.attrs.value;n.map((function(t){var n=new Date(String(t));if(e.isDate(n)&&!isNaN(n.getTime())){a.day(e.padStart(String(n.getDate()),2,"0"));a.month(e.padStart(String(1+n.getMonth()),2,"0"));a.year(String(n.getFullYear()))}}));this.date.map((function(t){var a=new Date(String(t));if(e.isDate(a)&&!isNaN(a.getTime())&&t!==n()){n(t)}}))};n.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};n.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n,l=i.label,s=i.id,o=i.name,d=o===void 0?s:o,f=i.title,p=f===void 0?l:f,v=i.required,m=i.readonly,h=i.disabled,y=i.uiClass,x=y===void 0?{}:y,I=i.options;var k=I&&I.length?I[0].value:"en-GB";var T=w(x);var S=t(".dib.mr2",[F(s+"-dd",x,"Day"),t("input.w-100.bg-transparent.bn.outline-0",{id:s+"-dd",name:d+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:v,readonly:m,disabled:h,value:this.day(),class:T,style:c,onchange:O(this.day)})]);var C=t(".dib.mr2",[F(s+"-mm",x,"Month"),t("input.w-100.bg-transparent.bn.outline-0",{id:s+"-mm",name:d+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:v,readonly:m,disabled:h,value:this.month(),class:T,style:c,onchange:O(this.month)})]);var P=t(".dib.mr2",[F(s+"-yyyy",x,"Year"),t("input.w-100.bg-transparent.bn.outline-0",{id:s+"-yyyy",name:d+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:v,readonly:m,disabled:h,value:this.year(),class:T,style:u,onchange:O(this.year)})]);return t("fieldset",{class:g(x,h)},[F(s,x,l,v),t("div",{id:s,title:p,class:b(x,se(n,r()))},k==="en-US"?[C,S,P]:[S,C,P])])};return n}();var Le=function(){function e(){this.showPassword=a(false)}e.prototype.view=function(e){var a;var n=this;var r=e.attrs,l=r.field,s=r.value;var o=l.label,c=l.id,u=l.name,d=u===void 0?c:u,f=l.title,p=f===void 0?o:f,v=l.placeholder,m=l.maxlength,h=l.minlength,y=l.required,x=l.readonly,I=l.disabled,k=l.autofocus,T=l.autocomplete,S=l.pattern,C=l.inputmode,P=l.instant,q=l.uiClass,U=q===void 0?{}:q;return t("fieldset",{class:g(U,I)},[F(c,U,o,y),t("div.w-100.flex.items-center",{class:b(U,se(l,s()))},t("input.w-100.bg-transparent.bn.outline-0",(a={id:c,name:d,title:p,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:h,required:y,readonly:x,disabled:I,autofocus:k,autocomplete:T,pattern:S,inputmode:C,class:w(U),value:s(),autocorrect:"off"},a[P?"oninput":"onchange"]=O(s),a)),t("i.ml1.pa1.fa-fw.pointer.dim",{title:i.showPassTxt,class:this.showPassword()?i.hidePassIcn:i.showPassIcn,onclick:function(){return n.showPassword(!n.showPassword())}}))])};return e}();var Re=function(){function e(){}e.prototype.view=function(e){var a;var n=e.attrs,r=n.field,i=n.value;var l=r.label,s=r.id,o=r.name,c=o===void 0?s:o,u=r.title,d=u===void 0?l:u,f=r.placeholder,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,y=r.autocomplete,w=r.spellcheck,x=r.instant,k=r.uiClass,T=k===void 0?{}:k;return t("fieldset",{class:g(T,m)},[F(s,T,l,p),t("div",{class:b(T,se(r,i()))},t("textarea.w-100.bg-transparent.bn.outline-0[rows=3]",(a={id:s,name:c,title:d,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:y,spellcheck:w,class:I(T),value:i(),style:{resize:"vertical"}},a[x?"oninput":"onchange"]=O(i),a)))])};return e}();var He=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var l=n.label,s=l===void 0?"":l,o=n.id,c=n.name,u=c===void 0?o:c,d=n.title,f=d===void 0?s:d,p=n.required,v=n.readonly,m=n.disabled,h=n.autocomplete,y=n.uiClass,w=y===void 0?{}:y;return t("fieldset",{class:g(w,m)},t("div",{class:b(w)},[t("label.flex.items-center",{title:f,class:x(w,m,v)},t("input.clip[type=checkbox]",{id:o,name:u,checked:r(),required:p,autocomplete:h,disabled:m||v,onchange:z(r)}),t("i.mr2",{class:i[r()?this.onIcon:this.offIcon]}),U(s,p),t(ne,{field:n,value:r}))]))};return e}();var We=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var Ve=function(e){We(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(He);var Be=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r,s=l.label,o=l.id,c=l.name,u=c===void 0?o:c,d=l.required,f=l.readonly,p=l.disabled,v=l.autocomplete,m=l.options,h=l.uiClass,y=h===void 0?{}:h;return t("fieldset",{class:g(y,p)},[F(o,y,s,d),t("div",{class:b(y,se(r,i())),onchange:O(i)},e.map(m,(function(e){var a=e.value,n=e.label,r=n===void 0?a:n,l=e.icon;var s=i()===a;return t("label.dib",{title:r,class:k(y,s,p,f)},t("input.clip[type=radio]",{name:u,value:a,checked:s,required:d,autocomplete:v,disabled:p||f}),l?t("i.fa-fw",{class:l}):r)})))])};return a}();var Ee=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r,s=l.label,o=l.id,c=l.name,u=c===void 0?o:c,d=l.title,f=d===void 0?s:d,p=l.required,v=l.readonly,m=l.disabled,h=l.autofocus,y=l.autocomplete,x=l.uiClass,I=x===void 0?{}:x,k=l.options;return t("fieldset",{class:g(I,m)},[F(o,I,s,p),t("div",{class:b(I,se(r,i()))},t("select.w-100.bg-transparent.bn.outline-0",{id:o,name:u,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:y,class:w(I),value:i(),onchange:O(i)},e.map(k,(function(e){var a=e.value,n=e.label,r=n===void 0?a:n;return t("option",{value:a,disabled:m||v},r)}))))])};return a}();var Ye=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=e.head(l());var o=r.disabled,c=r.uiClass,u=c===void 0?{}:c;return t("fieldset",{class:g(u,o)},t(pe,{field:r,multiple:false,dragging:this.dragging,onSet:ve(l,true)},t("div",{class:b(u,oe(r,l()))},t(".flex.items-center.pa1",{class:T(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",s?s.name:i.addFileTxt),s?t(ye,s):null,s?t("i.pa1.pointer.dim",{title:"Remove "+s.name,class:i.cancelIcn,onclick:me(l,s.guid)}):null]))))};return n}();function Ne(a,n,r){if(r===void 0){r=false}return function(i){var l=r?[]:a();return Promise.all(e.map(i,(function(e){return B(e,n,e.type).then((function(t){var a=L(j(t),e.name);l.push({guid:P(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){a(l);t.redraw()}))}}var Ze=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=r.disabled,c=r.uiClass,u=c===void 0?{}:c;return t("fieldset",{class:g(u,s)},[t(pe,{field:r,defaultAccept:"image/*",dragging:this.dragging,onSet:Ne(l,i.imageMaxSize)},t("div",{class:b(u,oe(r,l()))},t(".w-100.pa1.dt.tc",{class:T(this.dragging())},t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn})))),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(l(),(function(e){return t(ge,{src:_(e.path,e.dataUrl),style:o()},t(".absolute.top-0.right-0.child",t($,{title:"Remove "+e.name,icon:i.deleteIcn,onclick:me(l,e.guid)})))})))])};return n}();var $e=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var o=e.head(l());var c=r.disabled,u=r.uiClass,d=u===void 0?{}:u;return t("fieldset",{class:g(d,c)},t(pe,{field:r,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Ne(l,i.imageMaxSize,true)},t("div",{class:b(d,oe(r,l()))},t(".pa1",{class:T(this.dragging())},t(".relative.w-100.dt.tc",o?[t("img.img.contain",{title:o.name,src:_(o.path,o.dataUrl),style:s()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+o.name,onclick:me(l,o.guid)},t("i.pa1",{class:i.cancelIcn}))]:t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn}))))))};return n}();var Ge=function(){function a(){}a.prototype.oncreate=function(t){var a=this;var r=t.dom;var i=r.children[0];var l=q();this.signaturePad=new n(i,{minWidth:.5*l,maxWidth:1.5*l});var s=function(){var e=q();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var t=i.getContext("2d");t.scale(e,e);a.resetCanvas()};this.resizeHandler=e.debounce(s,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);s()};a.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};a.prototype.view=function(e){var a=this;var n=e.attrs,r=n.style,l=n.onSet,s=n.onCancel;return[t(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:r},t("canvas.aspect-ratio--object")),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t($,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:function(){if(!a.signaturePad.isEmpty()){l(a.signaturePad.toDataURL("image/png"))}}}),t($,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return a.resetCanvas()}}),t($,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]};a.prototype.resetCanvas=function(){this.signaturePad.clear()};return a}();function Je(e,t){var a=i.signMaxSize;var n=.01*t*a;return E(e,a,n,i.signFont)}function Ke(e,t){return function(){return t(Je(i.stampSetTxt,e))}}var Qe=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.heightPct,r=a.onSet;return[t("span.clip",{style:{"font-family":i.signFont}},i.stampSetTxt),t(".flex",t($,{label:i.stampTxt,classes:"flex-auto "+i.stampBtnClass,context:i.stampBtnContext,onclick:Ke(n,r)}))]};return e}();function Xe(e,t,a){return function(){if(e()){a(Je(e(),t))}return false}}var et=function(){function e(){this.text=a("")}e.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var a=this;var n=e.attrs,r=n.heightPct,l=n.style,s=n.onSet,o=n.onCancel;return[t("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:l,onsubmit:Xe(this.text,r,s)},t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:O(this.text),value:this.text(),style:{"font-family":i.signFont}})),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t($,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:Xe(this.text,r,s)}),t($,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return a.text("")}}),t($,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function tt(e,t){return new Promise((function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=R(n.width,n.height,t),i=r[0],l=r[1];e.width=i;e.height=l;var s=e.getContext("2d");s.drawImage(n,0,0,i,l);a(e.toDataURL())};n.src=e}))}function at(e,a,n){return function(r){return tt(r,n).then((function(n){var r=L(j(n),"sign-"+a+".png");e([{guid:P(),name:r.name,path:"not_set",file:r,dataUrl:n}]);t.redraw()}))}}var nt=function(){function a(){}a.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(){return t.component=undefined}))};a.prototype.view=function(a){var n=this;var r=a.attrs,l=r.field,s=r.value;var o=l,c=o.label,u=o.id,d=o.readonly,p=o.disabled,v=o.uiClass,m=v===void 0?{}:v,h=o.options,y=h===void 0?i.signOpts:h,w=o.heightPct,x=w===void 0?i.signHeightPct:w;var I={paddingBottom:x+"%"};var k=e.head(s());var T=e(y).map((function(e){var t=e.value;if(t==="draw"){return{component:Ge,icon:i.drawIcn,label:i.signDrawTxt}}else if(t==="type"){return{component:et,icon:i.typeIcn,label:i.signTypeTxt}}else if(t==="stamp"){return{component:Qe,icon:i.stampIcn,label:i.signStampTxt}}return null})).compact().value();if(T.length===1&&!k){this.component=T[0].component}return t("fieldset.relative",{class:g(m,p)},[F(u,m,c),t("div",{class:b(m,oe(l,s()))},d||p?t(".aspect-ratio",{id:u,style:I},k?t(".aspect-ratio--object",t("img.img.w-100.absolute",{src:_(k.path,k.dataUrl)})):null):this.component?t(this.component,{heightPct:x,style:I,onSet:at(s,u,i.signMaxSize),onCancel:function(){return n.component=undefined}}):t(".aspect-ratio.pointer",{id:u,class:f.fileInput,style:I},k?t(".aspect-ratio--object.hide-child.dim",{onclick:function(){return s([])}},[t("img.img.w-100.absolute",{src:_(k.path,k.dataUrl)}),t(".pa3.absolute.top-0.right-0.child",t("i.fa-2x",{class:i.resetIcn}))]):t(".aspect-ratio--object.flex.items-stretch.justify-center",e.map(T,(function(e){var a=e.component,r=e.icon,i=e.label;return t(".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return n.component=a}},t("i.fa-2x.ma1",{class:r}),t("span.ma1",i))})))))])};return a}();function rt(a,n){return function(r){var l=n?[]:a();return Promise.all(e.map(r,(function(e){if(N(e.type)){return B(e,i.imageMaxSize,e.type).then((function(t){var a=L(j(t),e.name);l.push({guid:P(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}else{l.push({guid:P(),name:e.name,path:"not_set",file:e});return Promise.resolve()}}))).then((function(){a(l);t.redraw()}))}}var it=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var o=e.head(l());var c=r.disabled,u=r.uiClass,d=u===void 0?{}:u;return t("fieldset",{class:g(d,c)},t(pe,{field:r,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:rt(l,true)},t("div",{class:b(d,oe(r,l()))},t(".flex.items-center.pa1",{class:T(this.dragging())},o?o.dataUrl?[t(".relative.w-100.dt.tc",t("img.img.contain",{title:o.name,src:_(o.path,o.dataUrl),style:s()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+o.name,onclick:me(l,o.guid)},t("i.pa1",{class:i.cancelIcn})))]:[t(ye,o),t("span.ma1.flex-auto",o.name),t("i.pa1.pointer.dim",{title:"Remove "+o.name,class:i.cancelIcn,onclick:me(l,o.guid)})]:[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))))};return n}();var lt=function(){function e(){this.dragging=a(false)}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value,l=a.displayType,s=l===void 0?"thumbnail":l,o=a.showDisplay,c=o===void 0?true:o;var u=n.disabled,d=n.uiClass,f=d===void 0?{}:d;return t("fieldset",{class:g(f,u)},[t(pe,{field:n,defaultAccept:"*",dragging:this.dragging,onSet:rt(r,false)},t("div",{class:b(f,oe(n,r()))},t(".flex.items-center.pa1.dt",{class:T(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))),c?t(be,{displayType:s,value:r}):null])};return e}();export{Z as Badge,Ue as BaseInput,X as BaseText,$ as Button,G as ButtonLink,Ae as CardDateInput,re as Checkbox,He as CheckboxInput,_e as CurrencyInput,je as DateInput,be as DisplayTypeComponent,xe as FileList,he as FileMulti,Ye as FileSelect,Ie as ImageList,Ze as ImageMulti,ke as ImagePreview,$e as ImageSelect,qe as Label,ae as Link,lt as MultiOmniFileInput,J as NavButton,K as NavLink,it as OmniFileInput,Le as PasswordInput,Pe as PasswordStrength,Be as RadioInput,Ee as SelectInput,we as SelectText,nt as SignBuilder,Re as TextareaInput,le as Toggle,Ve as ToggleInput,Q as Trusted,Fe as currencyStrToNumber,A as fileNameExtSplit,P as guid,te as iconMap,ee as linkAttrs,Me as numberToCurrencyStr,Oe as numberToCurrencyTuple,m as updateButtonContext,p as updateClasses,l as updateConfig};
