import { Alert } from 'antd';

interface Props {
  message: string;
  [otherProps: string]: any;
}

const AlertMessage = ({ message, ...otherProps }: Props): JSX.Element => (
  <Alert message={message} {...otherProps} showIcon />
);

export default AlertMessage;
