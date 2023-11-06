import { Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

function NavBarLoggedOutPage() {
  return (
    <>
      <Link as={NavLink} to="/users/signup" underline="hover" className="text-accent">
        Sign Up
      </Link>
      <Link as={NavLink} to="/users/login" underline="hover" className="text-accent">
        Login
      </Link>
    </>
  );
}

export default NavBarLoggedOutPage;
