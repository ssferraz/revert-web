const mongoose = require('mongoose')
const config = require('../config');

async function main() {
    try {
        await mongoose.connect(config.connectionString);
        console.log("Conectado ao mongodb");
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main