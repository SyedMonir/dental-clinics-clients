import React from 'react';

const DoctorRow = ({ doctor, index }) => {
  const { name, img, specialization } = doctor;
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
      <td>{specialization}</td>
      <td>
        <button className="btn btn-xs btn-error text-white">Delete</button>
      </td>
    </tr>
  );
};

export default DoctorRow;
