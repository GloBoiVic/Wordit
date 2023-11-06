import { Skeleton } from '@nextui-org/react';
import { useState } from 'react';
import { VocabModel } from '../../models/vocabModel';
import ErrorVocabPage from '../../ui/ErrorVocabPage';
import Sidebar from '../../ui/Sidebar';
import CreateEditWordModal from './CreateEditWordModal';
import VocabCard from './VocabCard';
import useGetWords from './useGetWords';

function Vocab() {
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<VocabModel | null>(null);
  const { words, isLoading, error } = useGetWords();
  console.log(
    words?.filter((word: VocabModel) => word.word.toLowerCase().includes('DEMO'.toLowerCase())),
  );

  if (error) return <ErrorVocabPage />;

  const wordsGrid = (
    <main className="grid flex-1 max-w-2xl gap-2 px-2 py-4 mx-3 overflow-auto lg:grid-cols-3 xl:grid-cols-4 auto-rows-min lg:mx-0 sm:grid-cols-2 min-w-fit sm:max-w-fit">
      {words?.map((word: VocabModel) => (
        <VocabCard onWordClicked={setWordToEdit} word={word} key={word._id} />
      ))}
    </main>
  );

  return (
    <div className="flex flex-col h-[90vh] gap-3 px-4 sm:flex-row">
      <Sidebar onDismiss={() => setShowAddWordModal(true)}>
        {showAddWordModal && <CreateEditWordModal onDismiss={() => setShowAddWordModal(false)} />}
        {wordToEdit && (
          <CreateEditWordModal
            wordToEdit={wordToEdit}
            onDismiss={() => setWordToEdit(null)}
            onWordEdit={() => setWordToEdit(null)}
          />
        )}
      </Sidebar>

      {isLoading && (
        <div className="grid flex-1 max-w-2xl gap-2 px-2 py-4 mx-3 overflow-auto lg:grid-cols-3 xl:grid-cols-4 auto-rows-min lg:mx-0 sm:grid-cols-2 min-w-fit sm:max-w-fit">
          <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
          <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
          <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
          <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {words && words.length ? (
            wordsGrid
          ) : (
            <p className="mx-3 text-xl font-semibold">
              You dont have any words saved. Add your first word
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Vocab;
