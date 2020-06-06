const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

let shopSchema = new Schema(
  {
    icon: {
      type: String,
      required: [true, 'Must include an icon']
    },
    name: {
      type: String,
      required: [true, 'Must include a name'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Must include a description'],
      unique: true
    },
    itemType: {
      type: String,
      enum: ['pet', 'book', 'wand', 'potion', 'cloak'],
      required: true
    },
    owners: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    owned: {type: Boolean}, // whether the person viewing the item owns it. Gets updated as the item is processed to show
    author: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Shop', shopSchema);