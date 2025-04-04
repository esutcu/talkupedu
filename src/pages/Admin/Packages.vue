<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h2 class="text-2xl font-bold mb-4 text-[#3871B1]">{{ $t('admin.packages.title') }}</h2>

    <form @submit.prevent="createPackage" class="grid grid-cols-1 gap-4 mb-6">
      <input v-model="name" :placeholder="$t('admin.packages.packageName')" class="border p-2 rounded" />
      <input v-model.number="amount" type="number" :placeholder="$t('admin.packages.credits')" class="border p-2 rounded" />
      <input v-model.number="price" type="number" :placeholder="$t('admin.packages.price')" class="border p-2 rounded" />
      <button class="bg-[#FF8913] text-white px-4 py-2 rounded hover:bg-[#e77f0f]">{{ $t('admin.packages.addPackage') }}</button>
    </form>

    <div v-if="packages.length" class="space-y-4">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        class="p-4 border rounded bg-white dark:bg-gray-800"
      >
        <strong>{{ pkg.name }}</strong>: {{ pkg.amount }} {{ $t('admin.packages.creditsFor') }} ${{ pkg.price }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const name = ref('')
const amount = ref(0)
const price = ref(0)
const packages = ref([])

async function fetchPackages() {
  const { data } = await supabase.from('credit_packages').select('*')
  packages.value = data ?? []
}

async function createPackage() {
  await supabase.from('credit_packages').insert({
    name: name.value,
    amount: amount.value,
    price: price.value
  })
  name.value = ''
  amount.value = 0
  price.value = 0
  fetchPackages()
}

onMounted(fetchPackages)
</script>