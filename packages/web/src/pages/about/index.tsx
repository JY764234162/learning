import { Button, Card, Descriptions, Flex, Tag } from "antd";
import pkgJson from "../../../package.json";
import { useSelector } from "react-redux";
import { settingSlice } from "@/store/slice/setting";
import { DescriptionsItemType } from "antd/es/descriptions";

// 解构 package.json 数据
const { dependencies, devDependencies, name, version, homepage, repository } = pkgJson;

const transformDependenciesToItems = (dependencies: Record<string, string>) => {
  return Object.entries(dependencies).map((item) => {
    console.log(item);
    const [name, version] = item;
    return {
      label: name,
      children: version,
    };
  });
};
const dependenciesItems: DescriptionsItemType[] = transformDependenciesToItems(dependencies);
const devDependenciesItems: DescriptionsItemType[] = transformDependenciesToItems(devDependencies);

export const Component = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const primary = settings.color.primary;

  const infoItems: DescriptionsItemType[] = [
    {
      label: "版本",
      children: (
        <Tag color={primary} bordered>
          {version}
        </Tag>
      ),
    },
    {
      label: "最新构建时间",
      children: (
        <Tag color={primary} bordered>
          {BUILD_TIME}
        </Tag>
      ),
    },
    {
      label: "Github地址",
      children: (
        <a href={repository.url} style={{ color: primary }} target="_blank">
          Github地址
        </a>
      ),
    },
    {
      label: "项目预览地址",
      children: (
        <a href={homepage} style={{ color: primary }} target="_blank">
          项目预览地址
        </a>
      ),
    },
  ];
  return (
    <Flex vertical style={{ padding: 16, gap: 16 }}>
      <Card title="项目信息" size="small">
        <Descriptions items={infoItems} column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }} size="small" bordered></Descriptions>
      </Card>
      <Card title="生产依赖" size="small">
        <Descriptions items={dependenciesItems} column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }} size="small" bordered></Descriptions>
      </Card>
      <Card title="开发依赖" size="small">
        <Descriptions
          items={devDependenciesItems}
          column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
          size="small"
          bordered
        ></Descriptions>
      </Card>
    </Flex>
  );
};
