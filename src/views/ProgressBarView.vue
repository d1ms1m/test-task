<template>
  <main>
    <div class="progress-bar__view">
      <div class="column">
        <h1>barType = "circle"</h1>
        <progress-bar
          :size="150"
          :stroke-width="10"
          :bar-width="10"
          :percentage="percentage"
          :status="pbStatus"
        />
        <progress-bar
          :size="100"
          :bar-width="8"
          :percentage="50"
          :status="ProgressBarStatus.ERROR"
        />
        <progress-bar
          :size="80"
          :bar-width="6"
          :percentage="75"
          :status="ProgressBarStatus.WARNING"
        />
        <progress-bar
          :size="60"
          :bar-width="5"
          :percentage="100"
          :status="ProgressBarStatus.SUCCESS"
        />
      </div>
      <div class="column">
        <h1>barType = "dashboard"</h1>
        <progress-bar
          :size="150"
          :bar-width="10"
          :percentage="percentage"
          :bar-type="ProgressBarType.DASHBOARD"
          :status="pbStatus"
        />
        <progress-bar
          :size="100"
          :bar-width="8"
          :percentage="50"
          :status="ProgressBarStatus.ERROR"
          :bar-type="ProgressBarType.DASHBOARD"
        />
        <progress-bar
          :size="80"
          :bar-width="6"
          :percentage="75"
          :status="ProgressBarStatus.WARNING"
          :bar-type="ProgressBarType.DASHBOARD"
        />
        <progress-bar
          :size="60"
          :bar-width="5"
          :percentage="100"
          :status="ProgressBarStatus.SUCCESS"
          :bar-type="ProgressBarType.DASHBOARD"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue'
import { ref } from 'vue'
import { ProgressBarStatus, ProgressBarType } from '@/components/ProgressBar/interfaces.ts'

const percentage = ref(0)
const pbStatus = ref(ProgressBarStatus.IN_PROGRESS)

const intervalId = setInterval(() => {
  if (percentage.value < 100) {
    percentage.value = percentage.value + 10
  } else {
    percentage.value = 0
    // clearInterval(intervalId)
  }

  if (percentage.value === 0) {
    pbStatus.value = ProgressBarStatus.IN_PROGRESS
  }

  if (percentage.value === 90) {
    pbStatus.value = ProgressBarStatus.WARNING
  }

  if (percentage.value === 100) {
    pbStatus.value = ProgressBarStatus.SUCCESS
  }
}, 1000)
</script>

<style>
main {
  display: flex;
  flex-direction: column;
}

.progress-bar__view {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: start;
  justify-content: center;

  .column {
    h1 {
      width: 100%;
      text-align: center;
    }

    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}

</style>
