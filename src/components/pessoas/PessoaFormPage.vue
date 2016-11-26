<template>
	<pessoa-base-page>
		<div slot="content">
		editando :)
		{{$route.params}}

		</div>
	</pessoa-base-page>
</template>
<script>

import PessoaBasePage from './PessoaBasePage'

export default {
  created() {
  	console.log(this.$route.params.codigo)
  },
  components: {
  	PessoaBasePage
  }
}
</script>