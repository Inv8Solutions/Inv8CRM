<script setup lang="ts">
import StatsCard from './StatsCard.vue'
import RecentActivity from './RecentActivity.vue'
import DealsPipeline from './DealsPipeline.vue'
import Card from '../Common/Card.vue'

const stats = [
  { title: 'Total Contacts', value: '2,847', change: '+12.5%', changeType: 'positive' as const, icon: 'users' as const },
  { title: 'Active Leads', value: '184', change: '+8.2%', changeType: 'positive' as const, icon: 'leads' as const },
  { title: 'Deals Won', value: '47', change: '-3.1%', changeType: 'negative' as const, icon: 'deals' as const },
  { title: 'Revenue', value: '$124.5K', change: '+18.7%', changeType: 'positive' as const, icon: 'revenue' as const },
]

const upcomingTasks = [
  { id: 1, title: 'Follow up with Acme Corp', time: '10:00 AM', priority: 'high' },
  { id: 2, title: 'Send proposal to TechStart', time: '11:30 AM', priority: 'medium' },
  { id: 3, title: 'Team sync meeting', time: '2:00 PM', priority: 'low' },
  { id: 4, title: 'Review Q1 targets', time: '4:00 PM', priority: 'medium' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-blue-500 mt-1">Welcome back, John! Here's what's happening today.</p>
      </div>
      <div class="flex items-center space-x-3">
        <button class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          Export Report
        </button>
        <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          + New Deal
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :changeType="stat.changeType"
        :icon="stat.icon"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Deals Pipeline - Takes 2 columns -->
      <div class="lg:col-span-2">
        <DealsPipeline />
      </div>

      <!-- Upcoming Tasks -->
      <div>
        <Card title="Today's Tasks" subtitle="4 tasks remaining">
          <div class="space-y-3">
            <div 
              v-for="task in upcomingTasks"
              :key="task.id"
              class="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div class="flex items-center space-x-3">
                <input 
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ task.title }}</p>
                  <p class="text-xs text-blue-500">{{ task.time }}</p>
                </div>
              </div>
              <span 
                class="w-2 h-2 rounded-full"
                :class="[
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-amber-500' :
                  'bg-blue-500'
                ]"
              ></span>
            </div>
          </div>

          <template #footer>
            <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all tasks →
            </button>
          </template>
        </Card>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RecentActivity />
      
      <!-- Quick Actions -->
      <Card title="Quick Actions" subtitle="Common tasks at your fingertips">
        <div class="grid grid-cols-2 gap-4">
          <button class="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-800">Add Contact</span>
          </button>
          
          <button class="flex flex-col items-center justify-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors group">
            <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-800">New Lead</span>
          </button>
          
          <button class="flex flex-col items-center justify-center p-6 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors group">
            <div class="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-800">Create Quote</span>
          </button>
          
          <button class="flex flex-col items-center justify-center p-6 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors group">
            <div class="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-800">Schedule Meeting</span>
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>
