import $ from 'jquery'

export default {
  getPage(page) {
  	if (page == undefined)
  	  return $.get('/api/pessoas/')
  	else
  	  return $.get(page)
  }
}