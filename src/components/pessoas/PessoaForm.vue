<template>

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
            <input id="dataNascimentoInput" type="text" class="form-control" />
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
</template>