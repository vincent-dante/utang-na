<script setup>
import { useSearchFiltersStore } from "@/store/searchFilters";
import { storeToRefs } from "pinia";

const searchFiltersStore = useSearchFiltersStore();
const { searchFilters } = storeToRefs(searchFiltersStore);
</script>

<template>
  <section class="flex w-full flex-wrap pt-10">
    <div class="full w-full">
      <div
        class="mb-10 flex w-full flex-wrap items-center justify-between gap-5 md:flex-nowrap"
      >
        <h2 class="text-2xl font-bold text-lavander-500">Loan Products</h2>
        <div class="w-full md:w-52">
          <select
            v-model="searchFilters.sort"
            class="w-full rounded-full border border-gray-300 text-gray-600 focus:border-lavander-400 focus:ring-transparent"
          >
            <option value="highest" selected>Highest Loan</option>
            <option value="lowest">Lowest Loan</option>
            <option value="asc">A-Z</option>
          </select>
        </div>
      </div>
    </div>
  </section>
</template>
