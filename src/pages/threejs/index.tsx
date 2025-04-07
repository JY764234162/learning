import React, { useRef } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls } from "@react-three/drei";

const originPath = location.origin + location.pathname;

const gltfPath = originPath + "/xiaomi_su7/scene.gltf";

function Model() {
  const groupRef = useRef();
  const { scene } = useGLTF(gltfPath);
  return <primitive object={scene} />;
}

useGLTF.preload(gltfPath);

export default function App() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas camera={{ position: [10000, 20000, 10000], fov: 100 }}>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls
            enableZoom={true} // 允许缩放
            enablePan={true} // 允许平移
            enableRotate={true} // 允许旋转
            minDistance={2} // 最小缩放距离
            maxDistance={20} // 最大缩放距离
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
