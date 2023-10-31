import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/api';
import toast from 'react-hot-toast';

function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('New user successfully created');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createUser, isCreating };
}

export default useCreateUser;
