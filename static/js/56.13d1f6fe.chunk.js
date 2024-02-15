"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[56],{56:(e,r,i)=>{i.r(r),i.d(r,{default:()=>d});var t=i(9060),s=i(3084),a=i(7872),c=i(3380),n=i.n(c),l=i(2496);const d=()=>{const[e,r]=(0,t.useState)(1),[i,c]=(0,t.useState)([]),[d,o]=(0,t.useState)([]),[h,j]=(0,t.useState)([]),[x,u]=(0,t.useState)([]),[p,m]=(0,t.useState)([]);(0,t.useEffect)((()=>{b(),y(),g(),_(),v()}),[]);const b=async()=>{try{const{data:{user:e}}=await a.G.auth.getUser(),{data:r,error:i}=await a.G.from("activity_records").select("*").order("created_at",{ascending:!1}).eq("user_id",e.id);if(i)throw i;c(r||[])}catch(e){console.error("Error fetching Activities:",e.message)}},y=async()=>{try{const{data:{user:e}}=await a.G.auth.getUser(),{data:r,error:i}=await a.G.from("activity_records").select("*").order("created_at",{ascending:!1}).eq("user_id",e.id).eq("activity_id",4);if(i)throw i;j(r||[])}catch(e){console.error("Error fetching runnings:",e.message)}},g=async()=>{try{const{data:{user:e}}=await a.G.auth.getUser(),{data:r,error:i}=await a.G.from("activity_records").select("*").order("created_at",{ascending:!1}).eq("user_id",e.id).eq("activity_id",1);if(i)throw i;o(r||[])}catch(e){console.error("Error fetching walkings:",e.message)}},_=async()=>{try{const{data:{user:e}}=await a.G.auth.getUser(),{data:r,error:i}=await a.G.from("activity_records").select("*").order("created_at",{ascending:!1}).eq("user_id",e.id).eq("activity_id",3);if(i)throw i;m(r||[])}catch(e){console.error("Error fetching swimmings:",e.message)}},v=async()=>{try{const{data:{user:e}}=await a.G.auth.getUser(),{data:r,error:i}=await a.G.from("activity_records").select("*").order("created_at",{ascending:!1}).eq("user_id",e.id).eq("activity_id",2);if(i)throw i;u(r||[])}catch(e){console.error("Error fetching cyclings:",e.message)}};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(s.u0,{className:"mb-4",children:[(0,l.jsx)(s.Q_,{children:"Activities"}),(0,l.jsxs)(s.Yj,{children:[(0,l.jsxs)(s.wx,{variant:"pills",role:"tablist",children:[(0,l.jsx)(s.SU,{role:"presentation",children:(0,l.jsx)(s.QJ,{active:1===e,component:"button",role:"tab","aria-controls":"all-tab-pane","aria-selected":1===e,onClick:()=>r(1),children:"All"})}),(0,l.jsx)(s.SU,{role:"presentation",children:(0,l.jsx)(s.QJ,{active:2===e,component:"button",role:"tab","aria-controls":"walking-tab-pane","aria-selected":2===e,onClick:()=>r(2),children:"Walking"})}),(0,l.jsx)(s.SU,{role:"presentation",children:(0,l.jsx)(s.QJ,{active:3===e,component:"button",role:"tab","aria-controls":"running-tab-pane","aria-selected":3===e,onClick:()=>r(3),children:"Running"})}),(0,l.jsx)(s.SU,{role:"presentation",children:(0,l.jsx)(s.QJ,{active:4===e,component:"button",role:"tab","aria-controls":"cycling-tab-pane","aria-selected":4===e,onClick:()=>r(4),children:"Cycling"})}),(0,l.jsx)(s.SU,{role:"presentation",children:(0,l.jsx)(s.QJ,{active:5===e,component:"button",role:"tab","aria-controls":"swimming-tab-pane","aria-selected":5===e,onClick:()=>r(5),children:"Swimming"})})]}),(0,l.jsxs)(s.CY,{children:[(0,l.jsx)(s.Wy,{role:"tabpanel","aria-labelledby":"all-tab-pane",visible:1===e,children:(0,l.jsxs)(s.k7,{hover:!0,children:[(0,l.jsx)(s.Iy,{children:(0,l.jsxs)(s.uH,{children:[(0,l.jsx)(s.Qr,{scope:"col",children:"Elapsed Time"}),(0,l.jsx)(s.Qr,{scope:"col",children:"Activity"})]})}),(0,l.jsx)(s.g7,{children:i.map((e=>(0,l.jsxs)(s.uH,{children:[(0,l.jsxs)(s.kz,{children:[n()(e.end_at).diff(n()(e.start_at),"minutes")," "," minutes"]}),(0,l.jsx)(s.kz,{children:e.title})]},e.id)))})]})}),(0,l.jsx)(s.Wy,{role:"tabpanel","aria-labelledby":"walking-tab-pane",visible:2===e,children:(0,l.jsxs)(s.k7,{hover:!0,children:[(0,l.jsx)(s.Iy,{children:(0,l.jsxs)(s.uH,{children:[(0,l.jsx)(s.Qr,{scope:"col",children:"Elapsed Time"}),(0,l.jsx)(s.Qr,{scope:"col",children:"Activity"})]})}),(0,l.jsx)(s.g7,{children:d.map((e=>(0,l.jsxs)(s.uH,{children:[(0,l.jsxs)(s.kz,{children:[n()(e.end_at).diff(n()(e.start_at),"minutes")," "," minutes"]}),(0,l.jsx)(s.kz,{children:e.title})]},e.id)))})]})}),(0,l.jsx)(s.Wy,{role:"tabpanel","aria-labelledby":"running-tab-pane",visible:3===e,children:(0,l.jsxs)(s.k7,{hover:!0,children:[(0,l.jsx)(s.Iy,{children:(0,l.jsxs)(s.uH,{children:[(0,l.jsx)(s.Qr,{scope:"col",children:"Elapsed Time"}),(0,l.jsx)(s.Qr,{scope:"col",children:"Activity"})]})}),(0,l.jsx)(s.g7,{children:h.map((e=>(0,l.jsxs)(s.uH,{children:[(0,l.jsxs)(s.kz,{children:[n()(e.end_at).diff(n()(e.start_at),"minutes")," "," minutes"]}),(0,l.jsx)(s.kz,{children:e.title})]},e.id)))})]})}),(0,l.jsx)(s.Wy,{role:"tabpanel","aria-labelledby":"cycling-tab-pane",visible:4===e,children:(0,l.jsxs)(s.k7,{hover:!0,children:[(0,l.jsx)(s.Iy,{children:(0,l.jsxs)(s.uH,{children:[(0,l.jsx)(s.Qr,{scope:"col",children:"Elapsed Time"}),(0,l.jsx)(s.Qr,{scope:"col",children:"Activity"})]})}),(0,l.jsx)(s.g7,{children:x.map((e=>(0,l.jsxs)(s.uH,{children:[(0,l.jsxs)(s.kz,{children:[n()(e.end_at).diff(n()(e.start_at),"minutes")," "," minutes"]}),(0,l.jsx)(s.kz,{children:e.title})]},e.id)))})]})}),(0,l.jsx)(s.Wy,{role:"tabpanel","aria-labelledby":"swimming-tab-pane",visible:5===e,children:(0,l.jsxs)(s.k7,{hover:!0,children:[(0,l.jsx)(s.Iy,{children:(0,l.jsxs)(s.uH,{children:[(0,l.jsx)(s.Qr,{scope:"col",children:"Elapsed Time"}),(0,l.jsx)(s.Qr,{scope:"col",children:"Activity"})]})}),(0,l.jsx)(s.g7,{children:p.map((e=>(0,l.jsxs)(s.uH,{children:[(0,l.jsxs)(s.kz,{children:[n()(e.end_at).diff(n()(e.start_at),"minutes")," "," minutes"]}),(0,l.jsx)(s.kz,{children:e.title})]},e.id)))})]})})]})]})]})})}}}]);
//# sourceMappingURL=56.13d1f6fe.chunk.js.map