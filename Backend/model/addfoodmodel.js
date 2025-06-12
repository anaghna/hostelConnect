const mongoose = require('mongoose');

const foodserviceSchema = new mongoose.Schema({
    messid: {
        type: String,
        required: true
    },
    FoodType: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    Rate: {
        type: String,
        required: true
    },
    sunday: {
        type: String,
        required: true
    },
    monday: {
        type: String,
        required: true
    },
    tuesday: {
        type: String,
        required: true
    },
    wednesday: {
        type: String,
        required: true
    },
    thursday: {
        type: String,
        required: true
    },
    friday: {
        type: String,
        required: true
    },
    saturday: {
        type: String,
        required: true
    },
});

const FoodService = mongoose.model('FoodService', foodserviceSchema);
module.exports = FoodService;
