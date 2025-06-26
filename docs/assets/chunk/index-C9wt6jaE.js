import{r as c,j as e,T as b}from"../../main-BlCRUK_t.js";import{A as y}from"./index-CKsG6O6H.js";import{S as T}from"./index-GBvwWiiJ.js";import{C as l}from"./index-GOI5znzU.js";import{A}from"./index-Bi5nGMSv.js";import"./ExclamationCircleFilled-CGcv2Jpt.js";import"./InfoCircleFilled-COxLlW03.js";import"./useBreakpoint-BqMRNNiH.js";import"./useForceUpdate-BsmW47p2.js";import"./index-Cwgzcrfh.js";const E="_listContainer_xk6cd_1",R={listContainer:E},{Title:S,Paragraph:s,Text:n}=b,B=()=>{const a=c.useRef(null),[i,g]=c.useState([{id:"1",content:"拖拽项目 1",color:"#ff4d4f"},{id:"2",content:"拖拽项目 2",color:"#1890ff"},{id:"3",content:"拖拽项目 3",color:"#52c41a"},{id:"4",content:"拖拽项目 4",color:"#faad14"},{id:"5",content:"拖拽项目 5",color:"#722ed1"}]),x=r=>{const t=r.currentTarget.dataset.id||"";r.dataTransfer.setData("text/plain",t),r.currentTarget.style.opacity="0.5",a.current=t,console.log("拖动开始...",t)},h=r=>{},p=r=>{r.preventDefault()},u=r=>{if(r.target.hasAttribute("draggable")){const t=r.currentTarget.dataset.id,I=i.findIndex(d=>d.id===t),D=i.findIndex(d=>d.id===a.current);g(d=>{const o=[...d],[v]=o.splice(D,1);return o.splice(I,0,v),o})}},j=r=>{},m=r=>{const t=r.currentTarget.dataset.id;console.log("放置结束",t)},f=r=>{const t=r.currentTarget.dataset.id;console.log("拖拽结束",t),a.current=null,r.currentTarget.style.opacity="1"};return e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"20px"},children:[e.jsx(S,{level:2,children:"原生拖拽 API 演示"}),e.jsx(y,{type:"info",message:"什么是原生拖拽 API？",description:"HTML5 原生拖拽 API 提供了一种标准化的方式来实现拖放功能，无需额外库。通过定义拖拽源（draggable）和拖拽目标（drop target），以及处理各种拖拽事件（dragstart、dragover、drop等），可以实现丰富的交互体验。",showIcon:!0,style:{marginBottom:"20px"}}),e.jsxs(T,{direction:"vertical",style:{width:"100%"},children:[e.jsx(l,{title:"演示效果",children:e.jsx("div",{className:R.listContainer,children:i.map((r,t)=>e.jsx("div",{"data-id":r.id,"data-index":t,draggable:!0,onDragStart:x,onDrag:h,onDragOver:p,onDragEnter:u,onDragLeave:j,onDrop:m,onDragEnd:f,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",padding:"10px",gap:8,border:"1px solid #e0e0e0",borderRadius:8,background:"#fff",pointerEvents:"none",boxSizing:"border-box"},children:[e.jsx(A,{draggable:!1,style:{background:r.color},children:r.id}),r.content]})},r.id))})}),e.jsxs(l,{title:"功能说明",children:[e.jsx(s,{children:e.jsx(n,{strong:!0,children:"实现功能："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"列表项拖拽排序"}),e.jsx("li",{children:"拖拽时的视觉反馈"}),e.jsx("li",{children:"完全使用原生 HTML5 拖拽 API"}),e.jsx("li",{children:"无需任何第三方拖拽库"})]})]}),e.jsxs(l,{title:"使用说明",children:[e.jsx(s,{children:e.jsx(n,{strong:!0,children:"原生拖拽 API 的主要事件："})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(n,{code:!0,children:"dragstart"}),"：开始拖拽元素时触发"]}),e.jsxs("li",{children:[e.jsx(n,{code:!0,children:"dragover"}),"：拖拽元素经过有效放置目标时触发"]}),e.jsxs("li",{children:[e.jsx(n,{code:!0,children:"dragenter"}),"：拖拽元素进入有效放置目标时触发"]}),e.jsxs("li",{children:[e.jsx(n,{code:!0,children:"dragleave"}),"：拖拽元素离开有效放置目标时触发"]}),e.jsxs("li",{children:[e.jsx(n,{code:!0,children:"drop"}),"：放置拖拽元素时触发"]}),e.jsxs("li",{children:[e.jsx(n,{code:!0,children:"dragend"}),"：拖拽操作结束时触发"]})]}),e.jsx(s,{children:e.jsx(n,{strong:!0,children:"代码示例："})}),e.jsx("pre",{style:{background:"#f6f8fa",padding:"16px",borderRadius:"6px"},children:`// 设置元素可拖拽
<div 
  draggable={true}
  onDragStart={handleDragStart}
  onDragOver={handleDragOver}
  onDragEnter={handleDragEnter}
  onDrop={handleDrop}
  onDragEnd={handleDragEnd}
>
  可拖拽元素
</div>

// 处理拖拽事件
const handleDragStart = (e, index) => {
  // 记录拖拽项的索引
  dragItemRef.current = index;
  
  // 可以设置拖拽数据
  e.dataTransfer.setData("text/plain", id);
};

// 允许放置（必须阻止默认行为）
const handleDragOver = (e) => {
  e.preventDefault();
};

// 记录当前拖拽到的位置
const handleDragEnter = (index) => {
  dragOverItemRef.current = index;
};

// 处理放置逻辑
const handleDrop = () => {
  // 获取拖拽项和目标项的索引
  const dragIndex = dragItemRef.current;
  const dropIndex = dragOverItemRef.current;
  
  // 创建新数组并重新排序
  const newItems = [...items];
  const draggedItem = newItems[dragIndex];
  
  newItems.splice(dragIndex, 1);
  newItems.splice(dropIndex, 0, draggedItem);
  
  // 更新状态
  setItems(newItems);
};`}),e.jsx(s,{children:e.jsx(n,{strong:!0,children:"注意事项："})}),e.jsxs("ul",{children:[e.jsx("li",{children:"必须在 dragover 事件中调用 preventDefault() 才能使元素成为有效的放置目标"}),e.jsx("li",{children:"使用 ref 记录拖拽项和目标项的索引，避免在事件处理中依赖状态闭包"}),e.jsx("li",{children:"提供视觉反馈可以增强用户体验，如改变拖拽中项目的透明度"}),e.jsx("li",{children:"如果需要跨窗口或应用拖拽，可以使用 dataTransfer 对象传递数据"})]})]})]})]})};export{B as default};
