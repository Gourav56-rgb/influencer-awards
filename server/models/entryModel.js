import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  theme: String,
  influencerId: String,
  title: String,
  description: String,
  imagePath: String,
  votes: { type: Number, default: 0 },
}, {
  timestamps: true
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry
