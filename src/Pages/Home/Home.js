import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <>
      <Banner />
      <Info />
      <Services />
      <MakeAppointment />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
