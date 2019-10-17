(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril/stream"),require("lodash"),require("mithril"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","mithril/stream","lodash","mithril","signature_pad"],t):(e=e||self,t(e.uiWidgets={},e.m.stream,e._,e.m,e.SignaturePad))})(this,(function(e,t,n,a,r){"use strict";t=t&&t.hasOwnProperty("default")?t["default"]:t;n=n&&n.hasOwnProperty("default")?n["default"]:n;a=a&&a.hasOwnProperty("default")?a["default"]:a;r=r&&r.hasOwnProperty("default")?r["default"]:r;var i={"padding-bottom":"25%"};var l={"max-height":"16rem"};var o={icon:t("fas"),lblCol:t("silver"),lblFnt:t("f6"),dspFnt:t("truncate"),dspBrd:t("bb b--black-20"),inpHgt:t("h2"),inpCol:t("dark-gray"),inpFnt:t("fw2"),inpBrd:t("bn"),filBrd:t("ba bw1 br3 b--dashed"),filBrdCol:t("b--black-30"),drgCol:t("b--blue"),drgBrdCol:t("blue"),btnBg:t("bg-light-blue"),btnCol:t("dark-gray"),btnFnt:t(""),btnBrd:t("bn br2")};function s(e){return e.join(" ")}function c(e,a){if(a===void 0){a=[]}return t.merge(n.concat(n.map(e,(function(e){return o[e]})),a)).map(s)}var u=c(["lblCol","dspFnt"]);var d=c(["lblCol","lblFnt"]);var f=c(["inpCol","inpFnt"]);var p=c(["inpBrd"],[f]);var v=c(["inpHgt"],[p]);var m=c(["filBrd","filBrdCol"],[f]);var h=c(["inpFnt","filBrd","drgCol","drgBrdCol"]);var g=c(["btnBg","btnCol","btnFnt","btnBrd"]);function b(e){n.forEach(e,(function(e,t){if(e===void 0){e=""}if(t in o){o[t](e)}}))}function w(e){return o.icon()+" "+e}function y(e){return(e+256).toString(16).substr(1)}function x(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[y(e[0]),y(e[1]),y(e[2]),y(e[3]),"-",y(e[4]),y(e[5]),"-",y(e[6]),y(e[7]),"-",y(e[8]),y(e[9]),"-",y(e[10]),y(e[11]),y(e[12]),y(e[13]),y(e[14]),y(e[15])].join("")}function I(){return Math.max(window.devicePixelRatio,1)}function k(e,t){return t?e+"*":e}function C(e,t){return t?t:e}function T(e){var t=e.label;return t?a("span.mr2.truncate",{title:t,class:u()},t):null}function P(e){var t=e.id,n=e.label,r=e.required;return n?a("label.mb1.db",{title:n,for:t,class:d()},k(n,r)):null}function B(e){return function(t){var n=t.target.value;return e(n)}}function S(e){return function(t){var n=t.target.checked;return e(n)}}function U(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function F(e){var t=e.split(",");var n=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var a=t[0].split(":")[1].split(";")[0];var r=n.length;var i=new Uint8Array(r);for(var l=0;l<r;l++){i[l]=n.charCodeAt(l)}return new Blob([i],{type:a})}function q(e,t,n){if(e>t){if(e>n){return[n,Math.round(t*n/e)]}}else if(t>n){return[Math.round(e*n/t),n]}return[e,t]}function j(e){var t=Math.min(e.byteLength,64*1024);var n=new DataView(e,0,t);if(n.getUint16(0,false)!==65496){return-2}var a=n.byteLength;var r=2;while(r<a){var i=n.getUint16(r,false);r+=2;if(i===65505){if(n.getUint32(r+=2,false)!==1165519206){return-1}var l=n.getUint16(r+=6,false)===18761;r+=n.getUint32(r+4,l);var o=n.getUint16(r,l);r+=2;for(var s=0;s<o;s++){if(n.getUint16(r+s*12,l)===274){return n.getUint16(r+s*12+8,l)}}}else if((i&65280)!==65280){break}else{r+=n.getUint16(r,false)}}return-1}function z(e){return new Promise((function(t){var n=new FileReader;n.onload=function(){t(j(n.result))};n.readAsArrayBuffer(e)}))}function L(e,t,n,a){if(!a||a>8){return}switch(a){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,n);e.rotate(Math.PI);return;case 4:e.translate(0,n);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-n);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-n);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function R(e,t,n){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File most be an image"))}return z(e).then((function(a){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var l=q(i.width,i.height,t),o=l[0],s=l[1];if(a>4){e.width=s;e.height=o}else{e.width=o;e.height=s}var c=e.getContext("2d");L(c,o,s,a);c.drawImage(i,0,0,o,s);r(e.toDataURL(n))};var l=new FileReader;l.onload=function(){return i.src=l.result};l.readAsDataURL(e)}))}))}var D=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.label,r=t.type,i=r===void 0?"button":r,l=t.title,o=l===void 0?n:l,s=t.icon,c=t.classes,u=t.disabled,d=t.style,f=t.onclick;return a("button.button-reset.pa2",{type:i,title:o,disabled:u,class:(u?"o-60":"dim pointer")+" "+g()+" "+c,style:d,onclick:f},s?a("i.fa-fw",{class:(n?"mr2":"")+" "+w(s)}):null,n)};return e}();var M=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=n.classes,i=n.style,l=t.value;return a(".pa2",{class:r,style:i},a.trust(l()))};return e}();var A=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.classes,l=i===void 0?"":i,s=n.style;return a(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+l,style:s},[T(n),a("span.ws-normal",{title:r(),class:f()},r())])};return e}();var E={addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link"};var H=E;function _(e,t){if(e==="email"){return{href:"mailto:"+t,class:f()}}else if(e==="tel"){return{href:"tel:"+t,class:f()}}else{return{href:t,target:"_blank",class:f()}}}var O={email:H.emailIcn,tel:H.telIcn};var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.type,l=n.classes,s=l===void 0?"":l,c=n.style;return a(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+s,style:c},[T(n),a("a.link.dim.pointer.ws-normal",_(i,r()),a("i.mr2",{class:w(O[i]||H.linkIcn)}),r())])};return e}();var Y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.classes,l=i===void 0?"":i,s=n.style;return a(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+l,style:s},[T(n),a("i.self-end",{class:o.inpCol()+" "+w(r()?H.checkIcn:H.uncheckIcn)})])};return e}();var V=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var l=r.classes,s=l===void 0?"":l,c=r.style;var u=n.find(r.options,{value:i()});var d=u?u.label:i();return a(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+s,style:c},[T(r),a("span.ws-normal",{title:d,class:f()},d)])};return e}();var N=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var l=r.classes,s=l===void 0?"":l,c=r.style;return a(".pa2.flex.flex-column",{class:o.dspBrd()+" "+s,style:c},[T(r),a(".flex.flex-column.mt1.nb1",n.map(i(),(function(e){var t=e.name,n=e.path;return a("a.pa2.mv1.link.ba.b--black-20.dim.pointer[target=_blank]",{href:n,class:f()},[a("i.mr2",{class:w(H.downloadIcn)}),t])})))])};return e}();var G=function(){function e(){}e.prototype.view=function(e){var t=e.children,n=e.attrs;return a(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[a("img.contain",n),t])};return e}();var J=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var l=r.classes,s=l===void 0?"":l,c=r.style;return a(".pa2.flex.flex-column",{class:o.dspBrd()+" "+s,style:c},[T(r),a(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",n.map(i(),(function(e){var t=e.name,n=e.path,r=e.dataUrl;return a(G,{title:t,src:C(n,r),style:{"max-height":"6rem"}})})))])};return e}();var K=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var s=r.classes,c=s===void 0?"":s,u=r.style;var d=n.head(i());return a(".pa2.flex.flex-column",{class:o.dspBrd()+" "+c,style:u},[T(r),d?a("img.img.mt2.contain.self-center",{title:d.name,src:C(d.path,d.dataUrl),style:l}):a("i.mt2",{class:o.inpCol()+" "+w(H.imageIcn)})])};return e}();var Q=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,n=t.label,r=t.required;return a("label.mb2",k(n,r))};return e}();var X=function(){function e(){}e.prototype.view=function(e){var t;var n=e.attrs,r=n.field,i=n.value;var l=r.id,o=r.type,s=r.name,c=s===void 0?l:s,u=r.placeholder,d=r.required,f=r.readonly,p=r.disabled,m=r.autofocus,h=r.autocomplete,g=r.spellcheck,b=r.instant,w=r.containerClass,y=r.classes,x=y===void 0?"":y;return[P(r),a(".w-100",{class:w},a("input.input-reset.border-box.w-100",(t={id:l,name:c,type:o,value:i(),class:(p?"o-60":"")+" "+v()+" "+x,placeholder:u,required:d,readonly:f,disabled:p,autofocus:m,autocomplete:h,spellcheck:g},t[b?"oninput":"onchange"]=B(i),t)))]};return e}();var Z=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.label,l=n.id,o=n.name,s=o===void 0?l:o,c=n.required,u=n.readonly,d=n.disabled,p=n.autocomplete,v=n.containerClass,m=n.classes,h=m===void 0?"":m;return a("div",{class:v},a(".flex.flex-wrap",{class:f()},a("label.flex.items-center",{class:(d?"o-60":u?"":"pointer")+" "+h},a("input.mr1[type=checkbox]",{id:l,name:s,checked:r(),required:c,autocomplete:p,disabled:d||u,onchange:S(r)}),k(i,c))))};return e}();var $=function(){function e(){this.showPassword=t(false)}e.prototype.view=function(e){var t;var n=e.attrs,r=n.field,i=n.value;var l=r.id,o=r.name,s=o===void 0?l:o,c=r.placeholder,u=r.required,f=r.readonly,p=r.disabled,m=r.autofocus,h=r.autocomplete,g=r.instant,b=r.containerClass,w=r.classes,y=w===void 0?"":w;return[a(".flex.justify-between",[P(r),a(Z,{field:{id:"showpass",label:H.showPassTxt,type:"checkbox",containerClass:"mb1 "+d()},value:this.showPassword})]),a(".w-100",{class:b},a("input.input-reset.border-box.w-100",(t={id:l,name:s,type:this.showPassword()?"text":"password",value:i(),class:(p?"o-60":"")+" "+v()+" "+y,placeholder:c,required:u,readonly:f,disabled:p,autofocus:m,autocomplete:h,autocorrect:"off"},t[g?"oninput":"onchange"]=B(i),t)))]};return e}();var ee=function(){function e(){}e.prototype.view=function(e){var t;var n=e.attrs,r=n.field,i=n.value;var l=r.id,o=r.name,s=o===void 0?l:o,c=r.placeholder,u=r.required,d=r.readonly,f=r.disabled,v=r.autofocus,m=r.autocomplete,h=r.spellcheck,g=r.instant,b=r.containerClass,w=r.classes,y=w===void 0?"":w;return[P(r),a("div",{class:b},a("textarea.border-box.w-100[rows=3]",(t={id:l,name:s,value:i(),class:(f?"o-60":"")+" "+p()+" "+y,placeholder:c,required:u,readonly:d,disabled:f,autofocus:v,autocomplete:m,spellcheck:h,style:{resize:"vertical"}},t[g?"oninput":"onchange"]=B(i),t)))]};return e}();var te=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var l=r,o=l.id,s=l.name,c=s===void 0?o:s,u=l.required,d=l.readonly,p=l.disabled,v=l.autocomplete,m=l.containerClass,h=l.classes,g=h===void 0?"":h,b=l.options;return[P(r),a("div",{class:m},a(".flex.flex-wrap",{class:f(),onchange:B(i)},n.map(b,(function(e){var t=e.label,n=e.value;return a("label.flex.items-center",{class:(p?"o-60":d?"":"pointer")+" "+g},a("input.mr1[type=radio]",{name:c,value:n,checked:i()===n,required:u,autocomplete:v,disabled:p||d}),t)}))))]};return e}();var ne=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var l=r,o=l.id,s=l.name,c=s===void 0?o:s,u=l.required,d=l.readonly,f=l.disabled,p=l.autofocus,m=l.autocomplete,h=l.containerClass,g=l.classes,b=g===void 0?"":g,w=l.options;return[P(r),a("div",{class:h},a("select.input-reset.border-box.w-100",{id:o,name:c,value:i(),class:(f?"o-60":d?"":"pointer")+" "+v()+" "+b,required:u,readonly:d,disabled:f,autofocus:p,autocomplete:m,onchange:B(i)},n.map(w,(function(e){var t=e.label,n=e.value;return a("option",{value:n,disabled:f||d},t)}))))]};return e}();function ae(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function re(e){return function(t){t.preventDefault();e(false)}}function ie(e,t){return function(n){n.preventDefault();e(false);if(n.dataTransfer){t(n.dataTransfer.files)}}}function le(e){return function(t){var n=t.target.files;return e(n)}}var oe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=r.label,l=r.id,o=r.name,s=o===void 0?l:o,c=r.required,u=r.readonly,f=r.disabled,p=r.autofocus,v=r.containerClass,m=v===void 0?"":v,h=t.accept,g=h===void 0?"*":h,b=t.multiple,w=b===void 0?true:b,y=t.dragging,x=t.onSet,I=e.children;return a("label",n.extend({for:l,title:i,class:(f?"o-60":u?"":"pointer")+" "+m},f||u?{}:{ondragover:ae(y),ondragleave:re(y),ondrop:ie(y,x)}),[a("input.clip[type=file]",{id:l,name:s,multiple:w,accept:g,required:c,autofocus:p,disabled:f||u,onchange:le(x)}),i?a("span.db.mb1",{title:i,class:d()},k(i,c)):null,I])};return e}();function se(e){return function(t){var a=e();n.each(t,(function(e){a.push({guid:x(),name:e.name,path:"not_set",file:e})}));e(a)}}function ce(e,t){return function(){var a=e();n.remove(a,{guid:t});e(a)}}var ue=function(){function e(){this.dragging=t(false)}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;return[a(oe,{field:r,dragging:this.dragging,onSet:se(i)},a(".pa2",{class:this.dragging()?h():m()},[a("i.mr2",{class:w(H.uploadIcn)}),a("span",H.addFilesTxt)])),a(".flex.flex-column.mt1.nb1",n.map(i(),(function(e){return a("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[a("i.mr2",{class:w(H.downloadIcn)}),e.name,a("i.child.fr",{title:H.remFileTtl+" "+e.name,class:w(H.deleteIcn),onclick:ce(i,e.guid)})])})))]};return e}();function de(e){return function(t){var a=n.head(t);if(!a){return}e([{guid:x(),name:a.name,path:"not_set",file:a}])}}var fe=function(){function e(){this.dragging=t(false)}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var l=n.head(i());return a(oe,{field:r,multiple:false,dragging:this.dragging,onSet:de(i)},a(".pa2",{class:this.dragging()?h():m()},[a("i.mr2",{class:w(H.uploadIcn)}),a("span",l?l.name:H.addFileTxt)]))};return e}();function pe(e,t){return function(r){var i="image/jpeg";var l=e();return Promise.all(n.map(r,(function(e){return R(e,t,i).then((function(t){var n=U(e.name)[0];var a=new File([F(t)],n+".jpg",{type:i});l.push({guid:x(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){e(l);a.redraw()}))}}var ve=function(){function e(){this.dragging=t(false)}e.prototype.view=function(t){var r=t.attrs,i=r.field,l=r.value;var o=i.classes,s=o===void 0?"":o;return[a(oe,{field:i,accept:"image/*",dragging:this.dragging,onSet:pe(l,e.maxImageSize)},a(".w-100.pa1.dt.tc",{class:(this.dragging()?h():m())+" "+s},a("i.fa-2x.dtc.v-mid",{class:w(H.cameraIcn)}))),a(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",n.map(l(),(function(e){return a(G,{src:C(e.path,e.dataUrl),style:{"max-height":"6rem"}},a(".pa2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,class:g(),onclick:ce(l,e.guid)},a("i.fa-lg",{class:w(H.deleteIcn)})))})))]};e.maxImageSize=1280;return e}();function me(e,t){return function(r){var i=n.head(r);if(!i){return Promise.resolve()}var l="image/jpeg";return R(i,t,l).then((function(t){var n=U(i.name)[0];var r=new File([F(t)],n+".jpg",{type:l});e([{guid:x(),name:r.name,path:"not_set",file:r,dataUrl:t}]);a.redraw()}))}}var he=function(){function e(){this.dragging=t(false)}e.prototype.view=function(t){var r=t.attrs,i=r.field,o=r.value;var s=n.head(o());var c=i.classes,u=c===void 0?"":c;return a(oe,{field:i,accept:"image/*",multiple:false,dragging:this.dragging,onSet:me(o,e.maxImageSize)},a(".w-100.pa1.contain.dt.tc",{class:(this.dragging()?h():m())+" "+u},s?a("img.img.contain",{title:s.name,src:C(s.path,s.dataUrl),style:l}):a("i.fa-2x.dtc.v-mid",{class:w(H.cameraIcn)})))};e.maxImageSize=1280;return e}();var ge=function(){function e(){this.signaturePad=null}e.prototype.oncreate=function(e){var t=this;var a=e.dom;var i=a.children[0];var l=I();this.signaturePad=new r(i,{minWidth:.5*l,maxWidth:1.5*l});var o=function(){var e=I();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var n=i.getContext("2d");n.scale(e,e);t.resetCanvas()};this.resizeHandler=n.debounce(o,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);o()};e.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};e.prototype.view=function(e){var t=this;var n=e.attrs,r=n.onSet,l=n.onCancel;return[a(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:i},a("canvas.aspect-ratio--object")),a(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[a(D,{title:H.applyTtl,icon:H.applyIcn,classes:"ma1",onclick:function(){if(t.signaturePad&&!t.signaturePad.isEmpty()){r(t.signaturePad.toDataURL("image/png"))}}}),a(D,{title:H.resetTtl,icon:H.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),a(D,{title:H.cancelTtl,icon:H.cancelIcn,classes:"ma1",onclick:l})])]};e.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return e}();function be(e,t){return function(){if(e()){var n=document.createElement("canvas");n.width=600;n.height=150;var a=.56*n.height;var r=n.getContext("2d");r.textBaseline="middle";r.font=a+"px Caveat";r.fillText(e(),n.height*.05,a);t(n.toDataURL())}return false}}var we=function(){function e(){this.text=t("")}e.prototype.oncreate=function(e){var t=e.dom;var n=t.children[0];n.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var n=e.attrs,r=n.onSet,l=n.onCancel;return[a("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:i,onsubmit:be(this.text,r)},a("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:B(this.text),value:this.text(),style:{"font-family":"Caveat"}})),a(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[a(D,{title:H.applyTtl,icon:H.applyIcn,classes:"ma1",onclick:be(this.text,r)}),a(D,{title:H.resetTtl,icon:H.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),a(D,{title:H.cancelTtl,icon:H.cancelIcn,classes:"ma1",onclick:l})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function ye(e,t){var n=window.getComputedStyle(e);var a=I();e.width=e.clientWidth*a;e.height=e.clientHeight*a;var r=.56*e.height;var i=e.getContext("2d");i.clearRect(0,0,e.width,e.height);i.textBaseline="middle";i.font=n["fontWeight"]+" "+r+"px "+n["fontFamily"];i.fillText(t?"":"",e.height*.25,e.height*.52);i.font="200 "+r+"px sans-serif";i.fillText(t?"Accepted":"Accept",e.height,r)}var xe=function(){function e(){this.checked=t(false)}e.prototype.oncreate=function(e){var t=e.dom;this.canvas=t.children[0];ye(this.canvas,this.checked())};e.prototype.onupdate=function(){if(this.canvas){ye(this.canvas,this.checked())}};e.prototype.view=function(e){var t=this;var n=e.attrs,r=n.onSet,l=n.onCancel;return[a(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:i},a("canvas.aspect-ratio--object.pointer",{class:o.icon(),onclick:function(){return t.checked(!t.checked())}})),a(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[a(D,{title:H.applyTtl,icon:H.applyIcn,classes:"ma1",disabled:!this.checked(),onclick:function(){if(t.canvas){r(t.canvas.toDataURL())}}}),a(D,{title:H.cancelTtl,icon:H.cancelIcn,classes:"ma1",onclick:l})])]};return e}();function Ie(e,t){return new Promise((function(n){var a=new Image;a.onload=function(){var e=document.createElement("canvas");var r=q(a.width,a.height,t),i=r[0],l=r[1];e.width=i;e.height=l;var o=e.getContext("2d");o.drawImage(a,0,0,i,l);n(e.toDataURL())};a.src=e}))}function ke(e,t,n){return function(r){return Ie(r,n).then((function(n){var r=new File([F(n)],"sign-"+t+".png",{type:"image/png"});e([{guid:x(),name:r.name,path:"not_set",file:r,dataUrl:n}]);a.redraw()}))}}var Ce=function(){function e(){}e.prototype.oninit=function(e){var t=this;var n=e.attrs.value;n.map((function(){return t.component=undefined}))};e.prototype.view=function(t){var r=this;var l=t.attrs,o=l.field,s=l.value;var c=o,u=c.id,d=c.readonly,f=c.disabled,p=c.classes,v=p===void 0?"":p,h=c.containerClass,g=c.options,b=g===void 0?[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}]:g;var y=n.head(s());return a(".relative",{class:h},[P(o),this.component?a(this.component,{onSet:ke(s,u,e.maxImageSize),onCancel:function(){return r.component=undefined}}):d||f?a(".aspect-ratio",{id:u,class:v,style:i},y?a(".aspect-ratio--object",a("img.img.w-100.absolute",{src:C(y.path,y.dataUrl)})):null):a(".aspect-ratio.pointer",{id:u,class:m()+" "+v,style:i},y?a(".aspect-ratio--object.hide-child.dim",{onclick:function(){return s([])}},[a("img.img.w-100.absolute",{src:C(y.path,y.dataUrl)}),a(".pa3.absolute.top-0.right-0.child",a("i.fa-2x",{class:w(H.resetIcn)}))]):a(".aspect-ratio--object.flex.items-stretch.justify-center",n.map(b,(function(e){var t=e.value;if(t==="draw"){return a(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return r.component=ge}},a("i.fa-2x",{class:w(H.drawIcn)}),a("span.mt2",H.signDrawTxt))}if(t==="type"){return a(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return r.component=we}},a("i.fa-2x",{class:w(H.typeIcn)}),a("span.mt2",H.signTypeTxt))}if(t==="stamp"){return a(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return r.component=xe}},a("i.fa-2x",{class:w(H.stampIcn)}),a("span.mt2",H.signStampTxt))}return null}))))])};e.maxImageSize=640;return e}();e.BaseInput=X;e.BaseText=A;e.Button=D;e.Checkbox=Y;e.CheckboxInput=Z;e.FileList=N;e.FileMulti=ue;e.FileSelect=fe;e.ImageList=J;e.ImageMulti=ve;e.ImagePreview=K;e.ImageSelect=he;e.Label=Q;e.Link=W;e.PasswordInput=$;e.RadioInput=te;e.SelectInput=ne;e.SelectText=V;e.SignBuilder=Ce;e.TextareaInput=ee;e.Trusted=M;e.fileNameExtSplit=U;e.getIcon=w;e.guid=x;e.iconMap=O;e.linkAttrs=_;e.updateTheme=b;Object.defineProperty(e,"__esModule",{value:true})}));
