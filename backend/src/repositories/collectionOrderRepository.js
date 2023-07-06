const { CollectionOrder: CollectionOrderModel} = require("../models/CollectionOrder");

const collectionOrderRepository = {
    create: async (collectionOrder) => {
        const response = (await CollectionOrderModel.create(collectionOrder)).toObject();
        return response;
    },
    getAll: async () => {
        const collectionOrders = await CollectionOrderModel.find();
        return collectionOrders;
    },
    get: async (id) => {
        const collectionOrder = await CollectionOrderModel.findById(id);
        return collectionOrder;
    },
    delete: async (id) => {
        const deletedCollectionOrder = await CollectionOrderModel.findByIdAndDelete(id);
        return deletedCollectionOrder;
    },
    update: async (id, collectionOrder) => {
        const updatedCollectionOrder = await CollectionOrderModel.findByIdAndUpdate(id, collectionOrder);
        return updatedCollectionOrder;
    }    
    
}

module.exports = collectionOrderRepository;
