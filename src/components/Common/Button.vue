<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      size === 'sm'
        ? 'px-3 py-1.5 text-sm'
        : size === 'lg'
          ? 'px-6 py-3 text-base'
          : 'px-4 py-2 text-sm',
      variant === 'secondary'
        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        : variant === 'outline'
          ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
          : variant === 'ghost'
            ? 'text-blue-600 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
    ]"
  >
    <slot />
  </button>
</template>
