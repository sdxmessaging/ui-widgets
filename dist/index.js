import e from"mithril/stream";import t from"lodash";import n from"mithril";import a from"signature_pad";var r={"padding-bottom":"25%"};var i={"max-height":"16rem"};var o={icon:e("fas"),lblCol:e("silver"),lblFnt:e("f6"),dspFnt:e("truncate"),dspBrd:e("bb b--black-20"),inpHgt:e("h2"),inpCol:e("dark-gray"),inpFnt:e("fw2"),inpBrd:e("bn"),filBrd:e("ba bw1 br3 b--dashed"),filBrdCol:e("b--black-30"),drgCol:e("b--blue"),drgBrdCol:e("blue"),btnBg:e("bg-light-blue"),btnCol:e("dark-gray"),btnFnt:e(""),btnBrd:e("bn br2")};function l(e){return e.join(" ")}function s(n,a){if(a===void 0){a=[]}return e.merge(t.concat(t.map(n,(function(e){return o[e]})),a)).map(l)}var c=s(["lblCol","dspFnt"]);var u=s(["lblCol","lblFnt"]);var d=s(["inpCol","inpFnt"]);var f=s(["inpBrd"],[d]);var p=s(["inpHgt"],[f]);var v=s(["filBrd","filBrdCol"],[d]);var m=s(["inpFnt","filBrd","drgCol","drgBrdCol"]);var h=s(["btnBg","btnCol","btnFnt","btnBrd"]);function g(e){t.forEach(e,(function(e,t){if(e===void 0){e=""}if(t in o){o[t](e)}}))}function b(e){return o.icon()+" "+e}function w(e){return(e+256).toString(16).substr(1)}function y(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[w(e[0]),w(e[1]),w(e[2]),w(e[3]),"-",w(e[4]),w(e[5]),"-",w(e[6]),w(e[7]),"-",w(e[8]),w(e[9]),"-",w(e[10]),w(e[11]),w(e[12]),w(e[13]),w(e[14]),w(e[15])].join("")}function x(){return Math.max(window.devicePixelRatio,1)}function I(e,t){return t?e+"*":e}function k(e,t){return t?t:e}function C(e){var t=e.label;return t?n("span.mr2.truncate",{title:t,class:c()},t):null}function T(e){var t=e.id,a=e.label,r=e.required;return a?n("label.mb1.db",{title:a,for:t,class:u()},I(a,r)):null}function U(e){return function(t){var n=t.target.value;return e(n)}}function B(e){return function(t){var n=t.target.checked;return e(n)}}function P(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function F(e){var t=e.split(",");var n=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var a=t[0].split(":")[1].split(";")[0];var r=n.length;var i=new Uint8Array(r);for(var o=0;o<r;o++){i[o]=n.charCodeAt(o)}return new Blob([i],{type:a})}function S(e,t,n){if(e>t){if(e>n){return[n,Math.round(t*n/e)]}}else if(t>n){return[Math.round(e*n/t),n]}return[e,t]}function z(e){var t=Math.min(e.byteLength,64*1024);var n=new DataView(e,0,t);if(n.getUint16(0,false)!==65496){return-2}var a=n.byteLength;var r=2;while(r<a){var i=n.getUint16(r,false);r+=2;if(i===65505){if(n.getUint32(r+=2,false)!==1165519206){return-1}var o=n.getUint16(r+=6,false)===18761;r+=n.getUint32(r+4,o);var l=n.getUint16(r,o);r+=2;for(var s=0;s<l;s++){if(n.getUint16(r+s*12,o)===274){return n.getUint16(r+s*12+8,o)}}}else if((i&65280)!==65280){break}else{r+=n.getUint16(r,false)}}return-1}function j(e){return new Promise((function(t){var n=new FileReader;n.onload=function(){t(z(n.result))};n.readAsArrayBuffer(e)}))}function q(e,t,n,a){if(!a||a>8){return}switch(a){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,n);e.rotate(Math.PI);return;case 4:e.translate(0,n);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-n);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-n);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function R(e,t,n){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File most be an image"))}return j(e).then((function(a){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var o=S(i.width,i.height,t),l=o[0],s=o[1];if(a>4){e.width=s;e.height=l}else{e.width=l;e.height=s}var c=e.getContext("2d");q(c,l,s,a);c.drawImage(i,0,0,l,s);r(e.toDataURL(n))};var o=new FileReader;o.onload=function(){return i.src=o.result};o.readAsDataURL(e)}))}))}var D=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.type,i=r===void 0?"button":r,o=t.title,l=o===void 0?a:o,s=t.icon,c=t.classes,u=t.disabled,d=t.style,f=t.onclick;return n("button.button-reset.pa2",{type:i,title:l,disabled:u,class:(u?"o-60":"dim pointer")+" "+h()+" "+c,style:d,onclick:f},s?n("i.fa-fw",{class:(a?"mr2":"")+" "+b(s)}):null,a)};return e}();var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=a.classes,i=a.style,o=t.value;return n(".pa2",{class:r,style:i},n.trust(o()))};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.classes,l=i===void 0?"":i,s=a.style;return n(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+l,style:s},[C(a),n("span.ws-normal",{title:r(),class:d()},r())])};return e}();var A={addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link"};var E=A;function M(e,t){if(e==="email"){return{href:"mailto:"+t,class:d()}}else if(e==="tel"){return{href:"tel:"+t,class:d()}}else{return{href:t,target:"_blank",class:d()}}}var _={email:E.emailIcn,tel:E.telIcn};var W=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.type,l=a.classes,s=l===void 0?"":l,c=a.style;return n(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+s,style:c},[C(a),n("a.link.dim.pointer.ws-normal",M(i,r()),n("i.mr2",{class:b(_[i]||E.linkIcn)}),r())])};return e}();var Y=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.classes,l=i===void 0?"":i,s=a.style;return n(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+l,style:s},[C(a),n("i.self-end",{class:o.inpCol()+" "+b(r()?E.checkIcn:E.uncheckIcn)})])};return e}();var O=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r.classes,s=l===void 0?"":l,c=r.style;var u=t.find(r.options,{value:i()});var f=u?u.label:i();return n(".pa2.flex.flex-wrap",{class:o.dspBrd()+" "+s,style:c},[C(r),n("span.ws-normal",{title:f,class:d()},f)])};return e}();var V=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r.classes,s=l===void 0?"":l,c=r.style;return n(".pa2.flex.flex-column",{class:o.dspBrd()+" "+s,style:c},[C(r),n(".flex.flex-column.mt1.nb1",t.map(i(),(function(e){var t=e.name,a=e.path;return n("a.pa2.mv1.link.ba.b--black-20.dim.pointer[target=_blank]",{href:a,class:d()},[n("i.mr2",{class:b(E.downloadIcn)}),t])})))])};return e}();var G=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return n(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n("img.contain",a),t])};return e}();var J=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r.classes,s=l===void 0?"":l,c=r.style;return n(".pa2.flex.flex-column",{class:o.dspBrd()+" "+s,style:c},[C(r),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(i(),(function(e){var t=e.name,a=e.path,r=e.dataUrl;return n(G,{title:t,src:k(a,r),style:{"max-height":"6rem"}})})))])};return e}();var K=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var s=r.classes,c=s===void 0?"":s,u=r.style;var d=t.head(l());return n(".pa2.flex.flex-column",{class:o.dspBrd()+" "+c,style:u},[C(r),d?n("img.img.mt2.contain.self-center",{title:d.name,src:k(d.path,d.dataUrl),style:i}):n("i.mt2",{class:o.inpCol()+" "+b(E.imageIcn)})])};return e}();var N=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,r=t.required;return n("label.mb2",I(a,r))};return e}();var Q=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.type,s=r.name,c=s===void 0?o:s,u=r.placeholder,d=r.required,f=r.readonly,v=r.disabled,m=r.autofocus,h=r.autocomplete,g=r.spellcheck,b=r.instant,w=r.containerClass,y=r.classes,x=y===void 0?"":y;return[T(r),n(".w-100",{class:w},n("input.input-reset.border-box.w-100",(t={id:o,name:c,type:l,value:i(),class:(v?"o-60":"")+" "+p()+" "+x,placeholder:u,required:d,readonly:f,disabled:v,autofocus:m,autocomplete:h,spellcheck:g},t[b?"oninput":"onchange"]=U(i),t)))]};return e}();var X=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.label,o=a.id,l=a.name,s=l===void 0?o:l,c=a.required,u=a.readonly,f=a.disabled,p=a.autocomplete,v=a.containerClass,m=a.classes,h=m===void 0?"":m;return n("div",{class:v},n(".flex.flex-wrap",{class:d()},n("label.flex.items-center",{class:(f?"o-60":u?"":"pointer")+" "+h},n("input.mr1[type=checkbox]",{id:o,name:s,checked:r(),required:c,autocomplete:p,disabled:f||u,onchange:B(r)}),I(i,c))))};return e}();var Z=function(){function t(){this.showPassword=e(false)}t.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.name,s=l===void 0?o:l,c=r.placeholder,d=r.required,f=r.readonly,v=r.disabled,m=r.autofocus,h=r.autocomplete,g=r.instant,b=r.containerClass,w=r.classes,y=w===void 0?"":w;return[n(".flex.justify-between",[T(r),n(X,{field:{id:"showpass",label:E.showPassTxt,type:"checkbox",containerClass:"mb1 "+u()},value:this.showPassword})]),n(".w-100",{class:b},n("input.input-reset.border-box.w-100",(t={id:o,name:s,type:this.showPassword()?"text":"password",value:i(),class:(v?"o-60":"")+" "+p()+" "+y,placeholder:c,required:d,readonly:f,disabled:v,autofocus:m,autocomplete:h,autocorrect:"off"},t[g?"oninput":"onchange"]=U(i),t)))]};return t}();var $=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.id,l=r.name,s=l===void 0?o:l,c=r.placeholder,u=r.required,d=r.readonly,p=r.disabled,v=r.autofocus,m=r.autocomplete,h=r.spellcheck,g=r.instant,b=r.containerClass,w=r.classes,y=w===void 0?"":w;return[T(r),n("div",{class:b},n("textarea.border-box.w-100[rows=3]",(t={id:o,name:s,value:i(),class:(p?"o-60":"")+" "+f()+" "+y,placeholder:c,required:u,readonly:d,disabled:p,autofocus:v,autocomplete:m,spellcheck:h,style:{resize:"vertical"}},t[g?"oninput":"onchange"]=U(i),t)))]};return e}();var ee=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,u=o.required,f=o.readonly,p=o.disabled,v=o.autocomplete,m=o.containerClass,h=o.classes,g=h===void 0?"":h,b=o.options;return[T(r),n("div",{class:m},n(".flex.flex-wrap",{class:d(),onchange:U(i)},t.map(b,(function(e){var t=e.label,a=e.value;return n("label.flex.items-center",{class:(p?"o-60":f?"":"pointer")+" "+g},n("input.mr1[type=radio]",{name:c,value:a,checked:i()===a,required:u,autocomplete:v,disabled:p||f}),t)}))))]};return e}();var te=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,u=o.required,d=o.readonly,f=o.disabled,v=o.autofocus,m=o.autocomplete,h=o.containerClass,g=o.classes,b=g===void 0?"":g,w=o.options;return[T(r),n("div",{class:h},n("select.input-reset.border-box.w-100",{id:l,name:c,value:i(),class:(f?"o-60":d?"":"pointer")+" "+p()+" "+b,required:u,readonly:d,disabled:f,autofocus:v,autocomplete:m,onchange:U(i)},t.map(w,(function(e){var t=e.label,a=e.value;return n("option",{value:a,disabled:f||d},t)}))))]};return e}();function ne(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function ae(e){return function(t){t.preventDefault();e(false)}}function re(e,t){return function(n){n.preventDefault();e(false);if(n.dataTransfer){t(n.dataTransfer.files)}}}function ie(e){return function(t){var n=t.target.files;return e(n)}}var oe=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=r.label,o=r.id,l=r.name,s=l===void 0?o:l,c=r.required,d=r.readonly,f=r.disabled,p=r.autofocus,v=r.containerClass,m=v===void 0?"":v,h=a.accept,g=h===void 0?"*":h,b=a.multiple,w=b===void 0?true:b,y=a.dragging,x=a.onSet,k=e.children;return n("label",t.extend({for:o,title:i,class:(f?"o-60":d?"":"pointer")+" "+m},f||d?{}:{ondragover:ne(y),ondragleave:ae(y),ondrop:re(y,x)}),[n("input.clip[type=file]",{id:o,name:s,multiple:w,accept:g,required:c,autofocus:p,disabled:f||d,onchange:ie(x)}),i?n("span.db.mb1",{title:i,class:u()},I(i,c)):null,k])};return e}();function le(e){return function(n){var a=e();t.each(n,(function(e){a.push({guid:y(),name:e.name,path:"not_set",file:e})}));e(a)}}function se(e,n){return function(){var a=e();t.remove(a,{guid:n});e(a)}}var ce=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;return[n(oe,{field:r,dragging:this.dragging,onSet:le(i)},n(".pa2",{class:this.dragging()?m():v()},[n("i.mr2",{class:b(E.uploadIcn)}),n("span",E.addFilesTxt)])),n(".flex.flex-column.mt1.nb1",t.map(i(),(function(e){return n("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[n("i.mr2",{class:b(E.downloadIcn)}),e.name,n("i.child.fr",{title:E.remFileTtl+" "+e.name,class:b(E.deleteIcn),onclick:se(i,e.guid)})])})))]};return a}();function ue(e){return function(n){var a=t.head(n);if(!a){return}e([{guid:y(),name:a.name,path:"not_set",file:a}])}}var de=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var o=t.head(i());return n(oe,{field:r,multiple:false,dragging:this.dragging,onSet:ue(i)},n(".pa2",{class:this.dragging()?m():v()},[n("i.mr2",{class:b(E.uploadIcn)}),n("span",o?o.name:E.addFileTxt)]))};return a}();function fe(e,a){return function(r){var i="image/jpeg";var o=e();return Promise.all(t.map(r,(function(e){return R(e,a,i).then((function(t){var n=P(e.name)[0];var a=new File([F(t)],n+".jpg",{type:i});o.push({guid:y(),name:a.name,path:"not_set",file:a,dataUrl:t})}))}))).then((function(){e(o);n.redraw()}))}}var pe=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var r=e.attrs,i=r.field,o=r.value;var l=i.classes,s=l===void 0?"":l;return[n(oe,{field:i,accept:"image/*",dragging:this.dragging,onSet:fe(o,a.maxImageSize)},n(".w-100.pa1.dt.tc",{class:(this.dragging()?m():v())+" "+s},n("i.fa-2x.dtc.v-mid",{class:b(E.cameraIcn)}))),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(o(),(function(e){return n(G,{src:k(e.path,e.dataUrl),style:{"max-height":"6rem"}},n(".pa2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,class:h(),onclick:se(o,e.guid)},n("i.fa-lg",{class:b(E.deleteIcn)})))})))]};a.maxImageSize=1280;return a}();function ve(e,a){return function(r){var i=t.head(r);if(!i){return Promise.resolve()}var o="image/jpeg";return R(i,a,o).then((function(t){var a=P(i.name)[0];var r=new File([F(t)],a+".jpg",{type:o});e([{guid:y(),name:r.name,path:"not_set",file:r,dataUrl:t}]);n.redraw()}))}}var me=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var r=e.attrs,o=r.field,l=r.value;var s=t.head(l());var c=o.classes,u=c===void 0?"":c;return n(oe,{field:o,accept:"image/*",multiple:false,dragging:this.dragging,onSet:ve(l,a.maxImageSize)},n(".w-100.pa1.contain.dt.tc",{class:(this.dragging()?m():v())+" "+u},s?n("img.img.contain",{title:s.name,src:k(s.path,s.dataUrl),style:i}):n("i.fa-2x.dtc.v-mid",{class:b(E.cameraIcn)})))};a.maxImageSize=1280;return a}();var he=function(){function e(){this.signaturePad=null}e.prototype.oncreate=function(e){var n=this;var r=e.dom;var i=r.children[0];var o=x();this.signaturePad=new a(i,{minWidth:.5*o,maxWidth:1.5*o});var l=function(){var e=x();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var t=i.getContext("2d");t.scale(e,e);n.resetCanvas()};this.resizeHandler=t.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};e.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};e.prototype.view=function(e){var t=this;var a=e.attrs,i=a.onSet,o=a.onCancel;return[n(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:r},n("canvas.aspect-ratio--object")),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(D,{title:E.applyTtl,icon:E.applyIcn,classes:"ma1",onclick:function(){if(t.signaturePad&&!t.signaturePad.isEmpty()){i(t.signaturePad.toDataURL("image/png"))}}}),n(D,{title:E.resetTtl,icon:E.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),n(D,{title:E.cancelTtl,icon:E.cancelIcn,classes:"ma1",onclick:o})])]};e.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return e}();function ge(e,t){return function(){if(e()){var n=document.createElement("canvas");n.width=600;n.height=150;var a=.56*n.height;var r=n.getContext("2d");r.textBaseline="middle";r.font=a+"px Caveat";r.fillText(e(),n.height*.05,a);t(n.toDataURL())}return false}}var be=function(){function t(){this.text=e("")}t.prototype.oncreate=function(e){var t=e.dom;var n=t.children[0];n.focus({preventScroll:false});this.scaleText(t)};t.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};t.prototype.view=function(e){var t=this;var a=e.attrs,i=a.onSet,o=a.onCancel;return[n("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:r,onsubmit:ge(this.text,i)},n("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:U(this.text),value:this.text(),style:{"font-family":"Caveat"}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(D,{title:E.applyTtl,icon:E.applyIcn,classes:"ma1",onclick:ge(this.text,i)}),n(D,{title:E.resetTtl,icon:E.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),n(D,{title:E.cancelTtl,icon:E.cancelIcn,classes:"ma1",onclick:o})])]};t.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return t}();function we(e,t){var n=window.getComputedStyle(e);var a=x();e.width=e.clientWidth*a;e.height=e.clientHeight*a;var r=.56*e.height;var i=e.getContext("2d");i.clearRect(0,0,e.width,e.height);i.textBaseline="middle";i.font=n["fontWeight"]+" "+r+"px "+n["fontFamily"];i.fillText(t?"":"",e.height*.25,e.height*.52);i.font="200 "+r+"px sans-serif";i.fillText(t?"Accepted":"Accept",e.height,r)}var ye=function(){function t(){this.checked=e(false)}t.prototype.oncreate=function(e){var t=e.dom;this.canvas=t.children[0];we(this.canvas,this.checked())};t.prototype.onupdate=function(){if(this.canvas){we(this.canvas,this.checked())}};t.prototype.view=function(e){var t=this;var a=e.attrs,i=a.onSet,l=a.onCancel;return[n(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:r},n("canvas.aspect-ratio--object.pointer",{class:o.icon(),onclick:function(){return t.checked(!t.checked())}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(D,{title:E.applyTtl,icon:E.applyIcn,classes:"ma1",disabled:!this.checked(),onclick:function(){if(t.canvas){i(t.canvas.toDataURL())}}}),n(D,{title:E.cancelTtl,icon:E.cancelIcn,classes:"ma1",onclick:l})])]};return t}();function xe(e,t){return new Promise((function(n){var a=new Image;a.onload=function(){var e=document.createElement("canvas");var r=S(a.width,a.height,t),i=r[0],o=r[1];e.width=i;e.height=o;var l=e.getContext("2d");l.drawImage(a,0,0,i,o);n(e.toDataURL())};a.src=e}))}function Ie(e,t,a){return function(r){return xe(r,a).then((function(a){var r=new File([F(a)],"sign-"+t+".png",{type:"image/png"});e([{guid:y(),name:r.name,path:"not_set",file:r,dataUrl:a}]);n.redraw()}))}}var ke=function(){function e(){}e.prototype.oninit=function(e){var t=this;var n=e.attrs.value;n.map((function(){return t.component=undefined}))};e.prototype.view=function(a){var i=this;var o=a.attrs,l=o.field,s=o.value;var c=l,u=c.id,d=c.readonly,f=c.disabled,p=c.classes,m=p===void 0?"":p,h=c.containerClass,g=c.options,w=g===void 0?[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}]:g;var y=t.head(s());return n(".relative",{class:h},[T(l),this.component?n(this.component,{onSet:Ie(s,u,e.maxImageSize),onCancel:function(){return i.component=undefined}}):d||f?n(".aspect-ratio",{id:u,class:m,style:r},y?n(".aspect-ratio--object",n("img.img.w-100.absolute",{src:k(y.path,y.dataUrl)})):null):n(".aspect-ratio.pointer",{id:u,class:v()+" "+m,style:r},y?n(".aspect-ratio--object.hide-child.dim",{onclick:function(){return s([])}},[n("img.img.w-100.absolute",{src:k(y.path,y.dataUrl)}),n(".pa3.absolute.top-0.right-0.child",n("i.fa-2x",{class:b(E.resetIcn)}))]):n(".aspect-ratio--object.flex.items-stretch.justify-center",t.map(w,(function(e){var t=e.value;if(t==="draw"){return n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return i.component=he}},n("i.fa-2x",{class:b(E.drawIcn)}),n("span.mt2",E.signDrawTxt))}if(t==="type"){return n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return i.component=be}},n("i.fa-2x",{class:b(E.typeIcn)}),n("span.mt2",E.signTypeTxt))}if(t==="stamp"){return n(".flex-auto.flex.flex-column.justify-center.tc.dim",{onclick:function(){return i.component=ye}},n("i.fa-2x",{class:b(E.stampIcn)}),n("span.mt2",E.signStampTxt))}return null}))))])};e.maxImageSize=640;return e}();export{Q as BaseInput,L as BaseText,D as Button,Y as Checkbox,X as CheckboxInput,V as FileList,ce as FileMulti,de as FileSelect,J as ImageList,pe as ImageMulti,K as ImagePreview,me as ImageSelect,N as Label,W as Link,Z as PasswordInput,ee as RadioInput,te as SelectInput,O as SelectText,ke as SignBuilder,$ as TextareaInput,H as Trusted,P as fileNameExtSplit,b as getIcon,y as guid,_ as iconMap,M as linkAttrs,g as updateTheme};
