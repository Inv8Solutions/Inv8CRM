<script setup lang="ts">
import Card from '../Common/Card.vue'
import Button from '../Common/Button.vue'

const reportCards = [
  {
    title: 'Sales Overview',
    description: 'Revenue, deals won, and conversion rates',
    icon: 'chart',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Lead Analytics',
    description: 'Lead sources, qualification rates, and pipeline',
    icon: 'leads',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    title: 'Team Performance',
    description: 'Individual and team sales metrics',
    icon: 'team',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Activity Report',
    description: 'Calls, emails, meetings, and tasks',
    icon: 'activity',
    color: 'from-amber-500 to-amber-600',
  },
]

const quickStats = [
  { label: 'Total Revenue (MTD)', value: '$124,500', change: '+18.7%', positive: true },
  { label: 'Deals Closed', value: '47', change: '+12 vs last month', positive: true },
  { label: 'Avg. Deal Size', value: '$2,649', change: '-5.2%', positive: false },
  { label: 'Win Rate', value: '34.2%', change: '+2.1%', positive: true },
]

const topPerformers = [
  { name: 'Sarah Johnson', role: 'Senior Sales Rep', revenue: '$42,500', deals: 15, avatar: 'SJ' },
  { name: 'Mike Chen', role: 'Sales Rep', revenue: '$38,200', deals: 12, avatar: 'MC' },
  { name: 'Lisa Wang', role: 'Sales Rep', revenue: '$28,800', deals: 10, avatar: 'LW' },
  { name: 'John Davis', role: 'Junior Sales Rep', revenue: '$15,000', deals: 8, avatar: 'JD' },
]

const recentDeals = [
  { company: 'Acme Corp', value: '$45,000', date: 'Feb 1', rep: 'Sarah J.' },
  { company: 'TechStart Inc', value: '$28,500', date: 'Jan 30', rep: 'Mike C.' },
  { company: 'GlobalTech', value: '$67,000', date: 'Jan 28', rep: 'Lisa W.' },
  { company: 'Innovate Labs', value: '$32,000', date: 'Jan 25', rep: 'John D.' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Reports</h1>
        <p class="text-blue-500 mt-1">Analytics and insights for your sales team</p>
      </div>
      <div class="flex items-center space-x-3">
        <select
          class="px-4 py-2 text-sm bg-white border border-blue-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>This month</option>
          <option>Last month</option>
          <option>This quarter</option>
        </select>
        <Button variant="primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </Button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="bg-white rounded-xl border border-blue-100 p-5"
      >
        <p class="text-sm font-medium text-blue-500">{{ stat.label }}</p>
        <p class="text-2xl font-bold text-gray-800 mt-1">{{ stat.value }}</p>
        <p class="text-sm mt-2" :class="stat.positive ? 'text-emerald-600' : 'text-red-600'">
          {{ stat.change }}
        </p>
      </div>
    </div>

    <!-- Report Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="report in reportCards"
        :key="report.title"
        class="bg-white rounded-xl border border-blue-100 p-5 hover:shadow-lg transition-shadow cursor-pointer group"
      >
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform bg-gradient-to-br"
          :class="report.color"
        >
          <svg
            v-if="report.icon === 'chart'"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <svg
            v-else-if="report.icon === 'leads'"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <svg
            v-else-if="report.icon === 'team'"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800 mb-1">{{ report.title }}</h3>
        <p class="text-sm text-gray-500">{{ report.description }}</p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart Placeholder -->
      <Card title="Revenue Trend" subtitle="Monthly revenue over time">
        <div
          class="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
        >
          <div class="text-center">
            <svg
              class="w-12 h-12 text-blue-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p class="text-sm text-blue-500">Revenue chart visualization</p>
            <p class="text-xs text-gray-400 mt-1">Integrate your preferred charting library</p>
          </div>
        </div>
      </Card>

      <!-- Pipeline Chart Placeholder -->
      <Card title="Sales Pipeline" subtitle="Deals by stage">
        <div
          class="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl"
        >
          <div class="text-center">
            <svg
              class="w-12 h-12 text-indigo-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
            <p class="text-sm text-indigo-500">Pipeline chart visualization</p>
            <p class="text-xs text-gray-400 mt-1">Integrate your preferred charting library</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Performers -->
      <Card title="Top Performers" subtitle="This month's leaders">
        <div class="space-y-4">
          <div
            v-for="(performer, index) in topPerformers"
            :key="performer.name"
            class="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/50 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <span
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                :class="[
                  index === 0
                    ? 'bg-amber-100 text-amber-700'
                    : index === 1
                      ? 'bg-gray-100 text-gray-600'
                      : index === 2
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-50 text-blue-600',
                ]"
              >
                {{ index + 1 }}
              </span>
              <div
                class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium"
              >
                {{ performer.avatar }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ performer.name }}</p>
                <p class="text-xs text-blue-500">{{ performer.role }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-800">{{ performer.revenue }}</p>
              <p class="text-xs text-gray-500">{{ performer.deals }} deals</p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Recent Closed Deals -->
      <Card title="Recently Closed Deals" subtitle="Latest won opportunities" :noPadding="true">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-blue-50/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Company
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Value
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase">
                  Rep
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blue-50">
              <tr
                v-for="deal in recentDeals"
                :key="deal.company"
                class="hover:bg-blue-50/30 transition-colors"
              >
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-800">{{ deal.company }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-semibold text-emerald-600">{{ deal.value }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-500">{{ deal.date }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-600">{{ deal.rep }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </div>
</template>
