import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyAppointment = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  if (userError) {
    // console.log(error);
  }
  const {
    isLoading,
    error,
    data: appointments,
  } = useQuery(['bookings'], () =>
    fetch(`http://localhost:5000/booking?patient=${user?.email}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );
  // console.log(appointments);

  if (isLoading || userLoading) {
    return <Loading />;
  }

  if (error) {
    console.log('An error has occurred: ' + error.message);
  }
  return (
    <>
      <div className="overflow-x-auto mx-2">
        <table className="table table-zebra w-full table-normal">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((a, index) => (
              <tr key={a._id} className="hover">
                <th>{index + 1}</th>
                <td>{a?.patientName}</td>
                <td>{a?.date}</td>
                <td>{a?.slot}</td>
                <td>{a?.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyAppointment;
