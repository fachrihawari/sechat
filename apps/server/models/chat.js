import mongoose from 'mongoose';

const Chat = mongoose.model('Chat', {
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required']
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Receiver is required']
  },
});

export default Chat