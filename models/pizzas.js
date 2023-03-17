const mongoose = require('mongoose');

const pizzasSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true},
        mass: { type: [String], enum: ["fina", "normal"] },
        size: { type: [String], enum: ["pequeña", "mediana", "familiar"]},
        dip: {type: [String], enum: ["barbacoa", "carbonara", "tomate", "napolitana"]},
        ingredients: [{type: mongoose.Types.ObjectId, required: true, ref:"Ingredients"}],
        price: { type: Number, required: true},
        account: {type: Number},
        picture: String,
    },
    {
        timestamps: true
    }
)

const Pizzas = mongoose.model('Pizzas', pizzasSchema);

module.exports = Pizzas;
