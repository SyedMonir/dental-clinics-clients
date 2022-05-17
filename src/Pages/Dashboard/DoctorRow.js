import React from 'react';
import toast from 'react-hot-toast';

const DoctorRow = ({ doctor, index, refetch }) => {
  const { name, img, specialization, email } = doctor;

  const handleDoctorDelete = (email) => {
    fetch(`http://localhost:5000/doctor/${email}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          toast.success(`Dr. ${name} is deleted.`);
          refetch();
        }
      });
  };
  return (
    <tr className="hover ">
      <th>{index + 1}</th>
      <td className="p-2">
        <div className="avatar">
          <div className="w-16 rounded-xl">
            <img src={img} alt={name} />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{specialization}</td>
      <td>
        <button
          onClick={() => handleDoctorDelete(email)}
          className="btn btn-xs btn-error text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DoctorRow;
