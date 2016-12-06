import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthenticationPage from './components/authentication/AuthenticationPage'
import HomePage from './components/base/HomePage'
import PessoaListagemPage from './components/pessoas/PessoaListagemPage'
import PessoaFormPage from './components/pessoas/PessoaFormPage'
import authentication from './app/authentication'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/login', 
    component: AuthenticationPage,
    meta: { isPublic: true }
  }, 
  {
    name: 'home',
    path: '/',
    component: HomePage
  },
  {
    name: 'pessoaListagem',
    path: '/pessoas',
    component: PessoaListagemPage
  },
  {
    name: 'pessoaForm',
    path: '/pessoas/:id',
    component: PessoaFormPage
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.every(route => route.meta.isPublic) || authentication.user.isAuthenticated)
    next()
  else
    next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
})

export default router