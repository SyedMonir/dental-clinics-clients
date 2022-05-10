import React from 'react';
import fluoride from '../../assets/images/fluoride.png';
import cavity from '../../assets/images/cavity.png';
import whitening from '../../assets/images/whitening.png';
import treatment from '../../assets/images/treatment.png';
import ServicesCard from './ServicesCard';

const Services = () => {
  const services = [
    {
      _id: 1,
      title: 'Fluoride Treatment',
      description: 'Lorem Ipsum is simply dummy text of the pri',
      img: fluoride,
    },
    {
      _id: 2,
      name: 'Cavity Filling',
      description: 'Lorem Ipsum is simply dummy text of the pri',
      img: cavity,
    },
    {
      _id: 3,
      name: 'Teeth Whitening',
      description: 'Lorem Ipsum is simply dummy text of the pri',
      img: whitening,
    },
  ];
  return (
    <section className="text-center my-20 px-12">
      <h3 className="text-primary text-xl font-bold">Our Services</h3>
      <h2 className="text-4xl">Services We Provide</h2>
      <section className="grid grid-cols-1 lg:grid-cols-3 my-8">
        {services.map((service) => (
          <ServicesCard
            key={service._id}
            service={service}
            img={service?.img}
            title={service?.title}
            description={service?.description}
          />
        ))}
      </section>
      <section className="lg:w-4/5 mx-auto text-left my-16">
        <div
          className="card lg:card-side bg-base-100 shadow-xl "
          style={{ alignItems: 'center' }}
        >
          <figure className="lg:pr-8">
            <img
              width={'458px'}
              height={'476px'}
              src={treatment}
              alt="treatment"
            />
          </figure>
          <div className="card-body lg:w-2/3">
            <h2 className="card-title text-3xl">
              Exceptional Dental Care, on Your Terms
            </h2>
            <p className="text-sm my-3">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <div className="card-actions ">
              <button className="btn btn-primary bg-gradient-to-r from-secondary to-primary font-bold text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Services;
