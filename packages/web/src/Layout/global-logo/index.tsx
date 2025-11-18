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
  const colors = useSelector(settingSlice.selectors.getColors);
  return (
    <Link className={ClassNames("w-40 h-16 flex items-center", className)} to="/" {...props}>
      <SvgIcon icon={logo} size={32} style={{ fill: colors.primary }} />
      <h2 className="pl-2 font-bold text-base transition duration-300 ease-in-out" style={{ display: showTitle ? "block" : "none" }}>
        后台管理系统
      </h2>
    </Link>
  );
});

export default GlobalLogo;
