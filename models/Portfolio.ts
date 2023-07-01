import mongoose from 'mongoose';

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
  holdings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Holding',
      required: true,
    },
  ],
});

export default mongoose.models.Portfolio ||
  mongoose.model('Portfolio', PortfolioSchema);
