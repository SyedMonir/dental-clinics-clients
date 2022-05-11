import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import BookingModal from './BookingModal';

const AvailableAppointments = ({ date }) => {
  const [appointments, setAppointment] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const selectedDate = date ? date : new Date();
  useEffect(() => {
    fetch('http://localhost:5000/service')
      .then((res) => res.json())
      .then((data) => setAppointment(data));
  }, []);
  //   console.log(appointments);
  return (
    <section className="px-12">
      <h3 className="text-xl text-secondary text-center my-8">
        Available appointment on <strong>{format(selectedDate, 'PP')}</strong>{' '}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4 ">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            appointment={appointment}
            setTreatment={setTreatment}
          ></AppointmentCard>
        ))}
        {treatment && (
          <BookingModal
            treatment={treatment}
            date={date}
            setTreatment={setTreatment}
          />
        )}
      </div>
    </section>
  );
};

export default AvailableAppointments;
