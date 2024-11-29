const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, // Enforcing email uniqueness
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email validation regex
        minlength: [5, 'Email must be at least 5 characters long'], // Fix typo from 3 to 5
    },
    password: {
        type: String,
        required: true,
        select: false, // Hide password from default queries
    },
    socketId: {
        type: String,
    },
});

// Instance Method: Generate Auth Token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add expiration
    return token;
};

// Instance Method: Compare Passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Static Method: Hash Password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;