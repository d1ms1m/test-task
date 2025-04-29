<template>
  <div class="chart-container">
    <Pie :data="getData" :options="options" />
    <custom-legend :items="getLegendData" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js'
import { Pie } from 'vue-chartjs'
import type { SectorListItemData } from '@/components/SectorList/interfaces.ts'
import { computed } from 'vue'
import CustomLegend from '@/components/PieChart/CustomLegend.vue'
import type { CustomLegendItem } from '@/components/PieChart/interfaces.ts'

interface Props {
  data: Array<SectorListItemData>
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const defaultChartData = () => ({ labels: [], datasets: [{ backgroundColor: [], data: [] }] })
// const defaultChartData = () => ({
//   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
//   datasets: [
//     {
//       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//       data: [40, 20, 80, 10]
//     }
//   ]
// })

ChartJS.register(ArcElement, Tooltip, Legend)

const getData = computed<ChartData>(() => {
  return props.data.reduce((acc: ChartData, item: SectorListItemData) => {
    acc.labels!.push(item.name)
    acc.datasets![0].backgroundColor!.push(item.color)
    acc.datasets![0].data!.push(item.value)
    return acc
  }, defaultChartData())
})

const getLegendData = computed<Array<CustomLegendItem>>(() => {
  return props.data.reduce((acc: Array<CustomLegendItem>, item) => {
    acc.push({label: item.name, color: item.color})
    return acc
  }, [])
})

// const data = {
//   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
//   datasets: [
//     {
//       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//       data: [40, 20, 80, 10]
//     }
//   ]
// }

const options = {
  responsive: false,
  maintainAspectRatio: false,
  layout: {
    autoPadding: false,
  },
  plugins: {
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
  },
}
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-items: center;
  position: relative;
  height:500px;
  width: 500px;
}
</style>
