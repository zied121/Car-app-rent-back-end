const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    titel: {
        type: String,
        required: true
    },
    

    datecreated: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
   
    price: {
        type: Number,
    },

    content: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }


});
module.exports = mongoose.model('Post', PostSchema);