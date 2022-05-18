import React from 'react';
import toast from 'react-hot-toast';

const DeleteConfirmModal = ({ deletingDoctor, setDeletingDoctor, refetch }) => {
  const { name, email } = deletingDoctor;

  const handleDoctorDelete = () => {
    fetch(`https://dental-clinics.herokuapp.com/doctor/${email}`, {
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
          setDeletingDoctor(null);
          refetch();
        }
      });
  };
  return (
    <>
      <input
        type="checkbox"
        id="delete-confirm-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">
            Are you sure you want to delete {name}?
          </h3>
          <p className="py-4">This action you can't undo.</p>
          <div className="modal-action">
            <button
              onClick={() => handleDoctorDelete()}
              className="btn btn-xs btn-error text-white"
            >
              Delete
            </button>
            <label for="delete-confirm-modal" className="btn btn-xs">
              Cancel!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmModal;
