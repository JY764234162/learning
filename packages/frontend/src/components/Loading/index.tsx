import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
                color: "#1890ff",
              }}
              spin
            />
          }
        />
      </div>
    </div>
  ); 
};

export default Loading;
