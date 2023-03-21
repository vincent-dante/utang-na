<script setup>
const emit = defineEmits(["next"]);
</script>

<template>
  <div>
    <h3 class="pb-10 font-bold">Personal Information</h3>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label for="firstname" class="text-sm">First name</label>
        <input
          type="text"
          placeholder="First name"
          id="firstname"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <label for="firstname" class="text-sm">Last name</label>
        <input
          type="text"
          placeholder="Last name"
          id="lastname"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <label for="middlename" class="text-sm">Middle name</label>
        <input
          type="text"
          placeholder="Middle name"
          id="middlename"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <label for="suffix" class="text-sm">Suffix (optional)</label>
        <input
          type="text"
          placeholder="Suffix"
          id="suffix"
          class="w-full rounded-full border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        />
      </div>
      <div>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="hasmiddlename"
            id="hasmiddlename"
            class="mr-3 rounded border-gray-300 text-sm focus:border-lavander-400 focus:ring-transparent"
          />
          <label
            for="hasmiddlename"
            class="cursor-pointer text-sm text-gray-600"
            >I don’t have a middle name.</label
          >
        </div>
      </div>
      <div></div>
      <div>
        <div class="flex flex-wrap items-center gap-1">
          <span class="w-full text-sm">Date of Birth</span>
          <div class="grid w-full grid-cols-3 gap-2">
            <select
              class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
            >
              <option value="" disabled selected>Month</option>
            </select>
            <select
              class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
            >
              <option value="" disabled selected>Day</option>
            </select>
            <select
              class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
            >
              <option value="" disabled selected>Year</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <label for="placeofbirth" class="text-sm">Place of Birth</label>
        <select
          class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
          id="placeofbirth"
        >
          <option value="" disabled selected>Place of Birth</option>
        </select>
      </div>
      <div>
        <label for="placeofbirth" class="text-sm">Gender</label>
        <div class="grid w-full grid-cols-2 gap-2">
          <button type="button" class="rounded-full border py-2 px-3 text-sm">
            Male
          </button>
          <button type="button" class="rounded-full border py-2 px-3 text-sm">
            Female
          </button>
        </div>
      </div>
      <div>
        <label for="placeofbirth" class="text-sm">Civil Status</label>
        <select
          class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
          id="civilstatus"
        >
          <option value="" disabled selected>Civil Status</option>
        </select>
      </div>
      <div></div>
      <div class="justify-self-end">
        <button
          class="rounded-full bg-lavander-400 py-2 px-8 text-sm text-white hover:bg-lavander-500"
          @click="emit('next', 'AddressContact')"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
