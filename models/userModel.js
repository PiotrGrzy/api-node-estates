const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name of an User is required'],

    maxlength: [
      55,
      'The name of the User must be shorter or equel 55 characters'
    ],
    minlength: [6, 'The name of the User must be longer or equel 6 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: [true, 'The email address must be unique'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must ne at least 6 characters'],
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // only run is password was changed or created
  if (!this.isModified('password')) return next();
  // hashing password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
