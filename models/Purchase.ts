import mongoose from 'mongoose';

const { Schema } = mongoose;

export const PurchaseSchema = new Schema({
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

export default mongoose.models.Purchase ||
  mongoose.model('Purchase', PurchaseSchema);
