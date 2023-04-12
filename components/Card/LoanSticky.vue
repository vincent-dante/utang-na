<script setup>
import { computed } from "vue";

const props = defineProps({
  lenderName: {
    type: String,
    default: "",
  },
  lenderLogo: {
    type: String,
    default: "",
  },
  loanType: {
    type: String,
    default: "",
  },
  loanAmount: {
    type: String,
    default: "",
  },
  activeLoanTerm: {
    type: Number,
    default: 0,
  },
  approvalDay: {
    type: String,
    default: "",
  },
  interest: {
    type: String,
    default: "",
  },
  processingFee: {
    type: String,
    default: "",
  },
  hideButtonApply: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["apply"]);

const onClickApply = () => {
  emit("apply");
};

const monthlyAmortization = computed(() => {
  const computation =
    props.loanAmount.replace(/[^0-9]+/g, "") / props.activeLoanTerm;
  if (isNaN(computation)) return 0;
  return formatToCurrencyPhp(computation, true);
});

const totalLoan = computed(() =>
  formatToCurrencyPhp(props.loanAmount.replace(/[^0-9]+/g, ""), true)
);
</script>

<template>
  <div class="relative w-full">
    <div class="sticky top-0 py-5">
      <div class="rounded-xl border bg-white p-5 drop-shadow-xl">
        <img
          v-if="lenderLogo"
          :src="'/img/business/' + lenderLogo"
          format="webp"
          class="mx-auto w-32 py-5"
          :alt="lenderName"
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
            >{{ loanType }}</span
          >
        </div>

        <div class="pb-5 text-gray-600">
          <div class="flex flex-wrap justify-between pb-2">
            <span>Total Loan</span>
            <span class="font-bold">{{ totalLoan }}</span>
          </div>
          <div class="flex flex-wrap justify-between pb-2">
            <span>Term</span>
            <span class="font-bold">{{ activeLoanTerm }} Months</span>
          </div>
          <div class="flex flex-wrap justify-between pb-2">
            <span>Approval Time</span>
            <span class="font-bold">{{ approvalDay }} Day</span>
          </div>
          <div class="flex flex-wrap justify-between pb-2">
            <span>Interest Monthly</span>
            <span class="font-bold">{{ interest }}%</span>
          </div>
          <div class="flex flex-wrap justify-between pb-2">
            <span>One-time Processing Fee</span>
            <span class="font-bold">{{ processingFee }}%</span>
          </div>
        </div>
        <button
          v-if="!hideButtonApply"
          @click="onClickApply"
          class="mx-auto block w-full cursor-pointer rounded-full bg-lavander-400 py-2 px-5 text-center text-white transition duration-300 hover:bg-lavander-500"
        >
          Apply for this loan
        </button>
      </div>
    </div>
  </div>
</template>
