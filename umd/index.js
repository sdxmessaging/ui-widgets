(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("mithril/stream"),require("lodash"),require("mithril"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","mithril/stream","lodash","mithril","signature_pad"],t):(e=e||self,t(e.uiWidgets={},e.m.stream,e._,e.m,e.SignaturePad))})(this,(function(e,t,a,n,r){"use strict";t=t&&t.hasOwnProperty("default")?t["default"]:t;a=a&&a.hasOwnProperty("default")?a["default"]:a;n=n&&n.hasOwnProperty("default")?n["default"]:n;r=r&&r.hasOwnProperty("default")?r["default"]:r;var i={"padding-bottom":"25%"};var o={"max-height":"16rem"};var l={icon:t("fas"),lblCol:t("silver"),lblFnt:t("f6"),dspFnt:t("truncate"),dspBrd:t("bb b--black-20"),inpHgt:t("h2"),inpCol:t("dark-gray"),inpFnt:t("fw2"),inpBrd:t("bn"),filBrd:t("ba bw1 br3 b--dashed"),filBrdCol:t("b--black-30"),drgCol:t("b--blue"),drgBrdCol:t("blue"),btnBg:t("bg-light-blue"),btnCol:t("dark-gray"),btnFnt:t(""),btnBrd:t("bn br2")};function s(e){return e.join(" ")}function c(e,n){if(n===void 0){n=[]}return t.merge(a.concat(a.map(e,(function(e){return l[e]})),n)).map(s)}var u=c(["lblCol","dspFnt"]);var f=c(["lblCol","lblFnt"]);var d=c(["inpCol","inpFnt"]);var p=c(["inpBrd"],[d]);var v=c(["inpHgt"],[p]);var m=c(["filBrd","filBrdCol"],[d]);var h=c(["inpFnt","filBrd","drgCol","drgBrdCol"]);var g=c(["btnBg","btnCol","btnFnt","btnBrd"]);function b(e){a.forEach(e,(function(e,t){if(e===void 0){e=""}if(t in l){l[t](e)}}))}function w(e){return l.icon()+" "+e}function y(e){return(e+256).toString(16).substr(1)}function x(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[y(e[0]),y(e[1]),y(e[2]),y(e[3]),"-",y(e[4]),y(e[5]),"-",y(e[6]),y(e[7]),"-",y(e[8]),y(e[9]),"-",y(e[10]),y(e[11]),y(e[12]),y(e[13]),y(e[14]),y(e[15])].join("")}function k(){return Math.max(window.devicePixelRatio,1)}function C(e,t){return t?e+"*":e}function P(e,t){return t?t:e}function B(e){var t=e.label;return t?n("span.mr2.truncate",{title:t,class:u()},t):null}function I(e){var t=e.id,a=e.label,r=e.required;return a?n("label.mb1.db",{title:a,for:t,class:f()},C(a,r)):null}function S(e){return function(t){var a=t.target.value;return e(a)}}function U(e){return function(t){var a=t.target.checked;return e(a)}}function j(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function q(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var i=new Uint8Array(r);for(var o=0;o<r;o++){i[o]=a.charCodeAt(o)}return new Blob([i],{type:n})}function z(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function F(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var i=a.getUint16(r,false);r+=2;if(i===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var o=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,o);var l=a.getUint16(r,o);r+=2;for(var s=0;s<l;s++){if(a.getUint16(r+s*12,o)===274){return a.getUint16(r+s*12+8,o)}}}else if((i&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function L(e){return new Promise((function(t){var a=new FileReader;a.onload=function(){t(F(a.result))};a.readAsArrayBuffer(e)}))}function R(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function T(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File most be an image"))}return L(e).then((function(n){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var o=z(i.width,i.height,t),l=o[0],s=o[1];if(n>4){e.width=s;e.height=l}else{e.width=l;e.height=s}var c=e.getContext("2d");R(c,l,s,n);c.drawImage(i,0,0,l,s);r(e.toDataURL(a))};var o=new FileReader;o.onload=function(){return i.src=o.result};o.readAsDataURL(e)}))}))}var A=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.type,i=r===void 0?"button":r,o=t.title,l=o===void 0?a:o,s=t.icon,c=t.classes,u=t.disabled,f=t.style,d=t.onclick;return n("button.button-reset.pa2",{type:i,title:l,disabled:u,class:(u?"o-60":"dim pointer")+" "+g()+" "+c,style:f,onclick:d},s?n("i.fa-fw",{class:(a?"mr2":"")+" "+w(s)}):null,a)};return e}();var M=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=a.classes,i=a.style,o=t.value;return n(".pa2",{class:r,style:i},n.trust(o()))};return e}();var E=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.classes,o=i===void 0?"":i,s=a.style;return n(".pa2.flex.flex-wrap",{class:l.dspBrd()+" "+o,style:s},[B(a),n("span.ws-normal",{title:r(),class:d()},r())])};return e}();function H(e,t){if(e==="email"){return{href:"mailto:"+t,class:d()}}else if(e==="tel"){return{href:"tel:"+t,class:d()}}else{return{href:t,target:"_blank",class:d()}}}var _={email:"fa-envelope",tel:"fa-phone"};var D=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.classes,o=i===void 0?"":i,s=a.style;return n(".pa2.flex.flex-wrap",{class:l.dspBrd()+" "+o,style:s},[B(a),n("a.link.dim.pointer.ws-normal",H(a.type,r()),n("i.mr2",{class:w(_[a.type]||"fa-link")}),r())])};return e}();var O=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.classes,o=i===void 0?"":i,s=a.style;return n(".pa2.flex.flex-wrap",{class:l.dspBrd()+" "+o,style:s},[B(a),n("i.self-end",{class:l.inpCol()+" "+w(r()?"fa-check":"fa-times")})])};return e}();var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var o=r.classes,s=o===void 0?"":o,c=r.style;var u=a.find(r.options,{value:i()});var f=u?u.label:i();return n(".pa2.flex.flex-wrap",{class:l.dspBrd()+" "+s,style:c},[B(r),n("span.ws-normal",{title:f,class:d()},f)])};return e}();var Y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var o=r.classes,s=o===void 0?"":o,c=r.style;return n(".pa2.flex.flex-column",{class:l.dspBrd()+" "+s,style:c},[B(r),n(".flex.flex-column.mt1.nb1",a.map(i(),(function(e){var t=e.name,a=e.path;return n("a.pa2.mv1.link.ba.b--black-20.dim.pointer[target=_blank]",{href:a,class:d()},[n("i.mr2",{class:w("fa-file-download")}),t])})))])};return e}();var V=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return n(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n("img.contain",a),t])};return e}();var N=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var o=r.classes,s=o===void 0?"":o,c=r.style;return n(".pa2.flex.flex-column",{class:l.dspBrd()+" "+s,style:c},[B(r),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",a.map(i(),(function(e){var t=e.name,a=e.path,r=e.dataUrl;return n(V,{title:t,src:P(a,r),style:{"max-height":"6rem"}})})))])};return e}();var G=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var s=r.classes,c=s===void 0?"":s,u=r.style;var f=a.head(i());return n(".pa2.flex.flex-column",{class:l.dspBrd()+" "+c,style:u},[B(r),f?n("img.img.mt2.contain.self-center",{title:f.name,src:P(f.path,f.dataUrl),style:o}):n("i.mt2",{class:l.inpCol()+" "+w("fa-image")})])};return e}();var J=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,r=t.required;return n("label.mb2",C(a,r))};return e}();var K=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.type,s=r.name,c=s===void 0?o:s,u=r.placeholder,f=r.required,d=r.readonly,p=r.disabled,m=r.autofocus,h=r.autocomplete,g=r.spellcheck,b=r.instant,w=r.containerClass,y=r.classes,x=y===void 0?"":y;return[I(r),n(".w-100",{class:w},n("input.input-reset.border-box.w-100",(t={id:o,name:c,type:l,value:i(),class:(p?"o-60":"")+" "+v()+" "+x,placeholder:u,required:f,readonly:d,disabled:p,autofocus:m,autocomplete:h,spellcheck:g},t[b?"oninput":"onchange"]=S(i),t)))]};return e}();var Q=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.label,o=a.id,l=a.name,s=l===void 0?o:l,c=a.required,u=a.readonly,f=a.disabled,p=a.autocomplete,v=a.containerClass,m=a.classes,h=m===void 0?"":m;return n("div",{class:v},n(".flex.flex-wrap",{class:d()},n("label.flex.items-center",{class:(f?"o-60":u?"":"pointer")+" "+h},n("input.mr1[type=checkbox]",{id:o,name:s,checked:r(),required:c,autocomplete:p,disabled:f||u,onchange:U(r)}),C(i,c))))};return e}();var X=function(){function e(){this.showPassword=t(false)}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.name,s=l===void 0?o:l,c=r.placeholder,u=r.required,d=r.readonly,p=r.disabled,m=r.autofocus,h=r.autocomplete,g=r.instant,b=r.containerClass,w=r.classes,y=w===void 0?"":w;return[n(".flex.justify-between",[I(r),n(Q,{field:{id:"showpass",label:"Show Password",type:"checkbox",containerClass:"mb1 "+f()},value:this.showPassword})]),n(".w-100",{class:b},n("input.input-reset.border-box.w-100",(t={id:o,name:s,type:this.showPassword()?"text":"password",value:i(),class:(p?"o-60":"")+" "+v()+" "+y,placeholder:c,required:u,readonly:d,disabled:p,autofocus:m,autocomplete:h,autocorrect:"off"},t[g?"oninput":"onchange"]=S(i),t)))]};return e}();var Z=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.name,s=l===void 0?o:l,c=r.placeholder,u=r.required,f=r.readonly,d=r.disabled,v=r.autofocus,m=r.autocomplete,h=r.spellcheck,g=r.instant,b=r.containerClass,w=r.classes,y=w===void 0?"":w;return[I(r),n("div",{class:b},n("textarea.border-box.w-100[rows=3]",(t={id:o,name:s,value:i(),class:(d?"o-60":"")+" "+p()+" "+y,placeholder:c,required:u,readonly:f,disabled:d,autofocus:v,autocomplete:m,spellcheck:h,style:{resize:"vertical"}},t[g?"oninput":"onchange"]=S(i),t)))]};return e}();var $=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,u=o.required,f=o.readonly,p=o.disabled,v=o.autocomplete,m=o.containerClass,h=o.classes,g=h===void 0?"":h,b=o.options;return[I(r),n("div",{class:m},n(".flex.flex-wrap",{class:d(),onchange:S(i)},a.map(b,(function(e){var t=e.label,a=e.value;return n("label.flex.items-center",{class:(p?"o-60":f?"":"pointer")+" "+g},n("input.mr1[type=radio]",{name:c,value:a,checked:i()===a,required:u,autocomplete:v,disabled:p||f}),t)}))))]};return e}();var ee=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,u=o.required,f=o.readonly,d=o.disabled,p=o.autofocus,m=o.autocomplete,h=o.containerClass,g=o.classes,b=g===void 0?"":g,w=o.options;return[I(r),n("div",{class:h},n("select.input-reset.border-box.w-100",{id:l,name:c,value:i(),class:(d?"o-60":f?"":"pointer")+" "+v()+" "+b,required:u,readonly:f,disabled:d,autofocus:p,autocomplete:m,onchange:S(i)},a.map(w,(function(e){var t=e.label,a=e.value;return n("option",{value:a,disabled:d||f},t)}))))]};return e}();function te(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function ae(e){return function(t){t.preventDefault();e(false)}}function ne(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function re(e){return function(t){var a=t.target.files;return e(a)}}var ie=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=r.label,o=r.id,l=r.name,s=l===void 0?o:l,c=r.required,u=r.readonly,d=r.disabled,p=r.autofocus,v=r.containerClass,m=v===void 0?"":v,h=t.accept,g=h===void 0?"*":h,b=t.multiple,w=b===void 0?true:b,y=t.dragging,x=t.onSet,k=e.children;return n("label",a.extend({for:o,title:i,class:(d?"o-60":u?"":"pointer")+" "+m},d||u?{}:{ondragover:te(y),ondragleave:ae(y),ondrop:ne(y,x)}),[n("input.clip[type=file]",{id:o,name:s,multiple:w,accept:g,required:c,autofocus:p,disabled:d||u,onchange:re(x)}),i?n("span.db.mb1",{title:i,class:f()},C(i,c)):null,k])};return e}();function oe(e){return function(t){var n=e();a.each(t,(function(e){n.push({guid:x(),name:e.name,path:"not_set",file:e})}));e(n)}}function le(e,t){return function(){var n=e();a.remove(n,{guid:t});e(n)}}var se=function(){function e(){this.dragging=t(false)}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;return[n(ie,{field:r,dragging:this.dragging,onSet:oe(i)},n(".pa2",{class:this.dragging()?h():m()},[n("i.mr2",{class:w("fa-file-upload")}),n("span","Add file(s)...")])),n(".flex.flex-column.mt1.nb1",a.map(i(),(function(e){return n("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[n("i.mr2",{class:w("fa-file-download")}),e.name,n("i.child.fr",{title:"Remove "+e.name,class:w("fa-trash-alt"),onclick:le(i,e.guid)})])})))]};return e}();function ce(e){return function(t){var n=a.head(t);if(!n){return}e([{guid:x(),name:n.name,path:"not_set",file:n}])}}var ue=function(){function e(){this.dragging=t(false)}e.prototype.view=function(e){var t=e.attrs,r=t.field,i=t.value;var o=a.head(i());return n(ie,{field:r,multiple:false,dragging:this.dragging,onSet:ce(i)},n(".pa2",{class:this.dragging()?h():m()},[n("i.mr2",{class:w("fa-file-upload")}),n("span",o?o.name:"Upload...")]))};return e}();function fe(e,t){return function(r){var i="image/jpeg";var o=e();return Promise.all(a.map(r,(function(e){return T(e,t,i).then((function(t){var a=j(e.name)[0];var n=new File([q(t)],a+".jpg",{type:i});o.push({guid:x(),name:n.name,path:"not_set",file:n,dataUrl:t})}))}))).then((function(){e(o);n.redraw()}))}}var de=function(){function e(){this.dragging=t(false)}e.prototype.view=function(t){var r=t.attrs,i=r.field,o=r.value;var l=i.classes,s=l===void 0?"":l;return[n(ie,{field:i,accept:"image/*",dragging:this.dragging,onSet:fe(o,e.maxImageSize)},n(".w-100.pa1.dt.tc",{class:(this.dragging()?h():m())+" "+s},n("i.fa-2x.dtc.v-mid",{class:w("fa-camera")}))),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",a.map(o(),(function(e){return n(V,{src:P(e.path,e.dataUrl),style:{"max-height":"6rem"}},n(".pa2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,class:g(),onclick:le(o,e.guid)},n("i.fa-lg",{class:w("fa-trash-alt")})))})))]};e.maxImageSize=1280;return e}();function pe(e,t){return function(r){var i=a.head(r);if(!i){return Promise.resolve()}var o="image/jpeg";return T(i,t,o).then((function(t){var a=j(i.name)[0];var r=new File([q(t)],a+".jpg",{type:o});e([{guid:x(),name:r.name,path:"not_set",file:r,dataUrl:t}]);n.redraw()}))}}var ve=function(){function e(){this.dragging=t(false)}e.prototype.view=function(t){var r=t.attrs,i=r.field,l=r.value;var s=a.head(l());var c=i.classes,u=c===void 0?"":c;return n(ie,{field:i,accept:"image/*",multiple:false,dragging:this.dragging,onSet:pe(l,e.maxImageSize)},n(".w-100.pa1.contain.dt.tc",{class:(this.dragging()?h():m())+" "+u},s?n("img.img.contain",{title:s.name,src:P(s.path,s.dataUrl),style:o}):n("i.fa-2x.dtc.v-mid",{class:w("fa-camera")})))};e.maxImageSize=1280;return e}();var me=function(){function e(){this.signaturePad=null}e.prototype.oncreate=function(e){var t=this;var n=e.dom;var i=n.children[0];var o=k();this.signaturePad=new r(i,{minWidth:.5*o,maxWidth:1.5*o});var l=function(){var e=k();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var a=i.getContext("2d");a.scale(e,e);t.resetCanvas()};this.resizeHandler=a.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};e.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};e.prototype.view=function(e){var t=this;var a=e.attrs,r=a.onSet,o=a.onCancel;return[n(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:i},n("canvas.aspect-ratio--object")),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(A,{title:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(t.signaturePad&&!t.signaturePad.isEmpty()){r(t.signaturePad.toDataURL("image/png"))}}}),n(A,{title:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return t.resetCanvas()}}),n(A,{title:"Cancel",icon:"fa-times",classes:"ma1",onclick:o})])]};e.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return e}();function he(e,t){return function(){if(e()){var a=document.createElement("canvas");a.width=600;a.height=150;var n=.56*a.height;var r=a.getContext("2d");r.textBaseline="middle";r.font=n+"px Caveat";r.fillText(e(),a.height*.05,n);t(a.toDataURL())}return false}}var ge=function(){function e(){this.text=t("")}e.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,r=a.onSet,o=a.onCancel;return[n("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:i,onsubmit:he(this.text,r)},n("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:S(this.text),value:this.text(),style:{"font-family":"Caveat"}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(A,{title:"Apply",icon:"fa-check",classes:"ma1",onclick:he(this.text,r)}),n(A,{title:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return t.text("")}}),n(A,{title:"Cancel",icon:"fa-times",classes:"ma1",onclick:o})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function be(e,t){var a=window.getComputedStyle(e);var n=k();e.width=e.clientWidth*n;e.height=e.clientHeight*n;var r=.56*e.height;var i=e.getContext("2d");i.clearRect(0,0,e.width,e.height);i.textBaseline="middle";i.font=a["fontWeight"]+" "+r+"px "+a["fontFamily"];i.fillText(t?"":"",e.height*.25,e.height*.52);i.font="200 "+r+"px sans-serif";i.fillText(t?"Accepted":"Accept",e.height,r)}var we=function(){function e(){this.checked=t(false)}e.prototype.oncreate=function(e){var t=e.dom;this.canvas=t.children[0];be(this.canvas,this.checked())};e.prototype.onupdate=function(){if(this.canvas){be(this.canvas,this.checked())}};e.prototype.view=function(e){var t=this;var a=e.attrs,r=a.onSet,o=a.onCancel;return[n(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:i},n("canvas.aspect-ratio--object.pointer",{class:l.icon(),onclick:function(){return t.checked(!t.checked())}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(A,{title:"Apply",icon:"fa-check",classes:"ma1",disabled:!this.checked(),onclick:function(){if(t.canvas){r(t.canvas.toDataURL())}}}),n(A,{title:"Cancel",icon:"fa-times",classes:"ma1",onclick:o})])]};return e}();function ye(e,t){return new Promise((function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=z(n.width,n.height,t),i=r[0],o=r[1];e.width=i;e.height=o;var l=e.getContext("2d");l.drawImage(n,0,0,i,o);a(e.toDataURL())};n.src=e}))}function xe(e,t,a){return function(r){return ye(r,a).then((function(a){var r=new File([q(a)],"sign-"+t+".png",{type:"image/png"});e([{guid:x(),name:r.name,path:"not_set",file:r,dataUrl:a}]);n.redraw()}))}}var ke=function(){function e(){}e.prototype.oninit=function(e){var t=this;var a=e.attrs.value;a.map((function(){return t.component=undefined}))};e.prototype.view=function(t){var r=this;var o=t.attrs,l=o.field,s=o.value;var c=l.id,u=l.readonly,f=l.disabled,d=l.classes,p=d===void 0?"":d,v=l.containerClass;var h=a.head(s());return n(".relative",{class:v},[I(l),this.component?n(this.component,{onSet:xe(s,c,e.maxImageSize),onCancel:function(){return r.component=undefined}}):u||f?n(".aspect-ratio",{id:c,class:p,style:i},h?n(".aspect-ratio--object",n("img.img.w-100.absolute",{src:P(h.path,h.dataUrl)})):null):n(".aspect-ratio.pointer",{id:c,class:m()+" "+p,style:i},h?n(".aspect-ratio--object.hide-child.dim",{onclick:function(){return s([])}},[n("img.img.w-100.absolute",{src:P(h.path,h.dataUrl)}),n(".pa3.absolute.top-0.right-0.child",n("i.fa-2x",{class:w("fa-eraser")}))]):n(".aspect-ratio--object.flex.items-stretch.justify-center",[n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return r.component=me}},n("i.fa-2x",{class:w("fa-pen-nib")}),n("span.mt2","Draw")),n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return r.component=ge}},n("i.fa-2x",{class:w("fa-keyboard")}),n("span.mt2","Type")),n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return r.component=we}},n("i.fa-2x",{class:w("fa-stamp")}),n("span.mt2","Accept"))]))])};e.maxImageSize=640;return e}();e.BaseInput=K;e.BaseText=E;e.Button=A;e.Checkbox=O;e.CheckboxInput=Q;e.FileList=Y;e.FileMulti=se;e.FileSelect=ue;e.ImageList=N;e.ImageMulti=de;e.ImagePreview=G;e.ImageSelect=ve;e.Label=J;e.Link=D;e.PasswordInput=X;e.RadioInput=$;e.SelectInput=ee;e.SelectText=W;e.SignBuilder=ke;e.TextareaInput=Z;e.Trusted=M;e.fileNameExtSplit=j;e.getIcon=w;e.guid=x;e.iconMap=_;e.linkAttrs=H;e.updateTheme=b;Object.defineProperty(e,"__esModule",{value:true})}));
