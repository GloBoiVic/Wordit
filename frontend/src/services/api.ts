import axios from 'axios';
import { Vocab } from '../models/vocab';

export async function fetchWords(): Promise<Vocab[]> {
  const response = await axios.get('/api/v1/words');

  return response.data;
}

interface wordInput {
  word: string;
  context?: string;
}
export async function createWord(wordInput: wordInput): Promise<Vocab> {
  const response = await axios.post('/api/v1/words', {
    data: wordInput,
  });

  console.log(response);
}
