var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function s(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function l(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function a(t,e,n,o,r,s,c){const i=function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(e,o,r,s);if(i){const r=l(e,n,o,c);t.p(r,i)}}function u(t,e,n=e){return t.set(n),e}const f="undefined"!=typeof window;let d=f?()=>window.performance.now():()=>Date.now(),p=f?t=>requestAnimationFrame(t):t;const m=new Set;function $(t){m.forEach((e=>{e.c(t)||(m.delete(e),e.f())})),0!==m.size&&p($)}function g(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode.removeChild(t)}function b(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function w(){return x(" ")}function v(){return x("")}function k(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function _(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function O(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function E(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}const C=new Set;let S,T=0;function M(t,e,n,o,r,s,c,i=0){const l=16.666/o;let a="{\n";for(let t=0;t<=1;t+=l){const o=e+(n-e)*s(t);a+=100*t+`%{${c(o,1-o)}}\n`}const u=a+`100% {${c(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${i}`,d=t.ownerDocument;C.add(d);const p=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(b("style")).sheet),m=d.__svelte_rules||(d.__svelte_rules={});m[f]||(m[f]=!0,p.insertRule(`@keyframes ${f} ${u}`,p.cssRules.length));const $=t.style.animation||"";return t.style.animation=`${$?`${$}, `:""}${f} ${o}ms linear ${r}ms 1 both`,T+=1,f}function R(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),T-=r,T||p((()=>{T||(C.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),C.clear())})))}function z(t){S=t}function F(){if(!S)throw new Error("Function called outside component initialization");return S}const A=[],L=[],j=[],N=[],P=Promise.resolve();let D=!1;function I(t){j.push(t)}let B=!1;const H=new Set;function W(){if(!B){B=!0;do{for(let t=0;t<A.length;t+=1){const e=A[t];z(e),J(e.$$)}for(z(null),A.length=0;L.length;)L.pop()();for(let t=0;t<j.length;t+=1){const e=j[t];H.has(e)||(H.add(e),e())}j.length=0}while(A.length);for(;N.length;)N.pop()();D=!1,B=!1,H.clear()}}function J(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}let U;function q(t,e,n){t.dispatchEvent(E(`${e?"intro":"outro"}${n}`))}const G=new Set;let V;function K(){V={r:0,c:[],p:V}}function Q(){V.r||r(V.c),V=V.p}function X(t,e){t&&t.i&&(G.delete(t),t.i(e))}function Y(t,e,n,o){if(t&&t.o){if(G.has(t))return;G.add(t),V.c.push((()=>{G.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const Z={duration:0};function tt(n,o,c,i){let l=o(n,c),a=i?0:1,u=null,f=null,g=null;function h(){g&&R(n,g)}function y(t,e){const n=t.b-a;return e*=Math.abs(n),{a:a,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function b(o){const{delay:s=0,duration:c=300,easing:i=e,tick:b=t,css:x}=l||Z,w={start:d()+s,b:o};o||(w.group=V,V.r+=1),u||f?f=w:(x&&(h(),g=M(n,a,o,c,s,i,x)),o&&b(0,1),u=y(w,c),I((()=>q(n,o,"start"))),function(t){let e;0===m.size&&p($),new Promise((n=>{m.add(e={c:t,f:n})}))}((t=>{if(f&&t>f.start&&(u=y(f,c),f=null,q(n,u.b,"start"),x&&(h(),g=M(n,a,u.b,u.duration,0,i,l.css))),u)if(t>=u.end)b(a=u.b,1-a),q(n,u.b,"end"),f||(u.b?h():--u.group.r||r(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;a=u.a+u.d*i(e/u.duration),b(a,1-a)}return!(!u&&!f)})))}return{run(t){s(l)?(U||(U=Promise.resolve(),U.then((()=>{U=null}))),U).then((()=>{l=l(),b(t)})):b(t)},end(){h(),u=f=null}}}function et(t,e){Y(t,1,1,(()=>{e.delete(t.key)}))}function nt(t,e,n,o,r,s,c,i,l,a,u,f){let d=t.length,p=s.length,m=d;const $={};for(;m--;)$[t[m].key]=m;const g=[],h=new Map,y=new Map;for(m=p;m--;){const t=f(r,s,m),i=n(t);let l=c.get(i);l?o&&l.p(t,e):(l=a(i,t),l.c()),h.set(i,g[m]=l),i in $&&y.set(i,Math.abs(m-$[i]))}const b=new Set,x=new Set;function w(t){X(t,1),t.m(i,u),c.set(t.key,t),u=t.first,p--}for(;d&&p;){const e=g[p-1],n=t[d-1],o=e.key,r=n.key;e===n?(u=e.first,d--,p--):h.has(r)?!c.has(o)||b.has(o)?w(e):x.has(r)?d--:y.get(o)>y.get(r)?(x.add(o),w(e)):(b.add(r),d--):(l(n,c),d--)}for(;d--;){const e=t[d];h.has(e.key)||l(e,c)}for(;p;)w(g[p-1]);return g}function ot(t){t&&t.c()}function rt(t,e,o,c){const{fragment:i,on_mount:l,on_destroy:a,after_update:u}=t.$$;i&&i.m(e,o),c||I((()=>{const e=l.map(n).filter(s);a?a.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(I)}function st(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ct(t,e){-1===t.$$.dirty[0]&&(A.push(t),D||(D=!0,P.then(W)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function it(e,n,s,c,i,l,a=[-1]){const u=S;z(e);const f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:a,skip_bound:!1};let d=!1;if(f.ctx=s?s(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),d&&ct(e,t)),n})):[],f.update(),d=!0,r(f.before_update),f.fragment=!!c&&c(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(y)}else f.fragment&&f.fragment.c();n.intro&&X(e.$$.fragment),rt(e,n.target,n.anchor,n.customElement),W()}z(u)}class lt{$destroy(){st(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const at=async t=>(await new Promise(((t,e)=>{const n=document.createElement("script");n.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO0eT8a8507-un6p7aNNdJ_VF22jtcHW4&v=3&libraries=places",n.onload=t,n.onerror=e,document.head.appendChild(n)})),new google.maps.places.Autocomplete(t,{types:["geocode"]}));function ut(e){let n,o,r,s;return{c(){n=b("div"),o=b("label"),o.textContent="What time is it in",r=w(),s=b("input"),_(o,"for","search-text"),_(o,"class","flex-none whitespace-nowrap"),_(s,"class","mx-2 px-1 py-2 w-1 flex-grow focus:outline-none focus:ring-1 ring-green-500 rounded-sm"),_(s,"id","search-text"),_(s,"type","search"),_(s,"placeholder","some city"),_(n,"class","flex place-items-center rounded-xl bg-white px-4 py-2 my-4")},m(t,c){h(t,n,c),g(n,o),g(n,r),g(n,s),e[1](s)},p:t,i:t,o:t,d(t){t&&y(n),e[1](null)}}}function ft(t,e,n){let o,r;const s=function(){const t=F();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const r=E(e,n);o.slice().forEach((e=>{e.call(t,r)}))}}}();var c;function i(){const t=r.getPlace();if(!t||!t.geometry)return;const e=t.geometry.location,c={location:t.formatted_address,lat:e.lat(),lng:e.lng(),minutesOffset:t.utc_offset_minutes};n(0,o.value="",o),s("locationselected",c)}return c=async()=>{r=await at(o),r.addListener("place_changed",i),o.focus()},F().$$.on_mount.push(c),[o,function(t){L[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class dt extends lt{constructor(t){super(),it(this,t,ft,ut,c,{})}}function pt(e){let n;return{c(){n=b("div"),n.innerHTML='<span>Fork it on <a href="https://github.com/matita/clocks/">GitHub</a></span>\n  ·\n  <span>Need a feature? Found a bug? <a href="https://github.com/matita/clocks/issues">File an issue</a>!</span>\n  ·\n  <span>Made by <a href="http://matita.github.io/2015/10/17/clocks/">Matita</a></span>',_(n,"class","text-center text-sm pb-2 text-gray-400")},m(t,e){h(t,n,e)},p:t,i:t,o:t,d(t){t&&y(n)}}}class mt extends lt{constructor(t){super(),it(this,t,null,pt,c,{})}}function $t(t){const e=t-1;return e*e*e+1}function gt(t,{delay:n=0,duration:o=400,easing:r=e}={}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:r,css:t=>"opacity: "+t*s}}function ht(t,{delay:e=0,duration:n=400,easing:o=$t}={}){const r=getComputedStyle(t),s=+r.opacity,c=parseFloat(r.height),i=parseFloat(r.paddingTop),l=parseFloat(r.paddingBottom),a=parseFloat(r.marginTop),u=parseFloat(r.marginBottom),f=parseFloat(r.borderTopWidth),d=parseFloat(r.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*s};height: ${t*c}px;padding-top: ${t*i}px;padding-bottom: ${t*l}px;margin-top: ${t*a}px;margin-bottom: ${t*u}px;border-top-width: ${t*f}px;border-bottom-width: ${t*d}px;`}}const yt=[];function bt(e,n=t){let o;const r=[];function s(t){if(c(e,t)&&(e=t,o)){const t=!yt.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),yt.push(n,e)}if(t){for(let t=0;t<yt.length;t+=2)yt[t][0](yt[t+1]);yt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,i=t){const l=[c,i];return r.push(l),1===r.length&&(o=n(s)||t),c(e),()=>{const t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}const xt={subscribe:bt(Date.now(),(t=>{const e=setInterval((()=>{t(Date.now())}),100);return()=>{clearInterval(e)}})).subscribe};const wt=t=>encodeURIComponent(t).replace(/%20/g,"+").replace(/%2C/g,",");function vt(t){let e,n,o,r;const s=t[1].default,c=function(t,e,n,o){if(t){const r=l(t,e,n,o);return t[0](r)}}(s,t,t[0],null);return{c(){e=b("div"),c&&c.c(),_(e,"class","block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"),_(e,"role","menuitem")},m(s,i){var l;h(s,e,i),c&&c.m(e,null),n=!0,o||(r=k(e,"click",(l=t[2],function(t){return t.stopPropagation(),l.call(this,t)})),o=!0)},p(t,[e]){c&&c.p&&1&e&&a(c,s,t,t[0],e,null,null)},i(t){n||(X(c,t),n=!0)},o(t){Y(c,t),n=!1},d(t){t&&y(e),c&&c.d(t),o=!1,r()}}}function kt(t,e,n){let{$$slots:o={},$$scope:r}=e;return t.$$set=t=>{"$$scope"in t&&n(0,r=t.$$scope)},[r,o,function(e){!function(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t(e)))}(t,e)}]}class _t extends lt{constructor(t){super(),it(this,t,kt,vt,c,{})}}const{subscribe:Ot,update:Et}=bt([]);let Ct=1;var St={subscribe:Ot,add:({location:t,minutesOffset:e,name:n})=>Et((o=>o.some((o=>o.location===t&&o.minutesOffset===e&&o.name===n))?o:o.concat({location:t,minutesOffset:e,name:n,id:Ct++}))),rename:(t,e)=>Et((n=>n.map((n=>n!==t?n:{...t,name:e})))),delete:t=>Et((e=>e.filter((e=>e!==t))))};function Tt(t){let e,n,o,r,s,c,i,l,a,u,f;return o=new _t({props:{$$slots:{default:[Mt]},$$scope:{ctx:t}}}),o.$on("click",t[4]),s=new _t({props:{$$slots:{default:[Rt]},$$scope:{ctx:t}}}),s.$on("click",t[7]),i=new _t({props:{$$slots:{default:[zt]},$$scope:{ctx:t}}}),i.$on("click",t[6]),{c(){e=b("div"),n=b("div"),ot(o.$$.fragment),r=w(),ot(s.$$.fragment),c=w(),ot(i.$$.fragment),_(n,"role","menu"),_(n,"class","bg-white w-56 mx-auto rounded-md ring-1 ring-black ring-opacity-5 py-1"),_(e,"class","z-10 bg-black bg-opacity-30 fixed top-0 left-0 right-0 bottom-0 flex place-items-center")},m(l,d){h(l,e,d),g(e,n),rt(o,n,null),g(n,r),rt(s,n,null),g(n,c),rt(i,n,null),a=!0,u||(f=k(e,"click",t[8]),u=!0)},p(t,e){const n={};512&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n);const r={};516&e&&(r.$$scope={dirty:e,ctx:t}),s.$set(r);const c={};512&e&&(c.$$scope={dirty:e,ctx:t}),i.$set(c)},i(t){a||(X(o.$$.fragment,t),X(s.$$.fragment,t),X(i.$$.fragment,t),I((()=>{l||(l=tt(e,gt,{duration:100},!0)),l.run(1)})),a=!0)},o(t){Y(o.$$.fragment,t),Y(s.$$.fragment,t),Y(i.$$.fragment,t),l||(l=tt(e,gt,{duration:100},!1)),l.run(0),a=!1},d(t){t&&y(e),st(o),st(s),st(i),t&&l&&l.end(),u=!1,f()}}}function Mt(t){let e;return{c(){e=x("Rename")},m(t,n){h(t,e,n)},d(t){t&&y(e)}}}function Rt(t){let e,n=t[2]?"Link copied!":"Share";return{c(){e=x(n)},m(t,n){h(t,e,n)},p(t,o){4&o&&n!==(n=t[2]?"Link copied!":"Share")&&O(e,n)},d(t){t&&y(e)}}}function zt(t){let e;return{c(){e=x("Delete")},m(t,n){h(t,e,n)},d(t){t&&y(e)}}}function Ft(t){let e,n,o,r,s,c,i,l,a,u,f,d,p,m=(t[0].name||"---")+"",$=t[0].location+"",v=t[3]&&Tt(t);return{c(){e=b("div"),n=b("div"),o=x(m),r=w(),s=b("div"),c=x($),i=w(),l=b("button"),l.textContent="⋮",a=w(),v&&v.c(),_(n,"class","text-green-500"),_(s,"class","text-xs text-gray-400"),_(l,"class","absolute top-2 right-1 px-2"),_(e,"class","bg-white px-4 py-2 mb-2 relative rounded-xl transition-shadow duration-300")},m(u,m){h(u,e,m),g(e,n),g(n,o),g(e,r),g(e,s),g(s,c),g(e,i),g(e,l),g(e,a),v&&v.m(e,null),f=!0,d||(p=k(l,"click",t[5]),d=!0)},p(t,[n]){(!f||1&n)&&m!==(m=(t[0].name||"---")+"")&&O(o,m),(!f||1&n)&&$!==($=t[0].location+"")&&O(c,$),t[3]?v?(v.p(t,n),8&n&&X(v,1)):(v=Tt(t),v.c(),X(v,1),v.m(e,null)):v&&(K(),Y(v,1,1,(()=>{v=null})),Q())},i(t){f||(X(v),I((()=>{u||(u=tt(e,ht,{},!0)),u.run(1)})),f=!0)},o(t){Y(v),u||(u=tt(e,ht,{},!1)),u.run(0),f=!1},d(t){t&&y(e),v&&v.d(),t&&u&&u.end(),d=!1,p()}}}let At=bt(null);function Lt(t,e,n){let o,r;i(t,At,(t=>n(1,r=t)));let{clock:s}=e,c=!1;return t.$$set=t=>{"clock"in t&&n(0,s=t.clock)},t.$$.update=()=>{3&t.$$.dirty&&n(3,o=r===s)},[s,r,c,o,function(){u(At,r=null,r);const t=prompt("Name of the clock:",s.name||"");null!==t&&St.rename(s,t)},function(){u(At,r=s,r)},function(){confirm("Are you sure you want to delete this clock?")&&(u(At,r=null,r),St.delete(s))},function(){if(c)return;const t=`${location.protocol}//${location.host}${location.pathname}?clocks=${(t=>t.filter((t=>!t.isLocal)).map((t=>[t.location,t.minutesOffset,t.name||""].map(wt).join(";"))).join("|"))([s])}`;var e,o,i,l;e=t,(l=document.createElement("div")).contentEditable=!0,l.innerHTML=e,l.setAttribute("readonly",""),l.style.position="absolute",l.style.left="-9999px",document.body.appendChild(l),document.body.createTextRange?((o=document.body.createTextRange()).moveToElement(l),o.select()):window.getSelection&&(i=window.getSelection(),(o=document.createRange()).selectNodeContents(l),i.removeAllRanges(),i.addRange(o)),document.execCommand("copy"),window.getSelection().removeAllRanges(),document.body.removeChild(l),n(2,c=!0),setTimeout((()=>{n(2,c=!1),u(At,r=null,r)}),1e3)},()=>u(At,r=null,r)]}class jt extends lt{constructor(t){super(),it(this,t,Lt,Ft,c,{clock:0})}}function Nt(t,e,n){const o=t.slice();return o[7]=e[n],o}function Pt(t,e){let n,o,r;return o=new jt({props:{clock:e[7]}}),{key:t,first:null,c(){n=v(),ot(o.$$.fragment),this.first=n},m(t,e){h(t,n,e),rt(o,t,e),r=!0},p(t,n){e=t;const r={};2&n&&(r.clock=e[7]),o.$set(r)},i(t){r||(X(o.$$.fragment,t),r=!0)},o(t){Y(o.$$.fragment,t),r=!1},d(t){t&&y(n),st(o,t)}}}function Dt(t){let e,n,o,r,s,c,i,l,a,u,f,d=[],p=new Map,m=t[1];const $=t=>t[7].id;for(let e=0;e<m.length;e+=1){let n=Nt(t,m,e),o=$(n);p.set(o,d[e]=Pt(o,n))}return{c(){e=b("div"),n=b("div"),o=b("div"),r=b("span"),s=x(t[0]),c=w(),i=b("div"),i.textContent=`GMT${t[2]>=0?`+${t[2]}`:t[2]}`,l=w(),a=b("div");for(let t=0;t<d.length;t+=1)d[t].c();_(i,"class","text-xs text-gray-400"),_(o,"class","text-center py-2 px-2 sticky top-0"),_(n,"class","flex-none relative w-24"),_(a,"class","flex-1"),_(e,"class","flex max-w-full")},m(t,u){h(t,e,u),g(e,n),g(n,o),g(o,r),g(r,s),g(o,c),g(o,i),g(e,l),g(e,a);for(let t=0;t<d.length;t+=1)d[t].m(a,null);f=!0},p(t,[e]){(!f||1&e)&&O(s,t[0]),2&e&&(m=t[1],K(),d=nt(d,e,$,1,t,m,p,a,et,Pt,null,Nt),Q())},i(t){if(!f){for(let t=0;t<m.length;t+=1)X(d[t]);I((()=>{u||(u=tt(e,ht,{},!0)),u.run(1)})),f=!0}},o(t){for(let t=0;t<d.length;t+=1)Y(d[t]);u||(u=tt(e,ht,{},!1)),u.run(0),f=!1},d(t){t&&y(e);for(let t=0;t<d.length;t+=1)d[t].d();t&&u&&u.end()}}}function It(t,e,n){let o,r;i(t,xt,(t=>n(4,r=t)));let s,{zone:c}=e;const l=new Date,a=("minutesOffset"in c?c.minutesOffset:-l.getTimezoneOffset())/60;return t.$$set=t=>{"zone"in t&&n(3,c=t.zone)},t.$$.update=()=>{24&t.$$.dirty&&(l.setTime(r+60*((c.minutesOffset||0)+(c.isLocal?0:l.getTimezoneOffset()))*1e3),n(0,s=l.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))),8&t.$$.dirty&&n(1,o=c.clocks.sort(((t,e)=>(t.name||"").localeCompare(e.name||""))))},[s,o,a,c,r]}class Bt extends lt{constructor(t){super(),it(this,t,It,Dt,c,{zone:3})}}function Ht(t,e,n){const o=t.slice();return o[2]=e[n],o}function Wt(t,e){let n,o,r;return o=new Bt({props:{zone:e[2]}}),{key:t,first:null,c(){n=v(),ot(o.$$.fragment),this.first=n},m(t,e){h(t,n,e),rt(o,t,e),r=!0},p(t,n){e=t;const r={};1&n&&(r.zone=e[2]),o.$set(r)},i(t){r||(X(o.$$.fragment,t),r=!0)},o(t){Y(o.$$.fragment,t),r=!1},d(t){t&&y(n),st(o,t)}}}function Jt(t){let e,n,o=[],r=new Map,s=t[0];const c=t=>t[2].minutesOffset;for(let e=0;e<s.length;e+=1){let n=Ht(t,s,e),i=c(n);r.set(i,o[e]=Wt(i,n))}return{c(){e=b("div");for(let t=0;t<o.length;t+=1)o[t].c();_(e,"class","")},m(t,r){h(t,e,r);for(let t=0;t<o.length;t+=1)o[t].m(e,null);n=!0},p(t,[n]){1&n&&(s=t[0],K(),o=nt(o,n,c,1,t,s,r,e,et,Wt,null,Ht),Q())},i(t){if(!n){for(let t=0;t<s.length;t+=1)X(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)Y(o[t]);n=!1},d(t){t&&y(e);for(let t=0;t<o.length;t+=1)o[t].d()}}}function Ut(t,e,n){let o,r;return i(t,St,(t=>n(1,r=t))),t.$$.update=()=>{2&t.$$.dirty&&n(0,o=Object.entries(r.reduce(((t,e)=>{const{minutesOffset:n}=e;return(t[n]=t[n]||[]).push(e),t}),{})).map((([t,e])=>({minutesOffset:+t,clocks:e}))).sort(((t,e)=>t.minutesOffset-e.minutesOffset)))},[o,r]}class qt extends lt{constructor(t){super(),it(this,t,Ut,Jt,c,{})}}function Gt(e){let n,o,r,s,c,i,l,a;return r=new dt({}),r.$on("locationselected",e[0]),c=new qt({}),l=new mt({}),{c(){n=b("div"),o=b("div"),ot(r.$$.fragment),s=w(),ot(c.$$.fragment),i=w(),ot(l.$$.fragment),_(o,"class","max-w-xl mx-auto my-4 text-gray-600"),_(n,"class","flex-grow")},m(t,e){h(t,n,e),g(n,o),rt(r,o,null),g(o,s),rt(c,o,null),h(t,i,e),rt(l,t,e),a=!0},p:t,i(t){a||(X(r.$$.fragment,t),X(c.$$.fragment,t),X(l.$$.fragment,t),a=!0)},o(t){Y(r.$$.fragment,t),Y(c.$$.fragment,t),Y(l.$$.fragment,t),a=!1},d(t){t&&y(n),st(r),st(c),t&&y(i),st(l,t)}}}function Vt(t){const e=new URLSearchParams(location.search.substr(1)),n=(e.get("clocks")||"").split("|").filter((t=>!!t)).map((t=>{const[e,n,o]=t.split(";").map(decodeURIComponent);return{location:e,name:o,minutesOffset:+n}}));history.replaceState({},"Clocks","?"),setTimeout((()=>{n.forEach(St.add)}),200);try{JSON.parse(localStorage.clocks_items).forEach(St.add)}catch(t){console.log("error while loading from localStorage",t)}return St.subscribe((t=>localStorage.clocks_items=JSON.stringify(t.filter((t=>!t.isLocal))))),[function({detail:t}){St.add(t)}]}return new class extends lt{constructor(t){super(),it(this,t,Vt,Gt,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
