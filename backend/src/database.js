const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/POCVueJS+NodeJS';

//Models
const Apresentacao = require('./models/Apresentacao');

class Controller {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true
            });
            console.info('Conectado ao Banco de Dados.');
        } catch(err) {
            console.error(err);
        }
    }

    //Queries
    addApresentacao(res, data) {
        Apresentacao.create(data, (erro, apresentacaoCriada) => {
            if(erro) 
                throw erro;
            
            res.json({
                status: 200,
                message: 'Apresentação criada com sucesso.',
                apresentacao: apresentacaoCriada
            })
        })
    }

    updateApresentacao(res, id, data) {
        Apresentacao.updateOne({_id: id}, data, (erro, apresentacaoAtualizada) => {
            if(erro)
                throw erro;
            
            res.json({
                status: 200,
                message: 'Apresentação atualizada com sucesso.',
                apresentacao: apresentacaoAtualizada
            })
        })
    }

    getApresentacoes(res) {
        Apresentacao.find((erro, apresentacoes) => {
            if(erro)
                throw erro;

            res.json({
                status: 200,
                message: 'Consulta realizada com sucesso.',
                apresentacoes
            })
        })
    }

    getApresentacao(res, id) {
        Apresentacao.findById(id, (erro, apresentacao) => {
            if(erro)
                throw erro;
            
                res.json({
                    status: 200,
                    message: 'Consulta realizada com sucesso.',
                    apresentacao
                })
        })
    }

    deleteApresentacao(res, id) {
        Apresentacao.deleteOne({_id: id}, (erro) => {
            if(erro)
                throw erro;
            
            res.json({
                status: 200,
                message: 'Apresentação deletada com sucesso.',
            })
        })
    }
}

exports.database = new Controller();