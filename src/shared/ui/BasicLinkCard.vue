<script setup lang="ts">
interface CardProps {
  to: string
  primaryText: string
  src?: string
  secondaryText?: string
}

defineProps<CardProps>()
</script>

<template>
  <RouterLink class="p-4 bg-black/50 hover:bg-black transition-colors rounded-md w-58" :to>
    <img v-if="src" :src class="w-50 h-50 object-cover rounded-md" />
    <p class="mt-3 text-white font-semibold line-clamp-1">
      {{ primaryText }}
    </p>
    <div v-if="secondaryText" class="opacity-70 text-xs mt-1 z-0 line-clamp-1">
      {{ secondaryText }}
    </div>
  </RouterLink>
</template>
