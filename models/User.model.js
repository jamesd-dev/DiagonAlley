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
// userSchema.index({ 'email': 1}, {unique: true});
// userSchema.index({ 'username': 1}, {unique: true});
 module.exports = model('User', userSchema);
