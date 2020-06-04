const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
     username: {
       type: String,
       required: [true, 'Please enter username'],
       unique: true
     }, 
     email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true
    },
     passwordHash: {
      type: String,
      required: true
    },
      hogwartsHouse: {
        type: String,
        enum : ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff', 'Unsorted'],
        required: [true, 'Please assign house']
      }
  },
  {
    timestamps: true
  }
);

 module.exports = model('User', userSchema);
