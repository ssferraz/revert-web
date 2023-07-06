const { Residue: ResidueModel} = require("../models/Residue");

const residueRepository = {
    create: async (residue) => {
        const response = (await ResidueModel.create(residue)).toObject();
        return response;
    },
    getAll: async () => {
        const residues = await ResidueModel.find();
        return residues;
    },
    get: async (id) => {
        const residue = await ResidueModel.findById(id);
        return residue;
    },
    delete: async (id) => {
        const deletedResidue = await ResidueModel.findByIdAndDelete(id);
        return deletedResidue;
    },
    update: async (id, residue) => {
        const updatedResidue = await ResidueModel.findByIdAndUpdate(id, residue);
        return updatedResidue;
    }    
    
}

module.exports = residueRepository;
