<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/firebase'

interface Lead {
  id: string
  name: string
  company: string
  role: string
  location: string
  facebookAccount: string
  leadSource: string
  serviceType: string
  budget: number
  notes: string
  createdAt: string | Timestamp | Date
  updatedAt?: string | Timestamp | Date
}

const leads = ref<Lead[]>([])
const loading = ref(true)
const error = ref('')
const showEditModal = ref(false)
const editingLead = ref<Partial<Lead> | null>(null)

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
            role: data.role || '',
            location: data.location || '',
            facebookAccount: data.facebookAccount || '',
            leadSource: data.leadSource || '',
            serviceType: data.serviceType || '',
            budget: data.budget || 0,
            notes: data.notes || '',
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || data.createdAt || new Date().toISOString(),
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

// Open edit modal
const openEdit = (lead: Lead): void => {
  editingLead.value = { ...lead }
  showEditModal.value = true
}

const closeEdit = (): void => {
  editingLead.value = null
  showEditModal.value = false
}

const saveEdit = async (): Promise<void> => {
  if (!editingLead.value || !editingLead.value.id) return
  try {
    const id = editingLead.value.id
    const payload = { ...editingLead.value } as any
    delete payload.id
    payload.updatedAt = serverTimestamp()
    await updateDoc(doc(db, 'leads', id), payload)

    // Update local list (best-effort)
    const idx = leads.value.findIndex((l) => l.id === id)
    if (idx !== -1) {
      leads.value[idx] = {
        ...leads.value[idx],
        ...(editingLead.value as Lead),
        updatedAt: new Date().toISOString(),
      }
    }

    closeEdit()
  } catch (err) {
    console.error('Failed to save lead:', err)
    alert('Failed to save lead')
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

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-40 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/40" @click="closeEdit"></div>
      <div class="bg-white rounded-xl shadow-lg z-50 w-11/12 md:w-1/2 p-6">
        <h3 class="text-lg font-semibold mb-4">Edit Lead</h3>
        <div class="space-y-3">
          <div>
            <label class="text-sm text-gray-600">Name</label>
            <input v-model="editingLead.name" class="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Company</label>
            <input v-model="editingLead.company" class="w-full mt-1 p-2 border rounded" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="text-sm text-gray-600">Role</label>
              <input v-model="editingLead.role" class="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label class="text-sm text-gray-600">Location</label>
              <input v-model="editingLead.location" class="w-full mt-1 p-2 border rounded" />
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-600">Facebook Account</label>
            <input v-model="editingLead.facebookAccount" class="w-full mt-1 p-2 border rounded" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="text-sm text-gray-600">Lead Source</label>
              <input v-model="editingLead.leadSource" class="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label class="text-sm text-gray-600">Service Type</label>
              <input v-model="editingLead.serviceType" class="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label class="text-sm text-gray-600">Budget</label>
              <input
                type="number"
                v-model.number="editingLead.budget"
                class="w-full mt-1 p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-600">Notes</label>
            <textarea
              v-model="editingLead.notes"
              class="w-full mt-1 p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div class="mt-4 flex justify-end space-x-2">
          <button @click="closeEdit" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button @click="saveEdit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
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

    <div v-else class="space-y-4">
      <div
        v-for="lead in leads"
        :key="lead.id"
        class="bg-white rounded-xl shadow p-6 border border-gray-200"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ lead.name || '—' }}</h3>
            <p class="text-sm text-gray-500">{{ lead.company || '—' }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="openEdit(lead)"
              class="text-blue-600 hover:text-blue-900 p-1 rounded"
              title="Edit"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              class="text-red-600 hover:text-red-900 p-1 rounded"
              title="Delete"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <div class="text-sm text-gray-600">Role</div>
            <div class="text-sm text-gray-900">{{ lead.role || '—' }}</div>
            <div class="text-sm text-gray-600 mt-2">Location</div>
            <div class="text-sm text-gray-900">{{ lead.location || '—' }}</div>
            <div class="text-sm text-gray-600 mt-2">Facebook</div>
            <div class="text-sm text-gray-900">{{ lead.facebookAccount || '—' }}</div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-600">Lead Source</div>
            <div class="text-sm text-gray-900">{{ lead.leadSource || '—' }}</div>
            <div class="text-sm text-gray-600 mt-2">Service Type</div>
            <div class="text-sm text-gray-900">{{ lead.serviceType || '—' }}</div>
            <div class="text-sm text-gray-600 mt-2">Budget</div>
            <div class="text-sm text-gray-900">{{ formatCurrency(lead.budget || 0) }}</div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-600">Notes</div>
            <div class="text-sm text-gray-900">{{ lead.notes || '—' }}</div>
            <div class="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div>Created: {{ formatDate(lead.createdAt) }}</div>
              <div>Updated: {{ formatDate(lead.updatedAt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
