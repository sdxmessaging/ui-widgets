/* @preserve built on: 2021-10-11T09:04:51.511Z */
import e from"lodash";import t from"mithril";import a from"mithril/stream";import s from"signature_pad";const n={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",openFileTxt:"Open file",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-signature",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-check",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};const i=n;function l(t){e.assign(n,t)}function r(){return{"max-height":i.imageDispHeight}}function c(){return{"max-height":i.thumbDispHeight}}const o={"max-width":"5.4ex"};const d={wrapper:"pa0 bn",label:"f6 silver",inputWrapper:"dark-gray",input:"dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40",invalidInputWrapper:""};const u=d;function p(t){e.assign(d,t)}const f={default:"bg-light-blue dark-gray"};function m(t){e.assign(f,t)}function h(e="default"){if(e&&e in f){return f[e]}else{return""}}function g({wrapper:e="",merge:t=true},a){return`${e} ${t?u.wrapper:""} ${a?u.disabledWrapper:""}`}function b({label:e="",merge:t=true},a){return`${e} ${t?u.label:""} ${a?u.requiredLabel:""}`}function y({inputWrapper:e="",merge:t=true},a){return`${e} ${t?u.inputWrapper:""} ${a?u.invalidInputWrapper:""}`}function v({input:e="",merge:t=true}){return`${e} ${t?u.input:""}`}function w(e,t,a){return`${v(e)} ${k(t,a)}`}function x({input:e="",merge:t=true}){return`${e} ${t?u.textarea:""}`}function I({input:e="",merge:t=true},a,s,n){return`${e} ${t?u.radio:""} ${a?u.radioChecked:u.radioUnchecked} ${k(s,n)}`}function $(e){return`${u.fileInput} ${e?u.fileHover:""}`}function k(e,t){return e||t?"":"pointer"}function T(e){return(e+256).toString(16).substr(1)}function S(){const e=new Uint8Array(16);const t=window.crypto;t.getRandomValues(e);return[T(e[0]),T(e[1]),T(e[2]),T(e[3]),"-",T(e[4]),T(e[5]),"-",T(e[6]),T(e[7]),"-",T(e[8]),T(e[9]),"-",T(e[10]),T(e[11]),T(e[12]),T(e[13]),T(e[14]),T(e[15])].join("")}function C(){return Math.max(window.devicePixelRatio,1)}function q(e,t){return t?`${e}${i.requiredLblPost}`:e}function P(e,t){return t?t:e}function U(e){return e?t("span.mr2.truncate",{title:e,class:u.displayLabel},e):null}function D(e,a,s,n){return s?t("label.mb1.db",{title:s,for:e,class:b(a,n)},q(s,n)):null}function F(e,a,s){return[e?t("i.fa-fw",{class:`${a?"mr2":""} ${e}`}):null,a,s?t("i.fa-fw",{class:`${a?"ml2":""} ${s}`}):null]}function M(e){return function({target:{value:t}}){e(t)}}function A(e){return function({target:{checked:t}}){e(t)}}function H(e,t,a){switch(e){case"dd":return(isNaN(t)||t<=3)&&((isNaN(a)||t===3&&a<=1||t<3)&&!(t===0&&a===0));case"mm":return(isNaN(t)||t<=1)&&((isNaN(a)||t===1&&a<=2||t<1)&&!(t===0&&a===0));case"yyyy":return(isNaN(t)||t>=1&&t<3)&&(isNaN(a)||t===1&&a===9||t===2);case"yy":return isNaN(t)||t>=0}}function z(e,t,a){t.map(t=>{const s=t?"":`${a}`;e.setCustomValidity(s)})}function L(e,t){e.map(e=>{if(e!==t()){t(e)}})}function W(e,t,a,s,n){const i=parseInt(t.getAttribute("maxlength"));if(s.length===i&&a){const t=n.querySelector(`#${e}-${a}`);t.focus()}}function R(e,t,a,s,n){const i=s.querySelector(`#${t}-${a}`);const l=e()?e():"";const r=i.value;const c=/^\d*$/.test(r);const o=parseInt(r.charAt(0));const d=parseInt(r.charAt(1));const u=H(a,o,d);if((c||r==="")&&u){e(r)}else{e(l)}W(t,i,n,e(),s)}function N(e){const t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function O(e){const t=e.split(",");const a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);const s=t[0].split(":")[1].split(";")[0];const n=a.length;const i=new Uint8Array(n);for(let e=0;e<n;e++){i[e]=a.charCodeAt(e)}return new Blob([i],{type:s})}function V(e,t){const a=(new Date).valueOf();const s=e;s.name=t;s.lastModified=a;return e}function j(e,t,a){const s=V(O(e),t);return{guid:S(),name:s.name,path:"not_set",file:s,dataUrl:e,metadata:a}}function B(e){const[,t]=N(e.name);switch(t.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return i.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return i.videoFileIcn;case".pdf":return i.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return i.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return i.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return i.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return i.imageIcn;default:return i.fileIcn}}function _(e){return e&&e.includes("image")}function E(e){const t=Math.min(e.byteLength,64*1024);const a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}const s=a.byteLength;let n=2;while(n<s){const e=a.getUint16(n,false);n+=2;if(e===65505){n+=2;if(a.getUint32(n,false)!==1165519206){return-1}n+=6;const e=a.getUint16(n,false)===18761;n+=a.getUint32(n+4,e);const t=a.getUint16(n,e);n+=2;for(let s=0;s<t;s++){if(a.getUint16(n+s*12,e)===274){return a.getUint16(n+s*12+8,e)}}}else if((e&65280)!==65280){break}else{n+=a.getUint16(n,false)}}return-1}function Y(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>{t(a.result)};a.readAsArrayBuffer(e)})}function G(e){return Y(e).then(E)}function Z(e,t,a,s){if(!s||s>8){return}switch(s){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function J(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function K(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return G(e).then(s=>new Promise(n=>{const i=new Image;i.onload=()=>{const e=document.createElement("canvas");const[l,r]=J(i.width,i.height,t);if(s>4){e.width=r;e.height=l}else{e.width=l;e.height=r}const c=e.getContext("2d");Z(c,l,r,s);c.drawImage(i,0,0,l,r);n(e.toDataURL(a))};const l=new FileReader;l.onload=()=>i.src=l.result;l.readAsDataURL(e)}))}function Q(e,t){return new Promise(a=>{const s=new Image;s.onload=()=>{const e=document.createElement("canvas");const[n,i]=J(s.width,s.height,t);e.width=n;e.height=i;const l=e.getContext("2d");l.drawImage(s,0,0,n,i);a(e.toDataURL())};s.src=e})}function X(e,t,a,s){const n=document.createElement("canvas");n.width=t;n.height=a;const i=.56*n.height;const l=n.getContext("2d");l.textBaseline="middle";l.font=`${i}px ${s}`;l.fillText(e,n.height*.05,i);return n.toDataURL()}function ee(e,t){const a=i.signMaxSize;const s=.01*t*a;return X(e,a,s,i.signFont)}class te{view({attrs:{label:e,classes:a="bg-red"},children:s}){return t(".relative.dib",[s,e?t("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:a,style:{minWidth:"0.65rem"}},e):null])}}class ae{view({attrs:{label:e,type:a="button",title:s=e,icon:n,rightIcon:i,context:l,classes:r="",disabled:c,style:o,onclick:d}}){return t("button.button-reset",{type:a,title:s,disabled:c,class:`${r} ${c?u.disabledWrapper:"pointer"} ${h(l)} ${u.button}`,style:o,onclick:d},F(n,e,i))}}class se{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,href:i,rel:l,target:r,download:c,context:o,classes:d="",style:p}}){return t("a.link.flex.items-center",{href:i,rel:l,target:r,download:c,title:a,class:`${d} ${h(o)} ${u.button}`,style:p},F(s,e,n))}}class ne{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,classes:i="",disabled:l,style:r,onclick:c}}){return t(".mh2.pa2.truncate",{title:a,disabled:l,class:`${i} ${l?u.disabledWrapper:"pointer"} ${u.navButton}`,style:r,onclick:c},F(s,e,n))}}class ie{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,href:i,rel:l,target:r,download:c,classes:o="",style:d}}){return t("a.link.mh2.pa2.truncate",{href:i,rel:l,target:r,download:c,title:a,class:`${o} ${u.navButton}`,style:d},F(s,e,n))}}class le{view({attrs:{field:{style:e},value:a}}){return t(".pa2",{style:e},t.trust(a()))}}class re{view({attrs:{field:e,value:a}}){const{label:s,uiClass:n={},style:i}=e;return t(".pa2.flex.flex-wrap",{class:g(n),style:i},[U(s),t("span.ws-normal",{title:a(),class:u.displayValue},a())])}}class ce{formatter(e){return e?new Date(String(e)).toLocaleDateString():e}oninit({attrs:{value:e}}){this.formatted=e.map(this.formatter)}onremove(){this.formatted.end(true)}view({attrs:{field:e}}){return t(re,{field:e,value:this.formatted})}}function oe(e,t){if(e==="email"){return{href:`mailto:${t}`,class:u.displayValue}}else if(e==="tel"){return{href:`tel:${t}`,class:u.displayValue}}else{return{href:t,target:"_blank",class:u.displayValue}}}const de={email:i.emailIcn,tel:i.telIcn};class ue{view({attrs:{field:e,value:a}}){const{label:s,type:n="url",uiClass:l={},style:r}=e;return t(".pa2.flex.flex-wrap",{class:g(l),style:r},[U(s),t("a.link.dim.pointer.ws-normal",oe(n,a()),t("i.mr2",{class:de[n]||i.linkIcn}),a())])}}class pe{view({attrs:{field:a,value:s}}){const{options:n=[]}=a;const i=e.find(n,e.matches({value:s()||false}));return i?t("span.ml2",i.label):null}}class fe{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:s,uiClass:n={},style:l}=e;return t(".pa2.flex.items-center",{class:g(n),style:l},[U(s),t("i",{class:`${u.displayValue} ${i[a()?this.onIcon:this.offIcon]}`}),t(pe,{field:e,value:a})])}}class me extends fe{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}function he(e,t){if(e.required){return!t}return false}function ge(e,t){if(e.required){return t.length<1}return false}function be(e){return t=>{t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function ye(e){return t=>{t.preventDefault();e(false)}}function ve(e,t){return a=>{a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function we(e){return({target:{files:t}})=>e(t)}class xe{oncreate({dom:e,attrs:{value:t}}){t.map(t=>{if(t.length===0){e.firstChild.value=""}})}view({attrs:{field:a,defaultAccept:s="*",multiple:n=true,dragging:i,onSet:l},children:r}){const{label:c,id:o,name:d=o,title:u=c,required:p,readonly:f,disabled:m,autofocus:h,accept:g=s,uiClass:y={}}=a;return t("label.db",e.extend({for:o,title:u,class:k(m,f),"data-input-id":o},m||f?{}:{ondragover:be(i),ondragleave:ye(i),ondrop:ve(i,l)}),[t("input.clip[type=file].bg-transparent.bn.outline-0",{id:o,name:d,multiple:n,accept:g,required:p,autofocus:h,disabled:m||f,onchange:we(l)}),c?t("span.db.mb1",{class:b(y,p)},q(c,p)):null,r])}}function Ie(t,a=false){return s=>{const n=a?[]:t();e.each(s,e=>{n.push({guid:S(),name:e.name,path:"not_set",file:e})});t(n)}}function $e(t,a){return s=>{s.preventDefault();const n=t();e.remove(n,{guid:a});t(n)}}class ke{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const{disabled:n,uiClass:l={}}=a;return t("fieldset",{class:g(l,n)},[t(xe,{field:a,dragging:this.dragging,onSet:Ie(s),value:s},t("div",{class:y(l,ge(a,s()))},t(".pa2",{class:$(this.dragging())},[t("i.mr2",{class:i.uploadIcn}),t("span",i.addFilesTxt)]))),t(".flex.flex-column.mt1.nb1",e.map(s(),e=>t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:i.downloadIcn}),e.name,t("i.child.fr",{title:`${i.remFileTtl} ${e.name}`,class:i.deleteIcn,onclick:$e(s,e.guid)})])))])}}class Te{view({children:e,attrs:a}){return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[a.src&&a.src!=="not_set"?t("img.contain",{src:a.src}):null,a.data&&a.data.file&&(a.src==="not_set"||!a.src)?t("div.contain.tc.br5.6rem",{class:`${B(a.data)} fa-2x`,tooltip:a.data.file.type}):null,e])}}class Se{view({attrs:e}){return t("i.pa1",{class:B(e),title:i.openFileTxt,onclick:e.path!=="not_set"?()=>window.open(e.path,"_blank"):undefined})}}class Ce{view({attrs:{displayType:a="thumbnail",value:s}}){return a==="thumbnail"?t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),e=>t(Te,{src:P(e.path,e.dataUrl),data:e,style:c()},t(".absolute.top-0.right-0.child",t(ae,{title:`Remove ${e.name}`,icon:i.deleteIcn,onclick:$e(s,e.guid)}))))):t(".pa2.flex.flex-column",e.map(s(),e=>t(".flex.items-center.pa1.ba.b--black-20",[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",{title:e.name},e.name),t(Se,e),t("i.pa1.pointer.dim",{title:`Remove ${e.name}`,class:i.cancelIcn,onclick:$e(s,e.guid)})])))}}class qe{view({attrs:{field:a,value:s}}){const{label:n,uiClass:i={},style:l}=a;const r=e.find(a.options,{value:s()});const c=r?r.label||r.value:s();return t(".pa2.flex.flex-wrap",{class:g(i),style:l},[U(n),t("span.ws-normal",{title:c,class:u.displayValue},c)])}}class Pe{view({attrs:{field:a,value:s}}){const{label:n,uiClass:l={},style:r}=a;return t(".pa2.flex.flex-column",{class:g(l),style:r},[U(n),t(".flex.flex-column.mt1.nb1",e.map(s(),({name:e,path:a})=>t("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:u.displayValue,href:a},t("i.mr2",{class:i.downloadIcn}),e)))])}}class Ue{view({attrs:{field:a,value:s}}){const{label:n,uiClass:i={},style:l}=a;return t(".pa2.flex.flex-column",{class:g(i),style:l},[U(n),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),({name:e,path:a,dataUrl:s})=>t(Te,{title:e,src:P(a,s),style:c()})))])}}class De{view({attrs:{field:a,value:s}}){const{label:n,uiClass:l={},style:c}=a;const o=e.head(s());return t(".pa2.flex.flex-column",{class:g(l),style:c},[U(n),o?t("img.img.h-100.mt2.contain.self-center",{title:o.name,src:P(o.path,o.dataUrl),style:r()}):t("i.mt2",{class:`${u.displayValue} ${i.imageIcn}`})])}}function Fe(e,t){return(e.match(t)||[]).length}function Me(e){let t=0;if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(Fe(e,/[A-Z]/g)>1&&Fe(e,/[a-z]/g)>2){t=t+1}if(Fe(e,/[\d]/g)>1){t=t+1}if(Fe(e,/[!"£%^@#$&*]/g)>0){t=t+1}}return t}function Ae(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}const He=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];class ze{oninit({attrs:{value:e}}){this.passwordScore=e.map(e=>Me(String(e)))}onremove(){this.passwordScore.end()}view({attrs:{field:a}}){const{label:s,style:n}=a;return t(".flex.flex-column",{style:n},[U(s),t(".flex.mt1",e.map(He,e=>t(".h1.w-20",{class:this.passwordScore()>=e.value?e.background:"bg-transparent"}))),t("span.f5.truncate",Ae(this.passwordScore()))])}}class Le{view({attrs:{field:{label:e="",title:a=e,required:s}}}){return t("label.mb2",{title:a},q(e,s))}}class We{view({attrs:e,children:a}){const{field:s,value:n,xform:i=n}=e;const{label:l,id:r,type:c="text",required:o,disabled:d,uiClass:u={}}=s;return t("fieldset",{class:c==="hidden"?"clip":g(u,d)},[D(r,u,l,o),t("div",{class:y(u,he(s,i()))},a)])}}class Re{constructor(){this.focus=false;this.focusIn=()=>this.focus=true;this.focusOut=()=>this.focus=false;this.wrapperHeight=0}oncreate({dom:e}){this.wrapperHeight=e.clientHeight;t.redraw()}onupdate({dom:e}){if(e.clientHeight!==this.wrapperHeight){this.wrapperHeight=e.clientHeight;t.redraw()}}view({attrs:e,children:a}){const{field:s,value:n,xform:i=n}=e;const{label:l,id:r,type:c="text",required:o,disabled:d,layout:u,uiClass:p={}}=s;const f=u==="floatAlways"||n()||this.focus;return t(".relative",{class:c==="hidden"?"clip":g(p,d),style:{paddingTop:"0.7em"},onfocusin:this.focusIn,onfocusout:this.focusOut},t("fieldset.pa0.ma0.bn",{class:y(p,he(s,i()))},[l?[t("legend.db.pa0",{style:{visibility:"hidden",height:"0px",maxWidth:f?"100%":"0.01px",transition:"max-width 0.3s ease-in-out",fontSize:"0.7em"}},t(".ph2",l)),t("label.db.absolute.top-0",{title:l,for:r,class:b(p,o),style:{left:"0.5em",transform:f?"scale(0.7)":`translateY(calc(${this.wrapperHeight*.5}px - 0.33em))`,transformOrigin:"top left",transition:"transform 0.3s ease-in-out",wordSpacing:"2px"}},q(l,o))]:null,a]))}}class Ne{view({attrs:e}){const{field:a,value:s,xform:n=s}=e;const{label:i,id:l,type:r="text",name:c=l,title:o=i,placeholder:d,max:u,maxlength:p,min:f,minlength:m,step:h,required:g,readonly:b,disabled:y,autofocus:w,autocomplete:x,pattern:I,inputmode:$,spellcheck:k,instant:T,layout:S="default",uiClass:C={}}=a;return t(S==="default"?We:Re,e,t("input.w-100.bg-transparent.bn.outline-0",{id:l,type:r,name:c,title:o,placeholder:d,max:u,maxlength:p,min:f,minlength:m,step:h,required:g,readonly:b,disabled:y,autofocus:w,autocomplete:x,pattern:I,inputmode:$,spellcheck:k,class:v(C),value:n(),[T?"oninput":"onchange"]:M(s)}))}}class Oe{view({attrs:a}){const{field:s,value:n,xform:i=n}=a;const{label:l,id:r,name:c=r,title:o=l,placeholder:d,max:u,maxlength:p,min:f,minlength:m,step:h,required:g,readonly:b,disabled:y,autofocus:w,autocomplete:x,pattern:I,inputmode:$,spellcheck:k,instant:T,layout:S="default",uiClass:C={},options:q}=s;const P=q&&q.length?q[0].value:"$";const U=t(".flex.flex-row.w-100",t("span.mr1.self-center",P),t("input.w-100.bg-transparent.bn.outline-0",{id:r,type:"text",name:c,title:o,placeholder:d,max:u,maxlength:p,min:f,minlength:m,step:h,required:g,readonly:b,disabled:y,autofocus:w,autocomplete:x,pattern:I,inputmode:$,spellcheck:k,class:v(C),value:e.isUndefined(i())?null:Be(Ve(i())),[T?"oninput":"onchange"]:Ee(n)}));return t(S==="default"?We:Re,a,U)}}function Ve(t){return e.isString(t)?e.parseInt(t):Number(t)}function je(t){const a=t.replace(/[^\d.]/g,"");let s;let n=0;if(a.indexOf(".")>-1){const t=a.indexOf(".");const i=a.substring(0,t);s=e.parseInt(e.padStart(i,1,"0"));const l=a.substring(t+1,Math.min(t+3,a.length));n=e.parseInt(e.padEnd(l,2,"0"))}else{s=e.parseInt(a)||0}return s*100+n}function Be(e){const t=_e(e);if(t){return`${t[0]}.${t[1]}`}else{return t}}function _e(t){if(!e.isFinite(t)){return undefined}const a=String(Math.abs(t));let s="0";let n="";if(a.length>2){const e=a.length-2;s=a.substring(0,e);n=a.substring(e)}else{n=e.padStart(a,2,"0")}return[s,n]}function Ee(e){return({target:{value:t}})=>e(je(t))}class Ye{constructor(){this.month=a();this.year=a();this.valid=a.lift((e,t)=>t.length===2&&e.length===2,this.month,this.year);this.date=a.lift((e,t,a)=>a?`${e}/${t}`:"",this.month,this.year,this.valid)}oninit({attrs:{value:e}}){e.map(e=>{const[t,a=""]=String(e).split("/");t.length===2&&this.month(t);a.length===2&&this.year(a)});L(this.date,e)}oncreate({dom:e}){const t=e.querySelector("input");z(t,this.valid,"Invalid Date");this.dom=e}onremove(){this.date.end(true);this.year.end(true);this.month.end(true)}view({attrs:e}){const{field:a}=e;const{id:s,name:n=s,required:i,readonly:l,disabled:r,layout:c="default",uiClass:d={}}=a;const u=v(d);const p=[t("div.dib.mr2",[t("input.w-100.bg-transparent.bn.outline-0",{id:`${s}-mm`,name:`${n}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.month(),class:u,style:o,oninput:()=>R(this.month,s,"mm",this.dom,"yy")})]),t("span.mr2","/"),t("div.dib.mr2",[t("input.w-100.bg-transparent.bn.outline-0",{id:`${s}-yy`,name:`${n}-yy`,type:"text",placeholder:"YY",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.year(),class:u,style:o,oninput:()=>R(this.year,s,"yy",this.dom)})])];return t(c==="default"?We:Re,e,p)}}class Ge{constructor(){this.day=a();this.month=a();this.year=a();this.valid=a.lift((e,t,a)=>{const s=parseInt(a);const n=parseInt(t)-1;const i=parseInt(e);const l=new Date(s,n,i);return l.getFullYear()===s&&a.length===4&&l.getMonth()===n&&l.getDate()===i&&e.length===2&&t.length===2},this.day,this.month,this.year);this.date=a.lift((e,t,a,s)=>s?`${a}-${t}-${e}`:"",this.day,this.month,this.year,this.valid)}oninit({attrs:{value:t}}){t.map(t=>{const a=new Date(String(t));if(e.isDate(a)&&!isNaN(a.getTime())){this.day(e.padStart(String(a.getDate()),2,"0"));this.month(e.padStart(String(1+a.getMonth()),2,"0"));this.year(String(a.getFullYear()))}});L(this.date,t)}oncreate({dom:e}){const t=e.querySelector("input");z(t,this.valid,"Invalid Date");this.dom=e}onremove(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)}view({attrs:e}){const{id:a,name:s=a,required:n,readonly:i,disabled:l,layout:r="default",uiClass:c={},options:o}=e.field;const d=o&&o.length?o[0].value:"en-GB";const u=d==="en-US";const p=v(c);const f=t(".dib",[t("input.w-100.bg-transparent.bn.outline-0",{id:`${a}-dd`,name:`${s}-dd`,type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:n,readonly:i,disabled:l,value:this.day(),oninput:()=>R(this.day,a,"dd",this.dom,u?"yyyy":"mm"),class:p,style:{maxWidth:"3ex",textAlign:this.day()&&this.day().length===2?"center":"left"}})]);const m=t(".dib",[t("input.w-100.bg-transparent.bn.outline-0",{id:`${a}-mm`,name:`${s}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:n,readonly:i,disabled:l,value:this.month(),oninput:()=>R(this.month,a,"mm",this.dom,u?"dd":"yyyy"),class:p,style:{maxWidth:"3.5ex",textAlign:this.month()&&this.month().length===2?"center":"left"}})]);const h=t(".dib",[t("input.w-100.bg-transparent.bn.outline-0",{id:`${a}-yyyy`,name:`${s}-yyyy`,type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:n,readonly:i,disabled:l,value:this.year(),oninput:()=>R(this.year,a,"yyyy",this.dom),class:p,style:{maxWidth:"5ch"}})]);const g=t("span.self-center","/");const b=u?[m,g,f,g,h]:[f,g,m,g,h];return t(r==="default"?We:Re,e,b)}}class Ze{constructor(){this.showPassword=a(false)}view({attrs:{field:e,value:a}}){const{label:s,id:n,name:l=n,title:r=s,placeholder:c,maxlength:o,minlength:d,required:u,readonly:p,disabled:f,autofocus:m,autocomplete:h,pattern:b,inputmode:w,instant:x,uiClass:I={}}=e;return t("fieldset",{class:g(I,f)},[D(n,I,s,u),t("div.w-100.flex.items-center",{class:y(I,he(e,a()))},t("input.w-100.bg-transparent.bn.outline-0",{id:n,name:l,title:r,placeholder:c,type:this.showPassword()?"text":"password",maxlength:o,minlength:d,required:u,readonly:p,disabled:f,autofocus:m,autocomplete:h,pattern:b,inputmode:w,class:v(I),value:a(),autocorrect:"off",[x?"oninput":"onchange"]:M(a)}),t("i.ml1.pa1.fa-fw.pointer.dim",{title:i.showPassTxt,class:this.showPassword()?i.hidePassIcn:i.showPassIcn,onclick:()=>this.showPassword(!this.showPassword())}))])}}class Je{view({attrs:e}){const{label:a,id:s,name:n=s,title:i=a,placeholder:l,required:r,readonly:c,disabled:o,autofocus:d,autocomplete:u,spellcheck:p,instant:f,layout:m="default",uiClass:h={}}=e.field;const{value:g}=e;return t(m==="default"?We:Re,e,t("textarea.w-100.bg-transparent.bn.outline-0.h-100",{id:s,name:n,title:i,placeholder:l,required:r,readonly:c,disabled:o,autofocus:d,autocomplete:u,spellcheck:p,class:x(h),value:g(),style:{resize:"none"},[f?"oninput":"onchange"]:M(g)}))}}class Ke{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:s="",id:n,name:l=n,title:r=s,required:c,readonly:o,disabled:d,autocomplete:u,uiClass:p={}}=e;return t("fieldset",{class:g(p,d)},t("div",{class:y(p)},[t("label.flex.items-center",{title:r,class:w(p,d,o),"data-input-id":n},t("input.clip[type=checkbox]",{id:n,name:l,checked:a(),required:c,autocomplete:u,disabled:d||o,onchange:A(a)}),t("i.mr2",{class:i[a()?this.onIcon:this.offIcon]}),q(s,c),t(pe,{field:e,value:a}))]))}}class Qe extends Ke{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}class Xe{view({attrs:{field:a,value:s}}){const{label:n,id:i,name:l=i,required:r,readonly:c,disabled:o,autocomplete:d,options:u,uiClass:p={}}=a;return t("fieldset",{class:g(p,o)},[D(i,p,n,r),t("div",{class:y(p,he(a,s())),onchange:M(s)},e.map(u,({value:e,label:a=e,icon:n})=>{const u=s()===e;return t("label.dib",{title:a,class:I(p,u,o,c),"data-input-id":i},t("input.clip[type=radio]",{name:l,value:e,checked:u,required:r,autocomplete:d,disabled:o||c}),n?t("i.fa-fw",{class:n}):a)}))])}}class et{view({attrs:{field:a,value:s}}){const{label:n,id:i,name:l=i,title:r=n,required:c,readonly:o,disabled:d,autofocus:u,autocomplete:p,uiClass:f={},options:m}=a;return t("fieldset",{class:g(f,d)},[D(i,f,n,c),t("div",{class:y(f,he(a,s()))},t("select.w-100.bg-transparent.bn.outline-0",{id:i,name:l,title:r,required:c,readonly:o,disabled:d,autofocus:u,autocomplete:p,class:v(f),value:s(),onchange:M(s)},e.map(m,({value:e,label:a=e})=>t("option",{value:e,disabled:d||o},a))))])}}class tt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s,displayType:n}}){const l=e.head(s());const{disabled:r,uiClass:c={}}=a;const o=n==="none"||!l?i.addFileTxt:l.name;return t("fieldset",{class:g(c,r)},t(xe,{field:a,multiple:false,dragging:this.dragging,onSet:Ie(s,true),value:s},t("div",{class:y(c,ge(a,s()))},t(".flex.items-center.pa1",{class:$(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",o),l&&n!=="none"?[t(Se,l),t("i.pa1.pointer.dim",{title:`Remove ${l.name}`,class:i.cancelIcn,onclick:$e(s,l.guid)})]:null]))))}}function at(a,s,n=false){return i=>{const l=n?[]:a();return Promise.all(e.map(i,e=>K(e,s,e.type).then(t=>{const a=V(O(t),e.name);l.push({guid:S(),name:a.name,path:"not_set",file:a,dataUrl:t})}))).then(()=>{a(l);t.redraw()})}}class st{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const{disabled:n,uiClass:l={}}=a;return t("fieldset",{class:g(l,n)},[t(xe,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:at(s,i.imageMaxSize),value:s},t("div",{class:y(l,ge(a,s()))},t(".w-100.pa1.dt.tc",{class:$(this.dragging())},t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn})))),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),e=>t(Te,{src:P(e.path,e.dataUrl),style:c()},t(".absolute.top-0.right-0.child",t(ae,{title:`Remove ${e.name}`,icon:i.deleteIcn,onclick:$e(s,e.guid)})))))])}}class nt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const n=e.head(s());const{disabled:l,uiClass:c={}}=a;return t("fieldset",{class:g(c,l)},t(xe,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:at(s,i.imageMaxSize,true),value:s},t("div",{class:y(c,ge(a,s()))},t(".pa1",{class:$(this.dragging())},t(".relative.w-100.dt.tc",n?[t("img.img.contain",{title:n.name,src:P(n.path,n.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${n.name}`,onclick:$e(s,n.guid)},t("i.pa1",{class:i.cancelIcn}))]:t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn}))))))}}class it{oncreate({dom:t}){const a=t.children[0];const n=C();this.signaturePad=new s(a,{minWidth:.5*n,maxWidth:1.5*n});const i=()=>{const e=C();a.width=a.offsetWidth*e;a.height=a.offsetHeight*e;const t=a.getContext("2d");t.scale(e,e);this.resetCanvas()};this.resizeHandler=e.debounce(i,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);i()}onremove(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}view({attrs:{style:e,onSet:a,onCancel:s}}){return[t(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:e},t("canvas.aspect-ratio--object")),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(ae,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:()=>{if(!this.signaturePad.isEmpty()){a(this.signaturePad.toDataURL("image/png"))}}}),t(ae,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:()=>this.resetCanvas()}),t(ae,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]}resetCanvas(){this.signaturePad.clear()}}function lt(e,t,a){return()=>{if(e()){a(ee(e(),t),{text:e(),heightPct:t})}return false}}class rt{constructor(){this.text=a("")}oncreate({dom:e}){const t=e.children[0];t.focus({preventScroll:false});this.scaleText(e)}onupdate({dom:e}){this.scaleText(e)}view({attrs:{heightPct:e,style:a,onSet:s,onCancel:n}}){return[t("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:a,onsubmit:lt(this.text,e,s)},t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:M(this.text),value:this.text(),style:{"font-family":i.signFont}})),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(ae,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:lt(this.text,e,s)}),t(ae,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:()=>this.text("")}),t(ae,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:n})])]}scaleText(e){const t=e.clientHeight;e.style.fontSize=`${.56*t}px`}}function ct(e,t,a){return()=>a(ee(t,e),{text:t,heightPct:e})}class ot{view({attrs:{heightPct:e,stampTxt:a,stampSetTxt:s,onSet:n}}){return[t("span.clip",{style:{"font-family":i.signFont}},s),t(".flex",t(ae,{label:a,classes:`flex-auto ${i.stampBtnClass}`,context:i.stampBtnContext,onclick:ct(e,s,n)}))]}}const dt={["draw"]:it,["type"]:rt,["stamp"]:ot};function ut(e,a,s){return(n,i)=>Q(n,s).then(s=>{e([j(s,`sign-${a}.png`,i)]);t.redraw()})}class pt{oninit({attrs:{value:e}}){this.valUpdate=e.map(()=>this.setSignType())}onremove(){this.valUpdate.end()}view({attrs:{field:a,value:s}}){const{label:n,id:l,readonly:r,disabled:c,uiClass:o={},options:d=i.signOpts,heightPct:p=i.signHeightPct,stampTxt:f=i.stampTxt,stampSetTxt:m=i.stampSetTxt}=a;const h={paddingBottom:`${p}%`};const b=e.head(s());const v=e(d).map(({value:e})=>{if(e==="draw"){return{type:e,icon:i.drawIcn,label:i.signDrawTxt}}else if(e==="type"){return{type:e,icon:i.typeIcn,label:i.signTypeTxt}}else if(e==="stamp"){return{type:e,icon:i.stampIcn,label:i.signStampTxt}}return null}).compact().value();if(v.length===1&&!b){this.setSignType(v[0].type)}return t("fieldset.relative",{class:g(o,c)},[D(l,o,n),t("div",{class:this.signType!=="stamp"?y(o,ge(a,s())):undefined},r||c?t(".aspect-ratio",{id:l,style:h},b?t(".aspect-ratio--object",{style:{"pointer-events":"none"}},t("img.img.w-100.absolute",{src:P(b.path,b.dataUrl)})):null):this.signType?t(dt[this.signType],{heightPct:p,stampTxt:f,stampSetTxt:m,style:h,onSet:ut(s,l,i.signMaxSize),onCancel:e.bind(this.setSignType,this,undefined)}):t(".aspect-ratio.pointer",{id:l,class:u.fileInput,style:h},b?t(".aspect-ratio--object.hide-child.dim",{onclick:e.bind(s,this,[])},[t("img.img.w-100.absolute",{src:P(b.path,b.dataUrl)}),t(".pa3.absolute.top-0.right-0.child",t("i.fa-2x",{class:i.resetIcn}))]):t(".aspect-ratio--object.flex",e.map(v,({type:a,icon:s,label:n})=>t(".flex-auto.flex.items-center.justify-center.dim",{title:n,onclick:e.bind(this.setSignType,this,a)},t("i.fa-2x.ma1",{class:s}),t("span.ma1.dn.db-ns.truncate",n))))))])}setSignType(e){this.signType=e}}function ft(a,s){return n=>{const l=s?[]:a();return Promise.all(e.map(n,e=>{if(_(e.type)){return K(e,i.imageMaxSize,e.type).then(t=>{const a=V(O(t),e.name);l.push({guid:S(),name:a.name,path:"not_set",file:a,dataUrl:t})})}else{l.push({guid:S(),name:e.name,path:"not_set",file:e});return Promise.resolve()}})).then(()=>{a(l);t.redraw()})}}class mt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const n=e.head(s());const{disabled:l,uiClass:c={}}=a;return t("fieldset",{class:g(c,l)},t(xe,{field:a,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:ft(s,true),value:s},t("div",{class:y(c,ge(a,s()))},t(".flex.items-center.pa1",{class:$(this.dragging())},n?n.dataUrl?[t(".relative.w-100.dt.tc",t("img.img.contain",{title:n.name,src:P(n.path,n.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${n.name}`,onclick:$e(s,n.guid)},t("i.pa1",{class:i.cancelIcn})))]:[t(Se,n),t("span.ma1.flex-auto",{title:n.name},n.name),t("i.pa1.pointer.dim",{title:`Remove ${n.name}`,class:i.cancelIcn,onclick:$e(s,n.guid)})]:[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))))}}class ht{constructor(){this.dragging=a(false)}view({attrs:{field:e,value:a,displayType:s,showDisplay:n=true}}){const{disabled:l,uiClass:r={}}=e;return t("fieldset",{class:g(r,l)},[t(xe,{field:e,defaultAccept:"*",dragging:this.dragging,onSet:ft(a,false),value:a},t("div",{class:y(r,ge(e,a()))},t(".flex.items-center.pa1.dt",{class:$(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))),n?t(Ce,{displayType:s,value:a}):null])}}export{te as Badge,Ne as BaseInput,re as BaseText,ae as Button,se as ButtonLink,Ye as CardDateInput,fe as Checkbox,Ke as CheckboxInput,Oe as CurrencyInput,Ge as DateInput,ce as DateText,Ce as DisplayTypeComponent,Pe as FileList,ke as FileMulti,tt as FileSelect,Ue as ImageList,st as ImageMulti,De as ImagePreview,nt as ImageSelect,Le as Label,ue as Link,ht as MultiOmniFileInput,ne as NavButton,ie as NavLink,mt as OmniFileInput,Ze as PasswordInput,ze as PasswordStrength,Xe as RadioInput,et as SelectInput,qe as SelectText,pt as SignBuilder,Je as TextareaInput,me as Toggle,Qe as ToggleInput,le as Trusted,ee as createStamp,je as currencyStrToNumber,O as dataURItoBlob,j as dataUrlToFile,V as fileConstructor,N as fileNameExtSplit,E as getOrientation,S as guid,de as iconMap,oe as linkAttrs,Be as numberToCurrencyStr,_e as numberToCurrencyTuple,C as pxRatio,Y as readArrayBuffer,G as readOrientation,K as resizeImage,Q as scaleDataUrl,J as scaleRect,X as textToImage,m as updateButtonContext,p as updateClasses,l as updateConfig};
