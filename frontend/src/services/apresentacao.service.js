import axiosConfig from './config';

export default {
    listarApresentacoes: () => {
        return axiosConfig.get('/apresentacao');
    },

    criarApresentacao: (apresentacao) =>  {
       return axiosConfig.post('/apresentacao', apresentacao);
    },

    updateApresentacao: (apresentacao) => {
        return axiosConfig.put(`/apresentacao/${apresentacao._id}`, apresentacao);
    },

    excluirApresentacao: (idApresentacao) => {
       return axiosConfig.delete(`/apresentacao/${idApresentacao}`);
    }
}
