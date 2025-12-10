import React, { useRef, useState } from "react";

import "./index.css";

export const Component = () => {
  return (
    <div className="tabs-container">
      <Tabs></Tabs>
    </div>
  );
};

const Tabs = () => {
  const tabs = [
    { key: 1, name: "tab1" },
    { key: 2, name: "tab2" },
  ];
  const [activeTab, setActiveTab] = useState<string>("tab1");
  return (
    <>
      <div className="custom-tabs">
        {tabs.map((item) => {
          return (
            <div
              key={item.name}
              className={activeTab === item.name ? "active tab" : "tab"}
              onClick={() => {
                setActiveTab(item.name);
              }}
            >
              {item.name}
            </div>
          );
        })}
        <div className="bezier-container">
          <div
            className="bezier"
            style={{
              clipPath:
                activeTab === "tab1" ? 'path("M0 0 C30 0, 0 50,30 50 L 30 50 L0 50 z")' : 'path("M0 50 C30 50, 0 0,30 0 L 30 0 L30 50 z")',
            }}
          ></div>
        </div>
      </div>
      <div className="content">
        {activeTab === "tab1" && <div>tab1</div>}
        {activeTab === "tab2" && <div>tab2</div>}
      </div>
    </>
  );
};
