import Vue from 'vue'
import App from './App'
import Title from './components/Title'
import VueResource from 'vue-resource'
import authentication from './app/authentication'
import AuthenticationPage from './components/authentication/AuthenticationPage'
import HomePage from './components/base/HomePage'
import PessoaListagemPage from './components/pessoas/PessoaListagemPage'
import PessoaFormPage from './components/pessoas/PessoaFormPage'
import Routes from './Routes'
import Axios from 'axios'
import Snackbar from './components/commons/Snackbar'
import 'bootstrap'
import 'moment'
import 'eonasdan-bootstrap-datetimepicker'
import 'jquery-mask-plugin'


const axios = Axios.create({
	xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken'
})

Vue.prototype.$http = axios
Vue.prototype.$snack = Snackbar

const vue = new Vue({
  el: '#app',
  template: '<App></App>',
  components: { App, 'sd': Title },
  data () {
    return {
      'titulo': 'aff'
    }
  },
  router: Routes
})

