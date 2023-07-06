const collectionOrderRepository = require("../repositories/collectionOrderRepository");

const collectionOrderController = {

    create: async (req, res) => {
        try {
            const category = {
                name: req.body.name,
            };

            const response = await collectionOrderRepository.create(category);
            return res.status(201).json({ response, message: "Categoria criada com sucecsso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    getAll: async (req, res) => {
        try {
            const categories = await collectionOrderRepository.getAll();
            return res.status(200).json(categories);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await collectionOrderRepository.get(id);

            if (!category) {
                return res.status(404).json({ message: "Categoria não encontrada." });;
            }

            return res.status(200).json(category);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    delete: async (categoryId, res) => {
        try {
            const id = categoryId;
            const category = await collectionOrderRepository.get(id);

            if (!category) {
                console.log(category);
                return res.status(404).json({ message: "Categoria não encontrada." });
            }

            const deletedCategory = await collectionOrderRepository.delete(id);

            res.status(200).json({ deletedCategory, message: "Categoria removida com sucesso!"});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    },
    update: async (categoryId, req, res) => {
        try {
            const id = categoryId;
            
            const category = {
                name: req.body.name,
            };

            const updatedCategory = await collectionOrderRepository.update(id, category);

            if (!updatedCategory) {
                res.status(404).json({ message: "Categoria não encontrada." });
                return;
            }

            return res.status(200).json({ category, message: "Categoria atualizada com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Falha ao processar sua requisição." });
        }
    }
};

module.exports = collectionOrderController;
