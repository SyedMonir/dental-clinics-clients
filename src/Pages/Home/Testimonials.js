import React from 'react';
import quote from '../../assets/icons/quote.svg';
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';
import Reviews from './Reviews';

const Testimonials = () => {
  const reviews = [
    {
      _id: 1,
      name: 'Winson Herry',
      review:
        'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
      location: 'california',
      img: people1,
    },
    {
      _id: 2,
      name: 'Kilson Herry',
      review:
        'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
      location: 'california',
      img: people2,
    },
    {
      _id: 3,
      name: 'Milson Herry',
      review:
        'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
      location: 'california',
      img: people3,
    },
  ];
  return (
    <section className="px-12">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl text-primary font-bold">Appointment</h3>
          <h2 className="text-3xl">What Our Patients Says</h2>
        </div>
        <figure>
          <img className="w-24 lg:w-48" src={quote} alt="Quote" />
        </figure>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 my-8">
        {reviews.map((review) => (
          <Reviews key={review._id} review={review}></Reviews>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
