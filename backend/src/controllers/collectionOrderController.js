const collectionOrderRepository = require("../repositories/collectionOrderRepository");

const collectionOrderController = {

    create: async (req, res) => {
        try {
            const collectionOrder = {
                user: req.body.user,
                date: req.body.date,
                status: req.body.status
            };

            const response = await collectionOrderRepository.create(collectionOrder);
            return res.status(201).json({ response, message: "Pedido de coleta criado com sucecsso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    getAll: async (req, res) => {
        try {
            const collectionOrders = await collectionOrderRepository.getAll();
            return res.status(200).json(collectionOrders);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const collectionOrder = await collectionOrderRepository.get(id);

            if (!collectionOrder) {
                return res.status(404).json({ message: "Pedido de coleta não encontrado." });;
            }

            return res.status(200).json(collectionOrder);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    delete: async (collectionOrderId, res) => {
        try {
            const id = collectionOrderId;
            const collectionOrder = await collectionOrderRepository.get(id);

            if (!collectionOrder) {
                console.log(collectionOrder);
                return res.status(404).json({ message: "Pedido de coleta não encontrado." });
            }

            const deletedCollectionOrder = await collectionOrderRepository.delete(id);

            res.status(200).json({ deletedCollectionOrder, message: "Pedido de coleta removido com sucesso!"});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    update: async (collectionOrderId, req, res) => {
        try {
            const id = collectionOrderId;
            
            const collectionOrder = {
                user: req.body.user,
                date: req.body.date,
                status: req.body.status
            };

            const updatedCollectionOrder = await collectionOrderRepository.update(id, collectionOrder);

            if (!updatedCollectionOrder) {
                res.status(404).json({ message: "Pedido de coleta não encontrado." });
                return;
            }

            return res.status(200).json({ collectionOrder, message: "Pedido de coleta atualizado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    }
};

module.exports = collectionOrderController;
