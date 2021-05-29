import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

import CalendarSearch from '../CalendarSearch';
import PatientSearchTable from '../PatientSearchTable';

interface Props {
  showSearchBar?: boolean;
}

interface LocationState {
  params: string;
  date: string;
}

const successMessage = (dataCount: string) => {
  message.success({
    content: `Success! Result Count : ${dataCount}`,
  });
};

const failedMessage = (errorMessage = '') => {
  message.error({
    content: `Failed! ${errorMessage ? `${errorMessage}` : errorMessage}`,
  });
};

let params: string;
const PatientSearchDateTable = ({
  showSearchBar = true,
}: Props): JSX.Element => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [update, setUpdate] = useState(false);

  let getPatientsData = () =>
    axios.get(`/api/v1/appointments/${moment().format('YYYY-MM-DD')}`);

  const { state } = useLocation<LocationState>();
  if (state) {
    const dayDate = state.date;
    params = state.params;

    if (dayDate) {
      getPatientsData = () => axios.get(`/api/v1/appointments/${dayDate}`);
    } else if (params) {
      getPatientsData = () =>
        axios.get('/api/v1/appointments/search', { params });
    }
  }

  useEffect(() => {
    const hideLoadingMessage = message.loading('Action in progress..', 0.5);
    let unmounted = false;
    const source = axios.CancelToken.source();
    getPatientsData()
      .then(({ data: { data } }) => {
        if (!unmounted) {
          // TODO
          const newData = data.map((item: any) => ({
            key: item.appointment_id,
            patientId: item.patient_id,
            appointmentDate: moment(item.appointment_date).format('YYYY-MM-DD'),
            appointmentTime: item.appointment_time,
            firstName: item.firstname,
            lastName: item.lastname,
            isDone: item.is_done || false,
            age:
              +moment().format('YYYY') - +moment(item.birthday).format('YYYY'),
          }));
          setAppointmentsData(newData);
          setLoading(false);
          hideLoadingMessage.then(() => successMessage(data.length));
        }
      })
      .catch((e) => {
        if (!unmounted) {
          setError(e.message);
          setLoading(false);
          hideLoadingMessage.then(() => failedMessage());
          if (axios.isCancel(e)) {
            hideLoadingMessage.then(() =>
              failedMessage(`request cancelled:${e.message}`)
            );
          } else {
            hideLoadingMessage.then(() =>
              failedMessage(`another error happened:${e.message}`)
            );
          }
        }
      });
    return () => {
      unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, params]);

  return (
    <div style={{ width: '100%' }}>
      {showSearchBar && <CalendarSearch />}
      <PatientSearchTable
        appointmentsData={appointmentsData}
        setUpdate={setUpdate}
        error={error}
        loading={loading}
      />
    </div>
  );
};

PatientSearchDateTable.defaultProps = {
  showSearchBar: true,
};

export default PatientSearchDateTable;
