import { useEffect, useState } from "react";
import { Card, Space, Image } from "antd";

// 生成一些示例图片
const images = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/200/200?random=${i}`,
  alt: `Random Image ${i}`,
}));
export const Component = () => {
  const [imgList, setImgList] = useState<any[]>(new Array(20).fill(""));
  const [count, setCount] = useState(0);
  useEffect(() => {
    Promise.allSettled<Promise<any>>(
      images.map((item) => {
        return new Promise((resolve, reject) => {
          fetch(item.src)
            .then(async (res) => {
              resolve(URL.createObjectURL(await res.blob()));
            })
            .catch(async (res) => {
              reject(res);
            });
        });
      })
    )
      .then((res) => {
        setImgList(
          res.map((item) => {
            if (item.status === "fulfilled") {
              setCount((count) => count + 1);
              return item.value;
            } else {
              return item.reason;
            }
          })
        );
      })
      .catch(() => {
        setImgList([]);
      });
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Card>
        <Card title={<span>图片列表-{count}</span>}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {imgList?.map((item) => {
              return <Image src={item} alt="" />;
            })}
          </Space>
        </Card>
      </Card>
    </div>
  );
};
