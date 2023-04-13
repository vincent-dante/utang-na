<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { formatToCurrencyPhp } from "@/utils/format";
import { useLoansStore } from "@/store/loans";
import { useModalsStore } from "@/store/modals";
import { storeToRefs } from "pinia";
import { useApplicationFormStore } from "@/store/applicationForm";

const route = useRoute();
const router = useRouter();

const applicationFormStore = useApplicationFormStore();
const { resetApplicationForm } = applicationFormStore;

const loanStore = useLoansStore();
const { updateLoanDetails, updateLoanTermSelected, updateLoanAmountSelected } =
  loanStore;
const { loans } = storeToRefs(loanStore);
const { loanDetails } = storeToRefs(loanStore);

const modalsStore = useModalsStore();
const { updateNotification } = modalsStore;

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
  resetApplicationForm();
  router.push("/application-form");
};

const otherLoans = computed(() => {
  return loans.value
    .filter((item) => item.id !== loanDetails.value.id)
    .slice(0, 4);
});

watch(
  () => slider.value.slider,
  (newValue, oldValue) => {
    updateLoanAmountSelected(formatToCurrencyPhp(newValue));
  }
);

watch(activeLoanTerm, (newValue, oldValue) => {
  updateLoanTermSelected(newValue);
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

  const elementsToTop = document.querySelectorAll(".hidden-element-from-top");
  animateElementsOnView(elementsToTop, "show-element-from-top");
});
</script>

<template>
  <div>
    <div class="mx-auto flex max-w-6xl gap-5 py-10 px-4">
      <!-- Left Side -->
      <div class="w-full py-5 xl:w-2/3">
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
      <card-loan-sticky
        class="hidden lg:block lg:w-1/2 xl:w-1/3"
        :loan-type="loanDetails.loan_type"
        :lender-logo="loanDetails.lender_logo"
        :loan-amount="slider.slider.toString()"
        :active-loan-term="activeLoanTerm"
        :interest="loanDetails.interest?.toString()"
        :approval-day="loanDetails.approval_day?.toString()"
        :processing-fee="loanDetails.processing_fee?.toString()"
        @apply="goToApplicationForm"
      />
    </div>

    <div class="mx-auto max-w-6xl py-10 px-4">
      <h2 class="pb-5 text-2xl font-bold">Other loan products you may like</h2>
      <div class="flex gap-5 pb-5">
        <card-loan-slide :loans="otherLoans" />
      </div>
    </div>

    <!-- Mobile Product Card -->
    <Teleport to="body">
      <card-loan-mobile
        :loan-type="loanDetails.loan_type"
        :lender-logo="loanDetails.lender_logo"
        :loan-amount="slider.slider.toString()"
        :active-loan-term="activeLoanTerm"
        :interest="loanDetails.interest?.toString()"
        :approval-day="loanDetails.approval_day?.toString()"
        :processing-fee="loanDetails.processing_fee?.toString()"
        @apply="goToApplicationForm"
      />
    </Teleport>

    <!-- Notification Modal -->
    <modals-notification />
  </div>
</template>
