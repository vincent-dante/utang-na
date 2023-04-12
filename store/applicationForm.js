import { defineStore } from "pinia";

export const useApplicationFormStore = defineStore(
  "applicationFormStore",
  () => {
    const personalInformationScheme = {
      firstName: "",
      lastName: "",
      middleName: "",
      suffix: "",
      noMiddleName: false,
      birthDate: "",
      birthPlace: "",
      gender: "",
      civilStatus: "",
    };
    const addressContactScheme = {
      houseNo: "",
      subdivision: "",
      province: "",
      city: "",
      barangay: "",
      email: "",
      mobile: "",
      street: "",
    };
    const workInformationScheme = {
      employmentType: "",
      monthlyIncome: "",
    };

    const personalInformation = ref(personalInformationScheme);
    const addressContact = ref(addressContactScheme);
    const workInformation = ref(workInformationScheme);

    const activeApplicationForm = ref("PersonalInformation");

    const isPersonalInformationPassed = ref(false);
    const isAddressContactPassed = ref(false);
    const isWorkInformationPassed = ref(false);

    function updateActiveApplicationForm(value) {
      activeApplicationForm.value = value;
    }
    function updatePersonalInformation(value) {
      personalInformation.value = value;
    }
    function updateAddressContact(value) {
      addressContact.value = value;
    }
    function updateWorkInformation(value) {
      workInformation.value = value;
    }
    function updateIsPersonalInformationPassed(value) {
      isPersonalInformationPassed.value = value;
    }
    function updateIsAddressContactPassed(value) {
      isAddressContactPassed.value = value;
    }
    function updateIsWorkInformationPassed(value) {
      isWorkInformationPassed.value = value;
    }
    function resetApplicationForm() {
      isPersonalInformationPassed.value = false;
      isAddressContactPassed.value = false;
      isWorkInformationPassed.value = false;
      personalInformation.value = personalInformationScheme;
      addressContact.value = addressContactScheme;
      workInformation.value = workInformationScheme;
      activeApplicationForm.value = "PersonalInformation";
    }

    return {
      personalInformation,
      addressContact,
      workInformation,
      activeApplicationForm,
      isPersonalInformationPassed,
      isAddressContactPassed,
      isWorkInformationPassed,
      updatePersonalInformation,
      updateAddressContact,
      updateWorkInformation,
      updateIsPersonalInformationPassed,
      updateIsAddressContactPassed,
      updateIsWorkInformationPassed,
      updateActiveApplicationForm,
      resetApplicationForm,
    };
  }
);
