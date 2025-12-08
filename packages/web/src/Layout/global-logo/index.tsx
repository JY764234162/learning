import ClassNames from "classnames";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { SvgIcon } from "@/components/SvgIcon";

interface Props extends Omit<LinkProps, "to"> {
  /** Whether to show the title */
  showTitle?: boolean;
}
const GlobalLogo: FC<Props> = memo(({ className, showTitle = true, ...props }) => {
  const primaryColor = useSelector(settingSlice.selectors.getPrimaryColor);
  return (
    <Link className={ClassNames("h-16 flex justify-center items-center", className)} to="/" {...props}>
      <SvgIcon icon={logo} size={32} style={{ fill: primaryColor }} />
      <h2
        style={{
          fontSize: 16,
          fontWeight: "bold",
          display: "block",
          color: primaryColor,
          overflow: "hidden",
          width: showTitle ? "150px" : "0px",
          paddingLeft: showTitle ? 8 : 0,
          textWrap: "nowrap",
          transition: "all 0.1s ease-in-out",
        }}
      >
        JY前端学习实验室
      </h2>
    </Link>
  );
});

export default GlobalLogo;
