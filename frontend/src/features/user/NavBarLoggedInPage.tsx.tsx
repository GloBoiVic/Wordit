import { Avatar, Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import useGetUsers from './useGetUser';
import useLogoutUser from './useLogoutUser';

function NavBarLoggedInPage() {
  const { user } = useGetUsers();
  const { logoutUser } = useLogoutUser();

  async function logout() {
    logoutUser();
  }
  return (
    <>
      {/* TODO: Add link to user profile page */}
      <Avatar src={user?.profilePicture} />
      <Link as={NavLink} to="/vocab" underline="hover">
        My Words
      </Link>
      <Link as={NavLink} underline="hover" to="/" onClick={logout}>
        Log Out
      </Link>
    </>
  );
}

export default NavBarLoggedInPage;
