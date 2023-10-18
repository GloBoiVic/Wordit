import env from './utils/validateEnv';
import app from './app';
import mongoose from 'mongoose';

const port = env.PORT || 5010;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
