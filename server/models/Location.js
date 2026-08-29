const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        'School',
        'Hospital',
        'Police Station',
        'Court',
        'Home',
        'Park',
        'Other',
      ],
      required: true,
    },

    position: {
      x: {
        type: Number,
        required: true,
      },

      y: {
        type: Number,
        required: true,
      },
    },

    interactionRadius: {
      type: Number,
      default: 50,
    },

    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Location', locationSchema);
