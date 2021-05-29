import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Calendar } from 'antd';
import moment, { Moment } from 'moment';

const CalendarComponent = (): JSX.Element => {
  const [value, setValue] = useState(moment());
  const history = useHistory();

  const onSelect = (date: Moment) => {
    setValue(date);
    const dateFormat = date.format('YYYY-MM-DD');
    history.push(`/dashboard/calendar/${dateFormat}`, {
      date: dateFormat,
    });
  };

  const onPanelChange = (date: Moment) => {
    setValue(date);
  };

  return (
    <div>
      <Calendar
        fullscreen={false}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CalendarComponent;
