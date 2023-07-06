const residueRepository = require("../repositories/residueRepository");

const residueController = {

    create: async (req, res) => {
        try {
            const residue = {
                name: req.body.name,
            };

            const response = await residueRepository.create(residue);
            return res.status(201).json({ response, message: "Resíduo criado com sucecsso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    getAll: async (req, res) => {
        try {
            const residues = await residueRepository.getAll();
            return res.status(200).json(residues);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const residue = await residueRepository.get(id);

            if (!residue) {
                return res.status(404).json({ message: "Resíduo não encontrado." });;
            }

            return res.status(200).json(residue);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    delete: async (residueId, res) => {
        try {
            const id = residueId;
            const residue = await residueRepository.get(id);

            if (!residue) {
                console.log(residue);
                return res.status(404).json({ message: "Resíduo não encontrado." });
            }

            const deletedResidue = await residueRepository.delete(id);

            res.status(200).json({ deletedResidue, message: "Resíduo removido com sucesso!"});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    update: async (residueId, req, res) => {
        try {
            const id = residueId;
            
            const residue = {
                name: req.body.name,
            };

            const updatedResidue = await residueRepository.update(id, residue);

            if (!updatedResidue) {
                res.status(404).json({ message: "Resíduo não encontrado." });
                return;
            }

            return res.status(200).json({ residue, message: "Resíduo atualizado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    }
};

module.exports = residueController;
