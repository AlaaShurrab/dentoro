import { ReactNode } from 'react';

import { Card } from 'antd';

import './style.css';

interface Props {
  coverIcon: ReactNode;
  ServiceTitle: string;
  ServiceDescription: string;
}

const { Meta } = Card;

const ServiceCard = ({
  coverIcon,
  ServiceTitle,
  ServiceDescription,
}: Props): JSX.Element => (
  <div>
    <Card
      hoverable
      className="ServiceCard"
      style={{
        width: 240,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
        border: 0,
      }}
      cover={coverIcon}
    >
      <Meta title={ServiceTitle} description={ServiceDescription} />
    </Card>
  </div>
);

export default ServiceCard;
