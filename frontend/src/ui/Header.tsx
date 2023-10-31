import { Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import useLoggedInUser from '../hooks/useLoggedInUser';
import NavBarLoggedInPage from '../features/user/NavBarLoggedInPage.tsx';
import { useEffect } from 'react';
import * as WordsApi from '../services/api';
import NavBarLoggedOutPage from '../features/user/NavBarLoggedOutPage.tsx';
import useGetUsers from '../features/user/useGetUser.ts';

function Header() {
  const { user } = useGetUsers();

  return (
    <header className="flex items-center justify-between w-full h-12 px-4 py-2 mx-auto border">
      <Link as={NavLink} to="/">
        <h1 className="text-4xl font-bold leading-relaxed uppercase">Wordit</h1>
      </Link>

      <ul className="flex gap-8">
        {user ? <NavBarLoggedInPage /> : <NavBarLoggedOutPage />}
        {/* {!loggedInUser && <NavBarLoggedOutPage />} */}
      </ul>
    </header>
  );
}

export default Header;
