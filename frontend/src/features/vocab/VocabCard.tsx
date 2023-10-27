import { TrashIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { VocabModel } from '../../models/vocabModel';
import toast from 'react-hot-toast';

interface VocabCardProps {
  word: VocabModel;
  onDeleteWordClicked: (word: VocabModel) => void;
  onWordClicked: (word: VocabModel) => void;
}

function VocabCard({ word, onDeleteWordClicked, onWordClicked }: VocabCardProps) {
  const { word: vocabWord, definition } = word;
  return (
    <Card isPressable onClick={() => onWordClicked(word)} className="max-w-xs cursor-pointer">
      <CardHeader className="flex items-center">
        {/* TODO: Fix delete icon being squished on screen shrink */}
        <div className="mr-auto space-x-2">
          <span className="text-2xl font-bold capitalize ">{vocabWord}</span>
          <span className="text-sm text-slate-400">noun</span>
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
    </Card>
  );
}

export default VocabCard;
