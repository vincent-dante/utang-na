<script setup>
import { useLoansStore } from "@/store/loans";
import { storeToRefs } from "pinia";

const loanStore = useLoansStore();
const { loans } = storeToRefs(loanStore);
</script>

<template>
  <div class="bg-slate-100">
    <section class="mx-auto max-w-6xl py-20 px-4 md:py-36">
      <article>
        <h2
          class="hidden-element-from-left pb-5 text-center text-xl font-bold text-lavander-400"
        >
          FEATURED LOAN PRODUCTS
        </h2>
        <h3
          class="hidden-element-from-left pb-20 text-center text-4xl font-bold"
        >
          Loan that fits in your needs
        </h3>
      </article>
      <card-loan-slide :loans="loans.slice(0, 8)" />
      <div class="pt-20 text-center">
        <nuxt-link
          to="/products"
          class="mx-auto flex w-fit items-center gap-2 font-bold text-lavander-400"
          >View other loan products
          <Icon name="mdi:arrow-right" class="text-lg" />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
h3 {
  transition-delay: 300ms;
}
.card:nth-child(1) {
  transition-delay: 100ms;
}
.card:nth-child(2) {
  transition-delay: 200ms;
}
.card:nth-child(3) {
  transition-delay: 300ms;
}
.card:nth-child(4) {
  transition-delay: 400ms;
}
.card:nth-child(5) {
  transition-delay: 100ms;
}
.card:nth-child(6) {
  transition-delay: 200ms;
}
.card:nth-child(7) {
  transition-delay: 300ms;
}
.card:nth-child(8) {
  transition-delay: 400ms;
}
</style>
