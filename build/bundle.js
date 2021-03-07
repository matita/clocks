var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function c(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function l(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function m(){return f("")}function p(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t,e,n){t.classList[n?"add":"remove"](e)}let k;function y(t){k=t}function v(){if(!k)throw new Error("Function called outside component initialization");return k}function w(){const t=v();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const c=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);o.slice().forEach((e=>{e.call(t,c)}))}}}const x=[],_=[],O=[],E=[],C=Promise.resolve();let S=!1;function M(t){O.push(t)}let z=!1;const L=new Set;function N(){if(!z){z=!0;do{for(let t=0;t<x.length;t+=1){const e=x[t];y(e),j(e.$$)}for(y(null),x.length=0;_.length;)_.pop()();for(let t=0;t<O.length;t+=1){const e=O[t];L.has(e)||(L.add(e),e())}O.length=0}while(x.length);for(;E.length;)E.pop()();S=!1,z=!1,L.clear()}}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const T=new Set;let A;function F(){A={r:0,c:[],p:A}}function P(){A.r||o(A.c),A=A.p}function D(t,e){t&&t.i&&(T.delete(t),t.i(e))}function H(t,e,n,o){if(t&&t.o){if(T.has(t))return;T.add(t),A.c.push((()=>{T.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function I(t,e){H(t,1,1,(()=>{e.delete(t.key)}))}function q(t,e,n,o,c,s,r,l,i,a,u,f){let d=t.length,m=s.length,p=d;const h={};for(;p--;)h[t[p].key]=p;const g=[],$=new Map,b=new Map;for(p=m;p--;){const t=f(c,s,p),l=n(t);let i=r.get(l);i?o&&i.p(t,e):(i=a(l,t),i.c()),$.set(l,g[p]=i),l in h&&b.set(l,Math.abs(p-h[l]))}const k=new Set,y=new Set;function v(t){D(t,1),t.m(l,u),r.set(t.key,t),u=t.first,m--}for(;d&&m;){const e=g[m-1],n=t[d-1],o=e.key,c=n.key;e===n?(u=e.first,d--,m--):$.has(c)?!r.has(o)||k.has(o)?v(e):y.has(c)?d--:b.get(o)>b.get(c)?(y.add(o),v(e)):(k.add(c),d--):(i(n,r),d--)}for(;d--;){const e=t[d];$.has(e.key)||i(e,r)}for(;m;)v(g[m-1]);return g}function J(t){t&&t.c()}function R(t,n,s,r){const{fragment:l,on_mount:i,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,s),r||M((()=>{const n=i.map(e).filter(c);a?a.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(M)}function B(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function G(t,e){-1===t.$$.dirty[0]&&(x.push(t),S||(S=!0,C.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function U(e,c,s,r,l,i,u=[-1]){const f=k;y(e);const d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:[]),callbacks:n(),dirty:u,skip_bound:!1};let m=!1;if(d.ctx=s?s(e,c.props||{},((t,n,...o)=>{const c=o.length?o[0]:n;return d.ctx&&l(d.ctx[t],d.ctx[t]=c)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](c),m&&G(e,t)),n})):[],d.update(),m=!0,o(d.before_update),d.fragment=!!r&&r(d.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);d.fragment&&d.fragment.l(t),t.forEach(a)}else d.fragment&&d.fragment.c();c.intro&&D(e.$$.fragment),R(e,c.target,c.anchor,c.customElement),N()}y(f)}class W{$destroy(){B(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const V=async t=>(await new Promise(((t,e)=>{const n=document.createElement("script");n.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO0eT8a8507-un6p7aNNdJ_VF22jtcHW4&v=3&libraries=places",n.onload=t,n.onerror=e,document.head.appendChild(n)})),new google.maps.places.Autocomplete(t,{types:["geocode"]}));function K(e){let n,o,c,s;return{c(){n=u("div"),o=u("label"),o.textContent="What time is it in",c=d(),s=u("input"),g(o,"class","search-label"),g(o,"for","search-text"),g(s,"class","search-text"),g(s,"id","search-text"),g(s,"type","search"),g(s,"placeholder","some city"),g(n,"class","search-form")},m(t,r){i(t,n,r),l(n,o),l(n,c),l(n,s),e[1](s)},p:t,i:t,o:t,d(t){t&&a(n),e[1](null)}}}function Q(t,e,n){let o,c;const s=w();var r;function l(){const t=c.getPlace(),e=t.geometry.location,r={location:t.formatted_address,lat:e.lat(),lng:e.lng(),minutesOffset:t.utc_offset_minutes};n(0,o.value="",o),s("locationselected",r)}return r=async()=>{c=await V(o),c.addListener("place_changed",l)},v().$$.on_mount.push(r),[o,function(t){_[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class X extends W{constructor(t){super(),U(this,t,Q,K,s,{})}}function Y(e){let n;return{c(){n=u("div"),n.innerHTML='<span>Fork it on <a href="https://github.com/matita/clocks/">GitHub</a></span>\n  ·\n  <span>Need a feature? Found a bug? <a href="https://github.com/matita/clocks/issues">File an issue</a>!</span>\n  ·\n  <span>Made by <a href="http://matita.github.io/2015/10/17/clocks/">Matita</a></span>',g(n,"class","footer")},m(t,e){i(t,n,e)},p:t,i:t,o:t,d(t){t&&a(n)}}}class Z extends W{constructor(t){super(),U(this,t,null,Y,s,{})}}const tt=[];function et(e,n=t){let o;const c=[];function r(t){if(s(e,t)&&(e=t,o)){const t=!tt.length;for(let t=0;t<c.length;t+=1){const n=c[t];n[1](),tt.push(n,e)}if(t){for(let t=0;t<tt.length;t+=2)tt[t][0](tt[t+1]);tt.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(s,l=t){const i=[s,l];return c.push(i),1===c.length&&(o=n(r)||t),s(e),()=>{const t=c.indexOf(i);-1!==t&&c.splice(t,1),0===c.length&&(o(),o=null)}}}}const{subscribe:nt,update:ot}=et([]);let ct=1;var st={subscribe:nt,add:t=>ot((e=>e.concat({...t,id:ct++}))),rename:(t,e)=>ot((n=>n.map((n=>n!==t?n:{...t,name:e})))),delete:t=>ot((e=>e.filter((e=>e!==t))))};const rt={subscribe:et(Date.now(),(t=>{const e=setInterval((()=>{t(Date.now())}),100);return()=>{clearInterval(e)}})).subscribe};function lt(e){let n,c,s,r,f,m,$,b;return{c(){n=u("div"),n.textContent="×",c=d(),s=u("div"),r=u("button"),r.textContent="Rename",f=d(),m=u("button"),m.textContent="Delete",g(n,"class","clock-close svelte-qjtgwl"),g(s,"class","clock-actions")},m(t,o){i(t,n,o),i(t,c,o),i(t,s,o),l(s,r),l(s,f),l(s,m),$||(b=[p(n,"click",h(e[5])),p(r,"click",h(e[2])),p(m,"click",h(e[4]))],$=!0)},p:t,d(t){t&&a(n),t&&a(c),t&&a(s),$=!1,o(b)}}}function it(e){let n,o,c,s,r,m,h,k,y,v=(e[0].name||"---")+"",w=e[0].location+"",x=e[1]&&lt(e);return{c(){n=u("div"),o=u("div"),c=f(v),s=d(),r=u("div"),m=f(w),h=d(),x&&x.c(),g(o,"class","clock-name"),g(r,"class","clock-city"),g(n,"class","sub-clock svelte-qjtgwl"),b(n,"active",e[1])},m(t,a){i(t,n,a),l(n,o),l(o,c),l(n,s),l(n,r),l(r,m),l(n,h),x&&x.m(n,null),k||(y=p(n,"click",e[3]),k=!0)},p(t,[e]){1&e&&v!==(v=(t[0].name||"---")+"")&&$(c,v),1&e&&w!==(w=t[0].location+"")&&$(m,w),t[1]?x?x.p(t,e):(x=lt(t),x.c(),x.m(n,null)):x&&(x.d(1),x=null),2&e&&b(n,"active",t[1])},i:t,o:t,d(t){t&&a(n),x&&x.d(),k=!1,y()}}}function at(t,e,n){let{clock:o}=e,c=!1;return t.$$set=t=>{"clock"in t&&n(0,o=t.clock)},[o,c,function(){const t=prompt("Name of the clock:",o.name||"");null!==t&&(n(1,c=!1),st.rename(o,t))},function(){n(1,c=!0)},function(){confirm("Are you sure you want to delete this clock?")&&(n(1,c=!1),st.delete(o))},()=>n(1,c=!1)]}class ut extends W{constructor(t){super(),U(this,t,at,it,s,{clock:0})}}function ft(t,e,n){const o=t.slice();return o[8]=e[n],o}function dt(t,e){let n,o,c;return o=new ut({props:{clock:e[8]}}),{key:t,first:null,c(){n=m(),J(o.$$.fragment),this.first=n},m(t,e){i(t,n,e),R(o,t,e),c=!0},p(t,n){e=t;const c={};8&n&&(c.clock=e[8]),o.$set(c)},i(t){c||(D(o.$$.fragment,t),c=!0)},o(t){H(o.$$.fragment,t),c=!1},d(t){t&&a(n),B(o,t)}}}function mt(t){let e,n,o,c,s,r,m,p,h,k,y,v=(t[2]>=0?`+${t[2]}`:t[2])+"",w=[],x=new Map,_=t[3];const O=t=>t[8].id;for(let e=0;e<_.length;e+=1){let n=ft(t,_,e),o=O(n);x.set(o,w[e]=dt(o,n))}return{c(){e=u("div"),n=u("div"),o=u("span"),c=f(t[1]),s=d(),r=u("div"),m=f("GMT"),p=f(v),h=d(),k=u("div");for(let t=0;t<w.length;t+=1)w[t].c();g(o,"class","clock-time-display"),g(r,"class","clock-gmt"),g(n,"class","clock-time"),g(k,"class","clock-meta"),g(e,"class","clock"),b(e,"clock-local",t[0].isLocal)},m(t,a){i(t,e,a),l(e,n),l(n,o),l(o,c),l(n,s),l(n,r),l(r,m),l(r,p),l(e,h),l(e,k);for(let t=0;t<w.length;t+=1)w[t].m(k,null);y=!0},p(t,[n]){(!y||2&n)&&$(c,t[1]),(!y||4&n)&&v!==(v=(t[2]>=0?`+${t[2]}`:t[2])+"")&&$(p,v),8&n&&(_=t[3],F(),w=q(w,n,O,1,t,_,x,k,I,dt,null,ft),P()),1&n&&b(e,"clock-local",t[0].isLocal)},i(t){if(!y){for(let t=0;t<_.length;t+=1)D(w[t]);y=!0}},o(t){for(let t=0;t<w.length;t+=1)H(w[t]);y=!1},d(t){t&&a(e);for(let t=0;t<w.length;t+=1)w[t].d()}}}function pt(t,e,n){let o,c;r(t,rt,(t=>n(4,c=t)));let{zone:s}=e;const l=new Date;let i,a;const u=t=>("0"+t).substr(-2);return t.$$set=t=>{"zone"in t&&n(0,s=t.zone)},t.$$.update=()=>{var e;17&t.$$.dirty&&(n(2,a=("minutesOffset"in s?s.minutesOffset:-l.getTimezoneOffset())/60),l.setTime(c+60*((s.minutesOffset||0)+(s.isLocal?0:l.getTimezoneOffset()))*1e3),n(1,i=u((e=l).getHours())+":"+u(e.getMinutes()))),1&t.$$.dirty&&n(3,o=s.clocks.sort(((t,e)=>(t.name||"").localeCompare(e.name||""))))},[s,i,a,o,c]}class ht extends W{constructor(t){super(),U(this,t,pt,mt,s,{zone:0})}}function gt(t,e,n){const o=t.slice();return o[2]=e[n],o}function $t(t,e){let n,o,c;return o=new ht({props:{zone:e[2]}}),{key:t,first:null,c(){n=m(),J(o.$$.fragment),this.first=n},m(t,e){i(t,n,e),R(o,t,e),c=!0},p(t,n){e=t;const c={};1&n&&(c.zone=e[2]),o.$set(c)},i(t){c||(D(o.$$.fragment,t),c=!0)},o(t){H(o.$$.fragment,t),c=!1},d(t){t&&a(n),B(o,t)}}}function bt(t){let e,n,o,c,s=[],r=new Map,f=t[0];const m=t=>t[2].minutesOffset;for(let e=0;e<f.length;e+=1){let n=gt(t,f,e),o=m(n);r.set(o,s[e]=$t(o,n))}return{c(){e=u("div"),n=u("p"),n.textContent="Back to current time",o=d();for(let t=0;t<s.length;t+=1)s[t].c();g(n,"class","back-to-current-time"),g(e,"class","clocks")},m(t,r){i(t,e,r),l(e,n),l(e,o);for(let t=0;t<s.length;t+=1)s[t].m(e,null);c=!0},p(t,[n]){1&n&&(f=t[0],F(),s=q(s,n,m,1,t,f,r,e,I,$t,null,gt),P())},i(t){if(!c){for(let t=0;t<f.length;t+=1)D(s[t]);c=!0}},o(t){for(let t=0;t<s.length;t+=1)H(s[t]);c=!1},d(t){t&&a(e);for(let t=0;t<s.length;t+=1)s[t].d()}}}function kt(t,e,n){let o,c;return r(t,st,(t=>n(1,c=t))),t.$$.update=()=>{2&t.$$.dirty&&n(0,o=Object.entries(c.reduce(((t,e)=>{const{minutesOffset:n}=e;return(t[n]=t[n]||[]).push(e),t}),{})).map((([t,e])=>({minutesOffset:+t,clocks:e}))).sort(((t,e)=>t.minutesOffset-e.minutesOffset)))},[o,c]}class yt extends W{constructor(t){super(),U(this,t,kt,bt,s,{})}}function vt(e){let n,o,c,s,r,f,m;return o=new X({}),o.$on("locationselected",e[0]),s=new yt({}),f=new Z({}),{c(){n=u("div"),J(o.$$.fragment),c=d(),J(s.$$.fragment),r=d(),J(f.$$.fragment),g(n,"class","main")},m(t,e){i(t,n,e),R(o,n,null),l(n,c),R(s,n,null),i(t,r,e),R(f,t,e),m=!0},p:t,i(t){m||(D(o.$$.fragment,t),D(s.$$.fragment,t),D(f.$$.fragment,t),m=!0)},o(t){H(o.$$.fragment,t),H(s.$$.fragment,t),H(f.$$.fragment,t),m=!1},d(t){t&&a(n),B(o),B(s),t&&a(r),B(f,t)}}}function wt(t){const e=new URLSearchParams(location.search.substr(1));var n;(n=e.get("clocks"),(n||"").split("|").filter((t=>!!t)).map((t=>{const[e,n,o]=t.split(";").map(decodeURIComponent);return{location:e,name:o,minutesOffset:+n}}))).forEach(st.add),history.replaceState({},"Clocks","?");try{JSON.parse(localStorage.clocks_items).forEach(st.add)}catch(t){console.log("error while loading from localStorage",t)}return st.subscribe((t=>localStorage.clocks_items=JSON.stringify(t.filter((t=>!t.isLocal))))),[function({detail:t}){st.add(t)}]}return new class extends W{constructor(t){super(),U(this,t,wt,vt,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
