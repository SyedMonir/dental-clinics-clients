import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyAppointment = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  if (userError) {
    // console.log(error);
  }
  // const {
  //   isLoading,
  //   error,
  //   data: appointments,
  // } = useQuery(['bookings', user], () =>
  //   fetch(
  //     `https://dental-clinics.herokuapp.com/booking?patient=${user?.email}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //       },
  //     }
  //   ).then((res) => {
  //     // console.log(res);
  //     if (res.status === 401 || res.status === 403) {
  //       signOut(auth);
  //       localStorage.removeItem('accessToken');
  //       navigate('/');
  //     }
  //     return res.json();
  //   })
  // );

  useEffect(() => {
    if (user) {
      fetch(
        `https://dental-clinics.herokuapp.com/booking?patient=${user.email}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
        .then((res) => {
          // console.log('res', res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
          }
          return res.json();
        })
        .then((data) => {
          setAppointments(data);
          // console.log(data);
        });
    }
  }, [user, navigate]);
  // console.log(appointments);

  if (userLoading) {
    return <Loading />;
  }

  // if (error) {
  //   console.log('An error has occurred: ' + error.message);
  // }
  return (
    <>
      <div className="overflow-x-auto mx-2">
        <table className="table table-zebra w-full table-normal text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Payment</th>
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
                <td>
                  {a?.price && !a?.paid && (
                    <Link to={`/dashboard/payment/${a._id}`}>
                      <button className="btn btn-xs btn-error text-white">
                        Pay Now
                      </button>
                    </Link>
                  )}
                  {a?.price && a?.paid && (
                    <div>
                      <p>
                        Transition Id:{' '}
                        <span className="py-[2px] px-2 text-secondary text-sm">
                          {a?.transactionId}
                        </span>
                      </p>
                      <span className=" py-[2px] px-2 rounded-md uppercase btn-success text-white text-sm tracking-wide">
                        Paid
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyAppointment;
