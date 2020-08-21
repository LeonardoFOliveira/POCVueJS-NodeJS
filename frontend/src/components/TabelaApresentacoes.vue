<template>
  <v-layout row wrap justify-center align-center>
    <v-data-table
      :headers="headers"
      :items="apresentacoesIn"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>CRUD APRESENTAÇÕES</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >Nova Apresentação</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.tema" label="Tema"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.apresentador" label="Apresentador"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.data" label="Data"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
  export default {
    name: "TabelaApresentacoes",
    props: {
      apresentacoesIn: {
        type: Array
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Tema',
          align: 'start',
          sortable: false,
          value: 'tema',
        },
        { text: 'Apresentador', value: 'apresentador' },
        { text: 'Data', value: 'data' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      apresentacoes: [],
      editedItem: {
        _id: 0,
        tema: '',
        apresentador: '',
        data: 0,
      },
      defaultItem: {
        _id: 0,
        tema: '',
        apresentador: '',
        data: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedItem.id === 0 ? 'Nova Apresentação' : 'Edição Apresentação'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.apresentacoes = this.apresentacoesIn
      },

      editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        console.log()
        const idApresentacao = item._id
        confirm('Você tem certeza que deseja deletar esta apresentação?') && this.$emit('eventoDeletar', idApresentacao);
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
        })
      },

      save () {
        this.$emit('eventoSalvar', this.editedItem);
        this.close();
      },
    },
  }
</script>