"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[296],{5296:(e,r,s)=>{s.r(r),s.d(r,{default:()=>n});var a=s(9060),t=s(3084),l=s(7872),c=s(2496);const n=()=>{const[e,r]=(0,a.useState)(1),[s,n]=(0,a.useState)([]),[o,i]=(0,a.useState)(""),[d,h]=(0,a.useState)([]);(0,a.useEffect)((()=>{u()}),[]);const u=async()=>{try{const{data:{user:e}}=await l.G.auth.getUser(),{data:r,error:s}=await l.G.from("foods").select("*").order("created_at",{ascending:!1});if(s)throw s;n(r||[]),h(r||[])}catch(e){console.error("Error fetching Foods:",e.message)}};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(t.u0,{className:"mb-4",children:[(0,c.jsx)(t.Q_,{children:"Foods"}),(0,c.jsxs)(t.Yj,{children:[(0,c.jsx)(t.wx,{variant:"pills",role:"tablist",children:(0,c.jsx)(t.SU,{role:"presentation",children:(0,c.jsx)(t.QJ,{active:1===e,component:"button",role:"tab","aria-controls":"all-tab-pane","aria-selected":1===e,onClick:()=>r(1),children:(0,c.jsx)("input",{type:"text",value:o,onChange:e=>{i(e.target.value);const r=[];for(let a=0;a<s.length;a++){let t=s[a].name.toLowerCase(),l=e.target.value.toLowerCase();t.includes(l)&&r.push(s[a])}h(r)},className:"mx-2 px-2 form-control-sm",placeholder:"search food here",style:{outline:"none",borderRadius:"5px"}})})})}),(0,c.jsx)(t.CY,{children:(0,c.jsx)(t.Wy,{role:"tabpanel","aria-labelledby":"all-tab-pane",visible:1===e,children:(0,c.jsxs)(t.k7,{hover:!0,children:[(0,c.jsx)(t.Iy,{children:(0,c.jsxs)(t.uH,{children:[(0,c.jsx)(t.Qr,{scope:"col",children:"Name"}),(0,c.jsx)(t.Qr,{scope:"col",children:"Category"}),(0,c.jsx)(t.Qr,{scope:"col",children:"Calories"}),(0,c.jsx)(t.Qr,{scope:"col",children:"Unit"})]})}),(0,c.jsx)(t.g7,{children:d.map((e=>(0,c.jsxs)(t.uH,{children:[(0,c.jsx)(t.kz,{children:e.name}),(0,c.jsx)(t.kz,{children:e.category}),(0,c.jsx)(t.kz,{children:e.calories}),(0,c.jsx)(t.kz,{children:e.unit})]},e.id)))})]})})})]})]})})}}}]);
//# sourceMappingURL=296.190ce397.chunk.js.map