<template>
	<pessoa-base-page>
		<div slot="content">

  <form class="form-horizontal" v-on:submit.prevent="submit">
    <fieldset>

    <!-- Form Name -->
    <legend>Editando {{ pessoa.nome }}</legend>

    <!-- Text input-->
    <div class="form-group" :class="{'has-error': error.codigo.length > 0}" >
      <label class="col-md-4 control-label" for="codigo">Codigo</label>  
      <div class="col-md-4">
      <input id="codigo" name="codigo" type="text" placeholder="" v-model="pessoa.codigo" disabled class="form-control input-md">
      <span class="help-block">{{error.codigo[0]}}</span>  
      </div>
    </div>

    <!-- Text input-->
    <div class="form-group" :class="{'has-error': error.nome.length > 0 }">
      <label class="col-md-4 control-label" for="nome">Nome</label>  
      <div class="col-md-4">
      <input id="nome" name="nome" type="text" placeholder="" v-model="pessoa.nome" class="form-control input-md">
      <span class="help-block">{{error.nome[0]}}</span>  
      </div>
    </div>

    <div class="form-group">
      <label class="col-md-4 control-label" for="sexo">Sexo</label>
      <div class="col-md-4">
      <div class="radio">
        <label for="sexo-1">
          <input type="radio" name="sexo" id="sexo-1" value="F" v-model="pessoa.sexo">
          Feminino
        </label>
      </div>
      <div class="radio">
        <label for="sexo-0">
          <input type="radio" name="sexo" id="sexo-0" value="M" v-model="pessoa.sexo" >
          Masculino
        </label>
      </div>
      </div>
    </div>

    <div class="form-group" :class="{'has-error': error.data_nascimento.length > 0 }">
      <label class="col-md-4 control-label" for="dataNascimento">Data de nascimento</label>  
      <div class="col-md-4">
        <div class="input-group date" id="dataNascimento">
            <input type="text" class="form-control" />
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
        <span class="help-block">{{error.data_nascimento[0]}}</span>  
      </div>
    </div>

    <!-- Button -->
    <div class="form-group">
      <label class="col-md-4 control-label" for="submit"></label>
      <div class="col-md-4">
        <input id="submit" type="submit" name="submit" class="btn btn-primary" value="Salvar" />
      </div>
    </div>

    </fieldset>
    </form>
		</div>

	</pessoa-base-page>

  

</template>
<script>

import PessoaBasePage from './PessoaBasePage'
import _ from 'underscore'
import $ from 'jquery'
import moment from 'moment'



export default {
  created() {
    if (typeof this.$route.params.id == 'number')
    	this.$http.get('/api/pessoas/' + this.$route.params.id + '/').then((response) => {
    		this.pessoa = response.data
        var ele = this;
        $("#dataNascimento").data("DateTimePicker").date(moment(ele.pessoa.data_nascimento, 'YYYY-MM-DD'))
        this.modoCriacao = false;
    	})
    else {
      this.modoCriacao = true;
      this.pessoa = { nome: '', sexo: 'F', data_nascimento: '' }
    }
  },
  data() {
  	return {
  		pessoa: {},
      modoCriacao: false,
      error: this.baseError()
  	}
  },
  mounted() {
    $("#dataNascimento").datetimepicker({
      format: 'DD/MM/YYYY'
    })

  },
  methods: {
    submit() {
      const dataNascimento = $("#dataNascimento").data("DateTimePicker").date()
      this.pessoa.data_nascimento = dataNascimento ? dataNascimento.format('YYYY-MM-DD') : null;
      if(this.modoCriacao)
        this.create();
      else
        this.update();
    },
    create() {
      this.$http.post('/api/pessoas/', this.pessoa).then((response) => {
        this.error = this.baseError()
        this.$snack('Pessoa ' + this.pessoa.nome + ' atualizada com sucesso!')
        this.$router.push({ name: 'pessoaListagem' })
      }).catch((error) => {
        this.error = _.extend({}, this.baseError(), error.response.data)
      })
    },
    update() {
      this.$http.put('/api/pessoas/' + this.pessoa.id + '/', this.pessoa).then((response) => {
        this.error = this.baseError()
        this.$snack('Pessoa ' + this.pessoa.nome + ' atualizada com sucesso!')
        this.$router.push({ name: 'pessoaListagem' })
      }).catch((error) => {
        this.error = _.extend({}, this.baseError(), error.response.data)
      })
    },
    baseError() {
      return { 
          codigo: [],
          nome: [],
          data_nascimento: []
      }
    }
  },
  components: {
  	PessoaBasePage
  }
}
</script>