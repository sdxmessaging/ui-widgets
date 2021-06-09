/* @preserve built on: 2021-06-09T10:31:07.117Z */
import e from"lodash";import t from"mithril";import a from"mithril/stream";import s from"signature_pad";const n={imageMaxSize:1280,imageDispHeight:"16rem",thumbDispHeight:"6rem",addFileTxt:"Upload...",addFilesTxt:"Add file(s)...",remFileTtl:"Remove",openFileTxt:"Open file",showPassTxt:"Show Password",requiredLblPost:"",signOpts:[{label:"",value:"draw"},{label:"",value:"type"},{label:"",value:"stamp"}],signMaxSize:640,signHeightPct:25,signFont:"sans-serif",signDrawTxt:"Draw",signTypeTxt:"Type",signStampTxt:"Accept",stampTxt:"Accept",stampBtnClass:"",stampBtnContext:"default",stampSetTxt:"Accepted",applyTtl:"Apply",resetTtl:"Reset",cancelTtl:"Cancel",drawIcn:"fas fa-pen-nib",typeIcn:"fas fa-keyboard",stampIcn:"fas fa-stamp",applyIcn:"fas fa-check",resetIcn:"fas fa-eraser",cancelIcn:"fas fa-times",checkIcn:"far fa-check-square",uncheckIcn:"far fa-square",toggleOnIcn:"fas fa-toggle-on",toggleOffIcn:"fas fa-toggle-off",showPassIcn:"fas fa-eye",hidePassIcn:"fas fa-eye-slash",uploadIcn:"fas fa-file-upload",downloadIcn:"fas fa-file-download",deleteIcn:"fas fa-trash-alt",cameraIcn:"fas fa-camera",imageIcn:"fas fa-image",emailIcn:"fas fa-envelope",telIcn:"fas fa-phone",linkIcn:"fas fa-link",wordDocIcn:"fas fa-file-word",videoFileIcn:"fas fa-file-video",pdfFileIcn:"fas fa-file-pdf",musicFileIcn:"fas fa-file-audio",excelFileIcn:"fas fa-file-excel",fileIcn:"fas fa-file",codeFileIcn:"fas fa-file-code"};const l=n;function i(t){e.assign(n,t)}function r(){return{"max-height":l.imageDispHeight}}function c(){return{"max-height":l.thumbDispHeight}}const o={"max-width":"5.4ex"};const d={"max-width":"9ex"};const u={wrapper:"pa0 bn",label:"f6 silver",inputWrapper:"dark-gray",input:"h2 dark-gray fw2",button:"pa2 bn br2",navButton:"dark-gray",textarea:"dark-gray fw2",radio:"dark-gray pa2 br2",radioChecked:"bg-light-blue",radioUnchecked:"o-60",fileInput:"dark-gray ba bw1 br3 b--dashed b--black-30",fileHover:"blue b--blue",displayLabel:"silver",displayValue:"dark-gray",requiredLabel:"",disabledWrapper:"o-40",invalidInputWrapper:""};const p=u;function f(t){e.assign(u,t)}const m={default:"bg-light-blue dark-gray"};function h(t){e.assign(m,t)}function g(e="default"){if(e&&e in m){return m[e]}else{return""}}function b({wrapper:e="",merge:t=true},a){return`${e} ${t?p.wrapper:""} ${a?p.disabledWrapper:""}`}function v({label:e="",merge:t=true},a){return`${e} ${t?p.label:""} ${a?p.requiredLabel:""}`}function w({inputWrapper:e="",merge:t=true},a){return`${e} ${t?p.inputWrapper:""} ${a?p.invalidInputWrapper:""}`}function y({input:e="",merge:t=true}){return`${e} ${t?p.input:""}`}function x(e,t,a){return`${y(e)} ${T(t,a)}`}function I({input:e="",merge:t=true}){return`${e} ${t?p.textarea:""}`}function $({input:e="",merge:t=true},a,s,n){return`${e} ${t?p.radio:""} ${a?p.radioChecked:p.radioUnchecked} ${T(s,n)}`}function k(e){return`${p.fileInput} ${e?p.fileHover:""}`}function T(e,t){return e||t?"":"pointer"}function S(e){return(e+256).toString(16).substr(1)}function C(){const e=new Uint8Array(16);const t=window.crypto||window.msCrypto;t.getRandomValues(e);return[S(e[0]),S(e[1]),S(e[2]),S(e[3]),"-",S(e[4]),S(e[5]),"-",S(e[6]),S(e[7]),"-",S(e[8]),S(e[9]),"-",S(e[10]),S(e[11]),S(e[12]),S(e[13]),S(e[14]),S(e[15])].join("")}function P(){return Math.max(window.devicePixelRatio,1)}function U(e,t){return t?`${e}${l.requiredLblPost}`:e}function q(e,t){return t?t:e}function D(e){return e?t("span.mr2.truncate",{title:e,class:p.displayLabel},e):null}function F(e,a,s,n){return s?t("label.mb1.db",{title:s,for:e,class:v(a,n)},U(s,n)):null}function M(e,a,s){return[e?t("i.fa-fw",{class:`${a?"mr2":""} ${e}`}):null,a,s?t("i.fa-fw",{class:`${a?"ml2":""} ${s}`}):null]}function z(e){return({target:{value:t}})=>e(t)}function A(e){return({target:{checked:t}})=>e(t)}function L(e){const t=e.lastIndexOf(".");if(t===-1){return[e,""]}else{return[e.substr(0,t),e.substr(t)]}}function R(e){const t=e.split(",");const a=t[0].indexOf("base64")>=0?atob(t[1]):unescape(t[1]);const s=t[0].split(":")[1].split(";")[0];const n=a.length;const l=new Uint8Array(n);for(let e=0;e<n;e++){l[e]=a.charCodeAt(e)}return new Blob([l],{type:s})}function H(e,t){const a=(new Date).valueOf();const s=e;s.name=t;s.lastModified=a;return e}function W(e,t,a){if(e>t){if(e>a){return[a,Math.round(t*a/e)]}}else if(t>a){return[Math.round(e*a/t),a]}return[e,t]}function O(e){const t=Math.min(e.byteLength,64*1024);const a=new DataView(e,0,t);if(a.getUint16(0,false)!==65496){return-2}const s=a.byteLength;let n=2;while(n<s){const e=a.getUint16(n,false);n+=2;if(e===65505){if(a.getUint32(n+=2,false)!==1165519206){return-1}const e=a.getUint16(n+=6,false)===18761;n+=a.getUint32(n+4,e);const t=a.getUint16(n,e);n+=2;for(let s=0;s<t;s++){if(a.getUint16(n+s*12,e)===274){return a.getUint16(n+s*12+8,e)}}}else if((e&65280)!==65280){break}else{n+=a.getUint16(n,false)}}return-1}function j(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>{t(a.result)};a.readAsArrayBuffer(e)})}function V(e){return j(e).then(O)}function B(e,t,a,s){if(!s||s>8){return}switch(s){case 2:e.translate(t,0);e.scale(-1,1);return;case 3:e.translate(t,a);e.rotate(Math.PI);return;case 4:e.translate(0,a);e.scale(1,-1);return;case 5:e.rotate(.5*Math.PI);e.scale(1,-1);return;case 6:e.rotate(.5*Math.PI);e.translate(0,-a);return;case 7:e.rotate(.5*Math.PI);e.translate(t,-a);e.scale(-1,1);return;case 8:e.rotate(-.5*Math.PI);e.translate(-t,0);return}}function _(e,t,a){if(!e.type.match(/image.*/)){return Promise.reject(new Error("File must be an image"))}return V(e).then(s=>new Promise(n=>{const l=new Image;l.onload=()=>{const e=document.createElement("canvas");const[i,r]=W(l.width,l.height,t);if(s>4){e.width=r;e.height=i}else{e.width=i;e.height=r}const c=e.getContext("2d");B(c,i,r,s);c.drawImage(l,0,0,i,r);n(e.toDataURL(a))};const i=new FileReader;i.onload=()=>l.src=i.result;i.readAsDataURL(e)}))}function E(e,t,a,s){const n=document.createElement("canvas");n.width=t;n.height=a;const l=.56*n.height;const i=n.getContext("2d");i.textBaseline="middle";i.font=`${l}px ${s}`;i.fillText(e,n.height*.05,l);return n.toDataURL()}function Y(e){const[,t]=L(e.name);switch(t.toLowerCase()){case".doc":case".docx":case".dot":case".wbk":case".docm":case".dotx":case".dotm":case".docb":case".txt":return l.wordDocIcn;case".webm":case".mkv":case".flv":case".vob":case".ogv":case".drc":case".gifv":case".mng":case".avi":case".mts":case".m2ts":case".mov":case".qt":case".wmv":case".yuv":case".rm":case".rmvb":case".viv":case".asf":case".amv":case".mp4":case".m4p":case".m4v":case".mpg":case".mp2":case".mpeg":case".mpe":case".mpv":case".m2v":case".svi":case".3gp":case".mxf":case".roq":case".nsv":case".f4v":case".f4p":case".f4a":case".f4b":return l.videoFileIcn;case".pdf":return l.pdfFileIcn;case".pcm":case".wav":case".aiff":case".mp3":case".aac":case".ogg":case".wma":case".flac":case".alac":return l.musicFileIcn;case".xls":case".xlt":case".xlm":case".xlsx":case".xlsm":case".xltx":case".xltm":case".xlsb":case".xla":case".xlam":case".xll":case".xlw":return l.excelFileIcn;case".html":case".js":case".css":case".scss":case".java":return l.codeFileIcn;case".jpg":case".jpeg":case".png":case".tiff":case".gif":case".svg":case".webp":return l.imageIcn;default:return l.fileIcn}}function N(e){return e&&e.includes("image")}class Z{view({attrs:{label:e,classes:a="bg-red"},children:s}){return t(".relative.dib",[s,e?t("span.absolute.ph1.nt1.nr1.top-0.right-0.br-pill.tc.f5.white.o-80",{class:a,style:{minWidth:"0.65rem"}},e):null])}}class G{view({attrs:{label:e,type:a="button",title:s=e,icon:n,rightIcon:l,context:i,classes:r="",disabled:c,style:o,onclick:d}}){return t("button.button-reset",{type:a,title:s,disabled:c,class:`${r} ${c?p.disabledWrapper:"pointer"} ${g(i)} ${p.button}`,style:o,onclick:d},M(n,e,l))}}class J{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,href:l,rel:i,target:r,download:c,context:o,classes:d="",style:u}}){return t("a.link.flex.items-center",{href:l,rel:i,target:r,download:c,title:a,class:`${d} ${g(o)} ${p.button}`,style:u},M(s,e,n))}}class K{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,classes:l="",disabled:i,style:r,onclick:c}}){return t(".mh2.pa2.truncate",{title:a,disabled:i,class:`${l} ${i?p.disabledWrapper:"pointer"} ${p.navButton}`,style:r,onclick:c},M(s,e,n))}}class Q{view({attrs:{label:e,title:a=e,icon:s,rightIcon:n,href:l,rel:i,target:r,download:c,classes:o="",style:d}}){return t("a.link.mh2.pa2.truncate",{href:l,rel:i,target:r,download:c,title:a,class:`${o} ${p.navButton}`,style:d},M(s,e,n))}}class X{view({attrs:{field:{style:e},value:a}}){return t(".pa2",{style:e},t.trust(a()))}}class ee{view({attrs:{field:e,value:a}}){const{label:s,uiClass:n={},style:l}=e;return t(".pa2.flex.flex-wrap",{class:b(n),style:l},[D(s),t("span.ws-normal",{title:a(),class:p.displayValue},a())])}}class te{formatter(e){return e?new Date(String(e)).toLocaleDateString():e}oninit({attrs:{value:e}}){this.formatted=e.map(this.formatter)}onremove(){this.formatted.end(true)}view({attrs:{field:e}}){return t(ee,{field:e,value:this.formatted})}}function ae(e,t){if(e==="email"){return{href:`mailto:${t}`,class:p.displayValue}}else if(e==="tel"){return{href:`tel:${t}`,class:p.displayValue}}else{return{href:t,target:"_blank",class:p.displayValue}}}const se={email:l.emailIcn,tel:l.telIcn};class ne{view({attrs:{field:e,value:a}}){const{label:s,type:n="url",uiClass:i={},style:r}=e;return t(".pa2.flex.flex-wrap",{class:b(i),style:r},[D(s),t("a.link.dim.pointer.ws-normal",ae(n,a()),t("i.mr2",{class:se[n]||l.linkIcn}),a())])}}class le{view({attrs:{field:a,value:s}}){const{options:n=[]}=a;const l=e.find(n,e.matches({value:s()||false}));return l?t("span.ml2",l.label):null}}class ie{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:s,uiClass:n={},style:i}=e;return t(".pa2.flex.items-center",{class:b(n),style:i},[D(s),t("i",{class:`${p.displayValue} ${l[a()?this.onIcon:this.offIcon]}`}),t(le,{field:e,value:a})])}}class re extends ie{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}function ce(e,t){if(e.required){return!t}return false}function oe(e,t){if(e.required){return t.length<1}return false}function de(e){return t=>{t.preventDefault();if(t.dataTransfer){t.dataTransfer.dropEffect="copy"}if(e()){t.redraw=false}e(true)}}function ue(e){return t=>{t.preventDefault();e(false)}}function pe(e,t){return a=>{a.preventDefault();e(false);if(a.dataTransfer){t(a.dataTransfer.files)}}}function fe(e){return({target:{files:t}})=>e(t)}class me{view({attrs:{field:a,defaultAccept:s="*",multiple:n=true,dragging:l,onSet:i},children:r}){const{label:c,id:o,name:d=o,title:u=c,required:p,readonly:f,disabled:m,autofocus:h,accept:g=s,uiClass:b={}}=a;return t("label.db",e.extend({for:o,title:u,class:T(m,f)},m||f?{}:{ondragover:de(l),ondragleave:ue(l),ondrop:pe(l,i)}),[t("input.clip[type=file].bg-transparent.bn.outline-0",{id:o,name:d,multiple:n,accept:g,required:p,autofocus:h,disabled:m||f,onchange:fe(i)}),c?t("span.db.mb1",{class:v(b,p)},U(c,p)):null,r])}}function he(t,a=false){return s=>{const n=a?[]:t();e.each(s,e=>{n.push({guid:C(),name:e.name,path:"not_set",file:e})});t(n)}}function ge(t,a){return s=>{s.preventDefault();const n=t();e.remove(n,{guid:a});t(n)}}class be{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const{disabled:n,uiClass:i={}}=a;return t("fieldset",{class:b(i,n)},[t(me,{field:a,dragging:this.dragging,onSet:he(s)},t("div",{class:w(i,oe(a,s()))},t(".pa2",{class:k(this.dragging())},[t("i.mr2",{class:l.uploadIcn}),t("span",l.addFilesTxt)]))),t(".flex.flex-column.mt1.nb1",e.map(s(),e=>t("span.pa2.mv1.ba.b--black-20.hide-child.dim.pointer",[t("i.mr2",{class:l.downloadIcn}),e.name,t("i.child.fr",{title:`${l.remFileTtl} ${e.name}`,class:l.deleteIcn,onclick:ge(s,e.guid)})])))])}}class ve{view({children:e,attrs:a}){return t(".relative.w-third.w-25-m.w-20-l.pa1.tc.hide-child",[a.src&&a.src!=="not_set"?t("img.contain",{src:a.src}):null,a.data&&a.data.file&&(a.src==="not_set"||!a.src)?t("div.contain.tc.br5.6rem",{class:`${Y(a.data)} fa-2x`,tooltip:a.data.file.type}):null,e])}}class we{view({attrs:e}){return t("i.pa1",{class:Y(e),title:l.openFileTxt,onclick:e.path!=="not_set"?()=>window.open(e.path,"_blank"):undefined})}}class ye{view({attrs:{displayType:a="thumbnail",value:s}}){return a==="thumbnail"?t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),e=>t(ve,{src:q(e.path,e.dataUrl),data:e,style:c()},t(".absolute.top-0.right-0.child",t(G,{title:`Remove ${e.name}`,icon:l.deleteIcn,onclick:ge(s,e.guid)}))))):t(".pa2.flex.flex-column",e.map(s(),e=>t(".flex.items-center.pa1.ba.b--black-20",[t("i.pa1",{class:l.uploadIcn}),t("span.ma1.flex-auto",e.name),t(we,e),t("i.pa1.pointer.dim",{title:`Remove ${e.name}`,class:l.cancelIcn,onclick:ge(s,e.guid)})])))}}class xe{view({attrs:{field:a,value:s}}){const{label:n,uiClass:l={},style:i}=a;const r=e.find(a.options,{value:s()});const c=r?r.label||r.value:s();return t(".pa2.flex.flex-wrap",{class:b(l),style:i},[D(n),t("span.ws-normal",{title:c,class:p.displayValue},c)])}}class Ie{view({attrs:{field:a,value:s}}){const{label:n,uiClass:i={},style:r}=a;return t(".pa2.flex.flex-column",{class:b(i),style:r},[D(n),t(".flex.flex-column.mt1.nb1",e.map(s(),({name:e,path:a})=>t("a.pa2.mv1.link.ba.b--black-20.dim.dib.pointer[target=_blank]",{class:p.displayValue,href:a},t("i.mr2",{class:l.downloadIcn}),e)))])}}class $e{view({attrs:{field:a,value:s}}){const{label:n,uiClass:l={},style:i}=a;return t(".pa2.flex.flex-column",{class:b(l),style:i},[D(n),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),({name:e,path:a,dataUrl:s})=>t(ve,{title:e,src:q(a,s),style:c()})))])}}class ke{view({attrs:{field:a,value:s}}){const{label:n,uiClass:i={},style:c}=a;const o=e.head(s());return t(".pa2.flex.flex-column",{class:b(i),style:c},[D(n),o?t("img.img.h-100.mt2.contain.self-center",{title:o.name,src:q(o.path,o.dataUrl),style:r()}):t("i.mt2",{class:`${p.displayValue} ${l.imageIcn}`})])}}function Te(e){let t=0;if(e.length>=8){t=1;if(e.length>=24){t=t+1}if(/(?=.*[A-Z].*[A-Z])/.test(e)&&/(?=.*[a-z].*[a-z].*[a-z])/.test(e)){t=t+1}if(/(?=.*[0-9].*[0-9])/.test(e)){t=t+1}if(/(?=.*[!"£%^@#$&*])/.test(e)){t=t+1}}return t}function Se(e){switch(e){case 0:{return"Invalid"}case 1:{return"Very Weak"}case 2:{return"Weak"}case 3:{return"Average"}case 4:{return"Strong"}case 5:{return"Very Strong"}}return""}const Ce=[{value:1,background:"bg-dark-red"},{value:2,background:"bg-orange"},{value:3,background:"bg-yellow"},{value:4,background:"bg-light-green"},{value:5,background:"bg-green"}];class Pe{oninit({attrs:{value:e}}){this.passwordScore=e.map(e=>Te(String(e)))}onremove(){this.passwordScore.end()}view({attrs:{field:a}}){const{label:s,style:n}=a;return t(".flex.flex-column",{style:n},[D(s),t(".flex.mt1",e.map(Ce,e=>t(".h1.w-20",{class:this.passwordScore()>=e.value?e.background:"bg-transparent"}))),t("span.f5.truncate",Se(this.passwordScore()))])}}class Ue{view({attrs:{field:{label:e="",title:a=e,required:s}}}){return t("label.mb2",{title:a},U(e,s))}}class qe{view({attrs:{field:e,value:a,xform:s=a}}){const{label:n,id:l,type:i="text",name:r=l,title:c=n,placeholder:o,max:d,maxlength:u,min:p,minlength:f,step:m,required:h,readonly:g,disabled:v,autofocus:x,autocomplete:I,pattern:$,inputmode:k,spellcheck:T,instant:S,uiClass:C={}}=e;return t("fieldset",{class:i==="hidden"?"clip":b(C,v)},[F(l,C,n,h),t("div",{class:w(C,ce(e,s()))},t("input.w-100.bg-transparent.bn.outline-0",{id:l,type:i,name:r,title:c,placeholder:o,max:d,maxlength:u,min:p,minlength:f,step:m,required:h,readonly:g,disabled:v,autofocus:x,autocomplete:I,pattern:$,inputmode:k,spellcheck:T,class:y(C),value:s(),[S?"oninput":"onchange"]:z(a)}))])}}class De{view({attrs:{field:a,value:s,xform:n=s}}){const{label:l,id:i,name:r=i,title:c=l,placeholder:o,max:d,maxlength:u,min:p,minlength:f,step:m,required:h,readonly:g,disabled:v,autofocus:x,autocomplete:I,pattern:$,inputmode:k,spellcheck:T,instant:S,uiClass:C={},options:P}=a;const U=P&&P.length?P[0].value:"$";return t("fieldset.flex-shrink-0",{class:b(C,v)},[F(i,C,l,h),t(".flex.items-center",{class:w(C,ce(a,n()))},t("span.mr1",U),t("input.w-100.bg-transparent.bn.outline-0",{id:i,type:"text",name:r,title:c,placeholder:o,max:d,maxlength:u,min:p,minlength:f,step:m,required:h,readonly:g,disabled:v,autofocus:x,autocomplete:I,pattern:$,inputmode:k,spellcheck:T,class:y(C),value:e.isUndefined(n())?null:ze(Fe(n())),[S?"oninput":"onchange"]:Le(s)}))])}}function Fe(t){return e.isString(t)?e.parseInt(t):Number(t)}function Me(t){const a=t.replace(/[^\d.]/g,"");let s;let n=0;if(a.indexOf(".")>-1){const t=a.indexOf(".");const l=a.substring(0,t);s=e.parseInt(e.padStart(l,1,"0"));const i=a.substring(t+1,Math.min(t+3,a.length));n=e.parseInt(e.padEnd(i,2,"0"))}else{s=e.parseInt(a)||0}return s*100+n}function ze(e){const t=Ae(e);if(t){return`${t[0]}.${t[1]}`}else{return t}}function Ae(t){if(!e.isFinite(t)){return undefined}const a=String(Math.abs(t));let s="0";let n="";if(a.length>2){const e=a.length-2;s=a.substring(0,e);n=a.substring(e)}else{n=e.padStart(a,2,"0")}return[s,n]}function Le(e){return({target:{value:t}})=>e(Me(t))}class Re{constructor(){this.month=a();this.year=a();this.date=a.lift((e,t)=>`${e}/${t}`,this.month,this.year)}oninit({attrs:{value:e}}){e.map(e=>{const[t,a=""]=String(e).split("/");this.month(t);this.year(a)});this.date.map(t=>{if(t!==e()){e(t)}})}onremove(){this.date.end(true);this.year.end(true);this.month.end(true)}view({attrs:{field:e,value:a}}){const{label:s,id:n,name:l=n,title:i=s,required:r,readonly:c,disabled:d,uiClass:u={}}=e;const p=y(u);return t("fieldset",{class:b(u,d)},[F(`${n}-mm`,u,s,r),t("div",{title:i,class:w(u,ce(e,a()))},[t("div.dib.mr2",[F(`${n}-mm`,u,"Month"),t("input.w-100.bg-transparent.bn.outline-0",{id:`${n}-mm`,name:`${l}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:r,readonly:c,disabled:d,value:this.month(),class:p,style:o,onchange:z(this.month)})]),t("span.mr2","/"),t("div.dib.mr2",[F(`${n}-yy`,u,"Year"),t("input.w-100.bg-transparent.bn.outline-0",{id:`${n}-yy`,name:`${l}-yy`,type:"text",placeholder:"YY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:r,readonly:c,disabled:d,value:this.year(),class:p,style:o,onchange:z(this.year)})])])])}}class He{constructor(){this.day=a();this.month=a();this.year=a();this.date=a.lift((e,t,a)=>`${a}-${t}-${e}`,this.day,this.month,this.year)}oninit({attrs:{value:t}}){t.map(t=>{const a=new Date(String(t));if(e.isDate(a)&&!isNaN(a.getTime())){this.day(e.padStart(String(a.getDate()),2,"0"));this.month(e.padStart(String(1+a.getMonth()),2,"0"));this.year(String(a.getFullYear()))}});this.date.map(a=>{const s=new Date(String(a));if(e.isDate(s)&&!isNaN(s.getTime())){if(a!==t()){t(a)}}else{t("")}})}onremove(){this.date.end(true);this.year.end(true);this.month.end(true);this.day.end(true)}view({attrs:{field:e,value:a}}){const{label:s,id:n,name:l=n,title:i=s,required:r,readonly:c,disabled:u,uiClass:p={},options:f}=e;const m=f&&f.length?f[0].value:"en-GB";const h=y(p);const g=t(".dib.mr2",[F(`${n}-dd`,p,"Day"),t("input.w-100.bg-transparent.bn.outline-0",{id:`${n}-dd`,name:`${l}-dd`,type:"text",placeholder:"DD",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:r,readonly:c,disabled:u,value:this.day(),class:h,style:o,onchange:z(this.day)})]);const v=t(".dib.mr2",[F(`${n}-mm`,p,"Month"),t("input.w-100.bg-transparent.bn.outline-0",{id:`${n}-mm`,name:`${l}-mm`,type:"text",placeholder:"MM",minlength:"2",maxlength:"2",pattern:"[0-9]*",inputmode:"numeric",required:r,readonly:c,disabled:u,value:this.month(),class:h,style:o,onchange:z(this.month)})]);const x=t(".dib.mr2",[F(`${n}-yyyy`,p,"Year"),t("input.w-100.bg-transparent.bn.outline-0",{id:`${n}-yyyy`,name:`${l}-yyyy`,type:"text",placeholder:"YYYY",minlength:"4",maxlength:"4",pattern:"[0-9]*",inputmode:"numeric",required:r,readonly:c,disabled:u,value:this.year(),class:h,style:d,onchange:z(this.year)})]);return t("fieldset",{class:b(p,u)},[F(n,p,s,r),t("div",{id:n,title:i,class:w(p,ce(e,a()))},m==="en-US"?[v,g,x]:[g,v,x])])}}class We{constructor(){this.showPassword=a(false)}view({attrs:{field:e,value:a}}){const{label:s,id:n,name:i=n,title:r=s,placeholder:c,maxlength:o,minlength:d,required:u,readonly:p,disabled:f,autofocus:m,autocomplete:h,pattern:g,inputmode:v,instant:x,uiClass:I={}}=e;return t("fieldset",{class:b(I,f)},[F(n,I,s,u),t("div.w-100.flex.items-center",{class:w(I,ce(e,a()))},t("input.w-100.bg-transparent.bn.outline-0",{id:n,name:i,title:r,placeholder:c,type:this.showPassword()?"text":"password",maxlength:o,minlength:d,required:u,readonly:p,disabled:f,autofocus:m,autocomplete:h,pattern:g,inputmode:v,class:y(I),value:a(),autocorrect:"off",[x?"oninput":"onchange"]:z(a)}),t("i.ml1.pa1.fa-fw.pointer.dim",{title:l.showPassTxt,class:this.showPassword()?l.hidePassIcn:l.showPassIcn,onclick:()=>this.showPassword(!this.showPassword())}))])}}class Oe{view({attrs:{field:e,value:a}}){const{label:s,id:n,name:l=n,title:i=s,placeholder:r,required:c,readonly:o,disabled:d,autofocus:u,autocomplete:p,spellcheck:f,instant:m,uiClass:h={}}=e;return t("fieldset",{class:b(h,d)},[F(n,h,s,c),t("div",{class:w(h,ce(e,a()))},t("textarea.w-100.bg-transparent.bn.outline-0[rows=3]",{id:n,name:l,title:i,placeholder:r,required:c,readonly:o,disabled:d,autofocus:u,autocomplete:p,spellcheck:f,class:I(h),value:a(),style:{resize:"vertical"},[m?"oninput":"onchange"]:z(a)}))])}}class je{constructor(){this.onIcon="checkIcn";this.offIcon="uncheckIcn"}view({attrs:{field:e,value:a}}){const{label:s="",id:n,name:i=n,title:r=s,required:c,readonly:o,disabled:d,autocomplete:u,uiClass:p={}}=e;return t("fieldset",{class:b(p,d)},t("div",{class:w(p)},[t("label.flex.items-center",{title:r,class:x(p,d,o)},t("input.clip[type=checkbox]",{id:n,name:i,checked:a(),required:c,autocomplete:u,disabled:d||o,onchange:A(a)}),t("i.mr2",{class:l[a()?this.onIcon:this.offIcon]}),U(s,c),t(le,{field:e,value:a}))]))}}class Ve extends je{constructor(){super(...arguments);this.onIcon="toggleOnIcn";this.offIcon="toggleOffIcn"}}class Be{view({attrs:{field:a,value:s}}){const{label:n,id:l,name:i=l,required:r,readonly:c,disabled:o,autocomplete:d,options:u,uiClass:p={}}=a;return t("fieldset",{class:b(p,o)},[F(l,p,n,r),t("div",{class:w(p,ce(a,s())),onchange:z(s)},e.map(u,({value:e,label:a=e,icon:n})=>{const l=s()===e;return t("label.dib",{title:a,class:$(p,l,o,c)},t("input.clip[type=radio]",{name:i,value:e,checked:l,required:r,autocomplete:d,disabled:o||c}),n?t("i.fa-fw",{class:n}):a)}))])}}class _e{view({attrs:{field:a,value:s}}){const{label:n,id:l,name:i=l,title:r=n,required:c,readonly:o,disabled:d,autofocus:u,autocomplete:p,uiClass:f={},options:m}=a;return t("fieldset",{class:b(f,d)},[F(l,f,n,c),t("div",{class:w(f,ce(a,s()))},t("select.w-100.bg-transparent.bn.outline-0",{id:l,name:i,title:r,required:c,readonly:o,disabled:d,autofocus:u,autocomplete:p,class:y(f),value:s(),onchange:z(s)},e.map(m,({value:e,label:a=e})=>t("option",{value:e,disabled:d||o},a))))])}}class Ee{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const n=e.head(s());const{disabled:i,uiClass:r={}}=a;return t("fieldset",{class:b(r,i)},t(me,{field:a,multiple:false,dragging:this.dragging,onSet:he(s,true)},t("div",{class:w(r,oe(a,s()))},t(".flex.items-center.pa1",{class:k(this.dragging())},[t("i.pa1",{class:l.uploadIcn}),t("span.ma1.flex-auto",n?n.name:l.addFileTxt),n?t(we,n):null,n?t("i.pa1.pointer.dim",{title:`Remove ${n.name}`,class:l.cancelIcn,onclick:ge(s,n.guid)}):null]))))}}function Ye(a,s,n=false){return l=>{const i=n?[]:a();return Promise.all(e.map(l,e=>_(e,s,e.type).then(t=>{const a=H(R(t),e.name);i.push({guid:C(),name:a.name,path:"not_set",file:a,dataUrl:t})}))).then(()=>{a(i);t.redraw()})}}class Ne{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const{disabled:n,uiClass:i={}}=a;return t("fieldset",{class:b(i,n)},[t(me,{field:a,defaultAccept:"image/*",dragging:this.dragging,onSet:Ye(s,l.imageMaxSize)},t("div",{class:w(i,oe(a,s()))},t(".w-100.pa1.dt.tc",{class:k(this.dragging())},t("i.fa-2x.dtc.v-mid",{class:l.cameraIcn})))),t(".flex.flex-row.flex-wrap.mt1.nr1.nb1.nl1",e.map(s(),e=>t(ve,{src:q(e.path,e.dataUrl),style:c()},t(".absolute.top-0.right-0.child",t(G,{title:`Remove ${e.name}`,icon:l.deleteIcn,onclick:ge(s,e.guid)})))))])}}class Ze{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const n=e.head(s());const{disabled:i,uiClass:c={}}=a;return t("fieldset",{class:b(c,i)},t(me,{field:a,defaultAccept:"image/*",multiple:false,dragging:this.dragging,onSet:Ye(s,l.imageMaxSize,true)},t("div",{class:w(c,oe(a,s()))},t(".pa1",{class:k(this.dragging())},t(".relative.w-100.dt.tc",n?[t("img.img.contain",{title:n.name,src:q(n.path,n.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${n.name}`,onclick:ge(s,n.guid)},t("i.pa1",{class:l.cancelIcn}))]:t("i.fa-2x.dtc.v-mid",{class:l.cameraIcn}))))))}}class Ge{oncreate({dom:t}){const a=t.children[0];const n=P();this.signaturePad=new s(a,{minWidth:.5*n,maxWidth:1.5*n});const l=()=>{const e=P();a.width=a.offsetWidth*e;a.height=a.offsetHeight*e;const t=a.getContext("2d");t.scale(e,e);this.resetCanvas()};this.resizeHandler=e.debounce(l,250);window.addEventListener("resize",this.resizeHandler);window.addEventListener("orientationchange",this.resizeHandler);l()}onremove(){this.resizeHandler.cancel();window.removeEventListener("resize",this.resizeHandler);window.removeEventListener("orientationchange",this.resizeHandler)}view({attrs:{style:e,onSet:a,onCancel:s}}){return[t(".aspect-ratio.bg-white.ba.bw1.br3.b--dashed.b--black-30",{style:e},t("canvas.aspect-ratio--object")),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(G,{title:l.applyTtl,icon:l.applyIcn,classes:"ma1",onclick:()=>{if(!this.signaturePad.isEmpty()){a(this.signaturePad.toDataURL("image/png"))}}}),t(G,{title:l.resetTtl,icon:l.resetIcn,classes:"ma1",onclick:()=>this.resetCanvas()}),t(G,{title:l.cancelTtl,icon:l.cancelIcn,classes:"ma1",onclick:s})])]}resetCanvas(){this.signaturePad.clear()}}function Je(e,t){const a=l.signMaxSize;const s=.01*t*a;return E(e,a,s,l.signFont)}function Ke(e,t,a){return()=>a(Je(t,e))}class Qe{view({attrs:{heightPct:e,stampTxt:a,stampSetTxt:s,onSet:n}}){return[t("span.clip",{style:{"font-family":l.signFont}},s),t(".flex",t(G,{label:a,classes:`flex-auto ${l.stampBtnClass}`,context:l.stampBtnContext,onclick:Ke(e,s,n)}))]}}function Xe(e,t,a){return()=>{if(e()){a(Je(e(),t))}return false}}class et{constructor(){this.text=a("")}oncreate({dom:e}){const t=e.children[0];t.focus({preventScroll:false});this.scaleText(e)}onupdate({dom:e}){this.scaleText(e)}view({attrs:{heightPct:e,style:a,onSet:s,onCancel:n}}){return[t("form.aspect-ratio.ba.bw1.br3.b--dashed.b--black-30",{style:a,onsubmit:Xe(this.text,e,s)},t("input.aspect-ratio--object.pa2.ba.bw0[type=text]",{oninput:z(this.text),value:this.text(),style:{"font-family":l.signFont}})),t(".absolute.top-0.right-0.z-999",{style:{transform:"translateY(-100%)"}},[t(G,{title:l.applyTtl,icon:l.applyIcn,classes:"ma1",onclick:Xe(this.text,e,s)}),t(G,{title:l.resetTtl,icon:l.resetIcn,classes:"ma1",onclick:()=>this.text("")}),t(G,{title:l.cancelTtl,icon:l.cancelIcn,classes:"ma1",onclick:n})])]}scaleText(e){const t=e.clientHeight;e.style.fontSize=`${.56*t}px`}}function tt(e,t){return new Promise(a=>{const s=new Image;s.onload=()=>{const e=document.createElement("canvas");const[n,l]=W(s.width,s.height,t);e.width=n;e.height=l;const i=e.getContext("2d");i.drawImage(s,0,0,n,l);a(e.toDataURL())};s.src=e})}function at(e,a,s){return n=>tt(n,s).then(s=>{const n=H(R(s),`sign-${a}.png`);e([{guid:C(),name:n.name,path:"not_set",file:n,dataUrl:s}]);t.redraw()})}class st{oninit({attrs:{value:e}}){this.valUpdate=e.map(()=>this.setComponent())}onremove(){this.valUpdate.end()}view({attrs:{field:a,value:s}}){const{label:n,id:i,readonly:r,disabled:c,uiClass:o={},options:d=l.signOpts,heightPct:u=l.signHeightPct,stampTxt:f=l.stampTxt,stampSetTxt:m=l.stampSetTxt}=a;const h={paddingBottom:`${u}%`};const g=e.head(s());const v=e(d).map(({value:e})=>{if(e==="draw"){return{component:Ge,icon:l.drawIcn,label:l.signDrawTxt}}else if(e==="type"){return{component:et,icon:l.typeIcn,label:l.signTypeTxt}}else if(e==="stamp"){return{component:Qe,icon:l.stampIcn,label:l.signStampTxt}}return null}).compact().value();if(v.length===1&&!g){this.setComponent(v[0].component)}return t("fieldset.relative",{class:b(o,c)},[F(i,o,n),t("div",{class:w(o,oe(a,s()))},r||c?t(".aspect-ratio",{id:i,style:h},g?t(".aspect-ratio--object",t("img.img.w-100.absolute",{src:q(g.path,g.dataUrl)})):null):this.component?t(this.component,{heightPct:u,stampTxt:f,stampSetTxt:m,style:h,onSet:at(s,i,l.signMaxSize),onCancel:()=>this.setComponent()}):t(".aspect-ratio.pointer",{id:i,class:p.fileInput,style:h},g?t(".aspect-ratio--object.hide-child.dim",{onclick:()=>s([])},[t("img.img.w-100.absolute",{src:q(g.path,g.dataUrl)}),t(".pa3.absolute.top-0.right-0.child",t("i.fa-2x",{class:l.resetIcn}))]):t(".aspect-ratio--object.flex.items-stretch.justify-center",e.map(v,({component:e,icon:a,label:s})=>t(".flex-auto.flex.flex-column.flex-wrap.justify-center.tc.dim",{onclick:()=>this.setComponent(e)},t("i.fa-2x.ma1",{class:a}),t("span.ma1",s))))))])}setComponent(e){this.component=e}}function nt(a,s){return n=>{const i=s?[]:a();return Promise.all(e.map(n,e=>{if(N(e.type)){return _(e,l.imageMaxSize,e.type).then(t=>{const a=H(R(t),e.name);i.push({guid:C(),name:a.name,path:"not_set",file:a,dataUrl:t})})}else{i.push({guid:C(),name:e.name,path:"not_set",file:e});return Promise.resolve()}})).then(()=>{a(i);t.redraw()})}}class lt{constructor(){this.dragging=a(false)}view({attrs:{field:a,value:s}}){const n=e.head(s());const{disabled:i,uiClass:c={}}=a;return t("fieldset",{class:b(c,i)},t(me,{field:a,defaultAccept:"*",multiple:false,dragging:this.dragging,onSet:nt(s,true)},t("div",{class:w(c,oe(a,s()))},t(".flex.items-center.pa1",{class:k(this.dragging())},n?n.dataUrl?[t(".relative.w-100.dt.tc",t("img.img.contain",{title:n.name,src:q(n.path,n.dataUrl),style:r()}),t(".absolute.top-0.right-0.pa1.pointer.dim",{title:`Remove ${n.name}`,onclick:ge(s,n.guid)},t("i.pa1",{class:l.cancelIcn})))]:[t(we,n),t("span.ma1.flex-auto",n.name),t("i.pa1.pointer.dim",{title:`Remove ${n.name}`,class:l.cancelIcn,onclick:ge(s,n.guid)})]:[t("i.pa1",{class:l.uploadIcn}),t("span.ma1.flex-auto",l.addFileTxt)]))))}}class it{constructor(){this.dragging=a(false)}view({attrs:{field:e,value:a,displayType:s,showDisplay:n=true}}){const{disabled:i,uiClass:r={}}=e;return t("fieldset",{class:b(r,i)},[t(me,{field:e,defaultAccept:"*",dragging:this.dragging,onSet:nt(a,false)},t("div",{class:w(r,oe(e,a()))},t(".flex.items-center.pa1.dt",{class:k(this.dragging())},[t("i.pa1",{class:l.uploadIcn}),t("span.ma1.flex-auto",l.addFileTxt)]))),n?t(ye,{displayType:s,value:a}):null])}}export{Z as Badge,qe as BaseInput,ee as BaseText,G as Button,J as ButtonLink,Re as CardDateInput,ie as Checkbox,je as CheckboxInput,De as CurrencyInput,He as DateInput,te as DateText,ye as DisplayTypeComponent,Ie as FileList,be as FileMulti,Ee as FileSelect,$e as ImageList,Ne as ImageMulti,ke as ImagePreview,Ze as ImageSelect,Ue as Label,ne as Link,it as MultiOmniFileInput,K as NavButton,Q as NavLink,lt as OmniFileInput,We as PasswordInput,Pe as PasswordStrength,Be as RadioInput,_e as SelectInput,xe as SelectText,st as SignBuilder,Oe as TextareaInput,re as Toggle,Ve as ToggleInput,X as Trusted,Me as currencyStrToNumber,R as dataURItoBlob,H as fileConstructor,L as fileNameExtSplit,O as getOrientation,C as guid,se as iconMap,ae as linkAttrs,ze as numberToCurrencyStr,Ae as numberToCurrencyTuple,j as readArrayBuffer,V as readOrientation,_ as resizeImage,W as scaleRect,h as updateButtonContext,f as updateClasses,i as updateConfig};
