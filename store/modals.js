import { defineStore } from "pinia";

export const useModalsStore = defineStore("modalsStore", () => {
  const notification = ref(false);

  function updateNotification(value) {
    notification.value = value;
  }

  watch(notification, async (newValue, oldValue) => {
    if (newValue) {
      setTimeout(() => {
        notification.value = false;
      }, 3000);
    }
  });

  return { notification, updateNotification };
});
