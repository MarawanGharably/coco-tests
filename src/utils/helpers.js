export const getLabelValuePair = (option, value = null) => {
  return {
    "label": option,
    "value": value ? value : option
  };
};

