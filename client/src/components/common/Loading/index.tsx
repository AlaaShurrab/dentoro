import { Spin } from 'antd';

import './style.css';

interface Props {
  size: 'small' | 'default' | 'large';
  className?: string;
}

const Loading = ({ size, className }: Props): JSX.Element => (
  <div className={`spin-style ${className}`}>
    <Spin size={size} />
  </div>
);

Loading.defaultProps = {
  className: '',
};

export default Loading;
