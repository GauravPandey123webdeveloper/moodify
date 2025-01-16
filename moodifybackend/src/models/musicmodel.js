const mongoose = require('mongoose');
const musicSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true
    },
    links: {
        type: [String],
        default: []
    }
});
module.exports = mongoose.model('Music', musicSchema);
