import { RequestHandler } from 'express';
import axios from 'axios';
import wordModel from '../models/wordModel';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

interface CreateWordBody {
  word: string;
  context?: string;
}

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
export const createWord: RequestHandler<unknown, unknown, CreateWordBody, unknown> = async (req, res, next) => {
  const { word, context } = req.body;

  try {
    if (!word) throw createHttpError(400, 'Vocabulary word cannot be blank');

    const apiResponse = await axios.get(`${API_URL}/${word}`);
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
