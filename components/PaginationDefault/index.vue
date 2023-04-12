<script setup>
import { computed } from "vue";

const props = defineProps(["pageCount", "pageRange", "pageCurrent"]);
const emit = defineEmits(["clickHandler"]);

const prevPage = () => {
  if (props.pageCurrent <= 1) return;
  emit("clickHandler", props.pageCurrent - 1);
};

const nextPage = () => {
  if (props.pageCurrent >= props.pageCount) return;
  emit("clickHandler", props.pageCurrent + 1);
};

const pages = computed(() => {
  if (props.pageCurrent < 4 && props.pageCount > 4) return 4;
  if (props.pageCurrent === props.pageCount && props.pageCount > 4)
    return [
      props.pageCurrent - 3,
      props.pageCurrent - 2,
      props.pageCurrent - 1,
      props.pageCurrent,
    ];
  if (props.pageCurrent === props.pageCount - 1 && props.pageCount > 4)
    return [
      props.pageCurrent - 2,
      props.pageCurrent - 1,
      props.pageCurrent,
      props.pageCurrent + 1,
    ];
  if (props.pageCurrent >= 4 && props.pageCount > 4)
    return [props.pageCurrent - 1, props.pageCurrent, props.pageCurrent + 1];

  return props.pageCount;
});
</script>

<template>
  <div
    class="flex w-full items-center justify-center gap-2 text-sm text-gray-500 md:w-auto"
  >
    <button
      class="p-2 px-4"
      :class="{
        'cursor-default text-gray-400':
          props.pageCurrent == 1 || props.pageCount == 0,
      }"
      @click="prevPage"
    >
      <Icon name="ic:round-arrow-back-ios" class="text-lg" />
    </button>
    <button
      v-if="props.pageCurrent >= 4 && props.pageCount > 4"
      class="p-2 px-4"
      @click="$emit('clickHandler', 1)"
    >
      1
    </button>
    <span v-if="props.pageCurrent >= 4 && props.pageCount > 4">...</span>
    <button
      v-for="page in pages"
      class="p-2 px-4"
      :class="{
        'rounded-md bg-gray-100 ': props.pageCurrent === page,
      }"
      @click="$emit('clickHandler', page)"
    >
      {{ page }}
    </button>
    <span v-if="props.pageCurrent <= props.pageCount - 3 && props.pageCount > 4"
      >...</span
    >
    <button
      v-if="props.pageCurrent <= props.pageCount - 2 && props.pageCount > 4"
      @click="$emit('clickHandler', props.pageCount)"
      class="p-2 px-4"
    >
      {{ props.pageCount }}
    </button>
    <button
      class="p-2 px-4"
      :class="{
        'cursor-default text-gray-400':
          props.pageCurrent == props.pageCount || props.pageCount == 0,
      }"
      @click="nextPage"
    >
      <Icon name="ic:round-arrow-forward-ios" class="text-lg" />
    </button>
  </div>
</template>
