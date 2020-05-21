import { List, Card } from "antd"
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  });
}

const Category = () => {
  return <List
    // size="large"
    grid={{
      gutter: 16,
      xs: 1,
      md: 2,
      lg: 3,
      xl: 4,
      xxl: 4,
    }}
    dataSource={listData}
    renderItem={item => (
      <List.Item
        key={item.title}
      >
        <Card
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }

        >
          <Card.Meta
            title={item.title}
            description={item.description}
          />
        </Card>
      </List.Item>
    )}
  />;
};

export default Category;
