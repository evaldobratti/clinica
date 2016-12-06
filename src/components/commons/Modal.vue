<template>
    <div :id="_uid" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content"> 
          <div class="modal-header"> 
            <button v-if="closeable" type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
              <span aria-hidden="true">×</span></button> 
              <h4 class="modal-title" id="mySmallModalLabel">{{title}}</h4> 
          </div> 
          <div class="modal-body"> <slot></slot></div> 
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>

</template>

<script>

import $ from 'jquery'

export default {
  props: {
    closeable: {
      type: Boolean,
      default: true
    },
    static: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Um modal qualquer'
    }
  },
  data() {
    return {
      lastCb: () => {}
    }
  },
  methods: {
      show(closeCb) {
        this.lastCb = closeCb;
        $('#' + this._uid).modal({
          backdrop: 'static'
        })
      },
      close() {
        this.lastCb()
        this.lastCb = () => {}
      }
    }
}
</script>