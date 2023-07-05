const { CollectionPoint: CollectionPointModel } = require("../models/CollectionPoint");

const collectionPointRepository = {
    create: async (collectionPoint) => {
        const response = (await CollectionPointModel.create(collectionPoint)).toObject();
        return response;
    },
    getAll: async () => {
        const collectionPoints = await CollectionPointModel.find();
        return collectionPoints;
    },
    get: async (id) => {
        const collectionPoint = await CollectionPointModel.findById(id);
        return collectionPoint;
    },
    delete: async (id) => {
        const deletedCollectionPoint = await CollectionPointModel.findByIdAndDelete(id);
        return deletedCollectionPoint;
    },
    update: async (id, collectionPoint) => {
        const updatedCollectionPoint = await CollectionPointModel.findByIdAndUpdate(id, collectionPoint);
        return updatedCollectionPoint;
    }
}

module.exports = collectionPointRepository;
