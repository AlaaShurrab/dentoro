import { Table } from 'antd';

import './style.css';

interface historyType {
  description: string;
  payment: any;
  price: any;
  // eslint-disable-next-line camelcase
  log_date: Date;
}

interface Props {
  historyData: historyType[];
}

const columns = ['Description', 'Price', 'Payment', 'Remaining', 'Time'].map(
  (column) => ({
    title: column,
    dataIndex: column,
    key: column,
  })
);

const PatientHistory = ({ historyData }: Props): JSX.Element => {
  const data = historyData.map(
    ({ description, payment, price, log_date: Time }, index) => ({
      key: `${index + 1}`,
      Description: description,
      Payment: payment,
      Price: price,
      Time: new Date(Time).toLocaleDateString(),
      Remaining: (price - payment).toFixed(2),
    })
  );

  return (
    <div className="history-table-container">
      <Table columns={columns} dataSource={data} scroll={{ x: 900 }} />
    </div>
  );
};

export default PatientHistory;
