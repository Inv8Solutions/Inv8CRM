<script setup lang="ts">
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Leads</h1>
        <p class="text-blue-500 mt-1">Track and convert your sales opportunities</p>
      </div>
    </div>

    <!-- Empty State -->
    <div class="flex items-center justify-center h-96">
      <div class="text-center">
        <div class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">No leads yet</h2>
        <p class="text-gray-500 mb-6">Get started by adding your first lead</p>
        <button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Lead
        </button>
      </div>
    </div>
  </div>
</template>
