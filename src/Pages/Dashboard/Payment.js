import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51L0jvzHaTsAY8k0UaZNRYzC0I4PthEDehphxpAvGwzisuzD0RazpJzNLu7ye1QaHw6hOLy56esnqIVd2gY4TLsyO00OpdHCRMa'
);

const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/booking/${id}`;

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
                <p className=" font-semibold">
                  Hello,{' '}
                  <span className="text-success">
                    {appointment?.patientName}
                  </span>
                </p>
                <h2 className="card-title">
                  Pay for{' '}
                  <span className="text-secondary">
                    {appointment?.treatment}
                  </span>
                </h2>
                <p>
                  Your appointment{' '}
                  <strong className="text-secondary">
                    {appointment?.data}
                  </strong>{' '}
                  at{' '}
                  <strong className="text-secondary">
                    {appointment?.slot}
                  </strong>
                </p>
                <p>
                  Please pay ${' '}
                  <strong className="text-secondary">
                    {appointment?.price}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
