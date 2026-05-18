import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['internship', 'placement', 'hackathon', 'scholarship'], required: true },
  link: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Opportunity', opportunitySchema);
