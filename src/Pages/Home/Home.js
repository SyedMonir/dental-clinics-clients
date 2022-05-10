import React from 'react';
import Banner from './Banner';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';

const Home = () => {
  return (
    <>
      <Banner />
      <Info />
      <Services />
      <MakeAppointment />
    </>
  );
};

export default Home;
