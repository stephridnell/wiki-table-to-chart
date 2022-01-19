<template>
  <div class="container">
    <component
      :is="chartType"
      :chart-data="chartData"
      :options="options"/>
      <div style="padding:20px;">
        <button style="margin:10px;" class="axis-button" v-for="key in Object.keys(data.labels)" :key="key" @click="updateXAxisLabels(key)" :disabled="key === labels">
          {{ key }}
        </button>
      </div>
      <div style="padding:20px;">
        <button style="margin:10px;" class="type-button" v-for="type in chartTypes" :key="type.type" @click="chartType = type.type + '-chart'" :disabled="(type.type + '-chart') === chartType">
          {{ type.icon }} {{ type.type }}
        </button>
      </div>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import DoughnutChart from './DoughnutChart.vue'

export default {
  name: 'ChartContainer',
  components: { LineChart, BarChart, DoughnutChart },
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: () => {
        return {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          }
        }
      }
    }
  },
  data () {
    return {
      chartData: {},
      labels: '',
      chartType: 'bar-chart',
      chartTypes: [{type: 'bar', icon: '📊'}, {type: 'line', icon: '📈'}, {type: 'doughnut', icon: '🍩'}]
    }
  },
  mounted () {
    this.labels = Object.keys(this.data.labels)?.[0] || ''
    this.chartData = {
      ...this.data,
      labels: this.data.labels[this.labels]
    }
  },
  methods: {
    updateXAxisLabels (key) {
      this.labels = key
      this.chartData = {
        ...this.data,
        labels: this.data.labels[this.labels]
      }
    }
  }
}
</script>