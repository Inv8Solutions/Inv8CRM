<script setup lang="ts">
import Card from '../Common/Card.vue'
import Badge from '../Common/Badge.vue'

interface Activity {
  id: number
  type: 'call' | 'email' | 'meeting' | 'deal'
  title: string
  description: string
  time: string
  user: {
    name: string
    avatar: string
  }
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'deal',
    title: 'Deal Closed',
    description: 'Acme Corp - Enterprise Plan',
    time: '10 min ago',
    user: { name: 'Sarah', avatar: 'S' },
  },
  {
    id: 2,
    type: 'call',
    title: 'Call Completed',
    description: 'Follow-up with John Smith',
    time: '25 min ago',
    user: { name: 'Mike', avatar: 'M' },
  },
  {
    id: 3,
    type: 'email',
    title: 'Email Sent',
    description: 'Proposal sent to TechStart Inc',
    time: '1 hour ago',
    user: { name: 'Lisa', avatar: 'L' },
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Meeting Scheduled',
    description: 'Demo with GlobalTech team',
    time: '2 hours ago',
    user: { name: 'John', avatar: 'J' },
  },
  {
    id: 5,
    type: 'email',
    title: 'Email Opened',
    description: 'Marketing proposal viewed',
    time: '3 hours ago',
    user: { name: 'Sarah', avatar: 'S' },
  },
]

const getTypeColor = (type: Activity['type']) => {
  switch (type) {
    case 'deal':
      return 'bg-emerald-500'
    case 'call':
      return 'bg-blue-500'
    case 'email':
      return 'bg-indigo-500'
    case 'meeting':
      return 'bg-amber-500'
    default:
      return 'bg-gray-500'
  }
}

const getTypeBadge = (type: Activity['type']) => {
  switch (type) {
    case 'deal':
      return 'success'
    case 'call':
      return 'primary'
    case 'email':
      return 'info'
    case 'meeting':
      return 'warning'
    default:
      return 'primary'
  }
}
</script>

<template>
  <Card title="Recent Activity" subtitle="Latest actions from your team">
    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-start space-x-4 p-3 rounded-xl hover:bg-blue-50/50 transition-colors cursor-pointer"
      >
        <!-- Activity Type Indicator -->
        <div class="relative">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
            :class="getTypeColor(activity.type)"
          >
            {{ activity.user.avatar }}
          </div>
          <div
            class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
            :class="getTypeColor(activity.type)"
          ></div>
        </div>

        <!-- Activity Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-800">{{ activity.title }}</p>
            <Badge :variant="getTypeBadge(activity.type)" size="sm">
              {{ activity.type }}
            </Badge>
          </div>
          <p class="text-sm text-gray-600 mt-1 truncate">{{ activity.description }}</p>
          <p class="text-xs text-blue-500 mt-1">{{ activity.time }} · {{ activity.user.name }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
        View all activity →
      </button>
    </template>
  </Card>
</template>
