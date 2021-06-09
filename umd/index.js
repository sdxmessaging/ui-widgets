/* @preserve built on: 2021-06-09T12:44:05.632Z */
(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("lodash"),require("mithril"),require("mithril/stream"),require("signature_pad")):typeof define==="function"&&define.amd?define(["exports","lodash","mithril","mithril/stream","signature_pad"],t):(e=typeof globalThis!=="undefined"?globalThis:e||self,t(e.uiWidgets={},e._,e.m,e.m.stream,e.SignaturePad))})(this,(function(e,t,a,l,n){"use strict";function s(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var i=s(t);var r=s(a);var c=s(l);var d=s(n);const u={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",openFileTxt:"Open file",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-pen-nib",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-stamp",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};const o=u;function f(e){i["default"].assign(u,e)}function p(){return{"max-height":o.imageDispHeight}}function m(){return{"max-height":o.thumbDispHeight}}const h={"max-width":"5.4ex"};const g={"max-width":"9ex"};const b={wrapper:"pa0 bn",label:"f6 silver",inputWrapper:"dark-gray",input:"h2 dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40",invalidInputWrapper:""};const v=b;function y(e){i["default"].assign(b,e)}const w={default:"bg-light-blue dark-gray"};function x(e){i["default"].assign(w,e)}function I(e="default"){if(e&&e in w){return w[e]}else{return""}}function k({wrapper:e="",merge:t=true},a){return`${e} ${t?v.wrapper:""} ${a?v.disabledWrapper:""}`}function $({label:e="",merge:t=true},a){return`${e} ${t?v.label:""} ${a?v.requiredLabel:""}`}function T({inputWrapper:e="",merge:t=true},a){return`${e} ${t?v.inputWrapper:""} ${a?v.invalidInputWrapper:""}`}function S({input:e="",merge:t=true}){return`${e} ${t?v.input:""}`}function C(e,t,a){return`${S(e)} ${D(t,a)}`}function P({input:e="",merge:t=true}){return`${e} ${t?v.textarea:""}`}function q({input:e="",merge:t=true},a,l,n){return`${e} ${t?v.radio:""} ${a?v.radioChecked:v.radioUnchecked} ${D(l,n)}`}function U(e){return`${v.fileInput} ${e?v.fileHover:""}`}function D(e,t){return e||t?"":"pointer"}function F(e){return(e+256).toString(16).substr(1)}function M(){const e=new Uint8Array(16);const t=window.crypto||window.msCrypto;t.getRandomValues(e);return[F(e[0]),F(e[1]),F(e[2]),F(e[3]),"-",F(e[4]),F(e[5]),"-",F(e[6]),F(e[7]),"-",F(e[8]),F(e[9]),"-",F(e[10]),F(e[11]),F(e[12]),F(e[13]),F(e[14]),F(e[15])].join("")}function L(){return Math.max(window.devicePixelRatio,1)}function z(e,t){return t?`${e}${o.requiredLblPost}`:e}function B(e,t){return t?t:e}function A(e){return e?r["default"]("span.mr2.truncate",{title:e,class:v.displayLabel},e):null}function R(e,t,a,l){return a?r["default"]("label.mb1.db",{title:a,for:e,class:$(t,l)},z(a,l)):null}function O(e,t,a){return[e?r["default"]("i.fa-fw",{class:`${t?"mr2":""} ${e}`}):null,t,a?r["default"]("i.fa-fw",{class:`${t?"ml2":""} ${a}`}):null]}function j(e){return({target:{value:t}})=>e(t)}function H(e){return({target:{checked:t}})=>e(t)}function W(e){const t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function _(e){const t=e.split(",");const a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);const l=t[0].split(":")[1].split(";")[0];const n=a.length;const s=new Uint8Array(n);for(let e=0;e<n;e++){s[e]=a.charCodeAt(e)}return new Blob([s],{type:l})}function V(e,t){const a=(new Date).valueOf();const l=e;l.name=t;l.lastModified=a;return e}function E(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function Y(e){const t=Math.min(e.byteLength,64*1024);const a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}const l=a.byteLength;let n=2;while(n<l){const e=a.getUint16(n,false);n+=2;if(e===65505){if(a.getUint32(n+=2,false)!==1165519206){return-1}const e=a.getUint16(n+=6,false)===18761;n+=a.getUint32(n+4,e);const t=a.getUint16(n,e);n+=2;for(let l=0;l<t;l++){if(a.getUint16(n+l*12,e)===274){return a.getUint16(n+l*12+8,e)}}}else if((e&65280)!==65280){break}else{n+=a.getUint16(n,false)}}return-1}function N(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>{t(a.result)};a.readAsArrayBuffer(e)})}function Z(e){return N(e).then(Y)}function G(e,t,a,l){if(!l||l>8){return}switch(l){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function J(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return Z(e).then(l=>new Promise(n=>{const s=new Image;s.onload=()=>{const e=document.createElement("canvas");const[i,r]=E(s.width,s.height,t);if(l>4){e.width=r;e.height=i}else{e.width=i;e.height=r}const c=e.getContext("2d");G(c,i,r,l);c.drawImage(s,0,0,i,r);n(e.toDataURL(a))};const i=new FileReader;i.onload=()=>s.src=i.result;i.readAsDataURL(e)}))}function K(e,t,a,l){const n=document.createElement("canvas");n.width=t;n.height=a;const s=.56*n.height;const i=n.getContext("2d");i.textBaseline="middle";i.font=`${s}px ${l}`;i.fillText(e,n.height*.05,s);return n.toDataURL()}function Q(e){const[,t]=W(e.name);switch(t.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return o.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return o.videoFileIcn;case".pdf":return o.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return o.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return o.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return o.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return o.imageIcn;default:return o.fileIcn}}function X(e){return e&&e.includes("image")}class ee{view({attrs:{label:e,classes:t="bg-red"},children:a}){return r["default"](".relative.dib",[a,e?r["default"]("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:t,style:{minWidth:"0.65rem"}},e):null])}}class te{view({attrs:{label:e,type:t="button",title:a=e,icon:l,rightIcon:n,context:s,classes:i="",disabled:c,style:d,onclick:u}}){return r["default"]("button.button-reset",{type:t,title:a,disabled:c,class:`${i} ${c?v.disabledWrapper:"pointer"} ${I(s)} ${v.button}`,style:d,onclick:u},O(l,e,n))}}class ae{view({attrs:{label:e,title:t=e,icon:a,rightIcon:l,href:n,rel:s,target:i,download:c,context:d,classes:u="",style:o}}){return r["default"]("a.link.flex.items-center",{href:n,rel:s,target:i,download:c,title:t,class:`${u} ${I(d)} ${v.button}`,style:o},O(a,e,l))}}class le{view({attrs:{label:e,title:t=e,icon:a,rightIcon:l,classes:n="",disabled:s,style:i,onclick:c}}){return r["default"](".mh2.pa2.truncate",{title:t,disabled:s,class:`${n} ${s?v.disabledWrapper:"pointer"} ${v.navButton}`,style:i,onclick:c},O(a,e,l))}}class ne{view({attrs:{label:e,title:t=e,icon:a,rightIcon:l,href:n,rel:s,target:i,download:c,classes:d="",style:u}}){return r["default"]("a.link.mh2.pa2.truncate",{href:n,rel:s,target:i,download:c,title:t,class:`${d} ${v.navButton}`,style:u},O(a,e,l))}}class se{view({attrs:{field:{style:e},value:t}}){return r["default"](".pa2",{style:e},r["default"].trust(t()))}}class ie{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:n}=e;return r["default"](".pa2.flex.flex-wrap",{class:k(l),style:n},[A(a),r["default"]("span.ws-normal",{title:t(),class:v.displayValue},t())])}}class re{formatter(e){return e?new Date(String(e)).toLocaleDateString():e}oninit({attrs:{value:e}}){this.formatted=e.map(this.formatter)}onremove(){this.formatted.end(true)}view({attrs:{field:e}}){return r["default"](ie,{field:e,value:this.formatted})}}function ce(e,t){if(e==="email"){return{href:`mailto:${t}`,class:v.displayValue}}else if(e==="tel"){return{href:`tel:${t}`,class:v.displayValue}}else{return{href:t,target:"_blank",class:v.displayValue}}}const de={email:o.emailIcn,tel:o.telIcn};class ue{view({attrs:{field:e,value:t}}){const{label:a,type:l="url",uiClass:n={},style:s}=e;return r["default"](".pa2.flex.flex-wrap",{class:k(n),style:s},[A(a),r["default"]("a.link.dim.pointer.ws-normal",ce(l,t()),r["default"]("i.mr2",{class:de[l]||o.linkIcn}),t())])}}class oe{view({attrs:{field:e,value:t}}){const{options:a=[]}=e;const l=i["default"].find(a,i["default"].matches({value:t()||false}));return l?r["default"]("span.ml2",l.label):null}}class fe{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:n}=e;return r["default"](".pa2.flex.items-center",{class:k(l),style:n},[A(a),r["default"]("i",{class:`${v.displayValue} ${o[t()?this.onIcon:this.offIcon]}`}),r["default"](oe,{field:e,value:t})])}}class pe extends fe{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}function me(e,t){if(e.required){return!t}return false}function he(e,t){if(e.required){return t.length<1}return false}function ge(e){return t=>{t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function be(e){return t=>{t.preventDefault();e(false)}}function ve(e,t){return a=>{a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function ye(e){return({target:{files:t}})=>e(t)}class we{view({attrs:{field:e,defaultAccept:t="*",multiple:a=true,dragging:l,onSet:n},children:s}){const{label:c,id:d,name:u=d,title:o=c,required:f,readonly:p,disabled:m,autofocus:h,accept:g=t,uiClass:b={}}=e;return r["default"]("label.db",i["default"].extend({for:d,title:o,class:D(m,p)},m||p?{}:{ondragover:ge(l),ondragleave:be(l),ondrop:ve(l,n)}),[r["default"]("input.clip[type=file].bg-transparent.bn.outline-0",{id:d,name:u,multiple:a,accept:g,required:f,autofocus:h,disabled:m||p,onchange:ye(n)}),c?r["default"]("span.db.mb1",{class:$(b,f)},z(c,f)):null,s])}}function xe(e,t=false){return a=>{const l=t?[]:e();i["default"].each(a,e=>{l.push({guid:M(),name:e.name,path:"not_set",file:e})});e(l)}}function Ie(e,t){return a=>{a.preventDefault();const l=e();i["default"].remove(l,{guid:t});e(l)}}class ke{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const{disabled:a,uiClass:l={}}=e;return r["default"]("fieldset",{class:k(l,a)},[r["default"](we,{field:e,dragging:this.dragging,onSet:xe(t)},r["default"]("div",{class:T(l,he(e,t()))},r["default"](".pa2",{class:U(this.dragging())},[r["default"]("i.mr2",{class:o.uploadIcn}),r["default"]("span",o.addFilesTxt)]))),r["default"](".flex.flex-column.mt1.nb1",i["default"].map(t(),e=>r["default"]("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[r["default"]("i.mr2",{class:o.downloadIcn}),e.name,r["default"]("i.child.fr",{title:`${o.remFileTtl} ${e.name}`,class:o.deleteIcn,onclick:Ie(t,e.guid)})])))])}}class $e{view({children:e,attrs:t}){return r["default"](".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[t.src&&t.src!=="not_set"?r["default"]("img.contain",{src:t.src}):null,t.data&&t.data.file&&(t.src==="not_set"||!t.src)?r["default"]("div.contain.tc.br5.6rem",{class:`${Q(t.data)} fa-2x`,tooltip:t.data.file.type}):null,e])}}class Te{view({attrs:e}){return r["default"]("i.pa1",{class:Q(e),title:o.openFileTxt,onclick:e.path!=="not_set"?()=>window.open(e.path,"_blank"):undefined})}}class Se{view({attrs:{displayType:e="thumbnail",value:t}}){return e==="thumbnail"?r["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(t(),e=>r["default"]($e,{src:B(e.path,e.dataUrl),data:e,style:m()},r["default"](".absolute.top-0.right-0.child",r["default"](te,{title:`Remove ${e.name}`,icon:o.deleteIcn,onclick:Ie(t,e.guid)}))))):r["default"](".pa2.flex.flex-column",i["default"].map(t(),e=>r["default"](".flex.items-center.pa1.ba.b--black-20",[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",e.name),r["default"](Te,e),r["default"]("i.pa1.pointer.dim",{title:`Remove ${e.name}`,class:o.cancelIcn,onclick:Ie(t,e.guid)})])))}}class Ce{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:n}=e;const s=i["default"].find(e.options,{value:t()});const c=s?s.label||s.value:t();return r["default"](".pa2.flex.flex-wrap",{class:k(l),style:n},[A(a),r["default"]("span.ws-normal",{title:c,class:v.displayValue},c)])}}class Pe{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:n}=e;return r["default"](".pa2.flex.flex-column",{class:k(l),style:n},[A(a),r["default"](".flex.flex-column.mt1.nb1",i["default"].map(t(),({name:e,path:t})=>r["default"]("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:v.displayValue,href:t},r["default"]("i.mr2",{class:o.downloadIcn}),e)))])}}class qe{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:n}=e;return r["default"](".pa2.flex.flex-column",{class:k(l),style:n},[A(a),r["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(t(),({name:e,path:t,dataUrl:a})=>r["default"]($e,{title:e,src:B(t,a),style:m()})))])}}class Ue{view({attrs:{field:e,value:t}}){const{label:a,uiClass:l={},style:n}=e;const s=i["default"].head(t());return r["default"](".pa2.flex.flex-column",{class:k(l),style:n},[A(a),s?r["default"]("img.img.h-100.mt2.contain.self-center",{title:s.name,src:B(s.path,s.dataUrl),style:p()}):r["default"]("i.mt2",{class:`${v.displayValue} ${o.imageIcn}`})])}}function De(e){let t=0;if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(/(?=.*[A-Z].*[A-Z])/.test(e)&&/(?=.*[a-z].*[a-z].*[a-z])/.test(e)){t=t+1}if(/(?=.*[0-9].*[0-9])/.test(e)){t=t+1}if(/(?=.*[!"£%^@#$&*])/.test(e)){t=t+1}}return t}function Fe(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}const Me=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];class Le{oninit({attrs:{value:e}}){this.passwordScore=e.map(e=>De(String(e)))}onremove(){this.passwordScore.end()}view({attrs:{field:e}}){const{label:t,style:a}=e;return r["default"](".flex.flex-column",{style:a},[A(t),r["default"](".flex.mt1",i["default"].map(Me,e=>r["default"](".h1.w-20",{class:this.passwordScore()>=e.value?e.background:"bg-transparent"}))),r["default"]("span.f5.truncate",Fe(this.passwordScore()))])}}class ze{view({attrs:{field:{label:e="",title:t=e,required:a}}}){return r["default"]("label.mb2",{title:t},z(e,a))}}class Be{view({attrs:{field:e,value:t,xform:a=t}}){const{label:l,id:n,type:s="text",name:i=n,title:c=l,placeholder:d,max:u,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:v,autocomplete:y,pattern:w,inputmode:x,spellcheck:I,instant:$,uiClass:C={}}=e;return r["default"]("fieldset",{class:s==="hidden"?"clip":k(C,b)},[R(n,C,l,h),r["default"]("div",{class:T(C,me(e,a()))},r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:n,type:s,name:i,title:c,placeholder:d,max:u,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:v,autocomplete:y,pattern:w,inputmode:x,spellcheck:I,class:S(C),value:a(),[$?"oninput":"onchange"]:j(t)}))])}}class Ae{view({attrs:{field:e,value:t,xform:a=t}}){const{label:l,id:n,name:s=n,title:c=l,placeholder:d,max:u,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:v,autocomplete:y,pattern:w,inputmode:x,spellcheck:I,instant:$,uiClass:C={},options:P}=e;const q=P&&P.length?P[0].value:"$";return r["default"]("fieldset.flex-shrink-0",{class:k(C,b)},[R(n,C,l,h),r["default"](".flex.items-center",{class:T(C,me(e,a()))},r["default"]("span.mr1",q),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:n,type:"text",name:s,title:c,placeholder:d,max:u,maxlength:o,min:f,minlength:p,step:m,required:h,readonly:g,disabled:b,autofocus:v,autocomplete:y,pattern:w,inputmode:x,spellcheck:I,class:S(C),value:i["default"].isUndefined(a())?null:je(Re(a())),[$?"oninput":"onchange"]:We(t)}))])}}function Re(e){return i["default"].isString(e)?i["default"].parseInt(e):Number(e)}function Oe(e){const t=e.replace(/[^\d.]/g,"");let a;let l=0;if(t.indexOf(".")>-1){const e=t.indexOf(".");const n=t.substring(0,e);a=i["default"].parseInt(i["default"].padStart(n,1,"0"));const s=t.substring(e+1,Math.min(e+3,t.length));l=i["default"].parseInt(i["default"].padEnd(s,2,"0"))}else{a=i["default"].parseInt(t)||0}return a*100+l}function je(e){const t=He(e);if(t){return`${t[0]}.${t[1]}`}else{return t}}function He(e){if(!i["default"].isFinite(e)){return undefined}const t=String(Math.abs(e));let a="0";let l="";if(t.length>2){const e=t.length-2;a=t.substring(0,e);l=t.substring(e)}else{l=i["default"].padStart(t,2,"0")}return[a,l]}function We(e){return({target:{value:t}})=>e(Oe(t))}class _e{constructor(){this.month=c["default"]();this.year=c["default"]();this.date=c["default"].lift((e,t)=>`${e}/${t}`,this.month,this.year)}oninit({attrs:{value:e}}){e.map(e=>{const[t,a=""]=String(e).split("/");this.month(t);this.year(a)});this.date.map(t=>{if(t!==e()){e(t)}})}onremove(){this.date.end(true);this.year.end(true);this.month.end(true)}view({attrs:{field:e,value:t}}){const{label:a,id:l,name:n=l,title:s=a,required:i,readonly:c,disabled:d,uiClass:u={}}=e;const o=S(u);return r["default"]("fieldset",{class:k(u,d)},[R(`${l}-mm`,u,a,i),r["default"]("div",{title:s,class:T(u,me(e,t()))},[r["default"]("div.dib.mr2",[R(`${l}-mm`,u,"Month"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-mm`,name:`${n}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:d,value:this.month(),class:o,style:h,onchange:j(this.month)})]),r["default"]("span.mr2","/"),r["default"]("div.dib.mr2",[R(`${l}-yy`,u,"Year"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-yy`,name:`${n}-yy`,type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:d,value:this.year(),class:o,style:h,onchange:j(this.year)})])])])}}class Ve{constructor(){this.day=c["default"]();this.month=c["default"]();this.year=c["default"]();this.date=c["default"].lift((e,t,a)=>`${a}-${t}-${e}`,this.day,this.month,this.year)}oninit({attrs:{value:e}}){e.map(e=>{const t=new Date(String(e));if(i["default"].isDate(t)&&!isNaN(t.getTime())){this.day(i["default"].padStart(String(t.getDate()),2,"0"));this.month(i["default"].padStart(String(1+t.getMonth()),2,"0"));this.year(String(t.getFullYear()))}});this.date.map(t=>{const a=new Date(String(t));if(i["default"].isDate(a)&&!isNaN(a.getTime())){if(t!==e()){e(t)}}else{e("")}})}onremove(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)}view({attrs:{field:e,value:t}}){const{label:a,id:l,name:n=l,title:s=a,required:i,readonly:c,disabled:d,uiClass:u={},options:o}=e;const f=o&&o.length?o[0].value:"en-GB";const p=S(u);const m=r["default"](".dib.mr2",[R(`${l}-dd`,u,"Day"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-dd`,name:`${n}-dd`,type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:d,value:this.day(),class:p,style:h,onchange:j(this.day)})]);const b=r["default"](".dib.mr2",[R(`${l}-mm`,u,"Month"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-mm`,name:`${n}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:d,value:this.month(),class:p,style:h,onchange:j(this.month)})]);const v=r["default"](".dib.mr2",[R(`${l}-yyyy`,u,"Year"),r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:`${l}-yyyy`,name:`${n}-yyyy`,type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:c,disabled:d,value:this.year(),class:p,style:g,onchange:j(this.year)})]);return r["default"]("fieldset",{class:k(u,d)},[R(l,u,a,i),r["default"]("div",{id:l,title:s,class:T(u,me(e,t()))},f==="en-US"?[b,m,v]:[m,b,v])])}}class Ee{constructor(){this.showPassword=c["default"](false)}view({attrs:{field:e,value:t}}){const{label:a,id:l,name:n=l,title:s=a,placeholder:i,maxlength:c,minlength:d,required:u,readonly:f,disabled:p,autofocus:m,autocomplete:h,pattern:g,inputmode:b,instant:v,uiClass:y={}}=e;return r["default"]("fieldset",{class:k(y,p)},[R(l,y,a,u),r["default"]("div.w-100.flex.items-center",{class:T(y,me(e,t()))},r["default"]("input.w-100.bg-transparent.bn.outline-0",{id:l,name:n,title:s,placeholder:i,type:this.showPassword()?"text":"password",maxlength:c,minlength:d,required:u,readonly:f,disabled:p,autofocus:m,autocomplete:h,pattern:g,inputmode:b,class:S(y),value:t(),autocorrect:"off",[v?"oninput":"onchange"]:j(t)}),r["default"]("i.ml1.pa1.fa-fw.pointer.dim",{title:o.showPassTxt,class:this.showPassword()?o.hidePassIcn:o.showPassIcn,onclick:()=>this.showPassword(!this.showPassword())}))])}}class Ye{view({attrs:{field:e,value:t}}){const{label:a,id:l,name:n=l,title:s=a,placeholder:i,required:c,readonly:d,disabled:u,autofocus:o,autocomplete:f,spellcheck:p,instant:m,uiClass:h={}}=e;return r["default"]("fieldset",{class:k(h,u)},[R(l,h,a,c),r["default"]("div",{class:T(h,me(e,t()))},r["default"]("textarea.w-100.bg-transparent.bn.outline-0[rows=3]",{id:l,name:n,title:s,placeholder:i,required:c,readonly:d,disabled:u,autofocus:o,autocomplete:f,spellcheck:p,class:P(h),value:t(),style:{resize:"vertical"},[m?"oninput":"onchange"]:j(t)}))])}}class Ne{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:t}}){const{label:a="",id:l,name:n=l,title:s=a,required:i,readonly:c,disabled:d,autocomplete:u,uiClass:f={}}=e;return r["default"]("fieldset",{class:k(f,d)},r["default"]("div",{class:T(f)},[r["default"]("label.flex.items-center",{title:s,class:C(f,d,c)},r["default"]("input.clip[type=checkbox]",{id:l,name:n,checked:t(),required:i,autocomplete:u,disabled:d||c,onchange:H(t)}),r["default"]("i.mr2",{class:o[t()?this.onIcon:this.offIcon]}),z(a,i),r["default"](oe,{field:e,value:t}))]))}}class Ze extends Ne{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}class Ge{view({attrs:{field:e,value:t}}){const{label:a,id:l,name:n=l,required:s,readonly:c,disabled:d,autocomplete:u,options:o,uiClass:f={}}=e;return r["default"]("fieldset",{class:k(f,d)},[R(l,f,a,s),r["default"]("div",{class:T(f,me(e,t())),onchange:j(t)},i["default"].map(o,({value:e,label:a=e,icon:l})=>{const i=t()===e;return r["default"]("label.dib",{title:a,class:q(f,i,d,c)},r["default"]("input.clip[type=radio]",{name:n,value:e,checked:i,required:s,autocomplete:u,disabled:d||c}),l?r["default"]("i.fa-fw",{class:l}):a)}))])}}class Je{view({attrs:{field:e,value:t}}){const{label:a,id:l,name:n=l,title:s=a,required:c,readonly:d,disabled:u,autofocus:o,autocomplete:f,uiClass:p={},options:m}=e;return r["default"]("fieldset",{class:k(p,u)},[R(l,p,a,c),r["default"]("div",{class:T(p,me(e,t()))},r["default"]("select.w-100.bg-transparent.bn.outline-0",{id:l,name:n,title:s,required:c,readonly:d,disabled:u,autofocus:o,autocomplete:f,class:S(p),value:t(),onchange:j(t)},i["default"].map(m,({value:e,label:t=e})=>r["default"]("option",{value:e,disabled:u||d},t))))])}}class Ke{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const a=i["default"].head(t());const{disabled:l,uiClass:n={}}=e;return r["default"]("fieldset",{class:k(n,l)},r["default"](we,{field:e,multiple:false,dragging:this.dragging,onSet:xe(t,true)},r["default"]("div",{class:T(n,he(e,t()))},r["default"](".flex.items-center.pa1",{class:U(this.dragging())},[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",a?a.name:o.addFileTxt),a?r["default"](Te,a):null,a?r["default"]("i.pa1.pointer.dim",{title:`Remove ${a.name}`,class:o.cancelIcn,onclick:Ie(t,a.guid)}):null]))))}}function Qe(e,t,a=false){return l=>{const n=a?[]:e();return Promise.all(i["default"].map(l,e=>J(e,t,e.type).then(t=>{const a=V(_(t),e.name);n.push({guid:M(),name:a.name,path:"not_set",file:a,dataUrl:t})}))).then(()=>{e(n);r["default"].redraw()})}}class Xe{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const{disabled:a,uiClass:l={}}=e;return r["default"]("fieldset",{class:k(l,a)},[r["default"](we,{field:e,defaultAccept:"image/*",dragging:this.dragging,onSet:Qe(t,o.imageMaxSize)},r["default"]("div",{class:T(l,he(e,t()))},r["default"](".w-100.pa1.dt.tc",{class:U(this.dragging())},r["default"]("i.fa-2x.dtc.v-mid",{class:o.cameraIcn})))),r["default"](".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",i["default"].map(t(),e=>r["default"]($e,{src:B(e.path,e.dataUrl),style:m()},r["default"](".absolute.top-0.right-0.child",r["default"](te,{title:`Remove ${e.name}`,icon:o.deleteIcn,onclick:Ie(t,e.guid)})))))])}}class et{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const a=i["default"].head(t());const{disabled:l,uiClass:n={}}=e;return r["default"]("fieldset",{class:k(n,l)},r["default"](we,{field:e,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Qe(t,o.imageMaxSize,true)},r["default"]("div",{class:T(n,he(e,t()))},r["default"](".pa1",{class:U(this.dragging())},r["default"](".relative.w-100.dt.tc",a?[r["default"]("img.img.contain",{title:a.name,src:B(a.path,a.dataUrl),style:p()}),r["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${a.name}`,onclick:Ie(t,a.guid)},r["default"]("i.pa1",{class:o.cancelIcn}))]:r["default"]("i.fa-2x.dtc.v-mid",{class:o.cameraIcn}))))))}}class tt{oncreate({dom:e}){const t=e.children[0];const a=L();this.signaturePad=new d["default"](t,{minWidth:.5*a,maxWidth:1.5*a});const l=()=>{const e=L();t.width=t.offsetWidth*e;t.height=t.offsetHeight*e;const a=t.getContext("2d");a.scale(e,e);this.resetCanvas()};this.resizeHandler=i["default"].debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()}onremove(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}view({attrs:{style:e,onSet:t,onCancel:a}}){return[r["default"](".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:e},r["default"]("canvas.aspect-ratio--object")),r["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[r["default"](te,{title:o.applyTtl,icon:o.applyIcn,classes:"ma1",onclick:()=>{if(!this.signaturePad.isEmpty()){t(this.signaturePad.toDataURL("image/png"))}}}),r["default"](te,{title:o.resetTtl,icon:o.resetIcn,classes:"ma1",onclick:()=>this.resetCanvas()}),r["default"](te,{title:o.cancelTtl,icon:o.cancelIcn,classes:"ma1",onclick:a})])]}resetCanvas(){this.signaturePad.clear()}}function at(e,t){const a=o.signMaxSize;const l=.01*t*a;return K(e,a,l,o.signFont)}function lt(e,t,a){return()=>a(at(t,e))}class nt{view({attrs:{heightPct:e,stampTxt:t,stampSetTxt:a,onSet:l}}){return[r["default"]("span.clip",{style:{"font-family":o.signFont}},a),r["default"](".flex",r["default"](te,{label:t,classes:`flex-auto ${o.stampBtnClass}`,context:o.stampBtnContext,onclick:lt(e,a,l)}))]}}function st(e,t,a){return()=>{if(e()){a(at(e(),t))}return false}}class it{constructor(){this.text=c["default"]("")}oncreate({dom:e}){const t=e.children[0];t.focus({preventScroll:false});this.scaleText(e)}onupdate({dom:e}){this.scaleText(e)}view({attrs:{heightPct:e,style:t,onSet:a,onCancel:l}}){return[r["default"]("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:t,onsubmit:st(this.text,e,a)},r["default"]("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:j(this.text),value:this.text(),style:{"font-family":o.signFont}})),r["default"](".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[r["default"](te,{title:o.applyTtl,icon:o.applyIcn,classes:"ma1",onclick:st(this.text,e,a)}),r["default"](te,{title:o.resetTtl,icon:o.resetIcn,classes:"ma1",onclick:()=>this.text("")}),r["default"](te,{title:o.cancelTtl,icon:o.cancelIcn,classes:"ma1",onclick:l})])]}scaleText(e){const t=e.clientHeight;e.style.fontSize=`${.56*t}px`}}function rt(e,t){return new Promise(a=>{const l=new Image;l.onload=()=>{const e=document.createElement("canvas");const[n,s]=E(l.width,l.height,t);e.width=n;e.height=s;const i=e.getContext("2d");i.drawImage(l,0,0,n,s);a(e.toDataURL())};l.src=e})}function ct(e,t,a){return l=>rt(l,a).then(a=>{const l=V(_(a),`sign-${t}.png`);e([{guid:M(),name:l.name,path:"not_set",file:l,dataUrl:a}]);r["default"].redraw()})}class dt{oninit({attrs:{value:e}}){this.valUpdate=e.map(()=>this.setComponent())}onremove(){this.valUpdate.end()}view({attrs:{field:e,value:t}}){const{label:a,id:l,readonly:n,disabled:s,uiClass:c={},options:d=o.signOpts,heightPct:u=o.signHeightPct,stampTxt:f=o.stampTxt,stampSetTxt:p=o.stampSetTxt}=e;const m={paddingBottom:`${u}%`};const h=i["default"].head(t());const g=i["default"](d).map(({value:e})=>{if(e==="draw"){return{component:tt,icon:o.drawIcn,label:o.signDrawTxt}}else if(e==="type"){return{component:it,icon:o.typeIcn,label:o.signTypeTxt}}else if(e==="stamp"){return{component:nt,icon:o.stampIcn,label:o.signStampTxt}}return null}).compact().value();if(g.length===1&&!h){this.setComponent(g[0].component)}return r["default"]("fieldset.relative",{class:k(c,s)},[R(l,c,a),r["default"]("div",{class:T(c,he(e,t()))},n||s?r["default"](".aspect-ratio",{id:l,style:m},h?r["default"](".aspect-ratio--object",{style:{"pointer-events":"none"}},r["default"]("img.img.w-100.absolute",{src:B(h.path,h.dataUrl)})):null):this.component?r["default"](this.component,{heightPct:u,stampTxt:f,stampSetTxt:p,style:m,onSet:ct(t,l,o.signMaxSize),onCancel:()=>this.setComponent()}):r["default"](".aspect-ratio.pointer",{id:l,class:v.fileInput,style:m},h?r["default"](".aspect-ratio--object.hide-child.dim",{onclick:()=>t([])},[r["default"]("img.img.w-100.absolute",{src:B(h.path,h.dataUrl)}),r["default"](".pa3.absolute.top-0.right-0.child",r["default"]("i.fa-2x",{class:o.resetIcn}))]):r["default"](".aspect-ratio--object.flex.items-stretch.justify-center",i["default"].map(g,({component:e,icon:t,label:a})=>r["default"](".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{title:a,onclick:()=>this.setComponent(e)},r["default"]("i.fa-2x.ma1",{class:t}),r["default"]("span.ma1.dn.db-ns",a))))))])}setComponent(e){this.component=e}}function ut(e,t){return a=>{const l=t?[]:e();return Promise.all(i["default"].map(a,e=>{if(X(e.type)){return J(e,o.imageMaxSize,e.type).then(t=>{const a=V(_(t),e.name);l.push({guid:M(),name:a.name,path:"not_set",file:a,dataUrl:t})})}else{l.push({guid:M(),name:e.name,path:"not_set",file:e});return Promise.resolve()}})).then(()=>{e(l);r["default"].redraw()})}}class ot{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t}}){const a=i["default"].head(t());const{disabled:l,uiClass:n={}}=e;return r["default"]("fieldset",{class:k(n,l)},r["default"](we,{field:e,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:ut(t,true)},r["default"]("div",{class:T(n,he(e,t()))},r["default"](".flex.items-center.pa1",{class:U(this.dragging())},a?a.dataUrl?[r["default"](".relative.w-100.dt.tc",r["default"]("img.img.contain",{title:a.name,src:B(a.path,a.dataUrl),style:p()}),r["default"](".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${a.name}`,onclick:Ie(t,a.guid)},r["default"]("i.pa1",{class:o.cancelIcn})))]:[r["default"](Te,a),r["default"]("span.ma1.flex-auto",a.name),r["default"]("i.pa1.pointer.dim",{title:`Remove ${a.name}`,class:o.cancelIcn,onclick:Ie(t,a.guid)})]:[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",o.addFileTxt)]))))}}class ft{constructor(){this.dragging=c["default"](false)}view({attrs:{field:e,value:t,displayType:a,showDisplay:l=true}}){const{disabled:n,uiClass:s={}}=e;return r["default"]("fieldset",{class:k(s,n)},[r["default"](we,{field:e,defaultAccept:"*",dragging:this.dragging,onSet:ut(t,false)},r["default"]("div",{class:T(s,he(e,t()))},r["default"](".flex.items-center.pa1.dt",{class:U(this.dragging())},[r["default"]("i.pa1",{class:o.uploadIcn}),r["default"]("span.ma1.flex-auto",o.addFileTxt)]))),l?r["default"](Se,{displayType:a,value:t}):null])}}e.Badge=ee;e.BaseInput=Be;e.BaseText=ie;e.Button=te;e.ButtonLink=ae;e.CardDateInput=_e;e.Checkbox=fe;e.CheckboxInput=Ne;e.CurrencyInput=Ae;e.DateInput=Ve;e.DateText=re;e.DisplayTypeComponent=Se;e.FileList=Pe;e.FileMulti=ke;e.FileSelect=Ke;e.ImageList=qe;e.ImageMulti=Xe;e.ImagePreview=Ue;e.ImageSelect=et;e.Label=ze;e.Link=ue;e.MultiOmniFileInput=ft;e.NavButton=le;e.NavLink=ne;e.OmniFileInput=ot;e.PasswordInput=Ee;e.PasswordStrength=Le;e.RadioInput=Ge;e.SelectInput=Je;e.SelectText=Ce;e.SignBuilder=dt;e.TextareaInput=Ye;e.Toggle=pe;e.ToggleInput=Ze;e.Trusted=se;e.currencyStrToNumber=Oe;e.dataURItoBlob=_;e.fileConstructor=V;e.fileNameExtSplit=W;e.getOrientation=Y;e.guid=M;e.iconMap=de;e.linkAttrs=ce;e.numberToCurrencyStr=je;e.numberToCurrencyTuple=He;e.readArrayBuffer=N;e.readOrientation=Z;e.resizeImage=J;e.scaleRect=E;e.updateButtonContext=x;e.updateClasses=y;e.updateConfig=f;Object.defineProperty(e,"__esModule",{value:true})}));
