var X509;(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{default:()=>Ee});const n=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],r=[],i=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","-","_","="],o=[];for(let e=0;e<n.length;e++)r[n[e].charCodeAt(0)]=e,o[i[e].charCodeAt(0)]=e;const c=function(e,t,r){t=t||n;let i,o,c,s,u,a="",l="",d="",f=0;const y=e.length,g=y-y%3;let h=0;for(;f<g;)i=e[f++],o=e[f++],l=e[f++],c=i>>2,s=(3&i)<<4|o>>4,u=(15&o)<<2|l>>6,d=63&l,a+=t[c]+t[s]+t[u]+t[d],h+=4,r>0&&h%r==0&&(a+="\r\n");return y-g==2?(i=e[f++],o=e[f++],a+=t[i>>2]+t[(3&i)<<4|o>>4]+t[(15&o)<<2]+"="):y-g==1&&(i=e[f++],a+=t[i>>2]+t[(3&i)<<4]+"=="),"\n"===a.charAt(a.length-1)&&(a=a.substr(0,a.length-2)),a},s=function(e,t){if(t=t||r,""===(e=e.replace(/\s/g,"")))return[];const n=[];let i,o,c,s,u,a="",l="",d=0;const f=e.length;let y=f;for("="===e.slice(-1)&&(y=f-4);d<y;)c=t[e.charCodeAt(d++)],s=t[e.charCodeAt(d++)],u=t[e.charCodeAt(d++)],l=t[e.charCodeAt(d++)],i=c<<2|s>>4,o=(15&s)<<4|u>>2,a=(3&u)<<6|l,n.push(i,o,a);return f!==y&&(c=t[e.charCodeAt(d++)],s=t[e.charCodeAt(d++)],"=="===e.slice(-2)?n.push(c<<2|s>>4):"="===e.slice(-1)&&(u=t[e.charCodeAt(d++)],n.push(c<<2|s>>4,(15&s)<<4|u>>2))),n},u={encode:c,decode:s},a={encode:function(e,t){return c(e,i,t).replace(/=+$/,"")},decode:function(e){for(;e.length%4!=0;)e+="=";return s(e,o)}},l={Boolean:1,Integer:2,BitString:3,OctetString:4,Null:5,ObjectIdentifier:6,Enumerated:10,Sequence:16,Set:17,UTF8String:12,NumericString:18,PrintableString:19,T61String:20,IA5String:22,UTCTime:23,GeneralizedTime:24,VisibleString:26,GeneralString:27,BMPString:30,TagNumberMask:31,ConstructedFlag:32,ConstructedSequence:48,ConstructedSet:49,ContextSpecificTagFlag:128,ContextSpecificConstructedTag0:160,ContextSpecificConstructedTag1:161,ContextSpecificConstructedTag2:162,ContextSpecificConstructedTag3:163,TagClassMask:192,VALUE_NAME_MAP:{16:"SEQUENCE",17:"SET",48:"SEQUENCE",49:"SET",6:"OBJECT IDENTIFIER",2:"INTEGER",1:"BOOLEAN",3:"BIT STRING",4:"OCTET STRING",5:"NULL"}};for(const e in l)l.hasOwnProperty(e)&&"VALUE_NAME_MAP"!==e&&!l.VALUE_NAME_MAP.hasOwnProperty(l[e])&&(l.VALUE_NAME_MAP[l[e]]=e);const d=l;const f={decode:function(e,t,n){t=void 0===t?0:t,n=void 0===n?e.length:n;let r="";const i=e[t];r+=Math.floor(i/40)+"."+i%40;let o,c,s=!0,u=0;for(let i=1;i<n;i++)o=e[t+i],c=127&o,s&&(r+=".",s=!1),u<<=7,u+=c,o===c&&(r+=u,u=0,s=!0);return r},encode:function(e){const t=e.split(".").map((e=>parseInt(e))),n=[];n.push(40*t[0]+t[1]);for(let e=2;e<t.length;e++){let r=t[e];if(r<=127){n.push(r);continue}const i=[];let o=!1;for(;r>0;){let e=127&r;o&&(e|=128),i.unshift(e),r>>=7,o||(o=!0)}Array.prototype.push.apply(n,i)}return n}};function y(e,t,n){let r=null;if("string"==typeof e){if(void 0!==t)throw new Error("expect 'undefined' for argument offset");r=e,t=0,n=(e=function(e){const t=[];for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<=127?t.push(r):r<=2047?t.push(r>>6|192,63&r|128):r<=65535?t.push(r>>12|224,r>>6&63|128,63&r|128):t.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}return t}(r)).length}if(t+n>e.length)throw new Error("offset out of range");void 0===t&&(t=0),void 0===n&&(n=e.length);const i=t,o=n;let c=t;const s=t+n;function u(){const t=e[c];return t<128?1:t<224?2:t<240?3:4}function a(){const t=e[c++];if(t<128)return t;const n=e[c++];if(t<224)return(31&t)<<6|63&n;const r=e[c++];if(t<240)return(15&t)<<12|(63&n)<<6|63&r;return(7&t)<<18|(63&n)<<12|(63&r)<<6|63&e[c++]}return{toString:function(){if(null!==r)return r;const e=[];for(;c<s;){const t=u();if(c+t>s)throw new Error("unformed utf8 bytes array");e.push(a())}return r=String.fromCharCode.apply(null,e)},getBytesArray:()=>e.slice(i,i+o)}}const g=[["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]],h=[["January","February","March","April","May","June","July","August","September","October","November","December",""],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""]],p=function(e){const t=this;switch(e){case"dddd":return g[0][t.getDay()];case"ddd":return g[1][t.getDay()];case"MMMM":return h[0][t.getMonth()];case"MMM":return h[1][t.getMonth()];case"yyyy":return t.getFullYear();case"yy":return t.getFullYear()%2;case"M":return t.getMonth()+1;case"MM":return("0"+(t.getMonth()+1)).slice(-2);case"d":return t.getDate();case"dd":return("0"+t.getDate()).slice(-2);case"HH":return("0"+t.getHours()).slice(-2);case"h":return t.getHours();case"m":return t.getMinutes();case"mm":return("0"+t.getMinutes()).slice(-2);case"s":return t.getSeconds();case"ss":return("0"+t.getSeconds()).slice(-2);case"tttt":return t.getMilliseconds();default:return e}},C=function(e){const t=this;switch(e){case"dddd":return g[0][t.getUTCDay()];case"ddd":return g[1][t.getUTCDay()];case"MMMM":return h[0][t.getUTCMonth()];case"MMM":return h[1][t.getUTCMonth()];case"yyyy":return t.getUTCFullYear();case"yy":return t.getUTCFullYear()%100;case"M":return t.getUTCMonth()+1;case"MM":return("0"+(t.getUTCMonth()+1)).slice(-2);case"d":return t.getUTCDate();case"dd":return("0"+t.getUTCDate()).slice(-2);case"HH":return("0"+t.getUTCHours()).slice(-2);case"h":return t.getUTCHours();case"m":return t.getUTCMinutes();case"mm":return("0"+t.getUTCMinutes()).slice(-2);case"s":return t.getUTCSeconds();case"ss":return("0"+t.getUTCSeconds()).slice(-2);case"tttt":return t.getUTCMilliseconds();default:return e}};const E=[0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];function b(e){const t=function(e){let t=e>>24;return 0!==t?24+E[t]:(t=e>>16,0!==t?16+E[t]:(t=e>>8,0!==t?8+E[t]:E[e]))}(e),n=Math.floor((t+7)/8);if(n<=0||n>4)throw new Error("invalid bit string value");const r=[];for(let e=0;e<=n;e++)r.push(0);for(let t=1;t<n;t++)r[t]=255&e,e>>=8;if(!(255&e))throw new Error("invalid bit string value");r[n]=255&e;let i=0;for(;!(e&1<<i);)++i;if(i>=8)throw new Error("invalid bit string value");return r[0]=255&i,r}const S=function(e,t){if(t instanceof Uint8Array){const e=[];t.forEach((t=>{e.push(t)})),t=e}Array.prototype.push.apply(e,t)};function A(e,t){return t=t||[],{encode:n=>(void 0===n&&(n=[]),"function"==typeof t&&(t=t()),"string"==typeof t&&(t=t.split("").map((e=>e.charCodeAt(0)))),v(e,t.length,n),S(n,t),n)}}function m(e,...t){if(1===t.length&&"function"==typeof t[0]){const e=[];t[0](e),t=e}return{child(e){return e instanceof Array?S(t,e):t.push(e),this},encode(n){void 0===n&&(n=[]);const r=[];return t.forEach((e=>e&&e.encode(r))),function(e,t,n){v(e,t.length,n),S(n,t)}(e,r,n),n}}}function w(e,t,n){if(e&&"object"==typeof e&&e.hasOwnProperty("tag"))return e;t=t||0,n=n||e.length-t;const r=function(e){const t=e>>6&3;return{tag:e,classification:t,isPrimitive:!(e>>5&1),isConstructed:1==(e>>5&1),type:31&e,isUniversal:0===t,isApplication:1===t,isContextSpecific:2===t,isPrivate:3===t}}(e[t]),i=function(e,t,n){if(t>=n)throw new Error("Argument_Out_Of_Range");const r=e[t];if(r<128){if(r>n-t-1)throw new Error("Content_Length_Out_Of_Range");return{length:r,consumed:1}}const i=127&r;if(i>4||0===i)throw new Error("Content_Length_Mask_Error");const o=1+i;if(o>n-t)throw new Error("Content_Length_Out_Of_Range");const c=t+o;let s=0;for(let n=t+1;n<c;n++)s<<=8,s|=e[n];if(s<0||s>n-t-o)throw new Error("Content_Length_Out_Of_Range");return{length:s,consumed:o}}(e,t+1,n),o=t+1+i.consumed,c=i.length,s=o+c,u={tag:r,tagOffset:t,offset:o,end:s,all:()=>0===t&&s===e.length?e:e.slice(t,s),contents:()=>e.slice(o,s),string:()=>r.type===d.UTF8String?y(e,o,s-o).toString():String.fromCharCode(...e.slice(o,s)),objectIdentifier(){if(r.type!==d.ObjectIdentifier)throw new Error("invalid tag type, expect 'ObjectIdentifier'");return f.decode(e,o,s-o)},bytes(){if(s-o==0)return[];if(r.type===d.BitString){if(0!==e[o])throw new Error("invalid 'BitString'");return e.slice(o+1,s)}return e.slice(o,s)},bigInteger(){if(r.type!==d.Integer)throw new Error("invalid tag type, expect 'Integer'");return e.slice(0===e[o]?o+1:o,s)}};if(r.isConstructed){u.length=0;let t=o;for(;t<s;){const n=w(e,t,s);t=n.end,u[u.length++]=n}}return u}function v(e,t,n){n.push(e),function(e,t){if(e<128)return void t.push(e);const n=[];let r=0;for(;e>0;)n.unshift(255&e),e>>=8,r++;n.unshift(128|r),S(t,n)}(t,n)}function I(e,t){return A(e|d.ContextSpecificTagFlag,t)}function T(e,...t){return m(d.ContextSpecificTagFlag|d.ConstructedFlag|e,...t)}function U(...e){return m(d.Sequence|d.ConstructedFlag,...e)}function K(...e){return m(d.Set|d.ConstructedFlag,...e)}function M(){return A(d.Null)}function _(e){return{encode(t){S(t,e)}}}function P(e){return e.constructor===Number?(e=b(4294967295&e),{encode:t=>(v(d.BitString,e.length,t),S(t,e),t)}):{encode:t=>(v(d.BitString,e.length+1,t),t.push(0),S(t,e),t)}}function N(e){return A(d.Boolean,[e?1:0])}function O(e){return e instanceof Date&&(e=function(e,t,n){if(t&&!(t instanceof Date))return t;t=t||new Date;const r=!0===n?C:p;return e.replace(/(yyyy|yy|mmmm|mmm|mm|dddd|ddd|dd|hh|ss|tttt|m|d|h|s)/gi,(e=>r.call(t,e)))}("yyMMddHHmmssZ",e,!0)),A(d.UTCTime,e)}function j(e,t){let n=[];if(e instanceof Uint8Array){const t=[];e.forEach((e=>{t.push(e)})),e=t}if(e instanceof Array){for(n=e,!0===t&&n.reverse();0===n[0];)n.shift();(128&n[0])>0&&n.unshift(0)}else if("number"==typeof e){for(;e>255;)n.unshift(255&e),e>>=8;n.unshift(e),(128&e)>0&&n.unshift(0)}return A(d.Integer,n)}function D(e){return"string"==typeof e&&(e=f.encode(e)),A(d.ObjectIdentifier,e)}function x(e){return A(d.OctetString,e)}function R(e){return A(d.UTF8String,y(e).getBytesArray())}function k(e){return e.replace(/\r\n/g,"").replace(/\r/g,"").replace(/\n/g,"")}const B={"P-256":"1.2.840.10045.3.1.7","P-384":"1.3.132.0.34","P-521":"1.3.132.0.35"},F={"1.2.840.10045.3.1.7":"P-256","1.3.132.0.34":"P-384","1.3.132.0.35":"P-521"},L={CN:"2.5.4.3",O:"2.5.4.10",OU:"2.5.4.11",C:"2.5.4.6",ST:"2.5.4.8",L:"2.5.4.7",Street:"2.5.4.9",E:"1.2.840.113549.1.9.1"},H={"2.5.4.3":"CN","2.5.4.10":"O","2.5.4.11":"OU","2.5.4.6":"C","2.5.4.8":"ST","2.5.4.7":"L","2.5.4.9":"Street","1.2.840.113549.1.9.1":"E"},Y={CN:R,O:R,OU:R,C:function(e){return A(d.PrintableString,e)},ST:R,L:R,Street:R,E:function(e){return A(d.IA5String,e)}},V={ServerAuth:"1.3.6.1.5.5.7.3.1",ClientAuth:"1.3.6.1.5.5.7.3.2",CodeSigning:"1.3.6.1.5.5.7.3.3",EmailProtection:"1.3.6.1.5.5.7.3.4",IpsecEndSystem:"1.3.6.1.5.5.7.3.5",IpsecTunnel:"1.3.6.1.5.5.7.3.6",IpsecUser:"1.3.6.1.5.5.7.3.7",TimeStamping:"1.3.6.1.5.5.7.3.8",OCSPSigning:"1.3.6.1.5.5.7.3.9",Wireless:"1.3.6.1.5.5.7.3.19"},q={DigitalSignature:128,NonRepudiation:64,KeyEncipherment:32,DataEncipherment:16,KeyAgreement:8,KeyCertSign:4,CrlSign:2,EncipherOnly:1,DecipherOnly:32768},G=q.DigitalSignature|q.CrlSign|q.KeyCertSign,J=q.DigitalSignature|q.KeyEncipherment|q.DataEncipherment,Q="1.2.840.10045.4.3.2",X="1.2.840.113549.1.1.11";function W(e){const t="EC"===e.kty,n=[];return U(j(0),U(D(t?"1.2.840.10045.2.1":"1.2.840.113549.1.1.1"),t?D(B[e.crv]):M()),x(t?function(e){const t=[];return U(j(1),x(a.decode(e.d)),T(0,D(B[e.crv])),T(1,P([4,...a.decode(e.x),...a.decode(e.y)]))).encode(t),t}(e):function(e){const t=[];return U(j(0),j(a.decode(e.n)),j(a.decode(e.e)),j(a.decode(e.d)),j(a.decode(e.p)),j(a.decode(e.q)),j(a.decode(e.dp)),j(a.decode(e.dq)),j(a.decode(e.qi))).encode(t),t}(e))).encode(n),n}function z(e){e instanceof Array&&(e=w(e));const t=ee(te(e[1]));return crypto.subtle.importKey("pkcs8",new Uint8Array(e.all()),t,!0,["sign"])}function Z(e){const t="EC"===e.kty,n=[],r=$(e);return U(U(D(t?"1.2.840.10045.2.1":"1.2.840.113549.1.1.1"),t?D(B[e.crv]):M()),P(r)).encode(n),n}function $(e){return"EC"===e.kty?function(e){return[4,...a.decode(e.x),...a.decode(e.y)]}(e):function(e){const t=[];return U(j(a.decode(e.n)),j(a.decode(e.e))).encode(t),t}(e)}function ee(e){return"1.2.840.113549.1.1.1"===e.algorithm?{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"}:{name:"ECDSA",namedCurve:F[e.parameters]}}function te(e){const t=e[0].objectIdentifier();let n=null;return e[1].tag.type===d.ObjectIdentifier?n=e[1].objectIdentifier():e[1].tag.type!==d.Null&&(n=e[1].contents()),{algorithm:t,parameters:n}}function ne(e){e instanceof Array&&(e=w(e));const t=ee(te(e[0]));return crypto.subtle.importKey("spki",new Uint8Array(e.all()),t,!0,["verify"])}async function re(e){const t=await crypto.subtle.exportKey("jwk",e);return{private_key:W(t),public_key:Z(t),public_key_bits:$(t)}}function ie(e){return"RSA"===e?{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"}:{name:"ECDSA",hash:"SHA-256"}}function oe(e,t,n){const r=ie(n);return crypto.subtle.sign(r,e,new Uint8Array(t)).then((e=>{const t=new Uint8Array(e);if("ECDSA"!==r.name)return t;const n=[];return U(j(t.slice(0,t.length/2)),j(t.slice(t.length/2))).encode(n),n}))}function ce(e,t){return"-----BEGIN "+e+"-----\r\n"+u.encode(t,null,64)+"\r\n-----END "+e+"-----\r\n"}function se(e){let t=e.indexOf("-----BEGIN ");if(-1===t)throw new Error("invalid pem contents: begin_not_found");t+=11;let n=e.indexOf("-----",t);if(-1===n||n===t)throw new Error("invalid pem contents: type_not_found");const r=e.substring(t,n);n+=5;const i=e.indexOf("-----END "+r+"-----",n);if(-1===i)throw new Error("invalid pem contents: end_not_found");return{type:r,contents:u.decode(k(e.substring(n,i)))}}function ue(e,t){return"ECC"===e?(r=t||"P-384",crypto.subtle.generateKey({name:"ECDSA",namedCurve:r},!0,["sign","verify"])):(n=t||2048,crypto.subtle.generateKey({name:"RSASSA-PKCS1-v1_5",publicExponent:new Uint8Array([1,0,1]),modulusLength:n,hash:"SHA-256"},!0,["sign","verify"]));var n,r}function ae(e,t){if("ECC"!==e&&"RSA"!==e)throw new Error("only support: ECC/RSA");if("ECC"===e&&"P-256"!==t&&"P-384"!==t&&"P-521"!==t&&void 0!==t)throw new Error("only support: P-256/P-384/P-521, default: P-384");if("RSA"===e&&2048!==t&&4096!==t&&void 0!==t)throw new Error("only support: 2048/4096, default: 2048")}function le(e,t){return t[e]?K(U(D(L[e]),Y[e](t[e]))):null}function de(e){const t={CN:e};function n(e,n){return void 0===n?t[e]:(t[e]=n,r)}const r={setKey:(e,t)=>n(e,t),org:e=>n("O",e),org_unit:e=>n("OU",e),country:e=>n("C",e),state:e=>n("ST",e),location:e=>n("L",e),street:e=>n("Street",e),email:e=>n("E",e),all:()=>t,encode:()=>U(le("CN",t),le("O",t),le("OU",t),le("C",t),le("ST",t),le("L",t),le("Street",t),le("E",t)),decode(e){for(let t=0;t<e.length;t++){const r=f.decode(e[t][0][0].contents()),i=e[t][0][1].string();n(H[r]||r,i)}}};return r}function fe(e){if(e&&!(e instanceof Array))throw new Error("invalid san values");const t=e||[];function n(){const e=[];return U((function(e){t.forEach((t=>{e.push(I(2,y(t).getBytesArray()))}))})).encode(e),e}function r(e){const n=w(e);for(let e=0;e<n.length;e++)t.push(n[e].string())}const i={add:function(e){return e instanceof Array||(e=[e]),e.forEach((e=>{e&&-1===t.indexOf(e)&&t.push(e)})),i},clear:function(){return t.length=0,i},isEmpty:()=>0===t.length,all:()=>t,encode:n,encodeCsrExtension:function(){return 0===t.length?null:T(0,U(D("1.2.840.113549.1.9.14"),K(U(U(D("2.5.29.17"),x(n()))))))},decodeCsrExtension:function(e){const t=function(e){for(let t=0;t<e.length;t++){const n=e[t];if(n.length<2)throw new Error("invalid csr attribute");if("1.2.840.113549.1.9.14"===f.decode(n[0].contents()))return n}return null}(e);if(null==t)return;const n=function(e){for(let t=1;t<e.length;t++){const n=e[t];if("2.5.29.17"===f.decode(n[0][0][0].contents()))return n[0][0]}return null}(t);null!=n&&r(n[1].contents())},decodeCerExtension:function(e){for(let t=0;t<e.length;t++){const n=e[t];"2.5.29.17"===n[0].objectIdentifier()&&r(n[1].bytes())}}};return i}function ye(e){return crypto.subtle.digest("SHA-1",e instanceof Uint8Array?e:new Uint8Array(e))}async function ge(e){const t=w(e),n=t[0],r=t[2].bytes(),i=t[1][0].objectIdentifier(),o=n[2],c=await ne(o),s=await function(e,t,n,r){const i=ie(r);if("ECDSA"===i.name){const e=w(n);n=[...e[0].bigInteger(),...e[1].bigInteger()]}return crypto.subtle.verify(i,e,new Uint8Array(n),new Uint8Array(t))}(c,n.all(),r,"1.2.840.113549.1.1.11"===i?"RSA":"ECC");if(!s)throw new Error("csr verify failed");const u=de("");u.decode(n[1]);const a=fe();n[3]&&a.decodeCsrExtension(t[0][3]);const l=t[0][2][1].bytes();return{subject:u,subjectAltNames:a,publicKey:o.all(),publicKeyContents:l}}const he={SubjectDirectoryAttributes:"2.5.29.9",SubjectKeyIdentifier:"2.5.29.14",KeyUsage:"2.5.29.15",PrivateKeyUsagePeriod:"2.5.29.16",SubjectAlternativeName:"2.5.29.17",IssuerAlternativeName:"2.5.29.18",BasicConstraints:"2.5.29.19",CrlNumber:"2.5.29.20",ReasonCode:"2.5.29.21",InstructionCode:"2.5.29.23",InvalidityDate:"2.5.29.24",DeltaCrlIndicator:"2.5.29.27",IssuingDistributionPoint:"2.5.29.28",CertificateIssuer:"2.5.29.29",NameConstraints:"2.5.29.30",CrlDistributionPoints:"2.5.29.31",CertificatePolicies:"2.5.29.32",PolicyMappings:"2.5.29.33",AuthorityKeyIdentifier:"2.5.29.35",PolicyConstraints:"2.5.29.36",ExtendedKeyUsage:"2.5.29.37",FreshestCrl:"2.5.29.46",InhibitAnyPolicy:"2.5.29.54",AuthorityInfoAccess:"1.3.6.1.5.5.7.1.1",SubjectInfoAccess:"1.3.6.1.5.5.7.1.11",LogoType:"1.3.6.1.5.5.7.1.12",BiometricInfo:"1.3.6.1.5.5.7.1.2",QCStatements:"1.3.6.1.5.5.7.1.3",AuditIdentity:"1.3.6.1.5.5.7.1.4",NoRevAvail:"2.5.29.56",TargetInformation:"2.5.29.55",ExpiredCertsOnCrl:"2.5.29.60",SignedCertificateTimestampList:"1.3.6.1.4.1.11129.2.4.2"};async function pe(e,t,n){const r=e.subject,i=e.serialNumber()||function(){const e=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);return crypto.getRandomValues(e),e[0]=2,e}(),o=e.days(),c=e.isCa(),s=e.keyUsage(),u=e.extendedKeyUsage()||[V.ClientAuth,V.ServerAuth],a=e.subjectAltNames,l="ECDSA"===n.algorithm.name?"ECC":"RSA",d=+new Date,f=new Date(d),y=new Date(d+86400*o*1e3),g=function(){const e=[];return{add:function(t,n,r){t&&("object"==typeof t&&t.identifier?e.push(t):e.push({identifier:t,value:n,critical:!0===r}))},build:function(){return U((t=>{e.forEach((e=>{t.push(U(D(e.identifier),e.critical?N(!0):_([]),x(e.value)))}))}))}}}();var h,p,C;null==a||a.isEmpty()||g.add((h=(h=a).encode?h.encode():h,{identifier:he.SubjectAlternativeName,value:h,critical:!1})),g.add((p=new Uint8Array(e.subjectKeyIdentifier()),{identifier:he.SubjectKeyIdentifier,value:x(p).encode(),critical:!1})),g.add(function(e){return{identifier:he.AuthorityKeyIdentifier,value:U(I(0,e)).encode(),critical:!1}}(new Uint8Array(e.authorityKeyIdentifier()))),g.add(function(e){return{identifier:he.KeyUsage,value:P(e).encode([]),critical:!0}}(s||(c?G:J))),g.add(function(e,t){return{identifier:he.BasicConstraints,value:U(e?N(!0):null,void 0!==t&&t>0?j(t):null).encode(),critical:!0}}(c)),u.length>0&&g.add((C=u,{identifier:he.ExtendedKeyUsage,value:U((e=>{C.forEach((t=>e.push(D(t))))})).encode(),critical:!0}));const E=function(e,t,n,r,i,o,c,s){const u=[];return U(T(0,j(2)),j(c),U(D("ECC"===e?Q:X)),s.encode(),U(O(r),O(i)),t.encode(),_(n),T(3,o.build())).encode(u),u}(l,r,e.publicKey(),f,y,g,i,t),b=function(e,t,n){const r=[];return U(_(t),U(D("ECC"===e?Q:X),"ECC"===e?_([]):M()),P(n)).encode(r),r}(l,E,await oe(n,E,l));return{cer:ce("CERTIFICATE",b)}}function Ce(e){const t=w(e),n=t[0],r=t[2].bytes(),i=t[1][0].objectIdentifier(),o=n[6],c=de("");c.decode(n[3]);const s=de("");s.decode(n[5]);const u=fe();return n[7]&&u.decodeCerExtension(n[7][0]),{subject:s,issuer:c,notBefore:n[4][0].string(),notAfter:n[4][1].string(),subjectAltNames:u,publicKey:o.all(),publicKeyContents:o[1].bytes(),signatureAlgorithm:i,signature:r}}const Ee={keypair:async function(e,t){ae(e,t);const n=await ue(e,t),r=await re(n.privateKey);return{private_key:ce("PRIVATE KEY",r.private_key),public_key:ce("PUBLIC KEY",r.public_key)}},csr:async function(e,t,n,r){ae(e,t);const i=await ue(e,t),o=await re(i.privateKey),c=function(e,t,n){const r=[];return U(j(0),e.encode(),_(n),t?t.encodeCsrExtension():null).encode(r),r}(n,r,o.public_key),s=function(e,t,n){const r=[];return U(_(t),U(D("ECC"===e?Q:X),"ECC"===e?_([]):M()),P(n)).encode(r),r}(e,c,await oe(i.privateKey,c,e));return{private_key:ce("PRIVATE KEY",o.private_key),public_key:ce("PUBLIC KEY",o.public_key),csr:ce("CERTIFICATE REQUEST",s)}},selfSignedCertificate:async function(e,t,n){ae(e,t);const r=await ue(e,t),{private_key:i,public_key:o,public_key_bits:c}=await re(r.privateKey),s=ye(c);n.publicKey(o),n.subjectKeyIdentifier(s),n.authorityKeyIdentifier(s);const{cer:u}=await pe(n,n.subject,r.privateKey);return{private_key:ce("PRIVATE KEY",i),public_key:ce("PUBLIC KEY",o),cer:u}},issue:async function(e,t,n,r){n=Ce(se(n).contents),r=await z(se(r).contents);const i=se(e);if("CERTIFICATE REQUEST"===i.type){e=await ge(i.contents),t.reset(e.subject,e.subjectAltNames),t.publicKey(e.publicKey);const n=await ye(e.publicKeyContents);t.subjectKeyIdentifier(n)}else{if("PUBLIC KEY"!==i.type)throw new Error("invalid csr or publicKey");{if(!t.subject)throw new Error("subject required fro x509CertificateInfo");t.publicKey(i.contents);const e=w(i.contents),n=await ye(e[1].bytes());t.subjectKeyIdentifier(n)}}const o=await ye(n.publicKeyContents);return t.authorityKeyIdentifier(o),await pe(t,n.subject,r)},parse:function(e){const t=se(e);return"CERTIFICATE REQUEST"===t.type?ge(t.contents):"CERTIFICATE"===t.type?Ce(t.contents):"PRIVATE KEY"===t.type?z(t.contents):"PUBLIC KEY"===t.type?ne(t.contents):null},SubjectAltNames:fe,X509Name:de,X509CertificateInfo:function(e,t){let n=e,r=t||fe();const i={days:365};function o(e,t){return void 0===t?i[e]:(i[e]=t,c)}const c={isCa:e=>o("isCa",e),serialNumber:e=>o("serialNumber",e),keyUsage:e=>o("keyUsage",e),extendedKeyUsage:e=>o("extendedKeyUsage",e),days:e=>o("days",e),subjectKeyIdentifier:e=>o("subjectKeyIdentifier",e),authorityKeyIdentifier:e=>o("authorityKeyIdentifier",e),publicKey:e=>o("publicKey",e),subject:n,subjectAltNames:r,reset(e,t){c.subject=n=e,c.subjectAltNames=r=t||fe()}};return c},KeyUsage:q,ExtendKeyUsages:V};X509=t.default})();