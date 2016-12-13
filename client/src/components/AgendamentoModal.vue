<template>
  <modal ref="modal" title="Agendamento">

      <form class="form-horizontal">
        <fieldset>


        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="profissional">Profissional</label>
          <div class="col-md-4">
          <select id="profissional" name="profissional" type="text" placeholder="" class="form-control input-md">
          </select>

          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="cliente">Cliente</label>
          <div class="col-md-4">
          <input id="cliente" name="cliente" type="text" placeholder="" class="form-control input-md">

          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="dia">Dia</label>
          <div class="col-md-4">
              <div class="input-group date" id="data">
                <input type="text" class="form-control" />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
              </div>
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="inicio">Início</label>
          <div class="col-md-4">
              <div class="input-group date" id="inicio">
                <input type="text" class="form-control" />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="fim">Fim</label>
          <div class="col-md-4">
            <div class="input-group date" id="fim">
              <input type="text" class="form-control" />
              <span class="input-group-addon">
                  <span class="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
          </div>
        </div>

        </fieldset>
     </form>


    <div slot="footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal" @click="salvarBtnClicked">Salvar</button>
    </div>
  </modal>
</template>

<script>

import Modal from './commons/Modal'
import moment from 'moment'
import $ from 'jquery'

export default {
  data() {
    return {
      agendamento: {
        start: '',
        end: ''
      }
    }
  },
  mounted() {
    $('#data').datetimepicker({
      format: 'DD/MM/YYYY'
    })
    $('#data input').mask('00/00/0000', {placeholder: '__/__/____'});
    $('#inicio').datetimepicker({
      format: 'HH:mm'
    })
    $('#inicio input').mask('00:00', {placeholder: '__:__'});
    $('#fim').datetimepicker({
      format: 'HH:mm'
    })
    $('#fim input').mask('00:00', {placeholder: '__:__'});

    $('#profissional').select2({
      theme: "bootstrap",
      templateResult(data) {
        return data.nome
      },
      templateSelection(data) {
        return data.nome
      },
      ajax: {
        url: '/api/pessoas/',
        delay: 250,
        processResults(data) {
          console.log(data.results)
          return {
            results: data.results
          }
        }
      }
    })
  },
  methods: {
    show(agendamento) {
      console.log(agendamento)
      this.agendamento = agendamento
      $('#data').data("DateTimePicker").date(agendamento.inicio)
      $('#inicio').data("DateTimePicker").date(agendamento.inicio)
      $('#fim').data("DateTimePicker").date(agendamento.fim)
      this.$refs.modal.show()
    },
    salvarBtnClicked() {
      this.$refs.modal.close()
    }
  },
  components: {
    Modal
  }
}
</script>
