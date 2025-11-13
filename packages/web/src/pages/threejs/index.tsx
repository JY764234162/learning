import React, { useRef } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  OrbitControls,
  useEnvironment,
} from "@react-three/drei";

const originPath = location.origin + location.pathname;

const gltfPath = originPath + "/threejs/xiaomi_su7/scene.gltf";

const environmentPath = originPath + "/threejs/balcony_1k.hdr";

function Model() {
  const { scene } = useGLTF(gltfPath);
  return <primitive object={scene} />;
}

useGLTF.preload(gltfPath);

export default function App() {
  return (
    <div style={{ height: 800, width: 800 }}>
      <Canvas camera={{ position: [10000, 20000, 10000], fov: 70 }}>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls
            enableZoom={true} // 允许缩放
            enablePan={true} // 允许平移
            enableRotate={true} // 允许旋转
            minDistance={2} // 最小缩放距离
            maxDistance={20} // 最大缩放距离
          />
          <Environment files={environmentPath} />
        </Suspense>
      </Canvas>
    </div>
  );
}
