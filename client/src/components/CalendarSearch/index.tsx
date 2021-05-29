import { useState } from 'react';
import { Input, Select, Button, Form } from 'antd';
import { useHistory } from 'react-router-dom';

import './style.css';

interface Props {
  searchFor?: string;
}

const { Option } = Select;

const CalendarSearch = ({ searchFor }: Props): JSX.Element => {
  const history = useHistory();
  const [selectOption, setSelectOption] = useState('name');

  // TODO: update values type
  const searchFunction = (values: any) => {
    const params = Object.fromEntries(
      Object.entries(values).map(([key, value]) => {
        if (key === 'phone') return [key, value];
        return [key, `%${value}%`];
      })
    );
    if (searchFor === 'Appointments')
      history.push('/dashboard/calendar/appointmentsearch', { params });
    else if (searchFor === 'Patients')
      history.push('/dashboard/patients', { params });
  };

  return (
    <Form
      requiredMark={false}
      onFinish={searchFunction}
      layout="inline"
      className="calendar-search-form"
    >
      <Form.Item>
        <Select defaultValue="Name" onChange={setSelectOption}>
          <Option value="name">Name</Option>
          <Option value="phone">Phone</Option>
        </Select>
      </Form.Item>
      {selectOption === 'name' ? (
        <div className="calendar-search-inputs-div">
          <Form.Item
            className="calendar-search-input-half-width"
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input First Name!',
              },
            ]}
          >
            <Input placeholder="Enter first name ..." />
          </Form.Item>
          <Form.Item
            className="calendar-search-input-half-width"
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input Last Name!',
              },
            ]}
          >
            <Input placeholder="Enter last name ..." />
          </Form.Item>
        </div>
      ) : (
        <div className="calendar-search-inputs-div">
          <Form.Item
            className="calendar-search-input-full-width"
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input Phone !',
              },
            ]}
          >
            <Input placeholder="Please Enter phone number like 0599010101 ..." />
          </Form.Item>
        </div>
      )}
      <div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

CalendarSearch.defaultProps = {
  searchFor: 'Appointments',
};

export default CalendarSearch;
