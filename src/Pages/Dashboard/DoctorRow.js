import React from 'react';

const DoctorRow = ({ doctor, index, setDeletingDoctor }) => {
  const { name, img, specialization, email } = doctor;

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
        <label
          onClick={() => setDeletingDoctor(doctor)}
          for="delete-confirm-modal"
          className="btn btn-xs btn-error text-white"
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default DoctorRow;
