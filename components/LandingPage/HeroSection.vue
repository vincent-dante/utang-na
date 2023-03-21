<script setup>
import { formatToCurrencyPhp, formatInputToCurrencyPhp } from "@/utils/format";
import { useSearchFiltersStore } from "@/store/searchFilters";
import { ref, onMounted } from "vue";

const router = useRouter();

const loanAmount = ref(0);
const loanType = ref("");
const loanTerms = ref(0);

const searchFiltersStore = useSearchFiltersStore();
const { updateSearchFilters } = searchFiltersStore;

const onLoanAmountInput = (e) => {
  loanAmount.value = formatInputToCurrencyPhp(e);
};

const onSubmit = () => {
  updateSearchFilters(
    "loanAmount",
    loanAmount.value > 0 ? loanAmount.value : 0
  );
  updateSearchFilters("loanType", loanType.value.length ? loanType.value : "");
  updateSearchFilters("loanTerms", loanTerms.value > 0 ? loanTerms.value : 0);

  router.push({ path: "/products" });
};

onMounted(() => {
  loanAmount.value = formatToCurrencyPhp(loanAmount.value);
});
</script>

<template>
  <div class="lavender-bg-gradient pt-10">
    <div class="mx-auto flex max-w-6xl items-center px-4 pt-10">
      <div class="w-full lg:w-1/2">
        <h1 class="text-4xl font-bold">
          <span class="text-lavander-400">Fast</span> and
          <span class="text-lavander-400">easy</span> loans for <br />
          your financial needs
        </h1>
        <br />
        <p>
          Find and apply for different types of loans online with our <br />
          network of trusted partner lenders in the Philippines.
        </p>
        <br />
        <div
          class="flex w-full flex-wrap items-center rounded-2xl bg-white p-5 shadow-lg shadow-gray-200"
        >
          <div class="w-full p-2 md:w-1/2">
            <p class="pb-2 text-sm">Loan Amount</p>
            <input
              type="text"
              class="w-full rounded-full border border-gray-300 text-gray-600 focus:border-lavander-400 focus:ring-transparent"
              placeholder="How much?"
              @input="onLoanAmountInput"
              @paste="
                (e) => {
                  e.preventDefault();
                }
              "
            />
          </div>
          <div class="w-full p-2 md:w-1/2">
            <p class="pb-2 text-sm">Loan Type</p>
            <div>
              <select
                v-model="loanType"
                class="w-full rounded-full border border-gray-300 text-gray-600 focus:border-lavander-400 focus:ring-transparent"
              >
                <option value="" selected>Choose a loan type</option>
                <option value="Business Loans">Business Loans</option>
                <option value="Auto Loans">Auto Loans</option>
                <option value="Emergency Loans">Emergency Loans</option>
                <option value="Land Loans">Land Loans</option>
                <option value="Mortgage Loans">Mortgage Loans</option>
                <option value="Pawnshop Loans">Pawnshop Loans</option>
                <option value="Personal Loans">Personal Loans</option>
                <option value="Student Loans">Student Loans</option>
                <option value="Title Loans">Title Loans</option>
              </select>
            </div>
          </div>
          <div class="w-full p-2 md:w-1/2">
            <p class="pb-2 text-sm">Terms</p>
            <div>
              <select
                v-model="loanTerms"
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
          <div class="w-full self-end p-2 md:w-1/2">
            <button
              @click="onSubmit"
              class="flex h-11 w-full items-center justify-center rounded-full bg-lavander-400 px-3 py-1 font-medium text-white transition duration-300 hover:bg-lavander-500"
            >
              See available loans
            </button>
          </div>
        </div>
      </div>
      <div class="hidden w-1/2 lg:block">
        <nuxt-img
          src="/img/hero-image.svg"
          format="webp"
          class="float-right w-[90%]"
          alt="Illustration"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  </div>
</template>
