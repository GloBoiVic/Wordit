import { useEffect, useState } from 'react';
import * as WordsApi from '../services/api';
import { UserModel } from '../models/userModel';

function useLoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);

  // useEffect(() => {
  //   async function fetchLoggedInUser() {
  //     try {
  //       const user = await WordsApi.getLoggedInUser();
  //       setLoggedInUser(user);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchLoggedInUser();
  // }, []);
  return { loggedInUser, setLoggedInUser };
}

export default useLoggedInUser;
