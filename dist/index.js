import t from"lodash";import e from"mithril/stream";import n from"mithril";import a from"signature_pad";var r={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link"};var i=r;function l(e){t.assign(r,e)}function o(){return{"max-height":i.imageDispHeight}}function s(){return{"max-height":i.thumbDispHeight}}var c={icon:e("fas"),lblCol:e("silver"),lblFnt:e("f6"),dspFnt:e("truncate"),dspBrd:e("bb b--black-20"),inpHgt:e("h2"),inpCol:e("dark-gray"),inpFnt:e("fw2"),inpBrd:e("bn"),actCol:e("dark-gray"),actBg:e("bg-light-blue"),filBrd:e("ba bw1 br3 b--dashed"),filBrdCol:e("b--black-30"),drgCol:e("blue"),drgBrdCol:e("b--blue"),btnBg:e("bg-light-blue"),btnCol:e("dark-gray"),btnFnt:e(""),btnPad:e("pa2"),btnBrd:e("bn br2")};function u(t){return t.join(" ")}function d(n,a){if(a===void 0){a=[]}return e.merge(t.concat(t.map(n,(function(t){return c[t]})),a)).map(u)}var f=d(["lblCol","dspFnt"]);var p=d(["lblCol","lblFnt"]);var v=d(["inpCol","inpFnt"]);var m=d(["inpBrd"],[v]);var h=d(["inpHgt"],[m]);var g=d(["actCol","actBg"]);var b=d(["filBrd","filBrdCol"],[v]);var w=d(["inpFnt","filBrd","drgCol","drgBrdCol"]);var y=d(["btnBg","btnCol","btnFnt","btnPad","btnBrd"]);function x(e){t.forEach(e,(function(t,e){if(t&&e in c){c[e](t)}}))}function I(t){return c.icon()+" "+t}function k(t){return(t+256).toString(16).substr(1)}function C(){var t=new Uint8Array(16);var e=window.crypto||window.msCrypto;e.getRandomValues(t);return[k(t[0]),k(t[1]),k(t[2]),k(t[3]),"-",k(t[4]),k(t[5]),"-",k(t[6]),k(t[7]),"-",k(t[8]),k(t[9]),"-",k(t[10]),k(t[11]),k(t[12]),k(t[13]),k(t[14]),k(t[15])].join("")}function T(){return Math.max(window.devicePixelRatio,1)}function P(t,e){return e?t+"*":t}function B(t,e){return e?e:t}function U(t){var e=t.label;return e?n("span.mr2.truncate",{title:e,class:f()},e):null}function F(t){var e=t.id,a=t.label,r=t.required;return a?n("label.mb1.db",{title:a,for:e,class:p()},P(a,r)):null}function S(t,e){return t?"o-60":e?"":"pointer"}function z(t){return function(e){var n=e.target.value;return t(n)}}function q(t){return function(e){var n=e.target.checked;return t(n)}}function H(t){var e=t.lastIndexOf(".");if(e===-1){return[t,""]}else{return[t.substr(0,e),t.substr(e)]}}function D(t){var e=t.split(",");var n=e[0].indexOf("base64")>=0?atob(e[1]):unescape(e[1]);var a=e[0].split(":")[1].split(";")[0];var r=n.length;var i=new Uint8Array(r);for(var l=0;l<r;l++){i[l]=n.charCodeAt(l)}return new Blob([i],{type:a})}function j(t,e,n){if(t>e){if(t>n){return[n,Math.round(e*n/t)]}}else if(e>n){return[Math.round(t*n/e),n]}return[t,e]}function M(t){var e=Math.min(t.byteLength,64*1024);var n=new DataView(t,0,e);if(n.getUint16(0,false)!==65496){return-2}var a=n.byteLength;var r=2;while(r<a){var i=n.getUint16(r,false);r+=2;if(i===65505){if(n.getUint32(r+=2,false)!==1165519206){return-1}var l=n.getUint16(r+=6,false)===18761;r+=n.getUint32(r+4,l);var o=n.getUint16(r,l);r+=2;for(var s=0;s<o;s++){if(n.getUint16(r+s*12,l)===274){return n.getUint16(r+s*12+8,l)}}}else if((i&65280)!==65280){break}else{r+=n.getUint16(r,false)}}return-1}function R(t){return new Promise((function(e){var n=new FileReader;n.onload=function(){e(M(n.result))};n.readAsArrayBuffer(t)}))}function A(t,e,n,a){if(!a||a>8){return}switch(a){case 2:t.translate(e,0);t.scale(-1,1);return;case 3:t.translate(e,n);t.rotate(Math.PI);return;case 4:t.translate(0,n);t.scale(1,-1);return;case 5:t.rotate(.5*Math.PI);t.scale(1,-1);return;case 6:t.rotate(.5*Math.PI);t.translate(0,-n);return;case 7:t.rotate(.5*Math.PI);t.translate(e,-n);t.scale(-1,1);return;case 8:t.rotate(-.5*Math.PI);t.translate(-e,0);return}}function E(t,e,n){if(!t.type.match(/image.*/)){return Promise.reject(new Error("File most be an image"))}return R(t).then((function(a){return new Promise((function(r){var i=new Image;i.onload=function(){var t=document.createElement("canvas");var l=j(i.width,i.height,e),o=l[0],s=l[1];if(a>4){t.width=s;t.height=o}else{t.width=o;t.height=s}var c=t.getContext("2d");A(c,o,s,a);c.drawImage(i,0,0,o,s);r(t.toDataURL(n))};var l=new FileReader;l.onload=function(){return i.src=l.result};l.readAsDataURL(t)}))}))}function L(t,e,n,a){var r=document.createElement("canvas");r.width=e;r.height=n;var i=.56*r.height;var l=r.getContext("2d");l.textBaseline="middle";l.font=i+"px "+a;l.fillText(t,r.height*.05,i);return r.toDataURL()}var _=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.classes,i=r===void 0?"bg-red":r,l=t.children;return n(".relative.dib",[l,a?n("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:i,style:{"min-width":"0.65rem"}},a):null])};return t}();var O=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.type,i=r===void 0?"button":r,l=e.title,o=l===void 0?a:l,s=e.icon,c=e.classes,u=e.disabled,d=e.style,f=e.onclick;return n("button.button-reset",{type:i,title:o,disabled:u,class:S(u)+" "+y()+" "+c,style:d,onclick:f},s?n("i.fa-fw",{class:(a?"mr2":"")+" "+I(s)}):null,a)};return t}();var W=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.title,i=r===void 0?a:r,l=e.icon,o=e.classes,s=e.disabled,c=e.style,u=e.onclick;return n(".mh2.pa2.truncate",{title:i,disabled:s,class:S(s)+" "+o,style:c,onclick:u},l?n("i.fa-fw",{class:(a?"mr2":"")+" "+I(l)}):null,a)};return t}();var V=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=a.classes,i=a.style,l=e.value;return n(".pa2",{class:r,style:i},n.trust(l()))};return t}();var Y=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var i=a.classes,l=i===void 0?"":i,o=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+l,style:o},[U(a),n("span.ws-normal",{title:r(),class:v()},r())])};return t}();function G(t,e){if(t==="email"){return{href:"mailto:"+e,class:v()}}else if(t==="tel"){return{href:"tel:"+e,class:v()}}else{return{href:e,target:"_blank",class:v()}}}var J={email:i.emailIcn,tel:i.telIcn};var K=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var l=a.type,o=a.classes,s=o===void 0?"":o,u=a.style;return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+s,style:u},[U(a),n("a.link.dim.pointer.ws-normal",G(l,r()),n("i.mr2",{class:I(J[l]||i.linkIcn)}),r())])};return t}();var N=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var l=a.classes,o=l===void 0?"":l,s=a.style;return n(".pa2.flex.items-center",{class:c.dspBrd()+" "+o,style:s},[U(a),n("i",{class:c.inpCol()+" "+I(r()?i.checkIcn:i.uncheckIcn)})])};return t}();var Q=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r.classes,o=l===void 0?"":l,s=r.style;var u=t.find(r.options,{value:i()});var d=u?u.label:i();return n(".pa2.flex.flex-wrap",{class:c.dspBrd()+" "+o,style:s},[U(r),n("span.ws-normal",{title:d,class:v()},d)])};return e}();var X=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var o=r.classes,s=o===void 0?"":o,u=r.style;return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+s,style:u},[U(r),n(".flex.flex-column.mt1.nb1",t.map(l(),(function(t){var e=t.name,a=t.path;return n("a.pa2.mv1.link.ba.b--black-20.dim.pointer[target=_blank]",{href:a,class:v()},[n("i.mr2",{class:I(i.downloadIcn)}),e])})))])};return e}();var Z=function(){function t(){}t.prototype.view=function(t){var e=t.children,a=t.attrs;return n(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n("img.contain",a),e])};return t}();var $=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r.classes,o=l===void 0?"":l,u=r.style;return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+o,style:u},[U(r),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(i(),(function(t){var e=t.name,a=t.path,r=t.dataUrl;return n(Z,{title:e,src:B(a,r),style:s()})})))])};return e}();var tt=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var s=r.classes,u=s===void 0?"":s,d=r.style;var f=t.head(l());return n(".pa2.flex.flex-column",{class:c.dspBrd()+" "+u,style:d},[U(r),f?n("img.img.mt2.contain.self-center",{title:f.name,src:B(f.path,f.dataUrl),style:o()}):n("i.mt2",{class:c.inpCol()+" "+I(i.imageIcn)})])};return e}();var et=function(){function t(){}t.prototype.view=function(t){var e=t.attrs.field,a=e.label,r=e.title,i=r===void 0?a:r,l=e.required;return n("label.mb2",{title:i},P(a,l))};return t}();var nt=function(){function t(){}t.prototype.view=function(t){var e;var a=t.attrs,r=a.field,i=a.value;var l=r.label,o=r.id,s=r.type,c=r.name,u=c===void 0?o:c,d=r.title,f=d===void 0?l:d,p=r.placeholder,v=r.max,m=r.maxlength,g=r.min,b=r.minlength,w=r.step,y=r.required,x=r.readonly,I=r.disabled,k=r.autofocus,C=r.autocomplete,T=r.pattern,P=r.inputmode,B=r.spellcheck,U=r.instant,q=r.containerClass,H=r.classes,D=H===void 0?"":H;return[F(r),n(".w-100",{class:q},n("input.input-reset.border-box.w-100",(e={id:o,type:s,name:u,title:f,placeholder:p,max:v,maxlength:m,min:g,minlength:b,step:w,required:y,readonly:x,disabled:I,autofocus:k,autocomplete:C,pattern:T,inputmode:P,spellcheck:B,value:i(),class:S(I,true)+" "+h()+" "+D},e[U?"oninput":"onchange"]=z(i),e)))]};return t}();var at=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var l=a.label,o=a.id,s=a.name,c=s===void 0?o:s,u=a.title,d=u===void 0?l:u,f=a.required,p=a.readonly,m=a.disabled,h=a.autocomplete,g=a.containerClass,b=g===void 0?"":g,w=a.classes,y=w===void 0?"":w;return n(".w-100",{class:v()+" "+b},n("label.flex.items-center",{title:d,class:S(m,p)+" "+y},n("input.clip[type=checkbox]",{id:o,name:c,checked:r(),required:f,autocomplete:h,disabled:m||p,onchange:q(r)}),P(l,f),n("i.ml2",{class:I(r()?i.checkIcn:i.uncheckIcn)})))};return t}();var rt=function(){function t(){this.showPassword=e(false)}t.prototype.view=function(t){var e;var a=t.attrs,r=a.field,l=a.value;var o=r.label,s=r.id,c=r.name,u=c===void 0?s:c,d=r.title,f=d===void 0?o:d,v=r.placeholder,m=r.maxlength,g=r.minlength,b=r.required,w=r.readonly,y=r.disabled,x=r.autofocus,I=r.autocomplete,k=r.instant,C=r.containerClass,T=r.classes,P=T===void 0?"":T;return[n(".flex.justify-between",[F(r),n(at,{field:{id:"showpass",label:i.showPassTxt,type:"checkbox",readonly:w,disabled:y,containerClass:"mb1 "+p()},value:this.showPassword})]),n(".w-100",{class:C},n("input.input-reset.border-box.w-100",(e={id:s,name:u,title:f,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:g,required:b,readonly:w,disabled:y,autofocus:x,autocomplete:I,value:l(),class:S(y,true)+" "+h()+" "+P,autocorrect:"off"},e[k?"oninput":"onchange"]=z(l),e)))]};return t}();var it=function(){function t(){}t.prototype.view=function(t){var e;var a=t.attrs,r=a.field,i=a.value;var l=r.label,o=r.id,s=r.name,c=s===void 0?o:s,u=r.title,d=u===void 0?l:u,f=r.placeholder,p=r.required,v=r.readonly,h=r.disabled,g=r.autofocus,b=r.autocomplete,w=r.spellcheck,y=r.instant,x=r.containerClass,I=r.classes,k=I===void 0?"":I;return[F(r),n("div",{class:x},n("textarea.border-box.w-100[rows=3]",(e={id:o,name:c,title:d,placeholder:f,required:p,readonly:v,disabled:h,autofocus:g,autocomplete:b,spellcheck:w,value:i(),class:S(h,true)+" "+m()+" "+k,style:{resize:"vertical"}},e[y?"oninput":"onchange"]=z(i),e)))]};return t}();var lt=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r,o=l.id,s=l.name,u=s===void 0?o:s,d=l.required,f=l.readonly,p=l.disabled,m=l.autocomplete,h=l.containerClass,b=h===void 0?"flex-wrap":h,w=l.classes,y=w===void 0?"":w,x=l.options;return[F(r),n(".flex",{class:v()+" "+b,onchange:z(i)},t.map(x,(function(t){var e=t.value,a=t.label,r=t.icon;var l=i()===e;return n("label.flex.items-center",{title:a,class:S(p,f)+" "+(l?g():"dim")+" "+c.btnBrd()+" "+y},n("input.clip[type=radio]",{name:u,value:e,checked:l,required:d,autocomplete:m,disabled:p||f}),r?n("i.fa-fw",{class:I(r)}):a)})))]};return e}();var ot=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r,o=l.id,s=l.name,c=s===void 0?o:s,u=l.title,d=u===void 0?r.label:u,f=l.required,p=l.readonly,v=l.disabled,m=l.autofocus,g=l.autocomplete,b=l.containerClass,w=l.classes,y=w===void 0?"":w,x=l.options;return[F(r),n(".w-100",{class:b},n("select.input-reset.border-box.w-100",{id:o,name:c,title:d,required:f,readonly:p,disabled:v,autofocus:m,autocomplete:g,value:i(),class:S(v,p)+" "+h()+" "+y,onchange:z(i)},t.map(x,(function(t){var e=t.label,a=t.value;return n("option",{value:a,disabled:v||p},e)}))))]};return e}();function st(t){return function(e){e.preventDefault();if(e.dataTransfer){e.dataTransfer.dropEffect="copy"}if(t()){e.redraw=false}t(true)}}function ct(t){return function(e){e.preventDefault();t(false)}}function ut(t,e){return function(n){n.preventDefault();t(false);if(n.dataTransfer){e(n.dataTransfer.files)}}}function dt(t){return function(e){var n=e.target.files;return t(n)}}var ft=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=r.label,l=r.id,o=r.name,s=o===void 0?l:o,c=r.title,u=c===void 0?i:c,d=r.required,f=r.readonly,v=r.disabled,m=r.autofocus,h=r.containerClass,g=h===void 0?"":h,b=a.accept,w=b===void 0?"*":b,y=a.multiple,x=y===void 0?true:y,I=a.dragging,k=a.onSet,C=e.children;return n("label",t.extend({for:l,title:i,class:S(v,f)+" "+g},v||f?{}:{ondragover:st(I),ondragleave:ct(I),ondrop:ut(I,k)}),[n("input.clip[type=file]",{id:l,name:s,multiple:x,accept:w,required:d,autofocus:m,disabled:v||f,onchange:dt(k)}),i?n("span.db.mb1",{title:u,class:p()},P(i,d)):null,C])};return e}();function pt(e){return function(n){var a=e();t.each(n,(function(t){a.push({guid:C(),name:t.name,path:"not_set",file:t})}));e(a)}}function vt(e,n){return function(){var a=e();t.remove(a,{guid:n});e(a)}}var mt=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;return[n(ft,{field:r,dragging:this.dragging,onSet:pt(l)},n(".pa2",{class:this.dragging()?w():b()},[n("i.mr2",{class:I(i.uploadIcn)}),n("span",i.addFilesTxt)])),n(".flex.flex-column.mt1.nb1",t.map(l(),(function(t){return n("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[n("i.mr2",{class:I(i.downloadIcn)}),t.name,n("i.child.fr",{title:i.remFileTtl+" "+t.name,class:I(i.deleteIcn),onclick:vt(l,t.guid)})])})))]};return a}();function ht(e){return function(n){var a=t.head(n);if(!a){return}e([{guid:C(),name:a.name,path:"not_set",file:a}])}}var gt=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var o=t.head(l());return n(ft,{field:r,multiple:false,dragging:this.dragging,onSet:ht(l)},n(".pa2",{class:this.dragging()?w():b()},[n("i.mr2",{class:I(i.uploadIcn)}),n("span",o?o.name:i.addFileTxt)]))};return a}();function bt(e,a){return function(r){var i="image/jpeg";var l=e();return Promise.all(t.map(r,(function(t){return E(t,a,i).then((function(e){var n=H(t.name)[0];var a=new File([D(e)],n+".jpg",{type:i});l.push({guid:C(),name:a.name,path:"not_set",file:a,dataUrl:e})}))}))).then((function(){e(l);n.redraw()}))}}var wt=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var o=r.classes,c=o===void 0?"":o;return[n(ft,{field:r,accept:"image/*",dragging:this.dragging,onSet:bt(l,i.imageMaxSize)},n(".w-100.pa1.dt.tc",{class:(this.dragging()?w():b())+" "+c},n("i.fa-2x.dtc.v-mid",{class:I(i.cameraIcn)}))),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(l(),(function(t){return n(Z,{src:B(t.path,t.dataUrl),style:s()},n(".pa2.absolute.top-0.right-0.child.pointer",{title:"Remove "+t.name,class:y(),onclick:vt(l,t.guid)},n("i.fa-lg",{class:I(i.deleteIcn)})))})))]};return a}();function yt(e,a){return function(r){var i=t.head(r);if(!i){return Promise.resolve()}var l="image/jpeg";return E(i,a,l).then((function(t){var a=H(i.name)[0];var r=new File([D(t)],a+".jpg",{type:l});e([{guid:C(),name:r.name,path:"not_set",file:r,dataUrl:t}]);n.redraw()}))}}var xt=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var s=t.head(l());var c=r.classes,u=c===void 0?"":c;return n(ft,{field:r,accept:"image/*",multiple:false,dragging:this.dragging,onSet:yt(l,i.imageMaxSize)},n(".w-100.pa1.contain.dt.tc",{class:(this.dragging()?w():b())+" "+u},s?n("img.img.contain",{title:s.name,src:B(s.path,s.dataUrl),style:o()}):n("i.fa-2x.dtc.v-mid",{class:I(i.cameraIcn)})))};return a}();var It=function(){function e(){this.signaturePad=null}e.prototype.oncreate=function(e){var n=this;var r=e.dom;var i=r.children[0];var l=T();this.signaturePad=new a(i,{minWidth:.5*l,maxWidth:1.5*l});var o=function(){var t=T();i.width=i.offsetWidth*t;i.height=i.offsetHeight*t;var e=i.getContext("2d");e.scale(t,t);n.resetCanvas()};this.resizeHandler=t.debounce(o,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);o()};e.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};e.prototype.view=function(t){var e=this;var a=t.attrs,r=a.style,l=a.onSet,o=a.onCancel;return[n(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:r},n("canvas.aspect-ratio--object")),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(O,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:function(){if(e.signaturePad&&!e.signaturePad.isEmpty()){l(e.signaturePad.toDataURL("image/png"))}}}),n(O,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return e.resetCanvas()}}),n(O,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};e.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return e}();function kt(t,e){var n=i.signMaxSize;var a=.01*e*n;return L(t,n,a,i.signFont)}function Ct(t,e){return function(){return e(kt(i.stampSetTxt,t))}}var Tt=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.heightPct,r=e.onSet;return[n("span.clip",{style:{"font-family":i.signFont}},i.stampSetTxt),n(O,{label:i.stampTxt,classes:"w-100",onclick:Ct(a,r)})]};return t}();function Pt(t,e,n){return function(){if(t()){n(kt(t(),e))}return false}}var Bt=function(){function t(){this.text=e("")}t.prototype.oncreate=function(t){var e=t.dom;var n=e.children[0];n.focus({preventScroll:false});this.scaleText(e)};t.prototype.onupdate=function(t){var e=t.dom;this.scaleText(e)};t.prototype.view=function(t){var e=this;var a=t.attrs,r=a.heightPct,l=a.style,o=a.onSet,s=a.onCancel;return[n("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:l,onsubmit:Pt(this.text,r,o)},n("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:z(this.text),value:this.text(),style:{"font-family":i.signFont}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(O,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:Pt(this.text,r,o)}),n(O,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return e.text("")}}),n(O,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]};t.prototype.scaleText=function(t){var e=t.clientHeight;t.style.fontSize=.56*e+"px"};return t}();function Ut(t,e){return new Promise((function(n){var a=new Image;a.onload=function(){var t=document.createElement("canvas");var r=j(a.width,a.height,e),i=r[0],l=r[1];t.width=i;t.height=l;var o=t.getContext("2d");o.drawImage(a,0,0,i,l);n(t.toDataURL())};a.src=t}))}function Ft(t,e,a){return function(r){return Ut(r,a).then((function(a){var r=new File([D(a)],"sign-"+e+".png",{type:"image/png"});t([{guid:C(),name:r.name,path:"not_set",file:r,dataUrl:a}]);n.redraw()}))}}var St=function(){function e(){}e.prototype.oninit=function(t){var e=this;var n=t.attrs.value;n.map((function(){return e.component=undefined}))};e.prototype.view=function(e){var a=this;var r=e.attrs,l=r.field,o=r.value;var s=l,c=s.id,u=s.readonly,d=s.disabled,f=s.classes,p=f===void 0?"":f,v=s.containerClass,m=s.options,h=m===void 0?i.signOpts:m,g=s.heightPct,w=g===void 0?i.signHeightPct:g;var y={"padding-bottom":w+"%"};var x=t.head(o());var k=t(h).map((function(t){var e=t.value;if(e==="draw"){return{component:It,icon:I(i.drawIcn),label:i.signDrawTxt}}else if(e==="type"){return{component:Bt,icon:I(i.typeIcn),label:i.signTypeTxt}}else if(e==="stamp"){return{component:Tt,icon:I(i.stampIcn),label:i.signStampTxt}}return null})).compact().value();if(k.length===1&&!x){this.component=k[0].component}return n(".relative",{class:v},[F(l),u||d?n(".aspect-ratio",{id:c,class:p,style:y},x?n(".aspect-ratio--object",n("img.img.w-100.absolute",{src:B(x.path,x.dataUrl)})):null):this.component?n(this.component,{heightPct:w,style:y,onSet:Ft(o,c,i.signMaxSize),onCancel:function(){return a.component=undefined}}):n(".aspect-ratio.pointer",{id:c,class:b()+" "+p,style:y},x?n(".aspect-ratio--object.hide-child.dim",{onclick:function(){return o([])}},[n("img.img.w-100.absolute",{src:B(x.path,x.dataUrl)}),n(".pa3.absolute.top-0.right-0.child",n("i.fa-2x",{class:I(i.resetIcn)}))]):n(".aspect-ratio--object.flex.items-stretch.justify-center",t.map(k,(function(t){var e=t.component,r=t.icon,i=t.label;return n(".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return a.component=e}},n("i.fa-2x.ma1",{class:r}),n("span.ma1",i))}))))])};return e}();export{_ as Badge,nt as BaseInput,Y as BaseText,O as Button,N as Checkbox,at as CheckboxInput,X as FileList,mt as FileMulti,gt as FileSelect,$ as ImageList,wt as ImageMulti,tt as ImagePreview,xt as ImageSelect,et as Label,K as Link,W as NavButton,rt as PasswordInput,lt as RadioInput,ot as SelectInput,Q as SelectText,St as SignBuilder,it as TextareaInput,V as Trusted,H as fileNameExtSplit,I as getIcon,C as guid,J as iconMap,G as linkAttrs,l as updateConfig,x as updateTheme};
