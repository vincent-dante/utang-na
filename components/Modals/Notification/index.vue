<script setup>
import { useModalsStore } from "@/store/modals";
import { storeToRefs } from "pinia";

const modalsStore = useModalsStore();
const { updateNotification } = modalsStore;
const { notification } = storeToRefs(modalsStore);
</script>

<template>
  <Teleport to="body">
    <transition>
      <div v-if="notification" class="fixed right-5 bottom-5 z-50">
        <div
          class="flex w-auto justify-between rounded-md bg-white px-5 py-3 drop-shadow-md"
        >
          <div>
            <p class="text-rose-400">
              <Icon name="fa6-solid:circle-xmark" class="text-xl" />
              Invalid Loan Amount
            </p>
          </div>
          <div class="pl-10 text-gray-600">
            <button type="button" @click="updateNotification(false)">
              <Icon name="fa6-solid:xmark" class="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
