<template>
<pessoa-base-page>
	<div slot="content">
    <router-link :to="{ name: 'pessoaForm', params: { id: 'novo' }}" class="btn btn-primary">Novo</router-link>
    <table class="table table-striped table-hover" id="pessoasTbl"> 
      <thead> 
        <tr> 
          <th class="col-sm-1">#</th> 
          <th class="col-sm-9">Nome</th> 
          <th class="col-sm-2">Ações</th>
        </tr> 
      </thead> 
      <tbody> 
        <tr v-for="p in pessoas"> 
          <th>{{p.codigo}}</th> 
          <td>{{p.nome}}</td> 
          <td>
            <div class="btn-group btn-group-xs" role="group" aria-label="Extra-small button group"> 
              <router-link :to="{ name: 'pessoaForm', params: { id: p.id }}" class="btn btn-primary">Editar</router-link>
              <button class="btn btn-warning" v-on:click="apagar(p)">Apagar</button> 
            </div>
          </td>
        </tr> 
      </tbody> 
    </table>
    <nav aria-label="...">
      <ul class="pager">
        <li>
          <button @click="page(pagination.previous)" class="btn btn-default" :disabled="pagination.previous == null">
            <span aria-hidden="true">&larr;</span> Anterior
          </button>
        </li>
        <li>
          <button @click="page(pagination.next)" class="btn btn-default" :disabled="pagination.next == null">Próxima 
            <span aria-hidden="true">&rarr;</span>
          </button>
        </li>
      </ul>
    </nav>

    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>

  
</pessoa-base-page>
</template>
<script>

import PessoaBasePage from './PessoaBasePage'
import pessoaApi from '../../app/pessoa'
import ConfirmDialog from '../commons/ConfirmDialog'
import $ from 'jquery'
import snackbar from 'snackbarjs'

export default {
  created() {
  	this.page()

  },
  data() {
  	return {
  		pessoas: [],
      pagination: {}
  	}
  },
  components: {
  	PessoaBasePage, ConfirmDialog
  },
  methods: {
    page(page, shouldScroll) {
      const get = page || '/api/pessoas/'
      const scroll = shouldScroll == undefined ? true : shouldScroll
      this.$http.get(get).then((response) => {
        this.pessoas = response.data.results
        this.pagination = {
          next: response.data.next,
          previous: response.data.previous,
          current: page
        }
        if (scroll)
          $('html body').animate({
            scrollTop: $('body').offset().top
          }, 500)
      })
    },
    apagar(pessoa) {
      this.$refs.confirmDialog.show('Confirma a exclusão ' + pessoa.nome + "?",
        () => {
          this.$http.delete('/api/pessoas/' + pessoa.id + '/').
            then(response => {

              this.page(this.pagination.current, false)
              this.$snack('Pessoa excluída com sucesso!')
              /*$.snackbar({
                content: 'Pessoa excluída com sucesso!',
                style: 'toast',
                timeout: 1000
              })
              console.log($.snackbar)*/
            })
        })
    }
  }
}
</script>