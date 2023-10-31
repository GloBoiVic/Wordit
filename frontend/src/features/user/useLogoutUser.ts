import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../services/api';
import toast from 'react-hot-toast';

function useLogoutUser() {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logout successful');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { logoutUser, isLoggingOut };
}

export default useLogoutUser;
