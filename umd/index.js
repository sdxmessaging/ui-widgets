(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril/stream"),require("mithril"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril/stream","mithril","signature_pad"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiWidgets={},e._,e.m.stream,e.m,e.SignaturePad))})(this,(function(e,t,a,n,r){"use strict";function i(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var l=i(t);var o=i(a);var s=i(n);var u=i(r);var c={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",toggleOnIcn:"fa fa-toggle-on",toggleOffIcn:"fa fa-toggle-off",showPassIcn:"fa fa-eye",hidePassIcn:"fa fa-eye-slash",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link",wordDocIcn:"fa-file-word",videoFileIcn:"fa-file-video",pdfFileIcn:"fa-file-pdf",musicFileIcn:"fa-file-audio",excelFileIcn:"fa-file-excel",fileIcn:"fa-file",codeFileIcn:"fa-file-code"};var d=c;function f(e){l["default"].assign(c,e)}function p(){return{"max-height":d.imageDispHeight}}function v(){return{"max-height":d.thumbDispHeight}}var m={"max-width":"5.4ex"};var h={"max-width":"9ex"};var g={icon:o["default"]("fas"),lblCol:o["default"]("silver"),lblFnt:o["default"]("f6"),dspFnt:o["default"]("truncate"),dspBrd:o["default"]("bb b--black-20"),inpHgt:o["default"]("h2"),inpCol:o["default"]("dark-gray"),inpFnt:o["default"]("fw2"),inpBrd:o["default"]("bn"),actCol:o["default"]("dark-gray"),actBg:o["default"]("bg-light-blue"),filBrd:o["default"]("ba bw1 br3 b--dashed"),filBrdCol:o["default"]("b--black-30"),drgCol:o["default"]("blue"),drgBrdCol:o["default"]("b--blue"),btnBg:o["default"]("bg-light-blue"),btnCol:o["default"]("dark-gray"),btnFnt:o["default"](""),btnPad:o["default"]("pa2"),btnBrd:o["default"]("bn br2")};function b(e){return e.join(" ")}function y(e,t){if(t===void 0){t=[]}return o["default"].merge(l["default"].concat(l["default"].map(e,(function(e){return g[e]})),t)).map(b)}var w=y(["lblCol","dspFnt"]);var x=y(["lblCol","lblFnt"]);var I=y(["inpCol","inpFnt"]);var k=y(["inpBrd"],[I]);var C=y(["inpHgt"],[k]);var S=y(["actCol","actBg"]);var T=y(["filBrd","filBrdCol"],[I]);var P=y(["inpFnt","filBrd","drgCol","drgBrdCol"]);var F=y(["btnBg","btnCol","btnFnt","btnPad","btnBrd"]);var B=y(["btnCol","btnFnt"]);function q(e){l["default"].forEach(e,(function(e,t){if(e&&t in g){g[t](e)}}))}function _(e){return g.icon()+" "+e}var D={};function M(e){l["default"].assign(D,e)}function U(e){if(e&&e in D){return D[e]}else{return F()}}function O(e){return(e+256).toString(16).substr(1)}function j(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[O(e[0]),O(e[1]),O(e[2]),O(e[3]),"-",O(e[4]),O(e[5]),"-",O(e[6]),O(e[7]),"-",O(e[8]),O(e[9]),"-",O(e[10]),O(e[11]),O(e[12]),O(e[13]),O(e[14]),O(e[15])].join("")}function z(){return Math.max(window.devicePixelRatio,1)}function A(e,t){return t?e+"*":e}function L(e,t){return t?t:e}function H(e){return e?s["default"]("span.mr2.truncate",{title:e,class:w()},e):null}function E(e,t,a){return t?s["default"]("label.mb1.db",{title:t,for:e,class:x()},A(t,a)):null}function R(e,t,a){return[e?s["default"]("i.fa-fw",{class:(t?"mr2":"")+" "+_(e)}):null,t,a?s["default"]("i.fa-fw",{class:(t?"ml2":"")+" "+_(a)}):null]}function Y(e,t){return e?"o-60":t?"":"pointer"}function N(e){return function(t){var a=t.target.value;return e(a)}}function W(e){return function(t){var a=t.target.checked;return e(a)}}function V(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function $(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var i=new Uint8Array(r);for(var l=0;l<r;l++){i[l]=a.charCodeAt(l)}return new Blob([i],{type:n})}function G(e,t){var a=(new Date).valueOf();var n=e;n.name=t;n.lastModified=a;return e}function J(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function K(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var i=a.getUint16(r,false);r+=2;if(i===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var l=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,l);var o=a.getUint16(r,l);r+=2;for(var s=0;s<o;s++){if(a.getUint16(r+s*12,l)===274){return a.getUint16(r+s*12+8,l)}}}else if((i&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function Q(e){return new Promise((function(t){var a=new FileReader;a.onload=function(){t(K(a.result))};a.readAsArrayBuffer(e)}))}function X(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function Z(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return Q(e).then((function(n){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var l=J(i.width,i.height,t),o=l[0],s=l[1];if(n>4){e.width=s;e.height=o}else{e.width=o;e.height=s}var u=e.getContext("2d");X(u,o,s,n);u.drawImage(i,0,0,o,s);r(e.toDataURL(a))};var l=new FileReader;l.onload=function(){return i.src=l.result};l.readAsDataURL(e)}))}))}function ee(e,t,a,n){var r=document.createElement("canvas");r.width=t;r.height=a;var i=.56*r.height;var l=r.getContext("2d");l.textBaseline="middle";l.font=i+"px "+n;l.fillText(e,r.height*.05,i);return r.toDataURL()}var te=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.classes,r=n===void 0?"bg-red":n,i=e.children;return s["default"](".relative.dib",[i,a?s["default"]("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:r,style:{minWidth:"0.65rem"}},a):null])};return e}();var ae=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.type,r=n===void 0?"button":n,i=t.title,l=i===void 0?a:i,o=t.icon,u=t.rightIcon,c=t.context,d=t.classes,f=d===void 0?"":d,p=t.disabled,v=t.style,m=t.onclick;return s["default"]("button.button-reset",{type:r,title:l,disabled:p,class:Y(p)+" "+U(c)+" "+f,style:v,onclick:m},R(o,a,u))};return e}();var ne=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,i=t.icon,l=t.rightIcon,o=t.href,u=t.rel,c=t.target,d=t.download,f=t.context,p=t.classes,v=p===void 0?"":p,m=t.style;return s["default"]("a.link",{href:o,rel:u,target:c,download:d,title:r,class:U(f)+" "+v,style:m},R(i,a,l))};return e}();var re=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,i=t.icon,l=t.rightIcon,o=t.classes,u=o===void 0?"":o,c=t.disabled,d=t.style,f=t.onclick;return s["default"](".mh2.pa2.truncate",{title:r,disabled:c,class:Y(c)+" "+B()+" "+u,style:d,onclick:f},R(i,a,l))};return e}();var ie=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,i=t.icon,l=t.rightIcon,o=t.href,u=t.rel,c=t.target,d=t.download,f=t.classes,p=f===void 0?"":f,v=t.style;return s["default"]("a.link.mh2.pa2.truncate",{href:o,rel:u,target:c,download:d,title:r,class:B()+" "+p,style:v},R(i,a,l))};return e}();var le=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=a.classes,r=a.style,i=t.value;return s["default"](".pa2",{class:n,style:r},s["default"].trust(i()))};return e}();var oe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,l=i===void 0?"":i,o=a.style;return s["default"](".pa2.flex.flex-wrap",{class:g.dspBrd()+" "+l,style:o},[H(r),s["default"]("span.ws-normal",{title:n(),class:I()},n())])};return e}();function se(e,t){if(e==="email"){return{href:"mailto:"+t,class:I()}}else if(e==="tel"){return{href:"tel:"+t,class:I()}}else{return{href:t,target:"_blank",class:I()}}}var ue={email:d.emailIcn,tel:d.telIcn};var ce=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.type,l=i===void 0?"url":i,o=a.classes,u=o===void 0?"":o,c=a.style;return s["default"](".pa2.flex.flex-wrap",{class:g.dspBrd()+" "+u,style:c},[H(r),s["default"]("a.link.dim.pointer.ws-normal",se(l,n()),s["default"]("i.mr2",{class:_(ue[l]||d.linkIcn)}),n())])};return e}();var de=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.options,i=r===void 0?[]:r;var o=l["default"].find(i,l["default"].matches({value:n()||false}));return o?s["default"]("span.ml2",o.label):null};return e}();var fe=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,l=i===void 0?"":i,o=a.style;return s["default"](".pa2.flex.items-center",{class:g.dspBrd()+" "+w()+" "+l,style:o},[H(r),s["default"]("i",{class:g.inpCol()+" "+_(d[n()?this.onIcon:this.offIcon])}),s["default"](de,{field:a,value:n})])};return e}();var pe=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var ve=function(e){pe(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(fe);var me=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,o=i===void 0?"":i,u=a.style;var c=l["default"].find(a.options,{value:n()});var d=c?c.label||c.value:n();return s["default"](".pa2.flex.flex-wrap",{class:g.dspBrd()+" "+o,style:u},[H(r),s["default"]("span.ws-normal",{title:d,class:I()},d)])};return e}();var he=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,o=i===void 0?"":i,u=a.style;return s["default"](".pa2.flex.flex-column",{class:g.dspBrd()+" "+o,style:u},[H(r),s["default"](".flex.flex-column.mt1.nb1",l["default"].map(n(),(function(e){var t=e.name,a=e.path;return s["default"](".ba.b--black-20",{class:I()},[s["default"]("a.pa2.mv1.link.b--black-20.dim.dib.pointer[target=_blank]",s["default"]("i.mr2",{href:a,class:_(d.downloadIcn)}),t)])})))])};return e}();var ge=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return s["default"](".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[s["default"]("img.contain",a),t])};return e}();var be=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,o=i===void 0?"":i,u=a.style;return s["default"](".pa2.flex.flex-column",{class:g.dspBrd()+" "+o,style:u},[H(r),s["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",l["default"].map(n(),(function(e){var t=e.name,a=e.path,n=e.dataUrl;return s["default"](ge,{title:t,src:L(a,n),style:v()})})))])};return e}();var ye=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,o=i===void 0?"":i,u=a.style;var c=l["default"].head(n());return s["default"](".pa2.flex.flex-column",{class:g.dspBrd()+" "+o,style:u},[H(r),c?s["default"]("img.img.h-100.mt2.contain.self-center",{title:c.name,src:L(c.path,c.dataUrl),style:p()}):s["default"]("i.mt2",{class:g.inpCol()+" "+_(d.imageIcn)})])};return e}();function we(e){var t=0;if(e){if(e.length>=8){t=t+1}if(e.length>=24){t=t+1}if(/\d/.test(e)){t=t+1}if(/^(?=.*[!@#$%^&*])$/.test(e)){t=t+1}}return t}function xe(e){switch(e){case 0:{return"Very Weak"}case 1:{return"Weak"}case 2:{return"Average"}case 3:{return"Strong"}case 4:{return"Very Strong"}}return""}var Ie=[{value:0,background:"bg-dark-red"},{value:1,background:"bg-orange"},{value:2,background:"bg-yellow"},{value:3,background:"bg-light-green"},{value:4,background:"bg-green"}];var ke=function(){function e(){}e.prototype.oninit=function(e){var t=e.attrs.value;this.passwordScore=t.map((function(e){return we(String(e))}))};e.prototype.onremove=function(){this.passwordScore.end()};e.prototype.view=function(e){var t=this;var a=e.attrs.field;var n=a.label;return[H(n),s["default"](".w-100.dib",l["default"].map(Ie,(function(e){return s["default"]("div.h1.w-20.dib",{class:t.passwordScore()>=e.value?e.background:"bg-grey"})}))),s["default"](".w-100.f5",xe(this.passwordScore()))]};return e}();var Ce=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,n=a===void 0?"":a,r=t.title,i=r===void 0?n:r,l=t.required;return s["default"]("label.mb2",{title:i},A(n,l))};return e}();var Se=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value,i=a.xform,l=i===void 0?r:i;var o=n.label,u=n.id,c=n.type,d=c===void 0?"text":c,f=n.name,p=f===void 0?u:f,v=n.title,m=v===void 0?o:v,h=n.placeholder,g=n.max,b=n.maxlength,y=n.min,w=n.minlength,x=n.step,I=n.required,k=n.readonly,S=n.disabled,T=n.autofocus,P=n.autocomplete,F=n.pattern,B=n.inputmode,q=n.spellcheck,_=n.instant,D=n.containerClass,M=n.classes,U=M===void 0?"":M;return[E(u,o,I),s["default"](".w-100",{class:D},s["default"]("input.input-reset.border-box.w-100",(t={id:u,type:d,name:p,title:m,placeholder:h,max:g,maxlength:b,min:y,minlength:w,step:x,required:I,readonly:k,disabled:S,autofocus:T,autocomplete:P,pattern:F,inputmode:B,spellcheck:q,value:l(),class:Y(S,true)+" "+C()+" "+U},t[_?"oninput":"onchange"]=N(r),t)))]};return e}();var Te=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value,i=a.xform,o=i===void 0?r:i;var u=n,c=u.label,d=u.id,f=u.name,p=f===void 0?d:f,v=u.title,m=v===void 0?c:v,h=u.placeholder,g=u.max,b=u.maxlength,y=u.min,w=u.minlength,x=u.step,k=u.required,S=u.readonly,T=u.disabled,P=u.autofocus,F=u.autocomplete,B=u.pattern,q=u.inputmode,_=u.spellcheck,D=u.instant,M=u.containerClass,U=u.classes,O=U===void 0?"":U,j=u.options;var z=j&&j.length?j[0].value:"$";return[E(d,c,k),s["default"](".w-100",{class:M},s["default"](".w-100.flex.items-center",{class:C(),style:{"flex-shrink":0}},[s["default"]("span.mr1",z),s["default"]("input.input-reset.border-box.flex-auto.bg-transparent.bn",(t={id:d,type:"text",name:p,title:m,placeholder:h,max:g,maxlength:b,min:y,minlength:w,step:x,required:k,readonly:S,disabled:T,autofocus:P,autocomplete:F,pattern:B,inputmode:q,spellcheck:_,value:l["default"].isUndefined(o())?null:Be(Pe(o())),class:Y(T,true)+" "+I()+" "+O},t[D?"oninput":"onchange"]=_e(r),t))]))]};return e}();function Pe(e){return l["default"].isString(e)?l["default"].parseInt(e):Number(e)}function Fe(e){var t=e.replace(/[^\d.]/g,"");var a;var n=0;if(t.indexOf(".")>-1){var r=t.indexOf(".");var i=t.substring(0,r);a=l["default"].parseInt(l["default"].padStart(i,1,"0"));var o=t.substring(r+1,Math.min(r+3,t.length));n=l["default"].parseInt(l["default"].padEnd(o,2,"0"))}else{a=l["default"].parseInt(t)||0}return a*100+n}function Be(e){var t=qe(e);if(t){return t[0]+"."+t[1]}else{return t}}function qe(e){if(!l["default"].isFinite(e)){return undefined}var t=String(Math.abs(e));var a="0";var n="";if(t.length>2){var r=t.length-2;a=t.substring(0,r);n=t.substring(r)}else{n=l["default"].padStart(t,2,"0")}return[a,n]}function _e(e){return function(t){var a=t.target.value;return e(Fe(a))}}var De=function(){function e(){this.month=o["default"]();this.year=o["default"]();this.date=o["default"].lift((function(e,t){return e+"/"+t}),this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=String(e).split("/"),n=a[0],r=a[1],i=r===void 0?"":r;t.month(n);t.year(i)}));this.date.map((function(e){if(e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t.label,n=t.id,r=t.name,i=r===void 0?n:r,l=t.title,o=l===void 0?a:l,u=t.required,c=t.readonly,d=t.disabled,f=t.containerClass,p=t.classes,v=p===void 0?"":p;var h=Y(d,true)+" "+C()+" "+v;return[E(n,a,u),s["default"](".w-100",{id:n,title:o,class:f},[s["default"](".dib.mr2",[E(n+"-mm","Month"),s["default"]("input.input-reset.border-box",{id:n+"-mm",name:i+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:c,disabled:d,value:this.month(),class:h,style:m,onchange:N(this.month)})]),s["default"]("span.mr2",{class:I()},"/"),s["default"](".dib.mr2",[E(n+"-yy","Year"),s["default"]("input.input-reset.border-box",{id:n+"-yy",name:i+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:c,disabled:d,value:this.year(),class:h,style:m,onchange:N(this.year)})])])]};return e}();var Me=function(){function e(){this.day=o["default"]();this.month=o["default"]();this.year=o["default"]();this.date=o["default"].lift((function(e,t,a){return a+"-"+t+"-"+e}),this.day,this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=new Date(String(e));if(l["default"].isDate(a)&&!isNaN(a.getTime())){t.day(l["default"].padStart(String(a.getDate()),2,"0"));t.month(l["default"].padStart(String(1+a.getMonth()),2,"0"));t.year(String(a.getFullYear()))}}));this.date.map((function(e){var t=new Date(String(e));if(l["default"].isDate(t)&&!isNaN(t.getTime())&&e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t,n=a.label,r=a.id,i=a.name,l=i===void 0?r:i,o=a.title,u=o===void 0?n:o,c=a.required,d=a.readonly,f=a.disabled,p=a.containerClass,v=a.classes,g=v===void 0?"":v,b=a.options;var y=b&&b.length?b[0].value:"en-GB";var w=Y(f,true)+" "+C()+" "+g;var x=s["default"](".dib.mr2",[E(r+"-dd","Day"),s["default"]("input.input-reset.border-box",{id:r+"-dd",name:l+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.day(),class:w,style:m,onchange:N(this.day)})]);var I=s["default"](".dib.mr2",[E(r+"-mm","Month"),s["default"]("input.input-reset.border-box",{id:r+"-mm",name:l+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.month(),class:w,style:m,onchange:N(this.month)})]);var k=s["default"](".dib.mr2",[E(r+"-yyyy","Year"),s["default"]("input.input-reset.border-box",{id:r+"-yyyy",name:l+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:c,readonly:d,disabled:f,value:this.year(),class:w,style:h,onchange:N(this.year)})]);return[E(r,n,c),s["default"](".w-100",{id:r,title:u,class:p},y==="en-US"?[I,x,k]:[x,I,k])]};return e}();var Ue=function(){function e(){this.showPassword=o["default"](false)}e.prototype.view=function(e){var t;var a=this;var n=e.attrs,r=n.field,i=n.value;var l=r.label,o=r.id,u=r.name,c=u===void 0?o:u,f=r.title,p=f===void 0?l:f,v=r.placeholder,m=r.maxlength,h=r.minlength,g=r.required,b=r.readonly,y=r.disabled,w=r.autofocus,x=r.autocomplete,k=r.instant,S=r.containerClass,T=r.classes,P=T===void 0?"":T;return[E(o,l,g),s["default"](".w-100",{class:S},s["default"](".w-100.flex.items-center",{class:C()},s["default"]("input.input-reset.border-box.flex-auto.bg-transparent.bn",(t={id:o,name:c,title:p,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:h,required:g,readonly:b,disabled:y,autofocus:w,autocomplete:x,value:i(),class:Y(y,true)+" "+I()+" "+P,autocorrect:"off"},t[k?"oninput":"onchange"]=N(i),t)),s["default"]("i.ml1.pa1.fa-fw.pointer.dim",{title:d.showPassTxt,class:_(this.showPassword()?d.hidePassIcn:d.showPassIcn),onclick:function(){return a.showPassword(!a.showPassword())}})))]};return e}();var Oe=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value;var i=n.label,l=n.id,o=n.name,u=o===void 0?l:o,c=n.title,d=c===void 0?i:c,f=n.placeholder,p=n.required,v=n.readonly,m=n.disabled,h=n.autofocus,g=n.autocomplete,b=n.spellcheck,y=n.instant,w=n.containerClass,x=n.classes,I=x===void 0?"":x;return[E(l,i,p),s["default"]("div",{class:w},s["default"]("textarea.border-box.w-100[rows=3]",(t={id:l,name:u,title:d,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,spellcheck:b,value:r(),class:Y(m,true)+" "+k()+" "+I,style:{resize:"vertical"}},t[y?"oninput":"onchange"]=N(r),t)))]};return e}();var je=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=r===void 0?"":r,l=a.id,o=a.name,u=o===void 0?l:o,c=a.title,f=c===void 0?i:c,p=a.required,v=a.readonly,m=a.disabled,h=a.autocomplete,g=a.containerClass,b=g===void 0?"":g,y=a.classes,w=y===void 0?"":y;return s["default"]("div",{class:I()+" "+b},s["default"]("label.flex.items-center",{title:f,class:Y(m,v)+" "+w},s["default"]("input.clip[type=checkbox]",{id:l,name:u,checked:n(),required:p,autocomplete:h,disabled:m||v,onchange:W(n)}),A(i,p),s["default"]("i.ml2",{class:_(d[n()?this.onIcon:this.offIcon])}),s["default"](de,{field:a,value:n})))};return e}();var ze=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function n(){this.constructor=t}t.prototype=a===null?Object.create(a):(n.prototype=a.prototype,new n)}}();var Ae=function(e){ze(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(je);var Le=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a,i=r.label,o=r.id,u=r.name,c=u===void 0?o:u,d=r.required,f=r.readonly,p=r.disabled,v=r.autocomplete,m=r.containerClass,h=m===void 0?"flex-wrap":m,b=r.classes,y=b===void 0?"":b,w=r.options;return[E(o,i,d),s["default"](".flex",{class:I()+" "+h,onchange:N(n)},l["default"].map(w,(function(e){var t=e.value,a=e.label,r=a===void 0?t:a,i=e.icon;var l=n()===t;return s["default"]("label.flex.items-center",{title:r,class:Y(p,f)+" "+(l?S():"dim")+" "+g.btnBrd()+" "+y},s["default"]("input.clip[type=radio]",{name:c,value:t,checked:l,required:d,autocomplete:v,disabled:p||f}),i?s["default"]("i.fa-fw",{class:_(i)}):r)})))]};return e}();var He=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a,i=r.label,o=r.id,u=r.name,c=u===void 0?o:u,d=r.title,f=d===void 0?i:d,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,g=r.autocomplete,b=r.containerClass,y=r.classes,w=y===void 0?"":y,x=r.options;return[E(o,i,p),s["default"](".w-100",{class:b},s["default"]("select.input-reset.border-box.w-100",{id:o,name:c,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,value:n(),class:Y(m,v)+" "+C()+" "+w,onchange:N(n)},l["default"].map(x,(function(e){var t=e.value,a=e.label,n=a===void 0?t:a;return s["default"]("option",{value:t,disabled:m||v},n)}))))]};return e}();function Ee(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function Re(e){return function(t){t.preventDefault();e(false)}}function Ye(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function Ne(e){return function(t){var a=t.target.files;return e(a)}}var We=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.defaultAccept,n=a===void 0?"*":a,r=t.field,i=r.label,o=r.id,u=r.name,c=u===void 0?o:u,d=r.title,f=d===void 0?i:d,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,g=r.accept,b=g===void 0?n:g,y=r.containerClass,w=y===void 0?"":y,I=t.multiple,k=I===void 0?true:I,C=t.dragging,S=t.onSet,T=e.children;return s["default"]("label.db",l["default"].extend({for:o,title:f,class:Y(m,v)+" "+w},m||v?{}:{ondragover:Ee(C),ondragleave:Re(C),ondrop:Ye(C,S)}),[s["default"]("input.clip[type=file]",{id:o,name:c,multiple:k,accept:b,required:p,autofocus:h,disabled:m||v,onchange:Ne(S)}),i?s["default"]("span.db.mb1",{class:x()},A(i,p)):null,T])};return e}();function Ve(e,t){if(t===void 0){t=false}return function(a){var n=t?[]:e();l["default"].each(a,(function(e){n.push({guid:j(),name:e.name,path:"not_set",file:e})}));e(n)}}function $e(e,t){return function(a){a.preventDefault();var n=e();l["default"].remove(n,{guid:t});e(n)}}var Ge=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;return[s["default"](We,{field:a,dragging:this.dragging,onSet:Ve(n)},s["default"](".pa2",{class:this.dragging()?P():T()},[s["default"]("i.mr2",{class:_(d.uploadIcn)}),s["default"]("span",d.addFilesTxt)])),s["default"](".flex.flex-column.mt1.nb1",l["default"].map(n(),(function(e){return s["default"]("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[s["default"]("i.mr2",{class:_(d.downloadIcn)}),e.name,s["default"]("i.child.fr",{title:d.remFileTtl+" "+e.name,class:_(d.deleteIcn),onclick:$e(n,e.guid)})])})))]};return e}();var Je=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=l["default"].head(n());return s["default"](We,{field:a,multiple:false,dragging:this.dragging,onSet:Ve(n,true)},s["default"](".flex.items-center.pa1.ba.b--black-20",{class:this.dragging()?P():T()},[s["default"]("i.pa1",{class:_(d.uploadIcn)}),s["default"]("span.ma1.flex-auto",r?r.name:d.addFileTxt),r?s["default"]("i.pa1",{class:_(this.checkConfigForIcon(r)),title:"Click to view file in new tab",onclick:r.path!=="not_set"?function(){return window.open(r.path,"_blank")}:undefined}):null,r?s["default"]("i.pa1.pointer.dim",{title:"Remove "+r.name,class:_(d.cancelIcn),onclick:$e(n,r.guid)}):null]))};e.prototype.checkConfigForIcon=function(e){var t="";if(e){var a=this.fileExtension(e).toLowerCase();switch(a){case"doc":case"docx":case"dot":case"wbk":case"docm":case"dotx":case"dotm":case"docb":case"txt":{t=d.wordDocIcn;break}case"webm":case"mkv":case"flv":case"vob":case"ogv":case"drc":case"gifv":case"mng":case"avi":case"mts":case"m2ts":case"mov":case"qt":case"wmv":case"yuv":case"rm":case"rmvb":case"viv":case"asf":case"amv":case"mp4":case"m4p":case"m4v":case"mpg":case"mp2":case"mpeg":case"mpe":case"mpv":case"m2v":case"svi":case"3gp":case"mxf":case"roq":case"nsv":case"f4v":case"f4p":case"f4a":case"f4b":{t=d.videoFileIcn;break}case"pdf":{t=d.pdfFileIcn;break}case"pcm":case"wav":case"aiff":case"mp3":case"aac":case"ogg":case"wma":case"flac":case"alac":{t=d.musicFileIcn;break}case"xls":case"xlt":case"xlm":case"xlsx":case"xlsm":case"xltx":case"xltm":case"xlsb":case"xla":case"xlam":case"xll":case"xlw":{t=d.excelFileIcn;break}case"html":case"js":case"css":case"scss":case"java":{t=d.codeFileIcn;break}case"jpg":case"jpeg":case"png":case"tiff":case"gif":case"svg":case"webp":{t=d.imageIcn;break}default:{t=d.fileIcn;break}}}return t};e.prototype.fileExtension=function(e){var t=e.name.split(".");var a=t.length-1;var n=t[a];return n};return e}();function Ke(e,t,a){if(a===void 0){a=false}return function(n){var r=a?[]:e();return Promise.all(l["default"].map(n,(function(e){return Z(e,t,e.type).then((function(t){var a=G($(t),e.name);r.push({guid:j(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){e(r);s["default"].redraw()}))}}var Qe=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.classes,i=r===void 0?"":r;return[s["default"](We,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:Ke(n,d.imageMaxSize)},s["default"](".w-100.pa1.dt.tc",{class:(this.dragging()?P():T())+" "+i},s["default"]("i.fa-2x.dtc.v-mid",{class:_(d.cameraIcn)}))),s["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",l["default"].map(n(),(function(e){return s["default"](ge,{src:L(e.path,e.dataUrl),style:v()},s["default"](".absolute.top-0.right-0.child",s["default"](ae,{title:"Remove "+e.name,icon:d.deleteIcn,onclick:$e(n,e.guid)})))})))]};return e}();var Xe=function(){function e(){this.dragging=o["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=l["default"].head(n());var i=a.classes,o=i===void 0?"":i;return s["default"](We,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Ke(n,d.imageMaxSize,true)},s["default"](".relative.w-100.pa1.contain.dt.tc",{class:(this.dragging()?P():T())+" "+o},r?[s["default"]("img.img.contain",{title:r.name,src:L(r.path,r.dataUrl),style:p()}),s["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+r.name,onclick:$e(n,r.guid)},s["default"]("i.pa1",{class:_(d.cancelIcn)}))]:s["default"]("i.fa-2x.dtc.v-mid",{class:_(d.cameraIcn)})))};return e}();var Ze=function(){function e(){}e.prototype.oncreate=function(e){var t=this;var a=e.dom;var n=a.children[0];var r=z();this.signaturePad=new u["default"](n,{minWidth:.5*r,maxWidth:1.5*r});var i=function(){var e=z();n.width=n.offsetWidth*e;n.height=n.offsetHeight*e;var a=n.getContext("2d");a.scale(e,e);t.resetCanvas()};this.resizeHandler=l["default"].debounce(i,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);i()};e.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.style,r=a.onSet,i=a.onCancel;return[s["default"](".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:n},s["default"]("canvas.aspect-ratio--object")),s["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[s["default"](ae,{title:d.applyTtl,icon:d.applyIcn,classes:"ma1",onclick:function(){if(!t.signaturePad.isEmpty()){r(t.signaturePad.toDataURL("image/png"))}}}),s["default"](ae,{title:d.resetTtl,icon:d.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),s["default"](ae,{title:d.cancelTtl,icon:d.cancelIcn,classes:"ma1",onclick:i})])]};e.prototype.resetCanvas=function(){this.signaturePad.clear()};return e}();function et(e,t){var a=d.signMaxSize;var n=.01*t*a;return ee(e,a,n,d.signFont)}function tt(e,t){return function(){return t(et(d.stampSetTxt,e))}}var at=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.heightPct,n=t.onSet;return[s["default"]("span.clip",{style:{"font-family":d.signFont}},d.stampSetTxt),s["default"](ae,{label:d.stampTxt,classes:"w-100",onclick:tt(a,n)})]};return e}();function nt(e,t,a){return function(){if(e()){a(et(e(),t))}return false}}var rt=function(){function e(){this.text=o["default"]("")}e.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.heightPct,r=a.style,i=a.onSet,l=a.onCancel;return[s["default"]("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:r,onsubmit:nt(this.text,n,i)},s["default"]("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:N(this.text),value:this.text(),style:{"font-family":d.signFont}})),s["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[s["default"](ae,{title:d.applyTtl,icon:d.applyIcn,classes:"ma1",onclick:nt(this.text,n,i)}),s["default"](ae,{title:d.resetTtl,icon:d.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),s["default"](ae,{title:d.cancelTtl,icon:d.cancelIcn,classes:"ma1",onclick:l})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function it(e,t){return new Promise((function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=J(n.width,n.height,t),i=r[0],l=r[1];e.width=i;e.height=l;var o=e.getContext("2d");o.drawImage(n,0,0,i,l);a(e.toDataURL())};n.src=e}))}function lt(e,t,a){return function(n){return it(n,a).then((function(a){var n=G($(a),"sign-"+t+".png");e([{guid:j(),name:n.name,path:"not_set",file:n,dataUrl:a}]);s["default"].redraw()}))}}var ot=function(){function e(){}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(){return t.component=undefined}))};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.field,r=a.value;var i=n,o=i.label,u=i.id,c=i.readonly,f=i.disabled,p=i.classes,v=p===void 0?"":p,m=i.containerClass,h=i.options,g=h===void 0?d.signOpts:h,b=i.heightPct,y=b===void 0?d.signHeightPct:b;var w={paddingBottom:y+"%"};var x=l["default"].head(r());var I=l["default"](g).map((function(e){var t=e.value;if(t==="draw"){return{component:Ze,icon:_(d.drawIcn),label:d.signDrawTxt}}else if(t==="type"){return{component:rt,icon:_(d.typeIcn),label:d.signTypeTxt}}else if(t==="stamp"){return{component:at,icon:_(d.stampIcn),label:d.signStampTxt}}return null})).compact().value();if(I.length===1&&!x){this.component=I[0].component}return s["default"](".relative",{class:m},[E(u,o),c||f?s["default"](".aspect-ratio",{id:u,class:v,style:w},x?s["default"](".aspect-ratio--object",s["default"]("img.img.w-100.absolute",{src:L(x.path,x.dataUrl)})):null):this.component?s["default"](this.component,{heightPct:y,style:w,onSet:lt(r,u,d.signMaxSize),onCancel:function(){return t.component=undefined}}):s["default"](".aspect-ratio.pointer",{id:u,class:T()+" "+v,style:w},x?s["default"](".aspect-ratio--object.hide-child.dim",{onclick:function(){return r([])}},[s["default"]("img.img.w-100.absolute",{src:L(x.path,x.dataUrl)}),s["default"](".pa3.absolute.top-0.right-0.child",s["default"]("i.fa-2x",{class:_(d.resetIcn)}))]):s["default"](".aspect-ratio--object.flex.items-stretch.justify-center",l["default"].map(I,(function(e){var a=e.component,n=e.icon,r=e.label;return s["default"](".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return t.component=a}},s["default"]("i.fa-2x.ma1",{class:n}),s["default"]("span.ma1",r))}))))])};return e}();e.Badge=te;e.BaseInput=Se;e.BaseText=oe;e.Button=ae;e.ButtonLink=ne;e.CardDateInput=De;e.Checkbox=fe;e.CheckboxInput=je;e.CurrencyInput=Te;e.DateInput=Me;e.FileList=he;e.FileMulti=Ge;e.FileSelect=Je;e.ImageList=be;e.ImageMulti=Qe;e.ImagePreview=ye;e.ImageSelect=Xe;e.Label=Ce;e.Link=ce;e.NavButton=re;e.NavLink=ie;e.PasswordInput=Ue;e.PasswordStrength=ke;e.RadioInput=Le;e.SelectInput=He;e.SelectText=me;e.SignBuilder=ot;e.TextareaInput=Oe;e.Toggle=ve;e.ToggleInput=Ae;e.Trusted=le;e.currencyStrToNumber=Fe;e.fileNameExtSplit=V;e.getIcon=_;e.guid=j;e.iconMap=ue;e.linkAttrs=se;e.numberToCurrencyStr=Be;e.numberToCurrencyTuple=qe;e.updateButtonContext=M;e.updateConfig=f;e.updateTheme=q;Object.defineProperty(e,"__esModule",{value:true})}));
