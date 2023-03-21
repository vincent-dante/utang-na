<script setup>
import { ref, computed, onMounted } from "vue";
import { formatToCurrencyPhp } from "@/utils/format";
import { useLoansStore } from "@/store/loans";
import { useModalsStore } from "@/store/modals";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const loanStore = useLoansStore();
const { updateLoanDetails } = loanStore;
const { loans } = storeToRefs(loanStore);
const { loanDetails } = storeToRefs(loanStore);

const modalsStore = useModalsStore();
const { updateNotification } = modalsStore;

const showProductCard = ref(false);
const slider = ref({
  slider: 0,
  sliderMin: 0,
  sliderMax: 0,
});
const activeLoanTerm = ref(0);

const updateslider = (val) => {
  slider.value.slider = val;
};

const updateActiveLoanTerm = (term) => {
  activeLoanTerm.value = term;
};

const goToApplicationForm = () => {
  if (slider.value.slider < slider.value.sliderMin) {
    updateNotification(true);
    return;
  }
  router.push("/application-form");
};

const monthlyAmortization = computed(() => {
  const computation = slider.value.slider / activeLoanTerm.value;
  if (isNaN(computation)) return 0;
  return formatToCurrencyPhp(computation, true);
});

const loanAmount = computed(() => {
  return formatToCurrencyPhp(slider.value.slider, true);
});

