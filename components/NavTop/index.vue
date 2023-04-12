<template>
  <header>
    <nav class="py-5">
      <div class="mx-auto max-w-6xl px-4 xl:px-0">
        <div class="flex items-center justify-between">
          <h1>
            <nuxt-link to="/" class="flex py-4"
              ><span class="text-gray-600">
                <nuxt-img
                  src="/img/utangna.png"
                  format="webp"
                  class="h-auto w-52"
                  alt="utangna"
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
