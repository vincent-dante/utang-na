<script setup>
const emit = defineEmits(["prev"]);
</script>

<template>
  <div>
    <h3 class="pb-10 font-bold">Work Information</h3>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label for="employmenttype" class="text-sm">Employment type</label>
        <select
          class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
          id="employmenttype"
        >
          <option value="" disabled selected>Employment type</option>
        </select>
      </div>
      <div>
        <label for="monthlyincome" class="text-sm">Gross monthly income</label>
        <input
          type="text"
          placeholder="₱"
          id="monthlyincome"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div class="justify-self-start">
        <button
          @click="emit('prev', 'AddressContact')"
          class="rounded-full border border-lavander-400 bg-white py-2 px-8 text-sm text-lavander-400"
        >
          Go Back
        </button>
      </div>
      <div class="justify-self-end">
        <button
          class="rounded-full bg-lavander-400 py-2 px-8 text-sm text-white hover:bg-lavander-500"
        >
          Review
        </button>
      </div>
    </div>
  </div>
</template>
