export let BASE_URL = "";

if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://codercba.com:9002";
} else {
  // 开发环境
  BASE_URL = "http://codercba.com:9002";
}

export const TIME_OUT = 10000;
