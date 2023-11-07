import { useMutation } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/api';

function useCreateUser() {
  // const navigate = useNavigate();
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // navigate('/vocab');
    },
    onError: (err) => console.error(err.message),
  });

  return { createUser, isCreating };
}

export default useCreateUser;
