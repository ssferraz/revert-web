const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['vidro', 'plastico', 'metal', 'papel'],
        unique: true
    }
},
    { timestamps: true }
);


const Category = mongoose.model("Category", categoriaSchema);

module.exports = {
    Category,
    categorySchema,
};
