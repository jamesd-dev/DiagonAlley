const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema(
  {
     username: {
       type: String,
       required: true,
       unique: true
     }, 
     email: {
      type: String,
      required: true,
      unique: true
    },
     passwordHash: {
      type: String,
      required: true
    },
      hogwartsHouse: {
        type: String,
        enum : ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff', 'Unsorted'],
        required: true
      },
    ownedItems: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Shop'
    }]
  },
  {
    timestamps: true
  }
);

 module.exports = model('User', userSchema);
