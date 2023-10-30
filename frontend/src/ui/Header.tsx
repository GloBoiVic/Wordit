import { Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-12 px-4 py-2 mx-auto border">
      <Link as={NavLink} to="/">
        <h1 className="text-4xl font-bold leading-relaxed uppercase">Wordit</h1>
      </Link>

      <ul className="flex gap-8">
        {/* TODO: Add proper routes to links */}
        <Link as={NavLink} to="/users/signup">
          Sign Up
        </Link>
        <Link as={NavLink} to="/users/login">
          Log In
        </Link>
      </ul>
    </header>
  );
}

export default Header;
