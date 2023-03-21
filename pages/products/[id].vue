<script setup>
import { ref, onMounted } from "vue";
import { useLoansStore } from "@/store/loans";
import { storeToRefs } from "pinia";

const loanStore = useLoansStore();
const { loans } = storeToRefs(loanStore);
const loan = ref({});
const route = useRoute();

const loanName = computed(() => {
  return `UtangNa - ` + loan?.value?.lender;
});

onMounted(() => {
  loan.value = loans.value.find((loan) => loan.id === route.params.id);
});

useSeoMeta({
  title: loanName,
  description: "UtangNa get your loans in the Philippines",
});
</script>

<template>
  <products-page-details />
</template>
