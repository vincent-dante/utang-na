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

const showProductCard = ref(false);

const monthlyAmortization = computed(() => {
  const computation =
    props.loanAmount.replace(/[^0-9]+/g, "") / props.activeLoanTerm;
  if (isNaN(computation)) return 0;
  return formatToCurrencyPhp(computation, true);
});
</script>

<template>
  <div class="product-card fixed bottom-0 z-40 w-full lg:hidden">
    <div class="bg-white p-5">
      <div>
        <div
          :class="{
            'pb-5': !hideButtonApply,
          }"
        >
          <div class="flex w-full justify-between">
            <div>
              <span v-if="!showProductCard" class="block text-sm"
                >Amortization</span
              >
              <div v-else>
                <img
                  v-if="lenderLogo"
                  :src="'/img/business/' + lenderLogo"
                  format="webp"
                  class="mx-auto w-32 py-5"
                  :alt="lenderName"
                />
              </div>
            </div>

            <button type="button" @click="showProductCard = !showProductCard">
              <template v-if="!showProductCard">
                <Icon name="fe:arrow-up" class="text-xl" />
              </template>
              <template v-else>
                <Icon name="fe:arrow-down" class="text-xl" />
              </template>
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
              >{{ loanType }}</span
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

<style scoped>
.product-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px -3px 8px;
}
</style>
