import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';

function useLoginUser() {
  const navigate = useNavigate();
  const { mutate: loginUser, isPending: isLogginIn } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/vocab');
    },
    onError: (err) => console.error(err.message),
  });

  return { loginUser, isLogginIn };
}

export default useLoginUser;
