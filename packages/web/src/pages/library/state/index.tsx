import React from "react";
import { useAtom } from "jotai";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, Alert, Space, Button, Divider } from "antd";
import { countAtom, fetchDataAtom, asyncDataAtom } from "./state/jotai";
import { incremented, decremented, fetchRandomData, reset, RootState, AppDispatch } from "./state/redux";
import { useCountStore } from "./state/zustand";

import "./style.css";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { store } from "./state/redux";

const { Title, Paragraph, Text } = Typography;

const StateManagement = () => {
  // Jotai
  const [jotaiCount, setJotaiCount] = useAtom(countAtom);
  const [jotaiAsyncState, setJotaiAsyncState] = useAtom(fetchDataAtom);

  // Redux
  const reduxState = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  // Zustand
  const {
    count: zustandCount,
    loading: zustandLoading,
    increment: zustandIncrement,
    reset: zustandReset,
    error: zustandError,
  } = useCountStore();
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>状态管理演示</Title>

      <Alert
        type="info"
        message="什么是状态管理？"
        description="状态管理是前端应用中管理和维护应用状态的方法。在 React 生态中，有多种状态管理方案，如 Redux、Zustand、Jotai 等，它们各有特点，适用于不同的场景。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="Jotai 状态管理">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div className="state-card">
              <Paragraph>
                <Text strong>当前计数: </Text>
                <Text>{jotaiCount}</Text>
              </Paragraph>
              <Space>
                <Button onClick={() => setJotaiCount((c) => c + 1)}>增加</Button>
                <Button onClick={() => setJotaiCount((c) => c - 1)}>减少</Button>
                <Button onClick={() => setJotaiCount(0)}>重置</Button>
              </Space>
            </div>

            <Divider />

            <div className="state-card">
              <Paragraph>
                <Text strong>异步数据: </Text>
                <Text>{jotaiAsyncState.loading ? "加载中..." : jotaiAsyncState.data || "无数据"}</Text>
              </Paragraph>
              {jotaiAsyncState.error && <Paragraph className="error-message">{jotaiAsyncState.error}</Paragraph>}
              <Button onClick={() => setJotaiAsyncState()} disabled={jotaiAsyncState.loading} type="primary">
                获取异步数据
              </Button>
            </div>
          </Space>
        </Card>

        <Card title="Redux 状态管理">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div className="state-card">
              <Paragraph>
                <Text strong>当前计数: </Text>
                <Text>{reduxState.value}</Text>
              </Paragraph>
              <Space>
                <Button onClick={() => dispatch(incremented())}>增加</Button>
                <Button onClick={() => dispatch(decremented())}>减少</Button>
                <Button onClick={() => dispatch(reset())}>重置</Button>
              </Space>
            </div>

            <Divider />

            <div className="state-card">
              <Paragraph>
                <Text strong>异步数据: </Text>
                <Text>{reduxState.loading ? "加载中..." : reduxState.asyncData !== null ? `${reduxState.asyncData}` : "无数据"}</Text>
              </Paragraph>
              {reduxState.error && <Paragraph className="error-message">{reduxState.error}</Paragraph>}
              <Button onClick={() => dispatch(fetchRandomData())} disabled={reduxState.loading} type="primary">
                获取异步数据
              </Button>
            </div>
          </Space>
        </Card>

        <Card title="Zustand 状态管理">
          <div className="state-card">
            <Paragraph>
              <Text strong>当前数值: </Text>
              <Text>{zustandCount.toFixed(2)}</Text>
            </Paragraph>
            {zustandError && <Paragraph className="error-message">{zustandError}</Paragraph>}
            <Space>
              <Button onClick={zustandIncrement} disabled={zustandLoading} type="primary">
                {zustandLoading ? "加载中..." : "生成随机数"}
              </Button>
              <Button onClick={zustandReset}>重置</Button>
            </Space>
          </div>
        </Card>

        <Card title="状态管理对比">
          <Paragraph>
            <Text strong>三种状态管理的异步特点：</Text>
          </Paragraph>
          <ul className="feature-list">
            <li>
              <Text strong>Jotai: </Text>
              使用原子化方式处理异步，可以直接在原子中定义异步逻辑
            </li>
            <li>
              <Text strong>Redux: </Text>
              使用 createAsyncThunk 处理异步，结合 extraReducers 处理不同状态
            </li>
            <li>
              <Text strong>Zustand: </Text>
              直接在 store 中定义异步方法，使用简单直观
            </li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

export const Component = () => {
  a();
  return (
    <Provider store={store}>
      <RecoilRoot>
        <StateManagement />
      </RecoilRoot>
    </Provider>
  );
};

const a = () => {
  // Zustand
  const { error: zustandError } = useCountStore();
  console.log(zustandError);
};
