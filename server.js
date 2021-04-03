const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const app = express();
const schedule = require("node-schedule");
const env = require("dotenv");
const { format } = require("date-fns");
env.config();

var options = {
  method: "GET",
  url: "https://covid-19-data.p.rapidapi.com/country",
  params: { name: "thailand" },
  headers: {
    "x-rapidapi-key": "62645921c3mshe1cfb4f87c90053p165e08jsne2e7dce69ad9",
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
  },
};

schedule.scheduleJob("covid", "00 00 13 * * 0-6'", () => {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      axios({
        method: "post",
        url: "https://notify-api.line.me/api/notify",
        headers: {
          Authorization: "Bearer 1kdghYBjeNSxk53p7ck4FtDkGpv7rI1UDqqKv6rwk36",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: querystring.stringify({
          message: `ยอดผู้ป่วยโควิด วันที่${format(
            new Date(),
            "yyyy-MM-dd"
          )} จำนวน ${response.data[0].confirmed}`,
        }),
      });
    })
    .catch(function (error) {
      console.error(error);
    });
  // schedule.cancelJob('covid');
});

// axios({
//   method: "post",
//   url: "https://notify-api.line.me/api/notify",
//   headers: {
//     Authorization: "Bearer LG1nna1LdZFF5JUVfqZ1XkDhhp1rsWU5YD2dxKrgzQa",
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   data: querystring.stringify({ message: covid }),
// });

app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
