const mongoose = require('mongoose');

const ApresentacaoSchema = new mongoose.Schema({
    tema: String,
    apresentador: String,
    data: String
}) 


let Apresentacao = mongoose.model('Apresentacao', ApresentacaoSchema)

module.exports = Apresentacao;