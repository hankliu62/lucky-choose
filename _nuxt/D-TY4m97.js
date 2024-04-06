import{d as i,R as c,S as m,T as h,U as P,c as v,r as b,u as L,V as r,W as g,X as k,m as R,I as d,g as l,Y as S,Z as T,$ as j,a0 as _,a1 as x,a2 as A}from"./MHWVbOwL.js";const O=i({name:"LayoutLoader",inheritAttrs:!1,props:{name:String,layoutProps:Object},async setup(e,o){const t=await r[e.name]().then(a=>a.default||a);return()=>l(t,e.layoutProps,o.slots)}}),H=i({name:"NuxtLayout",inheritAttrs:!1,props:{name:{type:[String,Boolean,Object],default:null},fallback:{type:[String,Object],default:null}},setup(e,o){const t=R(),a=c(m),n=a===h()?P():a,u=v(()=>{let s=d(e.name)??n.meta.layout??"default";return s&&!(s in r)&&e.fallback&&(s=d(e.fallback)),s}),y=b();o.expose({layoutRef:y});const p=t.deferHydration();if(t.isHydrating){const s=t.hooks.hookOnce("app:error",p);L().beforeEach(s)}return()=>{const s=u.value&&u.value in r,f=n.meta.layoutTransition??g;return k(_,s&&f,{default:()=>l(j,{suspensible:!0,onResolve:()=>{T(p)}},{default:()=>l(B,{layoutProps:S(o.attrs,{ref:y}),key:u.value||void 0,name:u.value,shouldProvide:!e.name,hasTransition:!!f},o.slots)})}).default()}}}),B=i({name:"NuxtLayoutProvider",inheritAttrs:!1,props:{name:{type:[String,Boolean]},layoutProps:{type:Object},hasTransition:{type:Boolean},shouldProvide:{type:Boolean}},setup(e,o){const t=e.name;return e.shouldProvide&&x(A,{isCurrent:a=>t===(a.meta.layout??"default")}),()=>{var a,n;return!t||typeof t=="string"&&!(t in r)?(n=(a=o.slots).default)==null?void 0:n.call(a):l(O,{key:t,layoutProps:e.layoutProps,name:t},o.slots)}}});export{H as _};