import{r,I as h,_ as p,G as e}from"./index-Gqy7a80Z.js";import{ae as g,L as d,af as a,ag as f}from"./index-Dn3wCLmq.js";import{B as u}from"./button-yQPWasjd.js";import{D as c}from"./index-CO2Ul_Wc.js";import{I as j}from"./index-BSuUmI08.js";import"./EyeOutlined-BSh2KQs6.js";var v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"}}]},name:"send",theme:"outlined"},y=function(i,s){return r.createElement(h,p({},i,{ref:s,icon:v}))},R=r.forwardRef(y);const{Title:M,Paragraph:o,Text:t}=f,{TextArea:T}=j,C=()=>{const[l,i]=r.useState("Hello from client!"),[s,S]=r.useState([]);r.useEffect(()=>{},[]);const m=()=>{};return e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px"},children:[e.jsx(M,{level:2,children:"Vite HMR 通信演示"}),e.jsx(g,{type:"info",message:"什么是 Vite HMR 通信？",description:"Vite 的热模块替换（HMR）不仅支持模块的热更新，还提供了客户端和开发服务器之间的双向通信机制。这使得我们可以在开发过程中实现更复杂的调试和开发功能。",showIcon:!0,style:{marginBottom:"20px"}}),e.jsxs(d,{direction:"vertical",style:{width:"100%"},children:[e.jsx(a,{title:"演示效果",children:e.jsxs(d,{direction:"vertical",style:{width:"100%"},children:[e.jsxs("div",{children:[e.jsx(t,{strong:!0,children:"发送消息到服务器："}),e.jsx(T,{value:l,onChange:n=>i(n.target.value),style:{marginTop:8},rows:4}),e.jsx(u,{type:"primary",icon:e.jsx(R,{}),onClick:m,style:{marginTop:8},children:"发送消息"})]}),e.jsxs("div",{style:{marginTop:16},children:[e.jsx(t,{strong:!0,children:"服务器响应："}),e.jsx(a,{size:"small",style:{marginTop:8,background:"#f6f8fa"},children:s.length>0?s.map((n,x)=>e.jsx("div",{children:n},x)):e.jsx(t,{type:"secondary",children:"等待服务器响应..."})})]})]})}),e.jsxs(a,{title:"使用说明",children:[e.jsx(o,{children:e.jsx(t,{strong:!0,children:"配置说明："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`// vite.config.ts
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
})`}),e.jsx(c,{}),e.jsx(o,{children:e.jsx(t,{strong:!0,children:"客户端代码示例："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`// 发送消息到服务器
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
}`}),e.jsx(c,{}),e.jsx(o,{children:e.jsx(t,{strong:!0,children:"注意事项："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"HMR 通信仅在开发环境下可用"}),e.jsx("li",{children:"确保消息事件名称不与 Vite 内部事件冲突"}),e.jsx("li",{children:"避免发送过大的数据量"}),e.jsx("li",{children:"注意处理连接断开的情况"})]})]})]})]})};export{C as default};
