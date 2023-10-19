import { useEffect, useState } from 'react';
import { Vocab as VocabModel } from '../models/vocab';
import * as WordsApi from '../services/api';

function VocabCard() {
  const [words, setWords] = useState<VocabModel[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const words = await WordsApi.fetchWords();
        setWords(words);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWords();
  }, []);

  return <div></div>;
}

export default VocabCard;
