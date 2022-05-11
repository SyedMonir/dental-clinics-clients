import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, date, setTreatment }) => {
  const { _id, name, slots } = treatment;
  const selectedDate = date ? date : new Date();

  const handleBooking = (e) => {
    e.preventDefault();

    const slot = e.target.slot.value;

    console.log(_id, name, slot);
    setTreatment(null);
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
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="text"
              placeholder="Full Name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
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
