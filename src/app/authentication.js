import $ from 'jquery'
import Cookies from 'js-cookie'

export default {
  user: {},
  login (credentials, success, error) {
    $.post('/api/auth/', credentials, (data) => {
      this.authenticate(data)
      localStorage.setItem('isAuthenticated', true)
      $.ajaxSetup({
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      })
      success(data)
    }, () => {
      this.logout()
      error()
    })
  },
  logout () {
    this.user = { isAuthenticated:  false }
    localStorage.setItem('isAuthenticated', null)
  },
  recoverUserData () {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated == null)
      this.user.isAuthenticated = false;
    else
      this.user.isAuthenticated = isAuthenticated;

    $.get('/api/auth_data/').done((data) => {
      this.authenticate(data)
    }).fail(this.logout)

  },
  authenticate(user) {
    this.user = user
    this.user.isAuthenticated = true
  }
}


