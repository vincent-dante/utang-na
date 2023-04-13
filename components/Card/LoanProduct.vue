<script setup>
import { computed } from "vue";

const props = defineProps({
  product: { type: [Object], required: true },
});

const termRange = computed(() => {
  return `Up to ${Math.max.apply(Math, props.product.loan_terms)} months`;
});
</script>

<template>
  <div
    class="flex w-full flex-wrap overflow-hidden rounded-2xl border bg-white p-5 drop-shadow-sm"
  >
    <div class="flex w-full flex-wrap items-center justify-between pb-5">
      <nuxt-img
        :src="'/img/business/' + product.lender_logo"
        format="webp"
        class="w-24"
        :alt="product.lender"
      />
      <span class="text-xs font-bold text-lavander-400">Term Loan</span>
    </div>

    <p class="w-full truncate pb-3 text-sm font-bold">
      {{ product.lender }}
    </p>
    <p class="w-full pb-3 text-xs text-gray-600">Credit limit</p>

    <p class="w-full overflow-hidden text-3xl font-bold">
      {{ formatToCurrencyPhp(product.min_amt) }} to
      {{ formatToCurrencyPhp(product.max_amt) }}
    </p>
    <p class="my-3 w-full font-bold">{{ termRange }}</p>

    <p class="my-3 w-full text-sm text-gray-600">
      You may select the amount and term fit to your financial needs.
    </p>
    <div class="w-full">
      <div
        class="mb-3 flex w-fit items-center justify-center rounded-full border border-lavander-400 px-2 py-1 text-xs text-lavander-400"
      >
        {{ product.loan_type }}
      </div>
    </div>

    <button
      class="block w-full rounded-full bg-lavander-400 py-2 text-center text-white transition duration-300 hover:bg-lavander-500"
      @click="$router.push(`/products/${product.id}`)"
    >
      Apply
    </button>
  </div>
</template>
