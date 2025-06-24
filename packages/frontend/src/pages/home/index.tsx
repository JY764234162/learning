import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [routes, setRoutes] = useState<string[]>([]);

  useEffect(() => {
    // 使用相同的模块加载方式
    const modules = import.meta.glob("../*/index.tsx");

    // 提取路由名称
    const routeNames = Object.keys(modules)
      .map((path) => {
        const pathList = path.split("/");
        return pathList[pathList.length - 2];
      })
      .filter((name) => name !== "home"); // 排除当前home路由

    setRoutes(routeNames);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        项目路由导航
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {routes.map((route) => (
          <Link
            key={route}
            to={`/${route}`}
            style={{
              display: "block",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            {route}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
