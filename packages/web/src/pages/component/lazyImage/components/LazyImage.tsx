import React, { useState, useEffect, useRef } from "react";
import { Image, Spin } from "antd";

interface Props {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  threshold?: number; // 触发加载的阈值
}

const LazyImage = ({
  src,
  alt = "",
  width = 200,
  height = 200,
  threshold = 0.5,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false); // 新增：记录图片是否已加载
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 创建观察者
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // 只在未加载且变为可见时触发一次
        if (!isLoaded && entry.isIntersecting) {
          setIsVisible(true);
          // 一旦触发加载，立即停止观察
          if (imgRef.current && observerRef.current) {
            observerRef.current.unobserve(imgRef.current);
          }
        }
      },
      {
        threshold,
      }
    );

    // 开始观察
    if (imgRef.current && !isLoaded) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      // 清理观察者
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, isLoaded]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      style={{
        position: "relative",
        width,
        height,
        background: "#f0f0f0",
      }}
    >
      {/* 已加载过的图片始终显示 */}
      {(isVisible || isLoaded) && (
        <>
          {isLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin />
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s",
            }}
            onLoad={handleImageLoad}
            preview={false}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;
