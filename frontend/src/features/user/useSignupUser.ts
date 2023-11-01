import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/api';

function useSignupUser() {
  const navigate = useNavigate();
  const { mutate: signupUser, isPending: isSigningUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate('/vocab');
    },
    onError: (err) => console.error(err.message),
  });

  return { signupUser, isSigningUp };
}

export default useSignupUser;
