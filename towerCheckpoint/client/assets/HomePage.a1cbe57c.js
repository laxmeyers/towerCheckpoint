import{_ as v,q as g,o as p,c as _,E as f,a as r,b as t,F as i,r as u,h,P as C,d as l,e as m,A as c,p as y,f as b,g as w}from"./index.383a7b70.js";const x={setup(){const s=g("");async function e(){try{await h.getEvents()}catch(o){C.error(o,"[geting events]")}}return p(()=>{e()}),{events:_(()=>s.value?c.events.filter(n=>n.type==s.value).filter(n=>new Date(n.startDate)>=new Date):c.events.filter(o=>new Date(o.startDate)>=new Date)),changeFilterCategory(o){s.value=o}}},components:{EventCard:f}},F=s=>(y("data-v-77d41f41"),s=s(),b(),s),k={class:"container-fluid mb-5"},D=F(()=>t("div",{class:"row align-items-center mb-5 chairs-pic"},[t("div",{class:"col-4 offset-1 text-light"},[t("h1",{class:"fs-4 text-shadow"},"Get ahead of the scalpers. Reserve your seat now with real events for real people. ")])],-1)),E={class:"row justify-content-center mb-5"},S={class:"col-10 d-flex justify-content-around btn-secondary"},I={class:"container"},P={class:"row"},A={class:"col-md-3 my-3"};function B(s,e,o,n,$,j){const d=w("EventCard");return l(),r(i,null,[t("div",k,[D,t("div",E,[t("div",S,[t("button",{onClick:e[0]||(e[0]=a=>n.changeFilterCategory("")),class:"btn text-light"},"All"),t("button",{onClick:e[1]||(e[1]=a=>n.changeFilterCategory("concert")),class:"btn text-light"},"Concert"),t("button",{onClick:e[2]||(e[2]=a=>n.changeFilterCategory("convention")),class:"btn text-light"},"Convention"),t("button",{onClick:e[3]||(e[3]=a=>n.changeFilterCategory("sport")),class:"btn text-light"},"Sport"),t("button",{onClick:e[4]||(e[4]=a=>n.changeFilterCategory("digital")),class:"btn text-light"},"Digital")])])]),t("div",I,[t("div",P,[(l(!0),r(i,null,u(n.events,a=>(l(),r("div",A,[m(d,{event:a},null,8,["event"])]))),256))])])],64)}const N=v(x,[["render",B],["__scopeId","data-v-77d41f41"]]);export{N as default};