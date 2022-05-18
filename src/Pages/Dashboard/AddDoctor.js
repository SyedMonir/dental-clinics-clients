import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
  // Hook Form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Query
  const {
    isLoading,
    error,
    data: services,
  } = useQuery('services', () =>
    fetch('https://dental-clinics.herokuapp.com/service').then((res) =>
      res.json()
    )
  );

  const [loader, setLoader] = useState(false);

  if (isLoading || loader) {
    return <Loading />;
  }

  if (error) {
    console.log('An error has occurred: ' + error?.message);
  }

  const imgStorageKey = 'b52a41845baa0e35030509048daa8d48';

  /**
   * 3 ways to store images
   * 1. Third party storage //Free open public storage is ok for Practice project
   * 2. Your own storage in your own server (file system)
   * 3. Database: Mongodb
   *
   * YUP: to validate file: Search: Yup file validation for react hook form
   */

  // Submit
  const onSubmit = async (data) => {
    // console.log(data);
    setLoader(true);
    const image = data?.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data?.name,
            email: data?.email,
            specialization: data?.specialization,
            img: img,
          };
          // Send my database
          fetch('https://dental-clinics.herokuapp.com/doctor', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((inserted) => {
              // console.log('Doctor', inserted);
              if (inserted?.insertedId) {
                toast.success(`Added Dr. ${data?.name} successfully!`);
                setLoader(false);
                reset();
              } else {
                toast.error(`Failed to add the doctor!`);
              }
            });
        }
        // console.log(result);
      });
  };
  return (
    <section className="h-[80%] flex justify-center items-center">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body ">
          <h2 className="card-title mx-auto">Add a new Doctor!</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                })}
                type="text"
                placeholder="Enter Doctor Name"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {errors.name?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.name?.message}
                  </span>
                )}
              </label>
            </div>
            {/* Email */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: 'Invalid Email!',
                  },
                })}
                type="email"
                placeholder="Enter Doctor Email"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {errors.email?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.email?.message}
                  </span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span className="label-text-alt text-red-600">
                    {errors.email?.message}
                  </span>
                )}
              </label>
            </div>
            {/* Specialization */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Specialization:</span>
              </label>
              <select
                {...register('specialization')}
                className="select select-bordered  w-full max-w-xs"
              >
                {services?.map((service) => (
                  <option key={service._id} value={service?.name}>
                    {service?.name}
                  </option>
                ))}
              </select>
              <label className="label">
                {errors.specialization?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.specialization?.message}
                  </span>
                )}
              </label>
            </div>
            {/* Photo */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Choose a photo</span>
              </label>
              <input
                {...register('image', {
                  required: {
                    value: true,
                    message: 'Image is required',
                  },
                })}
                type="file"
                className="block input input-bordered pt-1 w-full max-w-xs text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              <label className="label">
                {errors.image?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.image?.message}
                  </span>
                )}
              </label>
            </div>

            {/* Submit Button */}
            <input
              className="btn w-full max-w-xs"
              value="Add Doctor"
              type="submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddDoctor;
