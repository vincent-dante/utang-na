<script setup>
import { ref, computed } from "vue";
import { useSearchFiltersStore } from "@/store/searchFilters";
import { storeToRefs } from "pinia";

const searchFiltersStore = useSearchFiltersStore();
const { searchFilters } = storeToRefs(searchFiltersStore);

const loanTypeList = ref([
  { name: "All Loans" },
  {
    name: "Business Loans",
  },
  { name: "Auto Loans" },
  {
    name: "Emergency Loans",
  },
  {
    name: "Land Loans",
  },
  {
    name: "Mortage Loans",
  },
  {
    name: "Personal Loans",
  },
  {
    name: "Student Loans",
  },
  { name: "Title Loans" },
]);

const onLoanAmountInput = (e) => {
  searchFilters.value.loanAmount = formatInputToCurrencyPhp(e);
};

const loanAmountComputed = computed(() => {
  return formatToCurrencyPhp(searchFilters.value.loanAmount);
});
</script>

<template>
  <section
    class="grid w-full grid-cols-1 items-center gap-2 rounded-2xl border bg-white p-5 drop-shadow-md md:grid-cols-4"
  >
    <div class="w-full">
      <p class="pb-2 text-xs text-gray-600">Loan Amount</p>
      <input
        type="text"
        class="w-full rounded-full border border-gray-300 text-gray-600 placeholder:text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        placeholder="How much?"
        :value="loanAmountComputed"
        @input="onLoanAmountInput"
        @paste="
          (e) => {
            e.preventDefault();
          }
        "
      />
    </div>
    <div class="w-full">
      <p class="pb-2 text-xs text-gray-600">Terms</p>
      <div>
        <select
          v-model="searchFilters.loanTerms"
          class="w-full rounded-full border border-gray-300 text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        >
          <option value="0" selected>Choose a term</option>
          <option value="3">3 months</option>
          <option value="6">6 months</option>
          <option value="9">9 months</option>
          <option value="12">12 months</option>
        </select>
      </div>
    </div>
    <div class="w-full">
      <p class="pb-2 text-xs text-gray-600">Loan Type</p>
      <div>
        <select
          v-model="searchFilters.loanType"
          class="w-full rounded-full border border-gray-300 text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        >
          <option value="" selected>Choose a Loan Type</option>
          <option v-for="loanType in loanTypeList" :value="loanType.name">
            {{ loanType.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="w-full border-gray-500">
      <p class="pb-2 text-xs text-gray-600">Interest</p>
      <div>
        <select
          v-model="searchFilters.interest"
          class="w-full rounded-full border border-gray-300 text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        >
          <option value="0" selected>Choose a Interest</option>
          <option value="2">2% and below</option>
          <option value="3">3% and below</option>
          <option value="2.5">2.5% and below</option>
          <option value="3.5">3.5% and below</option>
        </select>
      </div>
    </div>
  </section>
</template>
