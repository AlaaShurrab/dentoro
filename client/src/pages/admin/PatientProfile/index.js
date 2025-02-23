import React, { useEffect, useState } from 'react';
import { get } from 'axios';
import './style.css';
import { useParams } from 'react-router-dom';

import Title from '../../../components/common/Title';
import PatientDetailsForm from '../../../components/PatientDetailsForm';
import PatientTreatmentForm from '../../../components/PatientTreatmentForm';
import PatientHistory from '../../../components/PatientHistory';
import Loading from '../../../components/common/Loading';
import AlertMessage from '../../../components/common/AlertMessage';

function PatientProfile() {
  const [profileData, setProfileData] = useState({
    history: [],
    profile: {},
    balance: 0,
  });
  const { history, profile, balance } = profileData;

  const [refreshDate, setRefreshDate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { patientId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: patientProfileData },
        } = await get(`/api/v1/patients/${patientId}`);
        setLoading(false);
        return setProfileData(patientProfileData);
      } catch (err) {
        setLoading(false);
        if (err.response) {
          const {
            response: { data },
          } = err;
          return setErrorMessage(data.message ? data.message : data);
        }
        return setErrorMessage(err);
      }
    })();
  }, [patientId, refreshDate]);

  return (
    <div className="profile-page-container">
      {loading ? (
        <Loading className="patient-profile-loading" size="large" />
      ) : (
        <>
          {errorMessage ? (
            <AlertMessage
              className="patient-profile-alert-message"
              message="Error"
              description={errorMessage}
              type="error"
              showIcon
            />
          ) : (
            <>
              <Title text="Patient Profile" />
              <PatientDetailsForm
                profileData={{ ...profile, balance }}
                patientId={+patientId}
                setRefreshDate={setRefreshDate}
              />
              <PatientTreatmentForm
                patientId={+patientId}
                setRefreshDate={setRefreshDate}
              />
              <PatientHistory historyData={history} patientId={+patientId} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PatientProfile;
