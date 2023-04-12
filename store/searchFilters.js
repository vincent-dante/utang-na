import { defineStore } from "pinia";

export const useSearchFiltersStore = defineStore("searchFilterStore", () => {
  const searchFilters = ref({
    loanAmount: 0,
    loanType: "",
    loanTerms: 0,
    interest: 0,
    sort: "highest",
  });

  function updateSearchFilters(filterType, value) {
    searchFilters.value[filterType] = value;
  }

  return { searchFilters, updateSearchFilters };
});
