const mongoose = require("mongoose");

const { Schema } = mongoose;

const residueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
},
    { timestamps: true},
);

const Residue = mongoose.model("Residue", residueSchema);

module.exports = {
    Residue,
    residueSchema,
};
