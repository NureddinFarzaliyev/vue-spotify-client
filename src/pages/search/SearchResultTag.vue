<script setup lang="ts">
import classNames from 'classnames'
import { computed } from 'vue'

interface TagProps {
  text: string
  isActive: boolean
  onClick: () => void
}

const props = defineProps<TagProps>()

const buttonClasses = computed(() =>
  classNames(
    props.isActive ? 'bg-white text-black' : 'bg-transparent text-white',
    'px-3 py-1 text-sm rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-100 cursor-pointer',
  ),
)
</script>

<template>
  <button :class="buttonClasses" @click="onClick">
    {{ text }}
  </button>
</template>
