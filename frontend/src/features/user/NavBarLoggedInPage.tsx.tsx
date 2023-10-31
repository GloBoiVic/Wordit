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
      {/* TODO: Add proper routes to links */}
      <Avatar src={user?.profilePicture} />
      <Link as={NavLink} to="/users/login" onClick={logout}>
        Log Out
      </Link>
    </>
  );
}

export default NavBarLoggedInPage;
