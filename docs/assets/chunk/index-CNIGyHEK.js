import{r as s,j as e,T as x,B as h}from"../../main-DzykU_cl.js";import{A as g}from"./index-CF7E4fOl.js";import{S as l}from"./index-048wQVRF.js";import{C as i}from"./index-DyYjffXN.js";import{I as f}from"./index-jOViFo-U.js";import{R as j}from"./SendOutlined-d3glIB2J.js";import{D as a}from"./index-AlUrJFWq.js";import"./ExclamationCircleFilled-C864b64l.js";import"./InfoCircleFilled-BJKSyOCY.js";import"./Input-DM8HmW6e.js";import"./EyeOutlined-DxJGTue0.js";import"./SearchOutlined-BAcjJbDy.js";const{Title:u,Paragraph:o,Text:r}=x,{TextArea:v}=f,B=()=>{const[d,c]=s.useState("Hello from client!"),[n,y]=s.useState([]);s.useEffect(()=>{},[]);const m=()=>{};return e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px"},children:[e.jsx(u,{level:2,children:"Vite HMR 通信演示"}),e.jsx(g,{type:"info",message:"什么是 Vite HMR 通信？",description:"Vite 的热模块替换（HMR）不仅支持模块的热更新，还提供了客户端和开发服务器之间的双向通信机制。这使得我们可以在开发过程中实现更复杂的调试和开发功能。",showIcon:!0,style:{marginBottom:"20px"}}),e.jsxs(l,{direction:"vertical",style:{width:"100%"},children:[e.jsx(i,{title:"演示效果",children:e.jsxs(l,{direction:"vertical",style:{width:"100%"},children:[e.jsxs("div",{children:[e.jsx(r,{strong:!0,children:"发送消息到服务器："}),e.jsx(v,{value:d,onChange:t=>c(t.target.value),style:{marginTop:8},rows:4}),e.jsx(h,{type:"primary",icon:e.jsx(j,{}),onClick:m,style:{marginTop:8},children:"发送消息"})]}),e.jsxs("div",{style:{marginTop:16},children:[e.jsx(r,{strong:!0,children:"服务器响应："}),e.jsx(i,{size:"small",style:{marginTop:8,background:"#f6f8fa"},children:n.length>0?n.map((t,p)=>e.jsx("div",{children:t},p)):e.jsx(r,{type:"secondary",children:"等待服务器响应..."})})]})]})}),e.jsxs(i,{title:"使用说明",children:[e.jsx(o,{children:e.jsx(r,{strong:!0,children:"配置说明："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`// vite.config.ts
export default defineConfig({
  server: {
    hmr: {
      // 配置 HMR 连接
      host: 'localhost',
      port: 3000,
    },
  },
  plugins: [{
    name: 'hmr-communication',
    configureServer(server) {
      server.ws.on('vite:from-client', (data, client) => {
        // 处理来自客户端的消息
        console.log('收到客户端消息:', data.msg);
        // 发送响应回客户端
        client.send('vite:from-server', {
          msg: \`服务器收到消息: \${data.msg}\`
        });
      });
    }
  }]
})`}),e.jsx(a,{}),e.jsx(o,{children:e.jsx(r,{strong:!0,children:"客户端代码示例："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`// 发送消息到服务器
if (import.meta.hot) {
  import.meta.hot.send('vite:from-client', {
    msg: 'Hello from client!'
  });
}

// 监听服务器消息
if (import.meta.hot) {
  import.meta.hot.on('vite:from-server', (data) => {
    console.log('收到服务器消息:', data.msg);
  });
}`}),e.jsx(a,{}),e.jsx(o,{children:e.jsx(r,{strong:!0,children:"注意事项："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"HMR 通信仅在开发环境下可用"}),e.jsx("li",{children:"确保消息事件名称不与 Vite 内部事件冲突"}),e.jsx("li",{children:"避免发送过大的数据量"}),e.jsx("li",{children:"注意处理连接断开的情况"})]})]})]})]})};export{B as default};
