import { Avatar, Link } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import { UserModel } from '../../models/userModel';
import * as WordsApi from '../../services/api';

interface NavBarLoggedInPageProps {
  user: UserModel;
  onLogoutSuccessful: () => void;
}

function NavBarLoggedInPage({ user, onLogoutSuccessful }: NavBarLoggedInPageProps) {
  async function logout() {
    try {
      await WordsApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <>
      {/* TODO: Add proper routes to links */}
      <Avatar src={user.profilePicture} />
      <Link as={NavLink} to="/users/login" onClick={logout}>
        Log Out
      </Link>
    </>
  );
}

export default NavBarLoggedInPage;
