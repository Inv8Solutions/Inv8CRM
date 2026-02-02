<script setup lang="ts">
import Card from '../Common/Card.vue'
import Badge from '../Common/Badge.vue'

interface Deal {
  id: number
  company: string
  value: string
  stage: 'qualification' | 'proposal' | 'negotiation' | 'closed'
  probability: number
  closeDate: string
}

const deals: Deal[] = [
  { id: 1, company: 'Acme Corporation', value: '$45,000', stage: 'negotiation', probability: 75, closeDate: 'Feb 15' },
  { id: 2, company: 'TechStart Inc', value: '$28,500', stage: 'proposal', probability: 50, closeDate: 'Feb 20' },
  { id: 3, company: 'GlobalTech Solutions', value: '$120,000', stage: 'qualification', probability: 25, closeDate: 'Mar 01' },
  { id: 4, company: 'Innovate Labs', value: '$67,000', stage: 'negotiation', probability: 80, closeDate: 'Feb 10' },
  { id: 5, company: 'Digital Dynamics', value: '$35,000', stage: 'proposal', probability: 60, closeDate: 'Feb 25' },
]

const getStageVariant = (stage: Deal['stage']) => {
  switch (stage) {
    case 'closed': return 'success'
    case 'negotiation': return 'warning'
    case 'proposal': return 'info'
    case 'qualification': return 'primary'
    default: return 'primary'
  }
}
</script>

<template>
  <Card title="Deal Pipeline" subtitle="Active opportunities" :noPadding="true">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-blue-50/50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Company</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Value</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Stage</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Probability</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Close Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-blue-50">
          <tr 
            v-for="deal in deals"
            :key="deal.id"
            class="hover:bg-blue-50/30 transition-colors cursor-pointer"
          >
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-medium mr-3">
                  {{ deal.company.charAt(0) }}
                </div>
                <span class="text-sm font-medium text-gray-800">{{ deal.company }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm font-semibold text-gray-800">{{ deal.value }}</span>
            </td>
            <td class="px-6 py-4">
              <Badge :variant="getStageVariant(deal.stage)" size="sm">
                {{ deal.stage }}
              </Badge>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="w-16 h-2 bg-blue-100 rounded-full overflow-hidden mr-2">
                  <div 
                    class="h-full rounded-full"
                    :class="deal.probability >= 70 ? 'bg-emerald-500' : deal.probability >= 40 ? 'bg-amber-500' : 'bg-blue-500'"
                    :style="{ width: `${deal.probability}%` }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600">{{ deal.probability }}%</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm text-gray-600">{{ deal.closeDate }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
        View all deals →
      </button>
    </template>
  </Card>
</template>
