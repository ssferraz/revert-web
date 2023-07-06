const collectionPointRepository = require("../repositories/collectionPointRepository");

const collectionPointController = {

    create: async (req, res) => {
        try {
            const collectionPoint = {
                name: req.body.name,
                address: req.body.address,
            };

            const response = await collectionPointRepository.create(collectionPoint);
            return res.status(201).json({ response, message: "Ponto de coleta criado com sucecsso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    getAll: async (req, res) => {
        try {
            const collectionPoints = await collectionPointRepository.getAll();
            return res.status(200).json(collectionPoints);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const collectionPoint = await collectionPointRepository.get(id);

            if (!collectionPoint) {
                return res.status(404).json({ message: "Ponto de coleta não encontrado." });;
            }

            return res.status(200).json(collectionPoint);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    delete: async (collectionPointId, res) => {
        try {
            const id = collectionPointId;
            const collectionPoint = await collectionPointRepository.get(id);

            if (!collectionPoint) {
                console.log(collectionPoint);
                return res.status(404).json({ message: "Ponto de coleta não encontrado." });
            }

            const deletedCollectionPoint = await collectionPointRepository.delete(id);

            res.status(200).json({ deletedCollectionPoint, message: "Ponto de coleta removido com sucesso!"});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    update: async (collectionPointId, req, res) => {
        try {
            const id = collectionPointId;
            
            const collectionPoint = {
                name: req.body.name,
                address: req.body.address,
            };

            const updatedCollectionPoint = await collectionPointRepository.update(id, collectionPoint);

            if (!updatedCollectionPoint) {
                res.status(404).json({ message: "Ponto de coleta não encontrado." });
                return;
            }

            return res.status(200).json({ updatedCollectionPoint, message: "Ponto de coleta atualizado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    }
};

module.exports = collectionPointController;
