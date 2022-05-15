import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
  const { _id, name, slots } = treatment;
  const selectedDate = date ? date : new Date();

  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    // console.log(error);
  }

  const handleBooking = (e) => {
    e.preventDefault();

    const slot = e.target.slot.value;

    const booking = {
      treatmentId: _id,
      treatment: name,
      date: format(selectedDate, 'PP'),
      slot,
      patient: user?.email,
      patientName: user?.displayName,
      phone: e.target.phone.value,
    };
    // console.log(booking);

    fetch(`https://dental-clinics.herokuapp.com/booking`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // to close the modal
        if (data.success) {
          toast.success(
            `Appointment is set ${format(selectedDate, 'PP')} at ${slot}`,
            {
              duration: 4000,
            }
          );
        } else {
          toast.error(
            `Already have an appointment on ${data.booking?.date} at ${data.booking?.slot}`,
            { duration: 4000 }
          );
        }
        refetch();
        setTreatment(null);
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-center text-lg my-4">
            Booking For <span className="text-secondary">{name}</span>
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 justify-items-center"
          >
            <input
              type="text"
              disabled
              value={format(selectedDate, 'PP')}
              className="input input-bordered w-full max-w-xs"
            />
            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="text"
              disabled={true}
              value={user?.displayName || 'Unknown'}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              disabled={true}
              value={user?.email}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              className="btn btn-secondary text-white w-full max-w-xs"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
