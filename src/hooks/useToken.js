import { useEffect, useState } from 'react';
import axios from 'axios';

const useToken = (user) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    // console.log(user?.user);
    const email = user?.user?.email;
    const currentUser = { email: email };
    if (email) {
      const headers = {
        'content-type': 'application/json',
      };
      axios
        .put(`http://localhost:5000/user/${email}`, currentUser, { headers })
        .then((response) => {
          // console.log(response?.data);
          const accessToken = response?.data?.token;
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
