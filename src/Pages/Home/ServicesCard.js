import React from 'react';

const ServicesCard = ({ service }) => {
  const { img, title, description } = service;
  return (
    <>
      <div className="card bg-base-100 shadow-2xl m-4">
        <figure className="px-10 pt-10">
          <img src={img} alt={title} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
