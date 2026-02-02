<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  noPadding?: boolean
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
    <div v-if="title || $slots.header" class="px-6 py-4 border-b border-blue-50">
      <slot name="header">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <p v-if="subtitle" class="text-sm text-blue-500 mt-1">{{ subtitle }}</p>
        </div>
      </slot>
    </div>
    <div :class="noPadding ? '' : 'p-6'">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-blue-50 bg-blue-50/30">
      <slot name="footer" />
    </div>
  </div>
</template>
