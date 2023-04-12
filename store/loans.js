import { defineStore } from "pinia";
import loansJson from "@/utils/loans.json";

export const useLoansStore = defineStore("loansStore", () => {
  const loans = ref(loansJson);
  const loanDetails = ref({});

  const loanAmountSelected = ref();
  const loanTermSelected = ref();

  function updateLoanDetails(details) {
    loanDetails.value = details;
  }
  function updateLoanAmountSelected(value) {
    loanAmountSelected.value = value;
  }
  function updateLoanTermSelected(value) {
    loanTermSelected.value = value;
  }

  return {
    loans,
    loanDetails,
    loanAmountSelected,
    loanTermSelected,
    updateLoanDetails,
    updateLoanAmountSelected,
    updateLoanTermSelected,
  };
});
