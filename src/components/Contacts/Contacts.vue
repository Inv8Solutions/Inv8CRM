<script setup lang="ts">
import { ref } from 'vue'
import Card from '../Common/Card.vue'
import Badge from '../Common/Badge.vue'
import Button from '../Common/Button.vue'

interface Contact {
  id: number
  name: string
  email: string
  company: string
  phone: string
  status: 'active' | 'inactive' | 'prospect'
  lastContact: string
  avatar: string
}

const searchQuery = ref('')
const selectedFilter = ref('all')

const contacts: Contact[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@acmecorp.com',
    company: 'Acme Corporation',
    phone: '+1 (555) 123-4567',
    status: 'active',
    lastContact: '2 hours ago',
    avatar: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'mchen@techstart.io',
    company: 'TechStart Inc',
    phone: '+1 (555) 234-5678',
    status: 'active',
    lastContact: '1 day ago',
    avatar: 'MC',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@globaltech.com',
    company: 'GlobalTech Solutions',
    phone: '+1 (555) 345-6789',
    status: 'prospect',
    lastContact: '3 days ago',
    avatar: 'ER',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'dkim@innovatelabs.co',
    company: 'Innovate Labs',
    phone: '+1 (555) 456-7890',
    status: 'active',
    lastContact: '5 hours ago',
    avatar: 'DK',
  },
  {
    id: 5,
    name: 'Jessica Taylor',
    email: 'jtaylor@digitald.com',
    company: 'Digital Dynamics',
    phone: '+1 (555) 567-8901',
    status: 'inactive',
    lastContact: '2 weeks ago',
    avatar: 'JT',
  },
  {
    id: 6,
    name: 'Robert Martinez',
    email: 'rmartinez@nexgen.com',
    company: 'NexGen Systems',
    phone: '+1 (555) 678-9012',
    status: 'active',
    lastContact: '4 hours ago',
    avatar: 'RM',
  },
  {
    id: 7,
    name: 'Amanda Lee',
    email: 'alee@cloudpro.io',
    company: 'CloudPro Services',
    phone: '+1 (555) 789-0123',
    status: 'prospect',
    lastContact: '1 week ago',
    avatar: 'AL',
  },
  {
    id: 8,
    name: 'James Wilson',
    email: 'jwilson@dataflow.com',
    company: 'DataFlow Analytics',
    phone: '+1 (555) 890-1234',
    status: 'active',
    lastContact: '6 hours ago',
    avatar: 'JW',
  },
]

const getStatusVariant = (status: Contact['status']) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'danger'
    case 'prospect':
      return 'info'
    default:
      return 'primary'
  }
}

const filters = [
  { label: 'All', value: 'all', count: 24 },
  { label: 'Active', value: 'active', count: 18 },
  { label: 'Prospects', value: 'prospect', count: 4 },
  { label: 'Inactive', value: 'inactive', count: 2 },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Contacts</h1>
        <p class="text-blue-500 mt-1">Manage your customers and business relationships</p>
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="outline">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Import
        </Button>
        <Button variant="primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Contact
        </Button>
      </div>
    </div>

    <!-- Filters & Search -->
    <Card>
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <!-- Filter Tabs -->
        <div class="flex items-center space-x-2">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="selectedFilter = filter.value"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="
              selectedFilter === filter.value
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-blue-50'
            "
          >
            {{ filter.label }}
            <span
              class="ml-2 px-2 py-0.5 text-xs rounded-full"
              :class="
                selectedFilter === filter.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-600'
              "
            >
              {{ filter.count }}
            </span>
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full lg:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              class="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search contacts..."
            class="w-full pl-10 pr-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-sm text-gray-700 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </Card>

    <!-- Contacts Table -->
    <Card :noPadding="true">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-blue-50/50">
            <tr>
              <th class="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
              >
                Company
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
              >
                Last Contact
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blue-50">
            <tr
              v-for="contact in contacts"
              :key="contact.id"
              class="hover:bg-blue-50/30 transition-colors"
            >
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3"
                  >
                    {{ contact.avatar }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-800">{{ contact.name }}</p>
                    <p class="text-xs text-blue-500">{{ contact.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-700">{{ contact.company }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-600">{{ contact.phone }}</span>
              </td>
              <td class="px-6 py-4">
                <Badge :variant="getStatusVariant(contact.status)" size="sm">
                  {{ contact.status }}
                </Badge>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-500">{{ contact.lastContact }}</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
                  <button class="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-blue-50 flex items-center justify-between">
        <p class="text-sm text-gray-500">Showing 1-8 of 24 contacts</p>
        <div class="flex items-center space-x-2">
          <button
            class="px-3 py-1 text-sm text-gray-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Previous
          </button>
          <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">1</button>
          <button
            class="px-3 py-1 text-sm text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            2
          </button>
          <button
            class="px-3 py-1 text-sm text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            3
          </button>
          <button
            class="px-3 py-1 text-sm text-gray-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  </div>
</template>
