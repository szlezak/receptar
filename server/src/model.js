import mongoose from 'mongoose';

import { Schema } from 'mongoose';

const recipeSchema = new Schema({
  id: String,
  title: String,
  preparationTime: Number,
  servingCount: Number,
  sideDish: String,
  directions: String,
  // lastModifiedDate: Date,
});
const recipeModel = mongoose.model('recipe', recipeSchema);

export { recipeModel };

