const mongoose = require("mongoose");

const { Schema } = mongoose;

const collectionOrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pendente', 'em andamento', 'concluido'],
        required: true,
        default: 'pendente'
    }
},
    { timestamps: true},
);

const CollectionOrder = mongoose.model("CollectionOrder", collectionOrderSchema);

module.exports = {
    CollectionOrder,
    collectionOrderSchema,
};
