import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '../../services/api';

function useGetUsers() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getLoggedInUser,
    retry: false,
  });
  return { isLoading, user, error };
}

export default useGetUsers;
