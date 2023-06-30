import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  watchlists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Watchlist',
    },
  ],
  portfolios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Portfolio',
    },
  ],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
