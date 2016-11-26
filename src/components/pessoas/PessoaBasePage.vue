<template>
  <logged-page>
    <div slot="content">
      <h1>Pessoas</h1>
      <slot name="content"></slot>
    </div>
  </logged-page>

</template>
<script>

import LoggedPage from '../base/LoggedPage'
export default {
  components: {
    LoggedPage
  }
}
</script>