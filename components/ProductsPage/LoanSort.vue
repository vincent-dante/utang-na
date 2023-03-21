<script setup>
import { useSearchFiltersStore } from "@/store/searchFilters";
import { storeToRefs } from "pinia";

const searchFiltersStore = useSearchFiltersStore();
const { searchFilters } = storeToRefs(searchFiltersStore);
</script>

<template>
  <select
    v-model="searchFilters.sort"
    class="w-full rounded-full border border-gray-300 text-gray-600 focus:border-lavander-400 focus:ring-transparent"
  >
    <option value="highest" selected>Highest Loan</option>
    <option value="lowest">Lowest Loan</option>
    <option value="asc">A-Z</option>
  </select>
</template>
