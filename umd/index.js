/* @preserve built on: 2021-10-01T13:36:23.432Z */
(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril"),require("mithril/stream"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril","mithril/stream","signature_pad"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiWidgets={},e._,e.m,e.m.stream,e.SignaturePad))})(this,(function(e,t,a,l,s){"use strict";function n(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var i=n(t);var r=n(a);var c=n(l);var u=n(s);const d={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",openFileTxt:"Open file",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-signature",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-check",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};const o=d;function f(e){i["default"].assign(d,e)}function p(){return{"max-height":o.imageDispHeight}}function m(){return{"max-height":o.thumbDispHeight}}const h={"max-width":"5.4ex"};const g={"max-width":"9ex"};const b={wrapper:"pa0 bn",label:"f6 silver",inputWrapper:"dark-gray",input:"h2 dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40",invalidInputWrapper:""};const y=b;function v(e){i["default"].assign(b,e)}const x={default:"bg-light-blue dark-gray"};function w(e){i["default"].assign(x,e)}function I(e="default"){if(e&&e in x){return x[e]}else{return""}}function $({wrapper:e="",merge:t=true},a){return`${e} ${t?y.wrapper:""} ${a?y.disabledWrapper:""}`}function k({label:e="",merge:t=true},a){return`${e} ${t?y.label:""} ${a?y.requiredLabel:""}`}function T({inputWrapper:e="",merge:t=true},a){return`${e} ${t?y.inputWrapper:""} ${a?y.invalidInputWrapper:""}`}function S({input:e="",merge:t=true}){return`${e} ${t?y.input:""}`}function C(e,t,a){return`${S(e)} ${U(t,a)}`}function P({input:e="",merge:t=true}){return`${e} ${t?y.textarea:""}`}function q({input:e="",merge:t=true},a,l,s){return`${e} ${t?y.radio:""} ${a?y.radioChecked:y.radioUnchecked} ${U(l,s)}`}function D(e){return`${y.fileInput} ${e?y.fileHover:""}`}function U(e,t){return e||t?"":"pointer"}function F(e){return(e+256).toString(16).substr(1)}function M(){const e=new Uint8Array(16);const t=window.crypto;t.getRandomValues(e);return[F(e[0]),F(e[1]),F(e[2]),F(e[3]),"-",F(e[4]),F(e[5]),"-",F(e[6]),F(e[7]),"-",F(e[8]),F(e[9]),"-",F(e[10]),F(e[11]),F(e[12]),F(e[13]),F(e[14]),F(e[15])].join("")}function L(){return Math.max(window.devicePixelRatio,1)}function O(e,t){return t?`${e}${o.requiredLblPost}`:e}function A(e,t){return t?t:e}function E(e){return e?r["default"]("span.mr2.truncate",{title:e,class:y.displayLabel},e):null}function z(e,t,a,l){return a?r["default"]("label.mb1.db",{title:a,for:e,class:k(t,l)},O(a,l)):null}function B(e,t,a){return[e?r["default"]("i.fa-fw",{class:`${t?"mr2":""} ${e}`}):null,t,a?r["default"]("i.fa-fw",{class:`${t?"ml2":""} ${a}`}):null]}function R(e){return function({target:{value:t}}){e(t)}}function N(e){return function({target:{checked:t}}){e(t)}}function j(e,t,a){switch(e){case"dd":return(isNaN(t)||t<=3)&&((isNaN(a)||t===3&&a<=1||t<3)&&!(t===0&&a===0));case"mm":return(isNaN(t)||t<=1)&&((isNaN(a)||t===1&&a<=2||t<1)&&!(t===0&&a===0));case"yyyy":return(isNaN(t)||t>=1&&t<3)&&(isNaN(a)||t===1&&a===9||t===2);case"yy":return isNaN(t)||t>=0}}function W(e,t,a){t.map(t=>{const l=t?"":`${a}`;e.setCustomValidity(l)})}function H(e,t){e.map(e=>{if(e!==t()){t(e)}})}function _(e,t,a,l,s){const n=parseInt(t.getAttribute("maxlength"));if(l.length===n&&a){const t=s.querySelector(`#${e}-${a}`);t.focus()}}function V(e,t,a,l,s){const n=l.querySelector(`#${t}-${a}`);const i=e()?e():"";const r=n.value;const c=/^\d*$/.test(r);const u=parseInt(r.charAt(0));const d=parseInt(r.charAt(1));const o=j(a,u,d);if((c||r==="")&&o){e(r)}else{e(i)}_(t,n,s,e(),l)}function Y(e){const t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function G(e){const t=e.split(",");const a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);const l=t[0].split(":")[1].split(";")[0];const s=a.length;const n=new Uint8Array(s);for(let e=0;e<s;e++){n[e]=a.charCodeAt(e)}return new Blob([n],{type:l})}function Z(e,t){const a=(new Date).valueOf();const l=e;l.name=t;l.lastModified=a;return e}function J(e,t,a){const l=Z(G(e),t);return{guid:M(),name:l.name,path:"not_set",file:l,dataUrl:e,metadata:a}}function K(e){const[,t]=Y(e.name);switch(t.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return o.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return o.videoFileIcn;case".pdf":return o.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return o.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return o.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return o.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return o.imageIcn;default:return o.fileIcn}}function Q(e){return e&&e.includes("image")}function X(e){const t=Math.min(e.byteLength,64*1024);const a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}const l=a.byteLength;let s=2;while(s<l){const e=a.getUint16(s,false);s+=2;if(e===65505){s+=2;if(a.getUint32(s,false)!==1165519206){return-1}s+=6;const e=a.getUint16(s,false)===18761;s+=a.getUint32(s+4,e);const t=a.getUint16(s,e);s+=2;for(let l=0;l<t;l++){if(a.getUint16(s+l*12,e)===274){return a.getUint16(s+l*12+8,e)}}}else if((e&65280)!==65280){break}else{s+=a.getUint16(s,false)}}return-1}function ee(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>{t(a.result)};a.readAsArrayBuffer(e)})}function te(e){return ee(e).then(X)}function ae(e,t,a,l){if(!l||l>8){return}switch(l){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function le(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function se(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return te(e).then(l=>new Promise(s=>{const n=new Image;n.onload=()=>{const e=document.createElement("canvas");const[i,r]=le(n.width,n.height,t);if(l>4){e.width=r;e.height=i}else{e.width=i;e.height=r}const c=e.getContext("2d");ae(c,i,r,l);c.drawImage(n,0,0,i,r);s(e.toDataURL(a))};const i=new FileReader;i.onload=()=>n.src=i.result;i.readAsDataURL(e)}))}function ne(e,t){return new Promise(a=>{const l=new Image;l.onload=()=>{const e=document.createElement("canvas");const[s,n]=le(l.width,l.height,t);e.width=s;e.height=n;const i=e.getContext("2d");i.drawImage(l,0,0,s,n);a(e.toDataURL())};l.src=e})}function ie(e,t,a,l){const s=document.createElement("canvas");s.width=t;s.height=a;const n=.56*s.height;const i=s.getContext("2d");i.textBaseline="middle";i.font=`${n}px ${l}`;i.fillText(e,s.height*.05,n);return s.toDataURL()}function re(e,t){const a=o.signMaxSize;const l=.01*t*a;return ie(e,a,l,o.signFont)}class ce{view({attrs:{label:e,classes:t="bg-red"},children:a}){return r["default"](".relative.dib",[a,e?r["default"]("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:t,style:{minWidth:"0.65rem"}},e):null])}}class ue{view({attrs:{label:e,type:t="button",title:a=e,icon:l,rightIcon:s,context:n,classes:i="",disabled:c,style:u,onclick:d}}){return r["default"]("button.button-reset",{type:t,title:a,disabled:c,class:`${i} ${c?y.disabledWrapper:"pointer"} ${I(n)} ${y.button}`,style:u,onclick:d},B(l,e,s))}}class de{view({attrs:{label:e,title:t=e,icon:a,rightIcon:l,href:s,rel:n,target:i,download:c,context:u,classes:d="",style:o}}){return r["default"]("a.link.flex.items-center",{href:s,rel:n,target:i,download:c,title:t,class:`${d} ${I(u)} ${y.button}`,style:o},B(a,e,l))}}class oe{view({attrs:{label:e,title:t=e,icon:a,rightIcon:l,classes:s="",disabled:n,style:i,onclick:c}}){return r["default"](".mh2.pa2.truncate",{title:t,disabled:n,class:`${s} ${n?y.disabledWrapper:"pointer"} ${y.navButton}`,style:i,onclick:c},B(a,e,l))}}class fe{view({attrs:{label:e,title:t=e,icon:a,rightIcon:l,href:s,rel:n,target:i,download:c,classes:u="",style:d}}){return r["default"]("a.link.mh2.pa2.truncate",{href:s,rel:n,target:i,download:c,title:t,class:`${u} ${y.navButton}`,style:d},B(a,e,l))}}class pe{view({attrs:{field:{style:e},value:t}}){return r["default"](".pa2",{style:e},r["default"].trust(t()))}}class me{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:s}=e;return r["default"](".pa2.flex.flex-wrap",{class:$(l),style:s},[E(a),r["default"]("span.ws-normal",{title:t(),class:y.displayValue},t())])}}class he{formatter(e){return e?new Date(String(e)).toLocaleDateString():e}oninit({attrs:{value:e}}){this.formatted=e.map(this.formatter)}onremove(){this.formatted.end(true)}view({attrs:{field:e}}){return r["default"](me,{field:e,value:this.formatted})}}function ge(e,t){if(e==="email"){return{href:`mailto:${t}`,class:y.displayValue}}else if(e==="tel"){return{href:`tel:${t}`,class:y.displayValue}}else{return{href:t,target:"_blank",class:y.displayValue}}}const be={email:o.emailIcn,tel:o.telIcn};class ye{view({attrs:{field:e,value:t}}){const{label:a,type:l="url",uiClass:s={},style:n}=e;return r["default"](".pa2.flex.flex-wrap",{class:$(s),style:n},[E(a),r["default"]("a.link.dim.pointer.ws-normal",ge(l,t()),r["default"]("i.mr2",{class:be[l]||o.linkIcn}),t())])}}class ve{view({attrs:{field:e,value:t}}){const{options:a=[]}=e;const l=i["default"].find(a,i["default"].matches({value:t()||false}));return l?r["default"]("span.ml2",l.label):null}}class xe{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:s}=e;return r["default"](".pa2.flex.items-center",{class:$(l),style:s},[E(a),r["default"]("i",{class:`${y.displayValue} ${o[t()?this.onIcon:this.offIcon]}`}),r["default"](ve,{field:e,value:t})])}}class we extends xe{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}function Ie(e,t){if(e.required){return!t}return false}function $e(e,t){if(e.required){return t.length<1}return false}function ke(e){return t=>{t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function Te(e){return t=>{t.preventDefault();e(false)}}function Se(e,t){return a=>{a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function Ce(e){return({target:{files:t}})=>e(t)}class Pe{oncreate({dom:e,attrs:{value:t}}){t.map(t=>{if(t.length===0){e.firstChild.value=""}})}view({attrs:{field:e,defaultAccept:t="*",multiple:a=true,dragging:l,onSet:s},children:n}){const{label:c,id:u,name:d=u,title:o=c,required:f,readonly:p,disabled:m,autofocus:h,accept:g=t,uiClass:b={}}=e;return r["default"]("label.db",i["default"].extend({for:u,title:o,class:U(m,p),"data-input-id":u},m||p?{}:{ondragover:ke(l),ondragleave:Te(l),ondrop:Se(l,s)}),[r["default"]("input.clip[type=file].bg-transparent.bn.outline-0",{id:u,name:d,multiple:a,accept:g,required:f,autofocus:h,disabled:m||p,onchange:Ce(s)}),c?r["default"]("span.db.mb1",{class:k(b,f)},O(c,f)):null,n])}}function qe(e,t=false){return a=>{const l=t?[]:e();i["default"].each(a,e=>{l.push({guid:M(),name:e.name,path:"not_set",file:e})});e(l)}}function De(e,t){return a=>{a.preventDefault();const l=e();i["default"].remove(l,{guid:t});e(l)}}class Ue{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const{disabled:a,uiClass:l={}}=e;return r["default"]("fieldset",{class:$(l,a)},[r["default"](Pe,{field:e,dragging:this.dragging,onSet:qe(t),value:t},r["default"]("div",{class:T(l,$e(e,t()))},r["default"](".pa2",{class:D(this.dragging())},[r["default"]("i.mr2",{class:o.uploadIcn}),r["default"]("span",o.addFilesTxt)]))),r["default"](".flex.flex-column.mt1.nb1",i["default"].map(t(),e=>r["default"]("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[r["default"]("i.mr2",{class:o.downloadIcn}),e.name,r["default"]("i.child.fr",{title:`${o.remFileTtl} ${e.name}`,class:o.deleteIcn,onclick:De(t,e.guid)})])))])}}class Fe{view({children:e,attrs:t}){return r["default"](".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[t.src&&t.src!=="not_set"?r["default"]("img.contain",{src:t.src}):null,t.data&&t.data.file&&(t.src==="not_set"||!t.src)?r["default"]("div.contain.tc.br5.6rem",{class:`${K(t.data)} fa-2x`,tooltip:t.data.file.type}):null,e])}}class Me{view({attrs:e}){return r["default"]("i.pa1",{class:K(e),title:o.openFileTxt,onclick:e.path!=="not_set"?()=>window.open(e.path,"_blank"):undefined})}}class Le{view({attrs:{displayType:e="thumbnail",value:t}}){return e==="thumbnail"?r["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(t(),e=>r["default"](Fe,{src:A(e.path,e.dataUrl),data:e,style:m()},r["default"](".absolute.top-0.right-0.child",r["default"](ue,{title:`Remove ${e.name}`,icon:o.deleteIcn,onclick:De(t,e.guid)}))))):r["default"](".pa2.flex.flex-column",i["default"].map(t(),e=>r["default"](".flex.items-center.pa1.ba.b--black-20",[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",{title:e.name},e.name),r["default"](Me,e),r["default"]("i.pa1.pointer.dim",{title:`Remove ${e.name}`,class:o.cancelIcn,onclick:De(t,e.guid)})])))}}class Oe{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:s}=e;const n=i["default"].find(e.options,{value:t()});const c=n?n.label||n.value:t();return r["default"](".pa2.flex.flex-wrap",{class:$(l),style:s},[E(a),r["default"]("span.ws-normal",{title:c,class:y.displayValue},c)])}}class Ae{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:s}=e;return r["default"](".pa2.flex.flex-column",{class:$(l),style:s},[E(a),r["default"](".flex.flex-column.mt1.nb1",i["default"].map(t(),({name:e,path:t})=>r["default"]("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:y.displayValue,href:t},r["default"]("i.mr2",{class:o.downloadIcn}),e)))])}}class Ee{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:s}=e;return r["default"](".pa2.flex.flex-column",{class:$(l),style:s},[E(a),r["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(t(),({name:e,path:t,dataUrl:a})=>r["default"](Fe,{title:e,src:A(t,a),style:m()})))])}}class ze{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:s}=e;const n=i["default"].head(t());return r["default"](".pa2.flex.flex-column",{class:$(l),style:s},[E(a),n?r["default"]("img.img.h-100.mt2.contain.self-center",{title:n.name,src:A(n.path,n.dataUrl),style:p()}):r["default"]("i.mt2",{class:`${y.displayValue} ${o.imageIcn}`})])}}function Be(e,t){return(e.match(t)||[]).length}function Re(e){let t=0;if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(Be(e,/[A-Z]/g)>1&&Be(e,/[a-z]/g)>2){t=t+1}if(Be(e,/[\d]/g)>1){t=t+1}if(Be(e,/[!"£%^@#$&*]/g)>0){t=t+1}}return t}function Ne(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}const je=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];class We{oninit({attrs:{value:e}}){this.passwordScore=e.map(e=>Re(String(e)))}onremove(){this.passwordScore.end()}view({attrs:{field:e}}){const{label:t,style:a}=e;return r["default"](".flex.flex-column",{style:a},[E(t),r["default"](".flex.mt1",i["default"].map(je,e=>r["default"](".h1.w-20",{class:this.passwordScore()>=e.value?e.background:"bg-transparent"}))),r["default"]("span.f5.truncate",Ne(this.passwordScore()))])}}class He{view({attrs:{field:{label:e="",title:t=e,required:a}}}){return r["default"]("label.mb2",{title:t},O(e,a))}}class _e{view({attrs:{field:e,value:t,xform:a=t}}){const{label:l,id:s,type:n="text",name:i=s,title:c=l,placeholder:u,max:d,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:y,autocomplete:v,pattern:x,inputmode:w,spellcheck:I,instant:k,uiClass:C={}}=e;return r["default"]("fieldset",{class:n==="hidden"?"clip":$(C,b)},[z(s,C,l,h),r["default"]("div",{class:T(C,Ie(e,a()))},r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:s,type:n,name:i,title:c,placeholder:u,max:d,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:y,autocomplete:v,pattern:x,inputmode:w,spellcheck:I,class:S(C),value:a(),[k?"oninput":"onchange"]:R(t)}))])}}class Ve{constructor(){this.selected=c["default"](false);this.focusIn=()=>{this.selected(true)};this.focusOut=()=>{if(!this.value()){this.selected(false)}}}oninit({attrs:{value:e}}){this.selected.map(r["default"].redraw);this.value=e}oncreate({dom:e}){this.inputEl=e.querySelector("input");this.inputEl.addEventListener("focusin",this.focusIn);this.inputEl.addEventListener("focusout",this.focusOut)}onremove(){this.inputEl.removeEventListener("focusin",this.focusIn);this.inputEl.removeEventListener("focusout",this.focusOut)}view({attrs:{field:e,value:t,xform:a=t}}){const{label:l,id:s,type:n="text",name:i=s,title:c=l,disabled:u,instant:d,uiClass:o={}}=e;return r["default"](".relative",{class:n==="hidden"?"clip":$(o,u),style:{pointerEvents:"none"}},[r["default"]("label.absolute.db.top-0.left-0",{title:l,style:{transform:this.selected()?"translate(-8px, -16px) scale(0.8)":"translate(14px, 16px) scale(1)",transition:`transform ${this.selected()?"0.3s":"0.4s"} ease-in-out, opacity 0.4s ease-in-out`,opacity:this.selected()?1:.6}},l),r["default"]("div",r["default"]("input.w-100.bg-transparent.bn.outline-0.static.h-100",Object.assign(Object.assign({},e),{name:i,title:c,class:S(o),[d?"oninput":"onchange"]:R(t),style:{padding:"16.5px 14px",pointerEvents:"auto"}})),r["default"]("fieldset.absolute",{class:T(o,Ie(e,a())),style:{top:"-5px",inset:"-11px 0 0",padding:"0 8px"}},r["default"]("legend.db.pa0.w-auto",{style:{visibility:"hidden",maxWidth:this.selected()?"100%":"0.01px",height:"0.8em",fontSize:"0.8em",transition:`max-width ${this.selected()?"0.4s":"0.3s"} ease-in-out`}},l)))])}}class Ye{view({attrs:e}){const{labelStyle:t="external"}=e;return t==="external"?r["default"](_e,e):r["default"](Ve,e)}}class Ge{view({attrs:{field:e,value:t,xform:a=t}}){const{label:l,id:s,name:n=s,title:c=l,placeholder:u,max:d,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:y,autocomplete:v,pattern:x,inputmode:w,spellcheck:I,instant:k,uiClass:C={},options:P}=e;const q=P&&P.length?P[0].value:"$";return r["default"]("fieldset.flex-shrink-0",{class:$(C,b)},[z(s,C,l,h),r["default"](".flex.items-center",{class:T(C,Ie(e,a()))},r["default"]("span.mr1",q),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:s,type:"text",name:n,title:c,placeholder:u,max:d,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:y,autocomplete:v,pattern:x,inputmode:w,spellcheck:I,class:S(C),value:i["default"].isUndefined(a())?null:Ke(Ze(a())),[k?"oninput":"onchange"]:Xe(t)}))])}}function Ze(e){return i["default"].isString(e)?i["default"].parseInt(e):Number(e)}function Je(e){const t=e.replace(/[^\d.]/g,"");let a;let l=0;if(t.indexOf(".")>-1){const e=t.indexOf(".");const s=t.substring(0,e);a=i["default"].parseInt(i["default"].padStart(s,1,"0"));const n=t.substring(e+1,Math.min(e+3,t.length));l=i["default"].parseInt(i["default"].padEnd(n,2,"0"))}else{a=i["default"].parseInt(t)||0}return a*100+l}function Ke(e){const t=Qe(e);if(t){return`${t[0]}.${t[1]}`}else{return t}}function Qe(e){if(!i["default"].isFinite(e)){return undefined}const t=String(Math.abs(e));let a="0";let l="";if(t.length>2){const e=t.length-2;a=t.substring(0,e);l=t.substring(e)}else{l=i["default"].padStart(t,2,"0")}return[a,l]}function Xe(e){return({target:{value:t}})=>e(Je(t))}class et{constructor(){this.month=c["default"]();this.year=c["default"]();this.valid=c["default"].lift((e,t)=>t.length===2&&e.length===2,this.month,this.year);this.date=c["default"].lift((e,t,a)=>a?`${e}/${t}`:"",this.month,this.year,this.valid)}oninit({attrs:{value:e}}){e.map(e=>{const[t,a=""]=String(e).split("/");t.length===2&&this.month(t);a.length===2&&this.year(a)});H(this.date,e)}oncreate({dom:e}){const t=e.querySelector("input");W(t,this.valid,"Invalid Date");this.dom=e}onremove(){this.date.end(true);this.year.end(true);this.month.end(true)}view({attrs:{field:e,value:t}}){const{label:a,id:l,name:s=l,title:n=a,required:i,readonly:c,disabled:u,uiClass:d={}}=e;const o=S(d);return r["default"]("fieldset",{class:$(d,u)},[z(`${l}-mm`,d,a,i),r["default"]("div",{title:n,class:T(d,Ie(e,t()))},[r["default"]("div.dib.mr2",[z(`${l}-mm`,d,"Month"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-mm`,name:`${s}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:u,value:this.month(),class:o,style:h,oninput:()=>V(this.month,l,"mm",this.dom,"yy")})]),r["default"]("span.mr2","/"),r["default"]("div.dib.mr2",[z(`${l}-yy`,d,"Year"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-yy`,name:`${s}-yy`,type:"text",placeholder:"YY",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:u,value:this.year(),class:o,style:h,oninput:()=>V(this.year,l,"yy",this.dom)})])])])}}class tt{constructor(){this.day=c["default"]();this.month=c["default"]();this.year=c["default"]();this.valid=c["default"].lift((e,t,a)=>{const l=parseInt(a);const s=parseInt(t)-1;const n=parseInt(e);const i=new Date(l,s,n);return i.getFullYear()===l&&a.length===4&&i.getMonth()===s&&i.getDate()===n&&e.length===2&&t.length===2},this.day,this.month,this.year);this.date=c["default"].lift((e,t,a,l)=>l?`${a}-${t}-${e}`:"",this.day,this.month,this.year,this.valid)}oninit({attrs:{value:e}}){e.map(e=>{const t=new Date(String(e));if(i["default"].isDate(t)&&!isNaN(t.getTime())){this.day(i["default"].padStart(String(t.getDate()),2,"0"));this.month(i["default"].padStart(String(1+t.getMonth()),2,"0"));this.year(String(t.getFullYear()))}});H(this.date,e)}oncreate({dom:e}){const t=e.querySelector("input");W(t,this.valid,"Invalid Date");this.dom=e}onremove(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)}view({attrs:{field:e,value:t}}){const{label:a,id:l,name:s=l,title:n=a,required:i,readonly:c,disabled:u,uiClass:d={},options:o}=e;const f=o&&o.length?o[0].value:"en-GB";const p=f==="en-US";const m=S(d);const b=r["default"](".dib.mr2",[z(`${l}-dd`,d,"Day"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-dd`,name:`${s}-dd`,type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:u,value:this.day(),oninput:()=>V(this.day,l,"dd",this.dom,p?"yyyy":"mm"),class:m,style:h})]);const y=r["default"](".dib.mr2",[z(`${l}-mm`,d,"Month"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-mm`,name:`${s}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:u,value:this.month(),oninput:()=>V(this.month,l,"mm",this.dom,p?"dd":"yyyy"),class:m,style:h})]);const v=r["default"](".dib.mr2",[z(`${l}-yyyy`,d,"Year"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-yyyy`,name:`${s}-yyyy`,type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:u,value:this.year(),oninput:()=>V(this.year,l,"yyyy",this.dom),class:m,style:g})]);return r["default"]("fieldset",{class:$(d,u)},[z(l,d,a,i),r["default"]("div",{id:l,title:n,class:T(d,Ie(e,t())||!this.valid())},p?[y,b,v]:[b,y,v])])}}class at{constructor(){this.showPassword=c["default"](false)}view({attrs:{field:e,value:t}}){const{label:a,id:l,name:s=l,title:n=a,placeholder:i,maxlength:c,minlength:u,required:d,readonly:f,disabled:p,autofocus:m,autocomplete:h,pattern:g,inputmode:b,instant:y,uiClass:v={}}=e;return r["default"]("fieldset",{class:$(v,p)},[z(l,v,a,d),r["default"]("div.w-100.flex.items-center",{class:T(v,Ie(e,t()))},r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:l,name:s,title:n,placeholder:i,type:this.showPassword()?"text":"password",maxlength:c,minlength:u,required:d,readonly:f,disabled:p,autofocus:m,autocomplete:h,pattern:g,inputmode:b,class:S(v),value:t(),autocorrect:"off",[y?"oninput":"onchange"]:R(t)}),r["default"]("i.ml1.pa1.fa-fw.pointer.dim",{title:o.showPassTxt,class:this.showPassword()?o.hidePassIcn:o.showPassIcn,onclick:()=>this.showPassword(!this.showPassword())}))])}}class lt{view({attrs:{field:e,value:t}}){const{label:a,id:l,name:s=l,title:n=a,placeholder:i,required:c,readonly:u,disabled:d,autofocus:o,autocomplete:f,spellcheck:p,instant:m,uiClass:h={}}=e;return r["default"]("fieldset.flex.flex-column.h-100.w-100",{class:$(h,d)},[z(l,h,a,c),r["default"](".h-100",{class:T(h,Ie(e,t()))},r["default"]("textarea.w-100.bg-transparent.bn.outline-0.h-100",{id:l,name:s,title:n,placeholder:i,required:c,readonly:u,disabled:d,autofocus:o,autocomplete:f,spellcheck:p,class:P(h),value:t(),style:{resize:"none"},[m?"oninput":"onchange"]:R(t)}))])}}class st{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:t}}){const{label:a="",id:l,name:s=l,title:n=a,required:i,readonly:c,disabled:u,autocomplete:d,uiClass:f={}}=e;return r["default"]("fieldset",{class:$(f,u)},r["default"]("div",{class:T(f)},[r["default"]("label.flex.items-center",{title:n,class:C(f,u,c),"data-input-id":l},r["default"]("input.clip[type=checkbox]",{id:l,name:s,checked:t(),required:i,autocomplete:d,disabled:u||c,onchange:N(t)}),r["default"]("i.mr2",{class:o[t()?this.onIcon:this.offIcon]}),O(a,i),r["default"](ve,{field:e,value:t}))]))}}class nt extends st{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}class it{view({attrs:{field:e,value:t}}){const{label:a,id:l,name:s=l,required:n,readonly:c,disabled:u,autocomplete:d,options:o,uiClass:f={}}=e;return r["default"]("fieldset",{class:$(f,u)},[z(l,f,a,n),r["default"]("div",{class:T(f,Ie(e,t())),onchange:R(t)},i["default"].map(o,({value:e,label:a=e,icon:i})=>{const o=t()===e;return r["default"]("label.dib",{title:a,class:q(f,o,u,c),"data-input-id":l},r["default"]("input.clip[type=radio]",{name:s,value:e,checked:o,required:n,autocomplete:d,disabled:u||c}),i?r["default"]("i.fa-fw",{class:i}):a)}))])}}class rt{view({attrs:{field:e,value:t}}){const{label:a,id:l,name:s=l,title:n=a,required:c,readonly:u,disabled:d,autofocus:o,autocomplete:f,uiClass:p={},options:m}=e;return r["default"]("fieldset",{class:$(p,d)},[z(l,p,a,c),r["default"]("div",{class:T(p,Ie(e,t()))},r["default"]("select.w-100.bg-transparent.bn.outline-0",{id:l,name:s,title:n,required:c,readonly:u,disabled:d,autofocus:o,autocomplete:f,class:S(p),value:t(),onchange:R(t)},i["default"].map(m,({value:e,label:t=e})=>r["default"]("option",{value:e,disabled:d||u},t))))])}}class ct{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t,displayType:a}}){const l=i["default"].head(t());const{disabled:s,uiClass:n={}}=e;const c=a==="none"||!l?o.addFileTxt:l.name;return r["default"]("fieldset",{class:$(n,s)},r["default"](Pe,{field:e,multiple:false,dragging:this.dragging,onSet:qe(t,true),value:t},r["default"]("div",{class:T(n,$e(e,t()))},r["default"](".flex.items-center.pa1",{class:D(this.dragging())},[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",c),l&&a!=="none"?[r["default"](Me,l),r["default"]("i.pa1.pointer.dim",{title:`Remove ${l.name}`,class:o.cancelIcn,onclick:De(t,l.guid)})]:null]))))}}function ut(e,t,a=false){return l=>{const s=a?[]:e();return Promise.all(i["default"].map(l,e=>se(e,t,e.type).then(t=>{const a=Z(G(t),e.name);s.push({guid:M(),name:a.name,path:"not_set",file:a,dataUrl:t})}))).then(()=>{e(s);r["default"].redraw()})}}class dt{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const{disabled:a,uiClass:l={}}=e;return r["default"]("fieldset",{class:$(l,a)},[r["default"](Pe,{field:e,defaultAccept:"image/*",dragging:this.dragging,onSet:ut(t,o.imageMaxSize),value:t},r["default"]("div",{class:T(l,$e(e,t()))},r["default"](".w-100.pa1.dt.tc",{class:D(this.dragging())},r["default"]("i.fa-2x.dtc.v-mid",{class:o.cameraIcn})))),r["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(t(),e=>r["default"](Fe,{src:A(e.path,e.dataUrl),style:m()},r["default"](".absolute.top-0.right-0.child",r["default"](ue,{title:`Remove ${e.name}`,icon:o.deleteIcn,onclick:De(t,e.guid)})))))])}}class ot{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const a=i["default"].head(t());const{disabled:l,uiClass:s={}}=e;return r["default"]("fieldset",{class:$(s,l)},r["default"](Pe,{field:e,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:ut(t,o.imageMaxSize,true),value:t},r["default"]("div",{class:T(s,$e(e,t()))},r["default"](".pa1",{class:D(this.dragging())},r["default"](".relative.w-100.dt.tc",a?[r["default"]("img.img.contain",{title:a.name,src:A(a.path,a.dataUrl),style:p()}),r["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${a.name}`,onclick:De(t,a.guid)},r["default"]("i.pa1",{class:o.cancelIcn}))]:r["default"]("i.fa-2x.dtc.v-mid",{class:o.cameraIcn}))))))}}class ft{oncreate({dom:e}){const t=e.children[0];const a=L();this.signaturePad=new u["default"](t,{minWidth:.5*a,maxWidth:1.5*a});const l=()=>{const e=L();t.width=t.offsetWidth*e;t.height=t.offsetHeight*e;const a=t.getContext("2d");a.scale(e,e);this.resetCanvas()};this.resizeHandler=i["default"].debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()}onremove(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}view({attrs:{style:e,onSet:t,onCancel:a}}){return[r["default"](".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:e},r["default"]("canvas.aspect-ratio--object")),r["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[r["default"](ue,{title:o.applyTtl,icon:o.applyIcn,classes:"ma1",onclick:()=>{if(!this.signaturePad.isEmpty()){t(this.signaturePad.toDataURL("image/png"))}}}),r["default"](ue,{title:o.resetTtl,icon:o.resetIcn,classes:"ma1",onclick:()=>this.resetCanvas()}),r["default"](ue,{title:o.cancelTtl,icon:o.cancelIcn,classes:"ma1",onclick:a})])]}resetCanvas(){this.signaturePad.clear()}}function pt(e,t,a){return()=>{if(e()){a(re(e(),t),{text:e(),heightPct:t})}return false}}class mt{constructor(){this.text=c["default"]("")}oncreate({dom:e}){const t=e.children[0];t.focus({preventScroll:false});this.scaleText(e)}onupdate({dom:e}){this.scaleText(e)}view({attrs:{heightPct:e,style:t,onSet:a,onCancel:l}}){return[r["default"]("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:t,onsubmit:pt(this.text,e,a)},r["default"]("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:R(this.text),value:this.text(),style:{"font-family":o.signFont}})),r["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[r["default"](ue,{title:o.applyTtl,icon:o.applyIcn,classes:"ma1",onclick:pt(this.text,e,a)}),r["default"](ue,{title:o.resetTtl,icon:o.resetIcn,classes:"ma1",onclick:()=>this.text("")}),r["default"](ue,{title:o.cancelTtl,icon:o.cancelIcn,classes:"ma1",onclick:l})])]}scaleText(e){const t=e.clientHeight;e.style.fontSize=`${.56*t}px`}}function ht(e,t,a){return()=>a(re(t,e),{text:t,heightPct:e})}class gt{view({attrs:{heightPct:e,stampTxt:t,stampSetTxt:a,onSet:l}}){return[r["default"]("span.clip",{style:{"font-family":o.signFont}},a),r["default"](".flex",r["default"](ue,{label:t,classes:`flex-auto ${o.stampBtnClass}`,context:o.stampBtnContext,onclick:ht(e,a,l)}))]}}const bt={["draw"]:ft,["type"]:mt,["stamp"]:gt};function yt(e,t,a){return(l,s)=>ne(l,a).then(a=>{e([J(a,`sign-${t}.png`,s)]);r["default"].redraw()})}class vt{oninit({attrs:{value:e}}){this.valUpdate=e.map(()=>this.setSignType())}onremove(){this.valUpdate.end()}view({attrs:{field:e,value:t}}){const{label:a,id:l,readonly:s,disabled:n,uiClass:c={},options:u=o.signOpts,heightPct:d=o.signHeightPct,stampTxt:f=o.stampTxt,stampSetTxt:p=o.stampSetTxt}=e;const m={paddingBottom:`${d}%`};const h=i["default"].head(t());const g=i["default"](u).map(({value:e})=>{if(e==="draw"){return{type:e,icon:o.drawIcn,label:o.signDrawTxt}}else if(e==="type"){return{type:e,icon:o.typeIcn,label:o.signTypeTxt}}else if(e==="stamp"){return{type:e,icon:o.stampIcn,label:o.signStampTxt}}return null}).compact().value();if(g.length===1&&!h){this.setSignType(g[0].type)}return r["default"]("fieldset.relative",{class:$(c,n)},[z(l,c,a),r["default"]("div",{class:this.signType!=="stamp"?T(c,$e(e,t())):undefined},s||n?r["default"](".aspect-ratio",{id:l,style:m},h?r["default"](".aspect-ratio--object",{style:{"pointer-events":"none"}},r["default"]("img.img.w-100.absolute",{src:A(h.path,h.dataUrl)})):null):this.signType?r["default"](bt[this.signType],{heightPct:d,stampTxt:f,stampSetTxt:p,style:m,onSet:yt(t,l,o.signMaxSize),onCancel:i["default"].bind(this.setSignType,this,undefined)}):r["default"](".aspect-ratio.pointer",{id:l,class:y.fileInput,style:m},h?r["default"](".aspect-ratio--object.hide-child.dim",{onclick:i["default"].bind(t,this,[])},[r["default"]("img.img.w-100.absolute",{src:A(h.path,h.dataUrl)}),r["default"](".pa3.absolute.top-0.right-0.child",r["default"]("i.fa-2x",{class:o.resetIcn}))]):r["default"](".aspect-ratio--object.flex",i["default"].map(g,({type:e,icon:t,label:a})=>r["default"](".flex-auto.flex.items-center.justify-center.dim",{title:a,onclick:i["default"].bind(this.setSignType,this,e)},r["default"]("i.fa-2x.ma1",{class:t}),r["default"]("span.ma1.dn.db-ns.truncate",a))))))])}setSignType(e){this.signType=e}}function xt(e,t){return a=>{const l=t?[]:e();return Promise.all(i["default"].map(a,e=>{if(Q(e.type)){return se(e,o.imageMaxSize,e.type).then(t=>{const a=Z(G(t),e.name);l.push({guid:M(),name:a.name,path:"not_set",file:a,dataUrl:t})})}else{l.push({guid:M(),name:e.name,path:"not_set",file:e});return Promise.resolve()}})).then(()=>{e(l);r["default"].redraw()})}}class wt{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const a=i["default"].head(t());const{disabled:l,uiClass:s={}}=e;return r["default"]("fieldset",{class:$(s,l)},r["default"](Pe,{field:e,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:xt(t,true),value:t},r["default"]("div",{class:T(s,$e(e,t()))},r["default"](".flex.items-center.pa1",{class:D(this.dragging())},a?a.dataUrl?[r["default"](".relative.w-100.dt.tc",r["default"]("img.img.contain",{title:a.name,src:A(a.path,a.dataUrl),style:p()}),r["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${a.name}`,onclick:De(t,a.guid)},r["default"]("i.pa1",{class:o.cancelIcn})))]:[r["default"](Me,a),r["default"]("span.ma1.flex-auto",{title:a.name},a.name),r["default"]("i.pa1.pointer.dim",{title:`Remove ${a.name}`,class:o.cancelIcn,onclick:De(t,a.guid)})]:[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",o.addFileTxt)]))))}}class It{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t,displayType:a,showDisplay:l=true}}){const{disabled:s,uiClass:n={}}=e;return r["default"]("fieldset",{class:$(n,s)},[r["default"](Pe,{field:e,defaultAccept:"*",dragging:this.dragging,onSet:xt(t,false),value:t},r["default"]("div",{class:T(n,$e(e,t()))},r["default"](".flex.items-center.pa1.dt",{class:D(this.dragging())},[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",o.addFileTxt)]))),l?r["default"](Le,{displayType:a,value:t}):null])}}e.Badge=ce;e.BaseInput=Ye;e.BaseText=me;e.Button=ue;e.ButtonLink=de;e.CardDateInput=et;e.Checkbox=xe;e.CheckboxInput=st;e.CurrencyInput=Ge;e.DateInput=tt;e.DateText=he;e.DisplayTypeComponent=Le;e.FileList=Ae;e.FileMulti=Ue;e.FileSelect=ct;e.ImageList=Ee;e.ImageMulti=dt;e.ImagePreview=ze;e.ImageSelect=ot;e.Label=He;e.Link=ye;e.MultiOmniFileInput=It;e.NavButton=oe;e.NavLink=fe;e.OmniFileInput=wt;e.PasswordInput=at;e.PasswordStrength=We;e.RadioInput=it;e.SelectInput=rt;e.SelectText=Oe;e.SignBuilder=vt;e.TextareaInput=lt;e.Toggle=we;e.ToggleInput=nt;e.Trusted=pe;e.createStamp=re;e.currencyStrToNumber=Je;e.dataURItoBlob=G;e.dataUrlToFile=J;e.fileConstructor=Z;e.fileNameExtSplit=Y;e.getOrientation=X;e.guid=M;e.iconMap=be;e.linkAttrs=ge;e.numberToCurrencyStr=Ke;e.numberToCurrencyTuple=Qe;e.pxRatio=L;e.readArrayBuffer=ee;e.readOrientation=te;e.resizeImage=se;e.scaleDataUrl=ne;e.scaleRect=le;e.textToImage=ie;e.updateButtonContext=w;e.updateClasses=v;e.updateConfig=f;Object.defineProperty(e,"__esModule",{value:true})}));
