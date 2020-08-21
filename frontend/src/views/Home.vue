<template>
  <div class="home">
    <TabelaApresentacoes
      v-bind:apresentacoesIn="apresentacoes"
      @eventoSalvar="salvarApresentacao" 
      @eventoDeletar="excluirApresentacao" 
    />
  </div>
</template>

<script>
// @ is an alias to /src
import TabelaApresentacoes from '@/components/TabelaApresentacoes.vue'
import ApresentacaoService from '../services/apresentacao.service';

export default {
  name: 'Home',
  components: {
    TabelaApresentacoes
  },
  data: () => ({
    apresentacoes: []
  }),
  created() {
    this.carregarApresentacoes();
  },
  methods: {
    carregarApresentacoes() {
      ApresentacaoService.listarApresentacoes().then(res => {
        this.apresentacoes = res.data.apresentacoes
        console.log(this.apresentacoes);
      })
    },
    salvarApresentacao(apresentacao) {
      if(apresentacao._id == 0)
        ApresentacaoService.criarApresentacao(apresentacao).then(res => {
          console.log(res);
          this.carregarApresentacoes();
        });
      else 
        ApresentacaoService.updateApresentacao(apresentacao).then(res => {
          console.log(res);
          this.carregarApresentacoes();
        });
    },
    excluirApresentacao(idApresentacao) {
      console.log(idApresentacao);
      ApresentacaoService.excluirApresentacao(idApresentacao).then(res => {
        console.log(res);
        this.carregarApresentacoes();
      });
    }
  }
}
</script>
