import React from 'react';

const Reviews = ({ review }) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl my-4">
        <div className="card-body">
          <p>{review.review}</p>
          <div className="flex items-center">
            <div className="avatar mr-4">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={review?.img} alt={review?.name} />
              </div>
            </div>
            <div>
              <h4 className="text-xl">{review?.name}</h4>
              <p>{review?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
