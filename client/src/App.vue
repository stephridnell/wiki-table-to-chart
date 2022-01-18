<template>
  <div id="app">
    <button @click="getTable">
      click me
    </button>
  </div>
</template>

<script>
// usually i would build out all my axios config into a separate file
// but for the sake of this test and only needing to make one request
// i am putting it directly in the component
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    getTable () {
      axios(`${process.env.VUE_APP_SERVER_ENDPOINT}/table`);
    }
  }
}
</script>

<style lang="scss">
@import './assets/style.scss';
</style>
