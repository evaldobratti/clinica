<template>
<pessoa-base-page>
	<div slot="content">
    <table class="table table-striped"> 
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
              <a class="btn btn-warning">Apagar</a> 
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
  </div>
  
</pessoa-base-page>
</template>
<script>

import PessoaBasePage from './PessoaBasePage'
import pessoaApi from '../../app/pessoa'

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
      if (page == undefined && this.pessoas.length != 0)
        return
      
      pessoaApi.getPage(page).
        done((data) => {
          this.pessoas = data.results;
          this.pagination = {
            next: data.next,
            previous: data.previous
          }
        }).
        fail((data) => {

        })
    }
  }

}
</script>