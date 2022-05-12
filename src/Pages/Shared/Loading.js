import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-[80vh]">
        {/* Spinner 2 */}
        <div className="w-1/2 max-w-sm">
          <Skeleton count={5} />
        </div>
        {/* Spinner 4 */}
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-800 opacity-75 flex flex-col items-center justify-center">
          <button className="btn loading bg-secondary mb-4 text-white text-xl font-semibold">
            loading. . .
          </button>
        </div>
      </section>
    </>
  );
};

export default Loading;
