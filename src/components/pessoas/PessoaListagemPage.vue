<template>
<pessoa-base-page>
	<div slot="content">
    <table class="table table-striped" id="pessoasTbl"> 
      <thead> 
        <tr> 
          <th>#</th> 
          <th>Nome</th> 
          <th>Ações</th>
        </tr> 
      </thead> 
      <tbody> 
        <tr v-for="p in pessoas"> 
          <th>{{p.codigo}}</th> 
          <td>{{p.nome}}</td> 
          <td>
            <div class="btn-group btn-group-xs" role="group" aria-label="Extra-small button group"> 
              <router-link :to="{ name: 'pessoaForm', params: { codigo: p.codigo }}" class="btn btn-primary">Editar</router-link>
              <button class="btn btn-warning" v-on:click="apagar(p.id)">Apagar</button> 
            </div>
          </td>
        </tr> 
      </tbody> 
    </table>
    <nav aria-label="...">
      <ul class="pager">
        <li class="previous" v-bind:class="{disabled: pagination.previous == null}"><a v-on:click="page(pagination.previous)"><span aria-hidden="true">&larr;</span> Anterior</a></li>
        <li class="next" v-bind:class="{disabled: pagination.next == null}"><a v-on:click="page(pagination.next)">Próxima <span aria-hidden="true">&rarr;</span></a></li>
      </ul>
    </nav>

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">Small modal</button>

    <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          ...
        </div>
      </div>
    </div>
  </div>

  
</pessoa-base-page>
</template>
<script>

import PessoaBasePage from './PessoaBasePage'
import pessoaApi from '../../app/pessoa'
import $ from 'jquery'
import bootstrap from 'bootstrap'

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
  	PessoaBasePage
  },
  methods: {
    page(page) {
      const get = page || '/api/pessoas/'
      this.$http.get(get).then((response) => {
        this.pessoas = response.data.results
        this.pagination = {
          next: response.data.next,
          previous: response.data.previous,
          current: page
        }
        $('html body').animate({
          scrollTop: $('body').offset().top
        }, 500)
      })
    },
    apagar(id) {
      /*this.$http.delete('/api/pessoas/' + id + '/').
        then(response => {

          this.page(this.pagination.current)
        })*/
    }
  }

}
</script>