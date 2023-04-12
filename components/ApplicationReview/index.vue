<script setup>
import { computed } from "vue";
import { useApplicationFormStore } from "@/store/applicationForm";
import { useLoansStore } from "@/store/loans";
import { storeToRefs } from "pinia";
import phil from "phil-reg-prov-mun-brgy";

const router = useRouter();

const applicationFormStore = useApplicationFormStore();
const loansStore = useLoansStore();

const { resetApplicationForm } = applicationFormStore;

const {
  isPersonalInformationPassed,
  isAddressContactPassed,
  isWorkInformationPassed,
  personalInformation,
  addressContact,
  workInformation,
} = storeToRefs(applicationFormStore);

const {
  updateIsPersonalInformationPassed,
  updateIsAddressContactPassed,
  updateIsWorkInformationPassed,
  updateActiveApplicationForm,
} = applicationFormStore;

const { loanAmountSelected, loanTermSelected, loanDetails } =
  storeToRefs(loansStore);

if (
  !isPersonalInformationPassed.value &&
  !isAddressContactPassed.value &&
  !isWorkInformationPassed.value
) {
  router.push({ path: "/application-form" });
}

const submitted = ref(false);

const goHome = () => {
  router.push({ path: "/" });
};

const editApplicationForm = (name) => {
  if (name === "PersonalInformation") updateIsPersonalInformationPassed(false);
  if (name === "AddressContact") updateIsAddressContactPassed(false);
  updateIsWorkInformationPassed(false);
  updateActiveApplicationForm(name);
  router.push("application-form");
};

const submitForm = () => {
  resetApplicationForm();
  submitted.value = true;
};

const birthPlace = computed(() => {
  if (!personalInformation.value.birthPlace) return;

  const [{ name }] = phil.provinces.filter(
    (item) => item.prov_code === personalInformation.value.birthPlace
  );
  return name;
});

const city = computed(() => {
  if (!addressContact.value.city) return;
  const [{ name }] = phil.city_mun.filter(
    (item) => item.mun_code === addressContact.value.city
  );
  return name;
});
</script>

<template>
  <div class="mx-auto flex max-w-6xl gap-10 px-4 py-10">
    <!-- Left Side -->
    <div v-if="!submitted" class="w-full py-5 md:mx-auto md:w-3/4 xl:w-2/3">
      <div class="rounded-xl bg-white lg:p-5">
        <h1 class="text-3xl font-bold">Review application</h1>
        <section class="py-10">
          <div class="flex items-center justify-between pb-6">
            <h2 class="font-bold">Personal Information</h2>
            <span
              @click="editApplicationForm('PersonalInformation')"
              class="cursor-pointer text-sm text-lavander-400"
            >
              <Icon name="bx:edit-alt" class="text-xl" />
              Edit</span
            >
          </div>
          <div class="grid w-full grid-cols-2 gap-2">
            <span>Full name</span>
            <span class="overflow-hidden text-ellipsis font-bold"
              >{{ personalInformation.firstName }}
              <template v-if="!personalInformation.noMiddleName">
                {{ personalInformation.middleName }}
              </template>
              {{ personalInformation.lastName }}</span
            >
            <span>Date of birth</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              personalInformation.birthDate
            }}</span>
            <span>Place of birth</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              birthPlace
            }}</span>
            <span>Gender</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              personalInformation.gender
            }}</span>
            <span>Civil status</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              personalInformation.civilStatus
            }}</span>
          </div>
        </section>
        <section class="pb-10">
          <div class="flex items-center justify-between pb-6">
            <h2 class="font-bold">Address & Contact</h2>
            <span
              @click="editApplicationForm('AddressContact')"
              class="cursor-pointer text-sm text-lavander-400"
            >
              <Icon name="bx:edit-alt" class="text-xl" />
              Edit</span
            >
          </div>
          <div class="grid w-full grid-cols-2 gap-2">
            <span>Address</span>
            <span class="overflow-hidden text-ellipsis font-bold"
              >{{ addressContact.houseNo }} {{ addressContact.street }}
              {{ addressContact.subdivision }} {{ city }}</span
            >
            <span>Email address</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              addressContact.email
            }}</span>
            <span>Mobile number</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              addressContact.mobile
            }}</span>
          </div>
        </section>
        <section class="pb-10">
          <div class="flex items-center justify-between pb-6">
            <h2 class="font-bold">Work Information</h2>
            <span
              @click="editApplicationForm('WorkInformation')"
              class="cursor-pointer text-sm text-lavander-400"
            >
              <Icon name="bx:edit-alt" class="text-xl" />
              Edit</span
            >
          </div>
          <div class="grid w-full grid-cols-2 gap-2">
            <span>Employment type</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              workInformation.employmentType
            }}</span>
            <span>Gross monthly income</span>
            <span class="overflow-hidden text-ellipsis font-bold">{{
              workInformation.monthlyIncome
            }}</span>
          </div>
        </section>
        <div class="flex items-center justify-between pb-2">
          <button
            @click="router.go(-1)"
            class="rounded-full border border-lavander-400 bg-white py-2 px-8 text-sm text-lavander-400"
          >
            Go Back
          </button>
          <button
            @click="submitForm"
            type="button"
            class="rounded-full bg-lavander-400 py-2 px-8 text-sm text-white hover:bg-lavander-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <div v-if="submitted" class="w-full py-5 md:mx-auto md:w-3/4 xl:w-2/3">
      <div class="rounded-xl border border-gray-300 p-5">
        <div class="pb-5">
          <Icon
            name="mdi:check-circle-outline"
            class="text-7xl text-lavander-400"
          />
        </div>
        <h2 class="pb-3 text-2xl font-bold">
          Congratulations! Application submitted
        </h2>
        <p>
          Your loan application has been submitted to
          {{ loanDetails.lender }} and will be reviewed shortly.
          {{ loanDetails.lender }} will notify you via email regarding the
          status of your application.
        </p>
        <div class="flex justify-end pt-10">
          <button
            @click="goHome"
            type="button"
            class="rounded-full bg-lavander-400 py-2 px-8 text-white hover:bg-lavander-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <card-loan-sticky
      class="hidden lg:block lg:w-1/2 xl:w-1/3"
      :hide-button-apply="true"
      :loan-type="loanDetails.loan_type"
      :lender-logo="loanDetails.lender_logo"
      :loan-amount="loanAmountSelected.toString()"
      :active-loan-term="loanTermSelected"
      :interest="loanDetails.interest.toString()"
      :approval-day="loanDetails.approval_day.toString()"
      :processing-fee="loanDetails.processing_fee.toString()"
    />

    <!-- Mobile Product Card -->
    <Teleport to="body">
      <card-loan-mobile
        :hide-button-apply="true"
        :loan-type="loanDetails.loan_type"
        :lender-logo="loanDetails.lender_logo"
        :loan-amount="loanAmountSelected.toString()"
        :active-loan-term="loanTermSelected"
        :interest="loanDetails.interest.toString()"
        :approval-day="loanDetails.approval_day.toString()"
        :processing-fee="loanDetails.processing_fee.toString()"
      />
    </Teleport>
  </div>
</template>
