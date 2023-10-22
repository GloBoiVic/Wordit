import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Vocab } from '../../models/vocab';

interface VocabCardProps {
  word: Vocab;
}

function VocalCard({ word }: VocabCardProps) {
  const { word: vocabWord, definition } = word;
  return (
    <Card className="max-w-xs">
      <CardHeader className="flex items-center space-x-4">
        <span className="text-2xl font-bold capitalize ">{vocabWord}</span>
        <span className="text-sm text-slate-400">noun</span>
      </CardHeader>
      <CardBody>{definition}</CardBody>
    </Card>
  );
}

export default VocalCard;
