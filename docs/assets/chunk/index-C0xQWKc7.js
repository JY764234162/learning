import{r as o,j as e,T as m,l as f,B as l}from"../../main-DzykU_cl.js";import{A as g}from"./index-CF7E4fOl.js";import{S as d}from"./index-048wQVRF.js";import{C as i}from"./index-DyYjffXN.js";import{D as a}from"./index-AlUrJFWq.js";import"./ExclamationCircleFilled-C864b64l.js";import"./InfoCircleFilled-BJKSyOCY.js";let s=0;function S(t,n){return{connect(){console.log('✅ 连接到 "'+n+'" 聊天室，位于'+t+"..."),s++,console.log("活跃连接数: "+s)},disconnect(){console.log('❌ 断开 "'+n+'" 聊天室，位于'+t),s--,console.log("活跃连接数: "+s)}}}const{Title:y,Paragraph:r,Text:c}=m,M="https://localhost:1234",x="general",C=()=>(o.useEffect(()=>{const t=S(M,x);return t.connect(),()=>t.disconnect()},[]),e.jsxs(i,{style:{marginTop:16},children:[e.jsxs(c,{children:["当前连接到 ",x," 聊天室"]}),e.jsx("div",{style:{color:"#666",marginTop:8},children:"请查看控制台以观察连接/断开的过程"})]})),b=()=>{const[t,n]=o.useState(!1),[h,j]=o.useState(0),p=()=>{n(!1),setTimeout(()=>{j(u=>u+1),n(!0)},100)};return e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px"},children:[e.jsx(y,{level:2,children:"React Strict Mode 演示"}),e.jsx(g,{type:"info",message:"什么是 Strict Mode？",description:"Strict Mode 是 React 的开发模式工具，用于突出显示应用程序中潜在的问题。它通过故意双重调用某些生命周期方法和 Hooks，帮助发现副作用清理不当的问题。",showIcon:!0,style:{marginBottom:"20px"}}),e.jsxs(d,{direction:"vertical",style:{width:"100%"},children:[e.jsx(i,{title:"演示效果",extra:e.jsxs(d,{children:[e.jsx(l,{type:"primary",onClick:()=>n(!t),children:t?"断开连接":"建立连接"}),e.jsx(l,{onClick:p,disabled:!t,children:"重新连接"})]}),children:e.jsx(f.StrictMode,{children:t&&e.jsx(C,{},h)})}),e.jsxs(i,{title:"使用说明",children:[e.jsx(r,{children:e.jsx(c,{strong:!0,children:"Strict Mode 会检查："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"意外的副作用"}),e.jsx("li",{children:"过时的生命周期方法"}),e.jsx("li",{children:"不安全的生命周期方法"}),e.jsx("li",{children:"过时的 API 使用"})]}),e.jsx(a,{}),e.jsx(r,{children:e.jsx(c,{strong:!0,children:"代码示例："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`// 1. 启用 Strict Mode
<React.StrictMode>
  <App />
</React.StrictMode>

// 2. 正确处理副作用清理
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  
  return () => {
    connection.disconnect(); // 清理副作用
  };
}, []);`}),e.jsx(a,{}),e.jsx(r,{children:e.jsx(c,{strong:!0,children:"注意事项："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"Strict Mode 只在开发环境下生效"}),e.jsx("li",{children:"组件的 useEffect 会被调用两次"}),e.jsx("li",{children:"必须正确清理所有副作用"}),e.jsx("li",{children:"可以帮助发现内存泄漏问题"})]})]})]})]})};export{b as default};
