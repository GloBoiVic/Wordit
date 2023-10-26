import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import wordModel from '../models/wordModel';
import env from '../utils/validateEnv';

//TODO Add user authentication to routes

export const getWords: RequestHandler = async (req, res, next) => {
  try {
    const words = await wordModel.find();

    res.status(200).json(words);
  } catch (error) {
    next(error);
  }
};

export const getWord: RequestHandler = async (req, res, next) => {
  const wordId = req.params.wordId;
  try {
    if (!mongoose.isValidObjectId(wordId)) throw createHttpError(400, 'Invalid note id');

    const word = await wordModel.findById(wordId);

    if (!word) throw createHttpError(404, 'Word not found');

    res.status(200).json(word);
  } catch (error) {
    next(error);
  }
};

interface CreateWordBody {
  word: string;
  contextExample?: string;
}

export const createWord: RequestHandler<unknown, unknown, CreateWordBody, unknown> = async (req, res, next) => {
  const { word, contextExample } = req.body;

  try {
    if (!word) throw createHttpError(400, 'Vocabulary word cannot be blank');

    const existingWord = await wordModel.findOne({ word: word });
    console.log(existingWord);

    if (existingWord) throw createHttpError(409, 'This word already exists');

    const apiResponse = await fetch(`${env.DICTIONARY_API}/${word}`, {
      method: 'GET',
    });

    //TODO: Add error handling for no definition found. 404 Error
    const data = await apiResponse.json();

    const definition = data[0].meanings[0].definitions[0].definition;

    //TODO: Grab parts of speech and add it to tags

    const newWord = await wordModel.create({
      word,
      definition,
      contextExample,
    });
    res.status(201).json(newWord);
  } catch (error) {
    next(error);
  }
};

interface UpdateWordParams {
  wordId: string;
}

interface UpdateWordBody {
  word: string;
  contextExample?: string;
}

export const updateWord: RequestHandler<UpdateWordParams, unknown, UpdateWordBody, unknown> = async (
  req,
  res,
  next,
) => {
  const wordId = req.params.wordId;
  const newWord = req.body.word;
  const newContextExample = req.body.contextExample;

  try {
    if (!mongoose.isValidObjectId(wordId)) throw createHttpError(400, 'Invalid note id');
    if (!newWord) throw createHttpError(400, 'Vocabulary word cannot be blank');

    const word = await wordModel.findById(wordId);

    if (!word) throw createHttpError(404, ' Word not found');

    const apiResponse = await fetch(`${env.DICTIONARY_API}/${newWord}`, {
      method: 'GET',
    });

    const data = await apiResponse.json();

    const definition = data[0].meanings[0].definitions[0].definition;

    word.word = newWord;
    word.definition = definition;
    word.contextExample = newContextExample;

    const updatedWord = await word.save();

    res.status(200).json(updatedWord);
  } catch (error) {
    next(error);
  }
};

export const deleteWord: RequestHandler = async (req, res, next) => {
  const wordId = req.params.wordId;

  try {
    if (!mongoose.isValidObjectId(wordId)) throw createHttpError(400, 'Invalid note id');

    const word = await wordModel.findById(wordId);

    if (!word) throw createHttpError(404, 'Word not found');

    await word.deleteOne();

    res.status(204);
  } catch (error) {
    next(error);
  }
};
