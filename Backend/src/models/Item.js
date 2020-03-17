const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    done: Boolean,
    task: String,
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
});

module.exports = mongoose.model('Item' , ItemSchema);