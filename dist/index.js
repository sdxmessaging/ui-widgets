import e from"lodash";import t from"mithril/stream";import n from"mithril";import a from"signature_pad";var r={imageMaxSize:1280,addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link"};var i=r;function o(t){e.assign(r,t)}var l={"padding-bottom":"25%"};var s={"max-height":"16rem"};var c={icon:t("fas"),lblCol:t("silver"),lblFnt:t("f6"),dspFnt:t("truncate"),dspBrd:t("bb b--black-20"),inpHgt:t("h2"),inpCol:t("dark-gray"),inpFnt:t("fw2"),inpBrd:t("bn"),filBrd:t("ba bw1 br3 b--dashed"),filBrdCol:t("b--black-30"),drgCol:t("b--blue"),drgBrdCol:t("blue"),btnBg:t("bg-light-blue"),btnCol:t("dark-gray"),btnFnt:t(""),btnBrd:t("bn br2")};function u(e){return e.join(" ")}function d(n,a){if(a===void 0){a=[]}return t.merge(e.concat(e.map(n,(function(e){return c[e]})),a)).map(u)}var f=d(["lblCol","dspFnt"]);var p=d(["lblCol","lblFnt"]);var v=d(["inpCol","inpFnt"]);var m=d(["inpBrd"],[v]);var h=d(["inpHgt"],[m]);var g=d(["filBrd","filBrdCol"],[v]);var b=d(["inpFnt","filBrd","drgCol","drgBrdCol"]);var w=d(["btnBg","btnCol","btnFnt","btnBrd"]);function y(t){e.forEach(t,(function(e,t){if(e&&t in c){c[t](e)}}))}function x(e){return c.icon()+" "+e}function I(e){return(e+256).toString(16).substr(1)}function k(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[I(e[0]),I(e[1]),I(e[2]),I(e[3]),"-",I(e[4]),I(e[5]),"-",I(e[6]),I(e[7]),"-",I(e[8]),I(e[9]),"-",I(e[10]),I(e[11]),I(e[12]),I(e[13]),I(e[14]),I(e[15])].join("")}function T(){return Math.max(window.devicePixelRatio,1)}function C(e,t){return t?e+"*":e}function U(e,t){return t?t:e}function F(e){var t=e.label;return t?n("span.mr2.truncate",{title:t,class:f()},t):null}function P(e){var t=e.id,a=e.label,r=e.required;return a?n("label.mb1.db",{title:a,for:t,class:p()},C(a,r)):null}function S(e){return function(t){var n=t.target.value;return e(n)}}function B(e){return function(t){var n=t.target.checked;return e(n)}}function z(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function q(e){var t=e.split(",");var n=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var a=t[0].split(":")[1].split(";")[0];var r=n.length;var i=new Uint8Array(r);for(var o=0;o<r;o++){i[o]=n.charCodeAt(o)}return new Blob([i],{type:a})}function j(e,t,n){if(e>t){if(e>n){return[n,Math.round(t*n/e)]}}else if(t>n){return[Math.round(e*n/t),n]}return[e,t]}function M(e){var t=Math.min(e.byteLength,64*1024);var n=new DataView(e,0,t);if(n.getUint16(0,false)!==65496){return-2}var a=n.byteLength;var r=2;while(r<a){var i=n.getUint16(r,false);r+=2;if(i===65505){if(n.getUint32(r+=2,false)!==1165519206){return-1}var o=n.getUint16(r+=6,false)===18761;r+=n.getUint32(r+4,o);var l=n.getUint16(r,o);r+=2;for(var s=0;s<l;s++){if(n.getUint16(r+s*12,o)===274){return n.getUint16(r+s*12+8,o)}}}else if((i&65280)!==65280){break}else{r+=n.getUint16(r,false)}}return-1}function D(e){return new Promise((function(t){var n=new FileReader;n.onload=function(){t(M(n.result))};n.readAsArrayBuffer(e)}))}function H(e,t,n,a){if(!a||a>8){return}switch(a){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,n);e.rotate(Math.PI);return;case 4:e.translate(0,n);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-n);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-n);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function R(e,t,n){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File most be an image"))}return D(e).then((function(a){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var o=j(i.width,i.height,t),l=o[0],s=o[1];if(a>4){e.width=s;e.height=l}else{e.width=l;e.height=s}var c=e.getContext("2d");H(c,l,s,a);c.drawImage(i,0,0,l,s);r(e.toDataURL(n))};var o=new FileReader;o.onload=function(){return i.src=o.result};o.readAsDataURL(e)}))}))}function A(e,t,n,a){var r=document.createElement("canvas");r.width=t;r.height=n;var i=.56*r.height;var o=r.getContext("2d");o.textBaseline="middle";o.font=i+"px "+a;o.fillText(e,r.height*.05,i);return r.toDataURL()}var E=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.type,i=r===void 0?"button":r,o=t.title,l=o===void 0?a:o,s=t.icon,c=t.classes,u=t.disabled,d=t.style,f=t.onclick;return n("button.button-reset.pa2",{type:i,title:l,disabled:u,class:(u?"o-60":"pointer")+" "+w()+" "+c,style:d,onclick:f},s?n("i.fa-fw",{class:(a?"mr2":"")+" "+x(s)}):null,a)};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=a.classes,i=a.style,o=t.value;return n(".pa2",{class:r,style:i},n.trust(o()))};return e}();var _=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.classes,o=i===void 0?"":i,l=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+o,style:l},[F(a),n("span.ws-normal",{title:r(),class:v()},r())])};return e}();function O(e,t){if(e==="email"){return{href:"mailto:"+t,class:v()}}else if(e==="tel"){return{href:"tel:"+t,class:v()}}else{return{href:t,target:"_blank",class:v()}}}var W={email:i.emailIcn,tel:i.telIcn};var V=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var o=a.type,l=a.classes,s=l===void 0?"":l,u=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+s,style:u},[F(a),n("a.link.dim.pointer.ws-normal",O(o,r()),n("i.mr2",{class:x(W[o]||i.linkIcn)}),r())])};return e}();var Y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var o=a.classes,l=o===void 0?"":o,s=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+l,style:s},[F(a),n("i.self-end",{class:c.inpCol()+" "+x(r()?i.checkIcn:i.uncheckIcn)})])};return e}();var G=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r.classes,l=o===void 0?"":o,s=r.style;var u=e.find(r.options,{value:i()});var d=u?u.label:i();return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+l,style:s},[F(r),n("span.ws-normal",{title:d,class:v()},d)])};return t}();var J=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.classes,s=l===void 0?"":l,u=r.style;return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+s,style:u},[F(r),n(".flex.flex-column.mt1.nb1",e.map(o(),(function(e){var t=e.name,a=e.path;return n("a.pa2.mv1.link.ba.b--black-20.dim.pointer[target=_blank]",{href:a,class:v()},[n("i.mr2",{class:x(i.downloadIcn)}),t])})))])};return t}();var K=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return n(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n("img.contain",a),t])};return e}();var N=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r.classes,l=o===void 0?"":o,s=r.style;return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+l,style:s},[F(r),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(i(),(function(e){var t=e.name,a=e.path,r=e.dataUrl;return n(K,{title:t,src:U(a,r),style:{"max-height":"6rem"}})})))])};return t}();var Q=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.classes,u=l===void 0?"":l,d=r.style;var f=e.head(o());return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+u,style:d},[F(r),f?n("img.img.mt2.contain.self-center",{title:f.name,src:U(f.path,f.dataUrl),style:s}):n("i.mt2",{class:c.inpCol()+" "+x(i.imageIcn)})])};return t}();var X=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,r=t.title,i=r===void 0?a:r,o=t.required;return n("label.mb2",{title:i},C(a,o))};return e}();var Z=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.label,l=r.id,s=r.type,c=r.name,u=c===void 0?l:c,d=r.title,f=d===void 0?o:d,p=r.placeholder,v=r.max,m=r.maxlength,g=r.min,b=r.minlength,w=r.step,y=r.required,x=r.readonly,I=r.disabled,k=r.autofocus,T=r.autocomplete,C=r.pattern,U=r.inputmode,F=r.spellcheck,B=r.instant,z=r.containerClass,q=r.classes,j=q===void 0?"":q;return[P(r),n(".w-100",{class:z},n("input.input-reset.border-box.w-100",(t={id:l,type:s,name:u,title:f,placeholder:p,max:v,maxlength:m,min:g,minlength:b,step:w,required:y,readonly:x,disabled:I,autofocus:k,autocomplete:T,pattern:C,inputmode:U,spellcheck:F,value:i(),class:(I?"o-60":"")+" "+h()+" "+j},t[B?"oninput":"onchange"]=S(i),t)))]};return e}();var $=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.label,o=a.id,l=a.name,s=l===void 0?o:l,c=a.title,u=c===void 0?i:c,d=a.required,f=a.readonly,p=a.disabled,m=a.autocomplete,h=a.containerClass,g=a.classes,b=g===void 0?"":g;return n("div",{class:h},n(".flex.flex-wrap",{class:v()},n("label.flex.items-center",{title:u,class:(p?"o-60":f?"":"pointer")+" "+b},n("input.mr1[type=checkbox]",{id:o,name:s,checked:r(),required:d,autocomplete:m,disabled:p||f,onchange:B(r)}),C(i,d))))};return e}();var ee=function(){function e(){this.showPassword=t(false)}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,o=a.value;var l=r.label,s=r.id,c=r.name,u=c===void 0?s:c,d=r.title,f=d===void 0?l:d,v=r.placeholder,m=r.maxlength,g=r.minlength,b=r.required,w=r.readonly,y=r.disabled,x=r.autofocus,I=r.autocomplete,k=r.instant,T=r.containerClass,C=r.classes,U=C===void 0?"":C;return[n(".flex.justify-between",[P(r),n($,{field:{id:"showpass",label:i.showPassTxt,type:"checkbox",containerClass:"mb1 "+p()},value:this.showPassword})]),n(".w-100",{class:T},n("input.input-reset.border-box.w-100",(t={id:s,name:u,title:f,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:g,required:b,readonly:w,disabled:y,autofocus:x,autocomplete:I,value:o(),class:(y?"o-60":"")+" "+h()+" "+U,autocorrect:"off"},t[k?"oninput":"onchange"]=S(o),t)))]};return e}();var te=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.label,l=r.id,s=r.name,c=s===void 0?l:s,u=r.title,d=u===void 0?o:u,f=r.placeholder,p=r.required,v=r.readonly,h=r.disabled,g=r.autofocus,b=r.autocomplete,w=r.spellcheck,y=r.instant,x=r.containerClass,I=r.classes,k=I===void 0?"":I;return[P(r),n("div",{class:x},n("textarea.border-box.w-100[rows=3]",(t={id:l,name:c,title:d,placeholder:f,required:p,readonly:v,disabled:h,autofocus:g,autocomplete:b,spellcheck:w,value:i(),class:(h?"o-60":"")+" "+m()+" "+k,style:{resize:"vertical"}},t[y?"oninput":"onchange"]=S(i),t)))]};return e}();var ne=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,u=o.required,d=o.readonly,f=o.disabled,p=o.autocomplete,m=o.containerClass,h=o.classes,g=h===void 0?"":h,b=o.options;return[P(r),n("div",{class:m},n(".flex.flex-wrap",{class:v(),onchange:S(i)},e.map(b,(function(e){var t=e.label,a=e.value;return n("label.flex.items-center",{title:t,class:(f?"o-60":d?"":"pointer")+" "+g},n("input.mr1[type=radio]",{name:c,value:a,checked:i()===a,required:u,autocomplete:p,disabled:f||d}),t)}))))]};return t}();var ae=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r,l=o.label,s=o.id,c=o.name,u=c===void 0?s:c,d=o.title,f=d===void 0?l:d,p=o.required,v=o.readonly,m=o.disabled,g=o.autofocus,b=o.autocomplete,w=o.containerClass,y=o.classes,x=y===void 0?"":y,I=o.options;return[P(r),n("div",{class:w},n("select.input-reset.border-box.w-100",{id:s,name:u,title:f,required:p,readonly:v,disabled:m,autofocus:g,autocomplete:b,value:i(),class:(m?"o-60":v?"":"pointer")+" "+h()+" "+x,onchange:S(i)},e.map(I,(function(e){var t=e.label,a=e.value;return n("option",{value:a,disabled:m||v},t)}))))]};return t}();function re(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function ie(e){return function(t){t.preventDefault();e(false)}}function oe(e,t){return function(n){n.preventDefault();e(false);if(n.dataTransfer){t(n.dataTransfer.files)}}}function le(e){return function(t){var n=t.target.files;return e(n)}}var se=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=r.label,o=r.id,l=r.name,s=l===void 0?o:l,c=r.title,u=c===void 0?i:c,d=r.required,f=r.readonly,v=r.disabled,m=r.autofocus,h=r.containerClass,g=h===void 0?"":h,b=a.accept,w=b===void 0?"*":b,y=a.multiple,x=y===void 0?true:y,I=a.dragging,k=a.onSet,T=t.children;return n("label",e.extend({for:o,title:i,class:(v?"o-60":f?"":"pointer")+" "+g},v||f?{}:{ondragover:re(I),ondragleave:ie(I),ondrop:oe(I,k)}),[n("input.clip[type=file]",{id:o,name:s,multiple:x,accept:w,required:d,autofocus:m,disabled:v||f,onchange:le(k)}),i?n("span.db.mb1",{title:u,class:p()},C(i,d)):null,T])};return t}();function ce(t){return function(n){var a=t();e.each(n,(function(e){a.push({guid:k(),name:e.name,path:"not_set",file:e})}));t(a)}}function ue(t,n){return function(){var a=t();e.remove(a,{guid:n});t(a)}}var de=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;return[n(se,{field:r,dragging:this.dragging,onSet:ce(o)},n(".pa2",{class:this.dragging()?b():g()},[n("i.mr2",{class:x(i.uploadIcn)}),n("span",i.addFilesTxt)])),n(".flex.flex-column.mt1.nb1",e.map(o(),(function(e){return n("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[n("i.mr2",{class:x(i.downloadIcn)}),e.name,n("i.child.fr",{title:i.remFileTtl+" "+e.name,class:x(i.deleteIcn),onclick:ue(o,e.guid)})])})))]};return a}();function fe(t){return function(n){var a=e.head(n);if(!a){return}t([{guid:k(),name:a.name,path:"not_set",file:a}])}}var pe=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=e.head(o());return n(se,{field:r,multiple:false,dragging:this.dragging,onSet:fe(o)},n(".pa2",{class:this.dragging()?b():g()},[n("i.mr2",{class:x(i.uploadIcn)}),n("span",l?l.name:i.addFileTxt)]))};return a}();function ve(t,a){return function(r){var i="image/jpeg";var o=t();return Promise.all(e.map(r,(function(e){return R(e,a,i).then((function(t){var n=z(e.name)[0];var a=new File([q(t)],n+".jpg",{type:i});o.push({guid:k(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){t(o);n.redraw()}))}}var me=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.classes,s=l===void 0?"":l;return[n(se,{field:r,accept:"image/*",dragging:this.dragging,onSet:ve(o,i.imageMaxSize)},n(".w-100.pa1.dt.tc",{class:(this.dragging()?b():g())+" "+s},n("i.fa-2x.dtc.v-mid",{class:x(i.cameraIcn)}))),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(o(),(function(e){return n(K,{src:U(e.path,e.dataUrl),style:{"max-height":"6rem"}},n(".pa2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,class:w(),onclick:ue(o,e.guid)},n("i.fa-lg",{class:x(i.deleteIcn)})))})))]};return a}();function he(t,a){return function(r){var i=e.head(r);if(!i){return Promise.resolve()}var o="image/jpeg";return R(i,a,o).then((function(e){var a=z(i.name)[0];var r=new File([q(e)],a+".jpg",{type:o});t([{guid:k(),name:r.name,path:"not_set",file:r,dataUrl:e}]);n.redraw()}))}}var ge=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=e.head(o());var c=r.classes,u=c===void 0?"":c;return n(se,{field:r,accept:"image/*",multiple:false,dragging:this.dragging,onSet:he(o,i.imageMaxSize)},n(".w-100.pa1.contain.dt.tc",{class:(this.dragging()?b():g())+" "+u},l?n("img.img.contain",{title:l.name,src:U(l.path,l.dataUrl),style:s}):n("i.fa-2x.dtc.v-mid",{class:x(i.cameraIcn)})))};return a}();var be=function(){function t(){this.signaturePad=null}t.prototype.oncreate=function(t){var n=this;var r=t.dom;var i=r.children[0];var o=T();this.signaturePad=new a(i,{minWidth:.5*o,maxWidth:1.5*o});var l=function(){var e=T();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var t=i.getContext("2d");t.scale(e,e);n.resetCanvas()};this.resizeHandler=e.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};t.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};t.prototype.view=function(e){var t=this;var a=e.attrs,r=a.onSet,o=a.onCancel;return[n(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:l},n("canvas.aspect-ratio--object")),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(E,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:function(){if(t.signaturePad&&!t.signaturePad.isEmpty()){r(t.signaturePad.toDataURL("image/png"))}}}),n(E,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),n(E,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};t.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return t}();function we(e,t){return function(){if(e()){var n=i.signMaxSize;var a=.25*n;t(A(e(),n,a,i.signFont))}return false}}var ye=function(){function e(){this.text=t("")}e.prototype.oncreate=function(e){var t=e.dom;var n=t.children[0];n.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,r=a.onSet,o=a.onCancel;return[n("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:l,onsubmit:we(this.text,r)},n("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:S(this.text),value:this.text(),style:{"font-family":i.signFont}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(E,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:we(this.text,r)}),n(E,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),n(E,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function xe(e){return function(){var t=i.signMaxSize;var n=.25*t;e(A(i.stampSetTxt,t,n,i.signFont))}}var Ie=function(){function e(){}e.prototype.oncreate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=e.attrs.onSet;return n(".aspect-ratio",{style:l},n(".aspect-ratio--object",n(E,{label:i.stampTxt,classes:"relative w-100 h-100",onclick:xe(t)})))};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function ke(e,t){return new Promise((function(n){var a=new Image;a.onload=function(){var e=document.createElement("canvas");var r=j(a.width,a.height,t),i=r[0],o=r[1];e.width=i;e.height=o;var l=e.getContext("2d");l.drawImage(a,0,0,i,o);n(e.toDataURL())};a.src=e}))}function Te(e,t,a){return function(r){return ke(r,a).then((function(a){var r=new File([q(a)],"sign-"+t+".png",{type:"image/png"});e([{guid:k(),name:r.name,path:"not_set",file:r,dataUrl:a}]);n.redraw()}))}}var Ce=function(){function t(){}t.prototype.oninit=function(e){var t=this;var n=e.attrs.value;n.map((function(){return t.component=undefined}))};t.prototype.view=function(t){var a=this;var r=t.attrs,o=r.field,s=r.value;var c=o,u=c.id,d=c.readonly,f=c.disabled,p=c.classes,v=p===void 0?"":p,m=c.containerClass,h=c.options,b=h===void 0?i.signOpts:h;var w=e.head(s());var y=e(b).map((function(e){var t=e.value;if(t==="draw"){return{component:be,icon:x(i.drawIcn),label:i.signDrawTxt}}else if(t==="type"){return{component:ye,icon:x(i.typeIcn),label:i.signTypeTxt}}else if(t==="stamp"){return{component:Ie,icon:x(i.stampIcn),label:i.signStampTxt}}return null})).compact().value();if(y.length===1&&!w){this.component=y[0].component}return n(".relative",{class:m},[P(o),d||f?n(".aspect-ratio",{id:u,class:v,style:l},w?n(".aspect-ratio--object",n("img.img.w-100.absolute",{src:U(w.path,w.dataUrl)})):null):this.component?n(this.component,{onSet:Te(s,u,i.signMaxSize),onCancel:function(){return a.component=undefined}}):n(".aspect-ratio.pointer",{id:u,class:g()+" "+v,style:l},w?n(".aspect-ratio--object.hide-child.dim",{onclick:function(){return s([])}},[n("img.img.w-100.absolute",{src:U(w.path,w.dataUrl)}),n(".pa3.absolute.top-0.right-0.child",n("i.fa-2x",{class:x(i.resetIcn)}))]):n(".aspect-ratio--object.flex.items-stretch.justify-center",e.map(y,(function(e){var t=e.component,r=e.icon,i=e.label;return n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return a.component=t}},n("i.fa-2x",{class:r}),n("span.mt2",i))}))))])};return t}();export{Z as BaseInput,_ as BaseText,E as Button,Y as Checkbox,$ as CheckboxInput,J as FileList,de as FileMulti,pe as FileSelect,N as ImageList,me as ImageMulti,Q as ImagePreview,ge as ImageSelect,X as Label,V as Link,ee as PasswordInput,ne as RadioInput,ae as SelectInput,G as SelectText,Ce as SignBuilder,te as TextareaInput,L as Trusted,z as fileNameExtSplit,x as getIcon,k as guid,W as iconMap,O as linkAttrs,o as updateConfig,y as updateTheme};
