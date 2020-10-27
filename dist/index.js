import t from"lodash";import e from"mithril/stream";import n from"mithril";import a from"signature_pad";var r={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",toggleOnIcn:"fa fa-toggle-on",toggleOffIcn:"fa fa-toggle-off",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link"};var i=r;function l(e){t.assign(r,e)}function o(){return{"max-height":i.imageDispHeight}}function s(){return{"max-height":i.thumbDispHeight}}var c={"max-width":"5.4ex"};var u={"max-width":"9ex"};var d={icon:e("fas"),lblCol:e("silver"),lblFnt:e("f6"),dspFnt:e("truncate"),dspBrd:e("bb b--black-20"),inpHgt:e("h2"),inpCol:e("dark-gray"),inpFnt:e("fw2"),inpBrd:e("bn"),actCol:e("dark-gray"),actBg:e("bg-light-blue"),filBrd:e("ba bw1 br3 b--dashed"),filBrdCol:e("b--black-30"),drgCol:e("blue"),drgBrdCol:e("b--blue"),btnBg:e("bg-light-blue"),btnCol:e("dark-gray"),btnFnt:e(""),btnPad:e("pa2"),btnBrd:e("bn br2")};function f(t){return t.join(" ")}function p(n,a){if(a===void 0){a=[]}return e.merge(t.concat(t.map(n,(function(t){return d[t]})),a)).map(f)}var v=p(["lblCol","dspFnt"]);var m=p(["lblCol","lblFnt"]);var h=p(["inpCol","inpFnt"]);var g=p(["inpBrd"],[h]);var b=p(["inpHgt"],[g]);var y=p(["actCol","actBg"]);var w=p(["filBrd","filBrdCol"],[h]);var x=p(["inpFnt","filBrd","drgCol","drgBrdCol"]);var I=p(["btnBg","btnCol","btnFnt","btnPad","btnBrd"]);var k=p(["btnCol","btnFnt"]);function C(e){t.forEach(e,(function(t,e){if(t&&e in d){d[e](t)}}))}function T(t){return d.icon()+" "+t}var S={};function P(e){t.assign(S,e)}function B(t){if(t&&t in S){return S[t]}else{return I()}}function U(t){return(t+256).toString(16).substr(1)}function q(){var t=new Uint8Array(16);var e=window.crypto||window.msCrypto;e.getRandomValues(t);return[U(t[0]),U(t[1]),U(t[2]),U(t[3]),"-",U(t[4]),U(t[5]),"-",U(t[6]),U(t[7]),"-",U(t[8]),U(t[9]),"-",U(t[10]),U(t[11]),U(t[12]),U(t[13]),U(t[14]),U(t[15])].join("")}function D(){return Math.max(window.devicePixelRatio,1)}function F(t,e){return e?t+"*":t}function M(t,e){return e?e:t}function z(t){return t?n("span.mr2.truncate",{title:t,class:v()},t):null}function H(t,e,a){return e?n("label.mb1.db",{title:e,for:t,class:m()},F(e,a)):null}function A(t,e,a){return[t?n("i.fa-fw",{class:(e?"mr2":"")+" "+T(t)}):null,e,a?n("i.fa-fw",{class:(e?"ml2":"")+" "+T(a)}):null]}function O(t,e){return t?"o-60":e?"":"pointer"}function E(t){return function(e){var n=e.target.value;return t(n)}}function R(t){return function(e){var n=e.target.checked;return t(n)}}function j(t){var e=t.lastIndexOf(".");if(e===-1){return[t,""]}else{return[t.substr(0,e),t.substr(e)]}}function L(t){var e=t.split(",");var n=e[0].indexOf("base64")>=0?atob(e[1]):unescape(e[1]);var a=e[0].split(":")[1].split(";")[0];var r=n.length;var i=new Uint8Array(r);for(var l=0;l<r;l++){i[l]=n.charCodeAt(l)}return new Blob([i],{type:a})}function Y(t,e){var n=(new Date).valueOf();var a=t;a.name=e;a.lastModified=n;return t}function _(t,e,n){if(t>e){if(t>n){return[n,Math.round(e*n/t)]}}else if(e>n){return[Math.round(t*n/e),n]}return[t,e]}function N(t){var e=Math.min(t.byteLength,64*1024);var n=new DataView(t,0,e);if(n.getUint16(0,false)!==65496){return-2}var a=n.byteLength;var r=2;while(r<a){var i=n.getUint16(r,false);r+=2;if(i===65505){if(n.getUint32(r+=2,false)!==1165519206){return-1}var l=n.getUint16(r+=6,false)===18761;r+=n.getUint32(r+4,l);var o=n.getUint16(r,l);r+=2;for(var s=0;s<o;s++){if(n.getUint16(r+s*12,l)===274){return n.getUint16(r+s*12+8,l)}}}else if((i&65280)!==65280){break}else{r+=n.getUint16(r,false)}}return-1}function W(t){return new Promise((function(e){var n=new FileReader;n.onload=function(){e(N(n.result))};n.readAsArrayBuffer(t)}))}function V(t,e,n,a){if(!a||a>8){return}switch(a){case 2:t.translate(e,0);t.scale(-1,1);return;case 3:t.translate(e,n);t.rotate(Math.PI);return;case 4:t.translate(0,n);t.scale(1,-1);return;case 5:t.rotate(.5*Math.PI);t.scale(1,-1);return;case 6:t.rotate(.5*Math.PI);t.translate(0,-n);return;case 7:t.rotate(.5*Math.PI);t.translate(e,-n);t.scale(-1,1);return;case 8:t.rotate(-.5*Math.PI);t.translate(-e,0);return}}function G(t,e,n){if(!t.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return W(t).then((function(a){return new Promise((function(r){var i=new Image;i.onload=function(){var t=document.createElement("canvas");var l=_(i.width,i.height,e),o=l[0],s=l[1];if(a>4){t.width=s;t.height=o}else{t.width=o;t.height=s}var c=t.getContext("2d");V(c,o,s,a);c.drawImage(i,0,0,o,s);r(t.toDataURL(n))};var l=new FileReader;l.onload=function(){return i.src=l.result};l.readAsDataURL(t)}))}))}function $(t,e,n,a){var r=document.createElement("canvas");r.width=e;r.height=n;var i=.56*r.height;var l=r.getContext("2d");l.textBaseline="middle";l.font=i+"px "+a;l.fillText(t,r.height*.05,i);return r.toDataURL()}var J=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.classes,i=r===void 0?"bg-red":r,l=t.children;return n(".relative.dib",[l,a?n("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:i,style:{"min-width":"0.65rem"}},a):null])};return t}();var K=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.type,i=r===void 0?"button":r,l=e.title,o=l===void 0?a:l,s=e.icon,c=e.rightIcon,u=e.context,d=e.classes,f=d===void 0?"":d,p=e.disabled,v=e.style,m=e.onclick;return n("button.button-reset",{type:i,title:o,disabled:p,class:O(p)+" "+B(u)+" "+f,style:v,onclick:m},A(s,a,c))};return t}();var Q=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.title,i=r===void 0?a:r,l=e.icon,o=e.rightIcon,s=e.href,c=e.rel,u=e.target,d=e.download,f=e.context,p=e.classes,v=p===void 0?"":p,m=e.style;return n("a.link",{href:s,rel:c,target:u,download:d,title:i,class:B(f)+" "+v,style:m},A(l,a,o))};return t}();var X=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.title,i=r===void 0?a:r,l=e.icon,o=e.rightIcon,s=e.classes,c=s===void 0?"":s,u=e.disabled,d=e.style,f=e.onclick;return n(".mh2.pa2.truncate",{title:i,disabled:u,class:O(u)+" "+k()+" "+c,style:d,onclick:f},A(l,a,o))};return t}();var Z=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.label,r=e.title,i=r===void 0?a:r,l=e.icon,o=e.rightIcon,s=e.href,c=e.rel,u=e.target,d=e.download,f=e.classes,p=f===void 0?"":f,v=e.style;return n("a.link.mh2.pa2.truncate",{href:s,rel:c,target:u,download:d,title:i,class:k()+" "+p,style:v},A(l,a,o))};return t}();var tt=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=a.classes,i=a.style,l=e.value;return n(".pa2",{class:r,style:i},n.trust(l()))};return t}();var et=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var i=a.label,l=a.classes,o=l===void 0?"":l,s=a.style;return n(".pa2.flex.flex-wrap",{class:d.dspBrd()+" "+o,style:s},[z(i),n("span.ws-normal",{title:r(),class:h()},r())])};return t}();function nt(t,e){if(t==="email"){return{href:"mailto:"+e,class:h()}}else if(t==="tel"){return{href:"tel:"+e,class:h()}}else{return{href:e,target:"_blank",class:h()}}}var at={email:i.emailIcn,tel:i.telIcn};var rt=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var l=a.label,o=a.type,s=o===void 0?"url":o,c=a.classes,u=c===void 0?"":c,f=a.style;return n(".pa2.flex.flex-wrap",{class:d.dspBrd()+" "+u,style:f},[z(l),n("a.link.dim.pointer.ws-normal",nt(s,r()),n("i.mr2",{class:T(at[s]||i.linkIcn)}),r())])};return t}();var it=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var l=a.label,o=a.classes,s=o===void 0?"":o,c=a.style;return n(".pa2.flex.items-center",{class:d.dspBrd()+" "+s,style:c},[z(l),n("i",{class:d.inpCol()+" "+T(r()?i.checkIcn:i.uncheckIcn)})])};return t}();var lt=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var l=a.label,o=a.classes,s=o===void 0?"":o,c=a.style;return n(".pa2.flex.items-center",{class:d.dspBrd()+" "+s,style:c},[z(l),n("i",{class:d.inpCol()+" "+T(r()?i.toggleOnIcn:i.toggleOffIcn)})])};return t}();var ot=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r.label,o=r.classes,s=o===void 0?"":o,c=r.style;var u=t.find(r.options,{value:i()});var f=u?u.label||u.value:i();return n(".pa2.flex.flex-wrap",{class:d.dspBrd()+" "+s,style:c},[z(l),n("span.ws-normal",{title:f,class:h()},f)])};return e}();var st=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var o=r.label,s=r.classes,c=s===void 0?"":s,u=r.style;return n(".pa2.flex.flex-column",{class:d.dspBrd()+" "+c,style:u},[z(o),n(".flex.flex-column.mt1.nb1",t.map(l(),(function(t){var e=t.name,a=t.path;return n(".ba.b--black-20",{class:h()},[n("a.pa2.mv1.link.b--black-20.dim.dib.pointer[target=_blank]",n("i.mr2",{href:a,class:T(i.downloadIcn)}),e)])})))])};return e}();var ct=function(){function t(){}t.prototype.view=function(t){var e=t.children,a=t.attrs;return n(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n("img.contain",a),e])};return t}();var ut=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r.label,o=r.classes,c=o===void 0?"":o,u=r.style;return n(".pa2.flex.flex-column",{class:d.dspBrd()+" "+c,style:u},[z(l),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(i(),(function(t){var e=t.name,a=t.path,r=t.dataUrl;return n(ct,{title:e,src:M(a,r),style:s()})})))])};return e}();var dt=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var s=r.label,c=r.classes,u=c===void 0?"":c,f=r.style;var p=t.head(l());return n(".pa2.flex.flex-column",{class:d.dspBrd()+" "+u,style:f},[z(s),p?n("img.img.h-100.mt2.contain.self-center",{title:p.name,src:M(p.path,p.dataUrl),style:o()}):n("i.mt2",{class:d.inpCol()+" "+T(i.imageIcn)})])};return e}();var ft=function(){function t(){}t.prototype.view=function(t){var e=t.attrs.field,a=e.label,r=a===void 0?"":a,i=e.title,l=i===void 0?r:i,o=e.required;return n("label.mb2",{title:l},F(r,o))};return t}();var pt=function(){function t(){}t.prototype.view=function(t){var e;var a=t.attrs,r=a.field,i=a.value,l=a.xform,o=l===void 0?i:l;var s=r.label,c=r.id,u=r.type,d=u===void 0?"text":u,f=r.name,p=f===void 0?c:f,v=r.title,m=v===void 0?s:v,h=r.placeholder,g=r.max,y=r.maxlength,w=r.min,x=r.minlength,I=r.step,k=r.required,C=r.readonly,T=r.disabled,S=r.autofocus,P=r.autocomplete,B=r.pattern,U=r.inputmode,q=r.spellcheck,D=r.instant,F=r.containerClass,M=r.classes,z=M===void 0?"":M;return[H(c,s,k),n(".w-100",{class:F},n("input.input-reset.border-box.w-100",(e={id:c,type:d,name:p,title:m,placeholder:h,max:g,maxlength:y,min:w,minlength:x,step:I,required:k,readonly:C,disabled:T,autofocus:S,autocomplete:P,pattern:B,inputmode:U,spellcheck:q,value:o(),class:O(T,true)+" "+b()+" "+z},e[D?"oninput":"onchange"]=E(i),e)))]};return t}();var vt=function(){function e(){}e.prototype.view=function(e){var a;var r=e.attrs,i=r.field,l=r.value,o=r.xform,s=o===void 0?l:o;var c=i,u=c.label,d=c.id,f=c.name,p=f===void 0?d:f,v=c.title,m=v===void 0?u:v,g=c.placeholder,y=c.max,w=c.maxlength,x=c.min,I=c.minlength,k=c.step,C=c.required,T=c.readonly,S=c.disabled,P=c.autofocus,B=c.autocomplete,U=c.pattern,q=c.inputmode,D=c.spellcheck,F=c.instant,M=c.containerClass,z=c.classes,A=z===void 0?"":z,E=c.options;var R=E&&E.length?E[0].value:"$";return[H(d,u,C),n(".w-100",{class:M},n(".w-100.flex.items-center",{class:b(),style:{"flex-shrink":0}},[n("span.mr1",R),n("input.input-reset.border-box.flex-auto.bg-transparent.bn",(a={id:d,type:"text",name:p,title:m,placeholder:g,max:y,maxlength:w,min:x,minlength:I,step:k,required:C,readonly:T,disabled:S,autofocus:P,autocomplete:B,pattern:U,inputmode:q,spellcheck:D,value:t.isUndefined(s())?null:gt(mt(s())),class:O(S,true)+" "+h()+" "+A},a[F?"oninput":"onchange"]=yt(l),a))]))]};return e}();function mt(e){return t.isString(e)?t.parseInt(e):Number(e)}function ht(e){var n=e.replace(/[^\d.]/g,"");var a;var r=0;if(n.indexOf(".")>-1){var i=n.indexOf(".");var l=n.substring(0,i);a=t.parseInt(t.padStart(l,1,"0"));var o=n.substring(i+1,Math.min(i+3,n.length));r=t.parseInt(t.padEnd(o,2,"0"))}else{a=t.parseInt(n)||0}return a*100+r}function gt(t){var e=bt(t);if(e){return e[0]+"."+e[1]}else{return e}}function bt(e){if(!t.isFinite(e)){return undefined}var n=String(Math.abs(e));var a="0";var r="";if(n.length>2){var i=n.length-2;a=n.substring(0,i);r=n.substring(i)}else{r=t.padStart(n,2,"0")}return[a,r]}function yt(t){return function(e){var n=e.target.value;return t(ht(n))}}var wt=function(){function t(){this.month=e();this.year=e();this.date=e.lift((function(t,e){return t+"/"+e}),this.month,this.year)}t.prototype.oninit=function(t){var e=this;var n=t.attrs.value;n.map((function(t){var n=String(t).split("/"),a=n[0],r=n[1],i=r===void 0?"":r;e.month(a);e.year(i)}));this.date.map((function(t){if(t!==n()){n(t)}}))};t.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};t.prototype.view=function(t){var e=t.attrs.field;var a=e.label,r=e.id,i=e.name,l=i===void 0?r:i,o=e.title,s=o===void 0?a:o,u=e.required,d=e.readonly,f=e.disabled,p=e.containerClass,v=e.classes,m=v===void 0?"":v;var g=O(f,true)+" "+b()+" "+m;return[H(r,a,u),n(".w-100",{id:r,title:s,class:p},[n(".dib.mr2",[H(r+"-mm","Month"),n("input.input-reset.border-box",{id:r+"-mm",name:l+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:d,disabled:f,value:this.month(),class:g,style:c,onchange:E(this.month)})]),n("span.mr2",{class:h()},"/"),n(".dib.mr2",[H(r+"-yy","Year"),n("input.input-reset.border-box",{id:r+"-yy",name:l+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:d,disabled:f,value:this.year(),class:g,style:c,onchange:E(this.year)})])])]};return t}();var xt=function(){function a(){this.day=e();this.month=e();this.year=e();this.date=e.lift((function(t,e,n){return n+"-"+e+"-"+t}),this.day,this.month,this.year)}a.prototype.oninit=function(e){var n=this;var a=e.attrs.value;a.map((function(e){var a=new Date(String(e));if(t.isDate(a)&&!isNaN(a.getTime())){n.day(t.padStart(String(a.getDate()),2,"0"));n.month(t.padStart(String(1+a.getMonth()),2,"0"));n.year(String(a.getFullYear()))}}));this.date.map((function(e){var n=new Date(String(e));if(t.isDate(n)&&!isNaN(n.getTime())&&e!==a()){a(e)}}))};a.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};a.prototype.view=function(t){var e=t.attrs.field;var a=e,r=a.label,i=a.id,l=a.name,o=l===void 0?i:l,s=a.title,d=s===void 0?r:s,f=a.required,p=a.readonly,v=a.disabled,m=a.containerClass,h=a.classes,g=h===void 0?"":h,y=a.options;var w=y&&y.length?y[0].value:"en-GB";var x=O(v,true)+" "+b()+" "+g;var I=n(".dib.mr2",[H(i+"-dd","Day"),n("input.input-reset.border-box",{id:i+"-dd",name:o+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.day(),class:x,style:c,onchange:E(this.day)})]);var k=n(".dib.mr2",[H(i+"-mm","Month"),n("input.input-reset.border-box",{id:i+"-mm",name:o+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.month(),class:x,style:c,onchange:E(this.month)})]);var C=n(".dib.mr2",[H(i+"-yyyy","Year"),n("input.input-reset.border-box",{id:i+"-yyyy",name:o+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.year(),class:x,style:u,onchange:E(this.year)})]);return[H(i,r,f),n(".w-100",{id:i,title:d,class:m},w==="en-US"?[k,I,C]:[I,k,C])]};return a}();var It=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.field,r=e.value;var l=a.label,o=l===void 0?"":l,s=a.id,c=a.name,u=c===void 0?s:c,d=a.title,f=d===void 0?o:d,p=a.required,v=a.readonly,m=a.disabled,g=a.autocomplete,b=a.containerClass,y=b===void 0?"":b,w=a.classes,x=w===void 0?"":w;return n(".w-100",{class:h()+" "+y},n("label.flex.items-center",{title:f,class:O(m,v)+" "+x},n("input.clip[type=checkbox]",{id:s,name:u,checked:r(),required:p,autocomplete:g,disabled:m||v,onchange:R(r)}),F(o,p),n("i.ml2",{class:T(r()?i.checkIcn:i.uncheckIcn)})))};return t}();var kt=function(){function t(){this.showPassword=e(false)}t.prototype.view=function(t){var e;var a=t.attrs,r=a.field,l=a.value;var o=r.label,s=r.id,c=r.name,u=c===void 0?s:c,d=r.title,f=d===void 0?o:d,p=r.placeholder,v=r.maxlength,h=r.minlength,g=r.required,y=r.readonly,w=r.disabled,x=r.autofocus,I=r.autocomplete,k=r.instant,C=r.containerClass,T=r.classes,S=T===void 0?"":T;return[n(".flex.justify-between",[H(s,o,g),n(It,{field:{id:"showpass",label:i.showPassTxt,type:"checkbox",readonly:y,disabled:w,containerClass:"mb1 "+m()},value:this.showPassword})]),n(".w-100",{class:C},n("input.input-reset.border-box.w-100",(e={id:s,name:u,title:f,placeholder:p,type:this.showPassword()?"text":"password",maxlength:v,minlength:h,required:g,readonly:y,disabled:w,autofocus:x,autocomplete:I,value:l(),class:O(w,true)+" "+b()+" "+S,autocorrect:"off"},e[k?"oninput":"onchange"]=E(l),e)))]};return t}();var Ct=function(){function t(){}t.prototype.view=function(t){var e;var a=t.attrs,r=a.field,i=a.value;var l=r.label,o=r.id,s=r.name,c=s===void 0?o:s,u=r.title,d=u===void 0?l:u,f=r.placeholder,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,b=r.autocomplete,y=r.spellcheck,w=r.instant,x=r.containerClass,I=r.classes,k=I===void 0?"":I;return[H(o,l,p),n("div",{class:x},n("textarea.border-box.w-100[rows=3]",(e={id:o,name:c,title:d,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:b,spellcheck:y,value:i(),class:O(m,true)+" "+g()+" "+k,style:{resize:"vertical"}},e[w?"oninput":"onchange"]=E(i),e)))]};return t}();var Tt=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var o=r,s=o.label,c=s===void 0?"":s,u=o.title,d=u===void 0?c:u,f=o.required,p=o.readonly,v=o.disabled,m=o.containerClass,g=m===void 0?"":m,b=o.classes,y=b===void 0?"":b,w=o.options,x=w===void 0?[]:w;var I=t.find(x,t.matches({value:l()||false}));return n(".w-100",{class:h()+" "+g},n("label.flex.items-center.pointer",{title:d,class:O(v,p)+" "+y,onclick:function(){l()?l(false):l(true)}},F(c,f),n("i.ml2",{class:T(l()?i.toggleOnIcn:i.toggleOffIcn)}),I?n("span.ml2",I.label):null))};return e}();var St=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r,o=l.label,s=l.id,c=l.name,u=c===void 0?s:c,f=l.required,p=l.readonly,v=l.disabled,m=l.autocomplete,g=l.containerClass,b=g===void 0?"flex-wrap":g,w=l.classes,x=w===void 0?"":w,I=l.options;return[H(s,o,f),n(".flex",{class:h()+" "+b,onchange:E(i)},t.map(I,(function(t){var e=t.value,a=t.label,r=a===void 0?e:a,l=t.icon;var o=i()===e;return n("label.flex.items-center",{title:r,class:O(v,p)+" "+(o?y():"dim")+" "+d.btnBrd()+" "+x},n("input.clip[type=radio]",{name:u,value:e,checked:o,required:f,autocomplete:m,disabled:v||p}),l?n("i.fa-fw",{class:T(l)}):r)})))]};return e}();var Pt=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.field,i=a.value;var l=r,o=l.label,s=l.id,c=l.name,u=c===void 0?s:c,d=l.title,f=d===void 0?o:d,p=l.required,v=l.readonly,m=l.disabled,h=l.autofocus,g=l.autocomplete,y=l.containerClass,w=l.classes,x=w===void 0?"":w,I=l.options;return[H(s,o,p),n(".w-100",{class:y},n("select.input-reset.border-box.w-100",{id:s,name:u,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,value:i(),class:O(m,v)+" "+b()+" "+x,onchange:E(i)},t.map(I,(function(t){var e=t.value,a=t.label,r=a===void 0?e:a;return n("option",{value:e,disabled:m||v},r)}))))]};return e}();function Bt(t){return function(e){e.preventDefault();if(e.dataTransfer){e.dataTransfer.dropEffect="copy"}if(t()){e.redraw=false}t(true)}}function Ut(t){return function(e){e.preventDefault();t(false)}}function qt(t,e){return function(n){n.preventDefault();t(false);if(n.dataTransfer){e(n.dataTransfer.files)}}}function Dt(t){return function(e){var n=e.target.files;return t(n)}}var Ft=function(){function e(){}e.prototype.view=function(e){var a=e.attrs,r=a.defaultAccept,i=r===void 0?"*":r,l=a.field,o=l.label,s=l.id,c=l.name,u=c===void 0?s:c,d=l.title,f=d===void 0?o:d,p=l.required,v=l.readonly,h=l.disabled,g=l.autofocus,b=l.accept,y=b===void 0?i:b,w=l.containerClass,x=w===void 0?"":w,I=a.multiple,k=I===void 0?true:I,C=a.dragging,T=a.onSet,S=e.children;return n("label.db",t.extend({for:s,title:f,class:O(h,v)+" "+x},h||v?{}:{ondragover:Bt(C),ondragleave:Ut(C),ondrop:qt(C,T)}),[n("input.clip[type=file]",{id:s,name:u,multiple:k,accept:y,required:p,autofocus:g,disabled:h||v,onchange:Dt(T)}),o?n("span.db.mb1",{class:m()},F(o,p)):null,S])};return e}();function Mt(e){return function(n){var a=e();t.each(n,(function(t){a.push({guid:q(),name:t.name,path:"not_set",file:t})}));e(a)}}function zt(e,n){return function(){var a=e();t.remove(a,{guid:n});e(a)}}var Ht=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;return[n(Ft,{field:r,dragging:this.dragging,onSet:Mt(l)},n(".pa2",{class:this.dragging()?x():w()},[n("i.mr2",{class:T(i.uploadIcn)}),n("span",i.addFilesTxt)])),n(".flex.flex-column.mt1.nb1",t.map(l(),(function(t){return n("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[n("i.mr2",{class:T(i.downloadIcn)}),t.name,n("i.child.fr",{title:i.remFileTtl+" "+t.name,class:T(i.deleteIcn),onclick:zt(l,t.guid)})])})))]};return a}();function At(e){return function(n){var a=t.head(n);if(!a){return}e([{guid:q(),name:a.name,path:"not_set",file:a}])}}var Ot=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var o=t.head(l());return n(Ft,{field:r,multiple:false,dragging:this.dragging,onSet:At(l)},n(".flex.items-center.pa1.ba.b--black-20",{class:this.dragging()?x():w()},[n("i.pa1",{class:T(i.uploadIcn)}),n("span.ma1.flex-auto",o?o.name:i.addFileTxt),o?n("i.pa1.pointer.dim",{class:T(i.cancelIcn),onclick:function(t){t.preventDefault();l([])}}):null]))};return a}();function Et(e,a){return function(r){var i=e();return Promise.all(t.map(r,(function(t){return G(t,a,t.type).then((function(e){var n=Y(L(e),t.name);i.push({guid:q(),name:n.name,path:"not_set",file:n,dataUrl:e})}))}))).then((function(){e(i);n.redraw()}))}}var Rt=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var o=r.classes,c=o===void 0?"":o;return[n(Ft,{field:r,defaultAccept:"image/*",dragging:this.dragging,onSet:Et(l,i.imageMaxSize)},n(".w-100.pa1.dt.tc",{class:(this.dragging()?x():w())+" "+c},n("i.fa-2x.dtc.v-mid",{class:T(i.cameraIcn)}))),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",t.map(l(),(function(t){return n(ct,{src:M(t.path,t.dataUrl),style:s()},n(".absolute.top-0.right-0.child",n(K,{title:"Remove "+t.name,icon:i.deleteIcn,onclick:zt(l,t.guid)})))})))]};return a}();function jt(e,a){return function(r){var i=t.head(r);if(!i){return Promise.resolve()}return G(i,a,i.type).then((function(t){var a=Y(L(t),i.name);e([{guid:q(),name:a.name,path:"not_set",file:a,dataUrl:t}]);n.redraw()}))}}var Lt=function(){function a(){this.dragging=e(false)}a.prototype.view=function(e){var a=e.attrs,r=a.field,l=a.value;var s=t.head(l());var c=r.classes,u=c===void 0?"":c;return n(Ft,{field:r,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:jt(l,i.imageMaxSize)},n(".relative.w-100.pa1.contain.dt.tc",{class:(this.dragging()?x():w())+" "+u},s?[n("img.img.contain",{title:s.name,src:M(s.path,s.dataUrl),style:o()}),n(".absolute.top-0.right-0.pa1.pointer.dim",{onclick:function(t){t.preventDefault();l([])}},n("i.pa1",{class:T(i.cancelIcn)}))]:n("i.fa-2x.dtc.v-mid",{class:T(i.cameraIcn)})))};return a}();var Yt=function(){function e(){}e.prototype.oncreate=function(e){var n=this;var r=e.dom;var i=r.children[0];var l=D();this.signaturePad=new a(i,{minWidth:.5*l,maxWidth:1.5*l});var o=function(){var t=D();i.width=i.offsetWidth*t;i.height=i.offsetHeight*t;var e=i.getContext("2d");e.scale(t,t);n.resetCanvas()};this.resizeHandler=t.debounce(o,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);o()};e.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};e.prototype.view=function(t){var e=this;var a=t.attrs,r=a.style,l=a.onSet,o=a.onCancel;return[n(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:r},n("canvas.aspect-ratio--object")),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(K,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:function(){if(!e.signaturePad.isEmpty()){l(e.signaturePad.toDataURL("image/png"))}}}),n(K,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return e.resetCanvas()}}),n(K,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:o})])]};e.prototype.resetCanvas=function(){this.signaturePad.clear()};return e}();function _t(t,e){var n=i.signMaxSize;var a=.01*e*n;return $(t,n,a,i.signFont)}function Nt(t,e){return function(){return e(_t(i.stampSetTxt,t))}}var Wt=function(){function t(){}t.prototype.view=function(t){var e=t.attrs,a=e.heightPct,r=e.onSet;return[n("span.clip",{style:{"font-family":i.signFont}},i.stampSetTxt),n(K,{label:i.stampTxt,classes:"w-100",onclick:Nt(a,r)})]};return t}();function Vt(t,e,n){return function(){if(t()){n(_t(t(),e))}return false}}var Gt=function(){function t(){this.text=e("")}t.prototype.oncreate=function(t){var e=t.dom;var n=e.children[0];n.focus({preventScroll:false});this.scaleText(e)};t.prototype.onupdate=function(t){var e=t.dom;this.scaleText(e)};t.prototype.view=function(t){var e=this;var a=t.attrs,r=a.heightPct,l=a.style,o=a.onSet,s=a.onCancel;return[n("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:l,onsubmit:Vt(this.text,r,o)},n("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:E(this.text),value:this.text(),style:{"font-family":i.signFont}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(K,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:Vt(this.text,r,o)}),n(K,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return e.text("")}}),n(K,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]};t.prototype.scaleText=function(t){var e=t.clientHeight;t.style.fontSize=.56*e+"px"};return t}();function $t(t,e){return new Promise((function(n){var a=new Image;a.onload=function(){var t=document.createElement("canvas");var r=_(a.width,a.height,e),i=r[0],l=r[1];t.width=i;t.height=l;var o=t.getContext("2d");o.drawImage(a,0,0,i,l);n(t.toDataURL())};a.src=t}))}function Jt(t,e,a){return function(r){return $t(r,a).then((function(a){var r=Y(L(a),"sign-"+e+".png");t([{guid:q(),name:r.name,path:"not_set",file:r,dataUrl:a}]);n.redraw()}))}}var Kt=function(){function e(){}e.prototype.oninit=function(t){var e=this;var n=t.attrs.value;n.map((function(){return e.component=undefined}))};e.prototype.view=function(e){var a=this;var r=e.attrs,l=r.field,o=r.value;var s=l,c=s.label,u=s.id,d=s.readonly,f=s.disabled,p=s.classes,v=p===void 0?"":p,m=s.containerClass,h=s.options,g=h===void 0?i.signOpts:h,b=s.heightPct,y=b===void 0?i.signHeightPct:b;var x={"padding-bottom":y+"%"};var I=t.head(o());var k=t(g).map((function(t){var e=t.value;if(e==="draw"){return{component:Yt,icon:T(i.drawIcn),label:i.signDrawTxt}}else if(e==="type"){return{component:Gt,icon:T(i.typeIcn),label:i.signTypeTxt}}else if(e==="stamp"){return{component:Wt,icon:T(i.stampIcn),label:i.signStampTxt}}return null})).compact().value();if(k.length===1&&!I){this.component=k[0].component}return n(".relative",{class:m},[H(u,c),d||f?n(".aspect-ratio",{id:u,class:v,style:x},I?n(".aspect-ratio--object",n("img.img.w-100.absolute",{src:M(I.path,I.dataUrl)})):null):this.component?n(this.component,{heightPct:y,style:x,onSet:Jt(o,u,i.signMaxSize),onCancel:function(){return a.component=undefined}}):n(".aspect-ratio.pointer",{id:u,class:w()+" "+v,style:x},I?n(".aspect-ratio--object.hide-child.dim",{onclick:function(){return o([])}},[n("img.img.w-100.absolute",{src:M(I.path,I.dataUrl)}),n(".pa3.absolute.top-0.right-0.child",n("i.fa-2x",{class:T(i.resetIcn)}))]):n(".aspect-ratio--object.flex.items-stretch.justify-center",t.map(k,(function(t){var e=t.component,r=t.icon,i=t.label;return n(".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return a.component=e}},n("i.fa-2x.ma1",{class:r}),n("span.ma1",i))}))))])};return e}();export{J as Badge,pt as BaseInput,et as BaseText,K as Button,Q as ButtonLink,wt as CardDateInput,it as Checkbox,It as CheckboxInput,vt as CurrencyInput,xt as DateInput,st as FileList,Ht as FileMulti,Ot as FileSelect,ut as ImageList,Rt as ImageMulti,dt as ImagePreview,Lt as ImageSelect,ft as Label,rt as Link,X as NavButton,Z as NavLink,kt as PasswordInput,St as RadioInput,Pt as SelectInput,ot as SelectText,Kt as SignBuilder,Ct as TextareaInput,lt as Toggle,Tt as ToggleInput,tt as Trusted,ht as currencyStrToNumber,j as fileNameExtSplit,T as getIcon,q as guid,at as iconMap,nt as linkAttrs,gt as numberToCurrencyStr,bt as numberToCurrencyTuple,P as updateButtonContext,l as updateConfig,C as updateTheme};
