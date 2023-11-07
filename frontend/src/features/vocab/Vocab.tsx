import { Skeleton } from '@nextui-org/react';
import { ChangeEvent, useState } from 'react';
import { VocabModel } from '../../models/vocabModel';
import ErrorVocabPage from '../../ui/ErrorVocabPage';
import Sidebar from '../../ui/Sidebar';
import CreateEditWordModal from './CreateEditWordModal';
import VocabCard from './VocabCard';
import useGetWords from './useGetWords';

function Vocab() {
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<VocabModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { words, isLoading, error } = useGetWords();
  console.log(words);
  console.log(
    words?.filter((word: VocabModel) => word.word.toLowerCase().includes('DEMO'.toLowerCase())),
  );

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  let filteredWords;
  if (!searchQuery || searchQuery.length === 1) filteredWords = words;
  if (searchQuery.length > 1)
    filteredWords = words?.filter((word: VocabModel) =>
      word.word.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  if (error) return <ErrorVocabPage />;

  // ugly overflow scroll
  const wordsGrid = (
    <main className="grid flex-1 max-w-2xl gap-2 px-2 py-4 mx-3 overflow-scroll lg:grid-cols-3 xl:grid-cols-4 auto-rows-min lg:mx-0 sm:grid-cols-2 min-w-fit sm:max-w-fit">
      {filteredWords?.map((word: VocabModel) => (
        <VocabCard onWordClicked={setWordToEdit} word={word} key={word._id} />
      ))}
    </main>
  );

  return (
    <div className="flex flex-col h-[90vh] gap-3 px-4 sm:flex-row">
      <Sidebar
        onDismiss={() => setShowAddWordModal(true)}
        searchQuery={searchQuery}
        onChangeSearchQuery={handleSearchQuery}
      >
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
          {filteredWords && filteredWords.length ? (
            wordsGrid
          ) : (
            <p className="mx-3 text-xl font-semibold">
              You dont have any words saved. Add your first word
            </p>
          )}
        </>
      )}
      {/* TODO: Will need a nested ternary to check tell the user that the word they searched does not exist */}
      {/* {!isLoading && !error && filteredWords.length === 0 && (
        <p className="mx-3 text-xl font-semibold">
          You dont have any words saved. Add your first word
        </p>
      )} */}
    </div>
  );
}

export default Vocab;
