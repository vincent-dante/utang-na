<script setup>
import { ref } from "vue";
import { Icon } from "#components";

const loanTypeList = ref([
  {
    name: "Business Loans",
    component: h(Icon, { name: "ic:round-business" }),
  },
  { name: "Auto Loans", component: h(Icon, { name: "fa6-solid:car-side" }) },
  {
    name: "Emergency Loans",
    component: h(Icon, { name: "fa6-solid:clock-rotate-left" }),
  },
  {
    name: "Land Loans",
    component: h(Icon, { name: "fa6-solid:location-dot" }),
  },
  {
    name: "Mortage Loans",
    component: h(Icon, { name: "fa6-solid:house-chimney-window" }),
  },
  {
    name: "Personal Loans",
    component: h(Icon, { name: "ic:round-account-circle" }),
  },
  {
    name: "Student Loans",
    component: h(Icon, { name: "fa-solid:graduation-cap" }),
  },
  { name: "Title Loans", component: h(Icon, { name: "fa-solid:clipboard" }) },
]);
</script>

<template>
  <section class="mx-auto max-w-6xl overflow-hidden py-20 px-4 md:py-36">
    <article>
      <h2
        class="hidden-element-from-left pb-5 text-center text-xl font-bold text-lavander-400"
      >
        LOAN TYPES
      </h2>
      <h3 class="hidden-element-from-left pb-20 text-center text-4xl font-bold">
        We offer different types of loans for you
      </h3>
    </article>
    <div
      class="hidden-element-from-top grid w-full grid-cols-2 gap-5 md:grid-cols-4"
    >
      <div
        v-for="(loan, id) in loanTypeList"
        :key="id"
        class="flex items-center overflow-hidden rounded-xl border p-2 text-gray-500"
      >
        <div
          class="flex items-center justify-center rounded-full p-2 text-3xl text-lavander-400"
        >
          <component :is="loan.component"></component>
        </div>
        <div class="flex h-full items-center">
          {{ loan.name }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  transition-delay: 300ms;
}
</style>
