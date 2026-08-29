
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    thumbnail: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      enum: [
        'Children Rights',
        'Safety',
        'Education',
        'Health',
        'Law',
        'Social',
        'Other',
      ],
      required: true,
    },

    targetAgeGroups: {
      type: [String],
      enum: ['5-7', '8-10', '11-13', '14-17'],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Game', gameSchema);

