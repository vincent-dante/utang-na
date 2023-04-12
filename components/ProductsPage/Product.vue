<script setup>
import { computed, watch } from "vue";
import { useSearchFiltersStore } from "@/store/searchFilters";
import { useLoansStore } from "@/store/loans";
import { storeToRefs } from "pinia";

const searchFiltersStore = useSearchFiltersStore();
const loanStore = useLoansStore();
const { searchFilters } = storeToRefs(searchFiltersStore);
const { loans } = storeToRefs(loanStore);

const pagination = ref({
  pageTotalCount: 0,
  pageCount: 0,
  pageRange: 8,
  pageCurrent: 1,
});

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

  const start =
    (pagination.value.pageCurrent - 1) * parseInt(pagination.value.pageRange);
  const end = start + parseInt(pagination.value.pageRange);
  pagination.value.pageCount = Math.ceil(
    loansData.length / pagination.value.pageRange
  );

  pagination.value.pageTotalCount = loansData.length;

  return loansData.slice(start, end);
});

const paginationChange = (val) => {
  pagination.value.pageCurrent = val;
};

watch(
  [
    () => searchFilters.value.loanAmount,
    () => searchFilters.value.loanTerms,
    () => searchFilters.value.loanType,
    () => searchFilters.value.interest,
  ],
  () => {
    pagination.value.pageCurrent = 1;
  }
);
</script>

<template>
  <section>
    <template v-if="filterLoans.length">
      <div
        class="grid w-full grid-cols-1 gap-5 pb-14 sm:grid-cols-2 lg:grid-cols-4"
      >
        <card-loan-product
          v-for="(loan, index) in filterLoans"
          :key="index"
          :product="loan"
        ></card-loan-product>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-wrap pb-14 text-center leading-loose text-gray-600">
        <p class="w-full font-bold">
          <span class="text-5xl">Sorry.</span>
          <span class="block text-xl"
            >There are no available loan offers for your request</span
          >
        </p>
        <p class="w-full pb-5 text-sm">
          Try changing your filter parameters, or you might want to check out
          other offers below.
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
    <div class="flex flex-wrap gap-5 md:justify-between">
      <div
        class="flex w-full items-center justify-center gap-2 text-sm md:w-auto"
      >
        <span>1 to</span>
        <select
          v-model="pagination.pageRange"
          @change="pagination.pageCurrent = 1"
          class="rounded-lg border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent"
        >
          <option value="2">2</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
        <span>of {{ pagination.pageTotalCount }}</span>
      </div>
      <!-- Pagination -->
      <pagination-default
        :page-count="pagination.pageCount"
        :page-range="pagination.pageRange"
        :page-current="pagination.pageCurrent"
        @click-handler="paginationChange"
      />
    </div>
  </section>
</template>
