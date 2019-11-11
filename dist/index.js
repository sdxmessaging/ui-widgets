import e from"lodash";import t from"mithril/stream";import n from"mithril";import a from"signature_pad";var r={imageMaxSize:1280,addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link"};var i=r;function o(t){e.assign(r,t)}var l={"padding-bottom":"25%"};var s={"max-height":"16rem"};var c={icon:t("fas"),lblCol:t("silver"),lblFnt:t("f6"),dspFnt:t("truncate"),dspBrd:t("bb b--black-20"),inpHgt:t("h2"),inpCol:t("dark-gray"),inpFnt:t("fw2"),inpBrd:t("bn"),filBrd:t("ba bw1 br3 b--dashed"),filBrdCol:t("b--black-30"),drgCol:t("b--blue"),drgBrdCol:t("blue"),btnBg:t("bg-light-blue"),btnCol:t("dark-gray"),btnFnt:t(""),btnBrd:t("bn br2")};function u(e){return e.join(" ")}function d(n,a){if(a===void 0){a=[]}return t.merge(e.concat(e.map(n,(function(e){return c[e]})),a)).map(u)}var f=d(["lblCol","dspFnt"]);var p=d(["lblCol","lblFnt"]);var v=d(["inpCol","inpFnt"]);var m=d(["inpBrd"],[v]);var h=d(["inpHgt"],[m]);var g=d(["filBrd","filBrdCol"],[v]);var b=d(["inpFnt","filBrd","drgCol","drgBrdCol"]);var w=d(["btnBg","btnCol","btnFnt","btnBrd"]);function y(t){e.forEach(t,(function(e,t){if(e&&t in c){c[t](e)}}))}function x(e){return c.icon()+" "+e}function I(e){return(e+256).toString(16).substr(1)}function k(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[I(e[0]),I(e[1]),I(e[2]),I(e[3]),"-",I(e[4]),I(e[5]),"-",I(e[6]),I(e[7]),"-",I(e[8]),I(e[9]),"-",I(e[10]),I(e[11]),I(e[12]),I(e[13]),I(e[14]),I(e[15])].join("")}function T(){return Math.max(window.devicePixelRatio,1)}function C(e,t){return t?e+"*":e}function U(e,t){return t?t:e}function B(e){var t=e.label;return t?n("span.mr2.truncate",{title:t,class:f()},t):null}function P(e){var t=e.id,a=e.label,r=e.required;return a?n("label.mb1.db",{title:a,for:t,class:p()},C(a,r)):null}function S(e){return function(t){var n=t.target.value;return e(n)}}function F(e){return function(t){var n=t.target.checked;return e(n)}}function z(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function q(e){var t=e.split(",");var n=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var a=t[0].split(":")[1].split(";")[0];var r=n.length;var i=new Uint8Array(r);for(var o=0;o<r;o++){i[o]=n.charCodeAt(o)}return new Blob([i],{type:a})}function j(e,t,n){if(e>t){if(e>n){return[n,Math.round(t*n/e)]}}else if(t>n){return[Math.round(e*n/t),n]}return[e,t]}function R(e){var t=Math.min(e.byteLength,64*1024);var n=new DataView(e,0,t);if(n.getUint16(0,false)!==65496){return-2}var a=n.byteLength;var r=2;while(r<a){var i=n.getUint16(r,false);r+=2;if(i===65505){if(n.getUint32(r+=2,false)!==1165519206){return-1}var o=n.getUint16(r+=6,false)===18761;r+=n.getUint32(r+4,o);var l=n.getUint16(r,o);r+=2;for(var s=0;s<l;s++){if(n.getUint16(r+s*12,o)===274){return n.getUint16(r+s*12+8,o)}}}else if((i&65280)!==65280){break}else{r+=n.getUint16(r,false)}}return-1}function D(e){return new Promise((function(t){var n=new FileReader;n.onload=function(){t(R(n.result))};n.readAsArrayBuffer(e)}))}function M(e,t,n,a){if(!a||a>8){return}switch(a){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,n);e.rotate(Math.PI);return;case 4:e.translate(0,n);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-n);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-n);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function L(e,t,n){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File most be an image"))}return D(e).then((function(a){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var o=j(i.width,i.height,t),l=o[0],s=o[1];if(a>4){e.width=s;e.height=l}else{e.width=l;e.height=s}var c=e.getContext("2d");M(c,l,s,a);c.drawImage(i,0,0,l,s);r(e.toDataURL(n))};var o=new FileReader;o.onload=function(){return i.src=o.result};o.readAsDataURL(e)}))}))}var E=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.type,i=r===void 0?"button":r,o=t.title,l=o===void 0?a:o,s=t.icon,c=t.classes,u=t.disabled,d=t.style,f=t.onclick;return n("button.button-reset.pa2",{type:i,title:l,disabled:u,class:(u?"o-60":"dim pointer")+" "+w()+" "+c,style:d,onclick:f},s?n("i.fa-fw",{class:(a?"mr2":"")+" "+x(s)}):null,a)};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=a.classes,i=a.style,o=t.value;return n(".pa2",{class:r,style:i},n.trust(o()))};return e}();var A=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.classes,o=i===void 0?"":i,l=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+o,style:l},[B(a),n("span.ws-normal",{title:r(),class:v()},r())])};return e}();function _(e,t){if(e==="email"){return{href:"mailto:"+t,class:v()}}else if(e==="tel"){return{href:"tel:"+t,class:v()}}else{return{href:t,target:"_blank",class:v()}}}var O={email:i.emailIcn,tel:i.telIcn};var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var o=a.type,l=a.classes,s=l===void 0?"":l,u=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+s,style:u},[B(a),n("a.link.dim.pointer.ws-normal",_(o,r()),n("i.mr2",{class:x(O[o]||i.linkIcn)}),r())])};return e}();var V=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var o=a.classes,l=o===void 0?"":o,s=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+l,style:s},[B(a),n("i.self-end",{class:c.inpCol()+" "+x(r()?i.checkIcn:i.uncheckIcn)})])};return e}();var Y=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r.classes,l=o===void 0?"":o,s=r.style;var u=e.find(r.options,{value:i()});var d=u?u.label:i();return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+l,style:s},[B(r),n("span.ws-normal",{title:d,class:v()},d)])};return t}();var G=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.classes,s=l===void 0?"":l,u=r.style;return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+s,style:u},[B(r),n(".flex.flex-column.mt1.nb1",e.map(o(),(function(e){var t=e.name,a=e.path;return n("a.pa2.mv1.link.ba.b--black-20.dim.pointer[target=_blank]",{href:a,class:v()},[n("i.mr2",{class:x(i.downloadIcn)}),t])})))])};return t}();var J=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return n(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n("img.contain",a),t])};return e}();var K=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r.classes,l=o===void 0?"":o,s=r.style;return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+l,style:s},[B(r),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(i(),(function(e){var t=e.name,a=e.path,r=e.dataUrl;return n(J,{title:t,src:U(a,r),style:{"max-height":"6rem"}})})))])};return t}();var N=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.classes,u=l===void 0?"":l,d=r.style;var f=e.head(o());return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+u,style:d},[B(r),f?n("img.img.mt2.contain.self-center",{title:f.name,src:U(f.path,f.dataUrl),style:s}):n("i.mt2",{class:c.inpCol()+" "+x(i.imageIcn)})])};return t}();var Q=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,r=t.required;return n("label.mb2",C(a,r))};return e}();var X=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.type,s=r.name,c=s===void 0?o:s,u=r.placeholder,d=r.required,f=r.readonly,p=r.disabled,v=r.autofocus,m=r.autocomplete,g=r.spellcheck,b=r.instant,w=r.containerClass,y=r.classes,x=y===void 0?"":y;return[P(r),n(".w-100",{class:w},n("input.input-reset.border-box.w-100",(t={id:o,name:c,type:l,value:i(),class:(p?"o-60":"")+" "+h()+" "+x,placeholder:u,required:d,readonly:f,disabled:p,autofocus:v,autocomplete:m,spellcheck:g},t[b?"oninput":"onchange"]=S(i),t)))]};return e}();var Z=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.label,o=a.id,l=a.name,s=l===void 0?o:l,c=a.required,u=a.readonly,d=a.disabled,f=a.autocomplete,p=a.containerClass,m=a.classes,h=m===void 0?"":m;return n("div",{class:p},n(".flex.flex-wrap",{class:v()},n("label.flex.items-center",{class:(d?"o-60":u?"":"pointer")+" "+h},n("input.mr1[type=checkbox]",{id:o,name:s,checked:r(),required:c,autocomplete:f,disabled:d||u,onchange:F(r)}),C(i,c))))};return e}();var $=function(){function e(){this.showPassword=t(false)}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,o=a.value;var l=r.id,s=r.name,c=s===void 0?l:s,u=r.placeholder,d=r.required,f=r.readonly,v=r.disabled,m=r.autofocus,g=r.autocomplete,b=r.instant,w=r.containerClass,y=r.classes,x=y===void 0?"":y;return[n(".flex.justify-between",[P(r),n(Z,{field:{id:"showpass",label:i.showPassTxt,type:"checkbox",containerClass:"mb1 "+p()},value:this.showPassword})]),n(".w-100",{class:w},n("input.input-reset.border-box.w-100",(t={id:l,name:c,type:this.showPassword()?"text":"password",value:o(),class:(v?"o-60":"")+" "+h()+" "+x,placeholder:u,required:d,readonly:f,disabled:v,autofocus:m,autocomplete:g,autocorrect:"off"},t[b?"oninput":"onchange"]=S(o),t)))]};return e}();var ee=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.name,s=l===void 0?o:l,c=r.placeholder,u=r.required,d=r.readonly,f=r.disabled,p=r.autofocus,v=r.autocomplete,h=r.spellcheck,g=r.instant,b=r.containerClass,w=r.classes,y=w===void 0?"":w;return[P(r),n("div",{class:b},n("textarea.border-box.w-100[rows=3]",(t={id:o,name:s,value:i(),class:(f?"o-60":"")+" "+m()+" "+y,placeholder:c,required:u,readonly:d,disabled:f,autofocus:p,autocomplete:v,spellcheck:h,style:{resize:"vertical"}},t[g?"oninput":"onchange"]=S(i),t)))]};return e}();var te=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,u=o.required,d=o.readonly,f=o.disabled,p=o.autocomplete,m=o.containerClass,h=o.classes,g=h===void 0?"":h,b=o.options;return[P(r),n("div",{class:m},n(".flex.flex-wrap",{class:v(),onchange:S(i)},e.map(b,(function(e){var t=e.label,a=e.value;return n("label.flex.items-center",{class:(f?"o-60":d?"":"pointer")+" "+g},n("input.mr1[type=radio]",{name:c,value:a,checked:i()===a,required:u,autocomplete:p,disabled:f||d}),t)}))))]};return t}();var ne=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,u=o.required,d=o.readonly,f=o.disabled,p=o.autofocus,v=o.autocomplete,m=o.containerClass,g=o.classes,b=g===void 0?"":g,w=o.options;return[P(r),n("div",{class:m},n("select.input-reset.border-box.w-100",{id:l,name:c,value:i(),class:(f?"o-60":d?"":"pointer")+" "+h()+" "+b,required:u,readonly:d,disabled:f,autofocus:p,autocomplete:v,onchange:S(i)},e.map(w,(function(e){var t=e.label,a=e.value;return n("option",{value:a,disabled:f||d},t)}))))]};return t}();function ae(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function re(e){return function(t){t.preventDefault();e(false)}}function ie(e,t){return function(n){n.preventDefault();e(false);if(n.dataTransfer){t(n.dataTransfer.files)}}}function oe(e){return function(t){var n=t.target.files;return e(n)}}var le=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=r.label,o=r.id,l=r.name,s=l===void 0?o:l,c=r.required,u=r.readonly,d=r.disabled,f=r.autofocus,v=r.containerClass,m=v===void 0?"":v,h=a.accept,g=h===void 0?"*":h,b=a.multiple,w=b===void 0?true:b,y=a.dragging,x=a.onSet,I=t.children;return n("label",e.extend({for:o,title:i,class:(d?"o-60":u?"":"pointer")+" "+m},d||u?{}:{ondragover:ae(y),ondragleave:re(y),ondrop:ie(y,x)}),[n("input.clip[type=file]",{id:o,name:s,multiple:w,accept:g,required:c,autofocus:f,disabled:d||u,onchange:oe(x)}),i?n("span.db.mb1",{title:i,class:p()},C(i,c)):null,I])};return t}();function se(t){return function(n){var a=t();e.each(n,(function(e){a.push({guid:k(),name:e.name,path:"not_set",file:e})}));t(a)}}function ce(t,n){return function(){var a=t();e.remove(a,{guid:n});t(a)}}var ue=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;return[n(le,{field:r,dragging:this.dragging,onSet:se(o)},n(".pa2",{class:this.dragging()?b():g()},[n("i.mr2",{class:x(i.uploadIcn)}),n("span",i.addFilesTxt)])),n(".flex.flex-column.mt1.nb1",e.map(o(),(function(e){return n("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[n("i.mr2",{class:x(i.downloadIcn)}),e.name,n("i.child.fr",{title:i.remFileTtl+" "+e.name,class:x(i.deleteIcn),onclick:ce(o,e.guid)})])})))]};return a}();function de(t){return function(n){var a=e.head(n);if(!a){return}t([{guid:k(),name:a.name,path:"not_set",file:a}])}}var fe=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=e.head(o());return n(le,{field:r,multiple:false,dragging:this.dragging,onSet:de(o)},n(".pa2",{class:this.dragging()?b():g()},[n("i.mr2",{class:x(i.uploadIcn)}),n("span",l?l.name:i.addFileTxt)]))};return a}();function pe(t,a){return function(r){var i="image/jpeg";var o=t();return Promise.all(e.map(r,(function(e){return L(e,a,i).then((function(t){var n=z(e.name)[0];var a=new File([q(t)],n+".jpg",{type:i});o.push({guid:k(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){t(o);n.redraw()}))}}var ve=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.classes,s=l===void 0?"":l;return[n(le,{field:r,accept:"image/*",dragging:this.dragging,onSet:pe(o,i.imageMaxSize)},n(".w-100.pa1.dt.tc",{class:(this.dragging()?b():g())+" "+s},n("i.fa-2x.dtc.v-mid",{class:x(i.cameraIcn)}))),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(o(),(function(e){return n(J,{src:U(e.path,e.dataUrl),style:{"max-height":"6rem"}},n(".pa2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,class:w(),onclick:ce(o,e.guid)},n("i.fa-lg",{class:x(i.deleteIcn)})))})))]};return a}();function me(t,a){return function(r){var i=e.head(r);if(!i){return Promise.resolve()}var o="image/jpeg";return L(i,a,o).then((function(e){var a=z(i.name)[0];var r=new File([q(e)],a+".jpg",{type:o});t([{guid:k(),name:r.name,path:"not_set",file:r,dataUrl:e}]);n.redraw()}))}}var he=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=e.head(o());var c=r.classes,u=c===void 0?"":c;return n(le,{field:r,accept:"image/*",multiple:false,dragging:this.dragging,onSet:me(o,i.imageMaxSize)},n(".w-100.pa1.contain.dt.tc",{class:(this.dragging()?b():g())+" "+u},l?n("img.img.contain",{title:l.name,src:U(l.path,l.dataUrl),style:s}):n("i.fa-2x.dtc.v-mid",{class:x(i.cameraIcn)})))};return a}();var ge=function(){function t(){this.signaturePad=null}t.prototype.oncreate=function(t){var n=this;var r=t.dom;var i=r.children[0];var o=T();this.signaturePad=new a(i,{minWidth:.5*o,maxWidth:1.5*o});var l=function(){var e=T();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var t=i.getContext("2d");t.scale(e,e);n.resetCanvas()};this.resizeHandler=e.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};t.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};t.prototype.view=function(e){var t=this;var a=e.attrs,r=a.onSet,o=a.onCancel;return[n(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:l},n("canvas.aspect-ratio--object")),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(E,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:function(){if(t.signaturePad&&!t.signaturePad.isEmpty()){r(t.signaturePad.toDataURL("image/png"))}}}),n(E,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),n(E,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};t.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return t}();function be(e,t){return function(){if(e()){var n=document.createElement("canvas");n.width=600;n.height=150;var a=.56*n.height;var r=n.getContext("2d");r.textBaseline="middle";r.font=a+"px Caveat";r.fillText(e(),n.height*.05,a);t(n.toDataURL())}return false}}var we=function(){function e(){this.text=t("")}e.prototype.oncreate=function(e){var t=e.dom;var n=t.children[0];n.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,r=a.onSet,o=a.onCancel;return[n("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:l,onsubmit:be(this.text,r)},n("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:S(this.text),value:this.text(),style:{"font-family":"Caveat"}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(E,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:be(this.text,r)}),n(E,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),n(E,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function ye(e,t){var n=.56*e.height;var a=e.getContext("2d");a.clearRect(0,0,e.width,e.height);a.textBaseline="middle";a.font=n+"px Caveat";a.fillText(t?i.stampSetTxt:i.stampTxt,e.height*.05,n)}var xe=function(){function e(){this.applied=t(false)}e.prototype.oncreate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs.onSet;return n(".aspect-ratio",{style:l},n(E,{label:i.stampSetTxt,classes:"aspect-ratio--object",onclick:function(){var e=window.document.createElement("canvas");e.width=640;e.height=160;ye(e,t.applied());console.debug(e.toDataURL());a(e.toDataURL())}}))};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function Ie(e,t){return new Promise((function(n){var a=new Image;a.onload=function(){var e=document.createElement("canvas");var r=j(a.width,a.height,t),i=r[0],o=r[1];e.width=i;e.height=o;var l=e.getContext("2d");l.drawImage(a,0,0,i,o);n(e.toDataURL())};a.src=e}))}function ke(e,t,a){return function(r){return Ie(r,a).then((function(a){var r=new File([q(a)],"sign-"+t+".png",{type:"image/png"});e([{guid:k(),name:r.name,path:"not_set",file:r,dataUrl:a}]);n.redraw()}))}}var Te=function(){function t(){}t.prototype.oninit=function(e){var t=this;var n=e.attrs.value;n.map((function(){return t.component=undefined}))};t.prototype.view=function(t){var a=this;var r=t.attrs,o=r.field,s=r.value;var c=o,u=c.id,d=c.readonly,f=c.disabled,p=c.classes,v=p===void 0?"":p,m=c.containerClass,h=c.options,b=h===void 0?i.signOpts:h;var w=e.head(s());var y=e(b).map((function(e){var t=e.value;if(t==="draw"){return{component:ge,icon:x(i.drawIcn),label:i.signDrawTxt}}else if(t==="type"){return{component:we,icon:x(i.typeIcn),label:i.signTypeTxt}}else if(t==="stamp"){return{component:xe,icon:x(i.stampIcn),label:i.signStampTxt}}return null})).compact().value();if(y.length===1&&!w){this.component=y[0].component}return n(".relative",{class:m},[P(o),d||f?n(".aspect-ratio",{id:u,class:v,style:l},w?n(".aspect-ratio--object",n("img.img.w-100.absolute",{src:U(w.path,w.dataUrl)})):null):this.component?n(this.component,{onSet:ke(s,u,i.signMaxSize),onCancel:function(){return a.component=undefined}}):n(".aspect-ratio.pointer",{id:u,class:g()+" "+v,style:l},w?n(".aspect-ratio--object.hide-child.dim",{onclick:function(){return s([])}},[n("img.img.w-100.absolute",{src:U(w.path,w.dataUrl)}),n(".pa3.absolute.top-0.right-0.child",n("i.fa-2x",{class:x(i.resetIcn)}))]):n(".aspect-ratio--object.flex.items-stretch.justify-center",e.map(y,(function(e){var t=e.component,r=e.icon,i=e.label;return n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return a.component=t}},n("i.fa-2x",{class:r}),n("span.mt2",i))}))))])};return t}();export{X as BaseInput,A as BaseText,E as Button,V as Checkbox,Z as CheckboxInput,G as FileList,ue as FileMulti,fe as FileSelect,K as ImageList,ve as ImageMulti,N as ImagePreview,he as ImageSelect,Q as Label,W as Link,$ as PasswordInput,te as RadioInput,ne as SelectInput,Y as SelectText,Te as SignBuilder,ee as TextareaInput,H as Trusted,z as fileNameExtSplit,x as getIcon,k as guid,O as iconMap,_ as linkAttrs,o as updateConfig,y as updateTheme};
