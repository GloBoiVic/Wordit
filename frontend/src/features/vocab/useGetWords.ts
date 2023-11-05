import { useQuery } from '@tanstack/react-query';
import { fetchWords } from '../../services/api';
import { ChangeEvent, useCallback, useState } from 'react';
import { VocabModel } from '../../models/vocabModel';

function useGetWords() {
  // const [searchQuery, setSearchQuery] = useState('');

  // const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setSearchQuery(e.target.value);
  // };

  // const filteredWords = useCallback(
  //   (words: VocabModel[]) => {
  //     if (!searchQuery) return words;

  //     return words.filter((word) => word.word.includes(searchQuery.toLowerCase()));
  //   },
  //   [searchQuery],
  // );
  const {
    isLoading,
    data: words,
    error,
  } = useQuery({
    queryKey: ['words'],
    queryFn: fetchWords,
    // select: filteredWords,
  });

  return { isLoading, words, error };
}

export default useGetWords;
