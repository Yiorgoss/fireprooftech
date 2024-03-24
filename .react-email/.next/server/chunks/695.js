exports.id=695,exports.ids=[695],exports.modules={392:(e,t,r)=>{var s={".":8258,"./":8258,"./cn":4317,"./cn.ts":4317,"./constants":7100,"./constants.ts":7100,"./copy-text-to-clipboard":5603,"./copy-text-to-clipboard.ts":5603,"./emails-directory-absolute-path":9403,"./emails-directory-absolute-path.ts":9403,"./get-email-component":4257,"./get-email-component.ts":4257,"./improve-error-with-sourcemap":8583,"./improve-error-with-sourcemap.ts":8583,"./index":8258,"./index.ts":8258,"./language-map":1323,"./language-map.ts":1323,"./static-node-modules-for-vm":3570,"./static-node-modules-for-vm.ts":3570,"./types/as":9234,"./types/as.ts":9234,"./types/email-template":6600,"./types/email-template.ts":6600,"./types/error-object":9431,"./types/error-object.ts":9431,"./types/hot-reload-change":4326,"./types/hot-reload-change.ts":4326,"./types/hot-reload-event":2273,"./types/hot-reload-event.ts":2273,"./unreachable":5103,"./unreachable.ts":5103};function o(e){return r(a(e))}function a(e){if(!r.o(s,e)){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}o.keys=function(){return Object.keys(s)},o.resolve=a,e.exports=o,o.id=392},8359:()=>{},3739:()=>{},8930:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},3075:(e,t,r)=>{Promise.resolve().then(r.bind(r,8414))},8414:(e,t,r)=>{"use strict";r.r(t),r.d(t,{EmailsProvider:()=>l,useEmails:()=>n});var s=r(5344),o=r(3729);r(3664);var a=r(8371);(0,a.$)("971e5098c72f1c25e642e47ca03b71eac7346edf"),r(2815),(0,a.$)("dcb2823d452cd4a281b386e14589b02ae010edff"),(0,a.$)("ea231cfe7bacf155a4b44ff7a6e0aad50e02445d");let i=(0,o.createContext)(void 0),n=()=>{let e=(0,o.useContext)(i);if(void 0===e)throw Error("Cannot call `useEmail()` outside of an EmailsContext provider!");return e},l=e=>{let[t,r]=(0,o.useState)(e.initialEmailsDirectoryMetadata),[a,n]=(0,o.useState)({});return s.jsx(i.Provider,{value:{emailsDirectoryMetadata:t,useEmailRenderingResult:(e,t)=>((0,o.useEffect)(()=>{void 0===a[e]&&n(r=>({...r,[e]:t}))},[t,e]),void 0!==a[e])?a[e]:t},children:e.children})}},2815:(e,t,r)=>{"use strict";r(3729),r(6806)},3745:(e,t,r)=>{"use strict";r.r(t),r.d(t,{getEmailsDirectoryMetadata:()=>u});var s=r(4471);r(8616);var o=r(7561),a=r.n(o),i=r(9411),n=r.n(i),l=r(2053);let c=e=>{if(a().statSync(e).isDirectory())return!1;let{ext:t}=n().parse(e);if(![".js",".tsx",".jsx"].includes(t))return!1;let r=a().readFileSync(e,"utf8");return/\bexport\s+default\b/gm.test(r)},d=e=>{let t=e;for(;0===t.emailFilenames.length&&1===t.subDirectories.length;){let e=t.subDirectories[0];t={subDirectories:e.subDirectories,emailFilenames:e.emailFilenames,absolutePath:e.absolutePath,directoryName:n().join(t.directoryName,e.directoryName)}}return t},u=async e=>{if(!a().existsSync(e))return;let t=await a().promises.readdir(e,{withFileTypes:!0}),r=t.filter(t=>c(n().join(e,t.name))).map(e=>e.name.replace(n().extname(e.name),"")),s=await Promise.all(t.filter(e=>e.isDirectory()&&!e.name.startsWith("_")&&"static"!==e.name).map(t=>u(n().join(e,t.name))));return d({absolutePath:e,directoryName:e.split(n().sep).pop(),emailFilenames:r,subDirectories:s})};(0,l.h)([u]),(0,s.U)("971e5098c72f1c25e642e47ca03b71eac7346edf",u)},4692:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h,metadata:()=>p});var s=r(5036);r(5023);var o=r(3745),a=r(9403),i=r(6843);let n=(0,i.createProxy)(String.raw`/Users/squanchy2/code/websites/fireprooftech/.react-email/src/contexts/emails.tsx`),{__esModule:l,$$typeof:c}=n;n.default,(0,i.createProxy)(String.raw`/Users/squanchy2/code/websites/fireprooftech/.react-email/src/contexts/emails.tsx#useEmails`);let d=(0,i.createProxy)(String.raw`/Users/squanchy2/code/websites/fireprooftech/.react-email/src/contexts/emails.tsx#EmailsProvider`);var u=r(4861),m=r.n(u);let p={title:"React Email"},h=async({children:e})=>{let t=await (0,o.getEmailsDirectoryMetadata)(a.emailsDirectoryAbsolutePath);if(void 0===t)throw Error(`Could not find the emails directory specified under ${a.emailsDirectoryAbsolutePath}!`);return s.jsx("html",{lang:"en",children:s.jsx("body",{className:m().className,children:s.jsx(d,{initialEmailsDirectoryMetadata:t,children:e})})})}},4317:(e,t,r)=>{"use strict";r.r(t),r.d(t,{cn:()=>a});var s=r(990),o=r(1774);let a=(...e)=>(0,o.m6)((0,s.W)(e))},7100:(e,t,r)=>{"use strict";r.r(t),r.d(t,{tabTransition:()=>s});let s={type:"spring",stiffness:2e3,damping:80,mass:1}},5603:(e,t,r)=>{"use strict";r.r(t),r.d(t,{copyTextToClipboard:()=>s});let s=async e=>{try{await navigator.clipboard.writeText(e)}catch{throw Error("Not able to copy")}}},9403:(e,t,r)=>{"use strict";r.r(t),r.d(t,{emailsDirRelativePath:()=>s,emailsDirectoryAbsolutePath:()=>n,normalizePath:()=>i,pathSeparator:()=>a,userProjectLocation:()=>o});let s="src/lib/emails",o="/Users/squanchy2/code/websites/fireprooftech",a="/",i=e=>{let t=e;for(;t.startsWith(`.${a}`);)t=t.slice(2);for(;t.startsWith(a);)t=t.slice(1);for(;t.endsWith(a);)t=t.slice(0,-1);return t},n=`/Users/squanchy2/code/websites/fireprooftech${a}${i(s)}`},4257:(e,t,r)=>{"use strict";r.r(t),r.d(t,{getEmailComponent:()=>d});var s=r(9411),o=r.n(s),a=r(6019),i=r.n(a),n=r(5432),l=r(8583),c=r(3570);let d=async e=>{let t;try{t=(await (0,n.build)({bundle:!0,entryPoints:[e],platform:"node",write:!1,format:"cjs",jsx:"automatic",logLevel:"silent",loader:{".js":"jsx"},outdir:"stdout",sourcemap:"external"})).outputFiles}catch(e){return{error:{message:e.message,stack:e.stack,name:e.name,cause:e.cause}}}let s=t[0],a=t[1].text,d={...global,console,Buffer,module:{exports:{default:void 0}},__filanem:e,__dirname:o().dirname(e),require:e=>e in c.staticNodeModulesForVM?c.staticNodeModulesForVM[e]:r(392)(`${e}`),process},u=JSON.parse(s.text);try{i().runInNewContext(a,d,{filename:e})}catch(t){return{error:(0,l.improveErrorWithSourceMap)(t,e,u)}}return void 0===d.module.exports.default?{error:(0,l.improveErrorWithSourceMap)(Error(`The email component at ${e} does not contain a default export`),e,u)}:{emailComponent:d.module.exports.default,sourceMapToOriginalFile:u}}},8583:(e,t,r)=>{"use strict";r.r(t),r.d(t,{improveErrorWithSourceMap:()=>a});var s=r(2244),o=r(4253);let a=(e,t,r)=>{let a;if(void 0!==e.stack){let i=s.Q(e.stack),n=new o.SourceMapConsumer(r),l=[];for(let e of i)if(e.file===t){if(e.column||e.lineNumber){let r=n.originalPositionFor({column:e.column??0,line:e.lineNumber??0}),s=r.column&&r.line?`${r.line}:${r.column}`:r.line;l.push(` at ${e.methodName} (${t}:${s})`)}else l.push(` at ${e.methodName} (${t})`)}else{let t=e.column&&e.lineNumber?`${e.lineNumber}:${e.column}`:e.lineNumber;l.push(` at ${e.methodName} (${e.file}:${t})`)}a=l.join("\n")}return{name:e.name,message:e.message,cause:e.cause,stack:a}}},8258:(e,t,r)=>{"use strict";r.r(t),r.d(t,{cn:()=>s.cn,copyTextToClipboard:()=>o.copyTextToClipboard,unreachable:()=>a.unreachable});var s=r(4317),o=r(5603);r(1323);var a=r(5103)},1323:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={jsx:"React",markup:"HTML",markdown:"Plain Text"}},3570:(e,t,r)=>{"use strict";r.r(t),r.d(t,{staticNodeModulesForVM:()=>ea});var s=r(5628),o=r.n(s),a=r(6019),i=r.n(a),n=r(3858),l=r.n(n),c=r(7261),d=r.n(c),u=r(1041),m=r.n(u),p=r(5997),h=r.n(p),f=r(1764),y=r.n(f),b=r(2332),v=r.n(b),x=r(6915),g=r.n(x),w=r(4492),E=r.n(w),P=r(1747),N=r.n(P),$=r(9630),j=r.n($),M=r(3801),D=r.n(M),T=r(9411),S=r.n(T),C=r(612),F=r.n(C),_=r(7503),k=r.n(_),q=r(2286),U=r.n(q),W=r(8849),O=r.n(W),R=r(7561),L=r.n(R),z=r(5673),A=r.n(z),V=r(4158),J=r.n(V),B=r(604),H=r.n(B),I=r(1215),Q=r.n(I),G=r(6005),K=r.n(G),X=r(8878),Y=r.n(X),Z=r(7718),ee=r.n(Z),et=r(2254),er=r.n(et),es=r(8061),eo=r.n(es);let ea={zlib:o(),"node:zlib":o(),vm:i(),"node:vm":i(),v8:l(),"node:v8":l(),util:d(),"node:util":d(),url:m(),"node:url":m(),tty:h(),"node:tty":h(),tls:y(),"node:tls":y(),timers:v(),"node:timers":v(),string_decoder:g(),"node:string_decoder":g(),stream:E(),"node:stream":E(),readline:N(),"node:readline":N(),querystring:j(),"node:querystring":j(),punycode:D(),"node:punycode":D(),path:S(),"node:path":S(),os:F(),"node:os":F(),net:k(),"node:net":k(),https:U(),"node:https":U(),http:O(),"node:http":O(),fs:L(),"node:fs":L(),events:A(),"node:events":A(),domain:J(),"node:domain":J(),dns:H(),"node:dns":H(),dgram:Q(),"node:dgram":Q(),crypto:K(),"node:crypto":K(),cluster:Y(),"node:cluster":Y(),child_process:ee(),"node:child_process":ee(),buffer:er(),"node:buffer":er(),assert:eo(),"node:assert":eo()}},9234:(e,t,r)=>{"use strict";r.r(t)},6600:(e,t,r)=>{"use strict";r.r(t),r.d(t,{isEmailTemplate:()=>s});let s=e=>"function"==typeof e},9431:(e,t,r)=>{"use strict";r.r(t)},4326:(e,t,r)=>{"use strict";r.r(t)},2273:(e,t,r)=>{"use strict";r.r(t)},5103:(e,t,r)=>{"use strict";r.r(t),r.d(t,{unreachable:()=>s});let s=(e,t=`Entered unreachable code. Received '${"string"==typeof e?e:JSON.stringify(e)}'.`)=>{throw TypeError(t)}},5023:()=>{}};