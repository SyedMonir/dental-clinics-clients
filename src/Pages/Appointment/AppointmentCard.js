import React from 'react';
// import PrimaryButton from '../Shared/PrimaryButton';

const AppointmentCard = ({ appointment, setTreatment }) => {
  const { name, slots, price } = appointment;
  const slotsLength = slots?.length;
  return (
    <>
      <div className="card lg:max-w-lg bg-accent text-neutral-content shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-secondary">{name}</h2>
          <p>
            {slotsLength ? (
              <span>{slots[0]}</span>
            ) : (
              <span className="text-red-500">Slots Booked!</span>
            )}
          </p>
          <p>
            <strong className="text-secondary">{slotsLength}</strong>{' '}
            {slotsLength > 1 ? 'Appointments' : 'Appointment'} Available
          </p>

          <p>
            Price: $ <strong className="text-secondary">{price}</strong>{' '}
          </p>
          <div className="card-actions justify-end">
            <label
              onClick={() => setTreatment(appointment)}
              disabled={slotsLength === 0}
              htmlFor="booking-modal"
              className="btn btn-primary bg-gradient-to-r from-secondary to-primary font-bold text-white"
            >
              Book Appointment
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentCard;
