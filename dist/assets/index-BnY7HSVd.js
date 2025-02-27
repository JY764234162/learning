import{r,I as a,_ as d,G as e}from"./index-Gqy7a80Z.js";import{ae as h,L as x,af as l,ag as u}from"./index-Dn3wCLmq.js";import{D as o}from"./index-CO2Ul_Wc.js";import{T as j}from"./index-DQC2HMm7.js";var f={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"check-circle",theme:"outlined"},g=function(s,c){return r.createElement(a,d({},s,{ref:c,icon:f}))},p=r.forwardRef(g),m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832.6 191.4c-84.6-84.6-221.5-84.6-306 0l-96.9 96.9 51 51 96.9-96.9c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204l-96.9 96.9 51.1 51.1 96.9-96.9c84.4-84.6 84.4-221.5-.1-306.1zM446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l96.9-96.9-51.1-51.1-96.9 96.9c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l96.9-96.9-51-51-96.8 97zM260.3 209.4a8.03 8.03 0 00-11.3 0L209.4 249a8.03 8.03 0 000 11.3l554.4 554.4c3.1 3.1 8.2 3.1 11.3 0l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3L260.3 209.4z"}}]},name:"disconnect",theme:"outlined"},v=function(s,c){return r.createElement(a,d({},s,{ref:c,icon:m}))},S=r.forwardRef(v);function w(){return navigator.onLine}function E(n){return window.addEventListener("online",n),window.addEventListener("offline",n),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",n)}}function b(){return r.useSyncExternalStore(E,w)}const{Title:y,Paragraph:i,Text:t}=u,L=()=>{const n=b();return e.jsx(l,{style:{marginTop:16},children:e.jsxs(x,{direction:"vertical",children:[e.jsxs("div",{children:[e.jsx(t,{strong:!0,children:"当前网络状态："}),e.jsx(j,{color:n?"#52c41a":"#f5222d",style:{marginLeft:8},children:n?e.jsxs(e.Fragment,{children:[e.jsx(p,{})," 在线"]}):e.jsxs(e.Fragment,{children:[e.jsx(S,{})," 离线"]})})]}),e.jsx(t,{type:"secondary",children:"尝试切换网络连接（开启/关闭 WiFi）来查看状态变化"})]})})},z=()=>e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px"},children:[e.jsx(y,{level:2,children:"useSyncExternalStore Hook 演示"}),e.jsx(h,{type:"info",message:"什么是 useSyncExternalStore？",description:"useSyncExternalStore 是 React 18 引入的新 Hook，用于订阅外部数据源。它提供了一种安全的方式来读取和订阅外部数据，确保在并发渲染中数据的一致性。",showIcon:!0,style:{marginBottom:"20px"}}),e.jsxs(x,{direction:"vertical",style:{width:"100%"},children:[e.jsx(l,{title:"演示效果",children:e.jsx(L,{})}),e.jsxs(l,{title:"使用说明",children:[e.jsx(i,{children:e.jsx(t,{strong:!0,children:"Hook 参数说明："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"subscribe: 订阅函数，当数据源发生变化时调用回调"}),e.jsx("li",{children:"getSnapshot: 返回当前状态的函数"}),e.jsx("li",{children:"getServerSnapshot: (可选) 用于服务端渲染"})]}),e.jsx(o,{}),e.jsx(i,{children:e.jsx(t,{strong:!0,children:"代码示例："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`import { useSyncExternalStore } from 'react';

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
}`}),e.jsx(o,{}),e.jsx(i,{children:e.jsx(t,{strong:!0,children:"适用场景："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"订阅浏览器 API（如网络状态、地理位置等）"}),e.jsx("li",{children:"订阅第三方状态管理库（Redux、MobX等）"}),e.jsx("li",{children:"订阅 WebSocket 或其他实时数据源"}),e.jsx("li",{children:"需要在并发渲染中保持数据一致性的场景"})]}),e.jsx(i,{children:e.jsx(t,{strong:!0,children:"注意事项："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"确保 subscribe 函数返回清理函数"}),e.jsx("li",{children:"getSnapshot 应该返回不可变的数据"}),e.jsx("li",{children:"避免在 getSnapshot 中进行复杂计算"}),e.jsx("li",{children:"考虑使用 selector 优化性能"})]})]})]})]});export{z as default};
