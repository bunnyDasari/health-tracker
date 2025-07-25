const mongoose = require("mongoose")

const users = new mongoose.Schema({
    username: String,
    password: String
})

const healthSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    date: {
        type: String, // Format: "YYYY-MM-DD"
        required: true,
    },
    symptoms: {
        type: [String],
        default: [],
    },
    mood: {
        type: String,
        required: true,
    },
    medications: {
        type: [String],
        default: [],
    },
    notes: {
        type: String,
        default: '',
    },
});

const usersData = mongoose.model("UsersHealth", users)
const userHealth = mongoose.model("Health", healthSchema)

module.exports = { usersData, userHealth }


