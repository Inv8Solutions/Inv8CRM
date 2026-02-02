<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  name: string
  icon: string
  id: string
  badge?: number
}

const props = defineProps<{
  currentView: string
}>()

const emit = defineEmits<{
  (e: 'navigate', view: string): void
}>()

const isCollapsed = ref(false)

const navItems: NavItem[] = [
  { name: 'Client Database', icon: 'clients', id: 'clients', badge: 24 },
  { name: 'Leads', icon: 'leads', id: 'leads', badge: 8 },
  { name: 'Project Breakdown Calculator', icon: 'calculator', id: 'calculator' },
  { name: 'Project Payment Monitoring', icon: 'payments', id: 'payments' },
]

const bottomNavItems: NavItem[] = [
  { name: 'Settings', icon: 'settings', id: 'settings' },
  { name: 'Help', icon: 'help', id: 'help' },
]
</script>

<template>
  <aside 
    class="bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col h-screen sticky top-0 transition-all duration-300"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <!-- Logo -->
    <div class="p-6 flex items-center justify-between border-b border-blue-800/50">
      <div v-if="!isCollapsed" class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
          <span class="text-blue-900 font-bold text-xl">I8</span>
        </div>
        <span class="font-bold text-xl">Inv8CRM</span>
      </div>
      <div v-else class="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto">
        <span class="text-blue-900 font-bold text-xl">I8</span>
      </div>
      <button 
        @click="isCollapsed = !isCollapsed"
        class="p-2 hover:bg-blue-800/50 rounded-lg transition-colors"
        :class="{ 'hidden': isCollapsed }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Expand button when collapsed -->
    <button 
      v-if="isCollapsed"
      @click="isCollapsed = false"
      class="p-3 hover:bg-blue-800/50 transition-colors"
    >
      <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="emit('navigate', item.id)"
        class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200"
        :class="[
          currentView === item.id 
            ? 'bg-white text-blue-900 shadow-lg' 
            : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
        ]"
      >
        <!-- Clients Icon -->
        <svg v-if="item.icon === 'clients'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <!-- Leads Icon -->
        <svg v-else-if="item.icon === 'leads'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <!-- Calculator Icon -->
        <svg v-else-if="item.icon === 'calculator'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <!-- Payments Icon -->
        <svg v-else-if="item.icon === 'payments'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <span v-if="!isCollapsed" class="font-medium">{{ item.name }}</span>
        <span 
          v-if="item.badge && !isCollapsed" 
          class="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
          :class="currentView === item.id ? 'bg-blue-100 text-blue-900' : 'bg-blue-700 text-blue-200'"
        >
          {{ item.badge }}
        </span>
      </button>
    </nav>

    <!-- Bottom Navigation -->
    <div class="p-4 border-t border-blue-800/50 space-y-2">
      <button
        v-for="item in bottomNavItems"
        :key="item.id"
        @click="emit('navigate', item.id)"
        class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-blue-800/50 hover:text-white transition-all duration-200"
      >
        <!-- Settings Icon -->
        <svg v-if="item.icon === 'settings'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <!-- Help Icon -->
        <svg v-else-if="item.icon === 'help'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <span v-if="!isCollapsed" class="font-medium">{{ item.name }}</span>
      </button>
    </div>
  </aside>
</template>
