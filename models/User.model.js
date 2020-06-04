const { Schema, model } = require('mongoose');

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
      }
  },
  {
    timestamps: true
  }
);

 module.exports = model('User', userSchema);
