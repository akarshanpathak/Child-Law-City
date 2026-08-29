
const mongoose = require('mongoose');

const gameProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    highScore: {
      type: Number,
      default: 0,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

gameProgressSchema.index(
  { user: 1, game: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  'GameProgress',
  gameProgressSchema
);

