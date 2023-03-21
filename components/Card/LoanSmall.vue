<template>
  <div
    class="w-full bg-gradient-to-r from-lavander-400 to-lavander-500 shadow border-gray-200 border rounded-md p-5 text-white"
  >
    <div
      class="text-center xl:inline-block mr-2 text-gunmetal-400 px-5 text-3xl"
    >
      <slot name="icon"></slot>
    </div>
    <p class="xl:inline-block text-center font-bold mt-2 xl:mt-0">
      <slot name="title"></slot>
    </p>
  </div>
</template>
