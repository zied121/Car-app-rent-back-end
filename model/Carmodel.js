const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true
    },
    marque: {
        type: String,
        required: true
    },
    kilometrage: {
        type: Number,
        required: true
    },
    carowner: {
        type:"String",
        required: true
    },

});
CarSchema.set('toJSON', { virtuals: true })
CarSchema.set('toObject', { virtuals: true })

CarSchema.virtual("user", {
    ref: "User",
    foreignField: "_id",
    localField: "carowner"
  });


module.exports = mongoose.model('Car', CarSchema);