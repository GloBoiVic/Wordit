import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useState } from 'react';
import { VocabModel } from '../../models/vocabModel';
import { fetchWords } from '../../services/api';

function useGetWords() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const filteredWords = useCallback(
    (words: VocabModel[]) => {
      if (!searchQuery) return words;

      return words.filter((word: VocabModel) =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    },
    [searchQuery],
  );

  const {
    isLoading,
    data: words = [],
    error,
  } = useQuery({
    queryKey: ['words', searchQuery],
    queryFn: fetchWords,
    // select: (words) => {
    //   console.log(words);
    //   return words.filter((word: VocabModel) =>
    //     word.word.toLowerCase().includes(searchQuery.toLowerCase()),
    //   );
    // },
    select: filteredWords,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return { isLoading, words, error, searchQuery, handleSearchQuery };
}

export default useGetWords;
