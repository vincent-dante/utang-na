<script setup>
const emit = defineEmits(["prev", "next"]);
</script>

<template>
  <div>
    <h3 class="pb-10 font-bold">Address & Contact</h3>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label for="houseno" class="text-sm">House no. / Unit no.</label>
        <input
          type="text"
          placeholder="House no. / Unit no."
          id="houseno"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <label for="firstname" class="text-sm">Street</label>
        <input
          type="text"
          placeholder="Street"
          id="street"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <label for="subdivision" class="text-sm">Subdivision / Village</label>
        <input
          type="text"
          placeholder="Subdivision / Village"
          id="subdivision"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <label for="province" class="text-sm">Province</label>
        <select
          class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
          id="province"
        >
          <option value="" disabled selected>Province</option>
        </select>
      </div>
      <div>
        <label for="city" class="text-sm">City / Municipality</label>
        <select
          class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
          id="city"
        >
          <option value="" disabled selected>City / Municipality</option>
        </select>
      </div>
      <div>
        <label for="barangay" class="text-sm">Barangay</label>
        <select
          class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
          id="barangay"
        >
          <option value="" disabled selected>Barangay</option>
        </select>
      </div>
      <div>
        <label for="emailaddress" class="text-sm">Email Address</label>
        <input
          type="text"
          placeholder="House no. / Unit no."
          id="emailaddress"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <label for="mobilenumber" class="text-sm">Mobile number</label>
        <input
          type="text"
          placeholder="+63"
          id="mobilenumber"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div class="justify-self-start">
        <button
          @click="emit('prev', 'PersonalInformation')"
          class="rounded-full border border-lavander-400 bg-white py-2 px-8 text-sm text-lavander-400"
        >
          Go Back
        </button>
      </div>
      <div class="justify-self-end">
        <button
          @click="emit('next', 'WorkInformation')"
          class="rounded-full bg-lavander-400 py-2 px-8 text-sm text-white hover:bg-lavander-500"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
