import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  // Query
  const {
    isLoading,
    error,
    data: doctors,
    refetch,
  } = useQuery('doctors', () =>
    fetch('https://dental-clinics.herokuapp.com/doctor', {
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
                setDeletingDoctor={setDeletingDoctor}
              />
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <DeleteConfirmModal
          deletingDoctor={deletingDoctor}
          setDeletingDoctor={setDeletingDoctor}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default ManageDoctors;
