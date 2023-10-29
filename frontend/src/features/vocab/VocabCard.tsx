import { TrashIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { VocabModel } from '../../models/vocabModel';
import { formatDate } from '../../utils/formatDate';

interface VocabCardProps {
  word: VocabModel;
  onDeleteWordClicked: (word: VocabModel) => void;
  onWordClicked: (word: VocabModel) => void;
}

function VocabCard({ word, onDeleteWordClicked, onWordClicked }: VocabCardProps) {
  const { word: vocabWord, definition, partOfSpeech, createdAt, updatedAt } = word;

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
        <TrashIcon
          onClick={(e) => {
            e.stopPropagation();
            onDeleteWordClicked(word);
            toast.error('Word Deleted', {
              className: 'border-red-500 bg-red-500 text-stone-100 p-3',
            });
          }}
          className="w-4 h-4 text-red-600 cursor-pointer"
        />
      </CardHeader>
      <CardBody>{definition}</CardBody>
      <CardFooter className="text-right">
        <p className="w-full text-sm text-foreground/30">{createdUpdatedText}</p>
      </CardFooter>
    </Card>
  );
}

export default VocabCard;
