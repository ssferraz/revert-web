const mongoose = require("mongoose");

const { Schema } = mongoose;

const collectionOrderSchema = new Schema({
    residues:
      [{

      }],
    status: {
        
    }
},
    { timestamps: true},
);

const CollectionOrder = mongoose.model("CollectionOrder", collectionOrderSchema);

module.exports = {
    CollectionOrder,
    collectionOrderSchema,
};
