import { TrashIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { useState } from 'react';
import { VocabModel } from '../../models/vocabModel';
import { formatDate } from '../../utils/formatDate';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import useDeleteWord from './useDeleteWord';

interface VocabCardProps {
  word: VocabModel;
  onWordClicked: (word: VocabModel) => void;
}

function VocabCard({ word, onWordClicked }: VocabCardProps) {
  const { word: vocabWord, definition, contextExample, partOfSpeech, createdAt, updatedAt } = word;
  const { deleteWord } = useDeleteWord();
  const [showDeleteWordModal, setShowDeleteWordModal] = useState(false);

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <Card
      isPressable
      onClick={() => onWordClicked(word)}
      className="w-[15rem] cursor-pointer shadow-md shadow-secondary dark:border dark:border-secondary"
    >
      <CardHeader className="flex items-center border-b dark:border-secondary">
        <div className="mr-auto space-x-2">
          <span className="text-2xl font-bold capitalize ">{vocabWord}</span>
          <span className="text-sm text-slate-400">{partOfSpeech}</span>
        </div>
        <TrashIcon
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteWordModal(true);
          }}
          className="w-4 h-4 text-red-600 cursor-pointer"
        />
        {showDeleteWordModal && (
          <ConfirmDeleteModal
            onDismiss={() => setShowDeleteWordModal(false)}
            onConfirmDelete={() => deleteWord(word._id)}
            vocabWord={vocabWord}
          />
        )}
      </CardHeader>
      <CardBody className="pb-2">{definition}</CardBody>
      {contextExample && contextExample?.length > 0 && (
        <CardBody className="py-0 text-slate-400">{contextExample}</CardBody>
      )}
      <CardFooter className="text-right">
        <p className="w-full text-sm text-foreground/30">{createdUpdatedText}</p>
      </CardFooter>
    </Card>
  );
}

export default VocabCard;
