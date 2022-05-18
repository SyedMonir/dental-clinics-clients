import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

const Payment = () => {
  const { id } = useParams();
  const url = `https://dental-clinics.herokuapp.com/booking/${id}`;

  // Query
  const {
    isLoading,
    error,
    data: appointment,
  } = useQuery(['booking', id], () =>
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  //   console.log(appointment);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log('An error has occurred: ' + error?.message);
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Pay for {appointment?.treatment}</h2>
                <p>
                  We will see you on{' '}
                  <strong className="text-secondary">
                    {appointment?.data}
                  </strong>{' '}
                  at{' '}
                  <strong className="text-secondary">
                    {appointment?.slot}
                  </strong>
                </p>
                <p>Please pay ${appointment?.price}</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Pay Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
