const formatToCurrencyPhp = (stringToParse, leadingZero = false) => {
  if (stringToParse === undefined) return;
  return Math.floor(stringToParse).toLocaleString("en-GB", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: leadingZero ? 2 : 0,
  });
};

const formatInputToCurrencyPhp = (e, max_amount = 20000000, slider = false) => {
  /* Update input value into ₱ currency 
     Return value is whole number
  */
  const inputValue = e.target.value.replace(/[^0-9]+/g, "");
  if (!inputValue.length) {
    e.target.value = slider ? formatToCurrencyPhp(0) : "";
    return 0;
  }
  if (inputValue > max_amount) {
    e.target.value = formatToCurrencyPhp(inputValue.toString().slice(0, -1));
    return inputValue.toString().slice(0, -1);
  } else {
    e.target.value = formatToCurrencyPhp(inputValue);
    return inputValue;
  }
};

export { formatToCurrencyPhp, formatInputToCurrencyPhp };
