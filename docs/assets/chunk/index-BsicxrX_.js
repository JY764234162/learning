import{r as a,j as e,T as d,B as c}from"../../main-BOLlNZH-.js";import{A as x}from"./index-BwMSiSxZ.js";import{S as p}from"./index-DTg1L3bG.js";import{C as l}from"./index-Dk1xyqhL.js";import"./ExclamationCircleFilled-0n3bTMwr.js";import"./InfoCircleFilled-DykvtHdN.js";const{Title:h,Paragraph:n,Text:i}=d,y=()=>{const t=a.useRef(null),s=()=>{t.current?.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),t.current?.animate({backgroundColor:["transparent","yellow","transparent"]},{duration:3e3,easing:"ease-in-out"})};return e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px"},children:[e.jsx(h,{level:2,children:"滚动和高亮效果演示"}),e.jsx(x,{type:"info",message:"什么是平滑滚动和高亮？",description:"平滑滚动（Smooth Scroll）是一种页面滚动效果，它可以让页面滚动更加流畅自然。结合元素高亮效果，可以帮助用户快速定位和关注重要内容。",showIcon:!0,style:{marginBottom:"20px"}}),e.jsxs(p,{direction:"vertical",style:{width:"100%"},children:[e.jsxs(l,{title:"演示效果",children:[e.jsx(c,{type:"primary",onClick:s,children:"滚动到目标元素"}),e.jsxs("div",{style:{height:"400px",border:"1px solid #f0f0f0",borderRadius:"8px",marginTop:"16px",overflow:"auto"},children:[Array(20).fill("").map((o,r)=>e.jsxs("div",{style:{padding:"16px",margin:"8px",background:"#fafafa",borderRadius:"4px"},children:["Item ",r+1]},`top-${r}`)),e.jsx("div",{ref:t,style:{padding:"20px",margin:"8px",background:"#fff",border:"1px solid #1890ff",borderRadius:"4px",textAlign:"center",fontWeight:"bold"},children:"目标元素"}),Array(20).fill("").map((o,r)=>e.jsxs("div",{style:{padding:"16px",margin:"8px",background:"#fafafa",borderRadius:"4px"},children:["Item ",r+21]},`bottom-${r}`))]})]}),e.jsxs(l,{title:"使用说明",children:[e.jsx(n,{children:e.jsx(i,{strong:!0,children:"API 说明："})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(i,{code:!0,children:"scrollIntoView()"}),": 将元素滚动到可视区域",e.jsxs("ul",{children:[e.jsx("li",{children:'behavior: "smooth" - 平滑滚动'}),e.jsx("li",{children:'block: "center" - 垂直居中对齐'}),e.jsx("li",{children:'inline: "center" - 水平居中对齐'})]})]}),e.jsxs("li",{children:[e.jsx(i,{code:!0,children:"element.animate()"}),": 创建动画效果",e.jsxs("ul",{children:[e.jsx("li",{children:"第一个参数定义关键帧"}),e.jsx("li",{children:"第二个参数设置动画配置"})]})]})]}),e.jsx(n,{children:e.jsx(i,{strong:!0,children:"代码示例："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`const targetRef = useRef<HTMLDivElement>(null);

// 滚动到目标元素
targetRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "center",
  inline: "center"
});

// 添加高亮动画
targetRef.current?.animate(
  {
    backgroundColor: ["transparent", "yellow", "transparent"]
  },
  {
    duration: 3000,
    easing: "ease-in-out"
  }
);`}),e.jsx(n,{children:e.jsx(i,{strong:!0,children:"注意事项："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"确保目标元素已经被渲染到DOM中"}),e.jsx("li",{children:"注意浏览器对这些API的兼容性支持"}),e.jsx("li",{children:"可以根据需要调整动画时间和效果"})]})]})]})]})};export{y as default};
