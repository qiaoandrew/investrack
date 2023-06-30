import mongoose from 'mongoose';

const { Schema } = mongoose;

const HoldingSchema = new Schema({
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
  stock: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Holding ||
  mongoose.model('Holding', HoldingSchema);
