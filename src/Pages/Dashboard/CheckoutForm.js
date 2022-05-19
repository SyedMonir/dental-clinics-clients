import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [transitionId, setTransitionId] = useState('');
  const [success, setSuccess] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const { price, patient, patientName } = appointment;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    setCardError(error?.message || '');
    setSuccess('');

    if (error) {
      console.log('[error]', error);
    } else {
      //   console.log('[PaymentMethod]', paymentMethod);
    }

    // Confirm Card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: patient,
          },
        },
      });

    if (intentError) {
      setCardError(intentError.message);
      setSuccess('');
    } else {
      setCardError('');
      //   console.log('[PaymentIntent]', paymentIntent);
      setTransitionId(paymentIntent.id);
      setSuccess(`Congrats! Payment ${paymentIntent.status}`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="text-center">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        <button
          className="btn btn-sm btn-success text-white px-8  mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || cardError || success}
        >
          Pay
        </button>
      </form>

      {success && (
        <div className="text-green-600 mt-2 mx-auto text-sm text-center">
          <p>{success}!</p>
          <p>
            Your Transaction ID:{' '}
            <strong className="text-secondary">{transitionId}</strong>
          </p>
        </div>
      )}
      {/* Error */}
      {cardError && (
        <p className="text-red-500 mt-2 mx-auto text-sm">{cardError}</p>
      )}
    </>
  );
};

export default CheckoutForm;
