import mongoose from 'mongoose';

const { Schema } = mongoose;

const HoldingSchema = new Schema({
  stock: {
    type: String,
    required: true,
  },
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
