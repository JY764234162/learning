import React, { useEffect, useRef, useState } from "react";

interface ChatBubbleSvgProps {
  // 聊天框宽度
  width?: number;
  // 聊天框高度
  height?: number;
  // 圆角大小
  borderRadius?: number;
  // 描边宽度
  strokeWidth?: number;
  // 是否显示描边
  showStroke?: boolean;
  // 底部箭头宽度
  arrowWidth?: number;
  // 底部箭头高度
  arrowHeight?: number;
  // 是否需要动画效果
  enableAnimation?: boolean;
  // 渐变起始颜色
  gradientStartColor?: string;
  // 渐变结束颜色
  gradientEndColor?: string;
  // 填充颜色，默认为#ccc
  fillColor?: string;
  // 填充内容
  children?: React.ReactNode;
}

/**
 * 可自定义的聊天框SVG组件
 * 允许通过props控制宽度、高度、圆角、描边宽度、箭头大小等参数
 */
const ChatBubbleSvg: React.FC<ChatBubbleSvgProps> = ({
  width = 200,
  height = 130,
  borderRadius = 20,
  strokeWidth = 4,
  arrowWidth = 40,
  arrowHeight = 30,
  enableAnimation = false,
  showStroke = true,
  gradientStartColor = "red",
  gradientEndColor = "blue",
  fillColor = "#ccc",
  children,
}) => {
  const ref = useRef<SVGPathElement>(null);
  const animRef = useRef<Animation>();
  const [pathLength, setPathLength] = useState(0);

  // 用于测量内容尺寸的隐藏容器
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  // 动态计算实际使用的宽高
  const actualWidth = children ? contentSize.width + strokeWidth * 2 + 40 : width;
  const actualHeight = children ? contentSize.height + strokeWidth * 2 + 40 : height;

  // 计算SVG视口尺寸，需要考虑描边宽度和箭头
  const effectiveHeight = actualHeight + arrowHeight + strokeWidth * 2;

  // 计算聊天框路径
  const generatePath = () => {
    // 调整内部边距，确保圆角效果正常显示
    const padding = strokeWidth / 2;
    const innerWidth = actualWidth - padding * 2;
    const innerHeight = actualHeight - padding * 2;

    // 箭头中心点
    const arrowCenterX = actualWidth / 2;
    const arrowTopY = actualHeight + padding;
    const arrowBottomY = arrowTopY + arrowHeight;

    // 计算精确的起点坐标
    const startX = padding + borderRadius;
    const startY = padding;

    // 路径命令 - 使用更精确的坐标计算和舍入，确保路径闭合
    return `
      M ${startX.toFixed(2)} ${startY.toFixed(2)} 
      L ${(padding + innerWidth - borderRadius).toFixed(2)} ${startY.toFixed(2)} 
      A ${borderRadius} ${borderRadius} 0 0 1 ${(padding + innerWidth).toFixed(2)} ${(padding + borderRadius).toFixed(2)} 
      L ${(padding + innerWidth).toFixed(2)} ${(padding + innerHeight - borderRadius).toFixed(2)} 
      A ${borderRadius} ${borderRadius} 0 0 1 ${(padding + innerWidth - borderRadius).toFixed(2)} ${(padding + innerHeight).toFixed(2)} 
      L ${(arrowCenterX + arrowWidth / 2).toFixed(2)} ${(padding + innerHeight).toFixed(2)} 
      L ${arrowCenterX.toFixed(2)} ${arrowBottomY.toFixed(2)} 
      L ${(arrowCenterX - arrowWidth / 2).toFixed(2)} ${(padding + innerHeight).toFixed(2)} 
      L ${(padding + borderRadius).toFixed(2)} ${(padding + innerHeight).toFixed(2)} 
      A ${borderRadius} ${borderRadius} 0 0 1 ${padding.toFixed(2)} ${(padding + innerHeight - borderRadius).toFixed(2)} 
      L ${padding.toFixed(2)} ${(padding + borderRadius).toFixed(2)} 
      A ${borderRadius} ${borderRadius} 0 0 1 ${startX.toFixed(2)} ${startY.toFixed(2)} Z
    `
      .replace(/\s+/g, " ")
      .trim();
  };

  const [svgWidth, setSvgWidth] = useState(width);

  // 用于测量内容尺寸的效果
  useEffect(() => {
    if (children && contentContainerRef.current) {
      const { offsetWidth } = contentContainerRef.current;

      // 根据内容宽度重新计算SVG宽度
      const newSvgWidth = Math.max(width, offsetWidth + strokeWidth * 2 + 40);
      setSvgWidth(newSvgWidth);
    } else {
      setSvgWidth(width);
    }
  }, [children, width, strokeWidth]);

  // 如果启用动画，计算路径长度
  useEffect(() => {
    if (enableAnimation && ref.current) {
      const length = ref.current.getTotalLength();
      setPathLength(length);
    }
  }, [enableAnimation, actualWidth, actualHeight, borderRadius, arrowWidth, arrowHeight]);

  // 开始动画
  useEffect(() => {
    if (enableAnimation && ref.current && pathLength > 0) {
      const anim = ref.current.animate(
        {
          strokeDashoffset: [pathLength, 0],
        },
        {
          duration: 2000,
          easing: "ease-in-out",
        }
      );
      animRef.current = anim;

      return () => {
        if (animRef.current) {
          animRef.current.cancel();
        }
      };
    }
  }, [enableAnimation, pathLength]);

  // 测量内容尺寸
  useEffect(() => {
    const measureContent = () => {
      if (children && contentContainerRef.current) {
        const { offsetWidth, offsetHeight } = contentContainerRef.current;
        setContentSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    measureContent();

    // 使用 ResizeObserver 监听内容变化
    if (contentContainerRef.current && typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(measureContent);
      resizeObserver.observe(contentContainerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [children]);

  return (
    <>
      {/* 用于测量内容尺寸的隐藏容器 */}
      {children && (
        <div
          ref={contentContainerRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            width: "auto",
            height: "auto",
            display: "inline-block",
          }}
        >
          {children}
        </div>
      )}

      <svg width={actualWidth + strokeWidth * 2} height={effectiveHeight} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chatBubbleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientStartColor} />
            <stop offset="100%" stopColor={gradientEndColor} />
          </linearGradient>
        </defs>
        {/* 聊天框背景路径 */}
        <path
          ref={ref}
          d={generatePath()}
          stroke={showStroke ? "url(#chatBubbleGradient)" : "none"}
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeLinecap="round"
          strokeDasharray={enableAnimation ? pathLength : "none"}
          strokeDashoffset={enableAnimation ? 0 : "none"}
        />

        {/* 使用foreignObject来渲染React内容 */}
        {children && (
          <foreignObject x={strokeWidth} y={strokeWidth} width={actualWidth - 2 * strokeWidth} height={actualHeight - 2 * strokeWidth}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              {children}
            </div>
          </foreignObject>
        )}
      </svg>
    </>
  );
};

export default ChatBubbleSvg;
