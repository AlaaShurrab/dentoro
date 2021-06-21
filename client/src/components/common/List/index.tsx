import { List } from 'antd';

interface Props {
  [otherProps: string]: any;
}

interface itemData {
  title: string;
  icon: string;
  description: string;
}

const CustomList = ({ ...otherProps }: Props): JSX.Element => (
  <List
    {...otherProps}
    renderItem={(item: itemData) => (
      <List.Item key={item.title}>
        <List.Item.Meta
          avatar={item.icon}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

export default CustomList;
