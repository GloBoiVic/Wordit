import { RequestHandler } from 'express';
import axios from 'axios';
import env from '../utils/validateEnv';
import wordModel from '../models/wordModel';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

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
  context?: string;
}

export const createWord: RequestHandler<unknown, unknown, CreateWordBody, unknown> = async (req, res, next) => {
  const { word, context } = req.body;

  try {
    if (!word) throw createHttpError(400, 'Vocabulary word cannot be blank');

    const existingWord = await wordModel.findOne({ word: word });
    console.log(existingWord);

    if (existingWord) throw createHttpError(409, 'This word already exists');

    const apiResponse = await axios.get(`${env.DICTIONARY_API}/${word}`);

    //TODO: Add error handling for no definition found. 404 Error

    const definition = apiResponse.data[0].meanings[0].definitions[0].definition;

    //TODO: Grab parts of speech and add it to tags

    const newWord = await wordModel.create({
      word,
      definition,
      context,
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
  context?: string;
}

export const updateWord: RequestHandler<UpdateWordParams, unknown, UpdateWordBody, unknown> = async (
  req,
  res,
  next,
) => {
  const wordId = req.params.wordId;
  const newWord = req.body.word;
  const newContext = req.body.context;

  try {
    if (!mongoose.isValidObjectId(wordId)) throw createHttpError(400, 'Invalid note id');
    if (!newWord) throw createHttpError(400, 'Vocabulary word cannot be blank');

    const word = await wordModel.findById(wordId);

    if (!word) throw createHttpError(404, ' Word not found');

    const apiResponse = await axios.get(`${env.DICTIONARY_API}/${newWord}`);

    const definition = apiResponse.data[0].meanings[0].definitions[0].definition;

    word.word = newWord;
    word.definition = definition;
    word.context = newContext;

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
