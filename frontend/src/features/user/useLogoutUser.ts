import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/api';

function useLogoutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['users'] });
      navigate('/');
    },
    onError: (err) => console.error(err.message),
  });

  return { logoutUser, isLoggingOut };
}

export default useLogoutUser;
