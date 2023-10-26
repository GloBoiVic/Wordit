import { VocabModel } from '../models/vocabModel';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    throw Error(`Request failed with status: ${response.status}.`);
    //   const errorBody = await response.json();
    //   const errorMessage = errorBody.error;

    //   if (response.status === 401) {
    //     throw new UnauthorizedError(errorMessage);
    //   }

    //   if (response.status === 409) {
    //     throw new ConflictError(errorMessage);
    //   }

    //   if (response.status === 400) {
    //     throw new MissingParamsError(errorMessage);
    //   }

    //   throw Error(`Request failed with status: ${response.status}. message: ${errorMessage}`);
    // }
  }
}

export async function fetchWords(): Promise<VocabModel[]> {
  const response = await fetchData('/api/v1/words', {
    method: 'GET',
  });
  return response.json();
}

interface wordInput {
  word: string;
  contextExample?: string;
}
export async function createWord(word: wordInput): Promise<VocabModel> {
  const response = await fetchData('/api/v1/words', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  return response.json();
}

export async function updateWord(wordId: string, word: wordInput): Promise<VocabModel> {
  const response = await fetchData(`/api/v1/words/${wordId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  return response.json();
}

export async function deleteWord(wordId: string) {
  await fetchData(`/api/v1/words/${wordId}`, {
    method: 'DELETE',
  });
}
