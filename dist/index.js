/* @preserve built on: 2021-11-02T15:22:40.086Z */
import e from"lodash";import t from"mithril";import a from"mithril/stream";import n from"signature_pad";const s={layoutType:"default",imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",openFileTxt:"Open file",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-signature",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-check",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};const i=s;function l(t){e.assign(s,t)}function r(){return{"max-height":i.imageDispHeight}}function c(){return{"max-height":i.thumbDispHeight}}const o={wrapper:"",label:"silver",inputWrapper:"ba br2 b--silver pa2 ma0 dark-gray",input:"dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40",invalidInputWrapper:""};const d=o;function u(t){e.assign(o,t)}const p={default:"bg-light-blue dark-gray"};function h(t){e.assign(p,t)}function f(e="default"){if(e&&e in p){return p[e]}else{return""}}function m({wrapper:e="",merge:t=true},a){return`${e} ${t?d.wrapper:""} ${a?d.disabledWrapper:""}`}function g({label:e="",merge:t=true},a){return`${e} ${t?d.label:""} ${a?d.requiredLabel:""}`}function v({inputWrapper:e="",merge:t=true},a){return`${e} ${t?d.inputWrapper:""} ${a?d.invalidInputWrapper:""}`}function y({input:e="",merge:t=true}){return`${e} ${t?d.input:""}`}function b(e,t,a){return`${y(e)} ${$(t,a)}`}function x({input:e="",merge:t=true}){return`${e} ${t?d.textarea:""}`}function w({input:e="",merge:t=true},a,n,s){return`${e} ${t?d.radio:""} ${a?d.radioChecked:d.radioUnchecked} ${$(n,s)}`}function I(e){return`${d.fileInput} ${e?d.fileHover:""}`}function $(e,t){return e||t?"":"pointer"}function k(e){return(e+256).toString(16).substr(1)}function T(){const e=new Uint8Array(16);const t=window.crypto;t.getRandomValues(e);return[k(e[0]),k(e[1]),k(e[2]),k(e[3]),"-",k(e[4]),k(e[5]),"-",k(e[6]),k(e[7]),"-",k(e[8]),k(e[9]),"-",k(e[10]),k(e[11]),k(e[12]),k(e[13]),k(e[14]),k(e[15])].join("")}function S(){return Math.max(window.devicePixelRatio,1)}function C(e,t){return t?`${e}${i.requiredLblPost}`:e}function P(e,t){return t?t:e}function q(e){return e?t("span.mr2.truncate",{title:e,class:d.displayLabel},e):null}function D(e,a,n,s){return n?t("label.mb1.db",{title:n,for:e,class:g(a,s)},C(n,s)):null}function F(e,a,n){return[e?t("i.fa-fw",{class:`${a?"mr2":""} ${e}`}):null,a,n?t("i.fa-fw",{class:`${a?"ml2":""} ${n}`}):null]}function U(e){return function({target:{value:t}}){e(t)}}function A(e){return function({target:{checked:t}}){e(t)}}function O(e){switch(e){case"day":return"dd";case"month":return"mm";case"year":return"yyyy"}}function H(e,t,a){const n=e.querySelector(`#${t}-${a}`);n.focus()}function M(e,t,a){switch(e){case"dd":return(isNaN(t)||t<=3)&&((isNaN(a)||t===3&&a<=1||t<3)&&!(t===0&&a===0));case"mm":return(isNaN(t)||t<=1)&&((isNaN(a)||t===1&&a<=2||t<1)&&!(t===0&&a===0));case"yyyy":return(isNaN(t)||t>=1&&t<3)&&(isNaN(a)||t===1&&a===9||t===2);case"yy":return isNaN(t)||t>=0}}function W(e,t,a){if(e!==t()){const n=e.querySelector("input");z(n,a,"Invalid Date");t(e)}}function z(e,t,a){t.map(t=>{const n=t?"":`${a}`;e.setCustomValidity(n)})}function N(e,t,a,n,s){const i=parseInt(t.getAttribute("maxlength"));if(n.length===i&&a){const t=s.querySelector(`#${e}-${a}`);t.focus()}}function L(e,t,a,n,s){const i=n.querySelector(`#${e}-${t}`);if((s.key==="Backspace"||s.key==="Delete")&&a.length===0&&i){i.focus();s.preventDefault()}}function R(e,t,a,n,s,i){const l=n.querySelector(`#${t}-${a}`);const r=e()?e():"";const c=l.value;const o=/^\d*$/.test(c);const d=parseInt(c.charAt(0));const u=parseInt(c.charAt(1));const p=M(a,d,u);if(s.inputType==="deleteContentForward"||s.inputType==="deleteContentBackward"){e("");return}if((o||c==="")&&p&&c.length<=4){e(c)}else{e(r)}N(t,l,i,e(),n)}function B(e){const t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function V(e){const t=e.split(",");const a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);const n=t[0].split(":")[1].split(";")[0];const s=a.length;const i=new Uint8Array(s);for(let e=0;e<s;e++){i[e]=a.charCodeAt(e)}return new Blob([i],{type:n})}function Y(e,t){const a=(new Date).valueOf();const n=e;n.name=t;n.lastModified=a;return e}function j(e,t,a){const n=Y(V(e),t);return{guid:T(),name:n.name,path:"not_set",file:n,dataUrl:e,metadata:a}}function E(e){const[,t]=B(e.name);switch(t.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return i.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return i.videoFileIcn;case".pdf":return i.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return i.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return i.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return i.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return i.imageIcn;default:return i.fileIcn}}function _(e){return e&&e.includes("image")}function Z(e){const t=Math.min(e.byteLength,64*1024);const a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}const n=a.byteLength;let s=2;while(s<n){const e=a.getUint16(s,false);s+=2;if(e===65505){s+=2;if(a.getUint32(s,false)!==1165519206){return-1}s+=6;const e=a.getUint16(s,false)===18761;s+=a.getUint32(s+4,e);const t=a.getUint16(s,e);s+=2;for(let n=0;n<t;n++){if(a.getUint16(s+n*12,e)===274){return a.getUint16(s+n*12+8,e)}}}else if((e&65280)!==65280){break}else{s+=a.getUint16(s,false)}}return-1}function G(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>{t(a.result)};a.readAsArrayBuffer(e)})}function J(e){return G(e).then(Z)}function K(e,t,a,n){if(!n||n>8){return}switch(n){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function Q(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function X(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return J(e).then(n=>new Promise(s=>{const i=new Image;i.onload=()=>{const e=document.createElement("canvas");const[l,r]=Q(i.width,i.height,t);if(n>4){e.width=r;e.height=l}else{e.width=l;e.height=r}const c=e.getContext("2d");K(c,l,r,n);c.drawImage(i,0,0,l,r);s(e.toDataURL(a))};const l=new FileReader;l.onload=()=>i.src=l.result;l.readAsDataURL(e)}))}function ee(e,t){return new Promise(a=>{const n=new Image;n.onload=()=>{const e=document.createElement("canvas");const[s,i]=Q(n.width,n.height,t);e.width=s;e.height=i;const l=e.getContext("2d");l.drawImage(n,0,0,s,i);a(e.toDataURL())};n.src=e})}function te(e,t,a,n){const s=document.createElement("canvas");s.width=t;s.height=a;const i=.56*s.height;const l=s.getContext("2d");l.textBaseline="middle";l.font=`${i}px ${n}`;l.fillText(e,s.height*.05,i);return s.toDataURL()}function ae(e,t){const a=i.signMaxSize;const n=.01*t*a;return te(e,a,n,i.signFont)}class ne{view({attrs:{label:e,classes:a="bg-red"},children:n}){return t(".relative.dib",[n,e?t("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:a,style:{minWidth:"0.65rem"}},e):null])}}class se{view({attrs:{label:e,type:a="button",title:n=e,icon:s,rightIcon:i,context:l,classes:r="",style:c,disabled:o,onclick:u}}){return t("button.button-reset",{type:a,title:n,disabled:o,class:`${r} ${o?d.disabledWrapper:"pointer"} ${f(l)} ${d.button}`,style:c,onclick:u},F(s,e,i))}}class ie{view({attrs:{label:e,title:a=e,icon:n,rightIcon:s,href:i,rel:l,target:r,download:c,context:o,classes:u="",style:p}}){return t("a.link.flex.items-center",{href:i,rel:l,target:r,download:c,title:a,class:`${u} ${f(o)} ${d.button}`,style:p},F(n,e,s))}}class le{view({attrs:{label:e,title:a=e,icon:n,rightIcon:s,classes:i="",style:l,disabled:r,onclick:c}}){return t(".mh2.pa2.truncate",{title:a,disabled:r,class:`${i} ${r?d.disabledWrapper:"pointer"} ${d.navButton}`,style:l,onclick:c},F(n,e,s))}}class re{view({attrs:{label:e,title:a=e,icon:n,rightIcon:s,href:i,rel:l,target:r,download:c,classes:o="",style:u}}){return t("a.link.mh2.pa2.truncate",{href:i,rel:l,target:r,download:c,title:a,class:`${o} ${d.navButton}`,style:u},F(n,e,s))}}class ce{view({attrs:{value:e}}){return t(".pa2",{},t.trust(e()))}}class oe{view({attrs:{field:e,value:a}}){const{label:n,uiClass:s={}}=e;return t(".pa2.flex.flex-wrap",{class:m(s)},[q(n),t("span.ws-normal",{title:a(),class:d.displayValue},a())])}}class de{formatter(e){return e?new Date(String(e)).toLocaleDateString():e}oninit({attrs:{value:e}}){this.formatted=e.map(this.formatter)}onremove(){this.formatted.end(true)}view({attrs:{field:e}}){return t(oe,{field:e,value:this.formatted})}}function ue(e,t){if(e==="email"){return{href:`mailto:${t}`,class:d.displayValue}}else if(e==="tel"){return{href:`tel:${t}`,class:d.displayValue}}else{return{href:t,target:"_blank",class:d.displayValue}}}const pe={email:i.emailIcn,tel:i.telIcn};class he{view({attrs:{field:e,value:a}}){const{label:n,type:s="url",uiClass:l={}}=e;return t(".pa2.flex.flex-wrap",{class:m(l)},[q(n),t("a.link.dim.pointer.ws-normal",ue(s,a()),t("i.mr2",{class:pe[s]||i.linkIcn}),a())])}}class fe{view({attrs:{field:a,value:n}}){const{options:s=[]}=a;const i=e.find(s,e.matches({value:n()||false}));return i?t("span.ml2",i.label):null}}class me{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:n,uiClass:s={}}=e;return t(".pa2.flex.items-center",{class:m(s)},[q(n),t("i",{class:`${d.displayValue} ${i[a()?this.onIcon:this.offIcon]}`}),t(fe,{field:e,value:a})])}}class ge extends me{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}function ve(e,t){if(e.required&&!t){return true}if(e.pattern!=null){if(be(e.pattern,String(t)))return true}if(ye(e,t))return true;return false}function ye(e,t){let a=false;let n=false;if(e.min!=null){n=Number.parseInt(String(t))<e.min}if(e.max!=null){a=Number.parseInt(String(t))>e.max}if(e.minlength!=null){n=String(t).length<e.minlength}if(e.maxlength!=null){a=String(t).length>e.maxlength}return n||a}function be(e,t){return!new RegExp(e).test(t)}function xe(e,t){if(e.required){return t.length<1}return false}function we(e){return t=>{t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function Ie(e){return t=>{t.preventDefault();e(false)}}function $e(e,t){return a=>{a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function ke(e){return({target:{files:t}})=>e(t)}class Te{oncreate({dom:e,attrs:{value:t}}){t.map(t=>{if(t.length===0){e.firstChild.value=""}})}view({attrs:{field:a,defaultAccept:n="*",multiple:s=true,dragging:i,onSet:l},children:r}){const{label:c,id:o,name:d=o,title:u=c,required:p,readonly:h,disabled:f,autofocus:m,accept:v=n,uiClass:y={}}=a;return t("label.db",e.extend({for:o,title:u,class:$(f,h),"data-input-id":o},f||h?{}:{ondragover:we(i),ondragleave:Ie(i),ondrop:$e(i,l)}),[t("input.clip[type=file].bg-transparent.bn.outline-0",{id:o,name:d,multiple:s,accept:v,required:p,autofocus:m,disabled:f||h,onchange:ke(l)}),c?t("span.db.mb1",{class:g(y,p)},C(c,p)):null,r])}}function Se(t,a=false){return n=>{const s=a?[]:t();e.each(n,e=>{s.push({guid:T(),name:e.name,path:"not_set",file:e})});t(s)}}function Ce(t,a){return n=>{n.preventDefault();const s=t();e.remove(s,{guid:a});t(s)}}class Pe{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:n}}){const{disabled:s,uiClass:l={}}=a;return t("div",{class:m(l,s)},[t(Te,{field:a,dragging:this.dragging,onSet:Se(n),value:n},t("div",{class:v(l,xe(a,n()))},t(".pa2",{class:I(this.dragging())},[t("i.mr2",{class:i.uploadIcn}),t("span",i.addFilesTxt)]))),t(".flex.flex-column.mt1.nb1",e.map(n(),e=>t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:i.downloadIcn}),e.name,t("i.child.fr",{title:`${i.remFileTtl} ${e.name}`,class:i.deleteIcn,onclick:Ce(n,e.guid)})])))])}}class qe{view({children:e,attrs:a}){return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[a.src&&a.src!=="not_set"?t("img.contain",{src:a.src}):null,a.data&&a.data.file&&(a.src==="not_set"||!a.src)?t("div.contain.tc.br5.6rem",{class:`${E(a.data)} fa-2x`,tooltip:a.data.file.type}):null,e])}}class De{view({attrs:e}){return t("i.pa1",{class:E(e),title:i.openFileTxt,onclick:e.path!=="not_set"?()=>window.open(e.path,"_blank"):undefined})}}class Fe{view({attrs:{displayType:a="thumbnail",value:n}}){return a==="thumbnail"?t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(n(),e=>t(qe,{src:P(e.path,e.dataUrl),data:e,style:c()},t(".absolute.top-0.right-0.child",t(se,{title:`Remove ${e.name}`,icon:i.deleteIcn,onclick:Ce(n,e.guid)}))))):t(".pa2.flex.flex-column",e.map(n(),e=>t(".flex.items-center.pa1.ba.b--black-20",[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",{title:e.name},e.name),t(De,e),t("i.pa1.pointer.dim",{title:`Remove ${e.name}`,class:i.cancelIcn,onclick:Ce(n,e.guid)})])))}}class Ue{view({attrs:{field:a,value:n}}){const{label:s,uiClass:i={}}=a;const l=e.find(a.options,{value:n()});const r=l?l.label||l.value:n();return t(".pa2.flex.flex-wrap",{class:m(i)},[q(s),t("span.ws-normal",{title:r,class:d.displayValue},r)])}}class Ae{view({attrs:{field:a,value:n}}){const{label:s,uiClass:l={}}=a;return t(".pa2.flex.flex-column",{class:m(l)},[q(s),t(".flex.flex-column.mt1.nb1",e.map(n(),({name:e,path:a})=>t("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:d.displayValue,href:a},t("i.mr2",{class:i.downloadIcn}),e)))])}}class Oe{view({attrs:{field:a,value:n}}){const{label:s,uiClass:i={}}=a;return t(".pa2.flex.flex-column",{class:m(i)},[q(s),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(n(),({name:e,path:a,dataUrl:n})=>t(qe,{title:e,src:P(a,n),style:c()})))])}}class He{view({attrs:{field:a,value:n}}){const{label:s,uiClass:l={}}=a;const c=e.head(n());return t(".pa2.flex.flex-column",{class:m(l)},[q(s),c?t("img.img.h-100.mt2.contain.self-center",{title:c.name,src:P(c.path,c.dataUrl),style:r()}):t("i.mt2",{class:`${d.displayValue} ${i.imageIcn}`})])}}function Me(e,t){return(e.match(t)||[]).length}function We(e){let t=0;if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(Me(e,/[A-Z]/g)>1&&Me(e,/[a-z]/g)>2){t=t+1}if(Me(e,/[\d]/g)>1){t=t+1}if(Me(e,/[!"£%^@#$&*]/g)>0){t=t+1}}return t}function ze(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}const Ne=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];class Le{oninit({attrs:{value:e}}){this.passwordScore=e.map(e=>We(String(e)))}onremove(){this.passwordScore.end()}view({attrs:{field:a}}){const{label:n}=a;return t(".flex.flex-column",[q(n),t(".flex.mt1",e.map(Ne,e=>t(".h1.w-20",{class:this.passwordScore()>=e.value?e.background:"bg-transparent"}))),t("span.f5.truncate",ze(this.passwordScore()))])}}class Re{view({attrs:{field:{label:e="",title:a=e,required:n,uiClass:s={}}}}){return t("div",{class:m(s)},t("label",{title:a,class:g(s)},C(e,n)))}}class Be{constructor(){this.invalid=false;this.selector="input"}onupdate({dom:e,attrs:{field:a,value:n}}){const s=e.querySelector(this.selector);const i=ve(a,n())||(s?!s.checkValidity():false);if(i!==this.invalid){this.invalid=i;t.redraw()}}}class Ve{view({attrs:e,children:a}){const{field:n,invalid:s}=e;const{label:i,id:l,type:r="text",required:c,disabled:o,uiClass:d={}}=n;return t("div",{class:r==="hidden"?"clip":m(d,o)},[D(l,d,i,c),t("fieldset.bn",{class:v(d,s)},a)])}}const Ye="0.7em";const je="0.3s ease-in-out";class Ee{constructor(){this.focus=false;this.focusIn=()=>{this.focus=true};this.focusOut=()=>{this.focus=false};this.wrapperHeight=0}oncreate({dom:e}){this.inputWrapper=e.firstElementChild;this.calcHeight()}onupdate(){this.calcHeight()}calcHeight(){if(this.inputWrapper.clientHeight!==this.wrapperHeight){this.wrapperHeight=this.inputWrapper.clientHeight;t.redraw()}}shouldFloat(e,t){return e==="floatAlways"||t||this.focus}labelTranslateY(){return`calc(${this.wrapperHeight*.5}px - 1.5ex)`}view({attrs:e,children:a}){const{field:n,invalid:s,value:l,xform:r=l}=e;const{label:c,id:o,type:d="text",placeholder:u,required:p,disabled:h,layout:f=i.layoutType,uiClass:y={}}=n;const b=this.shouldFloat(f,u||r());return t("div",{class:d==="hidden"?"clip":m(y,h),style:c?{paddingTop:"0.5rem"}:{},onfocusin:this.focusIn,onfocusout:this.focusOut},t("fieldset.relative.pa0.ma0.flex.w-100",{class:v(y,s)},[c&&this.wrapperHeight?[t("legend.db",{class:g(y,p),style:{visibility:"hidden",height:"0.5ch",transition:`max-width ${je}`,maxWidth:b?"100%":"0.01px"}},t("span",{style:{fontSize:Ye}},C(c,p))),t(".absolute.top-0",{class:g(y,p),style:{transition:`transform ${je}`,transform:`translateY(${b?"-1ch":this.labelTranslateY()})`}},t("label.db",{for:o,title:c,style:{transition:`font-size ${je}`,fontSize:b?Ye:"1em"}},C(c,p)))]:null,a]))}}class _e{constructor(){this.layout=Ee}view({attrs:e,children:a}){const{field:{layout:n=i.layoutType}}=e;return t(n==="default"?Ve:this.layout,e,a)}}class Ze extends Ee{shouldFloat(){return true}}class Ge extends _e{constructor(){super(...arguments);this.layout=Ze}}const Je=new Set(["date","datetime-local","color","range"]);class Ke extends Be{view({attrs:e}){const{field:a,value:n,xform:s=n}=e;const{label:i,id:l,type:r="text",name:c=l,title:o=i,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:v,disabled:b,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,instant:T,uiClass:S={}}=a;const C=Je.has(r)?Ge:_e;return t(C,{field:a,value:n,xform:s,invalid:this.invalid},t("input.w-100.bg-transparent.bn.outline-0",{id:l,type:r,name:c,title:o,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:v,disabled:b,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,class:y(S),value:s(),[T?"oninput":"onchange"]:U(n)}))}}class Qe{view({attrs:a}){const{field:n,value:s,xform:i=s}=a;const{label:l,id:r,name:c=r,title:o=l,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:v,disabled:b,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,instant:T,uiClass:S={},options:C}=n;const P=C&&C.length?C[0].value:"$";return t(Ge,{field:n,value:s,invalid:ve(n,s())},t(".flex.flex-row.w-100",t("span.mr1.self-center",{class:y(S)},P),t("input.w-100.bg-transparent.bn.outline-0",{id:r,type:"text",name:c,title:o,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:v,disabled:b,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,class:y(S),value:e.isUndefined(i())?null:tt(Xe(i())),[T?"oninput":"onchange"]:nt(s)})))}}function Xe(t){return e.isString(t)?e.parseInt(t):Number(t)}function et(t){const a=t.replace(/[^\d.]/g,"");let n;let s=0;if(a.indexOf(".")>-1){const t=a.indexOf(".");const i=a.substring(0,t);n=e.parseInt(e.padStart(i,1,"0"));const l=a.substring(t+1,Math.min(t+3,a.length));s=e.parseInt(e.padEnd(l,2,"0"))}else{n=e.parseInt(a)||0}return n*100+s}function tt(e){const t=at(e);if(t){return`${t[0]}.${t[1]}`}else{return t}}function at(t){if(!e.isFinite(t)){return undefined}const a=String(Math.abs(t));let n="0";let s="";if(a.length>2){const e=a.length-2;n=a.substring(0,e);s=a.substring(e)}else{s=e.padStart(a,2,"0")}return[n,s]}function nt(e){return({target:{value:t}})=>e(et(t))}class st{view({attrs:e}){const{id:a}=e.field;return t("input",{style:{display:"none"},id:a})}}class it{constructor(){this.month=a();this.year=a();this.date=a();this.valid=this.date.map(Boolean);this.dom=a();this.focusedInput=a("mm")}buildDate(){this.date(`${this.month()}/${this.year()}`)}updateInputs(e){if(this.month()&&this.month().length===2&&this.year()&&this.year().length===2){this.buildDate();e(this.date())}else{this.date("");e("")}}oninit({attrs:{value:e}}){e.map(e=>{const[t,a=""]=String(e).split("/");if(t.length===2&&a.length===2){this.month(t);this.year(a);this.buildDate()}else if(!e&&this.date()){this.month("");this.year("");this.date("")}})}oncreate({dom:e}){W(e,this.dom,this.valid)}onupdate({dom:e}){W(e,this.dom,this.valid)}onremove(){this.date.end(true);this.year.end(true);this.month.end(true)}view({attrs:a}){const{field:n,value:s}=a;const{id:i,name:l=i,required:r,readonly:c,disabled:o,uiClass:d={}}=n;const u=y(d);return t(Ge,{value:s,field:n,invalid:!this.valid},t(".flex",{onclick:()=>H(this.dom(),i,this.focusedInput()),style:{padding:"1px 2px"}},t("span",[t("input.w-100.bg-transparent.bn.outline-0.tc",{id:`${i}-mm`,name:`${l}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:r,readonly:c,disabled:o,value:this.month(),class:u,style:{maxWidth:"calc(2.8ch + 4px)",padding:"0px"},onfocus:e.partial(this.focusedInput,"mm"),oninput:e=>{R(this.month,i,"mm",this.dom(),e,"yy");this.updateInputs(a.value)}})]),t("span",{style:{padding:"0px",marginRight:"2px"}},"/"),t("span",[t("input.w-100.bg-transparent.bn.outline-0.tc",{id:`${i}-yy`,name:`${l}-yy`,type:"text",placeholder:"YY",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:r,readonly:c,disabled:o,value:this.year(),class:u,style:{maxWidth:"calc(2.7ch + 4px)",padding:"0px"},onfocus:e.partial(this.focusedInput,"yy"),onkeydown:e=>L(i,"mm",this.year(),this.dom(),e),oninput:e=>{R(this.year,i,"yy",this.dom(),e);this.updateInputs(a.value)}}),t(st,a)])))}}class lt{constructor(){this.day=a("");this.month=a("");this.year=a("");this.date=a();this.valid=this.date.map(Boolean);this.dom=a();this.focusedInput=a(undefined);this.locale=a(undefined)}buildDate(){this.date(`${this.year()}-${this.month()}-${this.day()}`)}updateInputs(e){const t=parseInt(this.year());const a=parseInt(this.month())-1;const n=parseInt(this.day());const s=new Date(t,a,n);if(s.getFullYear()===t&&this.year().length===4&&s.getMonth()===a&&s.getDate()===n&&this.day().length===2&&this.month().length===2){this.buildDate();e(this.date())}else{this.date("");e("")}}findNextInput(e){const t=this.dateInputAdvanceOrder.indexOf(e);return t!==this.dateInputAdvanceOrder.length&&O(this.dateInputAdvanceOrder[this.dateInputAdvanceOrder.indexOf(e)+1])}findPrevInput(e){const t=this.dateInputAdvanceOrder.indexOf(e);return t!==0&&O(this.dateInputAdvanceOrder[this.dateInputAdvanceOrder.indexOf(e)-1])}setDateInputs(t){const a=new Intl.DateTimeFormat(t).formatToParts();this.dateParts=a;const n=a[0].type;const s=O(n);this.focusedInput(s);this.dateInputAdvanceOrder=e(this.dateParts).map(({type:e})=>e).filter(e=>e!=="literal").value()}setLocale(e){const{options:t}=e;const a=t&&t.length?t[0].value:undefined;if(a!==this.locale()){this.locale(a)}}oninit({attrs:t}){t.value.map(t=>{const a=new Date(String(t));if(e.isDate(a)&&!isNaN(a.getTime())){const t=e.padStart(String(a.getDate()),2,"0");const n=e.padStart(String(1+a.getMonth()),2,"0");const s=String(a.getFullYear());this.day(t);this.month(n);this.year(s);this.buildDate()}else if(!t&&this.date()){this.day("");this.month("");this.year("");this.date("")}});this.locale.map(e=>{this.setDateInputs(e)});this.setLocale(t.field)}oncreate({dom:e}){W(e,this.dom,this.valid)}onbeforeupdate({attrs:{field:e}}){this.setLocale(e)}onupdate({dom:e}){W(e,this.dom,this.valid)}onremove(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)}view({attrs:a}){const{id:n,name:s=n,required:i,readonly:l,disabled:r,uiClass:c={}}=a.field;const o=y(c);const{field:d,value:u}=a;const p=({type:c,value:d})=>{switch(c){case"literal":return t("span",{style:{padding:"0px",marginRight:"2px"}},d);case"day":return t("span",t("input.w-100.bg-transparent.bn.outline-0.tc",{id:`${n}-dd`,name:`${s}-dd`,type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.day(),class:o,onfocus:e.partial(this.focusedInput,"dd"),onkeydown:e=>L(n,this.findPrevInput("day"),this.day(),this.dom(),e),oninput:e=>{R(this.day,n,"dd",this.dom(),e,this.findNextInput("day"));this.updateInputs(a.value)},style:{maxWidth:"calc(2.3ch + 4px)",padding:"0px"}}));case"month":return t("span",t("input.w-100.bg-transparent.bn.outline-0.tc",{id:`${n}-mm`,name:`${s}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.month(),class:o,onkeydown:e=>L(n,this.findPrevInput("month"),this.month(),this.dom(),e),oninput:e=>{R(this.month,n,"mm",this.dom(),e,this.findNextInput("month"));this.updateInputs(a.value)},onfocus:e.partial(this.focusedInput,"mm"),style:{maxWidth:"calc(2.8ch + 4px)",padding:"0px"}}));case"year":return t("span",t("input.w-100.bg-transparent.bn.outline-0.tc",{id:`${n}-yyyy`,name:`${s}-yyyy`,type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.year(),class:o,onfocus:e.partial(this.focusedInput,"yyyy"),onkeydown:e=>L(n,this.findPrevInput("year"),this.year(),this.dom(),e),oninput:e=>{R(this.year,n,"yyyy",this.dom(),e,this.findNextInput("year"));this.updateInputs(a.value)},style:{maxWidth:"calc(4.2ch + 4px)",padding:"0px"}}))}};return t(Ge,{value:u,field:d,invalid:!this.valid},t(".flex",{onclick:()=>H(this.dom(),n,this.focusedInput()),style:{padding:"1px 2px"}},this.dateParts.map(e=>p(e)),t(st,a)))}}class rt{constructor(){this.showPassword=a(false)}view({attrs:e}){const{field:a,value:n}=e;const{label:s,id:l,name:r=l,title:c=s,placeholder:o,maxlength:d,minlength:u,required:p,readonly:h,disabled:f,autofocus:m,autocomplete:g,pattern:v,inputmode:b,instant:x,uiClass:w={}}=a;return t(_e,{field:a,value:n,invalid:ve(a,n())},t(".flex.flex-row.w-100",[t("input.w-100.bg-transparent.bn.outline-0",{id:l,name:r,title:c,placeholder:o,type:this.showPassword()?"text":"password",maxlength:d,minlength:u,required:p,readonly:h,disabled:f,autofocus:m,autocomplete:g,pattern:v,inputmode:b,class:y(w),value:n(),autocorrect:"off",[x?"oninput":"onchange"]:U(n)}),t("i.ml1.pa1.fa-fw.pointer.dim",{title:i.showPassTxt,class:this.showPassword()?i.hidePassIcn:i.showPassIcn,onclick:()=>this.showPassword(!this.showPassword())})]))}}class ct extends Ee{labelTranslateY(){return"0.5ex"}}class ot extends _e{constructor(){super(...arguments);this.layout=ct}}class dt extends Be{constructor(){super(...arguments);this.selector="textarea"}view({attrs:e}){const{field:a,value:n,xform:s=n}=e;const{label:i,id:l,name:r=l,title:c=i,placeholder:o,required:d,readonly:u,disabled:p,autofocus:h,autocomplete:f,spellcheck:m,instant:g,uiClass:v={}}=e.field;return t(ot,{field:a,value:n,xform:s,invalid:this.invalid},t("textarea.w-100.bg-transparent.bn.outline-0.h-100",{id:l,name:r,title:c,placeholder:o,required:d,readonly:u,disabled:p,autofocus:h,autocomplete:f,spellcheck:m,class:x(v),value:n(),style:{resize:"none"},[g?"oninput":"onchange"]:U(n)}))}}class ut{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:n="",id:s,name:l=s,title:r=n,required:c,readonly:o,disabled:d,autocomplete:u,uiClass:p={}}=e;return t("div",{class:m(p,d)},t("fieldset.w-100.bn",{class:v(p)},[t("label.flex.items-center",{title:r,class:b(p,d,o),"data-input-id":s},t("input.clip[type=checkbox]",{id:s,name:l,checked:a(),required:c,autocomplete:u,disabled:d||o,onchange:A(a)}),t("i.mr2",{class:i[a()?this.onIcon:this.offIcon]}),C(n,c),t(fe,{field:e,value:a}))]))}}class pt extends ut{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}class ht{view({attrs:a}){const{field:n,value:s}=a;const{id:i,name:l=i,required:r,readonly:c,disabled:o,autocomplete:d,uiClass:u={},options:p}=n;return t(Ge,{field:n,value:s,invalid:ve(n,s())},t(".w-100.flex.justify-center",{onchange:U(s),style:{padding:"1px 2px"}},e.map(p,({value:e,label:a=e,icon:n})=>{const p=s()===e;return t("label.dib",{title:a,class:w(u,p,o,c),"data-input-id":i},t("input.clip[type=radio]",{name:l,value:e,checked:p,required:r,autocomplete:d,disabled:o||c}),n?t("i.fa-fw",{class:n}):a)})))}}class ft{view({attrs:a}){const{field:n,value:s}=a;const{label:i,id:l,name:r=l,title:c=i,required:o,readonly:d,disabled:u,autofocus:p,autocomplete:h,uiClass:f={},options:m}=n;return t(_e,{field:n,value:s,invalid:ve(n,s())},t("select.w-100.bg-transparent.bn.outline-0",{id:l,name:r,title:c,required:o,readonly:d,disabled:u,autofocus:p,autocomplete:h,class:y(f),value:s(),onchange:U(s)},e.map(m,({value:e,label:a=e})=>t("option",{value:e,disabled:u||d},a))))}}class mt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:n,displayType:s}}){const l=e.head(n());const{disabled:r,uiClass:c={}}=a;const o=s==="none"||!l?i.addFileTxt:l.name;return t("div",{class:m(c,r)},t(Te,{field:a,multiple:false,dragging:this.dragging,onSet:Se(n,true),value:n},t("div",{class:v(c,xe(a,n()))},t(".flex.items-center.pa1",{class:I(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",o),l&&s!=="none"?[t(De,l),t("i.pa1.pointer.dim",{title:`Remove ${l.name}`,class:i.cancelIcn,onclick:Ce(n,l.guid)})]:null]))))}}function gt(a,n,s=false){return i=>{const l=s?[]:a();return Promise.all(e.map(i,e=>X(e,n,e.type).then(t=>{const a=Y(V(t),e.name);l.push({guid:T(),name:a.name,path:"not_set",file:a,dataUrl:t})}))).then(()=>{a(l);t.redraw()})}}class vt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:n}}){const{disabled:s,uiClass:l={}}=a;return t("div",{class:m(l,s)},[t(Te,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:gt(n,i.imageMaxSize),value:n},t("div",{class:v(l,xe(a,n()))},t(".w-100.pa1.dt.tc",{class:I(this.dragging())},t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn})))),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(n(),e=>t(qe,{src:P(e.path,e.dataUrl),style:c()},t(".absolute.top-0.right-0.child",t(se,{title:`Remove ${e.name}`,icon:i.deleteIcn,onclick:Ce(n,e.guid)})))))])}}class yt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:n}}){const s=e.head(n());const{disabled:l,uiClass:c={}}=a;return t("div",{class:m(c,l)},t(Te,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:gt(n,i.imageMaxSize,true),value:n},t("div",{class:v(c,xe(a,n()))},t(".pa1",{class:I(this.dragging())},t(".relative.w-100.dt.tc",s?[t("img.img.contain",{title:s.name,src:P(s.path,s.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${s.name}`,onclick:Ce(n,s.guid)},t("i.pa1",{class:i.cancelIcn}))]:t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn}))))))}}class bt{oncreate({dom:t}){const a=t.children[0];const s=S();this.signaturePad=new n(a,{minWidth:.5*s,maxWidth:1.5*s});const i=()=>{const e=S();a.width=a.offsetWidth*e;a.height=a.offsetHeight*e;const t=a.getContext("2d");t.scale(e,e);this.resetCanvas()};this.resizeHandler=e.debounce(i,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);i()}onremove(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}view({attrs:{style:e,onSet:a,onCancel:n}}){return[t(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:e},t("canvas.aspect-ratio--object")),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(se,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:()=>{if(!this.signaturePad.isEmpty()){a(this.signaturePad.toDataURL("image/png"))}}}),t(se,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:()=>this.resetCanvas()}),t(se,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:n})])]}resetCanvas(){this.signaturePad.clear()}}function xt(e,t,a){return()=>{if(e()){a(ae(e(),t),{text:e(),heightPct:t})}return false}}class wt{constructor(){this.text=a("")}oncreate({dom:e}){const t=e.children[0];t.focus({preventScroll:false});this.scaleText(e)}onupdate({dom:e}){this.scaleText(e)}view({attrs:{heightPct:e,style:a,onSet:n,onCancel:s}}){return[t("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:a,onsubmit:xt(this.text,e,n)},t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:U(this.text),value:this.text(),style:{"font-family":i.signFont}})),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(se,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:xt(this.text,e,n)}),t(se,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:()=>this.text("")}),t(se,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]}scaleText(e){const t=e.clientHeight;e.style.fontSize=`${.56*t}px`}}function It(e,t,a){return()=>a(ae(t,e),{text:t,heightPct:e})}class $t{view({attrs:{heightPct:e,stampTxt:a,stampSetTxt:n,onSet:s}}){return[t("span.clip",{style:{"font-family":i.signFont}},n),t(".flex",t(se,{label:a,classes:`flex-auto ${i.stampBtnClass}`,context:i.stampBtnContext,onclick:It(e,n,s)}))]}}const kt={["draw"]:bt,["type"]:wt,["stamp"]:$t};function Tt(e,a,n){return(s,i)=>ee(s,n).then(n=>{e([j(n,`sign-${a}.png`,i)]);t.redraw()})}class St{oninit({attrs:{value:e}}){this.valUpdate=e.map(()=>this.setSignType())}onremove(){this.valUpdate.end()}view({attrs:{field:a,value:n}}){const{label:s,id:l,readonly:r,disabled:c,uiClass:o={},options:u=i.signOpts,heightPct:p=i.signHeightPct,stampTxt:h=i.stampTxt,stampSetTxt:f=i.stampSetTxt}=a;const g={paddingBottom:`${p}%`};const y=e.head(n());const b=e(u).map(({value:e})=>{if(e==="draw"){return{type:e,icon:i.drawIcn,label:i.signDrawTxt}}else if(e==="type"){return{type:e,icon:i.typeIcn,label:i.signTypeTxt}}else if(e==="stamp"){return{type:e,icon:i.stampIcn,label:i.signStampTxt}}return null}).compact().value();if(b.length===1&&!y){this.setSignType(b[0].type)}return t("div.relative",{class:m(o,c)},[D(l,o,s),t("div",{class:this.signType!=="stamp"?v(o,xe(a,n())):undefined},r||c?t(".aspect-ratio",{id:l,style:g},y?t(".aspect-ratio--object",{style:{"pointer-events":"none"}},t("img.img.w-100.absolute",{src:P(y.path,y.dataUrl)})):null):this.signType?t(kt[this.signType],{heightPct:p,stampTxt:h,stampSetTxt:f,style:g,onSet:Tt(n,l,i.signMaxSize),onCancel:e.bind(this.setSignType,this,undefined)}):t(".aspect-ratio.pointer",{id:l,class:d.fileInput,style:g},y?t(".aspect-ratio--object.hide-child.dim",{onclick:e.bind(n,this,[])},[t("img.img.w-100.absolute",{src:P(y.path,y.dataUrl)}),t(".pa3.absolute.top-0.right-0.child",t("i.fa-2x",{class:i.resetIcn}))]):t(".aspect-ratio--object.flex",e.map(b,({type:a,icon:n,label:s})=>t(".flex-auto.flex.items-center.justify-center.dim",{title:s,onclick:e.bind(this.setSignType,this,a)},t("i.fa-2x.ma1",{class:n}),t("span.ma1.dn.db-ns.truncate",s))))))])}setSignType(e){this.signType=e}}function Ct(a,n){return s=>{const l=n?[]:a();return Promise.all(e.map(s,e=>{if(_(e.type)){return X(e,i.imageMaxSize,e.type).then(t=>{const a=Y(V(t),e.name);l.push({guid:T(),name:a.name,path:"not_set",file:a,dataUrl:t})})}else{l.push({guid:T(),name:e.name,path:"not_set",file:e});return Promise.resolve()}})).then(()=>{a(l);t.redraw()})}}class Pt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:n}}){const s=e.head(n());const{disabled:l,uiClass:c={}}=a;return t("div",{class:m(c,l)},t(Te,{field:a,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:Ct(n,true),value:n},t("div",{class:v(c,xe(a,n()))},t(".flex.items-center.pa1",{class:I(this.dragging())},s?s.dataUrl?[t(".relative.w-100.dt.tc",t("img.img.contain",{title:s.name,src:P(s.path,s.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${s.name}`,onclick:Ce(n,s.guid)},t("i.pa1",{class:i.cancelIcn})))]:[t(De,s),t("span.ma1.flex-auto",{title:s.name},s.name),t("i.pa1.pointer.dim",{title:`Remove ${s.name}`,class:i.cancelIcn,onclick:Ce(n,s.guid)})]:[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))))}}class qt{constructor(){this.dragging=a(false)}view({attrs:{field:e,value:a,displayType:n,showDisplay:s=true}}){const{disabled:l,uiClass:r={}}=e;return t("div",{class:m(r,l)},[t(Te,{field:e,defaultAccept:"*",dragging:this.dragging,onSet:Ct(a,false),value:a},t("div",{class:v(r,xe(e,a()))},t(".flex.items-center.pa1.dt",{class:I(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))),s?t(Fe,{displayType:n,value:a}):null])}}export{ne as Badge,Ke as BaseInput,oe as BaseText,se as Button,ie as ButtonLink,it as CardDateInput,me as Checkbox,ut as CheckboxInput,Qe as CurrencyInput,lt as DateInput,de as DateText,Fe as DisplayTypeComponent,Ae as FileList,Pe as FileMulti,mt as FileSelect,Oe as ImageList,vt as ImageMulti,He as ImagePreview,yt as ImageSelect,Re as Label,he as Link,qt as MultiOmniFileInput,le as NavButton,re as NavLink,Pt as OmniFileInput,rt as PasswordInput,Le as PasswordStrength,ht as RadioInput,ft as SelectInput,Ue as SelectText,St as SignBuilder,dt as TextareaInput,ge as Toggle,pt as ToggleInput,ce as Trusted,ae as createStamp,et as currencyStrToNumber,V as dataURItoBlob,j as dataUrlToFile,Y as fileConstructor,B as fileNameExtSplit,Z as getOrientation,T as guid,pe as iconMap,ue as linkAttrs,tt as numberToCurrencyStr,at as numberToCurrencyTuple,S as pxRatio,G as readArrayBuffer,J as readOrientation,X as resizeImage,ee as scaleDataUrl,Q as scaleRect,te as textToImage,d as theme,h as updateButtonContext,u as updateClasses,l as updateConfig};
