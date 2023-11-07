import { useQuery } from '@tanstack/react-query';
import { fetchWords } from '../../services/api';

function useGetWords() {
  const {
    isLoading,
    data: words = [],
    error,
  } = useQuery({
    queryKey: ['words'],
    queryFn: fetchWords,
  });

  return { isLoading, words, error };
}

export default useGetWords;
