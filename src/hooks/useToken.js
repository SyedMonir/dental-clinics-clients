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
        .put(
          `https://dental-clinics.herokuapp.com/user/${email}`,
          currentUser,
          { headers }
        )
        .then((response) => {
          // console.log(response?.data);
          const accessToken = response?.data?.token;
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
        });
    }
  }, [user]);

  //   useEffect( () =>{
  //     const email = user?.user?.email;
  //     const currentUser = {email: email};
  //     if(email){
  //         fetch(`https://dental-clinics.herokuapp.com/user/${email}`, {
  //             method:'PUT',
  //             headers: {
  //                 'content-type': 'application/json'
  //             },
  //             body:JSON.stringify(currentUser)
  //         })
  //         .then(res=>res.json())
  //         .then(data => {
  //             console.log('data inside useToken', data);
  //             const accessToken = data.token;
  //             localStorage.setItem('accessToken', accessToken);
  //             setToken(accessToken);
  //         })
  //     }

  // }, [user]);
  return [token];
};

export default useToken;
