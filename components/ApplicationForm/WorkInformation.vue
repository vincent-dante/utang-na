<script setup>
import { ref, onMounted } from "vue";
import { useApplicationFormStore } from "@/store/applicationForm";
import { storeToRefs } from "pinia";
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";

const emit = defineEmits(["prev"]);
const router = useRouter();

const applicationFormStore = useApplicationFormStore();
const { updateWorkInformation, updateIsWorkInformationPassed } =
  applicationFormStore;
const { workInformation } = storeToRefs(applicationFormStore);

const workInformationSchema = object({
  employmentType: string().required(INPUT_ERROR.REQUIRED_FIELD),
  monthlyIncome: string().required(INPUT_ERROR.REQUIRED_FIELD),
});

const civilEmployementTypeOption = ref([
  "Unemployed",
  "Part-time",
  "Full-time",
  "Self-employed",
  "Other",
]);

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: workInformationSchema,
  initialValues: {
    ...workInformation.value,
  },
});

const { value: monthlyIncomeValue, errorMessage: errorMessageMonthlyIncome } =
  useField("monthlyIncome");

const onInputMonthlyIncome = (e) => {
  formatInputToCurrencyPhp(e);
  setFieldValue("monthlyIncome", e.target.value);
};

const failValidation = ({ values, errors, results }) => {
  updateIsWorkInformationPassed(false);
};

const onSubmit = handleSubmit((values) => {
  updateWorkInformation(values);
  updateIsWorkInformationPassed(true);
  router.push({ path: "/application-review" });
}, failValidation);

onMounted(() => {
  setFieldValue("monthlyIncome", workInformation.value.monthlyIncome);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h3 class="pb-10 font-bold">Work Information</h3>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <base-select
          name="employmentType"
          label="Employment Type"
          placeholder="Employment Type"
          :options="civilEmployementTypeOption"
        />
      </div>
      <div>
        <label class="w-full text-xs" for="dp-input-birthDate"
          >Gross monthly income</label
        >
        <input
          :value="monthlyIncomeValue"
          @paste="
            (e) => {
              e.preventDefault();
            }
          "
          @input="onInputMonthlyIncome"
          placeholder="₱"
          id="monthlyincome"
          class="w-full rounded-full border border-gray-300 p-2 px-3 text-sm text-gray-600 placeholder:text-gray-600 focus:border-lavander-400 focus:ring-transparent disabled:opacity-50"
        />
        <p>
          <span class="text-xs text-rose-500">{{
            errorMessageMonthlyIncome
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex items-center justify-between pt-10">
      <button
        @click="emit('prev', 'AddressContact')"
        class="rounded-full border border-lavander-400 bg-white py-2 px-8 text-sm text-lavander-400"
      >
        Go Back
      </button>
      <button
        type="submit"
        class="rounded-full bg-lavander-400 py-2 px-8 text-sm text-white hover:bg-lavander-500"
      >
        Review
      </button>
    </div>
  </form>
</template>
