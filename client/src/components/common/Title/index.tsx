import { Typography } from 'antd';

import './style.css';

interface Props {
  text: string;
}

const { Title } = Typography;

const CustomTitle = ({ text }: Props): JSX.Element => (
  <Title className="custom-title" level={2}>
    {text}
  </Title>
);

export default CustomTitle;
