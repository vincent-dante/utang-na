<template>
  <div>
    <!--     <div class="py-20">
      <div class="mx-auto max-w-6xl rounded-xl bg-lavander-400 p-10 text-white">
        <div class="text-left">
          <h2 class="pb-5 text-3xl font-bold">Grow your finances</h2>
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
    </div> -->

    <div class="mx-auto bg-slate-100 px-4 pt-10 text-sm text-gray-500">
      <div class="mx-auto flex max-w-6xl justify-between py-10">
        <!--         <nuxt-img
          src="/img/utangna.png"
          format="webp"
          class="h-auto w-40"
          alt="utangna"
        /> -->
        <div>
          <h3 class="pb-5 text-3xl font-bold">
            Grow your finances with UtangNa
          </h3>
          <h4 class="pb-10 text-lg">
            Find the right loan for your financial needs today.
          </h4>
          <nuxt-link
            to="/products"
            class="rounded-full bg-lavander-400 py-3 px-5 font-medium text-white transition duration-300 hover:bg-lavander-500"
            >Apply now</nuxt-link
          >
        </div>
      </div>
      <div
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 border-t-[1px] border-gray-200 py-10 text-sm"
      >
        <div>© {{ new Date().getFullYear() }} UtangNa</div>
        <div
          class="flex w-full flex-col justify-end gap-5 pb-10 md:w-1/2 md:flex-row md:pb-0"
        >
          <a href="" class="hover:text-gray-600">Privacy Policy</a>
          <a href="" class="hover:text-gray-600">Terms and Conditions</a>
        </div>
      </div>
    </div>
  </div>
</template>
