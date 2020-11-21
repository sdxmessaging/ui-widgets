import e from"lodash";import t from"mithril/stream";import n from"mithril";import a from"signature_pad";var r={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",showPassTxt:"Show Password",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fa-pen-nib",typeIcn:"fa-keyboard",stampIcn:"fa-stamp",applyIcn:"fa-check",resetIcn:"fa-eraser",cancelIcn:"fa-times",checkIcn:"fa-check-square",uncheckIcn:"fa-square",toggleOnIcn:"fa fa-toggle-on",toggleOffIcn:"fa fa-toggle-off",showPassIcn:"fa fa-eye",hidePassIcn:"fa fa-eye-slash",uploadIcn:"fa-file-upload",downloadIcn:"fa-file-download",deleteIcn:"fa-trash-alt",cameraIcn:"fa-camera",imageIcn:"fa-image",emailIcn:"fa-envelope",telIcn:"fa-phone",linkIcn:"fa-link",wordDocIcn:"fa-file-word",videoFileIcn:"fa-file-video",pdfFileIcn:"fa-file-pdf",musicFileIcn:"fa-file-audio",excelFileIcn:"fa-file-excel",fileIcn:"fa-file",codeFileIcn:"fa-file-code"};var i=r;function o(t){e.assign(r,t)}function l(){return{"max-height":i.imageDispHeight}}function s(){return{"max-height":i.thumbDispHeight}}var c={"max-width":"5.4ex"};var u={"max-width":"9ex"};var d={icon:t("fas"),lblCol:t("silver"),lblFnt:t("f6"),dspFnt:t("truncate"),dspBrd:t("bb b--black-20"),inpHgt:t("h2"),inpCol:t("dark-gray"),inpFnt:t("fw2"),inpBrd:t("bn"),actCol:t("dark-gray"),actBg:t("bg-light-blue"),filBrd:t("ba bw1 br3 b--dashed"),filBrdCol:t("b--black-30"),drgCol:t("blue"),drgBrdCol:t("b--blue"),btnBg:t("bg-light-blue"),btnCol:t("dark-gray"),btnFnt:t(""),btnPad:t("pa2"),btnBrd:t("bn br2")};function f(e){return e.join(" ")}function p(n,a){if(a===void 0){a=[]}return t.merge(e.concat(e.map(n,(function(e){return d[e]})),a)).map(f)}var v=p(["lblCol","dspFnt"]);var m=p(["lblCol","lblFnt"]);var h=p(["inpCol","inpFnt"]);var g=p(["inpBrd"],[h]);var b=p(["inpHgt"],[g]);var y=p(["actCol","actBg"]);var w=p(["filBrd","filBrdCol"],[h]);var x=p(["inpFnt","filBrd","drgCol","drgBrdCol"]);var I=p(["btnBg","btnCol","btnFnt","btnPad","btnBrd"]);var k=p(["btnCol","btnFnt"]);function C(t){e.forEach(t,(function(e,t){if(e&&t in d){d[t](e)}}))}function S(e){return d.icon()+" "+e}var T={};function P(t){e.assign(T,t)}function F(e){if(e&&e in T){return T[e]}else{return I()}}function B(e){return(e+256).toString(16).substr(1)}function q(){var e=new Uint8Array(16);var t=window.crypto||window.msCrypto;t.getRandomValues(e);return[B(e[0]),B(e[1]),B(e[2]),B(e[3]),"-",B(e[4]),B(e[5]),"-",B(e[6]),B(e[7]),"-",B(e[8]),B(e[9]),"-",B(e[10]),B(e[11]),B(e[12]),B(e[13]),B(e[14]),B(e[15])].join("")}function D(){return Math.max(window.devicePixelRatio,1)}function _(e,t){return t?e+"*":e}function U(e,t){return t?t:e}function M(e){return e?n("span.mr2.truncate",{title:e,class:v()},e):null}function O(e,t,a){return t?n("label.mb1.db",{title:t,for:e,class:m()},_(t,a)):null}function z(e,t,a){return[e?n("i.fa-fw",{class:(t?"mr2":"")+" "+S(e)}):null,t,a?n("i.fa-fw",{class:(t?"ml2":"")+" "+S(a)}):null]}function j(e,t){return e?"o-60":t?"":"pointer"}function A(e){return function(t){var n=t.target.value;return e(n)}}function H(e){return function(t){var n=t.target.checked;return e(n)}}function R(e){var t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function E(e){var t=e.split(",");var n=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);var a=t[0].split(":")[1].split(";")[0];var r=n.length;var i=new Uint8Array(r);for(var o=0;o<r;o++){i[o]=n.charCodeAt(o)}return new Blob([i],{type:a})}function L(e,t){var n=(new Date).valueOf();var a=e;a.name=t;a.lastModified=n;return e}function Y(e,t,n){if(e>t){if(e>n){return[n,Math.round(t*n/e)]}}else if(t>n){return[Math.round(e*n/t),n]}return[e,t]}function W(e){var t=Math.min(e.byteLength,64*1024);var n=new DataView(e,0,t);if(n.getUint16(0,false)!==65496){return-2}var a=n.byteLength;var r=2;while(r<a){var i=n.getUint16(r,false);r+=2;if(i===65505){if(n.getUint32(r+=2,false)!==1165519206){return-1}var o=n.getUint16(r+=6,false)===18761;r+=n.getUint32(r+4,o);var l=n.getUint16(r,o);r+=2;for(var s=0;s<l;s++){if(n.getUint16(r+s*12,o)===274){return n.getUint16(r+s*12+8,o)}}}else if((i&65280)!==65280){break}else{r+=n.getUint16(r,false)}}return-1}function N(e){return new Promise((function(t){var n=new FileReader;n.onload=function(){t(W(n.result))};n.readAsArrayBuffer(e)}))}function V(e,t,n,a){if(!a||a>8){return}switch(a){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,n);e.rotate(Math.PI);return;case 4:e.translate(0,n);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-n);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-n);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function Z(e,t,n){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return N(e).then((function(a){return new Promise((function(r){var i=new Image;i.onload=function(){var e=document.createElement("canvas");var o=Y(i.width,i.height,t),l=o[0],s=o[1];if(a>4){e.width=s;e.height=l}else{e.width=l;e.height=s}var c=e.getContext("2d");V(c,l,s,a);c.drawImage(i,0,0,l,s);r(e.toDataURL(n))};var o=new FileReader;o.onload=function(){return i.src=o.result};o.readAsDataURL(e)}))}))}function $(e,t,n,a){var r=document.createElement("canvas");r.width=t;r.height=n;var i=.56*r.height;var o=r.getContext("2d");o.textBaseline="middle";o.font=i+"px "+a;o.fillText(e,r.height*.05,i);return r.toDataURL()}function G(e){var t="";if(e){var n=J(e).toLowerCase();switch(n){case"doc":case"docx":case"dot":case"wbk":case"docm":case"dotx":case"dotm":case"docb":case"txt":{t=i.wordDocIcn;break}case"webm":case"mkv":case"flv":case"vob":case"ogv":case"drc":case"gifv":case"mng":case"avi":case"mts":case"m2ts":case"mov":case"qt":case"wmv":case"yuv":case"rm":case"rmvb":case"viv":case"asf":case"amv":case"mp4":case"m4p":case"m4v":case"mpg":case"mp2":case"mpeg":case"mpe":case"mpv":case"m2v":case"svi":case"3gp":case"mxf":case"roq":case"nsv":case"f4v":case"f4p":case"f4a":case"f4b":{t=i.videoFileIcn;break}case"pdf":{t=i.pdfFileIcn;break}case"pcm":case"wav":case"aiff":case"mp3":case"aac":case"ogg":case"wma":case"flac":case"alac":{t=i.musicFileIcn;break}case"xls":case"xlt":case"xlm":case"xlsx":case"xlsm":case"xltx":case"xltm":case"xlsb":case"xla":case"xlam":case"xll":case"xlw":{t=i.excelFileIcn;break}case"html":case"js":case"css":case"scss":case"java":{t=i.codeFileIcn;break}case"jpg":case"jpeg":case"png":case"tiff":case"gif":case"svg":case"webp":{t=i.imageIcn;break}default:{t=i.fileIcn;break}}}return t}function J(e){var t=e.name.split(".");var n=t.length-1;var a=t[n];return a}var K=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.classes,i=r===void 0?"bg-red":r,o=e.children;return n(".relative.dib",[o,a?n("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:i,style:{minWidth:"0.65rem"}},a):null])};return e}();var Q=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.type,i=r===void 0?"button":r,o=t.title,l=o===void 0?a:o,s=t.icon,c=t.rightIcon,u=t.context,d=t.classes,f=d===void 0?"":d,p=t.disabled,v=t.style,m=t.onclick;return n("button.button-reset",{type:i,title:l,disabled:p,class:j(p)+" "+F(u)+" "+f,style:v,onclick:m},z(s,a,c))};return e}();var X=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.title,i=r===void 0?a:r,o=t.icon,l=t.rightIcon,s=t.href,c=t.rel,u=t.target,d=t.download,f=t.context,p=t.classes,v=p===void 0?"":p,m=t.style;return n("a.link",{href:s,rel:c,target:u,download:d,title:i,class:F(f)+" "+v,style:m},z(o,a,l))};return e}();var ee=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.title,i=r===void 0?a:r,o=t.icon,l=t.rightIcon,s=t.classes,c=s===void 0?"":s,u=t.disabled,d=t.style,f=t.onclick;return n(".mh2.pa2.truncate",{title:i,disabled:u,class:j(u)+" "+k()+" "+c,style:d,onclick:f},z(o,a,l))};return e}();var te=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.label,r=t.title,i=r===void 0?a:r,o=t.icon,l=t.rightIcon,s=t.href,c=t.rel,u=t.target,d=t.download,f=t.classes,p=f===void 0?"":f,v=t.style;return n("a.link.mh2.pa2.truncate",{href:s,rel:c,target:u,download:d,title:i,class:k()+" "+p,style:v},z(o,a,l))};return e}();var ne=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=a.classes,i=a.style,o=t.value;return n(".pa2",{class:r,style:i},n.trust(o()))};return e}();var ae=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var i=a.label,o=a.classes,l=o===void 0?"":o,s=a.style;return n(".pa2.flex.flex-wrap",{class:d.dspBrd()+" "+l,style:s},[M(i),n("span.ws-normal",{title:r(),class:h()},r())])};return e}();function re(e,t){if(e==="email"){return{href:"mailto:"+t,class:h()}}else if(e==="tel"){return{href:"tel:"+t,class:h()}}else{return{href:t,target:"_blank",class:h()}}}var ie={email:i.emailIcn,tel:i.telIcn};var oe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var o=a.label,l=a.type,s=l===void 0?"url":l,c=a.classes,u=c===void 0?"":c,f=a.style;return n(".pa2.flex.flex-wrap",{class:d.dspBrd()+" "+u,style:f},[M(o),n("a.link.dim.pointer.ws-normal",re(s,r()),n("i.mr2",{class:S(ie[s]||i.linkIcn)}),r())])};return e}();var le=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r.options,l=o===void 0?[]:o;var s=e.find(l,e.matches({value:i()||false}));return s?n("span.ml2",s.label):null};return t}();var se=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var o=a.label,l=a.classes,s=l===void 0?"":l,c=a.style;return n(".pa2.flex.items-center",{class:d.dspBrd()+" "+v()+" "+s,style:c},[M(o),n("i",{class:d.inpCol()+" "+S(i[r()?this.onIcon:this.offIcon])}),n(le,{field:a,value:r})])};return e}();var ce=this&&this.__extends||function(){var e=function(t,n){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n))e[n]=t[n]};return e(t,n)};return function(t,n){e(t,n);function a(){this.constructor=t}t.prototype=n===null?Object.create(n):(a.prototype=n.prototype,new a)}}();var ue=function(e){ce(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(se);var de=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r.label,l=r.classes,s=l===void 0?"":l,c=r.style;var u=e.find(r.options,{value:i()});var f=u?u.label||u.value:i();return n(".pa2.flex.flex-wrap",{class:d.dspBrd()+" "+s,style:c},[M(o),n("span.ws-normal",{title:f,class:h()},f)])};return t}();var fe=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.label,s=r.classes,c=s===void 0?"":s,u=r.style;return n(".pa2.flex.flex-column",{class:d.dspBrd()+" "+c,style:u},[M(l),n(".flex.flex-column.mt1.nb1",e.map(o(),(function(e){var t=e.name,a=e.path;return n(".ba.b--black-20",{class:h()},[n("a.pa2.mv1.link.b--black-20.dim.dib.pointer[target=_blank]",n("i.mr2",{href:a,class:S(i.downloadIcn)}),t)])})))])};return t}();var pe=function(){function e(){}e.prototype.view=function(e){var t=e.children,a=e.attrs;return n(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[n("img.contain",a),t])};return e}();var ve=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r.label,l=r.classes,c=l===void 0?"":l,u=r.style;return n(".pa2.flex.flex-column",{class:d.dspBrd()+" "+c,style:u},[M(o),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(i(),(function(e){var t=e.name,a=e.path,r=e.dataUrl;return n(pe,{title:t,src:U(a,r),style:s()})})))])};return t}();var me=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var s=r.label,c=r.classes,u=c===void 0?"":c,f=r.style;var p=e.head(o());return n(".pa2.flex.flex-column",{class:d.dspBrd()+" "+u,style:f},[M(s),p?n("img.img.h-100.mt2.contain.self-center",{title:p.name,src:U(p.path,p.dataUrl),style:l()}):n("i.mt2",{class:d.inpCol()+" "+S(i.imageIcn)})])};return t}();function he(e){var t=0;if(e){if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(/(?=.*[A-Z].*[A-Z])/.test(e)&&/(?=.*[a-z].*[a-z].*[a-z])/.test(e)){console.log("has 2 upper case:",t);t=t+1}if(/(?=.*[0-9].*[0-9])/.test(e)){t=t+1}if(/(?=.*[!"£%^@#$&*])/.test(e)){t=t+1}}}return t}function ge(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}var be=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];var ye=function(){function t(){}t.prototype.oninit=function(e){var t=e.attrs.value;this.passwordScore=t.map((function(e){return he(String(e))}))};t.prototype.onremove=function(){this.passwordScore.end()};t.prototype.view=function(t){var a=this;var r=t.attrs.field;var i=r.label,o=r.classes,l=o===void 0?"":o,s=r.style;return n(".flex.flex-column",{class:l,style:s},[M(i),n(".flex.mt1",e.map(be,(function(e){return n(".h1.w-20",{class:a.passwordScore()>=e.value?e.background:"bg-transparent"})}))),n("span.f5.truncate",ge(this.passwordScore()))])};return t}();var we=function(){function e(){}e.prototype.view=function(e){var t=e.attrs.field,a=t.label,r=a===void 0?"":a,i=t.title,o=i===void 0?r:i,l=t.required;return n("label.mb2",{title:o},_(r,l))};return e}();var xe=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value,o=a.xform,l=o===void 0?i:o;var s=r.label,c=r.id,u=r.type,d=u===void 0?"text":u,f=r.name,p=f===void 0?c:f,v=r.title,m=v===void 0?s:v,h=r.placeholder,g=r.max,y=r.maxlength,w=r.min,x=r.minlength,I=r.step,k=r.required,C=r.readonly,S=r.disabled,T=r.autofocus,P=r.autocomplete,F=r.pattern,B=r.inputmode,q=r.spellcheck,D=r.instant,_=r.containerClass,U=r.classes,M=U===void 0?"":U;return[O(c,s,k),n(".w-100",{class:_},n("input.input-reset.border-box.w-100",(t={id:c,type:d,name:p,title:m,placeholder:h,max:g,maxlength:y,min:w,minlength:x,step:I,required:k,readonly:C,disabled:S,autofocus:T,autocomplete:P,pattern:F,inputmode:B,spellcheck:q,value:l(),class:j(S,true)+" "+b()+" "+M},t[D?"oninput":"onchange"]=A(i),t)))]};return e}();var Ie=function(){function t(){}t.prototype.view=function(t){var a;var r=t.attrs,i=r.field,o=r.value,l=r.xform,s=l===void 0?o:l;var c=i,u=c.label,d=c.id,f=c.name,p=f===void 0?d:f,v=c.title,m=v===void 0?u:v,g=c.placeholder,y=c.max,w=c.maxlength,x=c.min,I=c.minlength,k=c.step,C=c.required,S=c.readonly,T=c.disabled,P=c.autofocus,F=c.autocomplete,B=c.pattern,q=c.inputmode,D=c.spellcheck,_=c.instant,U=c.containerClass,M=c.classes,z=M===void 0?"":M,A=c.options;var H=A&&A.length?A[0].value:"$";return[O(d,u,C),n(".w-100",{class:U},n(".w-100.flex.items-center",{class:b(),style:{"flex-shrink":0}},[n("span.mr1",H),n("input.input-reset.border-box.flex-auto.bg-transparent.bn",(a={id:d,type:"text",name:p,title:m,placeholder:g,max:y,maxlength:w,min:x,minlength:I,step:k,required:C,readonly:S,disabled:T,autofocus:P,autocomplete:F,pattern:B,inputmode:q,spellcheck:D,value:e.isUndefined(s())?null:Se(ke(s())),class:j(T,true)+" "+h()+" "+z},a[_?"oninput":"onchange"]=Pe(o),a))]))]};return t}();function ke(t){return e.isString(t)?e.parseInt(t):Number(t)}function Ce(t){var n=t.replace(/[^\d.]/g,"");var a;var r=0;if(n.indexOf(".")>-1){var i=n.indexOf(".");var o=n.substring(0,i);a=e.parseInt(e.padStart(o,1,"0"));var l=n.substring(i+1,Math.min(i+3,n.length));r=e.parseInt(e.padEnd(l,2,"0"))}else{a=e.parseInt(n)||0}return a*100+r}function Se(e){var t=Te(e);if(t){return t[0]+"."+t[1]}else{return t}}function Te(t){if(!e.isFinite(t)){return undefined}var n=String(Math.abs(t));var a="0";var r="";if(n.length>2){var i=n.length-2;a=n.substring(0,i);r=n.substring(i)}else{r=e.padStart(n,2,"0")}return[a,r]}function Pe(e){return function(t){var n=t.target.value;return e(Ce(n))}}var Fe=function(){function e(){this.month=t();this.year=t();this.date=t.lift((function(e,t){return e+"/"+t}),this.month,this.year)}e.prototype.oninit=function(e){var t=this;var n=e.attrs.value;n.map((function(e){var n=String(e).split("/"),a=n[0],r=n[1],i=r===void 0?"":r;t.month(a);t.year(i)}));this.date.map((function(e){if(e!==n()){n(e)}}))};e.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true)};e.prototype.view=function(e){var t=e.attrs.field;var a=t.label,r=t.id,i=t.name,o=i===void 0?r:i,l=t.title,s=l===void 0?a:l,u=t.required,d=t.readonly,f=t.disabled,p=t.containerClass,v=t.classes,m=v===void 0?"":v;var g=j(f,true)+" "+b()+" "+m;return[O(r,a,u),n(".w-100",{id:r,title:s,class:p},[n(".dib.mr2",[O(r+"-mm","Month"),n("input.input-reset.border-box",{id:r+"-mm",name:o+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:d,disabled:f,value:this.month(),class:g,style:c,onchange:A(this.month)})]),n("span.mr2",{class:h()},"/"),n(".dib.mr2",[O(r+"-yy","Year"),n("input.input-reset.border-box",{id:r+"-yy",name:o+"-yy",type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:u,readonly:d,disabled:f,value:this.year(),class:g,style:c,onchange:A(this.year)})])])]};return e}();var Be=function(){function a(){this.day=t();this.month=t();this.year=t();this.date=t.lift((function(e,t,n){return n+"-"+t+"-"+e}),this.day,this.month,this.year)}a.prototype.oninit=function(t){var n=this;var a=t.attrs.value;a.map((function(t){var a=new Date(String(t));if(e.isDate(a)&&!isNaN(a.getTime())){n.day(e.padStart(String(a.getDate()),2,"0"));n.month(e.padStart(String(1+a.getMonth()),2,"0"));n.year(String(a.getFullYear()))}}));this.date.map((function(t){var n=new Date(String(t));if(e.isDate(n)&&!isNaN(n.getTime())&&t!==a()){a(t)}}))};a.prototype.onremove=function(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)};a.prototype.view=function(e){var t=e.attrs.field;var a=t,r=a.label,i=a.id,o=a.name,l=o===void 0?i:o,s=a.title,d=s===void 0?r:s,f=a.required,p=a.readonly,v=a.disabled,m=a.containerClass,h=a.classes,g=h===void 0?"":h,y=a.options;var w=y&&y.length?y[0].value:"en-GB";var x=j(v,true)+" "+b()+" "+g;var I=n(".dib.mr2",[O(i+"-dd","Day"),n("input.input-reset.border-box",{id:i+"-dd",name:l+"-dd",type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.day(),class:x,style:c,onchange:A(this.day)})]);var k=n(".dib.mr2",[O(i+"-mm","Month"),n("input.input-reset.border-box",{id:i+"-mm",name:l+"-mm",type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.month(),class:x,style:c,onchange:A(this.month)})]);var C=n(".dib.mr2",[O(i+"-yyyy","Year"),n("input.input-reset.border-box",{id:i+"-yyyy",name:l+"-yyyy",type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:f,readonly:p,disabled:v,value:this.year(),class:x,style:u,onchange:A(this.year)})]);return[O(i,r,f),n(".w-100",{id:i,title:d,class:m},w==="en-US"?[k,I,C]:[I,k,C])]};return a}();var qe=function(){function e(){this.showPassword=t(false)}e.prototype.view=function(e){var t;var a=this;var r=e.attrs,o=r.field,l=r.value;var s=o.label,c=o.id,u=o.name,d=u===void 0?c:u,f=o.title,p=f===void 0?s:f,v=o.placeholder,m=o.maxlength,g=o.minlength,y=o.required,w=o.readonly,x=o.disabled,I=o.autofocus,k=o.autocomplete,C=o.instant,T=o.containerClass,P=o.classes,F=P===void 0?"":P;return[O(c,s,y),n(".w-100",{class:T},n(".w-100.flex.items-center",{class:b()},n("input.input-reset.border-box.flex-auto.bg-transparent.bn",(t={id:c,name:d,title:p,placeholder:v,type:this.showPassword()?"text":"password",maxlength:m,minlength:g,required:y,readonly:w,disabled:x,autofocus:I,autocomplete:k,value:l(),class:j(x,true)+" "+h()+" "+F,autocorrect:"off"},t[C?"oninput":"onchange"]=A(l),t)),n("i.ml1.pa1.fa-fw.pointer.dim",{title:i.showPassTxt,class:S(this.showPassword()?i.hidePassIcn:i.showPassIcn),onclick:function(){return a.showPassword(!a.showPassword())}})))]};return e}();var De=function(){function e(){}e.prototype.view=function(e){var t;var a=e.attrs,r=a.field,i=a.value;var o=r.label,l=r.id,s=r.name,c=s===void 0?l:s,u=r.title,d=u===void 0?o:u,f=r.placeholder,p=r.required,v=r.readonly,m=r.disabled,h=r.autofocus,b=r.autocomplete,y=r.spellcheck,w=r.instant,x=r.containerClass,I=r.classes,k=I===void 0?"":I;return[O(l,o,p),n("div",{class:x},n("textarea.border-box.w-100[rows=3]",(t={id:l,name:c,title:d,placeholder:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:b,spellcheck:y,value:i(),class:j(m,true)+" "+g()+" "+k,style:{resize:"vertical"}},t[w?"oninput":"onchange"]=A(i),t)))]};return e}();var _e=function(){function e(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}e.prototype.view=function(e){var t=e.attrs,a=t.field,r=t.value;var o=a.label,l=o===void 0?"":o,s=a.id,c=a.name,u=c===void 0?s:c,d=a.title,f=d===void 0?l:d,p=a.required,v=a.readonly,m=a.disabled,g=a.autocomplete,b=a.containerClass,y=b===void 0?"":b,w=a.classes,x=w===void 0?"":w;return n("div",{class:h()+" "+y},n("label.flex.items-center",{title:f,class:j(m,v)+" "+x},n("input.clip[type=checkbox]",{id:s,name:u,checked:r(),required:p,autocomplete:g,disabled:m||v,onchange:H(r)}),_(l,p),n("i.ml2",{class:S(i[r()?this.onIcon:this.offIcon])}),n(le,{field:a,value:r})))};return e}();var Ue=this&&this.__extends||function(){var e=function(t,n){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n))e[n]=t[n]};return e(t,n)};return function(t,n){e(t,n);function a(){this.constructor=t}t.prototype=n===null?Object.create(n):(a.prototype=n.prototype,new a)}}();var Me=function(e){Ue(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;t.onIcon="toggleOnIcn";t.offIcon="toggleOffIcn";return t}return t}(_e);var Oe=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r,l=o.label,s=o.id,c=o.name,u=c===void 0?s:c,f=o.required,p=o.readonly,v=o.disabled,m=o.autocomplete,g=o.containerClass,b=g===void 0?"flex-wrap":g,w=o.classes,x=w===void 0?"":w,I=o.options;return[O(s,l,f),n(".flex",{class:h()+" "+b,onchange:A(i)},e.map(I,(function(e){var t=e.value,a=e.label,r=a===void 0?t:a,o=e.icon;var l=i()===t;return n("label.flex.items-center",{title:r,class:j(v,p)+" "+(l?y():"dim")+" "+d.btnBrd()+" "+x},n("input.clip[type=radio]",{name:u,value:t,checked:l,required:f,autocomplete:m,disabled:v||p}),o?n("i.fa-fw",{class:S(o)}):r)})))]};return t}();var ze=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.field,i=a.value;var o=r,l=o.label,s=o.id,c=o.name,u=c===void 0?s:c,d=o.title,f=d===void 0?l:d,p=o.required,v=o.readonly,m=o.disabled,h=o.autofocus,g=o.autocomplete,y=o.containerClass,w=o.classes,x=w===void 0?"":w,I=o.options;return[O(s,l,p),n(".w-100",{class:y},n("select.input-reset.border-box.w-100",{id:s,name:u,title:f,required:p,readonly:v,disabled:m,autofocus:h,autocomplete:g,value:i(),class:j(m,v)+" "+b()+" "+x,onchange:A(i)},e.map(I,(function(e){var t=e.value,a=e.label,r=a===void 0?t:a;return n("option",{value:t,disabled:m||v},r)}))))]};return t}();function je(e){return function(t){t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function Ae(e){return function(t){t.preventDefault();e(false)}}function He(e,t){return function(n){n.preventDefault();e(false);if(n.dataTransfer){t(n.dataTransfer.files)}}}function Re(e){return function(t){var n=t.target.files;return e(n)}}var Ee=function(){function t(){}t.prototype.view=function(t){var a=t.attrs,r=a.defaultAccept,i=r===void 0?"*":r,o=a.field,l=o.label,s=o.id,c=o.name,u=c===void 0?s:c,d=o.title,f=d===void 0?l:d,p=o.required,v=o.readonly,h=o.disabled,g=o.autofocus,b=o.accept,y=b===void 0?i:b,w=o.containerClass,x=w===void 0?"":w,I=a.multiple,k=I===void 0?true:I,C=a.dragging,S=a.onSet,T=t.children;return n("label.db",e.extend({for:s,title:f,class:j(h,v)+" "+x},h||v?{}:{ondragover:je(C),ondragleave:Ae(C),ondrop:He(C,S)}),[n("input.clip[type=file]",{id:s,name:u,multiple:k,accept:y,required:p,autofocus:g,disabled:h||v,onchange:Re(S)}),l?n("span.db.mb1",{class:m()},_(l,p)):null,T])};return t}();function Le(t,n){if(n===void 0){n=false}return function(a){var r=n?[]:t();e.each(a,(function(e){r.push({guid:q(),name:e.name,path:"not_set",file:e})}));t(r)}}function Ye(t,n){return function(a){a.preventDefault();var r=t();e.remove(r,{guid:n});t(r)}}var We=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;return[n(Ee,{field:r,dragging:this.dragging,onSet:Le(o)},n(".pa2",{class:this.dragging()?x():w()},[n("i.mr2",{class:S(i.uploadIcn)}),n("span",i.addFilesTxt)])),n(".flex.flex-column.mt1.nb1",e.map(o(),(function(e){return n("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[n("i.mr2",{class:S(i.downloadIcn)}),e.name,n("i.child.fr",{title:i.remFileTtl+" "+e.name,class:S(i.deleteIcn),onclick:Ye(o,e.guid)})])})))]};return a}();var Ne=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=e.head(o());return n(Ee,{field:r,multiple:false,dragging:this.dragging,onSet:Le(o,true)},n(".flex.items-center.pa1.ba.b--black-20",{class:this.dragging()?x():w()},[n("i.pa1",{class:S(i.uploadIcn)}),n("span.ma1.flex-auto",l?l.name:i.addFileTxt),l?n("i.pa1",{class:S(G(l)),title:"Click to view file in new tab",onclick:l.path!=="not_set"?function(){return window.open(l.path,"_blank")}:undefined}):null,l?n("i.pa1.pointer.dim",{title:"Remove "+l.name,class:S(i.cancelIcn),onclick:Ye(o,l.guid)}):null]))};return a}();function Ve(t,a,r){if(r===void 0){r=false}return function(i){var o=r?[]:t();return Promise.all(e.map(i,(function(e){return Z(e,a,e.type).then((function(t){var n=L(E(t),e.name);o.push({guid:q(),name:n.name,path:"not_set",file:n,dataUrl:t})}))}))).then((function(){t(o);n.redraw()}))}}var Ze=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var l=r.classes,c=l===void 0?"":l;return[n(Ee,{field:r,defaultAccept:"image/*",dragging:this.dragging,onSet:Ve(o,i.imageMaxSize)},n(".w-100.pa1.dt.tc",{class:(this.dragging()?x():w())+" "+c},n("i.fa-2x.dtc.v-mid",{class:S(i.cameraIcn)}))),n(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(o(),(function(e){return n(pe,{src:U(e.path,e.dataUrl),style:s()},n(".absolute.top-0.right-0.child",n(Q,{title:"Remove "+e.name,icon:i.deleteIcn,onclick:Ye(o,e.guid)})))})))]};return a}();var $e=function(){function a(){this.dragging=t(false)}a.prototype.view=function(t){var a=t.attrs,r=a.field,o=a.value;var s=e.head(o());var c=r.classes,u=c===void 0?"":c;return n(Ee,{field:r,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Ve(o,i.imageMaxSize,true)},n(".relative.w-100.pa1.contain.dt.tc",{class:(this.dragging()?x():w())+" "+u},s?[n("img.img.contain",{title:s.name,src:U(s.path,s.dataUrl),style:l()}),n(".absolute.top-0.right-0.pa1.pointer.dim",{title:"Remove "+s.name,onclick:Ye(o,s.guid)},n("i.pa1",{class:S(i.cancelIcn)}))]:n("i.fa-2x.dtc.v-mid",{class:S(i.cameraIcn)})))};return a}();var Ge=function(){function t(){}t.prototype.oncreate=function(t){var n=this;var r=t.dom;var i=r.children[0];var o=D();this.signaturePad=new a(i,{minWidth:.5*o,maxWidth:1.5*o});var l=function(){var e=D();i.width=i.offsetWidth*e;i.height=i.offsetHeight*e;var t=i.getContext("2d");t.scale(e,e);n.resetCanvas()};this.resizeHandler=e.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()};t.prototype.onremove=function(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)};t.prototype.view=function(e){var t=this;var a=e.attrs,r=a.style,o=a.onSet,l=a.onCancel;return[n(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:r},n("canvas.aspect-ratio--object")),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(Q,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:function(){if(!t.signaturePad.isEmpty()){o(t.signaturePad.toDataURL("image/png"))}}}),n(Q,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return t.resetCanvas()}}),n(Q,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:l})])]};t.prototype.resetCanvas=function(){this.signaturePad.clear()};return t}();function Je(e,t){var n=i.signMaxSize;var a=.01*t*n;return $(e,n,a,i.signFont)}function Ke(e,t){return function(){return t(Je(i.stampSetTxt,e))}}var Qe=function(){function e(){}e.prototype.view=function(e){var t=e.attrs,a=t.heightPct,r=t.onSet;return[n("span.clip",{style:{"font-family":i.signFont}},i.stampSetTxt),n(Q,{label:i.stampTxt,classes:"w-100",onclick:Ke(a,r)})]};return e}();function Xe(e,t,n){return function(){if(e()){n(Je(e(),t))}return false}}var et=function(){function e(){this.text=t("")}e.prototype.oncreate=function(e){var t=e.dom;var n=t.children[0];n.focus({preventScroll:false});this.scaleText(t)};e.prototype.onupdate=function(e){var t=e.dom;this.scaleText(t)};e.prototype.view=function(e){var t=this;var a=e.attrs,r=a.heightPct,o=a.style,l=a.onSet,s=a.onCancel;return[n("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:o,onsubmit:Xe(this.text,r,l)},n("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:A(this.text),value:this.text(),style:{"font-family":i.signFont}})),n(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[n(Q,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:Xe(this.text,r,l)}),n(Q,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:function(){return t.text("")}}),n(Q,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]};e.prototype.scaleText=function(e){var t=e.clientHeight;e.style.fontSize=.56*t+"px"};return e}();function tt(e,t){return new Promise((function(n){var a=new Image;a.onload=function(){var e=document.createElement("canvas");var r=Y(a.width,a.height,t),i=r[0],o=r[1];e.width=i;e.height=o;var l=e.getContext("2d");l.drawImage(a,0,0,i,o);n(e.toDataURL())};a.src=e}))}function nt(e,t,a){return function(r){return tt(r,a).then((function(a){var r=L(E(a),"sign-"+t+".png");e([{guid:q(),name:r.name,path:"not_set",file:r,dataUrl:a}]);n.redraw()}))}}var at=function(){function t(){}t.prototype.oninit=function(e){var t=this;var n=e.attrs.value;n.map((function(){return t.component=undefined}))};t.prototype.view=function(t){var a=this;var r=t.attrs,o=r.field,l=r.value;var s=o,c=s.label,u=s.id,d=s.readonly,f=s.disabled,p=s.classes,v=p===void 0?"":p,m=s.containerClass,h=s.options,g=h===void 0?i.signOpts:h,b=s.heightPct,y=b===void 0?i.signHeightPct:b;var x={paddingBottom:y+"%"};var I=e.head(l());var k=e(g).map((function(e){var t=e.value;if(t==="draw"){return{component:Ge,icon:S(i.drawIcn),label:i.signDrawTxt}}else if(t==="type"){return{component:et,icon:S(i.typeIcn),label:i.signTypeTxt}}else if(t==="stamp"){return{component:Qe,icon:S(i.stampIcn),label:i.signStampTxt}}return null})).compact().value();if(k.length===1&&!I){this.component=k[0].component}return n(".relative",{class:m},[O(u,c),d||f?n(".aspect-ratio",{id:u,class:v,style:x},I?n(".aspect-ratio--object",n("img.img.w-100.absolute",{src:U(I.path,I.dataUrl)})):null):this.component?n(this.component,{heightPct:y,style:x,onSet:nt(l,u,i.signMaxSize),onCancel:function(){return a.component=undefined}}):n(".aspect-ratio.pointer",{id:u,class:w()+" "+v,style:x},I?n(".aspect-ratio--object.hide-child.dim",{onclick:function(){return l([])}},[n("img.img.w-100.absolute",{src:U(I.path,I.dataUrl)}),n(".pa3.absolute.top-0.right-0.child",n("i.fa-2x",{class:S(i.resetIcn)}))]):n(".aspect-ratio--object.flex.items-stretch.justify-center",e.map(k,(function(e){var t=e.component,r=e.icon,i=e.label;return n(".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:function(){return a.component=t}},n("i.fa-2x.ma1",{class:r}),n("span.ma1",i))}))))])};return t}();export{K as Badge,xe as BaseInput,ae as BaseText,Q as Button,X as ButtonLink,Fe as CardDateInput,se as Checkbox,_e as CheckboxInput,Ie as CurrencyInput,Be as DateInput,fe as FileList,We as FileMulti,Ne as FileSelect,ve as ImageList,Ze as ImageMulti,me as ImagePreview,$e as ImageSelect,we as Label,oe as Link,ee as NavButton,te as NavLink,qe as PasswordInput,ye as PasswordStrength,Oe as RadioInput,ze as SelectInput,de as SelectText,at as SignBuilder,De as TextareaInput,ue as Toggle,Me as ToggleInput,ne as Trusted,Ce as currencyStrToNumber,R as fileNameExtSplit,S as getIcon,q as guid,ie as iconMap,re as linkAttrs,Se as numberToCurrencyStr,Te as numberToCurrencyTuple,P as updateButtonContext,o as updateConfig,C as updateTheme};
