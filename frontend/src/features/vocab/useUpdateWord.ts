import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateWord as updateWordApi } from '../../services/api';
import { z } from 'zod';
import { wordSchema } from '../../validators/validateWordInput';

type TInput = z.infer<typeof wordSchema>;

interface IUpdateWords {
  id: string;
  values: TInput;
}

function useUpdateWord() {
  const queryClient = useQueryClient();
  const { mutate: updateWord, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, values }: IUpdateWords) => updateWordApi(id, values),
    onSuccess: () => {
      toast.success('Word successfully created', {
        className: 'border-green-500 bg-green-400 text-stone-100 p-3',
      });
      queryClient.invalidateQueries({ queryKey: ['words'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateWord };
}

export default useUpdateWord;
