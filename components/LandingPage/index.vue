<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const elementsToLeft = document.querySelectorAll(".hidden-element-from-left");
  const elementsToTop = document.querySelectorAll(".hidden-element-from-top");
  animateElementsOnView(elementsToLeft, "show-element-from-left");
  animateElementsOnView(elementsToTop, "show-element-from-top");
});
</script>

<template>
  <main>
    <LandingPageHeroSection />
    <lazy-landing-page-loan-types></lazy-landing-page-loan-types>
    <lazy-landing-page-featured-loan></lazy-landing-page-featured-loan>
    <lazy-application-step></lazy-application-step>
  </main>
</template>
