const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user receiving the notification
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  // Add any other fields or metadata relevant to notifications
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
