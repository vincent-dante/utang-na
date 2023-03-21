<template>
  <header>
    <nav class="navtop-bg">
      <div class="mx-auto max-w-6xl px-4">
        <div class="flex items-center justify-between">
          <h1>
            <nuxt-link to="/" class="flex py-4"
              ><span class="text-lg text-gray-600">
                <nuxt-img
                  src="/img/utangna.png"
                  format="webp"
                  class="h-auto w-40"
                  alt="person"
                /> </span
            ></nuxt-link>
          </h1>
          <div class="space-x-5 py-4 md:flex">
            <nuxt-link
              to="/products"
              class="rounded-full bg-lavander-400 py-2 px-5 font-medium text-white transition duration-300 hover:bg-lavander-500"
              >Apply now</nuxt-link
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navtop-bg {
  background-color: #e4e2f3;
}
</style>
