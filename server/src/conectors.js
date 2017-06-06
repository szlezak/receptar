import bluebird from 'bluebird';
import mongoose from 'mongoose';

mongoose.Promise = bluebird;

mongoose.connect('mongodb://localhost/receptar')
const mongo = mongoose.connection;

mongo.on('error', () => console.log('Failed to connect to database'))
  .once('open', () => console.log('Connected to DB'))

export { mongo };
