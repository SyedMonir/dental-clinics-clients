import React from 'react';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Hook Form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // Email & Password
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  // Google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  // Error
  let signInError;
  if (error || googleError) {
    console.log('object');
    // console.log(error || googleError);
    signInError = <>{error?.message || googleError?.message}</>;
  }

  // Loading
  if (loading || googleLoading) {
    return <Loading />;
  }

  // User
  if (user || googleUser) {
    // console.log(user || googleUser);
    navigate(from, { replace: true });
  }

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <section className="flex justify-center items-center h-[80vh]">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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
              {signInError}
            </p>

            {/* Submit Button */}
            <input
              className="btn w-full max-w-xs"
              value="Login"
              type="submit"
            />
          </form>

          <p className="text-sm">
            New to Dental Clients?{' '}
            <Link className="text-secondary hover:underline" to={'/signup'}>
              Create new account
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
  );
};

export default Login;
