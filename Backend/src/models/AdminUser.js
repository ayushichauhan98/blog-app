const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  user_role: {
    type: String,
    default: 'admin',
  },
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
