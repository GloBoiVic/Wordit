import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/api';
import toast from 'react-hot-toast';

function useLoginUser() {
  const queryClient = useQueryClient();
  const { mutate: logInUser, isPending: isLogginIn } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Login successful');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { logInUser, isLogginIn };
}

export default useLoginUser;
