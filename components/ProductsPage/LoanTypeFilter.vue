<script setup>
import { ref, computed } from "vue";
import { useSearchFiltersStore } from "@/store/searchFilters";
import { storeToRefs } from "pinia";
import { Icon } from "#components";

const searchFiltersStore = useSearchFiltersStore();
const { searchFilters } = storeToRefs(searchFiltersStore);

const loanTypeList = ref([
  { name: "All Loans", component: h(Icon, { name: "ic:round-grid-view" }) },
  {
    name: "Business Loans",
    component: h(Icon, { name: "ic:round-business" }),
  },
  { name: "Auto Loans", component: h(Icon, { name: "fa6-solid:car-side" }) },
  {
    name: "Emergency Loans",
    component: h(Icon, { name: "fa6-solid:clock-rotate-left" }),
  },
  {
    name: "Land Loans",
    component: h(Icon, { name: "fa6-solid:location-dot" }),
  },
  {
    name: "Mortage Loans",
    component: h(Icon, { name: "fa6-solid:house-chimney-window" }),
  },
  { name: "Pawnshop Loans", component: h(Icon, { name: "ic:round-watch" }) },
  {
    name: "Personal Loans",
    component: h(Icon, { name: "ic:round-account-circle" }),
  },
  {
    name: "Student Loans",
    component: h(Icon, { name: "fa-solid:graduation-cap" }),
  },
  { name: "Title Loans", component: h(Icon, { name: "fa-solid:clipboard" }) },
]);

const updateLoanType = (loanName) => {
  searchFilters.value.loanType = loanName;
};

const activeLoanType = computed(() => {
  return searchFilters.value.loanType.length
    ? searchFilters.value.loanType
    : "All Loans";
});
</script>

<template>
  <div>
    <div class="pb-10">
      <h2 class="text-2xl font-bold">Loan Types</h2>
    </div>
    <div>
      <ul class="text-sm text-gray-600">
        <li v-for="(loan, id) in loanTypeList" :key="id" class="mb-5">
          <button
            class="flex items-center"
            :class="{
              'font-bold text-lavander-400 hover:text-lavander-500':
                activeLoanType === loan.name,
            }"
            @click="updateLoanType(loan.name)"
          >
            <!-- Icon SVG -->
            <component
              :is="loan.component"
              class="mr-2 inline-block w-4"
            ></component>
            {{ loan.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
