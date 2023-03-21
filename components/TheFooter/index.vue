<template>
  <div>
    <div class="bg-lavander-400 py-20 text-white">
      <div class="mx-auto max-w-6xl px-4">
        <div class="text-left md:text-center">
          <h2 class="pb-5 text-3xl font-bold">
            Grow your finances with UtangNa
          </h2>
          <p class="pb-10">
            Find the right loan for your financial needs today.
          </p>
          <nuxt-link
            to="/products"
            class="block w-28 rounded-full bg-white py-2 px-4 text-center text-sm font-medium text-lavander-400 transition duration-300 hover:bg-slate-100 md:mx-auto"
            >Apply now</nuxt-link
          >
        </div>
      </div>
    </div>
    <div
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-10 text-xs md:h-16 md:py-0"
    >
      <div class="w-full pb-10 md:w-1/2 md:pb-0">
        <div
          class="flex flex-col justify-start gap-10 text-lavander-400 md:flex-row"
        >
          <a href="">Privacy Policy</a>
          <a href="">Terms and Conditions</a>
        </div>
      </div>
      <div class="w-full md:w-1/2 md:text-right">
        <div class="flex flex-col justify-end gap-10 md:flex-row">
          <p>Copyright © {{ new Date().getFullYear() }} UtangNa</p>
        </div>
      </div>
    </div>
  </div>
</template>