onMounted(() => {
  const details = loans.value.find((loan) => loan.id === route.params.id);
  activeLoanTerm.value = Math.min(...details.loan_terms);

  slider.value = {
    slider: details.min_amt,
    sliderMin: details.min_amt,
    sliderMax: details.max_amt,
  };

  updateLoanDetails(details);
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="lavender-bg-gradient">
      <div class="mx-auto max-w-6xl px-4">
        <div class="flex py-10">
          <!-- Left Side -->
          <div class="w-full md:w-1/2 xl:w-2/3">
            <!-- RangeSlider Section -->
            <p class="text-sm text-gray-600">Loan amount</p>
            <range-slider
              :slider="slider.slider"
              :slider-min="slider.sliderMin"
              :slider-max="slider.sliderMax"
              :slider-footer="true"
              @update-slider="updateslider"
            >
              <p class="mb-2 text-sm text-gray-600">Loan amount</p>
            </range-slider>

            <div class="flex flex-row justify-between pb-8 text-gray-600">
              <span>{{ formatToCurrencyPhp(loanDetails.min_amt) }}</span>
              <span>{{ formatToCurrencyPhp(loanDetails.max_amt) }}</span>
            </div>

            <p class="pb-2 text-sm text-gray-600">Loan Term</p>
            <div class="flex flex-wrap gap-2 text-sm text-gray-600">
              <button
                v-for="(term, index) in loanDetails.loan_terms"
                :key="index"
                :value="term"
                class="rounded-full border border-lavander-400 bg-white px-3 py-2 pb-2 transition ease-in"
                :class="{
                  '!bg-lavander-400 text-white hover:!bg-lavander-500':
                    activeLoanTerm == term,
                }"
                @click="updateActiveLoanTerm(term)"
              >
                {{ term }} months
              </button>
            </div>

            <!-- Requirements Seciton -->
            <div class="w-full pt-10 text-sm leading-loose text-gray-600">
              <div class="pb-5">
                <p class="pb-3 font-bold">Requirements</p>
                <p v-for="req in loanDetails?.terms?.requirements">
                  {{ req }}
                </p>
              </div>
              <div
                class="pb-5"
                v-if="loanDetails?.terms?.other_requirements?.length"
              >
                <p class="font-bold">Documents</p>
                <div v-if="loanDetails.terms.other_requirements">
                  <div v-for="req in loanDetails.terms.other_requirements">
                    <p class="pt-5 pb-3 font-bold">
                      {{ req.title }}
                    </p>
                    <p v-for="document in req.documents" class="pb-1">
                      {{ document }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Right Side -->
          <div class="relative hidden md:block md:w-1/2 md:pl-5 xl:w-1/3">
            <div class="sticky top-0 py-5">
              <div class="rounded-xl border border-gray-300 bg-white p-5">
                <img
                  v-if="loanDetails.lender_logo"
                  :src="'/img/business/' + loanDetails.lender_logo"
                  format="webp"
                  class="mx-auto w-32 py-5"
                  :alt="loanDetails.lender"
                />
                <p class="pb-5 text-center text-xl font-bold text-lavander-400">
                  <span class="text-3xl">{{ monthlyAmortization }}</span
                  >/month
                </p>
                <p class="pb-5 text-center text-base text-gray-600">
                  This will be the estimated monthly amortization
                  <span class="text-rose-500">excluding fees and charges</span>
                </p>
                <div class="flex justify-center pb-3">
                  <span
                    class="inline-block rounded-full border border-lavander-400 px-2 py-1 text-xs text-lavander-400"
                    >{{ loanDetails.loan_type }}</span
                  >
                </div>

                <div class="pb-5 text-gray-600">
                  <div class="flex flex-wrap justify-between pb-2">
                    <span>Total Loan</span>
                    <span class="font-bold">{{ loanAmount }}</span>
                  </div>
                  <div class="flex flex-wrap justify-between pb-2">
                    <span>Term</span>
                    <span class="font-bold">{{ activeLoanTerm }} Months</span>
                  </div>
                  <div class="flex flex-wrap justify-between pb-2">
                    <span>Approval Time</span>
                    <span class="font-bold"
                      >{{ loanDetails.approval_day }} Day</span
                    >
                  </div>
                  <div class="flex flex-wrap justify-between pb-2">
                    <span>Interest Monthly</span>
                    <span class="font-bold">{{ loanDetails.interest }}%</span>
                  </div>
                  <div class="flex flex-wrap justify-between pb-2">
                    <span>One-time Processing Fee</span>
                    <span class="font-bold"
                      >{{ loanDetails.processing_fee }}%</span
                    >
                  </div>
                </div>
                <button
                  @click="goToApplicationForm"
                  class="mx-auto block w-full cursor-pointer rounded-full bg-lavander-400 py-2 px-5 text-center text-white transition duration-300 hover:bg-lavander-500"
                >
                  Apply for this loan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Modal -->
    <modals-notification />

    <!-- Mobile Product Card -->
    <Teleport to="body">
      <div class="product-card fixed bottom-0 z-40 w-full md:hidden">
        <div class="bg-white p-5">
          <div>
            <div class="pb-5">
              <div class="flex w-full justify-between">
                <div>
                  <span v-if="!showProductCard" class="block text-sm"
                    >Amortization</span
                  >
                  <div v-else>
                    <img
                      v-if="loanDetails.lender_logo"
                      :src="'/img/business/' + loanDetails.lender_logo"
                      format="webp"
                      class="mx-auto w-32 py-5"
                      :alt="loanDetails.lender"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  @click="showProductCard = !showProductCard"
                >
                  <Icon name="fe:arrow-up" class="text-xl" />
                </button>
              </div>

              <p v-if="!showProductCard" class="text-lg font-bold">
                {{ monthlyAmortization }}<span class="text-sm">/month</span>
              </p>
            </div>

            <div v-if="showProductCard">
              <p class="pb-5 text-center text-xl font-bold text-lavander-400">
                <span class="text-3xl">{{ monthlyAmortization }}</span
                >/month
              </p>
              <p class="pb-5 text-center text-base text-gray-600">
                This will be the estimated monthly amortization
                <span class="text-rose-500">excluding fees and charges</span>
              </p>
              <div class="flex justify-center pb-3">
                <span
                  class="inline-block rounded-full border border-lavander-400 px-2 py-1 text-xs text-lavander-400"
                  >{{ loanDetails.loan_type }}</span
                >
              </div>
              <div class="pb-5 text-gray-600">
                <div class="flex flex-wrap justify-between pb-2">
                  <span>Total Loan</span>
                  <span class="font-bold">{{ loanAmount }}</span>
                </div>
                <div class="flex flex-wrap justify-between pb-2">
                  <span>Term</span>
                  <span class="font-bold">{{ activeLoanTerm }} Months</span>
                </div>
                <div class="flex flex-wrap justify-between pb-2">
                  <span>Approval Time</span>
                  <span class="font-bold"
                    >{{ loanDetails.approval_day }} Day</span
                  >
                </div>
                <div class="flex flex-wrap justify-between pb-2">
                  <span>Interest Monthly</span>
                  <span class="font-bold">{{ loanDetails.interest }}%</span>
                </div>
                <div class="flex flex-wrap justify-between pb-2">
                  <span>One-time Processing Fee</span>
                  <span class="font-bold"
                    >{{ loanDetails.processing_fee }}%</span
                  >
                </div>
              </div>
            </div>

            <button
              @click="goToApplicationForm"
              class="mx-auto block w-full cursor-pointer rounded-full bg-lavander-400 py-2 px-5 text-center text-white transition duration-300 hover:bg-lavander-500"
            >
              Apply for this loan
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.product-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px -3px 8px;
}
</style>
