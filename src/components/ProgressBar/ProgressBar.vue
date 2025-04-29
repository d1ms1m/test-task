<template>
  <div class="progress-bar">
    <svg
      :width="size"
      :height="size"
      :viewPort="'0 0 ' + size + ' ' + size"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        :transform="`rotate(${barType === ProgressBarType.CIRCLE ? -180 : 0}, ${size / 2}, ${size / 2})`"
      >
        <path
          class="bar"
          fill="transparent"
          :stroke-width="barWidth"
          stroke-linecap="round"
          :stroke="barColor"
          :d="pathD"
        />
        <path
          class="progress"
          fill="transparent"
          :stroke-width="barWidth"
          :stroke="getProgressColor"
          :stroke-dasharray="dasharray"
          :stroke-dashoffset="dashoffset"
          :d="pathD"
        />
      </g>
    </svg>
    <div class="info">
      <slot name="info" v-bind="{ progressNumber }">
        <div v-if="getShowProgressIcon" class="info__icon">
          <svg-icon :path="getIcon" type="mdi" :size="getIconSize"/>
        </div>
        <div v-if="getShowProgressNumber" class="info__number">{{ progressNumber }}</div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { getArcPath } from '@/helpers/circle.ts'
import {
  DEFAULT_BAR_COLOR, DEFAULT_PROGRESS_NUMBER_COLOR,
  ProgressBarStatus,
  ProgressBarStatusColor,
  ProgressBarType
} from '@/components/ProgressBar/interfaces.ts'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheck, mdiAlertCircle, mdiClose } from '@mdi/js'

const CIRCLE_START_ANGLE = -179.99
const DASHBOARD_START_ANGLE = -135.0

const props = defineProps({
  size: {
    type: Number,
    default: 100,
  },
  percentage: {
    type: Number,
    default: 0,
    /**
     * Validator for `percentage` prop.
     * @param {number} val value to check
     * @returns {boolean} whether the value is valid
     */
    validator: (val: number) => {
      return val <= 100
    },
  },
  barWidth: {
    type: Number,
    default: 4,
  },
  barColor: {
    type: String,
    default: DEFAULT_BAR_COLOR,
  },
  progressColor: {
    type: String,
  },
  showProgressNumber: {
    type: Boolean,
    default: true,
  },
  barType: {
    type: String as PropType<ProgressBarType>,
    default: ProgressBarType.CIRCLE,
  },
  status: {
    type: String as PropType<ProgressBarStatus>,
    default: ProgressBarStatus.IN_PROGRESS,
  },
})

const StatusIcon = {
  [ProgressBarStatus.IN_PROGRESS]: undefined,
  [ProgressBarStatus.SUCCESS]: mdiCheck,
  [ProgressBarStatus.ERROR]: mdiClose,
  [ProgressBarStatus.WARNING]: mdiAlertCircle,
}

const getIcon = computed(() => StatusIcon[props.status])
const getIconSize = computed(() => props.size / 5)
const getShowProgressIcon = computed(() => !!getIcon.value)
const getShowProgressNumber = computed(() => !getIcon.value)

const r = computed(() => (props.size - props.barWidth) / 2)
const startArcAngle = computed(() =>
  props.barType === ProgressBarType.CIRCLE ? CIRCLE_START_ANGLE : DASHBOARD_START_ANGLE,
)
const dasharray = computed(() => (r.value * Math.PI * 2 * Math.abs(startArcAngle.value) * 2) / 360)
const dashoffset = computed(() => dasharray.value + (dasharray.value * props.percentage) / 100)
const progressNumber = computed(() => `${props.percentage}%`)
const pathD = computed(() => {
  const radius = r.value
  const cx = props.size / 2
  const cy = props.size / 2
  return getArcPath(cx, cy, radius, startArcAngle.value, -startArcAngle.value)
})
const getProgressColor = computed(() => props.progressColor ?? ProgressBarStatusColor[props.status])
const getProgressNumberColor = computed(() => props.status === ProgressBarStatus.IN_PROGRESS ? DEFAULT_PROGRESS_NUMBER_COLOR : getProgressColor.value)
</script>

<style lang="scss" scoped>
$size: v-bind(size);
$font-size: calc(($size / 5) * 1px);

.progress-bar {
  width: calc(($size) * 1px);
  height: calc(($size) * 1px);
  position: relative;
  text-align: center;

  .progress {
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s linear;
  }

  .info {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: v-bind(getProgressColor);
    font-size: 0;

    &__number {
      font-size: $font-size;
      color: v-bind(getProgressNumberColor);
    }
    &__icon {
      overflow: hidden;
    }
  }
}
</style>
