import { Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

function NavBarLoggedOutPage() {
  return (
    <>
      <Link as={NavLink} to="/users/signup" underline="hover">
        Sign Up
      </Link>
      <Link as={NavLink} to="/users/login" underline="hover">
        Log In
      </Link>
    </>
  );
}

export default NavBarLoggedOutPage;
