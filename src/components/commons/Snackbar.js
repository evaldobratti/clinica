import $ from 'jquery'
import snackbar from 'snackbarjs'

export default function (options){
	if (typeof options == 'string')
		$.snackbar({
      content: options,
      style: 'toast',
      timeout: 3000
    })	
  else
    $.snackbar(options)	
}