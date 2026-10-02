const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  request_id: { type: String, required: true, trim: true, index: true },
  standard_id: { type: String, default: null, trim: true },
  rating: {
    type: String,
    enum: ['helpful', 'not_helpful'],
    required: true
  },
  comment: { type: String, default: '', maxlength: 5000 },
  category: { type: String, default: '', maxlength: 80 }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false
});

module.exports = mongoose.model('Feedback', feedbackSchema);
