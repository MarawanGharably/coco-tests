export const getLabelValuePair = (option, value = null) => {
  return {
    "label": option,
    "value": value ? value : option
  };
};

export const formatDate=(date, format) =>{
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    hh: date.getHours().toString(),
    yyyy: date.getFullYear(),
  }

  return format.replace(/mm|dd|hh|yy|yyy/gi, matched => map[matched])
}