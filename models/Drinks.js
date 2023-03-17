const mongoose = require('mongoose');

const DrinksSchema = new mongoose.Schema(
    {
        name: String,
    }
);

const Drinks = mongoose.model('Drinks', DrinksSchema);

module.exports = Drinks;
