<script setup>
import { computed, ref } from "vue";
import { formatToCurrencyPhp } from "@/utils/format";

const props = defineProps({
  slider: { type: [String, Number], default: 5000, required: true },
  sliderMin: { type: Number, default: 5000, required: true },
  sliderMax: { type: Number, default: 2000000, required: true },
});

const emit = defineEmits(["update-slider"]);

const sliderStep = ref(true);

const sliderStepUpdate = computed(() => {
  return sliderStep.value ? 5000 : "any";
});

const onChangeSlider = (e) => {
  sliderStep.value = true;

  emit("update-slider", e.target.value);
};

const onSliderInput = (e) => {
  const inputValue = formatInputToCurrencyPhp(e, props.sliderMax, true);
  emit("update-slider", inputValue);
  sliderStep.value = false;
};

const backgroundColorRange = computed(() => {
  const value =
    ((props.slider - props.sliderMin) / (props.sliderMax - props.sliderMin)) *
    100;

  return {
    background: `linear-gradient(to right, rgb(132, 126, 204) 0%, rgb(210, 177, 214) ${value}%, #D4D5D8 ${value}%, #D4D5D8 100%)`,
  };
});

const formatSlider = computed(() => {
  return formatToCurrencyPhp(props.slider);
});
</script>

<template>
  <div class="gap- flex w-full flex-wrap gap-5 py-5">
    <input
      :value="formatSlider"
      type="text"
      :min="sliderMin"
      :max="sliderMax"
      class="w-full rounded-full border border-gray-400 py-3 px-5 text-4xl font-bold text-gray-600 focus:border-lavander-400 focus:ring-transparent"
      @input="onSliderInput"
      @paste="
        (e) => {
          e.preventDefault();
        }
      "
    />
    <div class="flex w-full content-center">
      <input
        :value="slider"
        type="range"
        :min="sliderMin"
        :max="sliderMax"
        :step="sliderStepUpdate"
        :style="backgroundColorRange"
        class="slider h-1 w-full cursor-pointer appearance-none rounded-full"
        @input="onChangeSlider"
        @click="onChangeSlider"
      />
    </div>
  </div>
</template>

<style scoped>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 2px solid #847ecc;
  background: #fff;
  cursor: grab;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 2px solid #847ecc;
  border-radius: 100%;
  background: #fff;
  cursor: grab;
}
</style>
