import { CSSProperties, SVGProps } from "react";
import React from "react";
/**
 * 属性存在优先级问题 1>2>3>4>5
 * 1 2 3 4 是根据Element元素默认优先级顺序
 * 定义：固有属性 < HTML属性 < CSS属性（class < style）
 * 固有属性：如svg默认为150*1
 * 5 为通过父级的class控制
 * TODO: 注意hover的使用情况
 * 如果使用hover改变图标的fill属性
 * 在foo.scss中可以直接通过 class名进行控制 { .search { :hover { .<className>/<tag(svg)> {fill: red} }}}}
 * 在style.module.scss, styleModule模式无效不起作用, 可以通过在styleModule中使用全局样式。
 * styleModule中的最佳实践 { :gloabl { .search { :hover { .<className>/<tag(svg)> {fill: red} }}} }
 */
type SvgIconProps = {
  /**
   * icon名称，如：icon-keenote-foo
   */
  icon: string;
  /**
   * 同icon
   */
  children?: string;
  /**
   * style 优先级为1 行内样式 优先级要高于className
   */
  style?: CSSProperties;
  /**
   * className 优先等级为2 className优先级要高于attributes
   */
  className?: string;
  /**
   *  size 优先等级为3 提供简单的设置，控制icon的宽度和高度，注意此属性优先级高于attributes
   */
  size?: number;
  /**
   * attributes 优先级为4 尽量使用attributes设置
   */
  attributes?: SVGProps<SVGSVGElement>;
  /**
     * resourceDefs 为svg defs元素，可以定义资源，比如要使用渐变，搭配style使用方式
     * 参考ai助手 
     * <SvgIcon
        resourceDefs={
            <defs>
                <linearGradient id="grad1" gradientTransform="rotate(123)">
                    <stop offset="-5%" stopColor="#CE2BFF" />
                    <stop offset="51%" stopColor="#0C90E4" />
                    <stop offset="100%" stopColor="#2BDBF6" />
                </linearGradient>
            </defs>
        }
        size={16}
        style={{ fill: 'url(#grad1)' }}
        icon={item.icon}></SvgIcon>
     */
  resourceDefs?: React.ReactNode;
};
const SvgIcon = (props: SvgIconProps) => {
  const { icon, attributes, children, className, style, size, resourceDefs } = props;
  const attribute = {
    ...attributes,
  };

  if (typeof size === "number") {
    attribute.height = size;
    attribute.width = size;
    attribute.viewBox = `0 0 ${size} ${size}`;
  }
  if (style) attribute.style = style;
  if (className) attribute.className = className;
  // TODO: 设置icon默认大小为20px 兼容没有设置宽高的情况
  if (!size && !className && !style && (!attribute.height || !attribute.width)) {
    attribute.height = 20;
    attribute.width = 20;
    attribute.viewBox = `0 0 20 20`;
  }

  return (
    <svg width={20} height={20} {...attribute}>
      {resourceDefs}
      <use xlinkHref={"#" + (icon || children)} />
    </svg>
  );
};

export { SvgIcon };
