import e from"lodash";import t from"mithril";import a from"mithril/stream";import r from"signature_pad";var n="fas";function i(e){n=e}function o(e){return n+" "+e}var s="border-box bn";var l="fw2 dark-gray";var c="mb1 f6 silver";var u=Math.max(window.devicePixelRatio||1,1);function f(e,a){var r=e.label;return t("span.mr2.silver.truncate",{title:r,class:a},r)}function d(e){var a=e.id,r=e.label,n=e.required;return t("label",{title:r,for:a,class:c},p(r,n))}function p(e,t){return t?e+"*":e}function v(e,t){return t?t:e}function h(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,a=e=="x"?t:t&3|8;return a.toString(16)})}function m(t,a){return e.find(t,e.matches(a))}function g(t,a){return e.remove(t,e.matches(a))}function y(e){var t=e.lastIndexOf(".");return[e.substr(0,t),e.substr(t)]}function w(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var r=t[0].split(":")[1].split(";")[0];var n=a.length;var i=new Uint8Array(n);for(var o=0;o<n;o++){i[o]=a.charCodeAt(o)}return new Blob([i],{type:r})}function x(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function k(e,t,a){return new Promise(function(r,n){if(!e.type.match(/image.*/)){n(new Error("File most be an image"));return}var i=new FileReader;i.onload=function(e){if(!(e&&e.target)){return}var n=e.target.result;var i=new Image;i.onload=function(){var e=document.createElement("canvas");var o=x(i.width,i.height,t),s=o[0],l=o[1];var c=_(n);if(c>4){e.width=l;e.height=s}else{e.width=s;e.height=l}var u=e.getContext("2d");if(u){L(u,s,l,c);u.drawImage(i,0,0,s,l)}r(e.toDataURL(a))};var o=new Blob([n]);i.src=window.URL.createObjectURL(o)};i.readAsArrayBuffer(e)})}function _(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var r=a.byteLength;var n=2;while(n<r){var i=a.getUint16(n,false);n+=2;if(i===65505){if(a.getUint32(n+=2,false)!==1165519206){return-1}var o=a.getUint16(n+=6,false)===18761;n+=a.getUint32(n+4,o);var s=a.getUint16(n,o);n+=2;for(var l=0;l<s;l++){if(a.getUint16(n+l*12,o)===274){return a.getUint16(n+l*12+8,o)}}}else if((i&65280)!==65280){break}else{n+=a.getUint16(n,false)}}return-1}function L(e,t,a,r){if(!r||r>8){return}switch(r){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}var P=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.label,n=a.type,i=n===void 0?"button":n,s=a.icon,l=a.classes,c=a.disabled,u=a.style,f=a.onclick;return t("button.button-reset.pa2.bn.br2"+b.bgBranding.brandingAlt,{type:i,class:""+(c?"o-60 ":"dim pointer ")+l,disabled:c,style:u,onclick:f},s?t("i.fa-fw.mr2",{class:o(s)}):null,r)};return e}();var U=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,n=r.classes,i=r.style,o=a.value;return t(".pa2",{class:n,style:i},t.trust(o()))};return e}();var z=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,n=a.value;var i=r.classes,o=r.style;return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[f(r),t("span.ws-normal",{title:n()},n())])};return e}();function F(e,t){if(e==="email"){return{href:"mailto:"+t}}else if(e==="tel"){return{href:"tel:"+t}}else{return{href:t,target:"_blank"}}}var C={email:"fa-envelope",tel:"fa-phone"};var H=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,n=a.value;var i=r.classes,s=r.style;return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:s},[f(r),n?t("a.link.dark-gray.dim.pointer.ws-normal",F(r.type,n()),t("i.mr2",{class:o(C[r.type]||"fa-link")}),n()):null])};return e}();var S=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,n=a.value;var i=r.classes,s=r.style;return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:s},[f(r),t("i.self-end",{class:o(n()?"fa-check":"fa-times")})])};return e}();var I=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,n=a.value;var i=r.classes,o=r.style;var s=m(r.options,{value:n()});var l=s?s.label:n();return t(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[f(r),t("span.ws-normal",{title:l},l)])};return e}();var j=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var s=n.classes,l=n.style;return t(".pa2.flex.flex-column.bb.b--black-20",{class:s,style:l},[f(n,"mb1"),t(".flex.flex-column.mt1.nb1",e.map(i(),function(e){var a=e.name,r=e.path;return t("a.pa2.mv1.link.ba.b--black-20.dark-gray.dim.pointer[target=_blank]",{href:r},[t("i.mr2",{class:o("fa-file-download")}),a])}))])};return a}();var O=function(){function e(){}e.prototype.view=function(e){var a=e.children,r=e.attrs;return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[t("img.contain",r),a])};return e}();var q=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var o=n.classes,s=n.style;return t(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:s},[f(n,"mb2"),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(i(),function(e){var a=e.name,r=e.path;return t(O,{title:a,src:r,style:{"max-height":"6rem"}})}))])};return a}();var R=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var s=n.classes,l=n.style;var c=e.head(i());return t(".pa2.flex.flex-column.bb.b--black-20",{class:s,style:l},[f(n,"mb1"),c?t("img.img.contain.self-center"+b.imgHeight,{title:c.name,src:c.path}):t("i",{class:o("fa-image")})])};return a}();var A=function(){function e(){}e.prototype.view=function(e){var a=e.attrs.field,r=a.label,n=a.required;return t("label.mb2",p(r,n))};return e}();var E=function(){function e(){}e.prototype.view=function(e){var a;var r=e.attrs,n=r.field,i=r.value;var o=n.id,c=n.type,u=n.name,f=u===void 0?o:u,p=n.placeholder,v=n.required,h=n.readonly,m=n.disabled,g=n.autofocus,y=n.autocomplete,w=n.spellcheck,x=n.instant,k=n.containerClass,_=n.classes,L=_===void 0?"":_;return[d(n),t(".w-100",{class:k},t("input.input-reset.w-100"+b.inputHeight,(a={id:o,name:f,type:c,value:i(),class:""+(m?"o-60 ":"")+L+" "+s+" "+l,placeholder:p,required:v,readonly:h,disabled:m,autofocus:g,autocomplete:y,spellcheck:w},a[x?"oninput":"onchange"]=function(e){var t=e.target.value;return i(t)},a)))]};return e}();var M=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,n=a.value;var i=r.label,o=r.id,s=r.name,c=s===void 0?o:s,u=r.required,f=r.readonly,d=r.disabled,v=r.autocomplete,h=r.containerClass,m=r.classes,b=m===void 0?"":m;return t("div",{class:h},t(".flex.flex-wrap",{class:l},t("label.flex.items-center.dark-gray",{class:""+(d?"o-60 ":"pointer ")+b},t("input.mr1[type=checkbox]",{id:o,name:c,checked:n(),required:u,readonly:f,disabled:d,autocomplete:v,onchange:function(e){var t=e.target.checked;return n(t)}}),p(i,u))))};return e}();var D=function(){function e(){this.showPassword=a(false)}e.prototype.view=function(e){var a;var r=e.attrs,n=r.field,i=r.value;var o=n.id,u=n.name,f=u===void 0?o:u,p=n.placeholder,v=n.required,h=n.readonly,m=n.disabled,g=n.autofocus,y=n.autocomplete,w=n.instant,x=n.containerClass,k=n.classes,_=k===void 0?"":k;return[t(".flex.justify-between",[d(n),t(M,{field:{id:"showpass",label:"Show Password",type:"checkbox",containerClass:c},value:this.showPassword})]),t(".w-100",{class:x},t("input.input-reset.w-100"+b.inputHeight,(a={id:o,name:f,type:this.showPassword()?"text":"password",value:i(),class:""+(m?"o-60 ":"")+_+" "+s+" "+l,placeholder:p,required:v,readonly:h,disabled:m,autofocus:g,autocomplete:y,autocorrect:"off"},a[w?"oninput":"onchange"]=function(e){var t=e.target.value;return i(t)},a)))]};return e}();var T=function(){function e(){}e.prototype.view=function(e){var a;var r=e.attrs,n=r.field,i=r.value;var o=n.id,c=n.name,u=c===void 0?o:c,f=n.placeholder,p=n.required,v=n.readonly,h=n.disabled,m=n.autofocus,b=n.autocomplete,g=n.spellcheck,y=n.instant,w=n.containerClass,x=n.classes,k=x===void 0?"":x;return[d(n),t("div",{class:w},t("textarea.w-100[rows=3]",(a={id:o,name:u,value:i(),class:""+(h?"o-60 ":"")+k+" "+s+" "+l,placeholder:f,required:p,readonly:v,disabled:h,autofocus:m,autocomplete:b,spellcheck:g,style:{resize:"vertical"}},a[y?"oninput":"onchange"]=function(e){var t=e.target.value;return i(t)},a)))]};return e}();var W=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var o=n,s=o.id,c=o.name,u=c===void 0?s:c,f=o.required,p=o.readonly,v=o.disabled,h=o.autocomplete,m=o.containerClass,b=o.classes,g=b===void 0?"":b,y=o.options;return[d(n),t("div",{class:m},t(".flex.flex-wrap",{class:l,onchange:function(e){var t=e.target.value;return i(t)}},e.map(y,function(e){var a=e.label,r=e.value;return t("label.flex.items-center",{class:""+(v?"o-60 ":"pointer ")+g},t("input.mr1[type=radio]",{name:u,value:r,checked:i()===r,required:f,readonly:p,disabled:v,autocomplete:h}),a)})))]};return a}();var B=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var o=n,c=o.id,u=o.name,f=u===void 0?c:u,p=o.required,v=o.readonly,h=o.disabled,m=o.autofocus,g=o.autocomplete,y=o.containerClass,w=o.classes,x=w===void 0?"":w,k=o.options;return[d(n),t("div",{class:y},t("select.input-reset.w-100"+b.inputHeight,{id:c,name:f,value:i(),class:""+(h?"o-60 ":"")+x+" "+s+" "+l,required:p,readonly:v,disabled:h,autofocus:m,autocomplete:g,onchange:function(e){var t=e.target.value;return i(t)}},e.map(k,function(e){var a=e.label,r=e.value;return t("option",{value:r},a)})))]};return a}();var V=function(){function r(){this.acceptTypes="*";this.multiple=true;this.dragging=false;this.fileList=a([])}r.prototype.oninit=function(e){var t=e.attrs.value;this.fileList=t};r.prototype.view=function(a){var r=this;var n=a.attrs.field;var i=n.label,o=n.id,s=n.name,l=s===void 0?o:s,u=n.required,f=n.readonly,d=n.disabled,p=n.autofocus,v=n.containerClass;return t("div",[t("label.flex.flex-column",e.extend({for:o,title:i,class:(d?"o-60":"pointer")+" "+v},d?{}:{ondragover:function(e){return r.dragStart(e)},ondragleave:function(e){return r.dragStop(e)},ondrop:function(e){r.dragStop(e);if(e.dataTransfer){r.addFiles(e.dataTransfer.files)}}}),[t("input.clip[type=file]",{id:o,name:l,multiple:this.multiple,accept:this.acceptTypes,required:u,readonly:f,disabled:d,autofocus:p,onchange:function(e){var t=e.target.files;r.addFiles(t)}}),t("span",{class:c},i),this.viewUploadWidget(n)]),this.viewFileList()])};r.prototype.viewUploadWidget=function(e){return t(".pa2.ba.b--dashed.br2",{class:this.dragging?"b--blue blue":"b--light-silver dark-gray"},[t("i.mr2",{class:o("fa-file-upload")}),t("span","Add file(s)...")])};r.prototype.viewFileList=function(){var a=this;return t(".flex.flex-column.mt1.nb1",e.map(this.fileList(),function(e){return t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:o("fa-file-download")}),e.name,t("i.child.fr",{title:"Remove "+e.name,class:o("fa-trash-alt"),onclick:function(){return a.removeFile(e.guid)}})])}))};r.prototype.addFiles=function(t){var a=this.fileList();e.each(t,function(e){a.push({guid:h(),name:e.name,path:"not_set",file:e})});this.fileList(a)};r.prototype.removeFile=function(e){var t=this.fileList();g(t,{guid:e});this.fileList(t)};r.prototype.dragStart=function(e){e.preventDefault();if(e.dataTransfer){e.dataTransfer.dropEffect="copy"}if(this.dragging){e.redraw=false}this.dragging=true};r.prototype.dragStop=function(e){e.preventDefault();this.dragging=false};return r}();var G=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function r(){this.constructor=t}t.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var J=function(a){G(r,a);function r(){var e=a!==null&&a.apply(this,arguments)||this;e.multiple=false;return e}r.prototype.viewUploadWidget=function(a){var r=e.head(this.fileList());return t(".pa2.ba.b--dashed.br2",{class:this.dragging?"b--blue blue":"b--light-silver dark-gray"},[t("i.mr2",{class:o("fa-file-upload")}),t("span",r?r.name:"Upload...")])};r.prototype.viewFileList=function(){return null};r.prototype.addFiles=function(t){var a=e.head(t);if(!a){return}this.setFile({guid:this.getFileId(),name:a.name,path:"not_set",file:a})};r.prototype.getFileId=function(){var t=e.head(this.fileList());return t?t.guid:h()};r.prototype.setFile=function(e){this.fileList([e])};return r}(V);var K=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function r(){this.constructor=t}t.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var N=function(a){K(r,a);function r(){var e=a!==null&&a.apply(this,arguments)||this;e.acceptTypes="image/*";return e}r.prototype.viewUploadWidget=function(e){var a=e.classes,r=a===void 0?"h3":a;return t(".w-100.pa1.ba.bw1.b--dashed.br3.dt.tc",{class:r+" "+(this.dragging?"b--blue blue":"b--light-silver dark-gray")},t("i.fa-2x.dtc.v-mid",{class:o("fa-camera")}))};r.prototype.viewFileList=function(){var a=this;return t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(this.fileList(),function(e){return t(O,{src:v(e.path,e.dataUrl),class:"dim",style:{"max-height":"6rem"}},t(".pa2.bg-white.ba.b--light-silver.br2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,onclick:function(){return a.removeFile(e.guid)}},t("i.fa-lg",{class:o("fa-trash-alt")})))}))};r.prototype.addFiles=function(a){var n=this;var i="image/jpeg";var o=this.fileList();Promise.all(e.map(a,function(e){return k(e,r.maxImageSize,i).then(function(t){var a=y(e.name)[0];var r=new File([w(t)],a+".jpg",{type:i});o.push({guid:h(),name:r.name,path:"not_set",file:r,dataUrl:t})})})).then(function(){n.fileList(o);t.redraw()})};r.maxImageSize=1280;return r}(V);var Q=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function r(){this.constructor=t}t.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var X=function(a){Q(r,a);function r(){var e=a!==null&&a.apply(this,arguments)||this;e.multiple=false;e.acceptTypes="image/*";return e}r.prototype.viewUploadWidget=function(a){var r=a.classes,n=r===void 0?"h5":r;var i=e.head(this.fileList());return t(".w-100.pa1.contain.ba.bw1.b--dashed.br3.dt.tc",{class:n+" "+(this.dragging?"b--blue blue":"b--light-silver dark-gray")},i?t("img.img"+b.imgHeight,{src:v(i.path,i.dataUrl)}):t("i.fa-2x.dtc.v-mid",{class:o("fa-camera")}))};r.prototype.addFiles=function(a){var n=this;var i=e.head(a);if(!i){return}var o="image/jpeg";k(i,r.maxImageSize,o).then(function(e){var a=y(i.name)[0];var r=new File([w(e)],a+".jpg",{type:o});n.setFile({guid:n.getFileId(),name:r.name,path:"not_set",file:r,dataUrl:e});t.redraw()})};r.maxImageSize=1280;return r}(J);var Y=function(){function a(){this.signaturePad=null}a.prototype.oncreate=function(t){var a=this;var n=t.dom;var i=n.children[0];this.signaturePad=new r(i,{minWidth:.5*u,maxWidth:1.5*u});var o=function(){i.width=i.offsetWidth*u;i.height=i.offsetHeight*u;var e=i.getContext("2d");if(e&&a.signaturePad){e.scale(u,u);a.signaturePad.clear()}};this.resizeHandler=e.debounce(o,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);o()};a.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};a.prototype.view=function(e){var a=this;var r=e.attrs,n=r.onSet,i=r.onCancel;return[t(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30"+b.aspectRatio4x1,t("canvas.aspect-ratio--object")),t(".flex.flex-row.nl1.nr1.mb1",[t(P,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(a.signaturePad&&!a.signaturePad.isEmpty()){n(a.signaturePad.toDataURL("image/png"))}}}),t(P,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return a.resetCanvas()}}),t(P,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:i})])]};a.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return a}();var Z=function(){function r(){this.text=a("");this.fontSize=a("12px")}r.prototype.oncreate=function(a){var r=this;var n=a.dom;var i=n.children[0];i.focus({preventScroll:false});var o=function(){var e=n.offsetHeight;r.fontSize(.28*e*u+"px");t.redraw()};this.resizeHandler=e.debounce(o,125);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);o()};r.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};r.prototype.view=function(e){var a=this;var r=e.attrs,n=r.onSet,i=r.onCancel;return[t(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30"+b.aspectRatio4x1,t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{onkeypress:function(e){var t=e.keyCode;if(t===13&&a.text()){n($(a.text()));return false}return true},oninput:function(e){var t=e.target.value;return a.text(t)},value:this.text(),style:{"font-size":this.fontSize(),"font-family":"Caveat"}})),t(".flex.flex-row.nl1.nr1.mb1",[t(P,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(a.text()){n($(a.text()))}}}),t(P,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return a.text("")}}),t(P,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:i})])]};return r}();function $(e){var t=document.createElement("canvas");var a=90*u;t.width=600*u;t.height=150*u;var r=t.getContext("2d");if(r){r.textBaseline="middle";r.font=a+"px Caveat";r.fillText(e,6*u,t.height*.52)}return t.toDataURL()}var ee=this&&this.__extends||function(){var e=function(t,a){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a]};return e(t,a)};return function(t,a){e(t,a);function r(){this.constructor=t}t.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var te=function(a){ee(r,a);function r(){var e=a!==null&&a.apply(this,arguments)||this;e.state=0;return e}r.prototype.view=function(a){var r=this;var n=a.attrs.field;var i=n.id,s=n.containerClass;var l=e.head(this.fileList());return t(".flex.flex-column",{class:s},[t(".mb1.flex.flex-row",[d(n),t("span.ph2.mh2.ml-auto.dark-gray",{class:this.state===1?b.brandingAlt.class:"dim pointer",onclick:function(){return r.state=1}},t("i.fa-fw",{class:o("fa-pen")})),t("span.ph2.mh2.dark-gray",{class:this.state===2?b.brandingAlt.class:"dim pointer",onclick:function(){return r.state=2}},t("i.fa-fw",{class:o("fa-keyboard")}))]),this.state===0?t(".aspect-ratio.dark-gray.ba.bw1.br3.b--dashed.b--black-30.pointer"+b.aspectRatio4x1,{onclick:function(){return r.state=1}},l?t("img.aspect-ratio--object",{src:v(l.path,l.dataUrl)}):t(".aspect-ratio--object.flex.items-center.justify-center",[t("i.fa-2x",{class:o("fa-pen-nib")}),t("span.ml2","Sign")])):t(this.state===1?Y:Z,{onSet:function(e){return r.setDataUrl(e,i)},onCancel:function(){return r.state=0}})])};r.prototype.setDataUrl=function(e,a){var n=this;ae(e,r.maxImageSize).then(function(e){var r=new File([w(e)],"sign-"+a+".png",{type:"image/png"});n.setFile({guid:n.getFileId(),name:r.name,path:"not_set",file:r,dataUrl:e});n.state=0;t.redraw()})};r.maxImageSize=640;return r}(J);function ae(e,t){return new Promise(function(a){var r=new Image;r.onload=function(){var e=document.createElement("canvas");var n=x(r.width,r.height,t),i=n[0],o=n[1];e.width=i;e.height=o;var s=e.getContext("2d");if(s){s.drawImage(r,0,0,i,o)}a(e.toDataURL())};r.src=e})}export{E as BaseInput,z as BaseText,P as Button,S as Checkbox,M as CheckboxInput,j as FileList,V as FileMulti,J as FileSelect,q as ImageList,N as ImageMulti,R as ImagePreview,X as ImageSelect,A as Label,H as Link,D as PasswordInput,W as RadioInput,B as SelectInput,I as SelectText,te as SignBuilder,T as TextareaInput,U as Trusted,w as dataURItoBlob,y as fileNameExtSplit,f as getDisplayLabel,d as getLabel,p as getLabelText,h as guid,C as iconMap,v as imgSrc,s as inputBorder,l as inputText,c as labelCls,F as linkAttrs,m as pickByProperty,u as pxRatio,g as removeByProperty,k as resizeImage,x as scaleRect,i as setIconStyle,o as styleIcon};
