import{r as s,I as d,d as x,j as e,T as h}from"../../main-DzykU_cl.js";import{A as u}from"./index-CF7E4fOl.js";import{S as l}from"./index-048wQVRF.js";import{C as i}from"./index-DyYjffXN.js";import{D as o}from"./index-AlUrJFWq.js";import{T as j}from"./index-Bcez48zK.js";import{R as p}from"./DisconnectOutlined-CRyLmGTM.js";import"./ExclamationCircleFilled-C864b64l.js";import"./InfoCircleFilled-BJKSyOCY.js";var m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"check-circle",theme:"outlined"},f=function(c,a){return s.createElement(d,x({},c,{ref:a,icon:m}))},g=s.forwardRef(f);function S(){return navigator.onLine}function v(n){return window.addEventListener("online",n),window.addEventListener("offline",n),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",n)}}function w(){return s.useSyncExternalStore(v,S)}const{Title:y,Paragraph:t,Text:r}=h,E=()=>{const n=w();return e.jsx(i,{style:{marginTop:16},children:e.jsxs(l,{direction:"vertical",children:[e.jsxs("div",{children:[e.jsx(r,{strong:!0,children:"当前网络状态："}),e.jsx(j,{color:n?"#52c41a":"#f5222d",style:{marginLeft:8},children:n?e.jsxs(e.Fragment,{children:[e.jsx(g,{})," 在线"]}):e.jsxs(e.Fragment,{children:[e.jsx(p,{})," 离线"]})})]}),e.jsx(r,{type:"secondary",children:"尝试切换网络连接（开启/关闭 WiFi）来查看状态变化"})]})})},z=()=>e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px"},children:[e.jsx(y,{level:2,children:"useSyncExternalStore Hook 演示"}),e.jsx(u,{type:"info",message:"什么是 useSyncExternalStore？",description:"useSyncExternalStore 是 React 18 引入的新 Hook，用于订阅外部数据源。它提供了一种安全的方式来读取和订阅外部数据，确保在并发渲染中数据的一致性。",showIcon:!0,style:{marginBottom:"20px"}}),e.jsxs(l,{direction:"vertical",style:{width:"100%"},children:[e.jsx(i,{title:"演示效果",children:e.jsx(E,{})}),e.jsxs(i,{title:"使用说明",children:[e.jsx(t,{children:e.jsx(r,{strong:!0,children:"Hook 参数说明："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"subscribe: 订阅函数，当数据源发生变化时调用回调"}),e.jsx("li",{children:"getSnapshot: 返回当前状态的函数"}),e.jsx("li",{children:"getServerSnapshot: (可选) 用于服务端渲染"})]}),e.jsx(o,{}),e.jsx(t,{children:e.jsx(r,{strong:!0,children:"代码示例："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`import { useSyncExternalStore } from 'react';

// 1. 创建获取状态的函数
function getSnapshot() {
  return navigator.onLine;
}

// 2. 创建订阅函数
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 3. 创建自定义 Hook
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot
  );
  return isOnline;
}`}),e.jsx(o,{}),e.jsx(t,{children:e.jsx(r,{strong:!0,children:"适用场景："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"订阅浏览器 API（如网络状态、地理位置等）"}),e.jsx("li",{children:"订阅第三方状态管理库（Redux、MobX等）"}),e.jsx("li",{children:"订阅 WebSocket 或其他实时数据源"}),e.jsx("li",{children:"需要在并发渲染中保持数据一致性的场景"})]}),e.jsx(t,{children:e.jsx(r,{strong:!0,children:"注意事项："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"确保 subscribe 函数返回清理函数"}),e.jsx("li",{children:"getSnapshot 应该返回不可变的数据"}),e.jsx("li",{children:"避免在 getSnapshot 中进行复杂计算"}),e.jsx("li",{children:"考虑使用 selector 优化性能"})]})]})]})]});export{z as default};
