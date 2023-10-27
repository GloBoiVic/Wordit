import { useEffect, useState } from 'react';
import { VocabModel } from '../../models/vocabModel';
import * as WordsApi from '../../services/api';
import Sidebar from '../../ui/Sidebar';
import VocabCard from './VocabCard';
import CreateEditWordModal from './CreateEditWordModal';
import { Skeleton } from '@nextui-org/react';
import ErrorPage from '../../ui/ErrorPage';

function Vocab() {
  const [wordsLoading, setWordsLoading] = useState(true);
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [words, setWords] = useState<VocabModel[]>([]);
  const [wordToEdit, setWordToEdit] = useState<VocabModel | null>(null);
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

  async function deleteWord(word: VocabModel) {
    try {
      await WordsApi.deleteWord(word._id);
      setWords(words.filter((existingWord) => existingWord._id !== word._id));
    } catch (error) {
      console.error(error);
    }
  }

  if (showWordLoadingError) return <ErrorPage />;

  const wordsGrid = (
    <main className="grid flex-1 max-w-2xl gap-2 px-2 py-4 mx-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min lg:mx-0 sm:grid-cols-2">
      {words.map((word) => (
        <VocabCard onWordClicked={setWordToEdit} onDeleteWordClicked={deleteWord} word={word} key={word._id} />
      ))}
    </main>
  );

  return (
    <div className="flex flex-col h-[90vh] gap-3 px-4 sm:flex-row">
      <Sidebar onDismiss={() => setShowAddWordModal(true)}>
        {showAddWordModal && (
          <CreateEditWordModal
            onDismiss={() => setShowAddWordModal(false)}
            onWordSaved={(newWord) => {
              setWords([...words, newWord]);
              setShowAddWordModal(false);
            }}
          />
        )}
        {wordToEdit && (
          <CreateEditWordModal
            wordToEdit={wordToEdit}
            onDismiss={() => setWordToEdit(null)}
            onWordSaved={(updatedWord) => {
              setWords(
                words.map((existingWord) => (existingWord._id === updatedWord._id ? updatedWord : existingWord)),
              );
              setWordToEdit(null);
            }}
          />
        )}
      </Sidebar>

      {wordsLoading && (
        <div className="grid flex-1 gap-2 px-2 py-4 mx-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min lg:mx-0 sm:grid-cols-2 min-w-fit">
          <Skeleton className="w-[18rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-slate-700"></Skeleton>
          <Skeleton className="w-[18rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-slate-700"></Skeleton>
          <Skeleton className="w-[18rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-slate-700"></Skeleton>
        </div>
      )}

      {!wordsLoading && !showWordLoadingError && (
        <>
          {words.length > 0 ? (
            wordsGrid
          ) : (
            <p className="mx-3 text-xl font-semibold">You dont have any words saved. Add your first word</p>
          )}
        </>
      )}
    </div>
  );
}

export default Vocab;
