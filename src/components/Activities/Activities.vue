<script setup lang="ts">
import { ref } from 'vue'
import Card from '../Common/Card.vue'
import Badge from '../Common/Badge.vue'
import Button from '../Common/Button.vue'

interface Activity {
  id: number
  type: 'call' | 'email' | 'meeting' | 'task' | 'note'
  title: string
  description: string
  contact: string
  company: string
  date: string
  time: string
  duration?: string
  status: 'completed' | 'scheduled' | 'overdue'
  assignedTo: string
}

const selectedFilter = ref('all')

const activities: Activity[] = [
  { id: 1, type: 'meeting', title: 'Product Demo', description: 'Presentation of new features', contact: 'Sarah Johnson', company: 'Acme Corp', date: 'Today', time: '2:00 PM', duration: '1 hour', status: 'scheduled', assignedTo: 'John' },
  { id: 2, type: 'call', title: 'Follow-up Call', description: 'Discuss pricing options', contact: 'Michael Chen', company: 'TechStart', date: 'Today', time: '3:30 PM', duration: '30 min', status: 'scheduled', assignedTo: 'Sarah' },
  { id: 3, type: 'email', title: 'Send Proposal', description: 'Q1 partnership proposal', contact: 'Emily Rodriguez', company: 'GlobalTech', date: 'Today', time: '5:00 PM', status: 'scheduled', assignedTo: 'Mike' },
  { id: 4, type: 'task', title: 'Update CRM Records', description: 'Add notes from last meeting', contact: 'David Kim', company: 'Innovate Labs', date: 'Yesterday', time: '4:00 PM', status: 'overdue', assignedTo: 'Lisa' },
  { id: 5, type: 'call', title: 'Discovery Call', description: 'Initial contact with prospect', contact: 'Jessica Taylor', company: 'Digital Dynamics', date: 'Yesterday', time: '11:00 AM', duration: '45 min', status: 'completed', assignedTo: 'John' },
  { id: 6, type: 'meeting', title: 'Contract Review', description: 'Final terms discussion', contact: 'Robert Martinez', company: 'NexGen Systems', date: 'Feb 1', time: '10:00 AM', duration: '2 hours', status: 'completed', assignedTo: 'Sarah' },
  { id: 7, type: 'note', title: 'Meeting Notes', description: 'Documented key discussion points', contact: 'Amanda Lee', company: 'CloudPro', date: 'Feb 1', time: '3:00 PM', status: 'completed', assignedTo: 'Mike' },
  { id: 8, type: 'email', title: 'Welcome Email', description: 'Onboarding information sent', contact: 'James Wilson', company: 'DataFlow', date: 'Jan 31', time: '9:00 AM', status: 'completed', assignedTo: 'Lisa' },
]

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Calls', value: 'call' },
  { label: 'Emails', value: 'email' },
  { label: 'Meetings', value: 'meeting' },
  { label: 'Tasks', value: 'task' },
]

const getTypeIcon = (type: Activity['type']) => {
  switch (type) {
    case 'call': return { icon: 'phone', color: 'bg-blue-500' }
    case 'email': return { icon: 'email', color: 'bg-indigo-500' }
    case 'meeting': return { icon: 'meeting', color: 'bg-emerald-500' }
    case 'task': return { icon: 'task', color: 'bg-amber-500' }
    case 'note': return { icon: 'note', color: 'bg-gray-500' }
    default: return { icon: 'task', color: 'bg-gray-500' }
  }
}

const getStatusVariant = (status: Activity['status']) => {
  switch (status) {
    case 'completed': return 'success'
    case 'scheduled': return 'info'
    case 'overdue': return 'danger'
    default: return 'primary'
  }
}

const filteredActivities = ref(activities)
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Activities</h1>
        <p class="text-blue-500 mt-1">Track calls, meetings, emails, and tasks</p>
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="outline">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Calendar View
        </Button>
        <Button variant="primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Log Activity
        </Button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl border border-blue-100 p-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">12</p>
            <p class="text-sm text-blue-500">Calls Today</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-blue-100 p-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">28</p>
            <p class="text-sm text-indigo-500">Emails Sent</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-blue-100 p-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">5</p>
            <p class="text-sm text-emerald-500">Meetings</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-blue-100 p-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">3</p>
            <p class="text-sm text-amber-500">Tasks Due</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex items-center space-x-2">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="selectedFilter = filter.value"
        class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
        :class="selectedFilter === filter.value 
          ? 'bg-blue-600 text-white' 
          : 'bg-white text-gray-600 border border-blue-100 hover:bg-blue-50'"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Activities Timeline -->
    <Card>
      <div class="space-y-6">
        <!-- Today -->
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Today</h3>
          <div class="space-y-4">
            <div
              v-for="activity in filteredActivities.filter(a => a.date === 'Today')"
              :key="activity.id"
              class="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <!-- Type Icon -->
              <div 
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                :class="getTypeIcon(activity.type).color"
              >
                <svg v-if="activity.type === 'call'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <svg v-else-if="activity.type === 'email'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="activity.type === 'meeting'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <h4 class="text-sm font-semibold text-gray-800">{{ activity.title }}</h4>
                  <Badge :variant="getStatusVariant(activity.status)" size="sm">
                    {{ activity.status }}
                  </Badge>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ activity.description }}</p>
                <div class="flex items-center flex-wrap gap-4 text-xs text-gray-500">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ activity.contact }} · {{ activity.company }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ activity.time }} <span v-if="activity.duration">· {{ activity.duration }}</span>
                  </span>
                  <span class="flex items-center">
                    <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 mr-1">
                      {{ activity.assignedTo[0] }}
                    </div>
                    {{ activity.assignedTo }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-2">
                <button class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button class="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Yesterday -->
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Yesterday</h3>
          <div class="space-y-4">
            <div
              v-for="activity in filteredActivities.filter(a => a.date === 'Yesterday')"
              :key="activity.id"
              class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors cursor-pointer border border-blue-50"
            >
              <!-- Type Icon -->
              <div 
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                :class="getTypeIcon(activity.type).color"
              >
                <svg v-if="activity.type === 'call'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <h4 class="text-sm font-semibold text-gray-800">{{ activity.title }}</h4>
                  <Badge :variant="getStatusVariant(activity.status)" size="sm">
                    {{ activity.status }}
                  </Badge>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ activity.description }}</p>
                <div class="flex items-center flex-wrap gap-4 text-xs text-gray-500">
                  <span>{{ activity.contact }} · {{ activity.company }}</span>
                  <span>{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earlier -->
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Earlier</h3>
          <div class="space-y-4">
            <div
              v-for="activity in filteredActivities.filter(a => !['Today', 'Yesterday'].includes(a.date))"
              :key="activity.id"
              class="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors cursor-pointer border border-blue-50"
            >
              <div 
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                :class="getTypeIcon(activity.type).color"
              >
                <svg v-if="activity.type === 'meeting'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="activity.type === 'note'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <h4 class="text-sm font-semibold text-gray-800">{{ activity.title }}</h4>
                  <Badge :variant="getStatusVariant(activity.status)" size="sm">
                    {{ activity.status }}
                  </Badge>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ activity.description }}</p>
                <div class="flex items-center flex-wrap gap-4 text-xs text-gray-500">
                  <span>{{ activity.contact }} · {{ activity.company }}</span>
                  <span>{{ activity.date }} · {{ activity.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Load more activities →
        </button>
      </template>
    </Card>
  </div>
</template>
