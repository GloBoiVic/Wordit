import { TrashIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { VocabModel } from '../../models/vocabModel';
import { formatDate } from '../../utils/formatDate';
import useDeleteWord from './useDeleteWord';

interface VocabCardProps {
  word: VocabModel;
  onWordClicked: (word: VocabModel) => void;
}

function VocabCard({ word, onWordClicked }: VocabCardProps) {
  const { word: vocabWord, definition, contextExample, partOfSpeech, createdAt, updatedAt } = word;
  const { deleteWord } = useDeleteWord();

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <Card isPressable onClick={() => onWordClicked(word)} className="w-[15rem] cursor-pointer">
      <CardHeader className="flex items-center border-b">
        {/* TODO: Fix delete icon being squished on screen shrink */}
        <div className="mr-auto space-x-2">
          <span className="text-2xl font-bold capitalize ">{vocabWord}</span>
          <span className="text-sm text-slate-400">{partOfSpeech}</span>
        </div>
        {/* TODO: Add a popup modal and ask user to confirm they want to delete the word */}
        <TrashIcon
          onClick={(e) => {
            e.stopPropagation();
            deleteWord(word._id);
          }}
          className="w-4 h-4 text-red-600 cursor-pointer"
        />
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
