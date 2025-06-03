import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface PerformanceMetric {
  name: string;
  value: number | string;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
  pageUrl: string;
  unit?: string;
}

interface PerformanceState {
  metrics: PerformanceMetric[];
  addMetric: (metric: Omit<PerformanceMetric, "timestamp" | "pageUrl">) => void;
  clearMetrics: () => void;
}

const getMetricRating = (
  name: string,
  value: number
): "good" | "needs-improvement" | "poor" => {
  const thresholds = {
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    DOMContentLoaded: { good: 2000, poor: 4000 },
    Load: { good: 3000, poor: 6000 },
    ResourceCount: { good: 30, poor: 60 },
    ResourceSize: { good: 2 * 1024 * 1024, poor: 5 * 1024 * 1024 },
    ResourceLoadTime: { good: 3000, poor: 6000 },
    ScriptExecutionTime: { good: 1000, poor: 2000 },
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return "good";

  if (value <= threshold.good) return "good";
  if (value >= threshold.poor) return "poor";
  return "needs-improvement";
};

export const usePerformanceStore = create<PerformanceState>()(
  devtools(
    (set) => ({
      metrics: [],
      addMetric: (metric) =>
        set((state) => {
          const newMetric = {
            ...metric,
            timestamp: Date.now(),
            pageUrl: window.location.pathname,
          };

          // 过滤掉同一页面同一指标的旧数据，只保留最新的
          const filteredMetrics = state.metrics.filter(
            (m) =>
              !(m.name === newMetric.name && m.pageUrl === newMetric.pageUrl)
          );

          return {
            metrics: [...filteredMetrics, newMetric],
          };
        }),
      clearMetrics: () => set({ metrics: [] }),
    }),
    {
      name: "performance-store",
    }
  )
);

// 辅助函数：格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

export const initializePerformanceMonitoring = () => {
  const { addMetric } = usePerformanceStore.getState();
  const observers: PerformanceObserver[] = [];

  try {
    // FCP 观察器
    const fcpObserver = new PerformanceObserver((list) => {
      const entry = list.getEntries()[0];
      if (entry) {
        addMetric({
          name: "FCP",
          value: entry.startTime,
          rating: getMetricRating("FCP", entry.startTime),
        });
      }
    });
    fcpObserver.observe({ entryTypes: ["paint"] });
    observers.push(fcpObserver);

    // LCP 观察器
    const lcpObserver = new PerformanceObserver((list) => {
      const entry = list.getEntries().at(-1);
      if (entry) {
        addMetric({
          name: "LCP",
          value: entry.startTime,
          rating: getMetricRating("LCP", entry.startTime),
        });
      }
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    observers.push(lcpObserver);

    // DOMContentLoaded 和 Load 时间监听
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        const navigationEntry = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          addMetric({
            name: "DOMContentLoaded",
            value:
              navigationEntry.domContentLoadedEventEnd -
              navigationEntry.startTime,
            rating: getMetricRating(
              "DOMContentLoaded",
              navigationEntry.domContentLoadedEventEnd -
                navigationEntry.startTime
            ),
          });
        }
      });
    } else {
      // 如果 DOMContentLoaded 已经触发，直接获取数据
      const navigationEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        addMetric({
          name: "DOMContentLoaded",
          value:
            navigationEntry.domContentLoadedEventEnd -
            navigationEntry.startTime,
          rating: getMetricRating(
            "DOMContentLoaded",
            navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime
          ),
        });
      }
    }

    // Load 事件监听
    if (document.readyState !== "complete") {
      window.addEventListener("load", () => {
        const navigationEntry = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          addMetric({
            name: "Load",
            value: navigationEntry.loadEventEnd - navigationEntry.startTime,
            rating: getMetricRating(
              "Load",
              navigationEntry.loadEventEnd - navigationEntry.startTime
            ),
          });
        }
      });
    } else {
      // 如果 Load 已经完成，直接获取数据
      const navigationEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        addMetric({
          name: "Load",
          value: navigationEntry.loadEventEnd - navigationEntry.startTime,
          rating: getMetricRating(
            "Load",
            navigationEntry.loadEventEnd - navigationEntry.startTime
          ),
        });
      }
    }

    // 资源加载观察器
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      // 计算资源总数
      const resourceCount = entries.length;

      // 计算资源总大小
      const totalSize = entries.reduce((sum, entry) => {
        // transferSize 表示通过网络传输的实际大小
        return sum + (entry as PerformanceResourceTiming).transferSize;
      }, 0);

      // 计算最后一个资源加载完成的时间
      const lastResourceTime = Math.max(
        ...entries.map((entry) => entry.responseEnd)
      );

      addMetric({
        name: "ResourceCount",
        value: resourceCount,
        rating: getMetricRating("ResourceCount", resourceCount),
        unit: "个",
      });

      addMetric({
        name: "ResourceSize",
        value: formatFileSize(totalSize),
        rating: getMetricRating("ResourceSize", totalSize),
        unit: "",
      });

      addMetric({
        name: "ResourceLoadTime",
        value: lastResourceTime,
        rating: getMetricRating("ResourceLoadTime", lastResourceTime),
        unit: "ms",
      });
    });
    resourceObserver.observe({ entryTypes: ["resource"] });
    observers.push(resourceObserver);

    // JavaScript 执行时间观察器
    const scriptObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const totalScriptTime = entries.reduce(
        (sum, entry) => sum + entry.duration,
        0
      );

      addMetric({
        name: "ScriptExecutionTime",
        value: totalScriptTime,
        rating: getMetricRating("ScriptExecutionTime", totalScriptTime),
        unit: "ms",
      });
    });
    scriptObserver.observe({ entryTypes: ["measure"] });
    observers.push(scriptObserver);

    // 在页面加载完成后收集所有性能指标
    window.addEventListener("load", () => {
      // 使用 Performance Timeline API 获取详细的性能数据
      const navigationEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        // 计算所有资源加载结束时间
        const resourceEntries = performance.getEntriesByType("resource");

        // 计算 JavaScript 执行时间
        performance.mark("js-execution-end");
        performance.measure(
          "js-execution",
          "navigationStart",
          "js-execution-end"
        );
      }
    });
  } catch (error) {
    console.error("性能监控初始化失败:", error);
  }

  return () => {
    observers.forEach((observer) => observer.disconnect());
  };
};
