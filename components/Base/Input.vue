<script setup>
import { toRef, watch } from "vue";
import { useField } from "vee-validate";

const emit = defineEmits(["sideEffect"]);

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
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
  resetField,
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

watch(
  () => props.disabled,
  (newVal, oldVal) => {
    if (newVal) {
      resetField();
    }
  }
);
</script>

<template>
  <div class="w-full">
    <label :for="name" class="w-full text-xs">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      type="text"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="w-full rounded-full border border-gray-300 text-sm text-gray-600 placeholder:text-gray-600 focus:border-lavander-400 focus:ring-transparent disabled:opacity-50"
      :disabled="disabled"
    />
    <p v-show="errorMessage || meta.valid">
      <span class="text-xs text-rose-500">{{ errorMessage }}</span>
    </p>
  </div>
</template>
