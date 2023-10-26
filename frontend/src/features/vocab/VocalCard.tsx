import { TrashIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { VocabModel } from '../../models/vocabModel';

interface VocabCardProps {
  word: VocabModel;
  onDeleteWord: (word: VocabModel) => void;
}

function VocalCard({ word, onDeleteWord }: VocabCardProps) {
  const { word: vocabWord, definition } = word;
  return (
    <Card className="max-w-xs">
      <CardHeader className="flex items-center justify-between">
        <div className="space-x-2">
          <span className="text-2xl font-bold capitalize ">{vocabWord}</span>
          <span className="text-sm text-slate-400">noun</span>
        </div>
        <TrashIcon
          onClick={(e) => {
            e.stopPropagation();
            onDeleteWord(word);
          }}
          className="w-4 h-4 text-red-600 cursor-pointer"
        />
      </CardHeader>
      <CardBody>{definition}</CardBody>
    </Card>
  );
}

export default VocalCard;
