const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const auth_schema = new mongoose.Schema({
  uid: { type: String, default: uuidv4,unique: true},
  name: {type:String,trim:true},
  user_name: { type: String, required: true,trim: true },
  role: {type: String,enum: ['web', 'mobile'],required: true,default: 'web'},
  email_id: {type: String,required: true,unique: true,lowercase: true,trim: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please enter a valid email'
    }
  },
  password: { type: String,required: true,minlength: 8},
  phone: {
    country_code: { type: String, default: "+1" },
    phone_number: { type: String, validate: {validator: function(phone) {
          return /^\d{10}$/.test(phone); 
        },
        message: 'Phone number must be 10 digits'
      }
    },
  },
  otp_verified:{type:Boolean,default:false},
  created_at: { type: Date, default: Date.now},
  created_by: { type: Number, default: 1 },
  is_deleted: { type: Boolean, default: false},
  is_active: { type: Boolean, default: true },
  last_login: { type: Date }
});

// Hash password before saving
auth_schema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
auth_schema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
auth_schema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('users', auth_schema);