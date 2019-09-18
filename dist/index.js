import e from"mithril/stream";import t from"lodash";import a from"mithril";import n from"signature_pad";var r={"padding-bottom":"25%"};var i={"max-height":"16rem"};var o={icon:e("fas"),lblCol:e("silver"),lblFnt:e("f6"),inpHgt:e("h2"),inpCol:e("dark-gray"),inpFnt:e("fw2"),inpBrd:e("bn"),btnBg:e("bg-light-blue"),btnCol:e("dark-gray"),btnFnt:e(""),btnBrd:e("bn br2")};var l=e.merge([o.lblCol,o.lblFnt]).map(function(e){return e.join(" ")});var s=e.merge([o.inpCol,o.inpFnt]).map(function(e){return e.join(" ")});var c=e.merge([o.inpBrd,s]).map(function(e){return e.join(" ")});var u=e.merge([o.inpHgt,c]).map(function(e){return e.join(" ")});var f=e.merge([o.btnBg,o.btnCol,o.btnFnt,o.btnBrd]).map(function(e){return e.join(" ")});function d(e){t.forEach(e,function(e,t){if(t in o){o[t](e||"")}})}function v(e){return t(e).map(function(e){return o[e]()}).value().join(" ")}function p(e){return o.icon()+" "+e}function m(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,a=e=="x"?t:t&3|8;return a.toString(16)})}function h(e,t){return t?e+"*":e}function b(e,t){return t?t:e}function g(e,t){var n=e.label;return a("span.mr2.silver.truncate",{title:n,class:t},n)}function w(e){var t=e.id,n=e.label,r=e.required;return a("label.mb1",{title:n,for:t,class:l()},h(n,r))}function y(e){return function(t){var a=t.target.value;return e(a)}}function x(e){return function(t){var a=t.target.checked;return e(a)}}function k(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function C(e){var t=e.split(",");var a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var n=t[0].split(":")[1].split(";")[0];var r=a.length;var i=new Uint8Array(r);for(var o=0;o<r;o++){i[o]=a.charCodeAt(o)}return new Blob([i],{type:n})}function U(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function P(e){var t=Math.min(e.byteLength,64*1024);var a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}var n=a.byteLength;var r=2;while(r<n){var i=a.getUint16(r,false);r+=2;if(i===65505){if(a.getUint32(r+=2,false)!==1165519206){return-1}var o=a.getUint16(r+=6,false)===18761;r+=a.getUint32(r+4,o);var l=a.getUint16(r,o);r+=2;for(var s=0;s<l;s++){if(a.getUint16(r+s*12,o)===274){return a.getUint16(r+s*12+8,o)}}}else if((i&65280)!==65280){break}else{r+=a.getUint16(r,false)}}return-1}function j(e){return new Promise(function(t){var a=new FileReader;a.onload=function(){t(P(a.result))};a.readAsArrayBuffer(e)})}function z(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function S(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File most be an image"))}return j(e).then(function(n){return new Promise(function(r){var i=new FileReader;var o=new Image;o.onload=function(){var e=document.createElement("canvas");var i=U(o.width,o.height,t),l=i[0],s=i[1];if(n>4){e.width=s;e.height=l}else{e.width=l;e.height=s}var c=e.getContext("2d");if(c){z(c,l,s,n);c.drawImage(o,0,0,l,s)}r(e.toDataURL(a))};i.onload=function(){o.src=i.result};i.readAsDataURL(e)})})}var q=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.label,r=t.type,i=r===void 0?"button":r,o=t.icon,l=t.classes,s=t.disabled,c=t.style,u=t.onclick;return a("button.button-reset.pa2",{type:i,class:(s?"o-60":"dim pointer")+" "+f()+" "+l,disabled:s,style:c,onclick:u},o?a("i.fa-fw.mr2",{class:p(o)}):null,n)};return e}();var I=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=n.classes,i=n.style,o=t.value;return a(".pa2",{class:r,style:i},a.trust(o()))};return e}();var F=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.classes,o=n.style;return a(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[g(n),a("span.ws-normal",{title:r()},r())])};return e}();function R(e,t){if(e==="email"){return{href:"mailto:"+t}}else if(e==="tel"){return{href:"tel:"+t}}else{return{href:t,target:"_blank"}}}var E={email:"fa-envelope",tel:"fa-phone"};var H=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.classes,o=n.style;return a(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[g(n),a("a.link.dark-gray.dim.pointer.ws-normal",R(n.type,r()),a("i.mr2",{class:p(E[n.type]||"fa-link")}),r())])};return e}();var L=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.classes,o=n.style;return a(".pa2.flex.flex-wrap.bb.b--black-20",{class:i,style:o},[g(n),a("i.self-end",{class:p(r()?"fa-check":"fa-times")})])};return e}();var M=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,r=n.field,i=n.value;var o=r.classes,l=r.style;var s=t.find(r.options,{value:i()});var c=s?s.label:i();return a(".pa2.flex.flex-wrap.bb.b--black-20",{class:o,style:l},[g(r),a("span.ws-normal",{title:c},c)])};return e}();var B=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,r=n.field,i=n.value;var o=r.classes,l=r.style;return a(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:l},[g(r,"mb1"),a(".flex.flex-column.mt1.nb1",t.map(i(),function(e){var t=e.name,n=e.path;return a("a.pa2.mv1.link.ba.b--black-20.dark-gray.dim.pointer[target=_blank]",{href:n},[a("i.mr2",{class:p("fa-file-download")}),t])}))])};return e}();var D=function(){function e(){}e.prototype.view=function(e){var t=e.children,n=e.attrs;return a(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[a("img.contain",n),t])};return e}();var T=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,r=n.field,i=n.value;var o=r.classes,l=r.style;return a(".pa2.flex.flex-column.bb.b--black-20",{class:o,style:l},[g(r,"mb2"),a(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(i(),function(e){var t=e.name,n=e.path,r=e.dataUrl;return a(D,{title:t,src:b(n,r),style:{"max-height":"6rem"}})}))])};return e}();var A=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,r=n.field,o=n.value;var l=r.classes,s=r.style;var c=t.head(o());return a(".pa2.flex.flex-column.bb.b--black-20",{class:l,style:s},[g(r,"mb1"),c?a("img.img.contain.self-center",{title:c.name,src:b(c.path,c.dataUrl),style:i}):a("i",{class:p("fa-image")})])};return e}();var _=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,n=t.label,r=t.required;return a("label.mb2",h(n,r))};return e}();var W=function(){function e(){}e.prototype.view=function(e){var t;var n=e.attrs,r=n.field,i=n.value;var o=r.id,l=r.type,s=r.name,c=s===void 0?o:s,f=r.placeholder,d=r.required,v=r.readonly,p=r.disabled,m=r.autofocus,h=r.autocomplete,b=r.spellcheck,g=r.instant,x=r.containerClass,k=r.classes,C=k===void 0?"":k;return[w(r),a(".w-100",{class:x},a("input.input-reset.border-box.w-100",(t={id:o,name:c,type:l,value:i(),class:(p?"o-60 ":"")+" "+u()+" "+C,placeholder:f,required:d,readonly:v,disabled:p,autofocus:m,autocomplete:h,spellcheck:b},t[g?"oninput":"onchange"]=y(i),t)))]};return e}();var O=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,n=t.field,r=t.value;var i=n.label,o=n.id,l=n.name,c=l===void 0?o:l,u=n.required,f=n.readonly,d=n.disabled,v=n.autocomplete,p=n.containerClass,m=n.classes,b=m===void 0?"":m;return a("div",{class:p},a(".flex.flex-wrap",{class:s()},a("label.flex.items-center.dark-gray",{class:(d?"o-60":f?"":"pointer")+" "+b},a("input.mr1[type=checkbox]",{id:o,name:c,checked:r(),required:u,autocomplete:v,disabled:d||f,onchange:x(r)}),h(i,u))))};return e}();var V=function(){function t(){this.showPassword=e(false)}t.prototype.view=function(e){var t;var n=e.attrs,r=n.field,i=n.value;var o=r.id,s=r.name,c=s===void 0?o:s,f=r.placeholder,d=r.required,v=r.readonly,p=r.disabled,m=r.autofocus,h=r.autocomplete,b=r.instant,g=r.containerClass,x=r.classes,k=x===void 0?"":x;return[a(".flex.justify-between",[w(r),a(O,{field:{id:"showpass",label:"Show Password",type:"checkbox",containerClass:"mb1 "+l()},value:this.showPassword})]),a(".w-100",{class:g},a("input.input-reset.border-box.w-100",(t={id:o,name:c,type:this.showPassword()?"text":"password",value:i(),class:(p?"o-60":"")+" "+u()+" "+k,placeholder:f,required:d,readonly:v,disabled:p,autofocus:m,autocomplete:h,autocorrect:"off"},t[b?"oninput":"onchange"]=y(i),t)))]};return t}();var G=function(){function e(){}e.prototype.view=function(e){var t;var n=e.attrs,r=n.field,i=n.value;var o=r.id,l=r.name,s=l===void 0?o:l,u=r.placeholder,f=r.required,d=r.readonly,v=r.disabled,p=r.autofocus,m=r.autocomplete,h=r.spellcheck,b=r.instant,g=r.containerClass,x=r.classes,k=x===void 0?"":x;return[w(r),a("div",{class:g},a("textarea.border-box.w-100[rows=3]",(t={id:o,name:s,value:i(),class:(v?"o-60":"")+" "+c()+" "+k,placeholder:u,required:f,readonly:d,disabled:v,autofocus:p,autocomplete:m,spellcheck:h,style:{resize:"vertical"}},t[b?"oninput":"onchange"]=y(i),t)))]};return e}();var J=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,r=n.field,i=n.value;var o=r,l=o.id,c=o.name,u=c===void 0?l:c,f=o.required,d=o.readonly,v=o.disabled,p=o.autocomplete,m=o.containerClass,h=o.classes,b=h===void 0?"":h,g=o.options;return[w(r),a("div",{class:m},a(".flex.flex-wrap",{class:s(),onchange:y(i)},t.map(g,function(e){var t=e.label,n=e.value;return a("label.flex.items-center",{class:(v?"o-60":d?"":"pointer")+" "+b},a("input.mr1[type=radio]",{name:u,value:n,checked:i()===n,required:f,autocomplete:p,disabled:v||d}),t)})))]};return e}();var K=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,r=n.field,i=n.value;var o=r,l=o.id,s=o.name,c=s===void 0?l:s,f=o.required,d=o.readonly,v=o.disabled,p=o.autofocus,m=o.autocomplete,h=o.containerClass,b=o.classes,g=b===void 0?"":b,x=o.options;return[w(r),a("div",{class:h},a("select.input-reset.border-box.w-100",{id:l,name:c,value:i(),class:(v?"o-60":d?"":"pointer")+" "+u()+" "+g,required:f,readonly:d,disabled:v,autofocus:p,autocomplete:m,onchange:y(i)},t.map(x,function(e){var t=e.label,n=e.value;return a("option",{value:n,disabled:v||d},t)})))]};return e}();function N(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function Q(e){return function(t){t.preventDefault();e(false)}}function X(e,t){return function(a){a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function Y(e){return function(t){var a=t.target.files;return e(a)}}var Z=function(){function e(){}e.prototype.view=function(e){var n=e.attrs,r=n.field,i=r.label,o=r.id,s=r.name,c=s===void 0?o:s,u=r.required,f=r.readonly,d=r.disabled,v=r.autofocus,p=r.containerClass,m=p===void 0?"":p,h=n.accept,b=h===void 0?"*":h,g=n.multiple,w=g===void 0?true:g,y=n.dragging,x=n.onSet,k=e.children;return a("label",t.extend({for:o,title:i,class:(d?"o-60":f?"":"pointer")+" "+m},d||f?{}:{ondragover:N(y),ondragleave:Q(y),ondrop:X(y,x)}),[a("input.clip[type=file]",{id:o,name:c,multiple:w,accept:b,required:u,autofocus:v,disabled:d||f,onchange:Y(x)}),a("span.db.mb1",{title:i,class:l()},i),k])};return e}();function $(e){return function(a){var n=e();t.each(a,function(e){n.push({guid:m(),name:e.name,path:"not_set",file:e})});e(n)}}function ee(e,a){return function(){var n=e();t.remove(n,{guid:a});e(n)}}var te=function(){function n(){this.dragging=e(false)}n.prototype.view=function(e){var n=e.attrs,r=n.field,i=n.value;return[a(Z,{field:r,dragging:this.dragging,onSet:$(i)},a(".pa2.ba.b--dashed.br2",{class:this.dragging()?"b--blue blue":"b--light-silver dark-gray"},[a("i.mr2",{class:p("fa-file-upload")}),a("span","Add file(s)...")])),a(".flex.flex-column.mt1.nb1",t.map(i(),function(e){return a("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[a("i.mr2",{class:p("fa-file-download")}),e.name,a("i.child.fr",{title:"Remove "+e.name,class:p("fa-trash-alt"),onclick:ee(i,e.guid)})])}))]};return n}();function ae(e){return function(a){var n=t.head(a);if(!n){return}e([{guid:m(),name:n.name,path:"not_set",file:n}])}}var ne=function(){function n(){this.dragging=e(false)}n.prototype.view=function(e){var n=e.attrs,r=n.field,i=n.value;var o=t.head(i());return a(Z,{field:r,multiple:false,dragging:this.dragging,onSet:ae(i)},a(".pa2.ba.b--dashed.br2",{class:this.dragging()?"b--blue blue":"b--light-silver dark-gray"},[a("i.mr2",{class:p("fa-file-upload")}),a("span",o?o.name:"Upload...")]))};return n}();function re(e,n){return function(r){var i="image/jpeg";var o=e();return Promise.all(t.map(r,function(e){return S(e,n,i).then(function(t){var a=k(e.name)[0];var n=new File([C(t)],a+".jpg",{type:i});o.push({guid:m(),name:n.name,path:"not_set",file:n,dataUrl:t})})})).then(function(){e(o);a.redraw()})}}var ie=function(){function n(){this.dragging=e(false)}n.prototype.view=function(e){var r=e.attrs,i=r.field,o=r.value;var l=i.classes,s=l===void 0?"":l;return[a(Z,{field:i,accept:"image/*",dragging:this.dragging,onSet:re(o,n.maxImageSize)},a(".w-100.pa1.ba.bw1.b--dashed.br3.dt.tc",{class:s+" "+(this.dragging()?"b--blue blue":"b--light-silver dark-gray")},a("i.fa-2x.dtc.v-mid",{class:p("fa-camera")}))),a(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(o(),function(e){return a(D,{src:b(e.path,e.dataUrl),style:{"max-height":"6rem"}},a(".pa2.bg-white.ba.b--light-silver.br2.absolute.top-0.right-0.child.pointer",{title:"Remove "+e.name,onclick:ee(o,e.guid)},a("i.fa-lg",{class:p("fa-trash-alt")})))}))]};n.maxImageSize=1280;return n}();function oe(e,n){return function(r){var i=t.head(r);if(!i){return Promise.resolve()}var o="image/jpeg";return S(i,n,o).then(function(t){var n=k(i.name)[0];var r=new File([C(t)],n+".jpg",{type:o});e([{guid:m(),name:r.name,path:"not_set",file:r,dataUrl:t}]);a.redraw()})}}var le=function(){function n(){this.dragging=e(false)}n.prototype.view=function(e){var r=e.attrs,o=r.field,l=r.value;var s=t.head(l());var c=o.classes,u=c===void 0?"":c;return a(Z,{field:o,accept:"image/*",multiple:false,dragging:this.dragging,onSet:oe(l,n.maxImageSize)},a(".w-100.pa1.contain.ba.bw1.b--dashed.br3.dt.tc",{class:u+" "+(this.dragging()?"b--blue blue":"b--light-silver dark-gray")},s?a("img.img.contain",{title:s.name,src:b(s.path,s.dataUrl),style:i}):a("i.fa-2x.dtc.v-mid",{class:p("fa-camera")})))};n.maxImageSize=1280;return n}();function se(){return Math.max(window.devicePixelRatio,1)}var ce=function(){function e(){this.signaturePad=null}e.prototype.oncreate=function(e){var a=this;var r=e.dom;var i=r.children[0];var o=se();this.signaturePad=new n(i,{minWidth:.5*o,maxWidth:1.5*o});var l=function(){var e=se();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var t=i.getContext("2d");if(t){t.scale(e,e)}a.resetCanvas()};this.resizeHandler=t.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};e.prototype.onremove=function(){if(this.resizeHandler){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}};e.prototype.view=function(e){var t=this;var n=e.attrs,i=n.onSet,o=n.onCancel;return[a(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:r},a("canvas.aspect-ratio--object")),a(".pa2.bg-white.br2.absolute.right-0.z-999",[a(q,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:function(){if(t.signaturePad&&!t.signaturePad.isEmpty()){i(t.signaturePad.toDataURL("image/png"))}}}),a(q,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return t.resetCanvas()}}),a(q,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:o})])]};e.prototype.resetCanvas=function(){if(this.signaturePad){this.signaturePad.clear()}};return e}();function ue(e,t){return function(){if(e()){var a=document.createElement("canvas");a.width=600;a.height=150;var n=.56*a.height;var r=a.getContext("2d");if(r){r.textBaseline="middle";r.font=n+"px Caveat";r.fillText(e(),8,a.height*.52)}t(a.toDataURL())}return false}}var fe=function(){function t(){this.text=e("")}t.prototype.oncreate=function(e){var t=e.dom;var a=t.children[0];a.focus({preventScroll:false});this.scaleText(a,t)};t.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t.children[0],t)};t.prototype.view=function(e){var t=this;var n=e.attrs,i=n.onSet,o=n.onCancel;return[a("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:r,onsubmit:ue(this.text,i)},a("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:y(this.text),value:this.text(),style:{"font-family":"Caveat"}})),a(".pa2.bg-white.br2.absolute.right-0.z-999",[a(q,{label:"Apply",icon:"fa-check",classes:"ma1",onclick:ue(this.text,i)}),a(q,{label:"Reset",icon:"fa-eraser",classes:"ma1",onclick:function(){return t.text("")}}),a(q,{label:"Cancel",icon:"fa-times",classes:"ma1",onclick:o})])]};t.prototype.scaleText=function(e,t){var a=t.offsetHeight;e.style.fontSize=.56*a+"px"};return t}();function de(e,t){return new Promise(function(a){var n=new Image;n.onload=function(){var e=document.createElement("canvas");var r=U(n.width,n.height,t),i=r[0],o=r[1];e.width=i;e.height=o;var l=e.getContext("2d");if(l){l.drawImage(n,0,0,i,o)}a(e.toDataURL())};n.src=e})}function ve(e,t,n,r){return function(i){return de(i,r).then(function(r){var i=new File([C(r)],"sign-"+n+".png",{type:"image/png"});e([{guid:m(),name:i.name,path:"not_set",file:i,dataUrl:r}]);t(1);a.redraw()})}}var pe=function(){function n(){this.state=e(1)}n.prototype.oninit=function(e){var t=e.attrs.field,a=t.readonly,n=t.disabled;if(a||n){this.state(0)}};n.prototype.view=function(e){var i=this;var o=e.attrs,l=o.field,s=o.value;var c=l.id,u=l.containerClass;var f=t.head(s());return a(".relative",{class:u},[w(l),this.state()===1?a(".aspect-ratio.dark-gray.bg-white.ba.bw1.br3.b--dashed.b--black-30.pointer",{id:c,style:r},f?a(".aspect-ratio--object.hide-child.dim",{onclick:function(){return s([])}},[a("img.img.w-100",{src:b(f.path,f.dataUrl)}),a(".pa3.absolute.top-0.right-0.child",a("i.fa-2x",{class:p("fa-eraser")}))]):a(".aspect-ratio--object.flex.items-stretch.justify-center",[a(".flex-auto.flex.items-center.justify-center.tc.dim",{onclick:function(){return i.state(2)}},a("i.fa-2x",{class:p("fa-pen-nib")}),a("span.ml2","Sign")),a(".flex-auto.flex.items-center.justify-center.tc.dim",{onclick:function(){return i.state(3)}},a("i.fa-2x",{class:p("fa-keyboard")}),a("span.ml2","Type"))])):this.state()===0?a(".aspect-ratio.dark-gray.bg-white.br3",{id:c,style:r},f?a(".aspect-ratio--object.hide-child",a("img.img.w-100",{src:b(f.path,f.dataUrl)})):null):a(this.state()===2?ce:fe,{onSet:ve(s,this.state,c,n.maxImageSize),onCancel:function(){return i.state(1)}})])};n.maxImageSize=640;return n}();export{W as BaseInput,F as BaseText,q as Button,L as Checkbox,O as CheckboxInput,B as FileList,te as FileMulti,ne as FileSelect,T as ImageList,ie as ImageMulti,A as ImagePreview,le as ImageSelect,_ as Label,H as Link,V as PasswordInput,J as RadioInput,K as SelectInput,M as SelectText,pe as SignBuilder,G as TextareaInput,I as Trusted,k as fileNameExtSplit,p as getIcon,v as getTheme,E as iconMap,R as linkAttrs,d as updateTheme};
