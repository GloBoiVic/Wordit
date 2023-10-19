export interface Vocab {
  status: string;
  data: [
    {
      _id: string;
      word: string;
      definition: string;
      tags: [string];
      createdAt: string;
      updatedAt: string;
    },
  ];
}
