const { Schema, model } = require('mongoose');

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
      enum: ['pet', 'book', 'wand', 'potions'],
      required: true
    },
    author: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Shop', shopSchema);