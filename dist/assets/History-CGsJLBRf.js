import{c as r,j as e,aa as l,ab as i,B as a,o as n,ac as d,ad as x}from"./index-BpobcHEq.js";import{d as h,B as o}from"./badge-BfXvUIKo.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=r("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=r("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=r("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=r("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);function u(){const t=h();return e.jsxs("div",{className:"min-h-screen bg-background p-6 space-y-6",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsx("h1",{className:"text-3xl font-bold",children:"History & Saved Scenarios"})}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{className:"relative flex-1",children:[e.jsx(l,{className:"absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"}),e.jsx(i,{placeholder:"Search by airport, airline, date...",className:"pl-10"})]}),e.jsx(a,{variant:"outline",children:"Filter"})]}),e.jsx("div",{className:"space-y-4",children:t.map(s=>e.jsx(n,{className:"p-6 hover:border-primary transition-colors",children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex gap-4 flex-1",children:[e.jsx("div",{className:"h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center",children:s.type==="prediction"?e.jsx(d,{className:"h-6 w-6 text-primary"}):e.jsx(x,{className:"h-6 w-6 text-primary"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-lg",children:s.title}),e.jsx("p",{className:"text-sm text-muted-foreground",children:s.scenario}),e.jsx("div",{className:"flex gap-2 mt-2",children:s.airports.map(c=>e.jsx(o,{variant:"outline",children:c},c))}),e.jsxs("div",{className:"flex gap-4 mt-3 text-sm",children:[e.jsx("span",{className:"text-muted-foreground",children:s.date.toLocaleDateString()}),e.jsxs("span",{children:["Flights: ",s.flightsAffected]}),e.jsxs("span",{children:["Delay: ",s.totalDelayMinutes," min"]}),e.jsxs("span",{className:"text-destructive",children:["$",(s.costImpact/1e3).toFixed(0),"k"]})]})]})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(a,{size:"icon",variant:"ghost",children:e.jsx(m,{className:"h-4 w-4"})}),e.jsx(a,{size:"icon",variant:"ghost",children:e.jsx(j,{className:"h-4 w-4"})}),e.jsx(a,{size:"icon",variant:"ghost",children:e.jsx(y,{className:"h-4 w-4"})}),e.jsx(a,{size:"icon",variant:"ghost",children:e.jsx(p,{className:"h-4 w-4"})})]})]})},s.id))})]})}export{u as default};
