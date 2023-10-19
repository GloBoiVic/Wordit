import { Schema, InferSchemaType, model } from 'mongoose';

const wordSchema = new Schema(
  {
    word: {
      type: String,
      lowercase: true,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    context: {
      type: String,
    },
    tags: [String],
  },
  { timestamps: true },
);

type Word = InferSchemaType<typeof wordSchema>;

export default model<Word>('Word', wordSchema);
