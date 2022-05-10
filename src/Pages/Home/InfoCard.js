import React from 'react';

const InfoCard = ({ img, title, description, bgColor }) => {
  return (
    <>
      <div
        className={`card lg:card-side bg-base-100 shadow-xl text-white m-4 p-4 ${bgColor}`}
      >
        <figure>
          <img src={img} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
