const moment = require("moment");

export function formatToSimpleFormatDD_MM_YYYY(d) {
  return moment(d).format("DD/MM/YYYY");
}
