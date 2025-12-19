import { useDispatch, useSelector } from "react-redux";
import { layoutSlice } from "@/store/slice/layout";
import GlobalLogo from "../global-logo";
import { GlobalMenu } from "../global-menu";
import { Drawer, Layout as AntdLayout } from "antd";
import { memo, useMemo } from "react";

const siderWidth = 220;

interface GlobalSiderProps {
  isMobile: boolean;
}

export const GlobalSider: React.FC<GlobalSiderProps> = memo(({ isMobile }) => {
  const collapsed = useSelector(layoutSlice.selectors.getIsCollapsed);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(layoutSlice.actions.setIsCollapsed(true));
  };

  const SiderContent = useMemo(() => {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <GlobalLogo showTitle={!collapsed} className="w-full" />
        <GlobalMenu
          inlineCollapsed={collapsed}
          style={{ overflow: "auto", flex: 1, width: "100%", border: "none" }}
          className="scroll-bar"
        />
      </div>
    );
  }, [collapsed]);

  if (isMobile) {
    return (
      <Drawer
        open={!collapsed}
        onClose={onClose}
        placement="left"
        width={siderWidth}
        styles={{ header: { display: "none" }, body: { padding: 0 } }}
      >
        {SiderContent}
      </Drawer>
    );
  }
  return (
    <AntdLayout.Sider collapsed={collapsed} style={{ boxShadow: "2px 0 8px 0 rgb(29, 35, 41, 0.05)", zIndex: 100 }} width={siderWidth}>
      {SiderContent}
    </AntdLayout.Sider>
  );
});
