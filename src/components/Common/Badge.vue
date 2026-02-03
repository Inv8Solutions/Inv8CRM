<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
}>()
</script>

<template>
  <span
    class="inline-flex items-center font-medium rounded-full"
    :class="[
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variant === 'success'
        ? 'bg-emerald-100 text-emerald-700'
        : variant === 'warning'
          ? 'bg-amber-100 text-amber-700'
          : variant === 'danger'
            ? 'bg-red-100 text-red-700'
            : variant === 'info'
              ? 'bg-sky-100 text-sky-700'
              : 'bg-blue-100 text-blue-700',
    ]"
  >
    <slot />
  </span>
</template>
