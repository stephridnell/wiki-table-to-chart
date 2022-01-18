<template>
  <div id="app">
    <input v-model="url">
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
  data () {
    return {
      url: 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression'
    }
  },
  methods: {
    getTable () {
      axios(`${process.env.VUE_APP_SERVER_ENDPOINT}/table?url=${this.url}`);
    }
  }
}
</script>

<style lang="scss">
@import './assets/style.scss';
</style>
