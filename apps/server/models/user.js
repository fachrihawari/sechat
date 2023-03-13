const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  verificationCode: String
});

export default User