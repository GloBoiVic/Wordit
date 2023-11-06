import { useQuery } from '@tanstack/react-query';
import { fetchWords } from '../../services/api';
import { ChangeEvent, useCallback, useState } from 'react';
import { VocabModel } from '../../models/vocabModel';

function useGetWords() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const filteredWords = useCallback(
    (words: VocabModel[]) => {
      if (!searchQuery) return words;

      return (
        searchQuery.length &&
        words.filter((word: VocabModel) =>
          word.word.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      );
    },
    [searchQuery],
  );
  const {
    isLoading,
    data: words = [],
    error,
  } = useQuery({
    queryKey: ['words'],
    queryFn: fetchWords,
    // select: (words) =>
    //   words.filter((word: VocabModel) =>
    //     word.word.toLowerCase().includes(searchQuery.toLowerCase()),
    //   ),
    // select: filteredWords,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return { isLoading, words, error, searchQuery, handleSearchQuery };
}

export default useGetWords;
