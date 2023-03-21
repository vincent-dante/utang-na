<script setup>
import { ref, computed, onMounted } from "vue";
import PersonalInformation from "@/components/ApplicationForm/PersonalInformation.vue";
import AddressContact from "@/components/ApplicationForm/AddressContact.vue";
import WorkInformation from "@/components/ApplicationForm/WorkInformation.vue";

const comp = ref();

const updateActiveComp = (name) => {
  const componentName =
    name === "PersonalInformation"
      ? PersonalInformation
      : name === "AddressContact"
      ? AddressContact
      : WorkInformation;

  comp.value = { name: name, component: componentName };
};

onMounted(() => {
  updateActiveComp("PersonalInformation", PersonalInformation);
});
</script>

<template>
  <div class="lavender-bg-gradient">
    <div class="mx-auto max-w-6xl px-4 py-10 pb-32">
      <div class="flex flex-wrap gap-5 md:flex-nowrap">
        <div class="w-full md:w-1/3">
          <h2 class="pb-5 text-3xl font-bold">Application Form</h2>
          <div class="flex w-[70%] flex-wrap gap-2 text-left">
            <button
              @click="updateActiveComp('PersonalInformation')"
              class="w-full rounded-xl px-5 py-3 text-left text-gray-600"
              :class="{
                '!bg-lavander-400 text-white hover:!bg-lavander-500':
                  comp?.name === 'PersonalInformation',
              }"
              type="button"
            >
              Personal Information
            </button>
            <button
              @click="updateActiveComp('AddressContact')"
              class="w-full rounded-xl px-5 py-3 text-left text-gray-600"
              :class="{
                'bg-lavander-400 text-white hover:bg-lavander-500':
                  comp?.name === 'AddressContact',
              }"
              type="button"
            >
              Address & Contact
            </button>
            <button
              class="w-full rounded-xl px-5 py-3 text-left text-gray-600"
              type="button"
              @click="updateActiveComp('WorkInformation')"
              :class="{
                '!bg-lavander-400 text-white hover:!bg-lavander-500':
                  comp?.name === 'WorkInformation',
              }"
            >
              Work Information
            </button>
          </div>
        </div>
        <div class="w-full md:w-2/3 md:px-5">
          <div class="rounded-xl bg-white p-5 shadow">
            <component
              :is="comp?.component"
              @prev="updateActiveComp"
              @next="updateActiveComp"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
