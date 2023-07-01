import mongoose from 'mongoose';

const { Schema } = mongoose;

export const HoldingSchema = new Schema({
  purchaseDate: {
    type: Date,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Holding ||
  mongoose.model('Holding', HoldingSchema);
