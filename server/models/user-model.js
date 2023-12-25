'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { errorCodes } = require('fastify');
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Project Manager', 'Team member'],
    default: 'Team member',
  },
  password: {
    type: String,
    required: true
  }
});
UserSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const salt = await bcrypt.genSalt(8);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (err) {
    next(err);

  }
});
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
