const mongoose = require("mongoose");

const { Schema } = mongoose;

const collectionPointSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
},
    { timestamps: true},
);

const CollectionPoint = mongoose.model("CollectionPoint", collectionPointSchema);

module.exports = {
    CollectionPoint,
    collectionPointSchema,
};
