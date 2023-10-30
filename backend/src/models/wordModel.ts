import { InferSchemaType, Schema, model } from 'mongoose';

const wordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    word: {
      type: String,
      lowercase: true,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    contextExample: {
      type: String,
    },
    partOfSpeech: {
      type: String,
    },
  },
  { timestamps: true },
);

type Word = InferSchemaType<typeof wordSchema>;

export default model<Word>('Word', wordSchema);
