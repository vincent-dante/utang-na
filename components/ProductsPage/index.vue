<script setup>
import { computed } from "vue";
import { useSearchFiltersStore } from "@/store/searchFilters";
import { useLoansStore } from "@/store/loans";
import { storeToRefs } from "pinia";

const searchFiltersStore = useSearchFiltersStore();
const loanStore = useLoansStore();
const { searchFilters } = storeToRefs(searchFiltersStore);
const { loans } = storeToRefs(loanStore);

const filterLoans = computed(() => {
  let loansData = loans.value;
  const search = searchFilters.value;

  if (search.loanAmount > 0) {
    loansData = loansData.filter(
      (loan) =>
        search.loanAmount >= loan.min_amt && search.loanAmount <= loan.max_amt
    );
  }
  if (search.loanTerms > 0) {
    loansData = loansData.filter((loan) =>
      loan.loan_terms.includes(parseInt(search.loanTerms))
    );
  }
  if (search.loanType.length && search.loanType !== "All Loans") {
    loansData = loansData.filter((loan) => loan.loan_type === search.loanType);
  }
  if (search.lender.length) {
    loansData = loansData.filter((loan) => loan.lender === search.lender);
  }
  if (search.interest > 0) {
    loansData = loansData.filter((loan) => loan.interest <= search.interest);
  }
  if (search.sort.length) {
    switch (search.sort) {
      case "highest":
        loansData = loansData.sort((a, b) => b.max_amt - a.max_amt);
        break;
      case "lowest":
        loansData = loansData.sort((a, b) => a.max_amt - b.max_amt);
        break;
      case "asc":
        loansData.sort((a, b) => {
          if (a.lender < b.lender) {
            return -1;
          }
          if (a.lender > b.lender) {
            return 1;
          }
          return 0;
        });
        break;
    }
  }
  return loansData;
});
</script>

<template>
  <div class="lavender-bg-gradient">
    <div class="mx-auto max-w-6xl px-4 py-10 pb-32">
      <!-- Product Filter Section -->
      <products-page-loan-top-filter />

      <div class="flex w-full flex-wrap pt-10">
        <!-- Product Type Filter -->
        <div class="mb-10 hidden w-full md:block md:w-1/4">
          <products-page-loan-type-filter />
        </div>

        <!-- Product Section -->
        <div class="w-full md:w-3/4">
          <div
            class="mb-10 flex w-full flex-wrap items-center justify-between md:flex-nowrap"
          >
            <h2 class="pb-5 text-2xl font-bold">Loan Products</h2>
            <div class="w-full md:w-72">
              <products-page-loan-sort />
            </div>
          </div>

          <!-- Cards -->
          <template v-if="filterLoans.length">
            <div
              class="grid w-full grid-cols-1 gap-5 pb-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              <card-loan-product
                v-for="(loan, index) in filterLoans"
                :key="index"
                :product="loan"
              ></card-loan-product>
            </div>
          </template>
          <template v-else>
            <div
              class="flex flex-wrap pb-14 text-center leading-loose text-gray-600"
            >
              <p class="w-full font-bold">
                <span class="text-5xl">Sorry.</span>
                <span class="block text-xl"
                  >There are no available loan offers for your request</span
                >
              </p>
              <p class="w-full pb-5 text-sm">
                Try changing your filter parameters, or you might want to check
                out other offers below.
              </p>
              <div class="w-full">
                <nuxt-img
                  src="/img/no-record.svg"
                  format="webp"
                  class="mx-auto w-[30%]"
                  alt="Illustration"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
