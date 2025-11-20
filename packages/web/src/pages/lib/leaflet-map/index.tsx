import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Card,
  Alert,
  Space,
  Form,
  Select,
  Slider,
  Button,
  Divider,
} from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// 修复 Leaflet 默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 预定义的地点
const locations = [
  { name: "北京", position: [39.9042, 116.4074], description: "中国首都" },
  { name: "上海", position: [31.2304, 121.4737], description: "中国最大城市" },
  { name: "广州", position: [23.1291, 113.2644], description: "广东省省会" },
  {
    name: "深圳",
    position: [22.5431, 114.0579],
    description: "中国科技创新中心",
  },
  { name: "杭州", position: [30.2741, 120.1551], description: "浙江省省会" },
];

// 地图样式
const mapStyles = [
  { name: "标准", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  { name: "地形", url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" },
  {
    name: "暗黑模式",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  },
];

export const Component = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState("北京");
  const [mapStyle, setMapStyle] = useState(mapStyles[0].url);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [polyline, setPolyline] = useState<L.Polyline | null>(null);
  const [circle, setCircle] = useState<L.Circle | null>(null);

  // 初始化地图
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView(
        [39.9042, 116.4074],
        zoomLevel
      );

      L.tileLayer(mapStyle, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // 添加点击事件
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            `你点击的位置: <br>纬度: ${lat.toFixed(4)}, 经度: ${lng.toFixed(4)}`
          )
          .openPopup();

        setMarkers((prev) => [...prev, marker]);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 更新地图样式
  useEffect(() => {
    if (mapRef.current) {
      // 移除旧图层
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          mapRef.current?.removeLayer(layer);
        }
      });

      // 添加新图层
      L.tileLayer(mapStyle, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }
  }, [mapStyle]);

  // 更新缩放级别
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoomLevel);
    }
  }, [zoomLevel]);

  // 切换位置
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    const location = locations.find((loc) => loc.name === value);

    if (location && mapRef.current) {
      mapRef.current.setView(
        location.position as L.LatLngExpression,
        zoomLevel
      );

      // 清除旧标记
      markers.forEach((marker) => {
        if (mapRef.current) marker.removeFrom(mapRef.current);
      });
      setMarkers([]);

      // 添加新标记
      const marker = L.marker(location.position as L.LatLngExpression)
        .addTo(mapRef.current)
        .bindPopup(`<b>${location.name}</b><br>${location.description}`)
        .openPopup();

      setMarkers([marker]);
    }
  };

  // 绘制路线
  const handleDrawRoute = () => {
    if (mapRef.current) {
      // 清除旧路线
      if (polyline) {
        polyline.removeFrom(mapRef.current);
      }

      // 获取所有位置的坐标
      const points = locations.map((loc) => loc.position);

      // 创建新路线
      const newPolyline = L.polyline(points as L.LatLngExpression[], {
        color: "blue",
        weight: 3,
        opacity: 0.7,
        dashArray: "10, 10",
      }).addTo(mapRef.current);

      // 调整视图以显示整个路线
      mapRef.current.fitBounds(newPolyline.getBounds());

      setPolyline(newPolyline);
    }
  };

  // 添加圆形区域
  const handleAddCircle = () => {
    if (mapRef.current) {
      // 清除旧圆形
      if (circle) {
        circle.removeFrom(mapRef.current);
      }

      const location = locations.find((loc) => loc.name === selectedLocation);

      if (location) {
        // 创建新圆形
        const newCircle = L.circle(location.position as L.LatLngExpression, {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.3,
          radius: 30000, // 30公里
        }).addTo(mapRef.current);

        setCircle(newCircle);
      }
    }
  };

  // 清除所有图层
  const handleClearLayers = () => {
    if (mapRef.current) {
      // 清除标记
      markers.forEach((marker) => {
        if (mapRef.current) marker.removeFrom(mapRef.current);
      });
      setMarkers([]);

      // 清除路线
      if (polyline) {
        polyline.removeFrom(mapRef.current);
        setPolyline(null);
      }

      // 清除圆形
      if (circle) {
        circle.removeFrom(mapRef.current);
        setCircle(null);
      }
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Leaflet 地图演示</Title>

      <Alert
        type="info"
        message="什么是 Leaflet？"
        description="Leaflet 是一个开源的 JavaScript 库，用于创建移动友好的交互式地图。它体积小但功能强大，可以轻松地在网页中嵌入地图，支持各种地图提供商的图层，并可以添加标记、弹出窗口、线条和形状等交互元素。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="地图控制面板">
          <Form layout="vertical">
            <Form.Item label="选择位置">
              <Select
                value={selectedLocation}
                onChange={handleLocationChange}
                style={{ width: "100%" }}
              >
                {locations.map((loc) => (
                  <Option key={loc.name} value={loc.name}>
                    {loc.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="地图样式">
              <Select
                value={mapStyle}
                onChange={setMapStyle}
                style={{ width: "100%" }}
              >
                {mapStyles.map((style) => (
                  <Option key={style.name} value={style.url}>
                    {style.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="缩放级别">
              <Slider
                min={3}
                max={18}
                value={zoomLevel}
                onChange={setZoomLevel}
                marks={{
                  3: "远",
                  10: "中",
                  18: "近",
                }}
              />
            </Form.Item>

            <Space>
              <Button type="primary" onClick={handleDrawRoute}>
                绘制路线
              </Button>
              <Button onClick={handleAddCircle}>添加圆形区域</Button>
              <Button danger onClick={handleClearLayers}>
                清除图层
              </Button>
            </Space>
          </Form>
        </Card>

        <Card title="地图展示">
          <div
            ref={mapContainerRef}
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          />
          <Paragraph style={{ marginTop: "10px" }}>
            <Text type="secondary">
              提示: 点击地图任意位置添加标记，拖动可平移地图，滚轮可缩放
            </Text>
          </Paragraph>
        </Card>

        <Card title="功能说明">
          <Paragraph>
            <Text strong>Leaflet 主要功能：</Text>
          </Paragraph>
          <ul>
            <li>支持多种地图提供商和样式</li>
            <li>添加标记、弹出窗口、线条和形状</li>
            <li>支持地图事件（点击、拖动等）</li>
            <li>移动设备友好，支持触摸交互</li>
            <li>可自定义图标和样式</li>
            <li>支持 GeoJSON 数据</li>
            <li>轻量级，核心仅约 39KB</li>
          </ul>

          <Divider />

          <Paragraph>
            <Text strong>使用场景：</Text>
          </Paragraph>
          <ul>
            <li>位置服务和导航应用</li>
            <li>天气和环境数据可视化</li>
            <li>资产和车辆跟踪</li>
            <li>地理数据分析</li>
            <li>旅游和景点指南</li>
            <li>房地产和物业展示</li>
          </ul>
        </Card>

        <Card title="代码示例">
          <Paragraph>
            <Text strong>基本设置：</Text>
          </Paragraph>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`// 安装依赖
npm install leaflet react-leaflet

// 引入样式
import 'leaflet/dist/leaflet.css';

// 修复默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});`}
          </pre>

          <Paragraph style={{ marginTop: "16px" }}>
            <Text strong>创建地图：</Text>
          </Paragraph>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            {`// 初始化地图
const map = L.map('map-container').setView([39.9042, 116.4074], 10);

// 添加图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19,
}).addTo(map);

// 添加标记
const marker = L.marker([39.9042, 116.4074])
  .addTo(map)
  .bindPopup("<b>北京</b><br>中国首都")
  .openPopup();

// 添加点击事件
map.on('click', (e) => {
  const { lat, lng } = e.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(\`点击位置: \${lat.toFixed(4)}, \${lng.toFixed(4)}\`)
    .openPopup();
});`}
          </pre>
        </Card>
      </Space>
    </div>
  );
};

