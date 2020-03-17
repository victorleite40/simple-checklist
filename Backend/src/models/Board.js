const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Board' , BoardSchema);