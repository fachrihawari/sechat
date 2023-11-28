import mongoose from 'mongoose';

const User = mongoose.model('User', {
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  otp: {
    code: {
      type: String,
      minLength: 6,
      maxLength: 6,
    },
    expiry: Date
  }
});

export default User