import mongoose from 'mongoose';
import { HoldingSchema } from './Holding';

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
  holdings: {
    type: Map,
    of: [HoldingSchema],
    required: true,
  },
});

export default mongoose.models.Portfolio ||
  mongoose.model('Portfolio', PortfolioSchema);
