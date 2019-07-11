import t from"lodash";import e from"mithril";import a from"mithril/stream";import r from"signature_pad";var n="border-box bn";var i="fw2 dark-gray";var o=Math.max(window.devicePixelRatio||1,1);function l(t,a){var r=t.label;return e("span.mr2.silver.truncate",{title:r,class:a},r)}function s(t){var a=t.id,r=t.label,n=t.required;return e("label.mb1.f6.silver",{title:r,for:a},c(r,n))}function c(t,e){return e?t+"*":t}function u(t,e){return e?e:t}function f(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,a=t=="x"?e:e&3|8;return a.toString(16)})}function p(e,a){return t.find(e,t.matches(a))}function d(e,a){return t.remove(e,t.matches(a))}function v(t){var e=t.lastIndexOf(".");return[t.substr(0,e),t.substr(e)]}function h(t){var e=t.split(",");var a=e[0].indexOf("base64")>=0?atob(e[1]):unescape(e[1]);var r=e[0].split(":")[1].split(";")[0];var n=a.length;var i=new Uint8Array(n);for(var o=0;o<n;o++){i[o]=a.charCodeAt(o)}return new Blob([i],{type:r})}function m(t,e,a){if(t>e){if(t>a){return[a,Math.round(e*a/t)]}}else if(e>a){return[Math.round(t*a/e),a]}return[t,e]}function g(t,e,a){return new Promise(function(r,n){if(!t.type.match(/image.*/)){n(new Error("File most be an image"));return}var i=new FileReader;i.onload=function(t){if(!(t&&t.target)){return}var n=t.target.result;var i=new Image;i.onload=function(){var t=document.createElement("canvas");var o=m(i.width,i.height,e),l=o[0],s=o[1];var c=y(n);if(c>4){t.width=s;t.height=l}else{t.width=l;t.height=s}var u=t.getContext("2d");if(u){x(u,l,s,c);u.drawImage(i,0,0,l,s)}r(t.toDataURL(a))};var o=new Blob([n]);i.src=window.URL.createObjectURL(o)};i.readAsArrayBuffer(t)})}function y(t){var e=Math.min(t.byteLength,64*1024);var a=new DataView(t,0,e);if(a.getUint16(0,false)!==65496){return-2}var r=a.byteLength;var n=2;while(n<r){var i=a.getUint16(n,false);n+=2;if(i===65505){if(a.getUint32(n+=2,false)!==1165519206){return-1}var o=a.getUint16(n+=6,false)===18761;n+=a.getUint32(n+4,o);var l=a.getUint16(n,o);n+=2;for(var s=0;s<l;s++){if(a.getUint16(n+s*12,o)===274){return a.getUint16(n+s*12+8,o)}}}else if((i&65280)!==65280){break}else{n+=a.getUint16(n,false)}}return-1}function x(t,e,a,r){if(!r||r>8){return}switch(r){case 2:t.translate(e,0);t.scale(-1,1);return;case 3:t.translate(e,a);t.rotate(Math.PI);return;case 4:t.translate(0,a);t.scale(1,-1);return;case 5:t.rotate(.5*Math.PI);t.scale(1,-1);return;case 6:t.rotate(.5*Math.PI);t.translate(0,-a);return;case 7:t.rotate(.5*Math.PI);t.translate(e,-a);t.scale(-1,1);return;case 8:t.rotate(-.5*Math.PI);t.translate(-e,0);return}}var w=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.label,n=a.type,i=n===void 0?"button":n,o=a.icon,l=a.classes,s=a.disabled,c=a.style,u=a.onclick;return e("button.button-reset.pa2.bn.br2"+b.bgBranding.brandingAlt,{type:i,class:""+(s?"o-60 ":"dim pointer ")+l,disabled:s,style:c,onclick:u},o?e("i.fal.fa-fw.mr2",{class:o}):null,r)};return t}();var k=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,n=r.classes,i=r.style,o=a.value;return e(".pa2",{class:n,style:i},e.trust(o()))};return t}();var _=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,n=a.value;var i=r.classes,o=r.style;return e(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[l(r),e("span.ws-normal",{title:n()},n())])};return t}();function L(t,e){if(t==="email"){return{href:"mailto:"+e}}else if(t==="tel"){return{href:"tel:"+e}}else{return{href:e,target:"_blank"}}}var U={email:"fa-envelope",tel:"fa-phone"};var C=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,n=a.value;var i=r.classes,o=r.style;return e(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[l(r),n?e("a.link.dark-gray.dim.pointer.ws-normal",L(r.type,n()),e("i.fal.mr2",{class:U[r.type]}),n()):null])};return t}();var F=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,n=a.value;var i=r.classes,o=r.style;return e(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[l(r),e("i.fal.self-end",{class:n()?"fa-check":"fa-times"})])};return t}();var P=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,n=a.value;var i=r.classes,o=r.style;var s=p(r.options,{value:n()});var c=s?s.label:n();return e(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[l(r),e("span.ws-normal",{title:c},c)])};return t}();var I=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var o=n.classes,s=n.style;return e(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:s},[l(n,"mb1"),e(".flex.flex-column.mt1.nb1",t.map(i(),function(t){var a=t.name,r=t.path;return e("a.pa2.mv1.link.ba.b--black-20.dark-gray.dim.pointer[target=_blank]",{href:r},[e("i.fal.fa-file-download.mr2"),a])}))])};return a}();var O=function(){function t(){}t.prototype.view=function(t){var a=t.children,r=t.attrs;return e(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[e("img.contain",r),a])};return t}();var j=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var o=n.classes,s=n.style;return e(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:s},[l(n,"mb2"),e(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(i(),function(t){var a=t.name,r=t.path;return e(O,{title:a,src:r,style:{"max-height":"6rem"}})}))])};return a}();var z=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,i=r.value;var o=n.classes,s=n.style;var c=t.head(i());return e(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:s},[l(n,"mb1"),c?e("img.img.contain.self-center"+b.imgHeight,{title:c.name,src:c.path}):e("i.fal.fa-image")])};return a}();var S=function(){function t(){}t.prototype.view=function(t){var a=t.attrs.field,r=a.label,n=a.required;return e("label.mb2",c(r,n))};return t}();var R=function(){function t(){}t.prototype.view=function(t){var a;var r=t.attrs,o=r.field,l=r.value;var c=o.id,u=o.type,f=o.name,p=f===void 0?c:f,d=o.placeholder,v=o.required,h=o.readonly,m=o.disabled,g=o.autofocus,y=o.autocomplete,x=o.instant,w=o.containerClass,k=o.classes,_=k===void 0?"":k,L=o.xform,U=L===void 0?q:L;return[s(o),e(".w-100",{class:w},e("input.input-reset.w-100.pa2"+b.inputHeight,(a={id:c,name:p,type:u,value:l(),class:""+(m?"o-60 ":"")+_+" "+n+" "+i,placeholder:d,required:v,readonly:h,disabled:m,autofocus:g,autocomplete:y},a[x?"oninput":"onchange"]=function(t){var e=t.target.value;return l(U(e))},a)))]};return t}();function q(t){return t}var A=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.id,c=r.name,u=c===void 0?l:c,f=r.placeholder,p=r.required,d=r.readonly,v=r.disabled,h=r.autofocus,m=r.autocomplete,b=r.containerClass,g=r.classes,y=g===void 0?"":g;return[s(r),e("div",{class:b},e("textarea.w-100.pa2[rows=3]",{id:l,name:u,value:o(),class:""+(v?"o-60 ":"")+y+" "+n+" "+i,placeholder:f,required:p,readonly:d,disabled:v,autofocus:h,autocomplete:m,style:{resize:"vertical"},onchange:function(t){var e=t.target.value;return o(e)}}))]};return t}();var E=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,n=a.value;var o=r.label,l=r.id,s=r.name,u=s===void 0?l:s,f=r.required,p=r.readonly,d=r.disabled,v=r.autocomplete,h=r.containerClass,m=r.classes,b=m===void 0?"":m;return e("div.pa2",{class:h},e(".flex.flex-wrap",{class:i},e("label.flex.items-center.dark-gray",{class:""+(d?"o-60 ":"")+b},e("input.mr1[type=checkbox]",{id:l,name:u,checked:n(),required:f,readonly:p,disabled:d,autocomplete:v,onchange:function(t){var e=t.target.checked;return n(e)}}),c(o,f))))};return t}();var M=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,n=r.field,o=r.value;var l=n,c=l.id,u=l.name,f=u===void 0?c:u,p=l.required,d=l.readonly,v=l.disabled,h=l.autocomplete,m=l.containerClass,b=l.classes,g=b===void 0?"":b,y=l.options;return[s(n),e("div",{class:m},e(".flex.flex-wrap",{class:i,onchange:function(t){var e=t.target.value;return o(e)}},t.map(y,function(t){var a=t.label,r=t.value;return e("label.flex.items-center.ma2",{class:v?"o-60":"pointer"},e("input.mr1[type=radio]",{name:f,value:r,checked:o()===r,class:g,required:p,readonly:d,disabled:v,autocomplete:h}),a)})))]};return a}();var D=function(){function a(){}a.prototype.view=function(a){var r=a.attrs,o=r.field,l=r.value;var c=o,u=c.id,f=c.name,p=f===void 0?u:f,d=c.required,v=c.readonly,h=c.disabled,m=c.autofocus,g=c.autocomplete,y=c.containerClass,x=c.classes,w=x===void 0?"":x,k=c.options;return[s(o),e("div",{class:y},e("select.input-reset.w-100.pa2"+b.inputHeight,{id:u,name:p,value:l(),class:""+(h?"o-60 ":"")+w+" "+n+" "+i,required:d,readonly:v,disabled:h,autofocus:m,autocomplete:g,onchange:function(t){var e=t.target.value;return l(e)}},t.map(k,function(t){var a=t.label,r=t.value;return e("option",{value:r},a)})))]};return a}();var T=function(){function r(){this.acceptTypes="*";this.multiple=true;this.dragging=false;this.fileList=a([])}r.prototype.oninit=function(t){var e=t.attrs.value;this.fileList=e};r.prototype.view=function(a){var r=this;var n=a.attrs.field;var i=n.label,o=n.id,l=n.name,s=l===void 0?o:l,c=n.required,u=n.readonly,f=n.disabled,p=n.autofocus,d=n.containerClass;return e("div",[e("label.flex.flex-column",t.extend({for:o,title:i,class:(f?"o-60":"pointer")+" "+d},f?{}:{ondragover:function(t){return r.dragStart(t)},ondragleave:function(t){return r.dragStop(t)},ondrop:function(t){r.dragStop(t);if(t.dataTransfer){r.addFiles(t.dataTransfer.files)}}}),[e("input.clip[type=file]",{id:o,name:s,multiple:this.multiple,accept:this.acceptTypes,required:c,readonly:u,disabled:f,autofocus:p,onchange:function(t){var e=t.target.files;r.addFiles(e)}}),e("span.mb1.f6.silver",i),this.viewUploadWidget(n)]),this.viewFileList()])};r.prototype.viewUploadWidget=function(t){return e(".pa2.ba.b--dashed.br2",{class:this.dragging?"b--blue blue":"b--light-silver dark-gray"},[e("i.fal.fa-file-upload.mr2"),e("span","Add file(s)...")])};r.prototype.viewFileList=function(){var a=this;return e(".flex.flex-column.mt1.nb1",t.map(this.fileList(),function(t){return e("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[e("i.fal.fa-file-download.mr2"),t.name,e("i.fal.fa-file-minus.child.fr",{title:"Remove "+t.name,onclick:function(){return a.removeFile(t.guid)}})])}))};r.prototype.addFiles=function(e){var a=this.fileList();t.each(e,function(t){a.push({guid:f(),name:t.name,path:"not_set",file:t})});this.fileList(a)};r.prototype.removeFile=function(t){var e=this.fileList();d(e,{guid:t});this.fileList(e)};r.prototype.dragStart=function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(this.dragging){t.redraw=false}this.dragging=true};r.prototype.dragStop=function(t){t.preventDefault();this.dragging=false};return r}();var W=this&&this.__extends||function(){var t=function(e,a){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)if(e.hasOwnProperty(a))t[a]=e[a]};return t(e,a)};return function(e,a){t(e,a);function r(){this.constructor=e}e.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var B=function(a){W(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;t.multiple=false;return t}r.prototype.viewUploadWidget=function(a){var r=t.head(this.fileList());return e(".pa2.ba.b--dashed.br2",{class:this.dragging?"b--blue blue":"b--light-silver dark-gray"},[e("i.fal.fa-file-upload.mr2"),e("span",r?r.name:"Upload...")])};r.prototype.viewFileList=function(){return null};r.prototype.addFiles=function(e){var a=t.head(e);if(!a){return}this.setFile({guid:this.getFileId(),name:a.name,path:"not_set",file:a})};r.prototype.getFileId=function(){var e=t.head(this.fileList());return e?e.guid:f()};r.prototype.setFile=function(t){this.fileList([t])};return r}(T);var H=this&&this.__extends||function(){var t=function(e,a){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)if(e.hasOwnProperty(a))t[a]=e[a]};return t(e,a)};return function(e,a){t(e,a);function r(){this.constructor=e}e.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var V=function(a){H(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;t.acceptTypes="image/*";return t}r.prototype.viewUploadWidget=function(t){var a=t.classes,r=a===void 0?"h3":a;return e(".w-100.pa1.ba.bw1.b--dashed.br3.dt.tc",{class:r+" "+(this.dragging?"b--blue blue":"b--light-silver dark-gray")},e("i.fal.fa-camera.fa-2x.dtc.v-mid"))};r.prototype.viewFileList=function(){var a=this;return e(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(this.fileList(),function(t){return e(O,{src:u(t.path,t.dataUrl),class:"dim",style:{"max-height":"6rem"}},e(".pa2.bg-white.ba.b--light-silver.br2.absolute.top-0.right-0.child.pointer",{title:"Remove "+t.name,onclick:function(){return a.removeFile(t.guid)}},e("i.fal.fa-file-minus.fa-lg")))}))};r.prototype.addFiles=function(a){var n=this;var i="image/jpeg";var o=this.fileList();Promise.all(t.map(a,function(t){return g(t,r.maxImageSize,i).then(function(e){var a=v(t.name)[0];var r=new File([h(e)],a+".jpg",{type:i});o.push({guid:f(),name:r.name,path:"not_set",file:r,dataUrl:e})})})).then(function(){n.fileList(o);e.redraw()})};r.maxImageSize=1280;return r}(T);var G=this&&this.__extends||function(){var t=function(e,a){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)if(e.hasOwnProperty(a))t[a]=e[a]};return t(e,a)};return function(e,a){t(e,a);function r(){this.constructor=e}e.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var J=function(a){G(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;t.multiple=false;t.acceptTypes="image/*";return t}r.prototype.viewUploadWidget=function(a){var r=a.classes,n=r===void 0?"h5":r;var i=t.head(this.fileList());return e(".w-100.pa1.contain.ba.bw1.b--dashed.br3.dt.tc",{class:n+" "+(this.dragging?"b--blue blue":"b--light-silver dark-gray")},i?e("img.img"+b.imgHeight,{src:u(i.path,i.dataUrl)}):e("i.fal.fa-camera.fa-2x.dtc.v-mid"))};r.prototype.addFiles=function(a){var n=this;var i=t.head(a);if(!i){return}var o="image/jpeg";g(i,r.maxImageSize,o).then(function(t){var a=v(i.name)[0];var r=new File([h(t)],a+".jpg",{type:o});n.setFile({guid:n.getFileId(),name:r.name,path:"not_set",file:r,dataUrl:t});e.redraw()})};r.maxImageSize=1280;return r}(B);var K=function(){function a(){this.signaturePad=null}a.prototype.oncreate=function(e){var a=this;var n=e.dom;var i=n.children[0];this.signaturePad=new r(i,{minWidth:.5*o,maxWidth:1.5*o});this.resizeCanvas=t.debounce(function(){i.width=i.offsetWidth*o;i.height=i.offsetHeight*o;var t=i.getContext("2d");if(t&&a.signaturePad){t.scale(o,o);a.signaturePad.clear()}},250);window.addEventListener("resize",this.resizeCanvas);window.addEventListener("orientationchange",this.resizeCanvas);this.resizeCanvas()};a.prototype.onremove=function(){window.removeEventListener("resize",this.resizeCanvas);window.removeEventListener("orientationchange",this.resizeCanvas)};a.prototype.view=function(t){var a=this;var r=t.attrs,n=r.onSet,i=r.onCancel;return[e(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30"+b.aspectRatio4x1,e("canvas.aspect-ratio--object")),e(".flex.flex-row.nl1.nr1.mb1",[e(w,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(a.signaturePad&&!a.signaturePad.isEmpty()){n(a.signaturePad.toDataURL("image/png"))}}}),e(w,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return a.resetCanvas()}}),e(w,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:i})])]};a.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};a.prototype.resizeCanvas=function(){t.noop()};return a}();var N=function(){function t(){this.text=a("")}t.prototype.oncreate=function(t){var e=t.dom;var a=e.children[0];a.focus({preventScroll:false})};t.prototype.view=function(t){var a=this;var r=t.attrs,n=r.onSet,i=r.onCancel;var l=60*o;var s=480*o;return[e(".aspect-ratio.ba.bw1.br3.b--dashed.b--black-30"+b.aspectRatio4x1,e("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{onkeypress:function(t){var e=t.keyCode;if(e===13&&a.text()){n(Q(a.text()));return false}return true},oninput:function(t){var e=t.target.value;return a.text(e)},value:this.text(),style:{"font-size":"calc("+l+"px + ("+l+" / "+s+" * (100vw - "+s+"px)))","font-family":"Caveat"}})),e(".flex.flex-row.nl1.nr1.mb1",[e(w,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(a.text()){n(Q(a.text()))}}}),e(w,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return a.text("")}}),e(w,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:i})])]};return t}();function Q(t){var e=document.createElement("canvas");var a=90*o;e.width=600*o;e.height=150*o;var r=e.getContext("2d");if(r){r.textBaseline="middle";r.font=a+"px Caveat";r.fillText(t,6*o,e.height*.52)}return e.toDataURL()}var X=this&&this.__extends||function(){var t=function(e,a){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)if(e.hasOwnProperty(a))t[a]=e[a]};return t(e,a)};return function(e,a){t(e,a);function r(){this.constructor=e}e.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}}();var Y=function(a){X(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;t.state=0;return t}r.prototype.view=function(a){var r=this;var n=a.attrs.field;var i=n.id,o=n.containerClass;var l=t.head(this.fileList());return e(".flex.flex-column",{class:o},[e(".mb1.flex.flex-row",[s(n),e("span.ph2.mh2.ml-auto.dark-gray",{class:this.state===1?b.brandingAlt.class:"dim pointer",onclick:function(){return r.state=1}},e("i.fal.fa-fw.fa-pen")),e("span.ph2.mh2.dark-gray",{class:this.state===2?b.brandingAlt.class:"dim pointer",onclick:function(){return r.state=2}},e("i.fal.fa-fw.fa-keyboard"))]),this.state===0?e(".aspect-ratio.dark-gray.ba.bw1.br3.b--dashed.b--black-30.pointer"+b.aspectRatio4x1,{onclick:function(){return r.state=1}},l?e("img.aspect-ratio--object",{src:u(l.path,l.dataUrl)}):e(".aspect-ratio--object.flex.items-center.justify-center",[e("i.fal.fa-pen-nib.fa-2x"),e("span.ml2","Sign")])):e(this.state===1?K:N,{onSet:function(t){return r.setDataUrl(t,i)},onCancel:function(){return r.state=0}})])};r.prototype.setDataUrl=function(t,a){var n=this;Z(t,r.maxImageSize).then(function(t){var r=new File([h(t)],"sign-"+a+".png",{type:"image/png"});n.setFile({guid:n.getFileId(),name:r.name,path:"not_set",file:r,dataUrl:t});n.state=0;e.redraw()})};r.maxImageSize=640;return r}(B);function Z(t,e){return new Promise(function(a){var r=new Image;r.onload=function(){var t=document.createElement("canvas");var n=m(r.width,r.height,e),i=n[0],o=n[1];t.width=i;t.height=o;var l=t.getContext("2d");if(l){l.drawImage(r,0,0,i,o)}a(t.toDataURL())};r.src=t})}export{R as BaseInput,_ as BaseText,w as Button,F as Checkbox,E as CheckboxInput,I as FileList,T as FileMulti,B as FileSelect,j as ImageList,V as ImageMulti,z as ImagePreview,J as ImageSelect,S as Label,C as Link,M as RadioInput,D as SelectInput,P as SelectText,Y as SignBuilder,A as TextareaInput,k as Trusted,h as dataURItoBlob,v as fileNameExtSplit,l as getDisplayLabel,s as getLabel,c as getLabelText,f as guid,U as iconMap,u as imgSrc,n as inputBorder,i as inputText,L as linkAttrs,p as pickByProperty,o as pxRatio,d as removeByProperty,g as resizeImage,m as scaleRect};
