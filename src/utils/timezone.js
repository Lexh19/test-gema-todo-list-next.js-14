const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);
dayjs.extend(timezone);

const dateFormat = () => {
  const date = dayjs().tz("Asia/Jakarta");
  const formattedDate = date.format()
  return formattedDate;
};

module.exports = dateFormat
