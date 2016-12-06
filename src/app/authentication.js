import $ from 'jquery'
import Cookies from 'js-cookie'
import Vue from 'vue'

export default {
  user: {},
  login (credentials, success, error) {
    $.post('/api/auth/', credentials).then((data) => {
      this.authenticate(data)
      localStorage.setItem('csrf', Cookies.get('csrftoken'))
      success(data)
    }, () => {
      this.logout()
      error()
    })
  },
  logout () {
    console.log("aff")
    this.user = { isAuthenticated:  false }
    localStorage.setItem('isAuthenticated', null)
  },
  recoverUserData () {
    const maybeAuthenticated = localStorage.getItem('isAuthenticated')
    console.log(maybeAuthenticated)
    console.log(maybeAuthenticated == 'null')
    if (maybeAuthenticated == null || maybeAuthenticated == false || maybeAuthenticated == 'null'){
      console.log('nop')
      this.user.isAuthenticated = false;
    }
    else {
      console.log('yes wtf')
      this.user.isAuthenticated = maybeAuthenticated
    }

    $.get('/api/auth_data/').done((data) => {
      this.authenticate(data)
    }).fail(this.logout)

  },
  authenticate(user) {
    localStorage.setItem('isAuthenticated', true)
    this.user = user
    this.user.isAuthenticated = true
  }
}


