<script setup>
import { toRef, watch } from "vue";
import { useField } from "vee-validate";

const emit = defineEmits(["sideEffect"]);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: [],
  },
  optionsName: {
    type: String,
    default: "",
  },
  optionsValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

watch(
  () => inputValue.value,
  (newVal, oldVal) => {
    if (newVal) {
      emit("sideEffect", newVal);
    }
  }
);
</script>

<template>
  <div>
    <label :for="name" class="text-xs">{{ label }}</label>
    <select
      :name="name"
      :id="name"
      :value="inputValue"
      @change="handleChange"
      @blur="handleBlur"
      class="w-full rounded-full border border-gray-300 text-sm text-gray-600 focus:border-lavander-400 focus:ring-transparent disabled:opacity-50"
    >
      <option value="" selected disabled>
        {{ label }}
      </option>
      <option v-for="option in options" :value="option[optionsValue] ?? option">
        {{ option[optionsName] ?? option }}
      </option>
    </select>
    <p v-show="errorMessage || meta.valid">
      <span class="text-xs text-rose-500">{{ errorMessage }}</span>
    </p>
  </div>
</template>
