<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/firebase'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: string
  value: number
  source: string
  assignedTo: string
  createdAt: string | Timestamp | Date
}

const leads = ref<Lead[]>([])
const loading = ref(true)
const error = ref('')

// Fetch leads from Firestore
const fetchLeads = (): void => {
  try {
    const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'))

    onSnapshot(
      leadsQuery,
      (snapshot) => {
        leads.value = snapshot.docs.map((snapshotDoc) => {
          const data = snapshotDoc.data()
          return {
            id: snapshotDoc.id,
            name: data.name || '',
            company: data.company || '',
            email: data.email || '',
            phone: data.phone || '',
            status: data.status || 'New',
            value: data.value || 0,
            source: data.source || '',
            assignedTo: data.assignedTo || '',
            createdAt: data.createdAt || new Date().toISOString(),
          } as Lead
        })
        loading.value = false
      },
      (err) => {
        error.value = `Failed to load leads: ${err?.message || String(err)}`
        loading.value = false
      },
    )
  } catch (err) {
    console.error('Error setting up leads listener:', err)
    error.value = 'Failed to connect to database'
    loading.value = false
  }
}

// Delete lead
const deleteLead = async (leadId: string): Promise<void> => {
  if (confirm('Are you sure you want to delete this lead?')) {
    try {
      await deleteDoc(doc(db, 'leads', leadId))
    } catch (err) {
      error.value = `Failed to delete lead: ${err?.message || String(err)}`
      alert('Failed to delete lead')
    }
  }
}

onMounted(() => {
  fetchLeads()
})

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-800'
    case 'Qualified':
      return 'bg-green-100 text-green-800'
    case 'Contacted':
      return 'bg-yellow-100 text-yellow-800'
    case 'Proposal Sent':
      return 'bg-purple-100 text-purple-800'
    case 'Negotiation':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (date: string | Timestamp | Date): string => {
  if (!date) return '-'

  try {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString()
    }
    if (date instanceof Date) {
      return date.toLocaleDateString()
    }
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString()
    }
    return '-'
  } catch {
    return '-'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Leads</h1>
        <p class="text-blue-500 mt-1">Track and convert your sales opportunities</p>
      </div>
      <button
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Lead
      </button>
    </div>

    <!-- Leads Table -->
    <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div class="flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Loading leads...</span>
      </div>
    </div>

    <div v-else-if="error" class="bg-white rounded-xl shadow-sm border border-red-200 p-8">
      <div class="text-center text-red-600">
        <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-lg font-semibold">{{ error }}</p>
        <button
          @click="fetchLeads()"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <div v-else-if="leads.length === 0" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div
          class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-10 h-10 text-blue-500"
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
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">No leads yet</h2>
        <p class="text-gray-500 mb-6">Get started by adding your first lead</p>
      </div>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lead
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Source
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
              </th>
              <th class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ lead.name }}</div>
                  <div class="text-sm text-gray-500">{{ lead.company }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm text-gray-900">{{ lead.email }}</div>
                  <div class="text-sm text-gray-500">{{ lead.phone }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusColor(lead.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ lead.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(lead.value) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ lead.source }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ lead.assignedTo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(lead.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    class="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteLead(lead.id)"
                    class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
