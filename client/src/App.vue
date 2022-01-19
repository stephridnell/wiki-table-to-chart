<template>
  <div id="app">
    <div style="margin-bottom:12px;">
      <input v-model="url">
    </div>
    <button style="margin-bottom:24px;" @click="getTable">
      GO
    </button>
    <template v-if="!loading">
      <div class="card" v-for="(table, index) in tables" :key="index">
        <chart
          :data="table">
        </chart>
      </div>
    </template>
    <div class="card" v-else>
      Loading...
    </div>
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
      url: 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression',
      tables: [],
      loading: false
    }
  },
  components: {
    Chart: () => import('@/components/Chart.vue')
  },
  methods: {
    async getTable () {
      this.loading = true
      let resp = await axios(`${process.env.VUE_APP_SERVER_ENDPOINT}/table?url=${this.url}`)
      this.tables = resp.data
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
@import './assets/style.scss';
</style>
