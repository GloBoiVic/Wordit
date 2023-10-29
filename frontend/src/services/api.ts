import { BadRequestError, ConflictError, InternalServerError, UnauthorizedError } from '../errors/http_errors';
import { VocabModel } from '../models/vocabModel';
import { UserModel } from '../models/userModel';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    switch (response.status) {
      case 400:
        throw new BadRequestError(errorMessage);
      case 401:
        throw new UnauthorizedError(errorMessage);
      case 409:
        throw new ConflictError(errorMessage);
      case 500:
        throw new InternalServerError(errorMessage);
      default:
        throw Error(`Request failed with status: ${response.status}. message: ${errorMessage}`);
    }
    // if (response.status === 401) {
    //   throw new UnauthorizedError(errorMessage);
    // }
    // if (response.status === 409) {
    //   throw new ConflictError(errorMessage);
    // }
    // if (response.status === 400) {
    //   throw new BadRequestError(errorMessage);
    // }
    // throw Error(`Request failed with status: ${response.status}. message: ${errorMessage}`);
  }
}

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<UserModel> {
  const response = await fetchData('/api/v1/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
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
  console.log(response);

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
