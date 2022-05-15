import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import AppointmentCard from './AppointmentCard';
import BookingModal from './BookingModal';

const AvailableAppointments = ({ date }) => {
  const [treatment, setTreatment] = useState(null);
  const selectedDate = date ? date : new Date();
  const formattedDate = format(selectedDate, 'PP');

  const {
    isLoading,
    error,
    data: appointments,
    refetch,
  } = useQuery(['available', formattedDate], () =>
    fetch(
      `https://dental-clinics.herokuapp.com/available?date=${formattedDate}`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log('An error has occurred: ' + error.message);
  }

  return (
    <section className="px-12">
      <h3 className="text-xl text-secondary text-center my-8">
        Available appointment on <strong>{formattedDate}</strong>{' '}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4 ">
        {appointments?.map((appointment) => (
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
            refetch={refetch}
          />
        )}
      </div>
    </section>
  );
};

export default AvailableAppointments;
