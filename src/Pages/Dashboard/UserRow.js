import React from 'react';
import toast from 'react-hot-toast';

const UserRow = ({ user, refetch }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    fetch(`https://dental-clinics.herokuapp.com/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error('Failed to make an admin!');
        }
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data?.modifiedCount > 0) {
          refetch();
          toast.success(`${email} is Admin now!`);
          //   console.log(data);
        }
      });
  };
  return (
    <tr className="hover">
      <th>{1}</th>
      <td>{email}</td>
      <td>Abc</td>
      <td>
        {role !== 'admin' ? (
          <button onClick={makeAdmin} className="btn btn-xs">
            Make Admin
          </button>
        ) : (
          <span className="text-sm text-green-500 font-semibold text-center">
            ADMIN
          </span>
        )}
      </td>
      <td>
        <button className="btn btn-xs">Remove USer</button>
      </td>
    </tr>
  );
};

export default UserRow;
