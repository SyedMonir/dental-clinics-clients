import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-[80vh]">
        {/* Spinner 1 */}
        <button className="btn loading mb-4 ">loading</button>
        {/* Spinner 2 */}
        <div className="w-1/2 max-w-sm">
          <Skeleton count={5} />
        </div>
        {/* Spinner 3 */}
        <div class="flex items-center justify-center space-x-2 animate-pulse mt-4">
          <div class="w-8 h-8 bg-secondary rounded-full"></div>
          <div class="w-8 h-8 bg-secondary rounded-full"></div>
          <div class="w-8 h-8 bg-secondary rounded-full"></div>
        </div>
      </section>
    </>
  );
};

export default Loading;
