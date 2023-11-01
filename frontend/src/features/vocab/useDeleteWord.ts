import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWord as deleteWordApi } from '../../services/api';
import toast from 'react-hot-toast';

function useDeleteWord() {
  const queryClient = useQueryClient();

  const { mutate: deleteWord, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteWordApi(id),
    onSuccess: () => {
      toast.error('Word successfully deleted', {
        className: 'border-red-500 bg-red-400 text-stone-100 p-3',
      });
      queryClient.invalidateQueries({
        queryKey: ['words'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteWord };
}

export default useDeleteWord;
