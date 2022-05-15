import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
  const {
    isLoading,
    error,
    data: users,
    refetch,
  } = useQuery('users', () =>
    fetch(`http://localhost:5000/user`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log('An error has occurred: ' + error.message);
  }
  return (
    <>
      <h3 className="text-2xl text-center my-4">
        Total Users: {users?.length}{' '}
      </h3>
      <div className="overflow-x-auto mx-2">
        <table className="table table-zebra w-full table-normal">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Date</th>
              <th>ADMIN</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <UserRow key={user._id} user={user} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
