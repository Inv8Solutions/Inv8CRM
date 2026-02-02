<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)

const notifications = [
  { id: 1, title: 'New lead assigned', time: '5 min ago', read: false },
  { id: 2, title: 'Meeting reminder', time: '1 hour ago', read: false },
  { id: 3, title: 'Deal closed successfully', time: '2 hours ago', read: true },
]
</script>

<template>
  <nav class="bg-white border-b border-blue-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
    <!-- Search -->
    <div class="flex items-center flex-1 max-w-md">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search contacts, leads, deals..."
          class="w-full pl-10 pr-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-sm text-gray-700 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center space-x-4">
      <!-- Quick Add Button -->
      <button class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Quick Add</span>
      </button>

      <!-- Notifications -->
      <div class="relative">
        <button 
          @click="showNotifications = !showNotifications"
          class="relative p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <!-- Notifications Dropdown -->
        <div 
          v-if="showNotifications"
          class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-blue-100 py-2 z-50"
        >
          <div class="px-4 py-2 border-b border-blue-100">
            <h3 class="font-semibold text-gray-800">Notifications</h3>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
              :class="{ 'bg-blue-50/50': !notification.read }"
            >
              <p class="text-sm text-gray-800">{{ notification.title }}</p>
              <p class="text-xs text-blue-500 mt-1">{{ notification.time }}</p>
            </div>
          </div>
          <div class="px-4 py-2 border-t border-blue-100">
            <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
          </div>
        </div>
      </div>

      <!-- User Menu -->
      <div class="relative">
        <button 
          @click="showUserMenu = !showUserMenu"
          class="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">JD</span>
          </div>
          <div class="hidden md:block text-left">
            <p class="text-sm font-medium text-gray-800">John Doe</p>
            <p class="text-xs text-blue-500">Admin</p>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- User Dropdown -->
        <div 
          v-if="showUserMenu"
          class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-blue-100 py-2 z-50"
        >
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">Settings</a>
          <hr class="my-2 border-blue-100" />
          <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Sign out</a>
        </div>
      </div>
    </div>
  </nav>
</template>
