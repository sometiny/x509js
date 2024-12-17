(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{default:()=>De});const n=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],r=[],i=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","-","_","="],o=[];for(let e=0;e<n.length;e++)r[n[e].charCodeAt(0)]=e,o[i[e].charCodeAt(0)]=e;const c=function(e,t,r){t=t||n;let i,o,c,s,u,a="",f="",l="",d=0;const y=e.length,g=y-y%3;let h=0;for(;d<g;)i=e[d++],o=e[d++],f=e[d++],c=i>>2,s=(3&i)<<4|o>>4,u=(15&o)<<2|f>>6,l=63&f,a+=t[c]+t[s]+t[u]+t[l],h+=4,r>0&&h%r==0&&(a+="\r\n");return y-g==2?(i=e[d++],o=e[d++],a+=t[i>>2]+t[(3&i)<<4|o>>4]+t[(15&o)<<2]+"="):y-g==1&&(i=e[d++],a+=t[i>>2]+t[(3&i)<<4]+"=="),"\n"===a.charAt(a.length-1)&&(a=a.substr(0,a.length-2)),a},s=function(e,t){if(t=t||r,""===(e=e.replace(/\s/g,"")))return[];const n=[];let i,o,c,s,u,a="",f="",l=0;const d=e.length;let y=d;for("="===e.slice(-1)&&(y=d-4);l<y;)c=t[e.charCodeAt(l++)],s=t[e.charCodeAt(l++)],u=t[e.charCodeAt(l++)],f=t[e.charCodeAt(l++)],i=c<<2|s>>4,o=(15&s)<<4|u>>2,a=(3&u)<<6|f,n.push(i,o,a);return d!==y&&(c=t[e.charCodeAt(l++)],s=t[e.charCodeAt(l++)],"=="===e.slice(-2)?n.push(c<<2|s>>4):"="===e.slice(-1)&&(u=t[e.charCodeAt(l++)],n.push(c<<2|s>>4,(15&s)<<4|u>>2))),n},u={encode:c,decode:s},a={encode:function(e,t){return c(e,i,t).replace(/=+$/,"")},decode:function(e){for(;e.length%4!=0;)e+="=";return s(e,o)}};function f(e){if(!e||0===e.length)return!1;let t=0;const n=e+".";let r,i=0;for(;i<n.length&&(r=n.indexOf(".",i))>i;){if(4===t)return!1;const e=n.substr(i,r-i);if(!/^[0-9]{1,3}$/.test(e))return!1;const o=parseInt(e);if(o<0||o>255)return!1;i=r+1,t++}return 4===t}function l(e){const t=e.indexOf("/"),n=e.substr(t+1);return t>0&&f(e.substr(0,t))&&(f(n)||function(e){const t=parseInt(e);return t>=0&&t<=32}(n))}function d(e){if(!e||0===e.length)return!1;let t=0;const n=e+":";let r,i=!1,o=0;for(;o<n.length&&(r=n.indexOf(":",o))>=o;){if(8===t)return!1;if(o!==r){const e=n.substr(o,r-o);if(r===n.length-1&&e.indexOf(".")>0){if(!f(e))return!1;t++}else{const e=n.substr(o,r-o);if(!/^[0-9a-f]{1,4}$/i.test(e))return!1;const t=parseInt(e,16);if(t<0||t>65535)return!1}}else{if(1!==r&&r!==n.length-1&&i)return!1;i=!0}o=r+1,t++}return 8===t||i}function y(e){const t=e.indexOf("/"),n=e.substr(t+1);return t>0&&d(e.substr(0,t))&&(d(n)||function(e){const t=parseInt(e);return t>=0&&t<=128}(n))}function g(e,t,n){e.split(".").map((e=>parseInt(e))).forEach((e=>{t[n++]=e}))}function h(e,t,n){for(let r=0;r!==e.length;r++)t[2*r+n]=e[r]>>8&255,t[2*r+1+n]=255&e[r]}function p(e){0===e.indexOf("::")?e=e.substr(1):e.lastIndexOf("::")===e.length-2&&(e=e.substr(0,e.length-1));const t=e.split(":");let n=0;const r=[0,0,0,0,0,0,0,0];let i=-1;for(;t.length>0;){const e=t.shift();if(0===e.length)i=n,r[n++]=0;else if(e.indexOf(".")<0)r[n++]=parseInt(e,16);else{const t=e.split(".");r[n++]=parseInt(t[0])<<8|parseInt(t[1]),r[n++]=parseInt(t[2])<<8|parseInt(t[3])}}if(n!==r.length){for(let e=i;e<n;e++)r[r.length-n+e]=r[e];for(let e=i;e!==r.length-(n-i);e++)r[e]=0}return r}function C(e){if(y(e)||d(e)){const t=e.indexOf("/");if(t<0){const t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];return h(p(e),t,0),t}const n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];let r=p(e.substring(0,t));h(r,n,0);const i=e.substring(t+1);return r=i.indexOf(":")>0?p(i):function(e){const t=[0,0,0,0,0,0,0,0],n=parseInt(e);for(let e=0;e!==n;e++)t[Math.floor(e/16)]|=1<<e%16;return t}(i),h(r,n,16),n}if(l(e)||f(e)){const t=e.indexOf("/");if(t<0){const t=[0,0,0,0];return g(e,t,0),t}const n=[0,0,0,0,0,0,0,0];g(e.substring(0,t),n,0);const r=e.substring(t+1);return r.indexOf(".")>0?g(r,n,4):function(e,t,n){const r=parseInt(e);for(let e=0;e!==r;e++)t[Math.floor(e/8)+n]|=1<<e%8&255}(r,n,4),n}return null}const E={Boolean:1,Integer:2,BitString:3,OctetString:4,Null:5,ObjectIdentifier:6,Enumerated:10,Sequence:16,Set:17,UTF8String:12,NumericString:18,PrintableString:19,T61String:20,IA5String:22,UTCTime:23,GeneralizedTime:24,VisibleString:26,GeneralString:27,BMPString:30,TagNumberMask:31,ConstructedFlag:32,ConstructedSequence:48,ConstructedSet:49,ContextSpecificTagFlag:128,ContextSpecificConstructedTag0:160,ContextSpecificConstructedTag1:161,ContextSpecificConstructedTag2:162,ContextSpecificConstructedTag3:163,TagClassMask:192,VALUE_NAME_MAP:{16:"SEQUENCE",17:"SET",48:"SEQUENCE",49:"SET",6:"OBJECT IDENTIFIER",2:"INTEGER",1:"BOOLEAN",3:"BIT STRING",4:"OCTET STRING",5:"NULL"}};for(const e in E)E.hasOwnProperty(e)&&"VALUE_NAME_MAP"!==e&&!E.VALUE_NAME_MAP.hasOwnProperty(E[e])&&(E.VALUE_NAME_MAP[E[e]]=e);const b=E;const A={decode:function(e,t,n){t=void 0===t?0:t,n=void 0===n?e.length:n;let r="";const i=e[t];r+=Math.floor(i/40)+"."+i%40;let o,c,s=!0,u=0;for(let i=1;i<n;i++)o=e[t+i],c=127&o,s&&(r+=".",s=!1),u<<=7,u+=c,o===c&&(r+=u,u=0,s=!0);return r},encode:function(e){const t=e.split(".").map((e=>parseInt(e))),n=[];n.push(40*t[0]+t[1]);for(let e=2;e<t.length;e++){let r=t[e];if(r<=127){n.push(r);continue}const i=[];let o=!1;for(;r>0;){let e=127&r;o&&(e|=128),i.unshift(e),r>>=7,o||(o=!0)}Array.prototype.push.apply(n,i)}return n}};function S(e,t,n){let r=null;if("string"==typeof e){if(void 0!==t)throw new Error("expect 'undefined' for argument offset");r=e,t=0,n=(e=function(e){const t=[];for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<=127?t.push(r):r<=2047?t.push(r>>6|192,63&r|128):r<=65535?t.push(r>>12|224,r>>6&63|128,63&r|128):t.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}return t}(r)).length}if(t+n>e.length)throw new Error("offset out of range");void 0===t&&(t=0),void 0===n&&(n=e.length);const i=t,o=n;let c=t;const s=t+n;function u(){const t=e[c];return t<128?1:t<224?2:t<240?3:4}function a(){const t=e[c++];if(t<128)return t;const n=e[c++];if(t<224)return(31&t)<<6|63&n;const r=e[c++];if(t<240)return(15&t)<<12|(63&n)<<6|63&r;return(7&t)<<18|(63&n)<<12|(63&r)<<6|63&e[c++]}return{toString:function(){if(null!==r)return r;const e=[];for(;c<s;){const t=u();if(c+t>s)throw new Error("unformed utf8 bytes array");e.push(a())}return r=String.fromCharCode.apply(null,e)},getBytesArray:()=>e.slice(i,i+o)}}const m={getString:e=>S(e).toString(),getBytes:e=>S(e).getBytesArray()},w=[["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]],I=[["January","February","March","April","May","June","July","August","September","October","November","December",""],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""]],v=function(e){const t=this;switch(e){case"dddd":return w[0][t.getDay()];case"ddd":return w[1][t.getDay()];case"MMMM":return I[0][t.getMonth()];case"MMM":return I[1][t.getMonth()];case"yyyy":return t.getFullYear();case"yy":return t.getFullYear()%2;case"M":return t.getMonth()+1;case"MM":return("0"+(t.getMonth()+1)).slice(-2);case"d":return t.getDate();case"dd":return("0"+t.getDate()).slice(-2);case"HH":return("0"+t.getHours()).slice(-2);case"h":return t.getHours();case"m":return t.getMinutes();case"mm":return("0"+t.getMinutes()).slice(-2);case"s":return t.getSeconds();case"ss":return("0"+t.getSeconds()).slice(-2);case"tttt":return t.getMilliseconds();default:return e}},T=function(e){const t=this;switch(e){case"dddd":return w[0][t.getUTCDay()];case"ddd":return w[1][t.getUTCDay()];case"MMMM":return I[0][t.getUTCMonth()];case"MMM":return I[1][t.getUTCMonth()];case"yyyy":return t.getUTCFullYear();case"yy":return t.getUTCFullYear()%100;case"M":return t.getUTCMonth()+1;case"MM":return("0"+(t.getUTCMonth()+1)).slice(-2);case"d":return t.getUTCDate();case"dd":return("0"+t.getUTCDate()).slice(-2);case"HH":return("0"+t.getUTCHours()).slice(-2);case"h":return t.getUTCHours();case"m":return t.getUTCMinutes();case"mm":return("0"+t.getUTCMinutes()).slice(-2);case"s":return t.getUTCSeconds();case"ss":return("0"+t.getUTCSeconds()).slice(-2);case"tttt":return t.getUTCMilliseconds();default:return e}};const U=[0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];function K(e){const t=function(e){let t=e>>24;return 0!==t?24+U[t]:(t=e>>16,0!==t?16+U[t]:(t=e>>8,0!==t?8+U[t]:U[e]))}(e),n=Math.floor((t+7)/8);if(n<=0||n>4)throw new Error("invalid bit string value");const r=[];for(let e=0;e<=n;e++)r.push(0);for(let t=1;t<n;t++)r[t]=255&e,e>>=8;if(!(255&e))throw new Error("invalid bit string value");r[n]=255&e;let i=0;for(;!(e&1<<i);)++i;if(i>=8)throw new Error("invalid bit string value");return r[0]=255&i,r}const O=function(e,t){if(t instanceof Uint8Array){const e=[];t.forEach((t=>{e.push(t)})),t=e}Array.prototype.push.apply(e,t)};function M(e,t){return t=t||[],{encode:n=>(void 0===n&&(n=[]),"function"==typeof t&&(t=t()),"string"==typeof t&&(t=t.split("").map((e=>e.charCodeAt(0)))),_(e,t.length,n),O(n,t),n)}}function P(e,...t){if(1===t.length&&"function"==typeof t[0]){const e=[];t[0](e),t=e}return{child(e){return e instanceof Array?O(t,e):t.push(e),this},encode(n){void 0===n&&(n=[]);const r=[];return t.forEach((e=>e&&e.encode(r))),function(e,t,n){_(e,t.length,n),O(n,t)}(e,r,n),n}}}function N(e,t,n){if(e&&"object"==typeof e&&e.hasOwnProperty("tag"))return e;t=t||0,n=n||e.length-t;const r=function(e){const t=e>>6&3;return{tag:e,classification:t,isPrimitive:!(e>>5&1),isConstructed:1==(e>>5&1),type:31&e,isUniversal:0===t,isApplication:1===t,isContextSpecific:2===t,isPrivate:3===t}}(e[t]),i=function(e,t,n){if(t>=n)throw new Error("Argument_Out_Of_Range");const r=e[t];if(r<128){if(r>n-t-1)throw new Error("Content_Length_Out_Of_Range");return{length:r,consumed:1}}const i=127&r;if(i>4||0===i)throw new Error("Content_Length_Mask_Error");const o=1+i;if(o>n-t)throw new Error("Content_Length_Out_Of_Range");const c=t+o;let s=0;for(let n=t+1;n<c;n++)s<<=8,s|=e[n];if(s<0||s>n-t-o)throw new Error("Content_Length_Out_Of_Range");return{length:s,consumed:o}}(e,t+1,n),o=t+1+i.consumed,c=i.length,s=o+c,u={tag:r,tagOffset:t,offset:o,end:s,all:()=>0===t&&s===e.length?e:e.slice(t,s),contents:()=>e.slice(o,s),string:()=>r.type===b.UTF8String?S(e,o,s-o).toString():String.fromCharCode(...e.slice(o,s)),objectIdentifier(){if(r.type!==b.ObjectIdentifier)throw new Error("invalid tag type, expect 'ObjectIdentifier'");return A.decode(e,o,s-o)},bytes(){if(s-o==0)return[];if(r.type===b.BitString){if(0!==e[o])throw new Error("invalid 'BitString'");return e.slice(o+1,s)}return e.slice(o,s)},bigInteger(){if(r.type!==b.Integer)throw new Error("invalid tag type, expect 'Integer'");return e.slice(0===e[o]?o+1:o,s)}};if(r.isConstructed){u.length=0;let t=o;for(;t<s;){const n=N(e,t,s);t=n.end,u[u.length++]=n}}return u}function _(e,t,n){n.push(e),function(e,t){if(e<128)return void t.push(e);const n=[];let r=0;for(;e>0;)n.unshift(255&e),e>>=8,r++;n.unshift(128|r),O(t,n)}(t,n)}function j(e,t){return M(e|b.ContextSpecificTagFlag,t)}function x(e,...t){return P(b.ContextSpecificTagFlag|b.ConstructedFlag|e,...t)}function D(...e){return P(b.Sequence|b.ConstructedFlag,...e)}function R(...e){return P(b.Set|b.ConstructedFlag,...e)}function B(){return M(b.Null)}function k(e){return{encode(t){O(t,e)}}}function F(e){return e.constructor===Number?(e=K(4294967295&e),{encode:t=>(_(b.BitString,e.length,t),O(t,e),t)}):{encode:t=>(_(b.BitString,e.length+1,t),t.push(0),O(t,e),t)}}function L(e){return M(b.Boolean,[e?1:0])}function H(e){return e instanceof Date&&(e=function(e,t,n){if(t&&!(t instanceof Date))return t;t=t||new Date;const r=!0===n?T:v;return e.replace(/(yyyy|yy|mmmm|mmm|mm|dddd|ddd|dd|hh|ss|tttt|m|d|h|s)/gi,(e=>r.call(t,e)))}("yyMMddHHmmssZ",e,!0)),M(b.UTCTime,e)}function Y(e,t){let n=[];if(e instanceof Uint8Array){const t=[];e.forEach((e=>{t.push(e)})),e=t}if(e instanceof Array){for(n=e,!0===t&&n.reverse();0===n[0];)n.shift();(128&n[0])>0&&n.unshift(0)}else if("number"==typeof e){for(;e>255;)n.unshift(255&e),e>>=8;n.unshift(e),(128&e)>0&&n.unshift(0)}return M(b.Integer,n)}function V(e){return"string"==typeof e&&(e=A.encode(e)),M(b.ObjectIdentifier,e)}function q(e){return M(b.OctetString,e)}function G(e){return M(b.UTF8String,S(e).getBytesArray())}function J(e){return e.replace(/\r\n/g,"").replace(/\r/g,"").replace(/\n/g,"")}const Q={"P-256":"1.2.840.10045.3.1.7","P-384":"1.3.132.0.34","P-521":"1.3.132.0.35"},W={"1.2.840.10045.3.1.7":"P-256","1.3.132.0.34":"P-384","1.3.132.0.35":"P-521"},X={CN:"2.5.4.3",O:"2.5.4.10",OU:"2.5.4.11",C:"2.5.4.6",ST:"2.5.4.8",L:"2.5.4.7",Street:"2.5.4.9",E:"1.2.840.113549.1.9.1"},z={"2.5.4.3":"CN","2.5.4.10":"O","2.5.4.11":"OU","2.5.4.6":"C","2.5.4.8":"ST","2.5.4.7":"L","2.5.4.9":"Street","1.2.840.113549.1.9.1":"E"},Z={CN:G,O:G,OU:G,C:function(e){return M(b.PrintableString,e)},ST:G,L:G,Street:G,E:function(e){return M(b.IA5String,e)}},$={ServerAuth:"1.3.6.1.5.5.7.3.1",ClientAuth:"1.3.6.1.5.5.7.3.2",CodeSigning:"1.3.6.1.5.5.7.3.3",EmailProtection:"1.3.6.1.5.5.7.3.4",IpsecEndSystem:"1.3.6.1.5.5.7.3.5",IpsecTunnel:"1.3.6.1.5.5.7.3.6",IpsecUser:"1.3.6.1.5.5.7.3.7",TimeStamping:"1.3.6.1.5.5.7.3.8",OCSPSigning:"1.3.6.1.5.5.7.3.9",Wireless:"1.3.6.1.5.5.7.3.19"},ee={DigitalSignature:128,NonRepudiation:64,KeyEncipherment:32,DataEncipherment:16,KeyAgreement:8,KeyCertSign:4,CrlSign:2,EncipherOnly:1,DecipherOnly:32768},te=ee.DigitalSignature|ee.CrlSign|ee.KeyCertSign,ne=ee.DigitalSignature|ee.KeyEncipherment|ee.DataEncipherment,re="1.2.840.10045.4.3.2",ie="1.2.840.113549.1.1.11";function oe(e){const t="EC"===e.kty,n=[];return D(Y(0),D(V(t?"1.2.840.10045.2.1":"1.2.840.113549.1.1.1"),t?V(Q[e.crv]):B()),q(t?function(e){const t=[];return D(Y(1),q(a.decode(e.d)),x(0,V(Q[e.crv])),x(1,F([4,...a.decode(e.x),...a.decode(e.y)]))).encode(t),t}(e):function(e){const t=[];return D(Y(0),Y(a.decode(e.n)),Y(a.decode(e.e)),Y(a.decode(e.d)),Y(a.decode(e.p)),Y(a.decode(e.q)),Y(a.decode(e.dp)),Y(a.decode(e.dq)),Y(a.decode(e.qi))).encode(t),t}(e))).encode(n),n}function ce(e){e instanceof Array&&(e=N(e));const t=ae(fe(e[1]));return crypto.subtle.importKey("pkcs8",new Uint8Array(e.all()),t,!0,["sign"])}function se(e){const t="EC"===e.kty,n=[],r=ue(e);return D(D(V(t?"1.2.840.10045.2.1":"1.2.840.113549.1.1.1"),t?V(Q[e.crv]):B()),F(r)).encode(n),n}function ue(e){return"EC"===e.kty?function(e){return[4,...a.decode(e.x),...a.decode(e.y)]}(e):function(e){const t=[];return D(Y(a.decode(e.n)),Y(a.decode(e.e))).encode(t),t}(e)}function ae(e){return"1.2.840.113549.1.1.1"===e.algorithm?{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"}:{name:"ECDSA",namedCurve:W[e.parameters]}}function fe(e){const t=e[0].objectIdentifier();let n=null;return e[1].tag.type===b.ObjectIdentifier?n=e[1].objectIdentifier():e[1].tag.type!==b.Null&&(n=e[1].contents()),{algorithm:t,parameters:n}}function le(e){e instanceof Array&&(e=N(e));const t=ae(fe(e[0]));return crypto.subtle.importKey("spki",new Uint8Array(e.all()),t,!0,["verify"])}async function de(e){const t=await crypto.subtle.exportKey("jwk",e);return{private_key:oe(t),public_key:se(t),public_key_bits:ue(t)}}function ye(e){return"RSA"===e?{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"}:{name:"ECDSA",hash:"SHA-256"}}function ge(e,t,n,r){const i=ye(n);return crypto.subtle.sign(i,e,new Uint8Array(t)).then((e=>{const t=new Uint8Array(e);if("ECDSA"!==i.name||!0===r)return t;const n=[];return D(Y(t.slice(0,t.length/2)),Y(t.slice(t.length/2))).encode(n),n}))}function he(e,t,n,r,i){const o=ye(r);if("ECDSA"===o.name&&!0!==i){const e=N(n);n=[...e[0].bigInteger(),...e[1].bigInteger()]}return crypto.subtle.verify(o,e,new Uint8Array(n),new Uint8Array(t))}function pe(e,t){return"-----BEGIN "+e+"-----\r\n"+u.encode(t,null,64)+"\r\n-----END "+e+"-----\r\n"}function Ce(e){let t=e.indexOf("-----BEGIN ");if(-1===t)throw new Error("invalid pem contents: begin_not_found");t+=11;let n=e.indexOf("-----",t);if(-1===n||n===t)throw new Error("invalid pem contents: type_not_found");const r=e.substring(t,n);n+=5;const i=e.indexOf("-----END "+r+"-----",n);if(-1===i)throw new Error("invalid pem contents: end_not_found");return{type:r,contents:u.decode(J(e.substring(n,i)))}}function Ee(e,t){return"ECC"===e?(r=t||"P-384",crypto.subtle.generateKey({name:"ECDSA",namedCurve:r},!0,["sign","verify"])):(n=t||2048,crypto.subtle.generateKey({name:"RSASSA-PKCS1-v1_5",publicExponent:new Uint8Array([1,0,1]),modulusLength:n,hash:"SHA-256"},!0,["sign","verify"]));var n,r}function be(e,t){if("ECC"!==e&&"RSA"!==e)throw new Error("only support: ECC/RSA");if("ECC"===e&&"P-256"!==t&&"P-384"!==t&&"P-521"!==t&&void 0!==t)throw new Error("only support: P-256/P-384/P-521, default: P-384");if("RSA"===e&&2048!==t&&4096!==t&&void 0!==t)throw new Error("only support: 2048/4096, default: 2048")}function Ae(e,t){return t[e]?R(D(V(X[e]),Z[e](t[e]))):null}function Se(e){const t={CN:e};function n(e,n){return void 0===n?t[e]:(t[e]=n,r)}const r={setKey:(e,t)=>n(e,t),org:e=>n("O",e),org_unit:e=>n("OU",e),country:e=>n("C",e),state:e=>n("ST",e),location:e=>n("L",e),street:e=>n("Street",e),email:e=>n("E",e),all:()=>t,encode:()=>D(Ae("CN",t),Ae("O",t),Ae("OU",t),Ae("C",t),Ae("ST",t),Ae("L",t),Ae("Street",t),Ae("E",t)),decode(e){for(let t=0;t<e.length;t++){const r=A.decode(e[t][0][0].contents()),i=e[t][0][1].string();n(z[r]||r,i)}}};return r}const me={OtherName:0,Rfc822Name:1,DnsName:2,X400Address:3,DirectoryName:4,EdiPartyName:5,UniformResourceIdentifier:6,IPAddress:7,RegisteredID:8};function we(e,t){return e.indexOf("@")>0?me.Rfc822Name:y(n=e)||d(n)||l(n)||f(n)?me.IPAddress:me.DnsName;var n}function Ie(e){if(e&&!(e instanceof Array))throw new Error("invalid san values");const t=e||[];function n(){const e=[];return D((function(e){t.forEach((t=>{const n=we(t);let r=S(t).getBytesArray();n===me.IPAddress&&(r=C(t)),e.push(j(n,r))}))})).encode(e),e}function r(e){const n=N(e);for(let e=0;e<n.length;e++)t.push(n[e].string())}const i={add:function(e){return e instanceof Array||(e=[e]),e.forEach((e=>{e&&-1===t.indexOf(e)&&t.push(e)})),i},clear:function(){return t.length=0,i},isEmpty:()=>0===t.length,all:()=>t,encode:n,encodeCsrExtension:function(){return 0===t.length?null:x(0,D(V("1.2.840.113549.1.9.14"),R(D(D(V("2.5.29.17"),q(n()))))))},decodeCsrExtension:function(e){const t=function(e){for(let t=0;t<e.length;t++){const n=e[t];if(n.length<2)throw new Error("invalid csr attribute");if("1.2.840.113549.1.9.14"===A.decode(n[0].contents()))return n}return null}(e);if(null==t)return;const n=function(e){for(let t=1;t<e.length;t++){const n=e[t];if("2.5.29.17"===A.decode(n[0][0][0].contents()))return n[0][0]}return null}(t);null!=n&&r(n[1].contents())},decodeCerExtension:function(e){for(let t=0;t<e.length;t++){const n=e[t];"2.5.29.17"===n[0].objectIdentifier()&&r(n[1].bytes())}}};return i}function ve(e){return crypto.subtle.digest("SHA-1",e instanceof Uint8Array?e:new Uint8Array(e))}async function Te(e){const t=N(e),n=t[0],r=t[2].bytes(),i=t[1][0].objectIdentifier(),o=n[2],c=await le(o);if(!await he(c,n.all(),r,"1.2.840.113549.1.1.11"===i?"RSA":"ECC"))throw new Error("csr verify failed");const s=Se("");s.decode(n[1]);const u=Ie();n[3]&&u.decodeCsrExtension(t[0][3]);const a=t[0][2][1].bytes();return{subject:s,subjectAltNames:u,publicKey:o.all(),publicKeyContents:a}}const Ue={SubjectDirectoryAttributes:"2.5.29.9",SubjectKeyIdentifier:"2.5.29.14",KeyUsage:"2.5.29.15",PrivateKeyUsagePeriod:"2.5.29.16",SubjectAlternativeName:"2.5.29.17",IssuerAlternativeName:"2.5.29.18",BasicConstraints:"2.5.29.19",CrlNumber:"2.5.29.20",ReasonCode:"2.5.29.21",InstructionCode:"2.5.29.23",InvalidityDate:"2.5.29.24",DeltaCrlIndicator:"2.5.29.27",IssuingDistributionPoint:"2.5.29.28",CertificateIssuer:"2.5.29.29",NameConstraints:"2.5.29.30",CrlDistributionPoints:"2.5.29.31",CertificatePolicies:"2.5.29.32",PolicyMappings:"2.5.29.33",AuthorityKeyIdentifier:"2.5.29.35",PolicyConstraints:"2.5.29.36",ExtendedKeyUsage:"2.5.29.37",FreshestCrl:"2.5.29.46",InhibitAnyPolicy:"2.5.29.54",AuthorityInfoAccess:"1.3.6.1.5.5.7.1.1",SubjectInfoAccess:"1.3.6.1.5.5.7.1.11",LogoType:"1.3.6.1.5.5.7.1.12",BiometricInfo:"1.3.6.1.5.5.7.1.2",QCStatements:"1.3.6.1.5.5.7.1.3",AuditIdentity:"1.3.6.1.5.5.7.1.4",NoRevAvail:"2.5.29.56",TargetInformation:"2.5.29.55",ExpiredCertsOnCrl:"2.5.29.60",SignedCertificateTimestampList:"1.3.6.1.4.1.11129.2.4.2"};async function Ke(e,t,n){const r=e.subject,i=e.serialNumber()||function(){const e=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);return crypto.getRandomValues(e),e[0]=2,e}(),o=e.days(),c=e.isCa(),s=e.keyUsage(),u=e.extendedKeyUsage()||[$.ClientAuth,$.ServerAuth],a=e.subjectAltNames,f="ECDSA"===n.algorithm.name?"ECC":"RSA",l=+new Date,d=new Date(l),y=new Date(l+86400*o*1e3),g=function(){const e=[];return{add:function(t,n,r){t&&("object"==typeof t&&t.identifier?e.push(t):e.push({identifier:t,value:n,critical:!0===r}))},build:function(){return D((t=>{e.forEach((e=>{t.push(D(V(e.identifier),e.critical?L(!0):k([]),q(e.value)))}))}))}}}();var h,p,C;null==a||a.isEmpty()||g.add((h=(h=a).encode?h.encode():h,{identifier:Ue.SubjectAlternativeName,value:h,critical:!1})),g.add((p=new Uint8Array(e.subjectKeyIdentifier()),{identifier:Ue.SubjectKeyIdentifier,value:q(p).encode(),critical:!1})),g.add(function(e){return{identifier:Ue.AuthorityKeyIdentifier,value:D(j(0,e)).encode(),critical:!1}}(new Uint8Array(e.authorityKeyIdentifier()))),g.add(function(e){return{identifier:Ue.KeyUsage,value:F(e).encode([]),critical:!0}}(s||(c?te:ne))),g.add(function(e,t){return{identifier:Ue.BasicConstraints,value:D(e?L(!0):null,void 0!==t&&t>0?Y(t):null).encode(),critical:!0}}(c)),u.length>0&&g.add((C=u,{identifier:Ue.ExtendedKeyUsage,value:D((e=>{C.forEach((t=>e.push(V(t))))})).encode(),critical:!0}));const E=function(e,t,n,r,i,o,c,s){const u=[];return D(x(0,Y(2)),Y(c),D(V("ECC"===e?re:ie)),s.encode(),D(H(r),H(i)),t.encode(),k(n),x(3,o.build())).encode(u),u}(f,r,e.publicKey(),d,y,g,i,t),b=function(e,t,n){const r=[];return D(k(t),D(V("ECC"===e?re:ie),"ECC"===e?k([]):B()),F(n)).encode(r),r}(f,E,await ge(n,E,f));return{cer:pe("CERTIFICATE",b)}}function Oe(e){const t=N(e),n=t[0],r=t[2].bytes(),i=t[1][0].objectIdentifier(),o=n[6],c=Se("");c.decode(n[3]);const s=Se("");s.decode(n[5]);const u=Ie();return n[7]&&u.decodeCerExtension(n[7][0]),{subject:s,issuer:c,notBefore:n[4][0].string(),notAfter:n[4][1].string(),subjectAltNames:u,publicKey:o.all(),publicKeyContents:o[1].bytes(),signatureAlgorithm:i,signature:r}}const Me=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],Pe=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],Ne={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15,A:10,B:11,C:12,D:13,E:14,F:15};const _e={parse:function(e){if(e.length%2!=0)throw new Error("invalid hex data, length error");const t=[];for(let n=0;n<e.length;n+=2){const r=Ne[e.substr(n,1)],i=Ne[e.substr(n+1,1)];if(void 0===r||void 0===i)throw new Error("invalid hex data, char error");t.push(r<<4|i)}return t},stringify:function(e,t){const n=[],r=!0===t?Pe:Me;for(let t=0;t<e.length;t++)n.push(r[e[t]>>4]+r[15&e[t]]);return n},transfer:function(e){return Me[e>>4]+Me[15&e]}},je=_e;function xe(e,t){const n=Ce(e);if(t&&n.type!==t)throw new Error("except: "+t);return"CERTIFICATE REQUEST"===n.type?Te(n.contents):"CERTIFICATE"===n.type?Oe(n.contents):"PRIVATE KEY"===n.type?ce(n.contents):"PUBLIC KEY"===n.type?le(n.contents):null}const De={version:"1.0.1",keypair:async function(e,t){be(e,t);const n=await Ee(e,t),r=await de(n.privateKey);return{private_key:pe("PRIVATE KEY",r.private_key),public_key:pe("PUBLIC KEY",r.public_key)}},csr:async function(e,t,n,r){be(e,t),n instanceof Array?(r=Ie(n),n=Se(n[0])):("string"==typeof n&&(n=Se(n)),r instanceof Array&&(r=Ie(r)));const i=await Ee(e,t),o=await de(i.privateKey),c=function(e,t,n){const r=[];return D(Y(0),e.encode(),k(n),t?t.encodeCsrExtension():null).encode(r),r}(n,r,o.public_key),s=function(e,t,n){const r=[];return D(k(t),D(V("ECC"===e?re:ie),"ECC"===e?k([]):B()),F(n)).encode(r),r}(e,c,await ge(i.privateKey,c,e));return{private_key:pe("PRIVATE KEY",o.private_key),public_key:pe("PUBLIC KEY",o.public_key),csr:pe("CERTIFICATE REQUEST",s)}},selfSignedCertificate:async function(e,t,n){be(e,t);const r=await Ee(e,t),{private_key:i,public_key:o,public_key_bits:c}=await de(r.privateKey),s=await ve(c);n.publicKey(o),n.subjectKeyIdentifier(s),n.authorityKeyIdentifier(s);const{cer:u}=await Ke(n,n.subject,r.privateKey);return{private_key:pe("PRIVATE KEY",i),public_key:pe("PUBLIC KEY",o),cer:u}},selfSignedCertificateWithCSR:async function(e,t,n){t=await ce(Ce(t).contents);const r=Ce(e);if("CERTIFICATE REQUEST"!==r.type)throw new Error("csr required");e=await Te(r.contents),n.reset(e.subject,e.subjectAltNames),n.publicKey(e.publicKey);const i=await ve(e.publicKeyContents);n.subjectKeyIdentifier(i),n.authorityKeyIdentifier(i);const{cer:o}=await Ke(n,n.subject,t);return{cer:o}},issue:async function(e,t,n,r){n=Oe(Ce(n).contents),r=await ce(Ce(r).contents);const i=Ce(e);if("CERTIFICATE REQUEST"===i.type){e=await Te(i.contents),t.reset(e.subject,e.subjectAltNames),t.publicKey(e.publicKey);const n=await ve(e.publicKeyContents);t.subjectKeyIdentifier(n)}else{if("PUBLIC KEY"!==i.type)throw new Error("invalid csr or publicKey");{if(!t.subject)throw new Error("subject required fro x509CertificateInfo");t.publicKey(i.contents);const e=N(i.contents),n=await ve(e[1].bytes());t.subjectKeyIdentifier(n)}}const o=await ve(n.publicKeyContents);return t.authorityKeyIdentifier(o),await Ke(t,n.subject,r)},parse:xe,SubjectAltNames:Ie,X509Name:Se,X509CertificateInfo:function(e,t){let n=e,r=t||Ie();const i={days:365};function o(e,t){return void 0===t?i[e]:(i[e]=t,c)}const c={isCa:e=>o("isCa",e),serialNumber:e=>o("serialNumber",e),keyUsage:e=>o("keyUsage",e),extendedKeyUsage:e=>o("extendedKeyUsage",e),days:e=>o("days",e),subjectKeyIdentifier:e=>o("subjectKeyIdentifier",e),authorityKeyIdentifier:e=>o("authorityKeyIdentifier",e),publicKey:e=>o("publicKey",e),subject:n,subjectAltNames:r,reset(e,t){c.subject=n=e,c.subjectAltNames=r=t||Ie()}};return c},KeyUsage:ee,ExtendKeyUsages:$,encoding:{Base64:{parse:e=>u.decode(e),stringify:e=>u.encode(e)},UTF8:{parse:e=>m.getBytes(e),stringify:e=>m.getString(e)},Hex:{parse:e=>je.parse(e),stringify:e=>je.stringify(e).join("")}},async generateSignature(e,t,n){const r=await xe(e,"PRIVATE KEY"),i="ECDSA"===r.algorithm.name?"ECC":"RSA";return{algorithm:r.algorithm,signature:await ge(r,t,i,n)}},async verifySignature(e,t,n,r){const i=await xe(e,"PUBLIC KEY"),o="ECDSA"===i.algorithm.name?"ECC":"RSA";return{algorithm:i.algorithm,match:await he(i,t,n,o,r)}}};window.X509=t.default})();