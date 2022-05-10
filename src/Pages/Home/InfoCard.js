import React from 'react';

const InfoCard = ({ img, title, description, bgColor }) => {
  return (
    <>
      <div
        className={`card lg:card-side shadow-xl text-white m-4 p-4 ${bgColor}`}
      >
        <figure className="px-2">
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
