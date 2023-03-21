import { defineStore } from "pinia";
import loansJson from "@/utils/loans.json";

export const useLoansStore = defineStore("loansStore", () => {
  const loans = ref(loansJson);
  const loanDetails = ref({});

  function updateLoanDetails(details) {
    loanDetails.value = details;
  }
  return { loans, loanDetails, updateLoanDetails };
});
