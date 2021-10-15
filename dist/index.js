/* @preserve built on: 2021-10-15T09:50:27.245Z */
import e from"lodash";import t from"mithril";import a from"mithril/stream";import s from"signature_pad";const n={layoutType:"floatLabel",imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",openFileTxt:"Open file",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-signature",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-check",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};const i=n;function l(t){e.assign(n,t)}function r(){return{"max-height":i.imageDispHeight}}function c(){return{"max-height":i.thumbDispHeight}}const o={wrapper:"",label:"silver",inputWrapper:"ba br2 b--silver pa2 ma0 dark-gray",input:"dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40",invalidInputWrapper:""};const d=o;function u(t){e.assign(o,t)}const p={default:"bg-light-blue dark-gray"};function h(t){e.assign(p,t)}function f(e="default"){if(e&&e in p){return p[e]}else{return""}}function m({wrapper:e="",merge:t=true},a){return`${e} ${t?d.wrapper:""} ${a?d.disabledWrapper:""}`}function g({label:e="",merge:t=true},a){return`${e} ${t?d.label:""} ${a?d.requiredLabel:""}`}function y({inputWrapper:e="",merge:t=true},a){return`${e} ${t?d.inputWrapper:""} ${a?d.invalidInputWrapper:""}`}function b({input:e="",merge:t=true}){return`${e} ${t?d.input:""}`}function v(e,t,a){return`${b(e)} ${$(t,a)}`}function x({input:e="",merge:t=true}){return`${e} ${t?d.textarea:""}`}function w({input:e="",merge:t=true},a,s,n){return`${e} ${t?d.radio:""} ${a?d.radioChecked:d.radioUnchecked} ${$(s,n)}`}function I(e){return`${d.fileInput} ${e?d.fileHover:""}`}function $(e,t){return e||t?"":"pointer"}function k(e){return(e+256).toString(16).substr(1)}function T(){const e=new Uint8Array(16);const t=window.crypto;t.getRandomValues(e);return[k(e[0]),k(e[1]),k(e[2]),k(e[3]),"-",k(e[4]),k(e[5]),"-",k(e[6]),k(e[7]),"-",k(e[8]),k(e[9]),"-",k(e[10]),k(e[11]),k(e[12]),k(e[13]),k(e[14]),k(e[15])].join("")}function S(){return Math.max(window.devicePixelRatio,1)}function C(e,t){return t?`${e}${i.requiredLblPost}`:e}function P(e,t){return t?t:e}function D(e){return e?t("span.mr2.truncate",{title:e,class:d.displayLabel},e):null}function q(e,a,s,n){return s?t("label.mb1.db",{title:s,for:e,class:g(a,n)},C(s,n)):null}function A(e,a,s){return[e?t("i.fa-fw",{class:`${a?"mr2":""} ${e}`}):null,a,s?t("i.fa-fw",{class:`${a?"ml2":""} ${s}`}):null]}function F(e){return function({target:{value:t}}){e(t)}}function U(e){return function({target:{checked:t}}){e(t)}}function O(e){switch(e){case"day":return"dd";case"month":return"mm";case"year":return"yyyy"}}function H(e,t,a){const s=e.querySelector(`#${t}-${a}`);s.focus()}function M(e,t,a){switch(e){case"dd":return(isNaN(t)||t<=3)&&((isNaN(a)||t===3&&a<=1||t<3)&&!(t===0&&a===0));case"mm":return(isNaN(t)||t<=1)&&((isNaN(a)||t===1&&a<=2||t<1)&&!(t===0&&a===0));case"yyyy":return(isNaN(t)||t>=1&&t<3)&&(isNaN(a)||t===1&&a===9||t===2);case"yy":return isNaN(t)||t>=0}}function W(e,t,a){if(e!==t()){const s=e.querySelector("input");z(s,a,"Invalid Date");t(e)}}function z(e,t,a){t.map(t=>{const s=t?"":`${a}`;e.setCustomValidity(s)})}function L(e,t,a,s,n){const i=parseInt(t.getAttribute("maxlength"));if(s.length===i&&a){const t=n.querySelector(`#${e}-${a}`);t.focus()}}function N(e,t,a,s,n){const i=s.querySelector(`#${e}-${t}`);if((n.key==="Backspace"||n.key==="Delete")&&a.length===0&&i){i.focus();n.preventDefault()}}function R(e,t,a,s,n,i){const l=s.querySelector(`#${t}-${a}`);const r=e()?e():"";const c=l.value;const o=/^\d*$/.test(c);const d=parseInt(c.charAt(0));const u=parseInt(c.charAt(1));const p=M(a,d,u);if(n.inputType==="deleteContentForward"||n.inputType==="deleteContentBackward"){e("");return}if((o||c==="")&&p&&c.length<=4){e(c)}else{e(r)}L(t,l,i,e(),s)}function B(e){const t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function V(e){const t=e.split(",");const a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);const s=t[0].split(":")[1].split(";")[0];const n=a.length;const i=new Uint8Array(n);for(let e=0;e<n;e++){i[e]=a.charCodeAt(e)}return new Blob([i],{type:s})}function Y(e,t){const a=(new Date).valueOf();const s=e;s.name=t;s.lastModified=a;return e}function j(e,t,a){const s=Y(V(e),t);return{guid:T(),name:s.name,path:"not_set",file:s,dataUrl:e,metadata:a}}function E(e){const[,t]=B(e.name);switch(t.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return i.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return i.videoFileIcn;case".pdf":return i.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return i.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return i.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return i.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return i.imageIcn;default:return i.fileIcn}}function _(e){return e&&e.includes("image")}function Z(e){const t=Math.min(e.byteLength,64*1024);const a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}const s=a.byteLength;let n=2;while(n<s){const e=a.getUint16(n,false);n+=2;if(e===65505){n+=2;if(a.getUint32(n,false)!==1165519206){return-1}n+=6;const e=a.getUint16(n,false)===18761;n+=a.getUint32(n+4,e);const t=a.getUint16(n,e);n+=2;for(let s=0;s<t;s++){if(a.getUint16(n+s*12,e)===274){return a.getUint16(n+s*12+8,e)}}}else if((e&65280)!==65280){break}else{n+=a.getUint16(n,false)}}return-1}function G(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>{t(a.result)};a.readAsArrayBuffer(e)})}function J(e){return G(e).then(Z)}function K(e,t,a,s){if(!s||s>8){return}switch(s){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function Q(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function X(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return J(e).then(s=>new Promise(n=>{const i=new Image;i.onload=()=>{const e=document.createElement("canvas");const[l,r]=Q(i.width,i.height,t);if(s>4){e.width=r;e.height=l}else{e.width=l;e.height=r}const c=e.getContext("2d");K(c,l,r,s);c.drawImage(i,0,0,l,r);n(e.toDataURL(a))};const l=new FileReader;l.onload=()=>i.src=l.result;l.readAsDataURL(e)}))}function ee(e,t){return new Promise(a=>{const s=new Image;s.onload=()=>{const e=document.createElement("canvas");const[n,i]=Q(s.width,s.height,t);e.width=n;e.height=i;const l=e.getContext("2d");l.drawImage(s,0,0,n,i);a(e.toDataURL())};s.src=e})}function te(e,t,a,s){const n=document.createElement("canvas");n.width=t;n.height=a;const i=.56*n.height;const l=n.getContext("2d");l.textBaseline="middle";l.font=`${i}px ${s}`;l.fillText(e,n.height*.05,i);return n.toDataURL()}function ae(e,t){const a=i.signMaxSize;const s=.01*t*a;return te(e,a,s,i.signFont)}class se{view({attrs:{label:e,classes:a="bg-red"},children:s}){return t(".relative.dib",[s,e?t("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:a,style:{minWidth:"0.65rem"}},e):null])}}class ne{view({attrs:{label:e,type:a="button",title:s=e,icon:n,rightIcon:i,context:l,classes:r="",disabled:c,style:o,onclick:u}}){return t("button.button-reset",{type:a,title:s,disabled:c,class:`${r} ${c?d.disabledWrapper:"pointer"} ${f(l)} ${d.button}`,style:o,onclick:u},A(n,e,i))}}class ie{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,href:i,rel:l,target:r,download:c,context:o,classes:u="",style:p}}){return t("a.link.flex.items-center",{href:i,rel:l,target:r,download:c,title:a,class:`${u} ${f(o)} ${d.button}`,style:p},A(s,e,n))}}class le{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,classes:i="",disabled:l,style:r,onclick:c}}){return t(".mh2.pa2.truncate",{title:a,disabled:l,class:`${i} ${l?d.disabledWrapper:"pointer"} ${d.navButton}`,style:r,onclick:c},A(s,e,n))}}class re{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,href:i,rel:l,target:r,download:c,classes:o="",style:u}}){return t("a.link.mh2.pa2.truncate",{href:i,rel:l,target:r,download:c,title:a,class:`${o} ${d.navButton}`,style:u},A(s,e,n))}}class ce{view({attrs:{field:{style:e},value:a}}){return t(".pa2",{style:e},t.trust(a()))}}class oe{view({attrs:{field:e,value:a}}){const{label:s,uiClass:n={},style:i}=e;return t(".pa2.flex.flex-wrap",{class:m(n),style:i},[D(s),t("span.ws-normal",{title:a(),class:d.displayValue},a())])}}class de{formatter(e){return e?new Date(String(e)).toLocaleDateString():e}oninit({attrs:{value:e}}){this.formatted=e.map(this.formatter)}onremove(){this.formatted.end(true)}view({attrs:{field:e}}){return t(oe,{field:e,value:this.formatted})}}function ue(e,t){if(e==="email"){return{href:`mailto:${t}`,class:d.displayValue}}else if(e==="tel"){return{href:`tel:${t}`,class:d.displayValue}}else{return{href:t,target:"_blank",class:d.displayValue}}}const pe={email:i.emailIcn,tel:i.telIcn};class he{view({attrs:{field:e,value:a}}){const{label:s,type:n="url",uiClass:l={},style:r}=e;return t(".pa2.flex.flex-wrap",{class:m(l),style:r},[D(s),t("a.link.dim.pointer.ws-normal",ue(n,a()),t("i.mr2",{class:pe[n]||i.linkIcn}),a())])}}class fe{view({attrs:{field:a,value:s}}){const{options:n=[]}=a;const i=e.find(n,e.matches({value:s()||false}));return i?t("span.ml2",i.label):null}}class me{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:s,uiClass:n={},style:l}=e;return t(".pa2.flex.items-center",{class:m(n),style:l},[D(s),t("i",{class:`${d.displayValue} ${i[a()?this.onIcon:this.offIcon]}`}),t(fe,{field:e,value:a})])}}class ge extends me{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}function ye(e,t){if(e.required){return!t}return false}function be(e,t){if(e.required){return t.length<1}return false}function ve(e){return t=>{t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function xe(e){return t=>{t.preventDefault();e(false)}}function we(e,t){return a=>{a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function Ie(e){return({target:{files:t}})=>e(t)}class $e{oncreate({dom:e,attrs:{value:t}}){t.map(t=>{if(t.length===0){e.firstChild.value=""}})}view({attrs:{field:a,defaultAccept:s="*",multiple:n=true,dragging:i,onSet:l},children:r}){const{label:c,id:o,name:d=o,title:u=c,required:p,readonly:h,disabled:f,autofocus:m,accept:y=s,uiClass:b={}}=a;return t("label.db",e.extend({for:o,title:u,class:$(f,h),"data-input-id":o},f||h?{}:{ondragover:ve(i),ondragleave:xe(i),ondrop:we(i,l)}),[t("input.clip[type=file].bg-transparent.bn.outline-0",{id:o,name:d,multiple:n,accept:y,required:p,autofocus:m,disabled:f||h,onchange:Ie(l)}),c?t("span.db.mb1",{class:g(b,p)},C(c,p)):null,r])}}function ke(t,a=false){return s=>{const n=a?[]:t();e.each(s,e=>{n.push({guid:T(),name:e.name,path:"not_set",file:e})});t(n)}}function Te(t,a){return s=>{s.preventDefault();const n=t();e.remove(n,{guid:a});t(n)}}class Se{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const{disabled:n,uiClass:l={}}=a;return t("div",{class:m(l,n)},[t($e,{field:a,dragging:this.dragging,onSet:ke(s),value:s},t("div",{class:y(l,be(a,s()))},t(".pa2",{class:I(this.dragging())},[t("i.mr2",{class:i.uploadIcn}),t("span",i.addFilesTxt)]))),t(".flex.flex-column.mt1.nb1",e.map(s(),e=>t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:i.downloadIcn}),e.name,t("i.child.fr",{title:`${i.remFileTtl} ${e.name}`,class:i.deleteIcn,onclick:Te(s,e.guid)})])))])}}class Ce{view({children:e,attrs:a}){return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[a.src&&a.src!=="not_set"?t("img.contain",{src:a.src}):null,a.data&&a.data.file&&(a.src==="not_set"||!a.src)?t("div.contain.tc.br5.6rem",{class:`${E(a.data)} fa-2x`,tooltip:a.data.file.type}):null,e])}}class Pe{view({attrs:e}){return t("i.pa1",{class:E(e),title:i.openFileTxt,onclick:e.path!=="not_set"?()=>window.open(e.path,"_blank"):undefined})}}class De{view({attrs:{displayType:a="thumbnail",value:s}}){return a==="thumbnail"?t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),e=>t(Ce,{src:P(e.path,e.dataUrl),data:e,style:c()},t(".absolute.top-0.right-0.child",t(ne,{title:`Remove ${e.name}`,icon:i.deleteIcn,onclick:Te(s,e.guid)}))))):t(".pa2.flex.flex-column",e.map(s(),e=>t(".flex.items-center.pa1.ba.b--black-20",[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",{title:e.name},e.name),t(Pe,e),t("i.pa1.pointer.dim",{title:`Remove ${e.name}`,class:i.cancelIcn,onclick:Te(s,e.guid)})])))}}class qe{view({attrs:{field:a,value:s}}){const{label:n,uiClass:i={},style:l}=a;const r=e.find(a.options,{value:s()});const c=r?r.label||r.value:s();return t(".pa2.flex.flex-wrap",{class:m(i),style:l},[D(n),t("span.ws-normal",{title:c,class:d.displayValue},c)])}}class Ae{view({attrs:{field:a,value:s}}){const{label:n,uiClass:l={},style:r}=a;return t(".pa2.flex.flex-column",{class:m(l),style:r},[D(n),t(".flex.flex-column.mt1.nb1",e.map(s(),({name:e,path:a})=>t("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:d.displayValue,href:a},t("i.mr2",{class:i.downloadIcn}),e)))])}}class Fe{view({attrs:{field:a,value:s}}){const{label:n,uiClass:i={},style:l}=a;return t(".pa2.flex.flex-column",{class:m(i),style:l},[D(n),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),({name:e,path:a,dataUrl:s})=>t(Ce,{title:e,src:P(a,s),style:c()})))])}}class Ue{view({attrs:{field:a,value:s}}){const{label:n,uiClass:l={},style:c}=a;const o=e.head(s());return t(".pa2.flex.flex-column",{class:m(l),style:c},[D(n),o?t("img.img.h-100.mt2.contain.self-center",{title:o.name,src:P(o.path,o.dataUrl),style:r()}):t("i.mt2",{class:`${d.displayValue} ${i.imageIcn}`})])}}function Oe(e,t){return(e.match(t)||[]).length}function He(e){let t=0;if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(Oe(e,/[A-Z]/g)>1&&Oe(e,/[a-z]/g)>2){t=t+1}if(Oe(e,/[\d]/g)>1){t=t+1}if(Oe(e,/[!"£%^@#$&*]/g)>0){t=t+1}}return t}function Me(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}const We=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];class ze{oninit({attrs:{value:e}}){this.passwordScore=e.map(e=>He(String(e)))}onremove(){this.passwordScore.end()}view({attrs:{field:a}}){const{label:s,style:n}=a;return t(".flex.flex-column",{style:n},[D(s),t(".flex.mt1",e.map(We,e=>t(".h1.w-20",{class:this.passwordScore()>=e.value?e.background:"bg-transparent"}))),t("span.f5.truncate",Me(this.passwordScore()))])}}class Le{view({attrs:{field:{label:e="",title:a=e,required:s}}}){return t("label.mb2",{title:a},C(e,s))}}class Ne{view({attrs:e,children:a}){const{field:s,value:n,xform:i=n}=e;const{label:l,id:r,type:c="text",required:o,disabled:d,uiClass:u={}}=s;return t("div",{class:c==="hidden"?"clip":m(u,d)},[q(r,u,l,o),t("fieldset",{class:y(u,ye(s,i()))},a)])}}const Re="0.7em";const Be="0.3s ease-in-out";class Ve{constructor(){this.focus=false;this.focusIn=()=>this.focus=true;this.focusOut=()=>this.focus=false;this.wrapperHeight=0}oncreate({dom:e}){this.inputWrapper=e.firstElementChild;this.calcHeight()}onupdate(){this.calcHeight()}calcHeight(){if(this.inputWrapper.clientHeight!==this.wrapperHeight){this.wrapperHeight=this.inputWrapper.clientHeight;t.redraw()}}shouldFloat(e,t){return e==="floatAlways"||t||this.focus}labelTranslateY(){return`calc(${this.wrapperHeight*.5}px - 1.5ex)`}view({attrs:e,children:a}){const{field:s,value:n,xform:l=n}=e;const{label:r,id:c,type:o="text",placeholder:d,required:u,disabled:p,layout:h=i.layoutType,uiClass:f={}}=s;const b=this.shouldFloat(h,d||n());return t("div",{class:o==="hidden"?"clip":m(f,p),style:r?{paddingTop:"0.5rem"}:{},onfocusin:this.focusIn,onfocusout:this.focusOut},t("fieldset.relative.pa0.ma0",{class:y(f,ye(s,l()))},[r&&this.wrapperHeight?[t("legend.db",{class:g(f,u),style:{visibility:"hidden",height:"0.5ch",transition:`max-width ${Be}`,maxWidth:b?"100%":"0.01px"}},t("span",{style:{fontSize:Re}},C(r,u))),t(".absolute.top-0",{class:g(f,u),style:{transition:`transform ${Be}`,transform:`translateY(${b?"-1ch":this.labelTranslateY()})`}},t("label.db",{for:c,title:r,style:{transition:`font-size ${Be}`,fontSize:b?Re:"1em"}},C(r,u)))]:null,a]))}}class Ye{constructor(){this.layout=Ve}view({attrs:e,children:a}){const{field:{layout:s=i.layoutType}}=e;return t(s==="default"?Ne:this.layout,e,a)}}class je extends Ve{shouldFloat(){return true}}class Ee extends Ye{constructor(){super(...arguments);this.layout=je}}const _e=new Set(["date","datetime-local","color","range"]);class Ze{view({attrs:e}){const{field:a,value:s,xform:n=s}=e;const{label:i,id:l,type:r="text",name:c=l,title:o=i,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:y,disabled:v,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,instant:T,uiClass:S={}}=a;const C=_e.has(r)?Ee:Ye;return t(C,e,t("input.w-100.bg-transparent.bn.outline-0",{id:l,type:r,name:c,title:o,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:y,disabled:v,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,class:b(S),value:n(),[T?"oninput":"onchange"]:F(s)}))}}class Ge{view({attrs:a}){const{field:s,value:n,xform:i=n}=a;const{label:l,id:r,name:c=r,title:o=l,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:y,disabled:v,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,instant:T,uiClass:S={},options:C}=s;const P=C&&C.length?C[0].value:"$";return t(Ee,a,t(".flex.flex-row.w-100",t("span.mr1.self-center",{class:b(S)},P),t("input.w-100.bg-transparent.bn.outline-0",{id:r,type:"text",name:c,title:o,placeholder:d,max:u,maxlength:p,min:h,minlength:f,step:m,required:g,readonly:y,disabled:v,autofocus:x,autocomplete:w,pattern:I,inputmode:$,spellcheck:k,class:b(S),value:e.isUndefined(i())?null:Qe(Je(i())),[T?"oninput":"onchange"]:et(n)})))}}function Je(t){return e.isString(t)?e.parseInt(t):Number(t)}function Ke(t){const a=t.replace(/[^\d.]/g,"");let s;let n=0;if(a.indexOf(".")>-1){const t=a.indexOf(".");const i=a.substring(0,t);s=e.parseInt(e.padStart(i,1,"0"));const l=a.substring(t+1,Math.min(t+3,a.length));n=e.parseInt(e.padEnd(l,2,"0"))}else{s=e.parseInt(a)||0}return s*100+n}function Qe(e){const t=Xe(e);if(t){return`${t[0]}.${t[1]}`}else{return t}}function Xe(t){if(!e.isFinite(t)){return undefined}const a=String(Math.abs(t));let s="0";let n="";if(a.length>2){const e=a.length-2;s=a.substring(0,e);n=a.substring(e)}else{n=e.padStart(a,2,"0")}return[s,n]}function et(e){return({target:{value:t}})=>e(Ke(t))}class tt{view({attrs:e}){const{id:a}=e.field;return t("input",{style:{display:"none"},id:a})}}class at{constructor(){this.month=a();this.year=a();this.date=a();this.valid=this.date.map(Boolean);this.dom=a();this.focusedInput=a("mm")}buildDate(){this.date(`${this.month()}/${this.year()}`)}updateInputs(e){if(this.month()&&this.month().length===2&&this.year()&&this.year().length===2){this.buildDate();e(this.date())}else{this.date("");e("")}}oninit({attrs:{value:e}}){e.map(e=>{const[t,a=""]=String(e).split("/");if(t.length===2&&a.length===2){this.month(t);this.year(a);this.buildDate()}else if(!e&&this.date()){this.month("");this.year("");this.date("")}})}oncreate({dom:e}){W(e,this.dom,this.valid)}onupdate({dom:e}){W(e,this.dom,this.valid)}onremove(){this.date.end(true);this.year.end(true);this.month.end(true)}view({attrs:a}){const{field:s}=a;const{id:n,name:i=n,required:l,readonly:r,disabled:c,uiClass:o={}}=s;const d=b(o);return t(Ee,a,t(".flex",{onclick:()=>H(this.dom(),n,this.focusedInput())},t("span",[t("input.w-100.bg-transparent.bn.outline-0",{id:`${n}-mm`,name:`${i}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:l,readonly:r,disabled:c,value:this.month(),class:d,style:{maxWidth:"calc(2.8ex + 4px)",textAlign:this.month()&&this.month().length===2?"center":"left",padding:"0px"},onfocus:e.partial(this.focusedInput,"mm"),oninput:e=>{R(this.month,n,"mm",this.dom(),e,"yy");this.updateInputs(a.value)}})]),t("span",{style:{padding:"0px",marginRight:"2px"}},"/"),t("span",[t("input.w-100.bg-transparent.bn.outline-0",{id:`${n}-yy`,name:`${i}-yy`,type:"text",placeholder:"YY",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:l,readonly:r,disabled:c,value:this.year(),class:d,style:{maxWidth:"calc(2.7ex + 4px)",textAlign:this.year()&&this.year().length===2?"center":"left",padding:"0px"},onfocus:e.partial(this.focusedInput,"yy"),onkeydown:e=>N(n,"mm",this.year(),this.dom(),e),oninput:e=>{R(this.year,n,"yy",this.dom(),e);this.updateInputs(a.value)}}),t(tt,a)])))}}class st{constructor(){this.day=a("");this.month=a("");this.year=a("");this.date=a();this.valid=this.date.map(Boolean);this.dom=a();this.focusedInput=a(undefined);this.locale=a(undefined)}buildDate(){this.date(`${this.year()}-${this.month()}-${this.day()}`)}updateInputs(e){const t=parseInt(this.year());const a=parseInt(this.month())-1;const s=parseInt(this.day());const n=new Date(t,a,s);if(n.getFullYear()===t&&this.year().length===4&&n.getMonth()===a&&n.getDate()===s&&this.day().length===2&&this.month().length===2){this.buildDate();e(this.date())}else{this.date("");e("")}}findNextInput(e){const t=this.dateInputAdvanceOrder.indexOf(e);return t!==this.dateInputAdvanceOrder.length&&O(this.dateInputAdvanceOrder[this.dateInputAdvanceOrder.indexOf(e)+1])}findPrevInput(e){const t=this.dateInputAdvanceOrder.indexOf(e);return t!==0&&O(this.dateInputAdvanceOrder[this.dateInputAdvanceOrder.indexOf(e)-1])}setDateInputs(t){const a=new Intl.DateTimeFormat(t).formatToParts();this.dateParts=a;const s=a[0].type;const n=O(s);this.focusedInput(n);this.dateInputAdvanceOrder=e(this.dateParts).map(({type:e})=>e).filter(e=>e!=="literal").value()}setLocale(e){const{options:t}=e;const a=t&&t.length?t[0].value:undefined;if(a!==this.locale()){this.locale(a)}}oninit({attrs:t}){t.value.map(t=>{const a=new Date(String(t));if(e.isDate(a)&&!isNaN(a.getTime())){const t=e.padStart(String(a.getDate()),2,"0");const s=e.padStart(String(1+a.getMonth()),2,"0");const n=String(a.getFullYear());this.day(t);this.month(s);this.year(n);this.buildDate()}else if(!t&&this.date()){this.day("");this.month("");this.year("");this.date("")}});this.locale.map(e=>{this.setDateInputs(e)});this.setLocale(t.field)}oncreate({dom:e}){W(e,this.dom,this.valid)}onbeforeupdate({attrs:{field:e}}){this.setLocale(e)}onupdate({dom:e}){W(e,this.dom,this.valid)}onremove(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)}view({attrs:a}){const{id:s,name:n=s,required:i,readonly:l,disabled:r,uiClass:c={}}=a.field;const o=b(c);const d=({type:c,value:d})=>{switch(c){case"literal":return t("span",{style:{padding:"0px",marginRight:"2px"}},d);case"day":return t("span",t("input.w-100.bg-transparent.bn.outline-0",{id:`${s}-dd`,name:`${n}-dd`,type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.day(),class:o,onfocus:e.partial(this.focusedInput,"dd"),onkeydown:e=>N(s,this.findPrevInput("day"),this.day(),this.dom(),e),oninput:e=>{R(this.day,s,"dd",this.dom(),e,this.findNextInput("day"));this.updateInputs(a.value)},style:{maxWidth:"calc(2.3ex + 4px)",textAlign:this.day()&&this.day().length===2?"center":"left",padding:"0px"}}));case"month":return t("span",t("input.w-100.bg-transparent.bn.outline-0",{id:`${s}-mm`,name:`${n}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.month(),class:o,onkeydown:e=>N(s,this.findPrevInput("month"),this.month(),this.dom(),e),oninput:e=>{R(this.month,s,"mm",this.dom(),e,this.findNextInput("month"));this.updateInputs(a.value)},onfocus:e.partial(this.focusedInput,"mm"),style:{maxWidth:"calc(2.8ex + 4px)",textAlign:this.month()&&this.month().length===2?"center":"left",padding:"0px"}}));case"year":return t("span",t("input.w-100.bg-transparent.bn.outline-0",{id:`${s}-yyyy`,name:`${n}-yyyy`,type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:i,readonly:l,disabled:r,value:this.year(),class:o,onfocus:e.partial(this.focusedInput,"yyyy"),onkeydown:e=>N(s,this.findPrevInput("year"),this.year(),this.dom(),e),oninput:e=>{R(this.year,s,"yyyy",this.dom(),e,this.findNextInput("year"));this.updateInputs(a.value)},style:{maxWidth:"calc(4.2ex + 4px)",textAlign:this.year()&&this.year().length===4?"center":"left",padding:"0px"}}))}};return t(Ee,a,t(".flex",{onclick:()=>H(this.dom(),s,this.focusedInput())},this.dateParts.map(e=>d(e)),t(tt,a)))}}class nt{constructor(){this.showPassword=a(false)}view({attrs:e}){const{field:a,value:s}=e;const{label:n,id:l,name:r=l,title:c=n,placeholder:o,maxlength:d,minlength:u,required:p,readonly:h,disabled:f,autofocus:m,autocomplete:g,pattern:y,inputmode:v,instant:x,uiClass:w={}}=a;return t(Ye,e,t(".flex.flex-row",[t("input.w-100.bg-transparent.bn.outline-0",{id:l,name:r,title:c,placeholder:o,type:this.showPassword()?"text":"password",maxlength:d,minlength:u,required:p,readonly:h,disabled:f,autofocus:m,autocomplete:g,pattern:y,inputmode:v,class:b(w),value:s(),autocorrect:"off",[x?"oninput":"onchange"]:F(s)}),t("i.ml1.pa1.fa-fw.pointer.dim",{title:i.showPassTxt,class:this.showPassword()?i.hidePassIcn:i.showPassIcn,onclick:()=>this.showPassword(!this.showPassword())})]))}}class it extends Ve{labelTranslateY(){return"0.5ex"}}class lt extends Ye{constructor(){super(...arguments);this.layout=it}}class rt{view({attrs:e}){const{label:a,id:s,name:n=s,title:i=a,placeholder:l,required:r,readonly:c,disabled:o,autofocus:d,autocomplete:u,spellcheck:p,instant:h,uiClass:f={}}=e.field;const{value:m}=e;return t(lt,e,t("textarea.w-100.bg-transparent.bn.outline-0.h-100",{id:s,name:n,title:i,placeholder:l,required:r,readonly:c,disabled:o,autofocus:d,autocomplete:u,spellcheck:p,class:x(f),value:m(),style:{resize:"none"},[h?"oninput":"onchange"]:F(m)}))}}class ct{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:s="",id:n,name:l=n,title:r=s,required:c,readonly:o,disabled:d,autocomplete:u,uiClass:p={}}=e;return t("div",{class:m(p,d)},t("fieldset",{class:y(p)},[t("label.flex.items-center",{title:r,class:v(p,d,o),"data-input-id":n},t("input.clip[type=checkbox]",{id:n,name:l,checked:a(),required:c,autocomplete:u,disabled:d||o,onchange:U(a)}),t("i.mr2",{class:i[a()?this.onIcon:this.offIcon]}),C(s,c),t(fe,{field:e,value:a}))]))}}class ot extends ct{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}class dt{view({attrs:a}){const{field:s,value:n}=a;const{id:i,name:l=i,required:r,readonly:c,disabled:o,autocomplete:d,uiClass:u={},options:p}=s;return t(Ee,a,t(".w-100.flex",{onchange:F(n)},e.map(p,({value:e,label:a=e,icon:s})=>{const p=n()===e;return t("label.dib",{title:a,class:w(u,p,o,c),"data-input-id":i},t("input.clip[type=radio]",{name:l,value:e,checked:p,required:r,autocomplete:d,disabled:o||c}),s?t("i.fa-fw",{class:s}):a)})))}}class ut{view({attrs:a}){const{field:s,value:n}=a;const{label:i,id:l,name:r=l,title:c=i,required:o,readonly:d,disabled:u,autofocus:p,autocomplete:h,uiClass:f={},options:m}=s;return t(Ye,a,t("select.w-100.bg-transparent.bn.outline-0",{id:l,name:r,title:c,required:o,readonly:d,disabled:u,autofocus:p,autocomplete:h,class:b(f),value:n(),onchange:F(n)},e.map(m,({value:e,label:a=e})=>t("option",{value:e,disabled:u||d},a))))}}class pt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s,displayType:n}}){const l=e.head(s());const{disabled:r,uiClass:c={}}=a;const o=n==="none"||!l?i.addFileTxt:l.name;return t("div",{class:m(c,r)},t($e,{field:a,multiple:false,dragging:this.dragging,onSet:ke(s,true),value:s},t("div",{class:y(c,be(a,s()))},t(".flex.items-center.pa1",{class:I(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",o),l&&n!=="none"?[t(Pe,l),t("i.pa1.pointer.dim",{title:`Remove ${l.name}`,class:i.cancelIcn,onclick:Te(s,l.guid)})]:null]))))}}function ht(a,s,n=false){return i=>{const l=n?[]:a();return Promise.all(e.map(i,e=>X(e,s,e.type).then(t=>{const a=Y(V(t),e.name);l.push({guid:T(),name:a.name,path:"not_set",file:a,dataUrl:t})}))).then(()=>{a(l);t.redraw()})}}class ft{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const{disabled:n,uiClass:l={}}=a;return t("div",{class:m(l,n)},[t($e,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:ht(s,i.imageMaxSize),value:s},t("div",{class:y(l,be(a,s()))},t(".w-100.pa1.dt.tc",{class:I(this.dragging())},t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn})))),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),e=>t(Ce,{src:P(e.path,e.dataUrl),style:c()},t(".absolute.top-0.right-0.child",t(ne,{title:`Remove ${e.name}`,icon:i.deleteIcn,onclick:Te(s,e.guid)})))))])}}class mt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const n=e.head(s());const{disabled:l,uiClass:c={}}=a;return t("div",{class:m(c,l)},t($e,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:ht(s,i.imageMaxSize,true),value:s},t("div",{class:y(c,be(a,s()))},t(".pa1",{class:I(this.dragging())},t(".relative.w-100.dt.tc",n?[t("img.img.contain",{title:n.name,src:P(n.path,n.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${n.name}`,onclick:Te(s,n.guid)},t("i.pa1",{class:i.cancelIcn}))]:t("i.fa-2x.dtc.v-mid",{class:i.cameraIcn}))))))}}class gt{oncreate({dom:t}){const a=t.children[0];const n=S();this.signaturePad=new s(a,{minWidth:.5*n,maxWidth:1.5*n});const i=()=>{const e=S();a.width=a.offsetWidth*e;a.height=a.offsetHeight*e;const t=a.getContext("2d");t.scale(e,e);this.resetCanvas()};this.resizeHandler=e.debounce(i,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);i()}onremove(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}view({attrs:{style:e,onSet:a,onCancel:s}}){return[t(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:e},t("canvas.aspect-ratio--object")),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(ne,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:()=>{if(!this.signaturePad.isEmpty()){a(this.signaturePad.toDataURL("image/png"))}}}),t(ne,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:()=>this.resetCanvas()}),t(ne,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:s})])]}resetCanvas(){this.signaturePad.clear()}}function yt(e,t,a){return()=>{if(e()){a(ae(e(),t),{text:e(),heightPct:t})}return false}}class bt{constructor(){this.text=a("")}oncreate({dom:e}){const t=e.children[0];t.focus({preventScroll:false});this.scaleText(e)}onupdate({dom:e}){this.scaleText(e)}view({attrs:{heightPct:e,style:a,onSet:s,onCancel:n}}){return[t("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:a,onsubmit:yt(this.text,e,s)},t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:F(this.text),value:this.text(),style:{"font-family":i.signFont}})),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(ne,{title:i.applyTtl,icon:i.applyIcn,classes:"ma1",onclick:yt(this.text,e,s)}),t(ne,{title:i.resetTtl,icon:i.resetIcn,classes:"ma1",onclick:()=>this.text("")}),t(ne,{title:i.cancelTtl,icon:i.cancelIcn,classes:"ma1",onclick:n})])]}scaleText(e){const t=e.clientHeight;e.style.fontSize=`${.56*t}px`}}function vt(e,t,a){return()=>a(ae(t,e),{text:t,heightPct:e})}class xt{view({attrs:{heightPct:e,stampTxt:a,stampSetTxt:s,onSet:n}}){return[t("span.clip",{style:{"font-family":i.signFont}},s),t(".flex",t(ne,{label:a,classes:`flex-auto ${i.stampBtnClass}`,context:i.stampBtnContext,onclick:vt(e,s,n)}))]}}const wt={["draw"]:gt,["type"]:bt,["stamp"]:xt};function It(e,a,s){return(n,i)=>ee(n,s).then(s=>{e([j(s,`sign-${a}.png`,i)]);t.redraw()})}class $t{oninit({attrs:{value:e}}){this.valUpdate=e.map(()=>this.setSignType())}onremove(){this.valUpdate.end()}view({attrs:{field:a,value:s}}){const{label:n,id:l,readonly:r,disabled:c,uiClass:o={},options:u=i.signOpts,heightPct:p=i.signHeightPct,stampTxt:h=i.stampTxt,stampSetTxt:f=i.stampSetTxt}=a;const g={paddingBottom:`${p}%`};const b=e.head(s());const v=e(u).map(({value:e})=>{if(e==="draw"){return{type:e,icon:i.drawIcn,label:i.signDrawTxt}}else if(e==="type"){return{type:e,icon:i.typeIcn,label:i.signTypeTxt}}else if(e==="stamp"){return{type:e,icon:i.stampIcn,label:i.signStampTxt}}return null}).compact().value();if(v.length===1&&!b){this.setSignType(v[0].type)}return t("div.relative",{class:m(o,c)},[q(l,o,n),t("div",{class:this.signType!=="stamp"?y(o,be(a,s())):undefined},r||c?t(".aspect-ratio",{id:l,style:g},b?t(".aspect-ratio--object",{style:{"pointer-events":"none"}},t("img.img.w-100.absolute",{src:P(b.path,b.dataUrl)})):null):this.signType?t(wt[this.signType],{heightPct:p,stampTxt:h,stampSetTxt:f,style:g,onSet:It(s,l,i.signMaxSize),onCancel:e.bind(this.setSignType,this,undefined)}):t(".aspect-ratio.pointer",{id:l,class:d.fileInput,style:g},b?t(".aspect-ratio--object.hide-child.dim",{onclick:e.bind(s,this,[])},[t("img.img.w-100.absolute",{src:P(b.path,b.dataUrl)}),t(".pa3.absolute.top-0.right-0.child",t("i.fa-2x",{class:i.resetIcn}))]):t(".aspect-ratio--object.flex",e.map(v,({type:a,icon:s,label:n})=>t(".flex-auto.flex.items-center.justify-center.dim",{title:n,onclick:e.bind(this.setSignType,this,a)},t("i.fa-2x.ma1",{class:s}),t("span.ma1.dn.db-ns.truncate",n))))))])}setSignType(e){this.signType=e}}function kt(a,s){return n=>{const l=s?[]:a();return Promise.all(e.map(n,e=>{if(_(e.type)){return X(e,i.imageMaxSize,e.type).then(t=>{const a=Y(V(t),e.name);l.push({guid:T(),name:a.name,path:"not_set",file:a,dataUrl:t})})}else{l.push({guid:T(),name:e.name,path:"not_set",file:e});return Promise.resolve()}})).then(()=>{a(l);t.redraw()})}}class Tt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const n=e.head(s());const{disabled:l,uiClass:c={}}=a;return t("div",{class:m(c,l)},t($e,{field:a,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:kt(s,true),value:s},t("div",{class:y(c,be(a,s()))},t(".flex.items-center.pa1",{class:I(this.dragging())},n?n.dataUrl?[t(".relative.w-100.dt.tc",t("img.img.contain",{title:n.name,src:P(n.path,n.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${n.name}`,onclick:Te(s,n.guid)},t("i.pa1",{class:i.cancelIcn})))]:[t(Pe,n),t("span.ma1.flex-auto",{title:n.name},n.name),t("i.pa1.pointer.dim",{title:`Remove ${n.name}`,class:i.cancelIcn,onclick:Te(s,n.guid)})]:[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))))}}class St{constructor(){this.dragging=a(false)}view({attrs:{field:e,value:a,displayType:s,showDisplay:n=true}}){const{disabled:l,uiClass:r={}}=e;return t("div",{class:m(r,l)},[t($e,{field:e,defaultAccept:"*",dragging:this.dragging,onSet:kt(a,false),value:a},t("div",{class:y(r,be(e,a()))},t(".flex.items-center.pa1.dt",{class:I(this.dragging())},[t("i.pa1",{class:i.uploadIcn}),t("span.ma1.flex-auto",i.addFileTxt)]))),n?t(De,{displayType:s,value:a}):null])}}export{se as Badge,Ze as BaseInput,oe as BaseText,ne as Button,ie as ButtonLink,at as CardDateInput,me as Checkbox,ct as CheckboxInput,Ge as CurrencyInput,st as DateInput,de as DateText,De as DisplayTypeComponent,Ae as FileList,Se as FileMulti,pt as FileSelect,Fe as ImageList,ft as ImageMulti,Ue as ImagePreview,mt as ImageSelect,Le as Label,he as Link,St as MultiOmniFileInput,le as NavButton,re as NavLink,Tt as OmniFileInput,nt as PasswordInput,ze as PasswordStrength,dt as RadioInput,ut as SelectInput,qe as SelectText,$t as SignBuilder,rt as TextareaInput,ge as Toggle,ot as ToggleInput,ce as Trusted,ae as createStamp,Ke as currencyStrToNumber,V as dataURItoBlob,j as dataUrlToFile,Y as fileConstructor,B as fileNameExtSplit,Z as getOrientation,T as guid,pe as iconMap,ue as linkAttrs,Qe as numberToCurrencyStr,Xe as numberToCurrencyTuple,S as pxRatio,G as readArrayBuffer,J as readOrientation,X as resizeImage,ee as scaleDataUrl,Q as scaleRect,te as textToImage,d as theme,h as updateButtonContext,u as updateClasses,l as updateConfig};
