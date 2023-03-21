<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-32">
    <div class="text-center font-bold md:pb-20">
      <h2 class="pb-5 text-2xl text-lavander-400">
        Fast and easy application!
      </h2>
    </div>
    <div class="relative mx-auto flex w-full md:flex-col">
      <div
        class="grid w-1/6 grid-rows-3 content-end items-end py-10 md:w-full md:grid-cols-3 md:grid-rows-1 md:justify-center"
      >
        <div class="relative flex h-full items-end md:w-full md:justify-center">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-lavander-400 text-white"
          >
            1
          </div>
          <div
            class="absolute bottom-0 top-1/2 right-0 -z-50 bg-lavander-400 md:block md:h-1 md:w-1/2"
          ></div>
        </div>
        <div class="relative flex h-full items-end md:w-full md:justify-center">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-lavander-400 text-white"
          >
            2
          </div>
          <div
            class="absolute bottom-0 left-4 -z-50 h-full w-1 bg-lavander-400 md:top-1/2 md:left-0 md:h-1 md:w-full"
          ></div>
        </div>
        <div class="relative flex h-full items-end md:w-full md:justify-center">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-lavander-400 text-white"
          >
            3
          </div>
          <div
            class="absolute bottom-0 left-4 -z-50 h-full w-1 bg-lavander-400 md:top-1/2 md:left-0 md:h-1 md:w-1/2"
          ></div>
        </div>
      </div>
      <div
        class="grid w-5/6 grid-cols-1 content-end md:order-first md:w-full md:grid-cols-3"
      >
        <div class="flex flex-col pt-10 md:w-full md:justify-center md:pt-0">
          <nuxt-img
            src="/img/step1.svg"
            format="webp"
            class="mx-auto w-1/2"
            width="auto"
            height="auto"
            alt="step 1"
          />
          <p class="pl-5 md:hidden">
            <span class="font-bold">Select</span> the loan product you want to
            apply for.
          </p>
        </div>
        <div
          class="flex flex-col pt-10 md:w-full md:justify-items-center md:pt-0"
        >
          <nuxt-img
            src="/img/step2.svg"
            format="webp"
            class="mx-auto w-1/2"
            width="auto"
            height="auto"
            alt="step 2"
          />
          <p class="pl-5 md:hidden">
            <span class="font-bold">Complete</span> the application form and
            upload the requirements.
          </p>
        </div>
        <div
          class="flex flex-col pt-10 md:w-full md:justify-items-center md:pt-0"
        >
          <nuxt-img
            src="/img/step3.svg"
            format="webp"
            class="mx-auto w-1/2"
            width="auto"
            height="auto"
            alt="step 3"
          />
          <p class="pl-5 md:hidden">
            <span class="font-bold">Submit</span> and wait for an email
            regarding your loan status.
          </p>
        </div>
      </div>
      <div class="hidden grid-cols-3 gap-20 text-center md:grid">
        <p>
          <span class="font-bold">Select</span> the loan product you want to
          apply for.
        </p>
        <p>
          <span class="font-bold">Complete</span> the application form and
          upload the requirements.
        </p>
        <p>
          <span class="font-bold">Submit</span> and wait for an email regarding
          your loan status.
        </p>
      </div>
    </div>
  </div>
</template>
