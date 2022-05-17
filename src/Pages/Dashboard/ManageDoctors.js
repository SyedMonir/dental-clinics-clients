import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
  // Query
  const {
    isLoading,
    error,
    data: doctors,
    refetch,
  } = useQuery('doctors', () =>
    fetch('http://localhost:5000/doctor', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  //   console.log(doctors);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log('An error has occurred: ' + error?.message);
  }

  return (
    <section>
      <h2 className="text-2xl text-center mb-8">
        Managing Doctor :{doctors?.length}{' '}
      </h2>
      {/* Table */}
      <div className="overflow-x-auto mx-2">
        <table className="table table-zebra w-full table-normal">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>specialization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, index) => (
              <DoctorRow
                key={doctor._id}
                doctor={doctor}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageDoctors;
