import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';

const Info = () => {
  const title = {
    clock: 'Opening Hours',
    marker: 'Visit Our Location',
    phone: 'Contact us now',
  };
  const description = {
    clock: 'Lorem Ipsum is simply dummy text of the pri',
    marker: 'Chittagong, Bangladesh',
    phone: '01988512131',
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 my-8 px-12">
      <InfoCard
        img={clock}
        title={title?.clock}
        description={description?.clock}
        bgColor={'bg-gradient-to-r from-secondary to-primary'}
      />
      <InfoCard
        img={marker}
        title={title?.marker}
        description={description?.marker}
        bgColor={'bg-accent'}
      />
      <InfoCard
        img={phone}
        title={title?.phone}
        description={description?.phone}
        bgColor={'bg-gradient-to-r from-secondary to-primary'}
      />
    </div>
  );
};

export default Info;
