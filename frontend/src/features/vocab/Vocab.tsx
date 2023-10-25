import { useEffect, useState } from 'react';
import { Vocab as VocabModel } from '../../models/vocab';
import * as WordsApi from '../../services/api';
import Sidebar from '../../ui/Sidebar';
import VocalCard from './VocalCard';
import CreateWordModal from './CreateWordModal';

function Vocab() {
  const [wordsLoading, setWordsLoading] = useState(true);
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [words, setWords] = useState<VocabModel[]>([]);
  const [showWordLoadingError, setShowWordLoadingError] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setShowWordLoadingError(false);
        setWordsLoading(true);
        const data = await WordsApi.fetchWords();

        setWords(data);
      } catch (error) {
        console.error(error);
        setShowWordLoadingError(true);
      } finally {
        setWordsLoading(false);
      }
    };
    fetchWords();
  }, []);

  return (
    <div className="flex gap-3 px-4 sm:flex-col">
      <Sidebar onDismiss={() => setShowAddWordModal(true)}>
        {showAddWordModal && (
          <CreateWordModal
            onDismiss={() => setShowAddWordModal(false)}
            onWordSaved={(newWord) => {
              setWords([...words, newWord]);
              setShowAddWordModal(false);
            }}
          />
        )}
      </Sidebar>
      <main className="grid flex-1 max-w-2xl gap-2 px-2 py-4 lg:mx-0 min-h-fit min-w-fit lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 sm:place-content-center">
        {words.length > 0 && words.map((word) => <VocalCard word={word} key={word._id} />)}
      </main>
    </div>
  );
}

export default Vocab;
