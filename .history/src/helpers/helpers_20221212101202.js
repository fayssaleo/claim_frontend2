const moment = require("moment");

export function formatToSimpleFormatDD_MM_YYYY(d) {
  return moment(d).format("DD/MM/YYYY");
}
export function FormatDateStringToISOSimpleEnglishDate(d) {
  let dateHolderArray = elements[0].split("-");

  return (
    dateHolderArray[2] +
    "/" +
    dateHolderArray[1] +
    "/" +
    dateHolderArray[0] +

  );
}