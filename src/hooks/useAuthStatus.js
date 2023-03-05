import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState(true); //checking status

  useEffect(() => {
    const auth = getAuth();
    //onAuthStateChanged - https://rb.gy/9fjii8
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setStatus(false);
    });
  });

  return { loggedIn, status };
};
