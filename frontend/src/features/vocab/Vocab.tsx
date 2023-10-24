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
    <div className="container">
      <div className="flex flex-col grid-cols-4 gap-6 sm:grid">
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
        <main className="grid col-span-3 gap-2 lg:grid-cols-3 sm:grid-cols-2">
          {words.length > 0 && words.map((word) => <VocalCard word={word} key={word._id} />)}
        </main>
      </div>
    </div>
  );
}

export default Vocab;
