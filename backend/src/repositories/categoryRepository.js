const { Category: CategoryModel} = require("../models/Category");

const categoryRepository = {
    create: async (category) => {
        const response = (await CategoryModel.create(category)).toObject();
        return response;
    },
    getAll: async () => {
        const categories = await CategoryModel.find();
        return categories;
    },
    get: async (id) => {
        const category = await CategoryModel.findById(id);
        return category;
    },
    delete: async (id) => {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        return deletedCategory;
    },
    update: async (id, category) => {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, category);
        return updatedCategory;
    }    
    
}

module.exports = categoryRepository;
