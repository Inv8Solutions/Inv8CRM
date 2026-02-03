<script setup lang="ts">
import { ref } from 'vue'
import Login from './components/Auth/Login.vue'
import Navbar from './components/Navbar/Navbar.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'
import Contacts from './components/Contacts/Contacts.vue'
import Leads from './components/Leads/Leads.vue'
import Activities from './components/Activities/Activities.vue'
import Reports from './components/Reports/Reports.vue'

const isAuthenticated = ref(false)
const currentView = ref('dashboard')

const handleNavigate = (view: string) => {
  currentView.value = view
}

const handleLogin = () => {
  isAuthenticated.value = true
}
</script>

<template>
  <!-- Login Page -->
  <Login v-if="!isAuthenticated" @login="handleLogin" />

  <!-- Main App -->
  <div v-else class="flex h-screen bg-blue-50/30">
    <!-- Sidebar -->
    <Sidebar :currentView="currentView" @navigate="handleNavigate" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Navbar -->
      <Navbar />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <Dashboard v-if="currentView === 'dashboard'" />
        <Contacts v-else-if="currentView === 'clients'" />
        <Leads v-else-if="currentView === 'leads'" />
        <Activities v-else-if="currentView === 'activities'" />
        <Reports v-else-if="currentView === 'reports'" />

        <!-- Placeholder for other views -->
        <div v-else class="flex items-center justify-center h-full">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">
              {{
                currentView.charAt(0).toUpperCase() +
                currentView.slice(1).replace(/([A-Z])/g, ' $1')
              }}
            </h2>
            <p class="text-blue-500">This section is coming soon</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* Global styles for smooth scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
