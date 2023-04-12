<script setup>
import { ref, computed, onMounted } from "vue";
import { useApplicationFormStore } from "@/store/applicationForm";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { object, string } from "yup";
import phil from "phil-reg-prov-mun-brgy";

const emit = defineEmits(["prev", "next"]);

const applicationFormStore = useApplicationFormStore();
const { updateAddressContact, updateIsAddressContactPassed } =
  applicationFormStore;
const { addressContact } = storeToRefs(applicationFormStore);

const addressContactSchema = object({
  houseNo: string().required(INPUT_ERROR.REQUIRED_FIELD),
  street: string().required(INPUT_ERROR.REQUIRED_FIELD),
  subdivision: string(),
  province: string().required(INPUT_ERROR.REQUIRED_FIELD),
  city: string()
    .required(INPUT_ERROR.REQUIRED_FIELD)
    .label("City / Municipality"),
  barangay: string().required(INPUT_ERROR.REQUIRED_FIELD).label("Barangay"),
  email: string()
    .email()
    .required(INPUT_ERROR.REQUIRED_FIELD)
    .label("Email address"),
  mobile: string()
    .matches(/^(09|\+639)\d{9}$/, {
      message: INPUT_ERROR.CONTACT_FORMAT,
    })
    .required(INPUT_ERROR.REQUIRED_FIELD),
});

const phCityOptionFiltered = ref([]);
const phBarangayOptionFiltered = ref([]);

const onChangePhProvinceOption = (province_code) => {
  const filteredCity = phil.city_mun
    .filter((item) => item.prov_code === province_code)
    .sort((a, b) => a.name - b.name);
  phCityOptionFiltered.value = filteredCity;
};

const onChangePhCityOption = (municipality_code) => {
  const filteredBarangay = phil.barangays
    .filter((item) => item.mun_code === municipality_code)
    .sort((a, b) => a.name - b.name);
  phBarangayOptionFiltered.value = filteredBarangay;
};

const onSubmit = (values) => {
  updateIsAddressContactPassed(true);
  updateAddressContact(values);
  emit("next", "WorkInformation");
};

const onInvalidSubmit = (values) => {
  updateIsAddressContactPassed(false);
};

const phProvinceOptionFiltered = computed(() => phil.sort(phil.provinces));

onMounted(() => {
  if (addressContact.value.province) {
    onChangePhProvinceOption(addressContact.value.province);
    onChangePhCityOption(addressContact.value.city);
  }
});
</script>

<template>
  <Form
    as="form"
    @submit="onSubmit"
    :validation-schema="addressContactSchema"
    @invalid-submit="onInvalidSubmit"
    :initial-values="addressContact"
  >
    <h3 class="pb-10 font-bold">Address & Contact</h3>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <base-input
        name="houseNo"
        label="House no. / Unit no."
        placeholder="House no. / Unit no."
      />
      <base-input name="street" label="Street" placeholder="Street" />
      <base-input
        name="subdivision"
        label="Subdivision / Village"
        placeholder="Subdivision / Village"
      />
      <base-select
        name="province"
        label="Province"
        placeholder="Province"
        :options="phProvinceOptionFiltered"
        options-name="name"
        options-value="prov_code"
        @side-effect="onChangePhProvinceOption"
      />
      <base-select
        name="city"
        label="City / Municipality"
        placeholder="City / Municipality"
        options-name="name"
        options-value="mun_code"
        :options="phCityOptionFiltered"
        @side-effect="onChangePhCityOption"
      />
      <base-select
        name="barangay"
        label="Barangay"
        placeholder="Barangay"
        options-name="name"
        options-value="name"
        :options="phBarangayOptionFiltered"
      />
      <base-input
        name="email"
        label="Email address"
        placeholder="Email address"
      />
      <base-input
        name="mobile"
        label="Mobile Number"
        placeholder="Mobile Number"
      />
    </div>
    <div class="flex items-center justify-between pt-10">
      <button
        @click="emit('prev', 'PersonalInformation')"
        class="rounded-full border border-lavander-400 bg-white py-2 px-8 text-sm text-lavander-400"
      >
        Go Back
      </button>

      <button
        type="submit"
        class="rounded-full bg-lavander-400 py-2 px-8 text-sm text-white hover:bg-lavander-500"
      >
        Next
      </button>
    </div>
  </Form>
</template>
