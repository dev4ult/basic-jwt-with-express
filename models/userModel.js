const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { isEmail } = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post('save', function (doc, next) {
  console.log(doc);
  console.log('user has been created');
  next();
});

module.exports = mongoose.model('user', userSchema);
