<script setup>
import { shallowRef, watch, onMounted } from "vue";
import PersonalInformation from "@/components/ApplicationForm/PersonalInformation.vue";
import AddressContact from "@/components/ApplicationForm/AddressContact.vue";
import WorkInformation from "@/components/ApplicationForm/WorkInformation.vue";
import { useApplicationFormStore } from "@/store/applicationForm";
import { useLoansStore } from "@/store/loans";
import { storeToRefs } from "pinia";

const router = useRouter();

const applicationFormStore = useApplicationFormStore();
const loansStore = useLoansStore();

const {
  updateIsPersonalInformationPassed,
  updateIsAddressContactPassed,
  updateIsWorkInformationPassed,
  updateActiveApplicationForm,
} = applicationFormStore;
const {
  isPersonalInformationPassed,
  isAddressContactPassed,
  activeApplicationForm,
} = storeToRefs(applicationFormStore);

const { loanAmountSelected, loanTermSelected } = storeToRefs(loansStore);

if (
  loanAmountSelected.value === undefined &&
  loanTermSelected.value === undefined
) {
  router.push({ path: "/products" });
}

const comp = shallowRef();

const updateActiveComp = (name) => {
  if (name === "PersonalInformation") {
    updateIsPersonalInformationPassed(false);
    updateIsAddressContactPassed(false);
    updateIsWorkInformationPassed(false);
  }
  if (name !== activeApplicationForm.value) updateActiveApplicationForm(name);

  const componentName =
    name === "PersonalInformation"
      ? PersonalInformation
      : name === "AddressContact"
      ? AddressContact
      : WorkInformation;

  comp.value = { name: name, component: componentName };
};

watch(
  () => activeApplicationForm.value,
  (newVal, oldVal) => {
    updateActiveComp(newVal);
  }
);

onMounted(() => {
  updateActiveComp(activeApplicationForm.value);
});
</script>

<template>
  <div>
    <div class="mx-auto max-w-6xl px-4 py-10 pb-32">
      <div class="flex flex-wrap gap-5 md:flex-nowrap">
        <div class="w-full md:w-1/3">
          <h2 class="pb-5 text-3xl font-bold">Application Form</h2>
          <div class="flex w-[70%] flex-wrap gap-2 text-left">
            <div
              class="flex w-full items-center justify-between rounded-xl bg-lavander-400 px-5 py-3 text-left text-white"
              :class="{
                '!bg-white !text-gray-600':
                  isPersonalInformationPassed === true,
              }"
            >
              Personal Information
              <span v-if="isPersonalInformationPassed">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-xl text-lavander-400"
                />
              </span>
            </div>
            <div
              class="flex w-full justify-between rounded-xl px-5 py-3 text-left text-gray-600"
              :class="{
                'bg-lavander-400 text-white': comp?.name === 'AddressContact',
              }"
            >
              Address & Contact
              <span v-if="isAddressContactPassed">
                <Icon
                  name="material-symbols:check-circle"
                  class="text-xl text-lavander-400"
                />
              </span>
            </div>
            <div
              class="w-full rounded-xl px-5 py-3 text-left text-gray-600"
              :class="{
                '!bg-lavander-400 text-white ':
                  comp?.name === 'WorkInformation',
              }"
            >
              Work Information
            </div>
          </div>
        </div>
        <div class="w-full md:w-2/3 md:px-5">
          <div class="rounded-xl border bg-white p-5 drop-shadow-xl">
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
