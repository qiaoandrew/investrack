import mongoose from 'mongoose';

const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  stocks: [
    {
      type: String,
      unique: true,
    },
  ],
});

export default mongoose.models.Watchlist ||
  mongoose.model('Watchlist', WatchlistSchema);
