import mongoose from 'mongoose';
import { PurchaseSchema } from './Holding';

const { Schema } = mongoose;

const PortfolioSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  purchases: {
    type: Map,
    of: [PurchaseSchema],
    required: true,
  },
});

export default mongoose.models.Portfolio ||
  mongoose.model('Portfolio', PortfolioSchema);
