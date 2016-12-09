<template>
  <modal ref="modal" title="Confirme" :static="true" :closeable="false">
    {{ message }}
    <div slot="footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal" @click="simBtnClicked">Sim</button>
      <button type="button" class="btn btn-default" data-dismiss="modal" @click="naoBtnClicked">Não</button>
    </div>
  </modal>

</template>
<script>

import Modal from './Modal'

export default {
  data() {
    return {
      message: '',
      cbSim: () => {},
      cbNao: () => {}
    }
  },
  methods: {
    show(message, cbSim, cbNao) {
      this.message = message
      this.cbSim = cbSim
      this.cbNao = cbNao
      this.$refs.modal.show()
    },
    simBtnClicked() {
      this.cbSim()
      this.reset()
    },
    naoBtnClicked() {
      if (this.cbNao)
        this.cbNao()
      this.reset()
    },
    reset() {
      this.message = ''
      this.cbSim = () => {}
      this.cbNao = () => {}
    }
  },
  components: {
  	Modal
  }

}
</script>