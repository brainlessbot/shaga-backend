import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 64,
    required: true,
  },
  phone: {
    type: String,
    minlength: 8,
    maxlength: 16,
    required: true,
  },
  content: {
    type: String,
    maxLength: 4096,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Message', messageSchema);
