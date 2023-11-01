import { Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import NavBarLoggedInPage from '../features/user/NavBarLoggedInPage.tsx';
import NavBarLoggedOutPage from '../features/user/NavBarLoggedOutPage.tsx';
import useGetUsers from '../features/user/useGetUser.ts';

function Header() {
  const { user } = useGetUsers();
  console.log(user);

  return (
    <header className="flex items-center justify-between w-full h-12 px-4 py-2 mx-auto border">
      <Link as={NavLink} to="/">
        <h1 className="text-4xl font-bold leading-relaxed uppercase">Wordit</h1>
      </Link>

      <ul className="flex gap-8 uppercase">
        {user ? <NavBarLoggedInPage /> : <NavBarLoggedOutPage />}
        {/* {!loggedInUser && <NavBarLoggedOutPage />} */}
      </ul>
    </header>
  );
}

export default Header;
