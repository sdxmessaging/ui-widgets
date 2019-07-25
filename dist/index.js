import e from"lodash";import t from"mithril";import a from"mithril/stream";import n from"signature_pad";var r=Math.max(window.devicePixelRatio||1,1);var i="border-box bn";var o="fw2 dark-gray";var l="mb1 f6 silver";var s={"padding-bottom":"25%"};var c={icon:"fas",inpHgt:"h2",btnBg:"bg-light-blue",btnTxt:"dark-gray"};function u(t){e.merge(c,t)}function f(t){return e(t).map(function(e){return c[e]}).value().join(" ")}function d(e){return f(["icon"])+" "+e}function v(e,a){var n=e.label;return t("span.mr2.silver.truncate",{title:n,class:a},n)}function p(e){var a=e.id,n=e.label,r=e.required;return t("label",{title:n,for:a,class:l},h(n,r))}function h(e,t){return t?e+"*":e}function m(e,t){return t?t:e}function g(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,a=e=="x"?t:t&3|8;return a.toString(16)})}function b(e){return function(t){var a=t.target.value;return e(a)}}function w(e){return function(t){var a=t.target.checked;return e(a)}}function x(t,a){return e.find(t,e.matches(a))}function y(t,a){return e.remove(t,e.matches(a))}function k(e){var t=e.lastIndexOf(".");return[e.substr(0,t),e.substr(t)]}function z(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var i=new Uint8Array(r);for(var o=0;o<r;o++){i[o]=a.charCodeAt(o)}return new Blob([i],{type:n})}function C(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function U(e,t,a){return new Promise(function(n,r){if(!e.type.match(/image.*/)){r(new Error("File most be an image"));return}var i=new FileReader;i.onload=function(e){if(!(e&&e.target)){return}var r=e.target.result;var i=new Image;i.onload=function(){var e=document.createElement("canvas");var o=C(i.width,i.height,t),l=o[0],s=o[1];var c=P(r);if(c>4){e.width=s;e.height=l}else{e.width=l;e.height=s}var u=e.getContext("2d");if(u){S(u,l,s,c);u.drawImage(i,0,0,l,s)}n(e.toDataURL(a))};var o=new Blob([r]);i.src=window.URL.createObjectURL(o)};i.readAsArrayBuffer(e)})}function P(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var i=a.getUint16(r,false);r+=2;if(i===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var o=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,o);var l=a.getUint16(r,o);r+=2;for(var s=0;s<l;s++){if(a.getUint16(r+s*12,o)===274){return a.getUint16(r+s*12+8,o)}}}else if((i&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function S(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}var H=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.label,r=a.type,i=r===void 0?"button":r,o=a.icon,l=a.classes,s=a.disabled,c=a.style,u=a.onclick;return t("button.button-reset.pa2.bn.br2",{type:i,class:""+(s?"o-60 ":"dim pointer ")+f(["btnBg","btnTxt"])+" "+l,disabled:s,style:c,onclick:u},o?t("i.fa-fw.mr2",{class:d(o)}):null,n)};return e}();var q=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=n.classes,i=n.style,o=a.value;return t(".pa2",{class:r,style:i},t.trust(o()))};return e}();var I=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.classes,o=n.style;return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[v(n),t("span.ws-normal",{title:r()},r())])};return e}();function L(e,t){if(e==="email"){return{href:"mailto:"+t}}else if(e==="tel"){return{href:"tel:"+t}}else{return{href:t,target:"_blank"}}}var E={email:"fa-envelope",tel:"fa-phone"};var j=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.classes,o=n.style;return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[v(n),t("a.link.dark-gray.dim.pointer.ws-normal",L(n.type,r()),t("i.mr2",{class:d(E[n.type]||"fa-link")}),r())])};return e}();var R=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.classes,o=n.style;return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[v(n),t("i.self-end",{class:d(r()?"fa-check":"fa-times")})])};return e}();var M=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.classes,o=n.style;var l=x(n.options,{value:r()});var s=l?l.label:r();return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[v(n),t("span.ws-normal",{title:s},s)])};return e}();var T=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var o=r.classes,l=r.style;return t(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:l},[v(r,"mb1"),t(".flex.flex-column.mt1.nb1",e.map(i(),function(e){var a=e.name,n=e.path;return t("a.pa2.mv1.link.ba.b--black-20.dark-gray.dim.pointer[target=_blank]",{href:n},[t("i.mr2",{class:d("fa-file-download")}),a])}))])};return a}();var D=function(){function e(){}e.prototype.view=function(e){var a=e.children,n=e.attrs;return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[t("img.contain",n),a])};return e}();var _=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var o=r.classes,l=r.style;return t(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:l},[v(r,"mb2"),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(i(),function(e){var a=e.name,n=e.path;return t(D,{title:a,src:n,style:{"max-height":"6rem"}})}))])};return a}();var A=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var o=r.classes,l=r.style;var s=e.head(i());return t(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:l},[v(r,"mb1"),s?t("img.img.h5.contain.self-center",{title:s.name,src:s.path}):t("i",{class:d("fa-image")})])};return a}();var B=function(){function e(){}e.prototype.view=function(e){var a=e.attrs.field,n=a.label,r=a.required;return t("label.mb2",h(n,r))};return e}();var F=function(){function e(){}e.prototype.view=function(e){var a;var n=e.attrs,r=n.field,l=n.value;var s=r.id,c=r.type,u=r.name,d=u===void 0?s:u,v=r.placeholder,h=r.required,m=r.readonly,g=r.disabled,w=r.autofocus,x=r.autocomplete,y=r.spellcheck,k=r.instant,z=r.containerClass,C=r.classes,U=C===void 0?"":C;return[p(r),t(".w-100",{class:z},t("input.input-reset.w-100",(a={id:s,name:d,type:c,value:l(),class:""+(g?"o-60 ":"")+f(["inpHgt"])+" "+U+" "+i+" "+o,placeholder:v,required:h,readonly:m,disabled:g,autofocus:w,autocomplete:x,spellcheck:y},a[k?"oninput":"onchange"]=b(l),a)))]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,n=a.field,r=a.value;var i=n.label,l=n.id,s=n.name,c=s===void 0?l:s,u=n.required,f=n.readonly,d=n.disabled,v=n.autocomplete,p=n.containerClass,m=n.classes,g=m===void 0?"":m;return t("div",{class:p},t(".flex.flex-wrap",{class:o},t("label.flex.items-center.dark-gray",{class:""+(d?"o-60 ":"pointer ")+g},t("input.mr1[type=checkbox]",{id:l,name:c,checked:r(),required:u,readonly:f,disabled:d,autocomplete:v,onchange:w(r)}),h(i,u))))};return e}();var W=function(){function e(){this.showPassword=a(false)}e.prototype.view=function(e){var a;var n=e.attrs,r=n.field,s=n.value;var c=r.id,u=r.name,d=u===void 0?c:u,v=r.placeholder,h=r.required,m=r.readonly,g=r.disabled,w=r.autofocus,x=r.autocomplete,y=r.instant,k=r.containerClass,z=r.classes,C=z===void 0?"":z;return[t(".flex.justify-between",[p(r),t(O,{field:{id:"showpass",label:"Show Password",type:"checkbox",containerClass:l},value:this.showPassword})]),t(".w-100",{class:k},t("input.input-reset.w-100",(a={id:c,name:d,type:this.showPassword()?"text":"password",value:s(),class:""+(g?"o-60 ":"")+f(["inpHgt"])+" "+C+" "+i+" "+o,placeholder:v,required:h,readonly:m,disabled:g,autofocus:w,autocomplete:x,autocorrect:"off"},a[y?"oninput":"onchange"]=b(s),a)))]};return e}();var V=function(){function e(){}e.prototype.view=function(e){var a;var n=e.attrs,r=n.field,l=n.value;var s=r.id,c=r.name,u=c===void 0?s:c,f=r.placeholder,d=r.required,v=r.readonly,h=r.disabled,m=r.autofocus,g=r.autocomplete,w=r.spellcheck,x=r.instant,y=r.containerClass,k=r.classes,z=k===void 0?"":k;return[p(r),t("div",{class:y},t("textarea.w-100[rows=3]",(a={id:s,name:u,value:l(),class:""+(h?"o-60 ":"")+z+" "+i+" "+o,placeholder:f,required:d,readonly:v,disabled:h,autofocus:m,autocomplete:g,spellcheck:w,style:{resize:"vertical"}},a[x?"oninput":"onchange"]=b(l),a)))]};return e}();var G=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var l=r,s=l.id,c=l.name,u=c===void 0?s:c,f=l.required,d=l.readonly,v=l.disabled,h=l.autocomplete,m=l.containerClass,g=l.classes,w=g===void 0?"":g,x=l.options;return[p(r),t("div",{class:m},t(".flex.flex-wrap",{class:o,onchange:b(i)},e.map(x,function(e){var a=e.label,n=e.value;return t("label.flex.items-center",{class:""+(v?"o-60 ":"pointer ")+w},t("input.mr1[type=radio]",{name:u,value:n,checked:i()===n,required:f,readonly:d,disabled:v,autocomplete:h}),a)})))]};return a}();var J=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,l=n.value;var s=r,c=s.id,u=s.name,d=u===void 0?c:u,v=s.required,h=s.readonly,m=s.disabled,g=s.autofocus,w=s.autocomplete,x=s.containerClass,y=s.classes,k=y===void 0?"":y,z=s.options;return[p(r),t("div",{class:x},t("select.input-reset.w-100",{id:c,name:d,value:l(),class:""+(m?"o-60 ":"")+f(["inpHgt"])+" "+k+" "+i+" "+o,required:v,readonly:h,disabled:m,autofocus:g,autocomplete:w,onchange:b(l)},e.map(z,function(e){var a=e.label,n=e.value;return t("option",{value:n},a)})))]};return a}();var K=function(){function a(){}a.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.accept,o=i===void 0?"*":i,s=n.multiple,c=s===void 0?true:s,u=n.dragging,f=n.onSet,d=a.children;var v=r.label,p=r.id,h=r.name,m=h===void 0?p:h,g=r.required,b=r.readonly,w=r.disabled,x=r.autofocus,y=r.containerClass;return t("label.flex.flex-column",e.extend({for:p,title:v,class:(w?"o-60":"pointer")+" "+y},w?{}:{ondragover:N(u),ondragleave:Q(u),ondrop:X(u,f)}),[t("input.clip[type=file]",{id:p,name:m,multiple:c,accept:o,required:g,readonly:b,disabled:w,autofocus:x,onchange:Y(f)}),t("span",{class:l},v),d])};return a}();function N(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function Q(e){return function(t){t.preventDefault();e(false)}}function X(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function Y(e){return function(t){var a=t.target.files;return e(a)}}var Z=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;return t("div",[t(K,{field:r,dragging:this.dragging,onSet:$(i)},t(".pa2.ba.b--dashed.br2",{class:this.dragging()?"b--blue blue":"b--light-silver dark-gray"},[t("i.mr2",{class:d("fa-file-upload")}),t("span","Add file(s)...")])),t(".flex.flex-column.mt1.nb1",e.map(i(),function(e){return t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:d("fa-file-download")}),e.name,t("i.child.fr",{title:"Remove "+e.name,class:d("fa-trash-alt"),onclick:ee(i,e.guid)})])}))])};return n}();function $(t){return function(a){var n=t();e.each(a,function(e){n.push({guid:g(),name:e.name,path:"not_set",file:e})});t(n)}}function ee(e,t){return function(){var a=e();y(a,{guid:t});e(a)}}var te=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var n=a.attrs,r=n.field,i=n.value;var o=e.head(i());return t("div",[t(K,{field:r,multiple:false,dragging:this.dragging,onSet:ae(i)},t(".pa2.ba.b--dashed.br2",{class:this.dragging()?"b--blue blue":"b--light-silver dark-gray"},[t("i.mr2",{class:d("fa-file-upload")}),t("span",o?o.name:"Upload...")]))])};return n}();function ae(t){return function(a){var n=e.head(a);if(!n){return}var r=e.head(t());t([{guid:r?r.guid:g(),name:n.name,path:"not_set",file:n}])}}var ne=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var r=a.attrs,i=r.field,o=r.value;var l=i.classes;return t("div",[t(K,{field:i,accept:"image/*",dragging:this.dragging,onSet:re(o,n.maxImageSize)},t(".w-100.pa1.ba.bw1.b--dashed.br3.dt.tc",{class:l+" "+(this.dragging()?"b--blue blue":"b--light-silver dark-gray")},t("i.fa-2x.dtc.v-mid",{class:d("fa-camera")}))),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(o(),function(e){return t(D,{src:m(e.path,e.dataUrl),class:"dim",style:{"max-height":"6rem"}},t(".pa2.bg-white.ba.b--light-silver.br2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,onclick:ee(o,e.guid)},t("i.fa-lg",{class:d("fa-trash-alt")})))}))])};n.maxImageSize=1280;return n}();function re(a,n){return function(r){var i="image/jpeg";var o=a();Promise.all(e.map(r,function(e){return U(e,n,i).then(function(t){var a=k(e.name)[0];var n=new File([z(t)],a+".jpg",{type:i});o.push({guid:g(),name:n.name,path:"not_set",file:n,dataUrl:t})})})).then(function(){a(o);t.redraw()})}}var ie=function(){function n(){this.dragging=a(false)}n.prototype.view=function(a){var r=a.attrs,i=r.field,o=r.value;var l=e.head(o());var s=i.classes;return t("div",[t(K,{field:i,accept:"image/*",multiple:false,dragging:this.dragging,onSet:oe(o,n.maxImageSize)},t(".w-100.pa1.contain.ba.bw1.b--dashed.br3.dt.tc",{class:s+" "+(this.dragging()?"b--blue blue":"b--light-silver dark-gray")},l?t("img.img.h5",{src:m(l.path,l.dataUrl)}):t("i.fa-2x.dtc.v-mid",{class:d("fa-camera")})))])};n.maxImageSize=1280;return n}();function oe(a,n){return function(r){var i=e.head(r);if(!i){return}var o=e.head(a());var l="image/jpeg";U(i,n,l).then(function(e){var n=k(i.name)[0];var r=new File([z(e)],n+".jpg",{type:l});a([{guid:o?o.guid:g(),name:r.name,path:"not_set",file:r,dataUrl:e}]);t.redraw()})}}var le=function(){function a(){this.signaturePad=null}a.prototype.oncreate=function(t){var a=this;var i=t.dom;var o=i.children[0];this.signaturePad=new n(o,{minWidth:.5*r,maxWidth:1.5*r});var l=function(){o.width=o.offsetWidth*r;o.height=o.offsetHeight*r;var e=o.getContext("2d");if(e&&a.signaturePad){e.scale(r,r);a.signaturePad.clear()}};this.resizeHandler=e.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};a.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};a.prototype.view=function(e){var a=this;var n=e.attrs,r=n.onSet,i=n.onCancel;return[t(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:s},t("canvas.aspect-ratio--object")),t(".flex.flex-row.nl1.nr1.mb1",[t(H,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(a.signaturePad&&!a.signaturePad.isEmpty()){r(a.signaturePad.toDataURL("image/png"))}}}),t(H,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return a.resetCanvas()}}),t(H,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:i})])]};a.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return a}();var se=function(){function n(){this.text=a("");this.fontSize=a("12px")}n.prototype.oncreate=function(a){var n=this;var i=a.dom;var o=i.children[0];o.focus({preventScroll:false});var l=function(){var e=i.offsetHeight;n.fontSize(.28*e*r+"px");t.redraw()};this.resizeHandler=e.debounce(l,125);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};n.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};n.prototype.view=function(e){var a=this;var n=e.attrs,r=n.onSet,i=n.onCancel;return[t(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:s},t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{onkeypress:function(e){var t=e.keyCode;if(t===13&&a.text()){r(ce(a.text()));return false}return true},oninput:function(e){var t=e.target.value;return a.text(t)},value:this.text(),style:{"font-size":this.fontSize(),"font-family":"Caveat"}})),t(".flex.flex-row.nl1.nr1.mb1",[t(H,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(a.text()){r(ce(a.text()))}}}),t(H,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return a.text("")}}),t(H,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:i})])]};return n}();function ce(e){var t=document.createElement("canvas");var a=90*r;t.width=600*r;t.height=150*r;var n=t.getContext("2d");if(n){n.textBaseline="middle";n.font=a+"px Caveat";n.fillText(e,6*r,t.height*.52)}return t.toDataURL()}var ue=function(){function a(){this.state=0}a.prototype.view=function(n){var r=this;var i=n.attrs,o=i.field,l=i.value;var c=o.id,u=o.containerClass;var v=e.head(l());var h=v?v.guid:g();return t(".flex.flex-column",{class:u},[t(".mb1.flex.flex-row",[p(o),t("span.ph2.mh2.ml-auto.dark-gray",{class:""+(this.state===1?"":"dim pointer ")+f(["btnTxt"]),onclick:function(){return r.state=1}},t("i.fa-fw",{class:d("fa-pen")})),t("span.ph2.mh2.dark-gray",{class:""+(this.state===2?"":"dim pointer ")+f(["btnTxt"]),onclick:function(){return r.state=2}},t("i.fa-fw",{class:d("fa-keyboard")}))]),this.state===0?t(".aspect-ratio.dark-gray.ba.bw1.br3.b--dashed.b--black-30.pointer",{style:s,onclick:function(){return r.state=1}},v?t("img.aspect-ratio--object",{src:m(v.path,v.dataUrl)}):t(".aspect-ratio--object.flex.items-center.justify-center",[t("i.fa-2x",{class:d("fa-pen-nib")}),t("span.ml2","Sign")])):t(this.state===1?le:se,{onSet:function(e){fe(e,a.maxImageSize).then(function(e){var a=new File([z(e)],"sign-"+c+".png",{type:"image/png"});l([{guid:h,name:a.name,path:"not_set",file:a,dataUrl:e}]);r.state=0;t.redraw()})},onCancel:function(){return r.state=0}})])};a.maxImageSize=640;return a}();function fe(e,t){return new Promise(function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=C(n.width,n.height,t),i=r[0],o=r[1];e.width=i;e.height=o;var l=e.getContext("2d");if(l){l.drawImage(n,0,0,i,o)}a(e.toDataURL())};n.src=e})}export{F as BaseInput,I as BaseText,H as Button,R as Checkbox,O as CheckboxInput,T as FileList,Z as FileMulti,te as FileSelect,_ as ImageList,ne as ImageMulti,A as ImagePreview,ie as ImageSelect,B as Label,j as Link,W as PasswordInput,G as RadioInput,J as SelectInput,M as SelectText,ue as SignBuilder,V as TextareaInput,q as Trusted,u as applyTheme,d as getIcon,f as getTheme,E as iconMap,L as linkAttrs};
