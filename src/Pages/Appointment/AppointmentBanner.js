import React from 'react';
import background from '../../assets/images/bg.png';
import chair from '../../assets/images/chair.png';

// React Day Picker
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ date, setDate }) => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt="" />
          <div>
            <DayPicker
              mode="single"
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 5}
              captionLayout="dropdown"
              selected={date}
              onSelect={setDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentBanner;
