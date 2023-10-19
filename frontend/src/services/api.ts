import axios from 'axios';
import { Vocab } from '../models/vocab';

export async function fetchWords(): Promise<Vocab[]> {
  const response = await axios.get('/api/v1/words');

  return response.data;
}
