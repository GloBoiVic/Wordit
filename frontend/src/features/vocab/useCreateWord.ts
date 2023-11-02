import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createWord as createWordApi } from '../../services/api';

function useCreateWord() {
  const queryClient = useQueryClient();
  const { mutate: createWord, isPending: isCreating } = useMutation({
    mutationFn: createWordApi,
    onSuccess: () => {
      toast.success('Word successfully created', {
        className: 'border-green-500 bg-green-400 text-stone-100 p-3',
      });
      queryClient.invalidateQueries({ queryKey: ['words'] });
    },
    onError: (err) => console.error(err.message),
  });
  return { isCreating, createWord };
}

export default useCreateWord;
