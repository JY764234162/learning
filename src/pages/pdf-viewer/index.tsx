import { Divider, Flex } from "antd";
import React, { useEffect, useRef } from "react";
import svgAbout from "./icon/about_sgs.svg";
import contactAbout from "./icon/contact_me.svg";
import "./index.css";

export default function index() {
  const originPath =
    location.origin + location.pathname + "/pdfjs-5.1.91-dist/web/viewer.html";
  return (
    <Flex vertical style={{ height: "100vh" }}>
      <div className="header">
        <p>SGS IS THE RECOGNIZED GLOBAL</p>
        <p>BENCHMARK FOR QUALITY & INTEGRITY</p>
      </div>
      <Flex flex={1}>
        <embed
          style={{ width: "100%", height: "100%" }}
          src={originPath}
        ></embed>
      </Flex>

      <Flex className="tabbar">
        <Flex
          flex={1}
          gap={4}
          vertical
          className="tabbarItem"
          justify="center"
          align="center"
        >
          <img src={svgAbout}></img>
          <p>About SGS</p>
        </Flex>
        <div
          style={{
            margin: "16px 0",
            border: "0.01rem solid #dcdcdc",
            boxSizing: "content-box",
          }}
        />
        <Flex
          flex={1}
          gap={4}
          vertical
          className="tabbarItem"
          justify="center"
          align="center"
        >
          <img src={contactAbout}></img>
          <p>Contact us</p>
        </Flex>
      </Flex>
    </Flex>
  );
}
