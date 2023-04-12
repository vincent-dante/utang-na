<script setup>
import { ref, onMounted } from "vue";
import { useApplicationFormStore } from "@/store/applicationForm";
import { storeToRefs } from "pinia";
import { Form, Field } from "vee-validate";
import { boolean, object, string, date } from "yup";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import phil from "phil-reg-prov-mun-brgy";

const emit = defineEmits(["next"]);

const applicationFormStore = useApplicationFormStore();
const { updatePersonalInformation, updateIsPersonalInformationPassed } =
  applicationFormStore;
const { personalInformation } = storeToRefs(applicationFormStore);

const personalInformationSchema = object({
  firstName: string().required(INPUT_ERROR.REQUIRED_FIELD),
  lastName: string().required(INPUT_ERROR.REQUIRED_FIELD),
  middleName: string(),
  suffix: string(),
  noMiddleName: boolean(),
  birthDate: date()
    .required(INPUT_ERROR.REQUIRED_FIELD)
    .typeError(INPUT_ERROR.REQUIRED_FIELD),
  birthPlace: string().required(INPUT_ERROR.REQUIRED_FIELD),
  gender: string().required(INPUT_ERROR.REQUIRED_FIELD),
  civilStatus: string().required(INPUT_ERROR.REQUIRED_FIELD),
});

const birthDate = ref();
const phProvinceOption = ref([]);
const genderOption = ref(["Male", "Female"]);
const civilStatusOption = ref(["Single", "Married", "Widowed", "Divorce"]);
const isCheckedNoMiddleName = ref(false);

const birthDateMax = () => {
  const dateNow = new Date();
  dateNow.setFullYear(dateNow.getFullYear() - 18);
  return dateNow;
};

const updateBirthDate = (date) => {
  birthDate.value = date;
};

const onChangeNoMiddleName = (value) => {
  isCheckedNoMiddleName.value = value;
};

const onSubmit = (values) => {
  updateIsPersonalInformationPassed(true);
  updatePersonalInformation(values);
  emit("next", "AddressContact");
};

const onInvalidSubmit = (values) => {
  updateIsPersonalInformationPassed(false);
};

onMounted(() => {
  phProvinceOption.value = phil.sort(phil.provinces);

  if (personalInformation.value.birthDate !== "") {
    updateBirthDate(new Date(personalInformation.value.birthDate));
  }
  if (personalInformation.value.noMiddleName) {
    onChangeNoMiddleName(true);
  }
});
</script>

<template>
  <Form
    as="form"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
    :validation-schema="personalInformationSchema"
    :initial-values="personalInformation"
    v-slot="{ values, errors }"
  >
    <h3 class="pb-5 text-xl font-bold">Personal Information</h3>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <base-input
        name="firstName"
        label="First name"
        placeholder="First name"
      />
      <base-input name="lastName" label="Last name" placeholder="Last name" />
      <base-input
        name="middleName"
        label="Middle name"
        placeholder="Middle name"
        :disabled="isCheckedNoMiddleName"
      />
      <base-input name="suffix" label="Suffix name" placeholder="Suffix name" />
      <div class="md:col-span-2">
        <Field
          v-slot="{ field }"
          name="noMiddleName"
          type="checkbox"
          :value="true"
          :unchecked-value="false"
          @change="onChangeNoMiddleName(values.noMiddleName)"
        >
          <label
            class="flex w-fit cursor-pointer items-center text-sm text-gray-600"
          >
            <input
              type="checkbox"
              name="noMiddleName"
              v-bind="field"
              :value="true"
              class="mr-2 rounded border-gray-300 text-sm text-lavander-400 focus:border-lavander-400 focus:ring-transparent"
            />
            I don’t have a middle name.
          </label>
        </Field>
      </div>
      <div class="flex flex-wrap items-center gap-1">
        <Field v-slot="{ field }" name="birthDate">
          <label class="w-full text-xs" for="dp-input-birthDate"
            >Date of Birth</label
          >
          <VueDatePicker
            v-bind="field"
            :model-value="birthDate"
            :enable-time-picker="false"
            :max-date="birthDateMax()"
            placeholder="mm/dd/yyyy"
            text-input
            uid="birthDate"
            :format="'MM/dd/yyyy'"
            @update:model-value="updateBirthDate"
          >
            <template #input-icon>
              <Icon name="uil:calender" class="ml-2 text-lg" />
            </template>
            <template #clear-icon="{ clear }">
              <Icon
                name="mingcute:close-line"
                class="mr-2 text-lg"
                @click="clear"
              />
            </template>
          </VueDatePicker>
          <span class="text-xs text-rose-500">{{ errors.birthDate }}</span>
        </Field>
      </div>
      <base-select
        name="birthPlace"
        label="Place of birth"
        :options="phProvinceOption"
        placeholder="Place of birth"
        options-name="name"
        options-value="prov_code"
      />
      <base-select
        name="gender"
        label="Gender"
        :options="genderOption"
        placeholder="Gender"
        :error-message="errors.gender"
      />
      <base-select
        name="civilStatus"
        label="Civil Status"
        :options="civilStatusOption"
        placeholder="Civil Status"
        :error-message="errors.civilStatus"
      />
    </div>
    <div class="flex items-center justify-end pt-10">
      <div class="justify-self-end md:col-span-2">
        <button
          type="submit"
          class="rounded-full bg-lavander-400 py-2 px-8 text-sm text-white hover:bg-lavander-500 disabled:bg-lavander-disabled"
        >
          Next
        </button>
      </div>
    </div>
  </Form>
</template>
