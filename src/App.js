import { Route, Routes } from 'react-router-dom';
import './App.css';
// Skeleton CSS
import 'react-loading-skeleton/dist/skeleton.css';

import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import ContactUs from './Pages/ContactUs/ContactUs';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Reviews from './Pages/Reviews/Reviews';
import Navbar from './Pages/Shared/Navbar';
import Signup from './Pages/Login/Signup';

function App() {
  return (
    <section className="max-w-[1400px] mx-auto">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </section>
  );
}

export default App;
