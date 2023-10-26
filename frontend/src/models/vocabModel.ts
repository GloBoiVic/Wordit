export interface VocabModel {
  _id: string;
  word: string;
  contextExample?: string;
  definition: string;
  tags: [string];
  createdAt: string;
  updatedAt: string;
}
