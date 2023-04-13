<script setup>
const props = defineProps({
  loans: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <div class="overflow-hidden py-2">
    <div class="md:hidden">
      <Swiper :slides-per-view="1.2" :space-between="5">
        <SwiperSlide
          v-for="(loan, index) in loans"
          :key="index"
          class="items-stretch px-1"
        >
          <card-loan-product
            :product="loan"
            class="my-2 h-[450px]"
          ></card-loan-product>
        </SwiperSlide>
      </Swiper>
    </div>
    <div
      class="hidden w-full grid-cols-2 gap-5 md:grid md:grid-cols-3 xl:grid-cols-4"
    >
      <card-loan-product
        v-for="(loan, index) in loans"
        :key="index"
        :product="loan"
        class="hidden-element-from-top card"
      ></card-loan-product>
    </div>
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
