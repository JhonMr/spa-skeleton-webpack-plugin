import axios from "axios";
import dialog from '@/components/dialog';

const service = axios.create({
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    const message = res.message;
    const code = res.code;
    if(code !== 200) {
      dialog.alert({content: message});
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    // debugger;
    console.log("err" + error); // for debug
    dialog.alert({content: error.message});
    return Promise.reject(error);
  }
);

export default service;
