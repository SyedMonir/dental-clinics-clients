import React, { useEffect } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';

const Signup = () => {
  const navigate = useNavigate();

  // Hook Form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Email & Password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Update User
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  // Google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [sendEmailVerification, sending, verificationError] =
    useSendEmailVerification(auth);

  const [token] = useToken(user || googleUser);

  useEffect(() => {
    if (token) {
      navigate('/appointment');
    }
  }, [token, navigate]);

  // Error
  let signUpError;
  if (error || googleError || updateError || verificationError) {
    // console.log(error || googleError);
    signUpError = (
      <>{error?.message || googleError?.message || updateError?.message}</>
    );
  }

  // Loading
  if (loading || googleLoading || updating || sending) {
    return <Loading />;
  }

  // User
  if (user || googleUser) {
    // console.log(user || googleUser);
  }

  const onSubmit = async (data) => {
    // console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await sendEmailVerification();
    await updateProfile({ displayName: data.name });
  };
  return (
    <>
      <section className="flex justify-center items-center">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-center">Sign up</h2>

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
                  placeholder="Enter your Name"
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
                  placeholder="Enter your email"
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
              {/* Password */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password:</span>
                </label>
                <input
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    minLength: {
                      value: 6,
                      message: 'Minimum Enter 6 Character ',
                    },
                  })}
                  type="password"
                  placeholder="Enter your Password"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  {errors.password?.type === 'required' && (
                    <span className="label-text-alt text-red-600">
                      {errors.password?.message}
                    </span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span className="label-text-alt text-red-600">
                      {errors.password?.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Showing Error */}
              <p className="text-red-600 font-semibold text-sm text-center mb-2">
                {signUpError}
              </p>

              {/* Submit Button */}
              <input
                className="btn w-full max-w-xs"
                value="Sign up"
                type="submit"
              />
            </form>

            <p className="text-sm">
              Already have an account?{' '}
              <Link className="text-secondary hover:underline" to={'/login'}>
                Please Login
              </Link>{' '}
            </p>
            <div className="divider">OR</div>

            {/* Gopogle */}
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline"
            >
              Continue With Google
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
