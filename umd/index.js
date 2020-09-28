(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril/stream"),require("mithril"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril/stream","mithril","signature_pad"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiWidgets={},e._,e.m.stream,e.m,e.SignaturePad))})(this,(function(e,t,a,n,r){"use strict";function i(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var l=i(t);var u=i(a);var o=i(n);var s=i(r);var d={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link"};var c=d;function f(e){l["default"].assign(d,e)}function p(){return{"max-height":c.imageDispHeight}}function v(){return{"max-height":c.thumbDispHeight}}var m={"max-width":"5.4ex"};var h={"max-width":"9ex"};var g={icon:u["default"]("fas"),lblCol:u["default"]("silver"),lblFnt:u["default"]("f6"),dspFnt:u["default"]("truncate"),dspBrd:u["default"]("bb b--black-20"),inpHgt:u["default"]("h2"),inpCol:u["default"]("dark-gray"),inpFnt:u["default"]("fw2"),inpBrd:u["default"]("bn"),actCol:u["default"]("dark-gray"),actBg:u["default"]("bg-light-blue"),filBrd:u["default"]("ba bw1 br3 b--dashed"),filBrdCol:u["default"]("b--black-30"),drgCol:u["default"]("blue"),drgBrdCol:u["default"]("b--blue"),btnBg:u["default"]("bg-light-blue"),btnCol:u["default"]("dark-gray"),btnFnt:u["default"](""),btnPad:u["default"]("pa2"),btnBrd:u["default"]("bn br2")};function b(e){return e.join(" ")}function y(e,t){if(t===void 0){t=[]}return u["default"].merge(l["default"].concat(l["default"].map(e,(function(e){return g[e]})),t)).map(b)}var w=y(["lblCol","dspFnt"]);var x=y(["lblCol","lblFnt"]);var I=y(["inpCol","inpFnt"]);var k=y(["inpBrd"],[I]);var T=y(["inpHgt"],[k]);var C=y(["actCol","actBg"]);var S=y(["filBrd","filBrdCol"],[I]);var B=y(["inpFnt","filBrd","drgCol","drgBrdCol"]);var P=y(["btnBg","btnCol","btnFnt","btnPad","btnBrd"]);var q=y(["btnCol","btnFnt"]);function M(e){l["default"].forEach(e,(function(e,t){if(e&&t in g){g[t](e)}}))}function F(e){return g.icon()+" "+e}var U={};function D(e){l["default"].assign(U,e)}function z(e){if(e&&e in U){return U[e]}else{return P()}}function L(e){return(e+256).toString(16).substr(1)}function H(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[L(e[0]),L(e[1]),L(e[2]),L(e[3]),"-",L(e[4]),L(e[5]),"-",L(e[6]),L(e[7]),"-",L(e[8]),L(e[9]),"-",L(e[10]),L(e[11]),L(e[12]),L(e[13]),L(e[14]),L(e[15])].join("")}function A(){return Math.max(window.devicePixelRatio,1)}function j(e,t){return t?e+"*":e}function E(e,t){return t?t:e}function R(e){return e?o["default"]("span.mr2.truncate",{title:e,class:w()},e):null}function _(e,t,a){return t?o["default"]("label.mb1.db",{title:t,for:e,class:x()},j(t,a)):null}function Y(e,t,a){return[e?o["default"]("i.fa-fw",{class:(t?"mr2":"")+" "+F(e)}):null,t,a?o["default"]("i.fa-fw",{class:(t?"ml2":"")+" "+F(a)}):null]}function N(e,t){return e?"o-60":t?"":"pointer"}function O(e){return function(t){var a=t.target.value;return e(a)}}function W(e){return function(t){var a=t.target.checked;return e(a)}}function V(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function G(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var i=new Uint8Array(r);for(var l=0;l<r;l++){i[l]=a.charCodeAt(l)}return new Blob([i],{type:n})}function $(e,t){var a=(new Date).valueOf();var n=e;n.name=t;n.lastModified=a;return e}function J(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function K(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var i=a.getUint16(r,false);r+=2;if(i===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var l=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,l);var u=a.getUint16(r,l);r+=2;for(var o=0;o<u;o++){if(a.getUint16(r+o*12,l)===274){return a.getUint16(r+o*12+8,l)}}}else if((i&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function Q(e){return new Promise((function(t){var a=new FileReader;a.onload=function(){t(K(a.result))};a.readAsArrayBuffer(e)}))}function X(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function Z(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return Q(e).then((function(n){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var l=J(i.width,i.height,t),u=l[0],o=l[1];if(n>4){e.width=o;e.height=u}else{e.width=u;e.height=o}var s=e.getContext("2d");X(s,u,o,n);s.drawImage(i,0,0,u,o);r(e.toDataURL(a))};var l=new FileReader;l.onload=function(){return i.src=l.result};l.readAsDataURL(e)}))}))}function ee(e,t,a,n){var r=document.createElement("canvas");r.width=t;r.height=a;var i=.56*r.height;var l=r.getContext("2d");l.textBaseline="middle";l.font=i+"px "+n;l.fillText(e,r.height*.05,i);return r.toDataURL()}var te=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.classes,r=n===void 0?"bg-red":n,i=e.children;return o["default"](".relative.dib",[i,a?o["default"]("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:r,style:{"min-width":"0.65rem"}},a):null])};return e}();var ae=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.type,r=n===void 0?"button":n,i=t.title,l=i===void 0?a:i,u=t.icon,s=t.rightIcon,d=t.context,c=t.classes,f=c===void 0?"":c,p=t.disabled,v=t.style,m=t.onclick;return o["default"]("button.button-reset",{type:r,title:l,disabled:p,class:N(p)+" "+z(d)+" "+f,style:v,onclick:m},Y(u,a,s))};return e}();var ne=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,i=t.icon,l=t.rightIcon,u=t.href,s=t.rel,d=t.target,c=t.download,f=t.context,p=t.classes,v=p===void 0?"":p,m=t.style;return o["default"]("a.link",{href:u,rel:s,target:d,download:c,title:r,class:z(f)+" "+v,style:m},Y(i,a,l))};return e}();var re=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,i=t.icon,l=t.rightIcon,u=t.classes,s=u===void 0?"":u,d=t.disabled,c=t.style,f=t.onclick;return o["default"](".mh2.pa2.truncate",{title:r,disabled:d,class:N(d)+" "+q()+" "+s,style:c,onclick:f},Y(i,a,l))};return e}();var ie=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,n=t.title,r=n===void 0?a:n,i=t.icon,l=t.rightIcon,u=t.href,s=t.rel,d=t.target,c=t.download,f=t.classes,p=f===void 0?"":f,v=t.style;return o["default"]("a.link.mh2.pa2.truncate",{href:u,rel:s,target:d,download:c,title:r,class:q()+" "+p,style:v},Y(i,a,l))};return e}();var le=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=a.classes,r=a.style,i=t.value;return o["default"](".pa2",{class:n,style:r},o["default"].trust(i()))};return e}();var ue=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,l=i===void 0?"":i,u=a.style;return o["default"](".pa2.flex.flex-wrap",{class:g.dspBrd()+" "+l,style:u},[R(r),o["default"]("span.ws-normal",{title:n(),class:I()},n())])};return e}();function oe(e,t){if(e==="email"){return{href:"mailto:"+t,class:I()}}else if(e==="tel"){return{href:"tel:"+t,class:I()}}else{return{href:t,target:"_blank",class:I()}}}var se={email:c.emailIcn,tel:c.telIcn};var de=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.type,l=i===void 0?"url":i,u=a.classes,s=u===void 0?"":u,d=a.style;return o["default"](".pa2.flex.flex-wrap",{class:g.dspBrd()+" "+s,style:d},[R(r),o["default"]("a.link.dim.pointer.ws-normal",oe(l,n()),o["default"]("i.mr2",{class:F(se[l]||c.linkIcn)}),n())])};return e}();var ce=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,l=i===void 0?"":i,u=a.style;return o["default"](".pa2.flex.items-center",{class:g.dspBrd()+" "+l,style:u},[R(r),o["default"]("i",{class:g.inpCol()+" "+F(n()?c.checkIcn:c.uncheckIcn)})])};return e}();var fe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,u=i===void 0?"":i,s=a.style;var d=l["default"].find(a.options,{value:n()});var c=d?d.label||d.value:n();return o["default"](".pa2.flex.flex-wrap",{class:g.dspBrd()+" "+u,style:s},[R(r),o["default"]("span.ws-normal",{title:c,class:I()},c)])};return e}();var pe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,u=i===void 0?"":i,s=a.style;return o["default"](".pa2.flex.flex-column",{class:g.dspBrd()+" "+u,style:s},[R(r),o["default"](".flex.flex-column.mt1.nb1",l["default"].map(n(),(function(e){var t=e.name,a=e.path;return o["default"](".ba.b--black-20",{class:I()},[o["default"]("a.pa2.mv1.link.b--black-20.dim.dib.pointer[target=_blank]",o["default"]("i.mr2",{href:a,class:F(c.downloadIcn)}),t),o["default"](".fr.dark-red.pointer.dim.dib.pt3.mr2",{class:F(c.cancelIcn),onclick:function(){return n([])}})])})))])};return e}();var ve=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return o["default"](".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[o["default"]("img.contain",a),t])};return e}();var me=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,u=i===void 0?"":i,s=a.style;return o["default"](".pa2.flex.flex-column",{class:g.dspBrd()+" "+u,style:s},[R(r),o["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",l["default"].map(n(),(function(e){var t=e.name,a=e.path,n=e.dataUrl;return o["default"](ve,{title:t,src:E(a,n),style:v()})})))])};return e}();var he=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=a.classes,u=i===void 0?"":i,s=a.style;var d=l["default"].head(n());return o["default"](".pa2.flex.flex-column",{class:g.dspBrd()+" "+u,style:s},[R(r),d?o["default"]("img.img.h-100.mt2.contain.self-center",{title:d.name,src:E(d.path,d.dataUrl),style:p()}):o["default"]("i.mt2",{class:g.inpCol()+" "+F(c.imageIcn)})])};return e}();var ge=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,n=a===void 0?"":a,r=t.title,i=r===void 0?n:r,l=t.required;return o["default"]("label.mb2",{title:i},j(n,l))};return e}();var be=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value,i=a.xform,l=i===void 0?r:i;var u=n.label,s=n.id,d=n.type,c=d===void 0?"text":d,f=n.name,p=f===void 0?s:f,v=n.title,m=v===void 0?u:v,h=n.placeholder,g=n.max,b=n.maxlength,y=n.min,w=n.minlength,x=n.step,I=n.required,k=n.readonly,C=n.disabled,S=n.autofocus,B=n.autocomplete,P=n.pattern,q=n.inputmode,M=n.spellcheck,F=n.instant,U=n.containerClass,D=n.classes,z=D===void 0?"":D;return[_(s,u,I),o["default"](".w-100",{class:U},o["default"]("input.input-reset.border-box.w-100",(t={id:s,type:c,name:p,title:m,placeholder:h,max:g,maxlength:b,min:y,minlength:w,step:x,required:I,readonly:k,disabled:C,autofocus:S,autocomplete:B,pattern:P,inputmode:q,spellcheck:M,value:l(),class:N(C,true)+" "+T()+" "+z},t[F?"oninput":"onchange"]=O(r),t)))]};return e}();var ye=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value,i=a.xform,u=i===void 0?r:i;var s=n,d=s.label,c=s.id,f=s.name,p=f===void 0?c:f,v=s.title,m=v===void 0?d:v,h=s.placeholder,g=s.max,b=s.maxlength,y=s.min,w=s.minlength,x=s.step,k=s.required,C=s.readonly,S=s.disabled,B=s.autofocus,P=s.autocomplete,q=s.pattern,M=s.inputmode,F=s.spellcheck,U=s.instant,D=s.containerClass,z=s.classes,L=z===void 0?"":z,H=s.options;var A=H&&H.length?H[0].value:"$";return[_(c,d,k),o["default"](".w-100",{class:D},o["default"](".w-100.flex.items-center",{class:T(),style:{"flex-shrink":0}},[o["default"]("span.mr1",A),o["default"]("input.input-reset.border-box.flex-auto.bg-transparent.bn",(t={id:c,type:"text",name:p,title:m,placeholder:h,max:g,maxlength:b,min:y,minlength:w,step:x,required:k,readonly:C,disabled:S,autofocus:B,autocomplete:P,pattern:q,inputmode:M,spellcheck:F,value:l["default"].isUndefined(u())?null:Ie(we(u())),class:N(S,true)+" "+I()+" "+L},t[U?"oninput":"onchange"]=Te(r),t))]))]};return e}();function we(e){return l["default"].isString(e)?l["default"].parseInt(e):Number(e)}function xe(e){var t=e.replace(/[^\d.]/g,"");var a;var n=0;if(t.indexOf(".")>-1){var r=t.indexOf(".");var i=t.substring(0,r);a=l["default"].parseInt(l["default"].padStart(i,1,"0"));var u=t.substring(r+1,Math.min(r+3,t.length));n=l["default"].parseInt(l["default"].padEnd(u,2,"0"))}else{a=l["default"].parseInt(t)||0}return a*100+n}function Ie(e){var t=ke(e);if(t){return t[0]+"."+t[1]}else{return t}}function ke(e){if(!l["default"].isFinite(e)){return undefined}var t=String(Math.abs(e));var a="0";var n="";if(t.length>2){var r=t.length-2;a=t.substring(0,r);n=t.substring(r)}else{n=l["default"].padStart(t,2,"0")}return[a,n]}function Te(e){return function(t){var a=t.target.value;return e(xe(a))}}var Ce=function(){function e(){this.month=u["default"]();this.year=u["default"]();this.date=u["default"].lift((function(e,t){return e+"/"+t}),this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=String(e).split("/"),n=a[0],r=a[1],i=r===void 0?"":r;t.month(n);t.year(i)}));this.date.map((function(e){if(e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t.label,n=t.id,r=t.name,i=r===void 0?n:r,l=t.title,u=l===void 0?a:l,s=t.required,d=t.readonly,c=t.disabled,f=t.containerClass,p=t.classes,v=p===void 0?"":p;var h=N(c,true)+" "+T()+" "+v;return[_(n,a,s),o["default"](".w-100",{id:n,title:u,class:f},[o["default"](".dib.mr2",[_(n+"-mm","Month"),o["default"]("input.input-reset.border-box",{id:n+"-mm",name:i+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:s,readonly:d,disabled:c,value:this.month(),class:h,style:m,onchange:O(this.month)})]),o["default"]("span.mr2",{class:I()},"/"),o["default"](".dib.mr2",[_(n+"-yyyy","Year"),o["default"]("input.input-reset.border-box",{id:n+"-yy",name:i+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:s,readonly:d,disabled:c,value:this.year(),class:h,style:m,onchange:O(this.year)})])])]};return e}();var Se=function(){function e(){this.day=u["default"]();this.month=u["default"]();this.year=u["default"]();this.date=u["default"].lift((function(e,t,a){return a+"-"+t+"-"+e}),this.day,this.month,this.year)}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(e){var a=new Date(String(e));if(l["default"].isDate(a)&&!isNaN(a.getTime())){t.day(l["default"].padStart(String(a.getDate()),2,"0"));t.month(l["default"].padStart(String(1+a.getMonth()),2,"0"));t.year(String(a.getFullYear()))}}));this.date.map((function(e){var t=new Date(String(e));if(l["default"].isDate(t)&&!isNaN(t.getTime())&&e!==a()){a(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t,n=a.label,r=a.id,i=a.name,l=i===void 0?r:i,u=a.title,s=u===void 0?n:u,d=a.required,c=a.readonly,f=a.disabled,p=a.containerClass,v=a.classes,g=v===void 0?"":v,b=a.options;var y=b&&b.length?b[0].value:"en-GB";var w=N(f,true)+" "+T()+" "+g;var x=o["default"](".dib.mr2",[_(r+"-dd","Day"),o["default"]("input.input-reset.border-box",{id:r+"-dd",name:l+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:d,readonly:c,disabled:f,value:this.day(),class:w,style:m,onchange:O(this.day)})]);var I=o["default"](".dib.mr2",[_(r+"-mm","Month"),o["default"]("input.input-reset.border-box",{id:r+"-mm",name:l+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:d,readonly:c,disabled:f,value:this.month(),class:w,style:m,onchange:O(this.month)})]);var k=o["default"](".dib.mr2",[_(r+"-yyyy","Year"),o["default"]("input.input-reset.border-box",{id:r+"-yyyy",name:l+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:d,readonly:c,disabled:f,value:this.year(),class:w,style:h,onchange:O(this.year)})]);return[_(r,n,d),o["default"](".w-100",{id:r,title:s,class:p},y==="en-US"?[I,x,k]:[x,I,k])]};return e}();var Be=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.label,i=r===void 0?"":r,l=a.id,u=a.name,s=u===void 0?l:u,d=a.title,f=d===void 0?i:d,p=a.required,v=a.readonly,m=a.disabled,h=a.autocomplete,g=a.containerClass,b=g===void 0?"":g,y=a.classes,w=y===void 0?"":y;return o["default"](".w-100",{class:I()+" "+b},o["default"]("label.flex.items-center",{title:f,class:N(m,v)+" "+w},o["default"]("input.clip[type=checkbox]",{id:l,name:s,checked:n(),required:p,autocomplete:h,disabled:m||v,onchange:W(n)}),j(i,p),o["default"]("i.ml2",{class:F(n()?c.checkIcn:c.uncheckIcn)})))};return e}();var Pe=function(){function e(){this.showPassword=u["default"](false)}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value;var i=n.label,l=n.id,u=n.name,s=u===void 0?l:u,d=n.title,f=d===void 0?i:d,p=n.placeholder,v=n.maxlength,m=n.minlength,h=n.required,g=n.readonly,b=n.disabled,y=n.autofocus,w=n.autocomplete,I=n.instant,k=n.containerClass,C=n.classes,S=C===void 0?"":C;return[o["default"](".flex.justify-between",[_(l,i,h),o["default"](Be,{field:{id:"showpass",label:c.showPassTxt,type:"checkbox",readonly:g,disabled:b,containerClass:"mb1 "+x()},value:this.showPassword})]),o["default"](".w-100",{class:k},o["default"]("input.input-reset.border-box.w-100",(t={id:l,name:s,title:f,placeholder:p,type:this.showPassword()?"text":"password",maxlength:v,minlength:m,required:h,readonly:g,disabled:b,autofocus:y,autocomplete:w,value:r(),class:N(b,true)+" "+T()+" "+S,autocorrect:"off"},t[I?"oninput":"onchange"]=O(r),t)))]};return e}();var qe=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,n=a.field,r=a.value;var i=n.label,l=n.id,u=n.name,s=u===void 0?l:u,d=n.title,c=d===void 0?i:d,f=n.placeholder,p=n.required,v=n.readonly,m=n.disabled,h=n.autofocus,g=n.autocomplete,b=n.spellcheck,y=n.instant,w=n.containerClass,x=n.classes,I=x===void 0?"":x;return[_(l,i,p),o["default"]("div",{class:w},o["default"]("textarea.border-box.w-100[rows=3]",(t={id:l,name:s,title:c,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,spellcheck:b,value:r(),class:N(m,true)+" "+k()+" "+I,style:{resize:"vertical"}},t[y?"oninput":"onchange"]=O(r),t)))]};return e}();var Me=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a,i=r.label,u=r.id,s=r.name,d=s===void 0?u:s,c=r.required,f=r.readonly,p=r.disabled,v=r.autocomplete,m=r.containerClass,h=m===void 0?"flex-wrap":m,b=r.classes,y=b===void 0?"":b,w=r.options;return[_(u,i,c),o["default"](".flex",{class:I()+" "+h,onchange:O(n)},l["default"].map(w,(function(e){var t=e.value,a=e.label,r=a===void 0?t:a,i=e.icon;var l=n()===t;return o["default"]("label.flex.items-center",{title:r,class:N(p,f)+" "+(l?C():"dim")+" "+g.btnBrd()+" "+y},o["default"]("input.clip[type=radio]",{name:d,value:t,checked:l,required:c,autocomplete:v,disabled:p||f}),i?o["default"]("i.fa-fw",{class:F(i)}):r)})))]};return e}();var Fe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a,i=r.label,u=r.id,s=r.name,d=s===void 0?u:s,c=r.title,f=c===void 0?i:c,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,g=r.autocomplete,b=r.containerClass,y=r.classes,w=y===void 0?"":y,x=r.options;return[_(u,i,p),o["default"](".w-100",{class:b},o["default"]("select.input-reset.border-box.w-100",{id:u,name:d,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,value:n(),class:N(m,v)+" "+T()+" "+w,onchange:O(n)},l["default"].map(x,(function(e){var t=e.value,a=e.label,n=a===void 0?t:a;return o["default"]("option",{value:t,disabled:m||v},n)}))))]};return e}();function Ue(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function De(e){return function(t){t.preventDefault();e(false)}}function ze(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function Le(e){return function(t){var a=t.target.files;return e(a)}}var He=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.defaultAccept,n=a===void 0?"*":a,r=t.field,i=r.label,u=r.id,s=r.name,d=s===void 0?u:s,c=r.title,f=c===void 0?i:c,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,g=r.accept,b=g===void 0?n:g,y=r.containerClass,w=y===void 0?"":y,I=t.multiple,k=I===void 0?true:I,T=t.dragging,C=t.onSet,S=e.children;return o["default"]("label.db",l["default"].extend({for:u,title:f,class:N(m,v)+" "+w},m||v?{}:{ondragover:Ue(T),ondragleave:De(T),ondrop:ze(T,C)}),[o["default"]("input.clip[type=file]",{id:u,name:d,multiple:k,accept:b,required:p,autofocus:h,disabled:m||v,onchange:Le(C)}),i?o["default"]("span.db.mb1",{class:x()},j(i,p)):null,S])};return e}();function Ae(e){return function(t){var a=e();l["default"].each(t,(function(e){a.push({guid:H(),name:e.name,path:"not_set",file:e})}));e(a)}}function je(e,t){return function(){var a=e();l["default"].remove(a,{guid:t});e(a)}}var Ee=function(){function e(){this.dragging=u["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;return[o["default"](He,{field:a,dragging:this.dragging,onSet:Ae(n)},o["default"](".pa2",{class:this.dragging()?B():S()},[o["default"]("i.mr2",{class:F(c.uploadIcn)}),o["default"]("span",c.addFilesTxt)])),o["default"](".flex.flex-column.mt1.nb1",l["default"].map(n(),(function(e){return o["default"]("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[o["default"]("i.mr2",{class:F(c.downloadIcn)}),e.name,o["default"]("i.child.fr",{title:c.remFileTtl+" "+e.name,class:F(c.deleteIcn),onclick:je(n,e.guid)})])})))]};return e}();function Re(e){return function(t){var a=l["default"].head(t);if(!a){return}e([{guid:H(),name:a.name,path:"not_set",file:a}])}}var _e=function(){function e(){this.dragging=u["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=l["default"].head(n());return o["default"](He,{field:a,multiple:false,dragging:this.dragging,onSet:Re(n)},o["default"](".pa2",{class:this.dragging()?B():S()},[o["default"]("i.mr2",{class:F(c.uploadIcn)}),o["default"]("span",r?r.name:c.addFileTxt)]))};return e}();function Ye(e,t){return function(a){var n=e();return Promise.all(l["default"].map(a,(function(e){return Z(e,t,e.type).then((function(t){var a=$(G(t),e.name);n.push({guid:H(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){e(n);o["default"].redraw()}))}}var Ne=function(){function e(){this.dragging=u["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=a.classes,i=r===void 0?"":r;return[o["default"](He,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:Ye(n,c.imageMaxSize)},o["default"](".w-100.pa1.dt.tc",{class:(this.dragging()?B():S())+" "+i},o["default"]("i.fa-2x.dtc.v-mid",{class:F(c.cameraIcn)}))),o["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",l["default"].map(n(),(function(e){return o["default"](ve,{src:E(e.path,e.dataUrl),style:v()},o["default"](".absolute.top-0.right-0.child",o["default"](ae,{title:"Remove "+e.name,icon:c.deleteIcn,onclick:je(n,e.guid)})))})))]};return e}();function Oe(e,t){return function(a){var n=l["default"].head(a);if(!n){return Promise.resolve()}return Z(n,t,n.type).then((function(t){var a=$(G(t),n.name);e([{guid:H(),name:a.name,path:"not_set",file:a,dataUrl:t}]);o["default"].redraw()}))}}var We=function(){function e(){this.dragging=u["default"](false)}e.prototype.view=function(e){var t=e.attrs,a=t.field,n=t.value;var r=l["default"].head(n());var i=a.classes,u=i===void 0?"":i;return o["default"](He,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Oe(n,c.imageMaxSize)},o["default"](".w-100.pa1.contain.dt.tc",{class:(this.dragging()?B():S())+" "+u},r?o["default"]("img.img.contain",{title:r.name,src:E(r.path,r.dataUrl),style:p()}):o["default"]("i.fa-2x.dtc.v-mid",{class:F(c.cameraIcn)})))};return e}();var Ve=function(){function e(){}e.prototype.oncreate=function(e){var t=this;var a=e.dom;var n=a.children[0];var r=A();this.signaturePad=new s["default"](n,{minWidth:.5*r,maxWidth:1.5*r});var i=function(){var e=A();n.width=n.offsetWidth*e;n.height=n.offsetHeight*e;var a=n.getContext("2d");a.scale(e,e);t.resetCanvas()};this.resizeHandler=l["default"].debounce(i,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);i()};e.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.style,r=a.onSet,i=a.onCancel;return[o["default"](".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:n},o["default"]("canvas.aspect-ratio--object")),o["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[o["default"](ae,{title:c.applyTtl,icon:c.applyIcn,classes:"ma1",onclick:function(){if(!t.signaturePad.isEmpty()){r(t.signaturePad.toDataURL("image/png"))}}}),o["default"](ae,{title:c.resetTtl,icon:c.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),o["default"](ae,{title:c.cancelTtl,icon:c.cancelIcn,classes:"ma1",onclick:i})])]};e.prototype.resetCanvas=function(){this.signaturePad.clear()};return e}();function Ge(e,t){var a=c.signMaxSize;var n=.01*t*a;return ee(e,a,n,c.signFont)}function $e(e,t){return function(){return t(Ge(c.stampSetTxt,e))}}var Je=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.heightPct,n=t.onSet;return[o["default"]("span.clip",{style:{"font-family":c.signFont}},c.stampSetTxt),o["default"](ae,{label:c.stampTxt,classes:"w-100",onclick:$e(a,n)})]};return e}();function Ke(e,t,a){return function(){if(e()){a(Ge(e(),t))}return false}}var Qe=function(){function e(){this.text=u["default"]("")}e.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.heightPct,r=a.style,i=a.onSet,l=a.onCancel;return[o["default"]("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:r,onsubmit:Ke(this.text,n,i)},o["default"]("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:O(this.text),value:this.text(),style:{"font-family":c.signFont}})),o["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[o["default"](ae,{title:c.applyTtl,icon:c.applyIcn,classes:"ma1",onclick:Ke(this.text,n,i)}),o["default"](ae,{title:c.resetTtl,icon:c.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),o["default"](ae,{title:c.cancelTtl,icon:c.cancelIcn,classes:"ma1",onclick:l})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function Xe(e,t){return new Promise((function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=J(n.width,n.height,t),i=r[0],l=r[1];e.width=i;e.height=l;var u=e.getContext("2d");u.drawImage(n,0,0,i,l);a(e.toDataURL())};n.src=e}))}function Ze(e,t,a){return function(n){return Xe(n,a).then((function(a){var n=$(G(a),"sign-"+t+".png");e([{guid:H(),name:n.name,path:"not_set",file:n,dataUrl:a}]);o["default"].redraw()}))}}var et=function(){function e(){}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(){return t.component=undefined}))};e.prototype.view=function(e){var t=this;var a=e.attrs,n=a.field,r=a.value;var i=n,u=i.label,s=i.id,d=i.readonly,f=i.disabled,p=i.classes,v=p===void 0?"":p,m=i.containerClass,h=i.options,g=h===void 0?c.signOpts:h,b=i.heightPct,y=b===void 0?c.signHeightPct:b;var w={"padding-bottom":y+"%"};var x=l["default"].head(r());var I=l["default"](g).map((function(e){var t=e.value;if(t==="draw"){return{component:Ve,icon:F(c.drawIcn),label:c.signDrawTxt}}else if(t==="type"){return{component:Qe,icon:F(c.typeIcn),label:c.signTypeTxt}}else if(t==="stamp"){return{component:Je,icon:F(c.stampIcn),label:c.signStampTxt}}return null})).compact().value();if(I.length===1&&!x){this.component=I[0].component}return o["default"](".relative",{class:m},[_(s,u),d||f?o["default"](".aspect-ratio",{id:s,class:v,style:w},x?o["default"](".aspect-ratio--object",o["default"]("img.img.w-100.absolute",{src:E(x.path,x.dataUrl)})):null):this.component?o["default"](this.component,{heightPct:y,style:w,onSet:Ze(r,s,c.signMaxSize),onCancel:function(){return t.component=undefined}}):o["default"](".aspect-ratio.pointer",{id:s,class:S()+" "+v,style:w},x?o["default"](".aspect-ratio--object.hide-child.dim",{onclick:function(){return r([])}},[o["default"]("img.img.w-100.absolute",{src:E(x.path,x.dataUrl)}),o["default"](".pa3.absolute.top-0.right-0.child",o["default"]("i.fa-2x",{class:F(c.resetIcn)}))]):o["default"](".aspect-ratio--object.flex.items-stretch.justify-center",l["default"].map(I,(function(e){var a=e.component,n=e.icon,r=e.label;return o["default"](".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return t.component=a}},o["default"]("i.fa-2x.ma1",{class:n}),o["default"]("span.ma1",r))}))))])};return e}();e.Badge=te;e.BaseInput=be;e.BaseText=ue;e.Button=ae;e.ButtonLink=ne;e.CardDateInput=Ce;e.Checkbox=ce;e.CheckboxInput=Be;e.CurrencyInput=ye;e.DateInput=Se;e.FileList=pe;e.FileMulti=Ee;e.FileSelect=_e;e.ImageList=me;e.ImageMulti=Ne;e.ImagePreview=he;e.ImageSelect=We;e.Label=ge;e.Link=de;e.NavButton=re;e.NavLink=ie;e.PasswordInput=Pe;e.RadioInput=Me;e.SelectInput=Fe;e.SelectText=fe;e.SignBuilder=et;e.TextareaInput=qe;e.Trusted=le;e.currencyStrToNumber=xe;e.fileNameExtSplit=V;e.getIcon=F;e.guid=H;e.iconMap=se;e.linkAttrs=oe;e.numberToCurrencyStr=Ie;e.numberToCurrencyTuple=ke;e.updateButtonContext=D;e.updateConfig=f;e.updateTheme=M;Object.defineProperty(e,"__esModule",{value:true})}));
